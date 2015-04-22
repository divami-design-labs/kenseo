<?php 
	class Header {
		function getHeader($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;
			$count = $data->count;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userid );
			$dbQuery = getQuery('getHeader', $queryParams);
			$resultObj = $db->singleObjectQuery($dbQuery);
			return $resultObj;
		}		
	}
?>
