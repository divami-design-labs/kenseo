<?php
    class People {
    	public function getProjectsPeople($interpreter) {
    		$data = $interpreter->getData()->data;
			$userId = $data->userId;
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $userId);
			$db = Master::getDBConnectionManager();
			$querDetails = getQuery('getPeopleInProjects',array('userid'=>$userId));
			$resultObj = $db->multiObjectQuery($querDetails);
			return $resultObj; 
    	}
    }
?>