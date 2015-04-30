<?php
    class People {
    	public function getProjectsPeople($interpreter) {
    		$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			
			if($data->limit) {
				$limit  =  $data->limit;
			} else {
				$limit = 2147483647;
			}
			$db = Master::getDBConnectionManager();
			$querDetails = getQuery('getPeopleInProjects',array('userid'=>$userId, '@limit' => $limit));
			$resultObj = $db->multiObjectQuery($querDetails);
			return $resultObj; 
    	}
    }
?>