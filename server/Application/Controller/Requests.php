<?php 
	class Requests  {
		function getReviewRequests($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;
			$limit = $data->limit;
			
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $userid);
			
			$db = Master::getDBConnectionManager();
			$querDetails = getQuery('getReviewRequests',array('userid'=>$userid, '@limit'=>$limit));
			$resultObj = $db->multiObjectQuery($querDetails);
			return $resultObj;
		}
	}
?>
