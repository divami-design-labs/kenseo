<?php
    class People {
    	public function getProjectsPeople($interpreter) {
    		$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			$db = Master::getDBConnectionManager();
			$querDetails = getQuery('getPeopleInProjects',array('userid'=>$userId));
			$resultObj = $db->multiObjectQuery($querDetails);
			return $resultObj; 
    	}
    }
?>