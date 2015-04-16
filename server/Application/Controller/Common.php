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
		
		public function test($interpreter) {
			if(isset($_FILES["file"]["type"])) {
				$uploadFile = $_FILES["file"]["type"];
				Master::getLogManager()->log(DEBUG, MOD_MAIN,"we have the file with us");
				Master::getLogManager()->log(DEBUG, MOD_MAIN,$_FILES["file"]["tmp_name"]);
				$sourcePath = $_FILES['file']['tmp_name'];       // Storing source path of the file in a variable
				$targetPath = $AppGlobal['gloabl']['storeLocation'].$_FILES['file']['name']; // Target path where file is to be stored
				move_uploaded_file($sourcePath,$targetPath) ;
				
				return $AppGlobal['gloabl']['storeLocation'].$_FILES['file']['name'];
				
			} else {
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $interpreter->getData()->data->type);
			}
			return true;
		}
    }
?>