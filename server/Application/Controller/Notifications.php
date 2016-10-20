<?php
	require_once('Email/Email.php');
	require_once('Email/EmailMessages.php');

	Class Notifications {
		public function getNotifications($interpreter){
			$data 	= $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			$limit 	= $data->limit;

			$db = Master::getDBConnectionManager();
			$queryDetails = getQuery('getNotifications',array("userid" => $userId, '@limit'=>$limit));
			$resultObj = $db->multiObjectQuery($queryDetails);
			$resultLen = count($resultObj);
			for($i = 0; $i < $resultLen ; $i++ )  {
				if($resultObj[$i]->type == 'M') {
					Master::getLogManager()->log(DEBUG, MOD_MAIN, 'inside meeting invite');
					$queryDetails = getQuery('getMeetingNotificationDetails',array("id" => $resultObj[$i]->refId));
					$resultObj[$i]->meetingDetails = $db->singleObjectQuery($queryDetails);
				}
			}
			return $resultObj;
		}

		public function addNotifications($data){
			$notificationIds = array();
			try{
				foreach($data['ref_ids'] as $key => $refId){
					$db = Master::getDBConnectionManager();
					$data['ref_id'] = $refId;
					$notificationIds[] = Notifications::addNotification($data, $db);
				}
				$db->commitTransaction();
			}
			catch(Exception $e){
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "Exception error in Notifications::addNotifications");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $e);
			}
			return $notificationIds;
		}

		public function addNotification($data, $db){
			// Example code
			// Notifications::addNotification(array(
			// 	'by'			=> $userId,
			// 	'project_id'	=> $projectId,
			// 	'type'			=> 'add',
			// 	'on'			=> 'artefact',
			// 	'ref_id'		=> $id,
			// 	'recipient_ids'	=> $userIds
			// ), $db);


			$dbInitializedHere = false;
			if($db){
				$dbInitializedHere = true;
				$db = Master::getDBConnectionManager();
				$db->beginTransaction();
			}
			$typeId = $db->singleObjectQuery(getQuery('notificationTypeIdFromTypeName', array(
				'typename' => $data['type']
			)))->{'notification_type_id'};

			$onId = $db->singleObjectQuery(getQuery('notificationOnIdFromOnName', array(
				'onname' => $data['on']
			)))->{'notification_on_id'};

			$notificationId = $db->insertSingleRowAndReturnId(
				'notifications',
				array('notification_by', 'project_id', 'notification_type', 'notification_on', 'notification_ref_id'),
				array($data['by'], $data['project_id'], $typeId, $onId, $data['ref_id'])
			);

			$recipients = array_unique($data['recipient_ids']);
			$rows = array();
			// Add a row of sender too to send him/her the notification
			// if the user is not already present in the recipients' list
			if(!in_array($data['by'], $recipients)){
				// $rows[] = array($notificationId, $data['by']);
				$recipients[] = $data['by'];
			}
			// Add rows of recipients to whom the notification should be visible
			foreach($recipients as $key => $value){
				$row = array();
				$row[] = $notificationId;
				$row[] = $value;

				$rows[] = $row;
			}
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $recipients);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "Notifications: recipients");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $rows);

			$db->insertMultipleRow(
				'notification_users_map',
				array('notification_id', 'user_id'),
				$rows
			);

			$data['recipient_ids'] = $recipients;  
			// prepare and send emails
			$messages = EmailMessages::prepareMessages($data, $db);
			if($messages){
				foreach($messages as $key => $message){
					if($message->subject){
						Email::sendMail($message);
					}
				}
			}

			if($dbInitializedHere){
				$db->commitTransaction();
			}

			return $notificationId;
		}

		public function readNotification($data){
			try{
				$db = Master::getDBConnectionManager();
				$db->updateTable(
					'notification_users_map',
					array('notification_state'),
					array('R'),
					'notification_id = ' . $data->notificationId . ' AND user_id = ' . $data->userId
				);
			}
			catch(Exception $e){
				Master::getLogManager(DEBUG, MOD_MAIN, "Exception error in Notification:readNotification");
				Master::getLogManager(DEBUG, MOD_MAIN, $e);
			}
		}

		public function unreadNotification($data){
			try{
				$db = Master::getDBConnectionManager();
				$db->updateTable(
					'notification_users_map',
					array('notification_state'),
					array('U'),
					'notification_id = ' . $data->notificationId . ' AND user_id = ' . $data->userId
				);
			}
			catch(Exception $e){
				Master::getLogManager(DEBUG, MOD_MAIN, "Exception error in Notification:unreadNotification");
				Master::getLogManager(DEBUG, MOD_MAIN, $e);
			}
		}

		public function archiveNotification($data){
			try{
				$db = Master::getDBConnectionManager();
				$db->updateTable(
					'notification_users_map',
					array('notification_state'),
					array('A'),
					'notification_id = ' . $data->notificationId . ' AND user_id = ' . $data->userId
				);
			}
			catch(Exception $e){
				Master::getLogManager(DEBUG, MOD_MAIN, "Exception error in Notification:archiveNotification");
				Master::getLogManager(DEBUG, MOD_MAIN, $e);
			}
		}

		public function getProjectActivities($interpreter){
			$result = new stdClass();
			$db = Master::getDBConnectionManager();
			$db->beginTransaction();

			// Setting default messages
			$result->status = "fail";
			try{
				$data 	= $interpreter->getData()->data;
				$userId = $interpreter->getUser()->user_id;

				// params
				$projectId = $data->{'project_id'};

				$result->data = $db->multiObjectQuery(getQuery('getProjectActivities', array(
					'projectid'	=> $projectId,
					'userid'	=> $userId
				)));

				$result->status = "success";
				$db->commitTransaction();
			}
			catch(Exception $e){
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "Exception error");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "Notifications::getProjectActivities");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $e);
				$db->abortTransaction();
			}
			return $result;
		}
	}
?>