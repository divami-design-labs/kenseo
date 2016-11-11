<?php
	require_once(ROOT . "thirdparty/google-api-php-client/autoload.php");
	require_once(ROOT . "Application/Includes/Authenticator.php");
	require_once('Notifications.php');
    class Meetings {
		public function setMeetingInvitaion($interpreter) {
			$result 	= new stdClass();
			$messages 	= new stdClass();
			$resultObj = new stdClass();

			$data = $interpreter->getData()->data;
			$user = $interpreter->getUser();
			$userId = $user->user_id;

			// get params
			$params 		= $this->getMeetingParams($data);
			$authenticator 	= new Authenticator();
			// Get google client info
			$client 		= $authenticator->getRefreshToken();
			// now we need to store these in DB
			$db 			= Master::getDBConnectionManager();

			$db->beginTransaction();
			try{
				//we need to have a calendar service to create a new calendar meeting invitation
				$service = new Google_Service_Calendar($client, $user);


				// store params in variables
				$projectId 			= $params->projectId;
				$location 			= $params->location;
				$fromTime 			= $params->fromTime;
				$toTime 			= $params->toTime;
				$feature 			= $params->feature;
				$description 		= $params->description;
				$summary 			= $params->summary;
				$start 				= $params->start;
				$end				= $params->end;
				$attendeesUserIds 	= $params->attendeesUserIds;

				$eventObj = $this->getMeetingEventParams($db, $params, $user, null);

				// meeting event object
				$event 			= $eventObj->event;
				// recipients' email ids in an array
				$newAttendees	= $eventObj->newAttendees;
				// All attendess in meeting event object
				$attendees		= $eventObj->attendees;
				// 'primary' indicates the the calendar type
				$createdEvent 	= $service->events->insert(
					'primary',  // calendar id
					$event,
					array("sendNotifications"=>true)  //this option if set true will send the mail notifications to attendees
				);

				$eventId = $createdEvent->getId();

				//insert into meetings
				$meetingId = $db->insertSingleRowAndReturnId(
					TABLE_MEETINGS,
					array(
						"project_id",
						"meeting_on_artefact_id",
						"meeting_time",
						"meeting_end_time",
						"meeting_title",
						"meeting_agenda",
						"venue",
						"created_by",
						"google_meeting_ref_id"
					), array(
						$projectId,
						$feature,
						$fromTime,
						$toTime,
						$summary,
						$description,
						$location,$user->user_id,
						$eventId
					)
				);

				// $actId = $db->insertSingleRowAndReturnId(
				// 	TABLE_NOTIFICATIONS,
				// 	array(
				// 		"user_id",
				// 		"message",
				// 		"project_id",
				// 		"notification_by",
				// 		"notification_date",
				// 		"notification_type",
				// 		"notification_ref_id",
				// 		"notification_state"
				// 	),
				// 	array(
				// 		$user->user_id,
				// 		$summary,
				// 		$projectId,
				// 		$user->user_id,
				// 		date("Y-m-d H:i:s"),
				// 		'M',
				// 		$meetingId,
				// 		'U'
				// 	)
				// );

				// @TODO: I don't know why we are inserting an empty string note in database
				$db->insertSingleRow(
					TABLE_MEETING_NOTES,
					array(
						"meeting_id",
						"participant_id",
						"participant_notes",
						"created_date",
						"is_public"
					),
					array(
						$meetingId,
						$user->user_id,
						"",
						date("Y-m-d H:i:s"),
						0
					)
				);


				for($i = 0; $i < count($newAttendees); $i++) {
					if($newAttendees[$i]) {
						$participantId = $this->getUserIdFromEmail($newAttendees[$i]);
						if($participantId){
							$db->insertSingleRow(
								TABLE_MEETING_PARTICIPENTS,
								array("meeting_id", "participent_id", "invitation_date", "invited_by"),
								array($meetingId, $participantId, date("Y-m-d H:i:s"), $user->user_id)
							);
						}
					}
				}

				// //insert into project activity
				// $actId = $db->insertSingleRowAndReturnId(
				// 	TABLE_PROJECT_ACTIVITY,
				// 	array(
				// 		"project_id",
				// 		"logged_by",
				// 		"logged_time",
				// 		"performed_on",
				// 		"activity_type",
				// 		"performed_on_id"
				// 	),
				// 	array(
				// 		$projectId,
				// 		$user->user_id,
				// 		date("Y-m-d H:i:s"),
				// 		'M',   // meeting
				// 		'N',   // new
				// 		$meetingId
				// 	)
				// );

				Master::getLogManager()->log(DEBUG, MOD_MAIN, "create invitation");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $attendeesUserIds);
				// Add notification
				$newNotification = Notifications::addNotification(array(
					'by'			=> $userId,
					'project_id'	=> $projectId,
					'type'			=> 'add',
					'on'			=> 'meeting',
					'ref_id'		=> $meetingId,
					'recipient_ids'	=> explode(",", $attendeesUserIds)
				), $db);


				Master::getLogManager()->log(DEBUG, MOD_MAIN, "meeting details test");

				$queryDetails = getQuery('getMeetingNotification',array("id" => $userId, '@notificationid'=>$newNotification , "@type" =>"add"));
				$resultObj = $db->singleObjectQuery($queryDetails);
				$queryDetails = getQuery('getMeetingNotificationDetails',array("id" => $resultObj->notification_ref_id));
				$resultObj->meetingDetails = $db->singleObjectQuery($queryDetails);

				Master::getLogManager()->log(DEBUG, MOD_MAIN, "meeting details");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $resultObj);

				$db->commitTransaction();

				$messages->type 	= "success";
				$messages->message 	= "Meeting invitation is sent successfully";
				$messages->icon 	= "done";
			}
			catch(Exception $e){
				$db->abortTransaction();
				$messages->type 	= "error";
				$messages->message 	= "Failed to send Meeting invitation";
				$messages->icon 	= "error";
			}

			$result->notification[] = $resultObj;
			$result->messages = $messages;

			return $result;
			// return $meetingId;
		}

		public function getMeetingEventParams($db, $params, $user, $event){
			$result = new stdClass();
			// $event will be present when the meeting is being updated
			if(!$event){
				// this google event stores the data and this is inserted into the calendar
				$event = new Google_Service_Calendar_Event();
			}
			// set details in the events
			$event->setSummary($params->summary);
			$event->setLocation($params->location);
			$event->setDescription($params->description);
			$event->setStart($params->start);
			$event->setEnd($params->end);

			$event->setVisibility('public');

			//building meeting invitaion attendee list
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "building meeting invitaion attendee list");
			$eventCreator = new Google_Service_Calendar_EventAttendee();
			//$eventCreator->setResponseStatus("accepted");
			$eventCreator->setEmail($user->email);

			// prepare attendees list. Add the event creator as one of the attendees
			$result->attendees = array($eventCreator);


			// $newAttendees = explode(",", $data->attendees->value);
			// Get the emails of all attendees
			$result->newAttendees = array_map(
				function($row) {
					return $row->email;
				},
				$db->multiObjectQuery(
					getQuery(
						'getUsers',
						array(
							"@userids" => $params->attendeesUserIds
						)
					)
				)
			);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "new  attendees");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $result->newAttendees);

			Master::getLogManager()->log(DEBUG, MOD_MAIN, "venkateshwar - from time");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $params->fromTime);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $params->toTime);

			for($i = 0; $i < count($result->newAttendees); $i++) {
				if($result->newAttendees[$i]) {
					Master::getLogManager()->log(DEBUG, MOD_MAIN, "appending attendees");
					$attendee = new Google_Service_Calendar_EventAttendee();
					Master::getLogManager()->log(DEBUG, MOD_MAIN, "appended attendees");
					
					//$attendee->setResponseStatus("accepted");
					$attendee->setEmail(trim($result->newAttendees[$i]));
					// push new attendee to the attendees list
					array_push($result->attendees, $attendee);
				}
			}

			$event->attendees 	= $result->attendees;
			$result->event 		= $event;

			return $result;
		}

		public function getMeetingParams($data){
			$result = new stdClass();

			// get params
			$result->projectId = $data->projectId;
			$result->location = $data->venue;
			// Converting string to datetime format and then again to string for further operations
			$date = DateTime::createFromFormat(
						"d M Y",
						$data->date
					)->format('Y-m-d');
			$result->fromTime 	= $date . "T" . $data->fromTime . ":00.000" . $data->timezone;
			$result->toTime 	= $date . "T" . $data->toTime 	. ":00.000" . $data->timezone;

			$project = $data->projectName;
			$result->feature = $data->artefactId;
			$featureName = $data->artefactName;
			// $meetingType = "";
			$result->description = isset($data->agenda) ? $data->agenda : "Description";
			$result->summary = $project ." : " . $featureName;

			$result->start = new Google_Service_Calendar_EventDateTime();
			$result->start->setDateTime($result->fromTime);

			$result->end = new Google_Service_Calendar_EventDateTime();
			$result->end->setDateTime($result->toTime);

			$result->attendeesUserIds = join(",", array_map(function($item){
				return $item->id;
			}, $data->participants));
			
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "Meeting params");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $result);

			return $result;
		}

		public function writeMeetingNotes($interpreter) {
			$data = $interpreter->getData()->data;
			$user = $interpreter->getUser();
			$result = new stdClass();

			$db = Master::getDBConnectionManager();



			$db->updateTable(
						TABLE_MEETING_NOTES,
						array(
							"participant_notes",
							"created_date",
							"is_public"
						),
						array(
							$data->notes,
							date("Y-m-d H:i:s"),
							$data->is_public
						),
						"meeting_id = " . $data->meeting_id . " and participant_id = " . $user->user_id
					);

			$resultMessage = new stdClass();
			$resultMessage->type = "success";
			$resultMessage->message = "Successfully added notes to meeting";
			$resultMessage->icon = "success";
			$result->messages = $resultMessage;

			return $result;
		}

		public function getMeetingNotes($interpreter) {
			$data = $interpreter->getData()->data;
			$user = $interpreter->getUser();

			$db = Master::getDBConnectionManager();

			$queryParams = array(meetingId => $data->meetingId, userId=> $user->user_id);

			//first get meeting Details
			$dbQuery = getQuery('getMeetingDetails',$queryParams);
			$meetingObj = $db->singleObjectQuery($dbQuery);


			//now get participants
			$dbQuery = getQuery('getMeetingParticipants',$queryParams);
			$participants = $db->multiObjectQuery($dbQuery);

			$meetingObj->participants = $participants;

			//now get notes
			$dbQuery = getQuery('getMeetingNotes',$queryParams);
			$notes = $db->multiObjectQuery($dbQuery);

			$meetingObj->notes = $notes;


			return $meetingObj;
		}

		public function getUserIdFromEmail($email){
			try{
				$email = trim($email);
				$db = Master::getDBConnectionManager();

				$queryParams = array('email' => $email);
				$dbQuery = getQuery('getUserIdFromEmail', $queryParams);
				$userData = $db->singleObjectQuery($dbQuery);
				return $userData->{'user_id'};
			}
			catch(Exception $e){
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $e);
			}
		}

		public function updateMeeting($interpreter){
			$result 	= new stdClass();
			$messages 	= new stdClass();

			$data 		= $interpreter->getData()->data;
			$params 	= $this->getMeetingParams($data);

			$user 		= $interpreter->getUser();
			$userId 	= $user->user_id;
			$db 		= Master::getDBConnectionManager();
			$db->beginTransaction();
			try{
				$authenticator = new Authenticator();
				$client = $authenticator->getRefreshToken();
				// params
				$meetingId = $data->{'meeting_id'};
				$meetingInfo = $db->singleObjectQuery(getQuery('getMeetingInfoFromId', array(
					"meetingid" => $meetingId
				)));

				// get event id from meeting id, from database
				$eventId = $meetingInfo->{'google_meeting_ref_id'}; // event id

				//we need to have a calendar service to create a new calendar meeting invitation
				$service = new Google_Service_Calendar($client);
				$event = $service->events->get('primary', $eventId);

				// store params in variables
				// @SELF NOTE: project id and artefact id should not be changed while updating a meeting invitation
				$projectId 			= $params->projectId;  
				$location 			= $params->location;
				$fromTime 			= $params->fromTime;
				$toTime 			= $params->toTime;
				$feature 			= $params->feature;
				$description 		= $params->description;
				$summary 			= $params->summary;
				$start 				= $params->start;
				$end				= $params->end;
				$attendeesUserIds 	= $params->attendeesUserIds;

				$eventObj		= $this->getMeetingEventParams($db, $params, $user, $event);
				// recipients' email ids in an array
				$newAttendees	= $eventObj->newAttendees;
				// All attendess in meeting event object
				$attendees		= $eventObj->attendees;

				$updatedEvent = $service->events->update(
					'primary', // calendar id
					$event->getId(),  // event id
					$event,    // event object
					array("sendNotifications" => true)  // query params
				);

				// Add the same updated info in the database
				// update into meetings
				$db->updateTable(
					TABLE_MEETINGS,
					array(
						// "project_id",
						// "meeting_on_artefact_id",
						"meeting_time",
						"meeting_end_time",
						"meeting_title",
						"meeting_agenda",
						"venue",
						"created_by"
					),
					array(
						// $projectId,
						// $feature,
						$fromTime,
						$toTime,
						$summary,
						$description,
						$location,
						$user->user_id
					),
					"meeting_id = " . $meetingId
				);

				// $db->updateTable(
				// 	TABLE_NOTIFICATIONS,
				// 	array(
				// 		"user_id",
				// 		"message",
				// 		// "project_id",
				// 		"notification_by",
				// 		"notification_date",
				// 		"notification_type",
				// 		"notification_state"
				// 	),
				// 	array(
				// 		$user->user_id,
				// 		$summary,
				// 		// $projectId,
				// 		$user->user_id,
				// 		date("Y-m-d H:i:s"),
				// 		'M',
				// 		'U'
				// 	),
				// 	"notification_ref_id = " . $meetingId
				// );

				$existingParticipantsIds = array_map(
					function($item) {
						return $item->{'participent_id'};
					},
					$db->multiObjectQuery(
						getQuery(
							'getParticipantsFromMeetingId',
							array(
								"meetingid" => $meetingId
							)
						)
					)
				);

				$currentParticipantsIds = explode(",", $attendeesUserIds);
				//
				for($i = 0; $i < count($newAttendees); $i++) {
					if($newAttendees[$i]) {
						$participantId = $this->getUserIdFromEmail($newAttendees[$i]);
						// Check if the participant id is present and it is not of an existing participant
						if($participantId && !in_array($participantId, $existingParticipantsIds)){
							// insert newly added recipients in the database
							$db->insertSingleRow(
								TABLE_MEETING_PARTICIPENTS,
								array("meeting_id", "participent_id", "invitation_date", "invited_by"),
								array($meetingId, $participantId, date("Y-m-d H:i:s"), $user->user_id)
							);
						}
					}
				}

				// @TODO: In update process, if recipient(s) are removed then remove there respective rows from database
				$removedParticipantsIds = array_diff($existingParticipantsIds, $currentParticipantsIds);
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "removing participants...");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $existingParticipantsIds);
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "........................");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $currentParticipantsIds);
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "........................");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $removedParticipantsIds);
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "........................");
				foreach($removedParticipantsIds as $key => $removedParticipantId){
					// assuming the participant id was present before 
					// and now in this update, the participant is being removed
					// => remove the row from the database
					$db->deleteTable(
						"meeting_participents",
						"meeting_id = " . $meetingId . " AND participent_id = " . $removedParticipantId
					);
				}

				//insert into project activity
				// $actId = $db->insertSingleRowAndReturnId(
				// 	TABLE_PROJECT_ACTIVITY,
				// 	array(
				// 		"project_id",
				// 		"logged_by",
				// 		"logged_time",
				// 		"performed_on",
				// 		"activity_type",
				// 		"performed_on_id"
				// 	),
				// 	array(
				// 		$projectId,
				// 		$user->user_id,
				// 		date("Y-m-d H:i:s"),
				// 		'M',   // meeting
				// 		'U',   // update
				// 		$meetingId
				// 	)
				// );

				// Add notification
				$newNotification = Notifications::addNotification(array(
					'by'			=> $userId,
					'project_id'	=> $projectId,
					'type'			=> 'update',
					'on'			=> 'meeting',
					'ref_id'		=> $meetingId,
					'recipient_ids'	=> explode(",", $attendeesUserIds)
				), $db);
				$queryDetails = getQuery('getMeetingNotification',array("id" => $userId, '@notificationid'=>$newNotification,"@type" =>"update"));
				$resultObj = $db->singleObjectQuery($queryDetails);

				$db->commitTransaction();

				$messages->type 	= "success";
				$messages->message 	= "Meeting invitation is updated successfully";
				$messages->icon 	= "done";
			}
			catch(Exception $e){
				$db->abortTransaction();
				$messages->type 	= "error";
				$messages->message 	= "Failed to update Meeting invitation";
				$messages->icon 	= "error";

				Master::getLogManager()->log(DEBUG, MOD_MAIN, "update meeting error");				
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $e);
				
			}
			$result->notification = $resultObj;
			$result->messages = $messages;

			return $result;
		}
	}
?>