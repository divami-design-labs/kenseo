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
			$userId = $interpreter->getUser()->user_id;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = getQuery('getTagsList',array('userId'=>$userId));
			$resultObj = $db->multiObjectQuery($queryParams);
			
			return $resultObj;
		}
		
		public function test($interpreter) {
			if(isset($_FILES["file"]["type"])) {
				$data = $interpreter->getData();
				$uploadFile = $_FILES["file"]["type"];
				Master::getLogManager()->log(DEBUG, MOD_MAIN,"we have the file with us");
				Master::getLogManager()->log(DEBUG, MOD_MAIN,$_FILES["file"]["tmp_name"]);
				Master::getLogManager()->log(DEBUG, MOD_MAIN,"interpreter is");
				Master::getLogManager()->log(DEBUG, MOD_MAIN,$interpreter);
				
				$data->userId = $interpreter->getUser()->user_id;
				
				$sourcePath = $_FILES['file']['tmp_name'];       // Storing source path of the file in a variable
				$targetPath = $AppGlobal['gloabl']['storeLocation'].$_FILES['file']['name']; // Target path where file is to be stored
				move_uploaded_file($sourcePath,$targetPath) ;
				
				//now store the artefact detail in the tables related to artefacts and versions
				$db = Master::getDBConnectionManager();
				
				$columnnames = array('project_id','artefact_title', 'description', 'artefact_type', );
				$rowvals = array($data->project, $data->name, $data->description, $data->type);
				$artId = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS, $columnnames, $rowvals);
					
							
				$verColumnNames = array("artefact_id", "version_label","created_by","document_path","MIME_type", "file_size", "state", "created_date");
				$verRowValues = array($artId, $data->name, $data->userId, $targetPath, $data->MIMEtype->type,  $data->size, 'c', date("Y-m-d H:i:s"));
				
				$artVerId = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS_VERSIONS, $verColumnNames, $verRowValues);
				
				//update the latest art version id
				$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($artVerId), "artefact_id = " . $artId );
				
				//now share the artversion to the owner
				$shareColumnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
				
				$shareRowValues = array($artVerId, $artId, $data->userId, 'S', date("Y-m-d H:i:s"), $data->userId);
				$db->insertSingleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $shareColumnNames, $shareRowValues);
				
				//add the tags to the artefacts
				$tagsList = $data->tags;
				for($i = 0 ; $i<count($tagsList); $i++) {
					$tagColumnNames = array("artefact_id", "tag_id", "created_date", "created_by");
					$tagRowValues = array($artId, $tagsList[$i], date("Y-m-d H:i:s"), $data->userId );
					$db->insertSingleRow(TABLE_ARTEFACTS_TAGS, $tagColumnNames, $tagRowValues);
				}
				
				//now add artefact references
				$refDocs = $data->refs;
				for($i = 0 ; $i< count($refDocs); $i++) {
					$refColumnNames = array("artefact_ver_id", "ref_artefact_id", "created_date", "created_by");
					$refRowValues = array($artVerId, $refDocs, date("Y-m-d H:i:s"), $data->userId );
					$db->insertSingleRow(TABLE_ARTEFACT_REFS, $refColumnNames, $refRowValues);
				}
				
				//now link the artefacts
				
				//if it is  share share it with others as well
				Master::getLogManager()->log(DEBUG, MOD_MAIN,"share : $data->share");
				if($data->share) {
					//now send the data to be shared for those people
					$this->shareForTeam($artId, $artVerId, $data->sharedTo, $data->userId);
				} 
				return $targetPath;
				
			} else {
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $interpreter->getData()->data->type);
				return false;
			}
			
		}
		
		public function shareForTeam($artId, $artVerId, $team, $sharedBy) {
			$db = Master::getDBConnectionManager();
			for($i = 0; $i < count($team); $i++) {
				$shareColumnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
				
				$shareRowValues = array($artVerId, $artId, $team[i]->userId, $team[i]->permission , date("Y-m-d H:i:s"), $sharedBy);
				$db->insertSingleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $shareColumnNames, $shareRowValues);
			}
			
			$db->updateTable(TABLE_ARTEFACTS_VERSIONS,array('shared'),array(1), "artefact_ver_id = $artVerId");
			
		}
		
		public function shareArtefact($interpreter) {
			$data = $interpreter->getData();
			$artVerId = $data-> artefactVerId;
			$artId = $data->artId;
			$userId = $interpreter->getUser()->user_id;
			$this->shareForTeam($artId, $artVerId,$data->sharedTo, $data->userId);
		}
    }
?>