<?php
    class Common {		
		public function getTagsList($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = getQuery('getTagsList',array('userId'=>$userId));
			$resultObj = $db->multiObjectQuery($queryParams);
			
			return $resultObj;
		}
		
    }
?>
