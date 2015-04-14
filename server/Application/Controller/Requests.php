<?php 
	class Requests  {
		function getReviewRequests($interpreter) {
			$data = $interpreter->getData();
			$userid = $data->data->userid;
			
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $userid);
			
			$db = Master::getDBConnectionManager();
			$querDetails = getQuery('getReviewRequests',array('userid'=>$userid));
			$resultObj = $db->multiObjectQuery($querDetails);
			return $resultObj;
		}
	}
?>
