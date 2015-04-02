<?php 
	class Projects {
		function getMyProjectsList($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $data->userid;
			$count = $data->count;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userid );
			$dbQuery = getQuery('getMyProjectsList',$queryParams);
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}
		
		function getProjectArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $data->userid;
			$projectid = $data->projectid;
			$count = $data->count;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userid, 'projectid' => $projectid );
			$dbQuery = getQuery('getMyProjectsList',$queryParams);
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}		
	}
?>
