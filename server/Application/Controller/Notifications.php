<?php
	Class Notifications {
		public function getNotifications($interpreter){
			$data = $interpreter->getData()->data;
			$userId = $data->userId;
			$limit = $data->limit;
			
			$db = Master::getDBConnectionMAnager();
			$queryDetails = getQuery('getNotifications',array(id => $userId, '@limit'=>$limit));
			$resultObj = $db->multiObjectQuery($queryDetails);
			$resultLen = count($resultObj);
			for($i = 0; $i < $resultLen ; $i++ )  {
				if($resultObj[$i]->type == 'M') {
					Master::getLogManager()->log(DEBUG, MOD_MAIN, 'inside meeting invite');
					$queryDetails = getQuery('getMeetingNotificationDetails',array(id => $resultObj[$i]->refId));
					$resultObj[$i]->meetingDetails = $db->singleObjectQuery($queryDetails);
				}
			}
			return $resultObj;
		}
	}
?>