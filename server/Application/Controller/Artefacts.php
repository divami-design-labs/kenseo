<?php

	require_once("Comments.php");

	//@TODO: too much code is repetetive in here needs refinement
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
			        $sortBy = "a.artefact_title";
			        break;
			    case "date":
			        $sortBy = "m.shared_date";
			        break;
			    case "owner":
			        $sortBy = "u.name";
			        break;
				case "default":
			        $sortBy = "a.linked_id";
			        break;
			    default:
			        $sortBy = "a.linked_id";
			}
			
			$db = Master::getDBConnectionManager();

			$queryParams = array('userid' => $userid, 'projectid' => $projectid, '@sortBy' => $sortBy);
			if($sharePermission == "true") {
				$dbQuery = getQuery('getProjectArtefactsWithSharePermission', $queryParams);
			} else {
				$dbQuery = getQuery('getProjectArtefacts', $queryParams);
			}
			
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}
		function getSharedArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;
			$limit = $data->limit;
			
			$db = Master::getDBConnectionManager();
			$querDetails = getQuery('getSharedArtefacts',array('userid'=>$userid, '@limit' => $limit ));
			$resultObj = $db->multiObjectQuery($querDetails);
			return $resultObj;
		}
		
		public function getRecentArtefactActivities($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;;
			$limit = $data->limit;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userid , '@limit' => $limit);
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
		public function addVersion($interpreter) {
			global $AppGlobal;
			$data = $interpreter->getData();
			if($data->data != null) {
				$data = $data->data;
			}
			
			$userId = $interpreter->getUser()->user_id;
			$previousArtefactid = $data->id;
			$latestArtefactid = $data -> artefact_id;
			$projectId = $data -> project_id;
			$db = Master::getDBConnectionManager();
			
			//get the latest version 
				$queryParams = array('artId' => $previousArtefactid);
				$dbQuery = getQuery('getHighestVersionOfArtefact', $queryParams);
				$latestVer = $db->singleObjectQuery($dbQuery)->vers;
				
			if(isset($_FILES["file"]["type"])) {
				
				//replacing with a new file
				$uploadFile = $_FILES["file"]["type"];
				Master::getLogManager()->log(DEBUG, MOD_MAIN,"we have the file with us");
				$date = date("Y-m-d H:i:s");
				$data->userId = $interpreter->getUser()->user_id;
				
				$sourcePath = $_FILES['file']['tmp_name'];       // Storing source path of the file in a variable
				$path = $AppGlobal['gloabl']['storeLocation'] . $projectId . "/" . $previousArtefactid;
				if(! is_dir($path)) {
					mkdir($path, 0777, true);
				}
				$newVersion = $latestVer+1;
				$targetPath = $path . "/" .$previousArtefactid."_".$newVersion; // Target path where file is to be stored
				move_uploaded_file($sourcePath,$targetPath) ;
				
				//now store the artefact detail in the tables related to artefacts and versions
				$mimeType = $_FILES['file']->MIMEtype->type;
				//create a new version
				$columnNames = array('artefact_id', 'version_no', 'created_by', 'created_date', 'document_path', 'MIME_type', 'file_size', 'state', 'shared');
				$rowValues = array($previousArtefactid, $latestVer+1, $userId, $date, $targetPath, $_FILES["file"]["type"], $_FILES['file']['tmp_name']->file_size, 'A', 1);
				//@TODO: Remove and 1 and put correct value
				
				$newVer = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS_VERSIONS, $columnNames, $rowValues);
				
				//update the artefact table
				$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($newVer), "artefact_id = " . $previousArtefactid);
				
				//now share the new vesion to yourself
				$shareColumnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
				$shareRowValues = array($newVer, $previousArtefactid, $userId, 'S', $date, $userId);
				$db->insertSingleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $shareColumnNames, $shareRowValues);
				
				
				return true;
			} else {
				
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
				$column_names = array('version_no','artefact_id','version_label','created_by','created_date','document_path','MIME_type','file_size','state','shared');
				$columnData = array(latestVer+1, $previousArtefactid, $existingArtVersionDetails->version_label,$existingArtVersionDetails->created_by,$existingArtVersionDetails->created_date,$existingArtVersionDetails->document_path,$existingArtVersionDetails->MIME_type,$existingArtVersionDetails->file_size,$existingArtVersionDetails->state,0);
				$newVer = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS_VERSIONS, $column_names , $columnData);
				
				//update the latest version number of the previous artefact
				$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"),array($newVer),"artefact_id = " . $previousArtefactid);
				
				//now delete the latest artefact from the table
				//$db->deleteTable(TABLE_ARTEFACTS,"artefact_id = ". $latestArtefactid);
				//$db->deleteTable(TABLE_ARTEFACTS_VERSIONS,"artefact_id = ". $latestArtefactid);
				
				$shareColumnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
				$shareRowValues = array($newVer, $previousArtefactid, $userId, 'S', date("Y-m-d H:i:s"), $userId);
				$db->insertSingleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $shareColumnNames, $shareRowValues);
				
				return true;
			}
			
		}

		public function replaceArtefact($interpreter) {
			$data = $interpreter->getData();
			if($data->data != null) {
				$data = $data->data;
			}
			
			$artId = $data -> id;
			$projId = $data -> project_id;
			$newArt = $data -> artefact_id;
			$file = $data -> file;
			
			$userId = $interpreter->getUser()->user_id;
			$date = date("Y-m-d H:i:s");
			$db = Master::getDBConnectionManager();
			
			if(isset($_FILES["file"]["type"])) {
				
				//replacing with a new file
				$uploadFile = $_FILES["file"]["type"];
				Master::getLogManager()->log(DEBUG, MOD_MAIN,"we have the file with us");
				
				$data->userId = $interpreter->getUser()->user_id;
				//get the latest version 
				$queryParams = array('artId' => $newArt);
				$dbQuery = getQuery('getHighestVersionOfArtefact', $queryParams);
				$latestVer = $db->singleObjectQuery($dbQuery)->vers;
				
				
				$sourcePath = $_FILES['file']['tmp_name'];       // Storing source path of the file in a variable
				$path = $AppGlobal['gloabl']['storeLocation'] . $projId . "/" . $artId;
				if(! is_dir($path)) {
					mkdir($path, 0777, true);
				}
				$newVersion = $latestVer+1;
				$targetPath = $path . "/" .$artId."_".$newVersion; // Target path where file is to be stored
				move_uploaded_file($sourcePath,$targetPath) ;
				
				//now store the artefact detail in the tables related to artefacts and versions
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $AppGlobal['gloabl']['storeLocation']);
				//create a new version
				$columnNames = array('artefact_id', 'version_no', 'created_by', 'created_date', 'document_path', 'MIME_type', 'file_size', 'state', 'shared');
				$rowValues = array($artId, $latestVer, $userId, $date, $targetPath, $_FILES["file"]["type"], $_FILES['file']['tmp_name']->file_size, 'c', 0);
				$newVer = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS_VERSIONS, $columnNames, $rowValues);
				
				//update the artefact table
				$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($newVer), "artefact_id = " . $artId);
				
				//share the arrtefact to Owner
				$shareColumnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
				$shareRowValues = array($newVer, $artId, $userId, 'S', date("Y-m-d H:i:s"), $userId);
				$db->insertSingleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $shareColumnNames, $shareRowValues);
				
				return true;
			} else {
				//control comes here while replacing with an existing artefact

				//first get all the versions of newArt
				$queryParams = array('artId' => $newArt);
				$dbQuery = getQuery('getAllVersionsOfArtefact', $queryParams);
				$newArtVers = $db->multiObjectQuery($dbQuery);
				
				//get the latestVersion of the artefact
				$queryParams = array('artId' => $artId);
				$dbQuery = getQuery('getHighestVersionOfArtefact', $queryParams);
				$latestVer = $db->singleObjectQuery($dbQuery)->vers;
				
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $latestVer);

				//update artefact version Numbers
				singleResultQuery("UPDATE artefact_versions set version_no = version_no+$latestVer where artefact_id=$newArt");
				//now change the artefact id
				$db->updateTable(TABLE_ARTEFACTS_VERSIONS, array("artefact_id"), array($newVer), "artefact_id = " . $artId);
				
				//update the latest version
				$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($newVer), "artefact_id = " . $artId);
				//update the new artefact that it is replaced.
				$db->updateTable(TABLE_ARTEFACTS, array("replace_ref_id"), array($artId), "artefact_id = " . $newArt);
				
				//add an activity of replacement
				$columnNames = array('project_id', 'logged_by', 'logged_time', 'performed_on', 'activity_type', 'performed_on_id');
				$rowValues = array($projId, $userId, $date, 'A', 'R', $artId);
				$db->insertSingleRow(TABLE_PROJECT_ACTIVITY, $columnNames, $rowValues);
				
				return true;
				
			}
			
		}
		
		public function archiveArtefact($interpreter) {
			$data = $interpreter->getData()->data;
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $data);
			$artId = $data -> id;
			
			$db = Master::getDBConnectionManager();
			$db->updateTable(TABLE_ARTEFACTS,array("state"),array('A'), "artefact_id = " . $artId);
			
			return true;
		}
		
		public function deleteArtefact($interpreter) {
			$data = $interpreter->getData()->data;			
			$artId = $data -> id;
			$userId = $interpreter->getUser()->user_id;
			
			//first get project ID
			$db = Master::getDBConnectionManager();
			$queryParams = array('artId' => $artId );
			$dbQuery = getQuery('getProjectOfArtefact',$queryParams);
			$artefactProjId = $db->singleObjectQuery($dbQuery);
			$project_id = $artefactProjId -> project_id;
			
			$db->updateTable(TABLE_ARTEFACTS, array('state'), array('D') ,"artefact_id = " . $artId);
						
			//Add project activity that this artefact is deleted
			$activityColumnNames = array("project_id", "logged_by", "logged_time", "performed_on", "activity_type", "performed_on_id");
			$activityRowValues = array($project_id, $userId, date("Y-m-d H:i:s"), 'A', 'D', $artId);
			$db->insertSingleRow(TABLE_PROJECT_ACTIVITY, $activityColumnNames, $activityRowValues);
			
			return true;
		}		
		
		public function linkArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$artefactId = 1;
			$linkArtefacts = $data -> linkIds;
			
			return $this->linkarts($artefactId, $linkArtefacts);
		}	
		
		public function linkArts ($artefactId, $linkArtefacts) {
			$linkArtefacts = json_decode($linkArtefacts);
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
			$data = $interpreter->getData()->data;
			
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
			global $AppGlobal;
			if(isset($_FILES["file"]["type"])) {

				// Get DB Connection and start new transaction
				$db = Master::getDBConnectionManager();
				$db->beginTransaction();

				$data = $interpreter->getData();
				$uploadFile = $_FILES["file"]["type"];
				Master::getLogManager()->log(DEBUG, MOD_MAIN,"we have the file with us");
				
				$data->userId = $interpreter->getUser()->user_id;

				//@TODO: Remove this line when UI sends only project_id
				$data->project_id = $data->project_id ? $data->project_id : $data->id;
				
				// If artefact_id is there, then user is creating new version to the existing document.
				if(isset($data->artefact_id)) {
					Master::getLogManager()->log(DEBUG, MOD_MAIN,"we have a selected artefcat");
					$artId = $data->artefact_id;

					$queryParams = array('artId' => $artId);
					$dbQuery = getQuery('getHighestVersionOfArtefact', $queryParams);
					$ver_no = $db->singleObjectQuery($dbQuery)->vers;
				} else {
					// Do this for stringified array values.
					$data->doctype = json_decode($data->doctype);

					// If it is a new artefact
					$docType = $data->doctype[0]->{"data-name"} ? $data->doctype[0]->{"data-name"} : 'I';
					$columnnames = array('project_id','artefact_title', 'description', 'artefact_type');
					$rowvals = array($data->project_id, $_FILES['file']['name'], $data->description, $docType);

					$artId = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS, $columnnames, $rowvals);
					
					$ver_no = 0;
				}
				
				// Storing source path of the file in a variable
				$sourcePath = $_FILES['file']['tmp_name'];

				// Get org_id from project_id to store documents in organization wise.
				$queryParams = array('project_id' => $data->project_id);
				$dbQuery = getQuery('getProjectOrganizationId', $queryParams);
				$org_id = $db->singleObjectQuery($dbQuery)->org_id;

				$fileExt = explode('.', $_FILES['file']['name']);
				$path = $AppGlobal['gloabl']['storeLocation'] . $org_id ."/". $data->project_id . "/" . $artId;
				if(! is_dir($path)) {
					mkdir($path, 0777, true);
				}
				$newVersion = $ver_no+1;

				$masked_artefact_version = getRandomString(12) . $artId . $newVersion;

				// Target path where file is to be stored
				$targetPath = $path . "/" . $masked_artefact_version .".". $fileExt[count($fileExt)-1];
				
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "targetPath");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $targetPath);
				
				
				move_uploaded_file($sourcePath,$targetPath);
				
				//now store the artefact detail in the tables related to artefacts and versions
				Master::getLogManager()->log(DEBUG, MOD_MAIN,$data->artefact_id);
								
				$ver_no++;
				
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "mimeType test");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $_FILES["file"]["type"]);
				
				$verColumnNames = array("artefact_id", "masked_artefact_version_id", "created_by","document_path","MIME_type", "file_size", "state", "created_date", "version_no");
				$verRowValues = array($artId, $masked_artefact_version, $data->userId, $targetPath, $_FILES["file"]["type"], $data->size, 'A', date("Y-m-d H:i:s"), $ver_no);
				
				$artVerId = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS_VERSIONS, $verColumnNames, $verRowValues);
				
				// Update the latest art version id
				$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($artVerId), "artefact_id = " . $artId );
				
				/***** Now share the artefact version *****/
				// Get members of the project.
				$params = array('project_id' => $data->project_id);
				$query = getQuery('getProjectMembers', $params);
				$result = $db->multiObjectQuery($query);

				// Share this artefact to all project members based on their permissions
				$columnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
				$rowValues = array();
				for($i=0, $iLen=count($result); $i<$iLen; $i++) {
					$rowValues[] = array($artVerId, $artId, $result[$i]->user_id, $result[$i]->access_type, date("Y-m-d H:i:s"), $data->userId);
				}
				$db->replaceMultipleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $columnNames, $rowValues);

				
				// Add tags to the artefacts
				/*$tagsList = json_decode($data->tags);
				for($i = 0 ; $i<count($tagsList); $i++) {
					$tagColumnNames = array("artefact_id", "tag_id", "created_date", "created_by");
					$tagRowValues = array($artId, $tagsList[$i], date("Y-m-d H:i:s"), $data->userId );
					$db->insertSingleRow(TABLE_ARTEFACTS_TAGS, $tagColumnNames, $tagRowValues);
				}
				
				// Add references to the artefact
				$refDocs = json_decode($data->referencesIds);
				for($i = 0 ; $i< count($refDocs); $i++) {
					$refColumnNames = array("artefact_ver_id", "artefact_id", "created_date", "created_by");
					$refRowValues = array($artVerId, $refDocs[$i], date("Y-m-d H:i:s"), $data->userId );
					$db->insertSingleRow(TABLE_ARTEFACT_REFS, $refColumnNames, $refRowValues);
				}
				
				// Add Links to the artefacts
				if($data->linksIds) {
					$links = $this->linkArts($artId, $data->linksIds);
				}*/
				
				// Add this as project activity
				$activityColumnNames = array("project_id", "logged_by", "logged_time", "performed_on", "activity_type", "performed_on_id");
				$activityRowValues = array($data->project_id, $data->userId, date("Y-m-d H:i:s"), 'A', 'N', $artId);
				$db->insertSingleRow(TABLE_PROJECT_ACTIVITY, $activityColumnNames, $activityRowValues);

				// Add this as notification
				$notificationColumnNames = array("user_id", "message", "project_id", "notification_by", "notification_date", "notification_type", "notification_ref_id", "notification_state");
				$notificationRowValues = array($data->userId, $_FILES['file']['name'], $data->project_id, $data->userId, date("Y-m-d H:i:s"), 'S', $artVerId, 'U');
				$db->insertSingleRow(TABLE_NOTIFICATIONS, $notificationColumnNames, $notificationRowValues);
				
				// Share to members
				if(count($data->shared_members)) {
					$this->shareForTeam($artId, $artVerId, $data->shared_members, $data->userId);
				}

				$db->commitTransaction();
				
				return $targetPath;
			} else {
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $interpreter->getData()->data->type);
				return false;
			}
		}
		
		public function shareForTeam($artId, $artVerId, $team, $sharedBy) {
			$db = Master::getDBConnectionManager();
			$team = json_decode($team);

			$shareColumnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
			$shareRowValues = array();
			for($i=0, $iLen=count($team); $i<$iLen; $i++) {
				$shareRowValues[] = array($artVerId, $artId, $team[$i]->user_id, $team[$i]->access_type , date("Y-m-d H:i:s"), $sharedBy);
			}

			// Insert or replace all shared members of this artefact.
			$db->replaceMultipleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $shareColumnNames, $shareRowValues);
			
			// Update artefact version as shared.
			$db->updateTable(TABLE_ARTEFACTS_VERSIONS, array('shared'), array(1), "artefact_ver_id = $artVerId");
		}
		
		public function shareArtefact($interpreter) {
			$data = $interpreter->getData();
			$artVerId = $data-> versionId;
			$artId = $data->id;
			$userId = $interpreter->getUser()->user_id;
			$this->shareForTeam($artId, $artVerId,$data->sharedTo, $data->userId);
		}
		
		public function getArtefactDetails($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			$maskedArtefactVersionId = $data->maskedArtefactVersionId;
			
			$db = Master::getDBConnectionManager();
			
			// Get current artefact version details
			$queryParams = array('maskedArtefactVersionId' => $maskedArtefactVersionId);
			$detailsQuery = getQuery('getArtefactDetails', $queryParams);
			$artefactObj = $db->singleObjectQuery($detailsQuery);
			$artefactVerId = $artefactObj->artefact_ver_id;

			// Get all versions of an artefact
			$versionQuery = getQuery('getArtefactVersionSummary', $queryParams);
			$versionSummary = $db->multiObjectQuery($versionQuery);
			if($data->withVersions) {
				$artefactObj->versions = $versionSummary;
			}
			
			// Before sending all the date we can simply have the gist of the targeted version directly.
			// The gist is nothing but the documentPath, versionNo, versionId etc.
			$versionCount = count($versionSummary);
			for($i=0; $i<$versionCount; $i++) {
				if($versionSummary[$i]->masked_artefact_version_id == $maskedArtefactVersionId) {
					$artefactObj->documentPath = $versionSummary[$i]->documentPath;
					$artefactObj->versionNo = $versionSummary[$i]->versionNo;
					$artefactObj->versionId = $versionSummary[$i]->versionId;
					$artefactObj->type = $versionSummary[$i]->type;
				}
			}

			// Get comments of current artefact version Id
			if($data->withComments) {
				// Get all comments based on generated comment thread ids
				$artefactObj->threads = Comments::getThreadComments($db, $artefactVerId);
			}
			
			return $artefactObj;
		} 
		
		public function getVersionDetails($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			$verId = $data->versionId;
			
			$queryParams = array('verId' => $verId);
			$db = Master::getDBConnectionManager();
			
			//get shared details
			$sharedToQuery = getQuery('getArtefactVersionShared',$queryParams);
			$sharedTo = $db->multiObjectQuery($sharedToQuery);
			
			//get version details
			$commentQuery = getQuery('getArtefactVersionComments',$queryParams);
			$comments = $db->multiObjectQuery($commentQuery);
			
			$resultObj = array(
				'versionId' => $verId,
				'comments' => $comments,
				'sharedTo' => $sharedTo
			);
			
			return $resultObj;
		}
		
		public function getDocumentSummary($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			$maskedVerId = $data->maskedVerId;
			
			$db = Master::getDBConnectionManager();
			
			//get the basic details of the artefact based on the artefact version.
			$queryParams = array('maskedVerId' => $maskedVerId, userId=>$userId);

			$basicDetailsQuery = getQuery('artefactBasicDetails', $queryParams);
			$basicDetails = $db->singleObjectQuery($basicDetailsQuery);

			$basicDetails->versionId = $verId;
			
			//get linked artefacts.
			$linkedArtefactQuery = getQuery('getLinkedArtefactList', $queryParams);
			$linkedArtefacts = $db->multiObjectQuery($linkedArtefactQuery);
			
			//get reference artefacts.
			$refArtefactQuery = getQuery('getReferenceArtefactList', $queryParams);
			$referenceArtefacts = $db->multiObjectQuery($refArtefactQuery);
			
			//get versions of the artefact.
			$artefactVersionQuery = getQuery('getArtefactVersionsList', $queryParams);
			$artefactVersions = $db->multiObjectQuery($artefactVersionQuery);
			
			//get shared members of the document.
			$artefactSharedQuery = getQuery('getArtefactSharedMemebersList', $queryParams);
			$artefactSharedMemebers = $db->multiObjectQuery($artefactSharedQuery);
			
			//get time data.
			//we need references, 
			$timelineReferencesQuery = getQuery('getTimeLineReferences', $queryParams);
			$timelineReferences = $db->multiObjectQuery($timelineReferencesQuery);
			
			// we need links
			$timelineLinksQuery = getQuery('getTimeLineLinks', $queryParams);
			$timelineLinks = $db->multiObjectQuery($timelineLinksQuery);
			
			//we need meetings
			$timelineMeetingsQuery = getQuery('getTimeLineMeetings', $queryParams);
			$timelineMeetings = $db->multiObjectQuery($timelineMeetingsQuery);
			
			// we need sharing details
			$timelineSharedQuery = getQuery('getTimeLineUsers', $queryParams);
			$timelineShared = $db->multiObjectQuery($timelineSharedQuery);
			
			// we need comment details
			$timelineCommentQuery = getQuery('getTimeLineReferences', $queryParams);
			$timelineComment = $db->multiObjectQuery($timelineCommentQuery);
			
			//massage the ordered data into groups based on date
			$timeline = array();
			for($i=0; $i<count($artefactVersions); $i++) {
				$date = date_create($artefactVersions[$i]->created_date);
				$formattedDate = date_format($date, 'Y-m-d');
				
				$data = $artefactVersions[$i];
				$data->type = 'versions';

				$timeline[$formattedDate][] = $data;
			}
			for($i=0; $i<count($timelineLinks); $i++) {
				$date = date_create($timelineLinks[$i]->linked_date);
				$formattedDate = date_format($date, 'Y-m-d');
				
				$data = $timelineLinks[$i];
				$data->type = 'links';

				$timeline[$formattedDate][] = $data;
			}
			
			for($i=0; $i<count($timelineMeetings); $i++) {
				$date = date_create($timelineMeetings[$i]->meeting_time);
				$formattedDate = date_format($date, 'Y-m-d');
				
				$data = $timelineMeetings[$i];
				$data->type = 'meetings';

				$timeline[$formattedDate][] = $data;
			}
			
			for($i=0; $i<count($timelineShared); $i++) {
				$date = date_create($timelineShared[$i]->shared_date);
				$formattedDate = date_format($date, 'Y-m-d');
				
				$data = $timelineShared[$i];
				$data->type = 'shared';

				$timeline[$formattedDate][] = $data;
			}
			/*for($i=0; $i<count($timelineComment); $i++) {
				$date = date_create($timelineComment[$i]->linked_date);
				$formattedDate = date_format($date, 'Y-m-d');
				
				$data = $timelineComment[$i];
				$data->type = 'links';

				$timeline[$formattedDate][] = $data;
			}*/
			
			
			for($i=0; $i<count($timelineReferences); $i++) {
				$date = date_create($artefactVersions[$i]->created_date);
				$formattedDate = date_format($date, 'Y-m-d');
				
				$data = $timelineReferences[$i];
				$data->type = 'references';

				$timeline[$formattedDate][] = $data;
			}
			
			$resultObj = array(
				basicDetails => $basicDetails,
				links => $linkedArtefacts,
				references => $referenceArtefacts,
				versions => $artefactVersions,
				sharedTo => $artefactSharedMemebers,
				timeline => $timeline
			);
			
			return $resultObj;
		}  
	}
?>
