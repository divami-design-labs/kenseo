<?php
    class Common {
    	public function searchAll($interpreter) {
    		$data = $interpreter->getData()->data;
			$searchString = "%". $data->string ."%";
			
			$db = Master::getDBConnectionManager();
			 
			$userQueryDetails = getQuery('matchUsers',array('string'=>$searchString));
			$artefactQueryDetails = getQuery('matchArtefacts',array('string'=>$searchString));
			$projectQueryDetails = getQuery('matchProjects',array('string'=>$searchString));
			
			$userResultObj = $db->multiObjectQuery($userQueryDetails);
			$artefactResultObj = $db->multiObjectQuery($artefactQueryDetails);
			$projectResultObj = $db->multiObjectQuery($projectQueryDetails);
			
			$resultObj = new stdClass();
			
			$resultObj->users = $userResultObj;
			$resultObj->artefacts = $artefactResultObj;
			$resultObj->projects = $projectResultObj;

			Master::getLogManager()->log(DEBUG, MOD_DB, "VK");
			Master::getLogManager()->log(DEBUG, MOD_DB, $resultObj);

			return $resultObj;
			
    	}
		
		public function getTagsList($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $data->userId;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = getQuery('getTagsList',array('userId'=>$userId));
			$resultObj = $db->multiObjectQuery($queryParams);
			
			return $resultObj;
		}
    }
?>