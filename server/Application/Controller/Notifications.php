<?php
    Class Notifications {
    	public function getNotifications($interpreter){
    		$data = $interpreter->getData()->data;
			$userId = $data->userId;
			
			$db = Master::getDBConnectionMAnager();
			$queryDetails = getQuery('getNotifications',array(id => $userId));
			$resultObj = $db->multiObjectQuery($queryDetails);
			return $resultObj;
    	}
    }
?>