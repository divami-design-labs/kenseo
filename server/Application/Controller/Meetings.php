<?php
	require_once("thirdparty/google-api-php-client/autoload.php");
	require_once(ROOT . "Application/Includes/Authenticator.php");
    class Meetings {
		public function setMeetingInvitaion($interpreter) {

			$data = $interpreter->getData()->data;
			$user = $interpreter->getUser();

			// get params
			$params = $this->getMeetingParams($data);
			$authenticator = new Authenticator();
			// Get google client info
			$client = $authenticator->getRefreshToken();
			// now we need to store these in DB
			$db = Master::getDBConnectionManager();
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
			$createdEvent = $service->events->insert(
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

			$actId = $db->insertSingleRowAndReturnId(
				TABLE_NOTIFICATIONS,
				array(
					"user_id",
					"message",
					"project_id",
					"notification_by",
					"notification_date",
					"notification_type",
					"notification_ref_id",
					"notification_state"
				),
				array(
					$user->user_id,
					$summary,
					$projectId,
					$user->user_id,
					date("Y-m-d H:i:s"),
					'M',
					$meetingId,
					'U'
				)
			);

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

			//insert into project activity
			$actId = $db->insertSingleRowAndReturnId(
				TABLE_PROJECT_ACTIVITY,
				array(
					"project_id",
					"logged_by",
					"logged_time",
					"performed_on",
					"activity_type",
					"performed_on_id"
				),
				array(
					$projectId,
					$user->user_id,
					date("Y-m-d H:i:s"),
					'M',   // meeting
					'N',   // new
					$meetingId
				)
			);
			// $resultMessage = new stdClass();
			// $resultMessage->messages = new stdClass();
			// $resultMessage->messages->type = "success";
			// $resultMessage->messages->message = "Meeting invitation is sent successfully";
			// $resultMessage->messages->icon = "done";
			// return $resultMessage;
			return $meetingId;
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

			Master::getLogManager()->log(DEBUG, MOD_MAIN, "venkateshwar - from time");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $params->fromTime);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $params->toTime);

			for($i = 0; $i < count($result->newAttendees); $i++) {
				if($result->newAttendees[$i]) {
					Master::getLogManager()->log(DEBUG, MOD_MAIN, "appending attendees");
					$attendee = new Google_Service_Calendar_EventAttendee();
					//$attendee->setResponseStatus("accepted");
					$attendee->setEmail(trim($result->newAttendees[$i]));
					// push new attendee to the attendees list
					array_push($result->attendees, $attendee);
				}
			}

			$event->attendees = $result->attendees;

			$result->event = $event;

			return $result;
		}

		public function getMeetingParams($data){
			$result = new stdClass();

			// get params
			$result->projectId = $data->meetingProject[0]->{'data-id'};
			$result->location = $data->location->value;
			// Converting string to datetime format and then again to string for further operations
			$date = DateTime::createFromFormat(
						"d M Y",
						$data->date->value
					)->format('Y-m-d');
			$result->fromTime = $date . $data->fromTime->value;
			$result->toTime = $date . $data->toTime->value;

			$project = $data->meetingProject[0]->name;
			$result->feature = $data->meetingArtefact[0]->{'data-id'};
			$featureName = $data->meetingArtefact[0]->name;
			// $meetingType = "";
			$result->description = isset($data->agenda->value) ? $data->agenda->value : "Description";
			$result->summary = $project ." : " . $featureName;

			$result->start = new Google_Service_Calendar_EventDateTime();
			$result->start->setDateTime($result->fromTime);

			$result->end = new Google_Service_Calendar_EventDateTime();
			$result->end->setDateTime($result->toTime);

			$result->attendeesUserIds = join(",", $data->attendees->value);

			return $result;
		}

		public function writeMeetingNotes($interpreter) {
			$data = $interpreter->getData()->data;
			$user = $interpreter->getUser();

			$db = Master::getDBConnectionManager();

			$columnnames = array("meeting_id", "participent_id", "participation_notes", "created_date", "is_public");
			$rowvals = array($data->meetingId, $user->uesr_id, $data->notes, date("Y-m-d H:i:s"), $data->is_public);

			$db->insertSingleRow(TABLE_MEETING_PARTICIPENTS, $columnnames, $rowvals);

			return true;
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
			$result = new stdClass();
			$data = $interpreter->getData()->data;
			$params = $this->getMeetingParams($data);

			$user = $interpreter->getUser();
			$db = Master::getDBConnectionManager();
			$db->beginTransaction();
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

			$db->updateTable(
				TABLE_NOTIFICATIONS,
				array(
					"user_id",
					"message",
					"project_id",
					"notification_by",
					"notification_date",
					"notification_type",
					"notification_state"
				),
				array(
					$user->user_id,
					$summary,
					$projectId,
					$user->user_id,
					date("Y-m-d H:i:s"),
					'M',
					'U'
				),
				"notification_ref_id = " . $meetingId
			);

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

			// @TODO: In update process, if recipient(s) are removed then remove there respective rows from database

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
			//insert into project activity
			$actId = $db->insertSingleRowAndReturnId(
				TABLE_PROJECT_ACTIVITY,
				array(
					"project_id",
					"logged_by",
					"logged_time",
					"performed_on",
					"activity_type",
					"performed_on_id"
				),
				array(
					$projectId,
					$user->user_id,
					date("Y-m-d H:i:s"),
					'M',   // meeting
					'U',   // update
					$meetingId
				)
			);

			$db->commitTransaction();

			return $result;
		}
	}
?>