<?php
    class People {
    	public function getProjectsPeople($interpreter) {
    		$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			$limit  =  $data->limit;
			$db = Master::getDBConnectionManager();
			$querDetails = getQuery('getPeopleInProjects',array('userid'=>$userId, '@limit' => $limit));
			$resultObj = $db->multiObjectQuery($querDetails);
			return $resultObj; 
    	}
    }
?>