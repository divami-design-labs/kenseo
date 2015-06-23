<?php
	require_once("thirdparty/google-api-php-client/autoload.php");
    class Meetings {
		public function setMeetingInvitaion($interpreter) {
			global $AppGlobal;
			
			$data = $interpreter->getData()->data;
			$user = $interpreter->getUser();
			
			// Create the google client.
			$client = new Google_Client();
			$project = 'kenseo';
			$client->setApplicationName($AppGlobal['googleauth'][$project]['appName']);
			$client->setClientId($AppGlobal['googleauth'][$project]['clientId']);
			$client->setClientSecret($AppGlobal['googleauth'][$project]['clientSecret']);
			$client->setRedirectUri($AppGlobal['googleauth'][$project]['redirectURL']);
			$client->setApprovalPrompt('auto');
			$client->setScopes(array('https://www.googleapis.com/auth/calendar'));
			
			$kenseoGAT = $_COOKIE['DivamiKenseoGAT'];
			
			//we need to have a calendar service to create a new calendar meeting invitation
			$service = new Google_Service_Calendar($client);
			
			//since we already have the GAT with us we say get AccessToken to get the client authenticated
			$client->setAccessToken($kenseoGAT);
			$token = $client->getAccessToken();
			
			//this google event stores the data and this is inserted into the calendar 
			$event = new Google_Service_Calendar_Event();
			$projectId = $data->meetingProject[0]->{'data-id'};
			$location = $data->location->value;
			$fromTime = $data->date . $data->fromTime->value;
			$toTime = $data->date . $data->toTime->value;
			$project = $data->meetingProject[0]->name;
			$feature = $data->meetingArtefact[0]->{'data-id'};
			$featureName = $data->meetingArtefact[0]->name;
			$meetingType = ""; 
			$description = isset($data->agenda->value) ? $data->agenda->value : "Description";
			$title = $project ." : " . $featureName . " : " ;
			
			$event->setSummary($title);
			$event->setLocation($location);
			$event->setDescription($description);
			
			$start = new Google_Service_Calendar_EventDateTime();
			$start->setDateTime($fromTime);
			$event->setStart($start);
			$end = new Google_Service_Calendar_EventDateTime();
			$end->setDateTime($toTime);
			$event->setEnd($end);
			$event->setVisibility('public');
			
			//building meeting invitaion attendee list
			Master::getLogManager()->log(DEBUG, MOD_MAIN,"building meeting invitaion attendee list");
			$attendee1 = new Google_Service_Calendar_EventAttendee();
			$attendee1->setResponseStatus("accepted");
			$attendee1->setEmail($user->email);
			
			$attendees = array($attendee1);
			
			for($i = 0; $i < count($data->attendees); $i++) {
				if($data->attendees[$i]->{'data-email'}) {
					Master::getLogManager()->log(DEBUG, MOD_MAIN, "appending attendees");
					$attendee = new Google_Service_Calendar_EventAttendee();
					$attendee->setResponseStatus("accepted");
					$attendee->setEmail($data->attendees[$i]->{'data-email'});
					array_push($attendees ,$attendee);
				}
			}
			
			$event->attendees = $attendees;
			
			//this option if set true will send the mail notifications to attendees
			$optionaArguments = array("sendNotifications"=>true);
			
			$createdEvent = $service->events->insert($user->email, $event, $optionaArguments);
			$meetingId = $createdEvent->getId();
			
			//now we need to store these in DB			
			$db = Master::getDBConnectionManager();
			
			//insert into meetings
			$columnnames = array("project_id", "artefact_id", "meeting_time", "meeting_end_time", "meeting_title", "meeting_agenda", "venue","created_by", "google_meeting_ref_id");
			$rowvals = array($projectId, $feature, $fromTime, $toTime, $title, $description, $location,$user->user_id, google_meeting_ref_id);

			$meetId = $db->insertSingleRowAndReturnId(TABLE_MEETINGS, $columnnames, $rowvals);

			//insert into meeting participants
			$partsColumnnames = array("meeting_id", "participent_id", "invitation_date", "invited_by");
			$notColumnnames = array("user_id", "message","project_id", "notification_by", "notification_date", "notification_type", "notification_ref_id", "notification_state");
			

			//notify the user itself
			$notRowvals = array($user->user_id, $title, $projectId, $user->user_id, date("Y-m-d H:i:s"), 'M', $meetId, 'U');

			$actId = $db->insertSingleRowAndReturnId(TABLE_NOTIFICATIONS, $notColumnnames, $notRowvals);
			
			for($i = 0; $i < count($data->attendees); $i++) {
				if($data->attendees[$i]->{'data-email'}) {
					$partsRowvals = array($meetId, $data->attendees[$i]->{'data-user_id'}, date("Y-m-d H:i:s"), $user->user_id);
					$db->insertSingleRow(TABLE_MEETING_PARTICIPENTS, $partsColumnnames, $partsRowvals);
					
					//insert into notifications	
					$notRowvals = array($data->attendees[$i]->id, $title, $projectId, $user->user_id, date("Y-m-d H:i:s"), 'M', $meetId, 'U');
	
					$actId = $db->insertSingleRowAndReturnId(TABLE_NOTIFICATIONS, $notColumnnames, $notRowvals);
				}


			}

			//insert into project activity
			$actColumnnames = array("project_id", "logged_by", "logged_time", "performed_on", "activity_type", "performed_on_id");
			$actRowvals = array($projectId, $user->user_id, date("Y-m-d H:i:s"), 'M','N', $meetId);

			$actId = $db->insertSingleRowAndReturnId(TABLE_PROJECT_ACTIVITY, $actColumnnames, $actRowvals);

			return $meetId;
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
			
			$queryParams = array(meetingId => $data->meetingId);
			
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
	}
?>