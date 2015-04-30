<?php 
	class Artefacts {
		public function getArtefacts($interpreter){
			$data = $interpreter->getData()->data;
			if($data->shared == "true"){
				return $this->getSharedArtefacts($interpreter);
			}
			elseif($data->activities == "true"){
				return $this->getRecentArtefactActivities($interpreter);
			}
			elseif($data->linked == "true"){
				return $this->getArtefactsLink($interpreter);
			}
			elseif($data->projects == "true"){
				return $this->getProjectArtefacts($interpreter);
			}
			elseif($data->references == "true"){
				return $this->getReferences($interpreter);
			}
			else if($data->projectActivities == "true"){
				return $this->getProjectActivity($interpreter);
			}
			return "something else";
		}

		// @TODO: Move to Projects Class
		public function getProjectActivity($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->project_id;
			
			$db = Master::getDBConnectionManager();
			$queryParams = array('projectid' => $projectId);
			
			$dbQuery = getQuery('getProjectActivity',$queryParams);
			
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}
		public function getProjectArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;
			$sharePermission = $data->sharePermission;
			$sortBy = $data->sortBy;
			$projectid = $data->project_id;
			$count = $data->count;
			
			switch ($sortBy) {
			    case "name":
			        $sortBy = "versions.version_label";
			        break;
			    case "date":
			        $sortBy = "members.shared_date";
			        break;
			    case "owner":
			        $sortBy = "requestor.name";
			        break;
				case "default":
			        $sortBy = "artefacts.linked_id";
			        break;
			    default:
			        $sortBy = "artefacts.linked_id";
			}
			
			$db = Master::getDBConnectionManager();
			$queryParams = array('userid' => $userid, 'projectid' => $projectid, '@sortBy' => $sortBy );
			if($sharePermission == "true") {
				$dbQuery = getQuery('getProjectArtefactsWithSharePermission',$queryParams);
			} else {
				$dbQuery = getQuery('getProjectArtefactsWithoutSharePermission',$queryParams);
			}
			
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}
		function getSharedArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;
			$limit = $data->limit;
			
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $userid);
			
			$db = Master::getDBConnectionManager();
			$querDetails = getQuery('getReviewRequests',array('userid'=>$userid, '@limit' => $limit ));
			$resultObj = $db->multiObjectQuery($querDetails);
			return $resultObj;
		}
		public function getRecentArtefactActivities($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;;
			$count = $data->count;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userid );
			$dbQuery = getQuery('getMyRecentArtefacts',$queryParams);
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}
		public function getArtefactsLink($interpreter) {
			$data = $interpreter->getData()->data;
			$userId =  $interpreter->getUser()->user_id;
			$projectId = $data -> projectId;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userId, 'projectid' => $projectId);
			$dbQuery = getQuery('getArtefactsLink',$queryParams);
			$resultObj = $db->multiObjectQuery($dbQuery);
			
			return $resultObj;
		}		
		public function addArtefactVersion($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;;
			$previousArtefactid = $data->previousArtefactid;
			$latestArtefactid = $data -> latestArtefactid;
			
			$db = Master::getDBConnectionManager();
			//first get the latest artefact version of previos artefact
			$artefactVersionParams = array(artId => $previousArtefactid);
			$dbQuery = getQuery('getLatestVerionOfArtefact', $artefactVersionParams);
			
			$latestVersion = $db->multiObjectQuery($dbQuery);
			$latestVersion = $latestVersion[0]->verId;

			//get the version details
			$artefactOldVersionParams = array(artId => $latestArtefactid);
			$dbQuery = getQuery('getVerionDetailsOfArtefact', $artefactOldVersionParams);
			$existingArtVersionDetails = $db->multiObjectQuery($dbQuery);
			
			$existingArtVersionDetails = $existingArtVersionDetails[0];			

			//insert a new row for the new artefact version of the main artefact
			$column_names = array('artefact_ver_id','artefact_id','version_label','created_by','created_date','document_path','MIME_type','file_size','state','shared');
			$columnData = array($latestVersion+1,$previousArtefactid,$existingArtVersionDetails->version_label,$existingArtVersionDetails->created_by,$existingArtVersionDetails->created_date,$existingArtVersionDetails->document_path,$existingArtVersionDetails->MIME_type,$existingArtVersionDetails->file_size,$existingArtVersionDetails->state,0);
			$db->insertSingleRow(TABLE_ARTEFACTS_VERSIONS, column_names , $columnData);
			
			//update the latest version number of the previous artefact
			$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"),array($latestVersion+1),"artefact_id = " . $previousArtefactid);
			
			//now delete the latest artefact from the table
			//$db->deleteTable(TABLE_ARTEFACTS,"artefact_id = ". $latestArtefactid);
			//$db->deleteTable(TABLE_ARTEFACT_VERSIONS,"artefact_id = ". $latestArtefactid);
			
			return true;
		}

		public function replaceArtefact($interpreter) {
			$data = $interpreter->getData()->data;
			
			$artId = $data -> replaceArtefactId;
			$newArt = $data -> newArtefactid;
			$file = $data -> file;
			
			$db = Master::getDBConnectionManager();
			if($newArt > 0) {
				//control comes here while replacing with an existing artefact
				$db->updateTable(TABLE_ARTEFACTS, array("replace_ref_id"), array($newArt), "artefact_id = " . $artId);
			} else {
				//replacingg with a new file
			}
			
			return true;
		}
		
		public function archiveArtefact($interpreter) {
			$data = $interpreter->getData()->data;
			
			$artId = $data -> artefactId;
			
			$db = Master::getDBConnectionManager();
			$db->updateTable(TABLE_ARTEFACTS,array("state"),array('A'), "artefact_id = " . $artId);
			
			return true;
		}
		
		public function deleteArtefact($interpreter) {
			$data = $interpreter->getData()->data;			
			$artId = $data -> artefactId;
			
			$db = Master::getDBConnectionManager();
			$db->deleteTable(TABLE_ARTEFACTS, "artefact_id = " . $artId);
			
			return true;
		}		
		
		public function linkArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$artefactId = 1;
			$linkArtefacts = $data -> linkIds;
			
			return $this->linkarts();
		}	
		
		public function linkArts ($artefactId, $linkArtefacts) {
			
			$date = date("Y-m-d H:i:s");
			
			$db = Master::getDBConnectionManager();
			//$db->updateTable (TABLE_ARTEFACTS,array("linked_id"),array(0), "artefact_id = " . $artefactId);			
			//Get the artefact link id
			$queryParams = array('artefactid' => $artefactId );
			$dbQuery = getQuery('getArtefactLinkId',$queryParams);
			$artefactLinkId = $db->singleObjectQuery($dbQuery);
			$artefactLinkId	= $artefactLinkId -> linked_id;		
		
			if($artefactLinkId == 0) {
				$dbQuery = getQuery('getMaxLinkId');
				$artefactLinkId = $db->singleObjectQuery($dbQuery);
				
				//Get the max link id of all the artefacts link id and add one to get a new linked id.
				$artefactLinkId = $artefactLinkId -> linked_id + 1;
				
				//Update artefact linked id in artefacts table
				$db->updateTable (TABLE_ARTEFACTS,array("linked_id"),array("$artefactLinkId"), "artefact_id = " . $artefactId);
			}
			
			for($i = 0; $i < sizeof($linkArtefacts); $i++) {
				//Get the linked artefact link id
				$queryParams = array('artefactid' => $linkArtefacts[$i] );
				$dbQuery = getQuery('getArtefactLinkId',$queryParams);
				$linkedArtefactLinkId = $db->singleObjectQuery($dbQuery);
				$linkedArtefactLinkId = $linkedArtefactLinkId -> linked_id;
				
				if($artefactLinkId != $linkedArtefactLinkId) {
					if($linkedArtefactLinkId != 0) {
						//Update all linked artefacts linked id with artefact link id in artefacts table
						$db->updateTable (TABLE_ARTEFACTS,array("linked_id"),array("$artefactLinkId"), "linked_id = " . $linkedArtefactLinkId);	
						
						//Update only that linked artefacts linked id with artefact link id in artefact links table
						$db->updateTable (TABLE_ARTEFACT_LINKS,array("linked_id"),array("$artefactLinkId"), "linked_id = " . $linkedArtefactLinkId);
					} else {
						//Update linked artefacts linked id with artefact link id in artefacts table
						$db->updateTable (TABLE_ARTEFACTS,array("linked_id"),array("$artefactLinkId"), "artefact_id = " . $linkArtefacts[$i]);							
					}
					
					//Add link entry in artefact link table
					$db->insertSingleRow (TABLE_ARTEFACT_LINKS,array("linked_from_id","linked_to_id","linked_id","linked_date"),array("$artefactId","$linkArtefacts[$i]","$artefactLinkId","$date"));										
				}					
			}
			return $artefactLinkId -> linked_id + 1;
		}

		public function getReferences($interpreter) {
			$data = $interpreter -> getData() -> data;
			
			$userid = $interpreter->getUser()->user_id;
			$ignore = $data->ignore;
			$projectid = $data->projectid;
			$db = Master::getDBConnectionManager();

			$queryParams = array("userid" =>$userid, "ignore"=>$ignore, "projectid" => $projectid);

			$dbQuery = getQuery('getReferences',$queryParams);
			
			$refs = $db-> multiObjectQuery($dbQuery);

			return $refs;
		}
		
		public function addArtefact($interpreter) {
			
			if(isset($_FILES["file"]["type"])) {

				$data = $interpreter->getData();
				$uploadFile = $_FILES["file"]["type"];
				Master::getLogManager()->log(DEBUG, MOD_MAIN,"we have the file with us");
				
				$data->userId = $interpreter->getUser()->user_id;
				
				$sourcePath = $_FILES['file']['tmp_name'];       // Storing source path of the file in a variable
				$targetPath = $AppGlobal['gloabl']['storeLocation'].$_FILES['file']['name']; // Target path where file is to be stored
				move_uploaded_file($sourcePath,$targetPath) ;
				
				//now store the artefact detail in the tables related to artefacts and versions
				$db = Master::getDBConnectionManager();
				
				if(isset($data->artefact_id)) {
					$artId = $data->artefact_id;
				} else {
					//if it is a new artefact
					$columnnames = array('project_id','artefact_title', 'description', 'artefact_type', );
					$rowvals = array($data->project, $_FILES['file']['name'], $data->description, $data->type);
					$artId = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS, $columnnames, $rowvals);
				}
				
				//else 
				$verColumnNames = array("artefact_id", "version_label","created_by","document_path","MIME_type", "file_size", "state", "created_date");
				$verRowValues = array($artId, $_FILES['file']['name'], $data->userId, $targetPath, $data->MIMEtype->type,  $data->size, 'c', date("Y-m-d H:i:s"));
				
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
				
				if($data->linkIds) {
					$links = $this->linkArts ($artId, $data->linkIds);
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
