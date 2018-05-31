<?php 
	class Header {
		function getHeader($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userid );
			$dbQuery = getQuery('getHeader', $queryParams);
			$resultObj = $db->singleObjectQuery($dbQuery);
			return $resultObj;
		}		
	}
?>
