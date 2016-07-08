<?php

	require_once("Comments.php");
	require_once('Email.php');

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
			        $sortBy = "sm.shared_date";
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

		public function replaceArtefact($interpreter) {
			$data = $interpreter->getData();
			if($data->data != null) {
				$data = $data->data;
			}

			$artId = $data->id;
			$projId = $data->project_id;
			$newArt = $data->artefact_id;
			$file = $data->file;

			$userId = $interpreter->getUser()->user_id;
			$date = date("Y-m-d H:i:s");
			$db = Master::getDBConnectionManager();

			if(isset($data->filesToUpload)) {

				$FILES = $data->filesToUpload;

				//replacing with a new file
				$uploadFile = $FILES['type'][0];
				Master::getLogManager()->log(DEBUG, MOD_MAIN,"we have the file with us");

				$data->userId = $interpreter->getUser()->user_id;
				//get the latest version
				$queryParams = array('artId' => $newArt);
				$dbQuery = getQuery('getHighestVersionOfArtefact', $queryParams);
				$latestVer = $db->singleObjectQuery($dbQuery)->vers;


				$sourcePath = $FILES['tmp_name'][0];       // Storing source path of the file in a variable
				$path = $AppGlobal['gloabl']['storeLocation'] . $projId . "/" . $artId;
				if(! is_dir($path)) {
					mkdir($path, 0777, true);
				}
				$newVersion = $latestVer+1;
				$targetPath = $path . "/" .$artId."_".$newVersion; // Target path where file is to be stored
				move_uploaded_file($sourcePath, $targetPath) ;

				//now store the artefact detail in the tables related to artefacts and versions
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $AppGlobal['gloabl']['storeLocation']);
				//create a new version
				$columnNames = array('artefact_id', 'version_no', 'created_by', 'created_date', 'document_path', 'MIME_type', 'file_size', 'state', 'shared');
				$rowValues = array($artId, $latestVer, $userId, $date, $targetPath, $FILES["type"][0], $FILES["size"][0], 'C', 0);
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
			$artId = $data->id;

			$db = Master::getDBConnectionManager();
			$db->updateTable(TABLE_ARTEFACTS, array("state"), array('A'), "artefact_id = " . $artId);

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

		public function uploadFile($fileInfo, $projectId, $org_id, $artId, $masked_artefact_version) {
			global $AppGlobal;
			$sourcePath = $fileInfo['tmp_name'];	// Storing source path of the file in a variable

			$fileExt = explode('.', $fileInfo['name']);
			$path = $AppGlobal['gloabl']['storeLocation'] . $org_id ."/". $projectId . "/" . $artId;
			if(! is_dir($path)) {
				mkdir($path, 0777, true);
			}

			// Target path where file is to be stored
			$targetPath = $path . "/" . $masked_artefact_version .".". $fileExt[count($fileExt)-1];
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "targetPath");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $targetPath);

			move_uploaded_file($sourcePath, $targetPath);

			return $targetPath;
		}

		public function addVersion($interpreter) {
			global $AppGlobal;
			$data = $interpreter->getData();
			if($data->data != null) {
				$data = $data->data;
			}

			$userId = $interpreter->getUser()->user_id;
			$projectId = $data->project_id;
			$previousArtefactid = $data->id;

			$db = Master::getDBConnectionManager();
			$db->beginTransaction();

			//get the latest version
			$queryParams = array('artId' => $previousArtefactid);
			$dbQuery = getQuery('getHighestVersionOfArtefact', $queryParams);
			$ver_no = $db->singleObjectQuery($dbQuery)->vers;
			$ver_no++;

			if(isset($data->filesToUpload)) {

				$FILES = $data->filesToUpload;

				// Get org_id from project_id to store documents in organization wise.
				$queryParams = array('project_id' => $projectId);
				$dbQuery = getQuery('getProjectOrganizationId', $queryParams);
				$org_id = $db->singleObjectQuery($dbQuery)->org_id;

				// Generate masked artefact version id
				$masked_artefact_version = getRandomString(12) . $previousArtefactid . $ver_no;

				// Upload File
				$targetPath = $this->uploadFile(array(
						'tmp_name'=> $FILES['tmp_name'][0],
						'name'=> $FILES['name'][0]
					), $projectId, $org_id, $previousArtefactid, $masked_artefact_version);


				// Get previous artefact version shared
				$queryParams = array('artId' => $previousArtefactid);
				$dbQuery = getQuery('getLatestArtefactSharedValue', $queryParams);
				$shared = $db->singleObjectQuery($dbQuery)->shared;

				// Store the artefact detail in the tables related to artefacts and versions
				$columnNames = array('artefact_id', 'version_no', 'masked_artefact_version_id', 'created_by', 'created_date', 'document_path', 'MIME_type', 'file_size', 'state', 'shared');
				$rowValues = array($previousArtefactid, $ver_no, $masked_artefact_version, $userId, date("Y-m-d H:i:s"), $targetPath, $FILES['type'][0], $data->size, 'A', $shared);
				$newVer = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS_VERSIONS, $columnNames, $rowValues);


				// Update the artefact table
				$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($newVer), "artefact_id = " . $previousArtefactid);

				/***** Now share the artefact version *****/
				$columnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
				$rowValues = array();

				// Get members of the project.
				$params = array('project_id' => $projectId);
				$query = getQuery('getProjectMembers', $params);
				$result = $db->multiObjectQuery($query);
				for($i=0, $iLen=count($result); $i<$iLen; $i++) {
					$rowValues[] = array($newVer, $previousArtefactid, $result[$i]->user_id, $result[$i]->access_type, date("Y-m-d H:i:s"), $userId);
				}

				// Share this artefact to all project members based on their permissions
				$db->replaceMultipleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $columnNames, $rowValues);

				$db->commitTransaction();
				return true;
			} else {
				$latestArtefactid = $data->artefact_id;

				// Get the version details
				$params = array(artId => $latestArtefactid);
				$dbQuery = getQuery('getVerionDetailsOfArtefact', $params);
				$details = $db->multiObjectQuery($dbQuery);
				$details = $details[0];

				// Generate masked artefact version id
				$masked_artefact_version = getRandomString(12) . $previousArtefactid . $ver_no;

				// Insert a new row for the new artefact version of the main artefact
				$column_names = array('version_no','artefact_id', 'masked_artefact_version_id', 'version_label','created_by','created_date','document_path','MIME_type','file_size','state','shared');
				$columnData = array($ver_no, $previousArtefactid, $masked_artefact_version, $details->version_label, $userId, $details->created_date, $details->document_path, $details->MIME_type, $details->file_size, $details->state, $details->shared);
				$newVer = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS_VERSIONS, $column_names , $columnData);

				// Update the latest version number of the previous artefact
				$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($newVer), "artefact_id = " . $previousArtefactid);

				/***** Now share the artefact version *****/
				$columnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
				$rowValues = array();

				// Get members of the project.
				$params = array('project_id' => $projectId);
				$query = getQuery('getProjectMembers', $params);
				$result = $db->multiObjectQuery($query);
				for($i=0, $iLen=count($result); $i<$iLen; $i++) {
					$rowValues[] = array($newVer, $previousArtefactid, $result[$i]->user_id, $result[$i]->access_type, date("Y-m-d H:i:s"), $userId);
				}
				// Share this artefact to all project members based on their permissions
				$db->replaceMultipleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $columnNames, $rowValues);

				$db->commitTransaction();
				return true;
			}
		}

		/**
		 * Function to add new artefact (with new file upload).
		 */
		public function addArtefact($interpreter) {
			$userId = $interpreter->getUser()->user_id;

			$data = $interpreter->getData();
			if($data->data) {
				$data = $data->data;
			}

			// @TODO: Write all required params here
			/* Required params */
			// @artefact_id
			// @filesToUpload
			//

			//@TODO: Remove this line when UI sends only project_id. Currently projectid is coming as $data->id
			$projectId = isset($data->project_id) ? $data->project_id : $data->id;

			// Get DB Connection and start new transaction
			$db = Master::getDBConnectionManager();
			$db->beginTransaction();

			// Store all artefact version ids,
			// irrespective of whether the artefact file(s) were uploaded
			// or an existing file was choosed
			$artefactVersionIds = array();
			if(isset($data->filesToUpload)) {

				$FILES = $data->filesToUpload;
				$artIds = array();
				// Find no.of files
				$filesCount = 0;
				for($l=0; $l<count($FILES['name']); $l++) {
					$filesCount++;
				}

				// If artefact_id is there, then user is creating new version to the existing document.
				// @TODO-doubt: What if multiple files are uploaded as new version for an existing artefact?
				if(isset($data->artefact_id)) {
					$artIds = array();
					$artIds[] = $data->artefact_id;

					// Get the latest version of artefact
					$queryParams = array('artId' => $artIds[0]);
					$dbQuery = getQuery('getHighestVersionOfArtefact', $queryParams);
					$ver_no = $db->singleObjectQuery($dbQuery)->vers;
				} else {
					// Do this for stringified array values.
					$data->doctype = json_decode($data->doctype);

					// If it is a new artefact
					$docType = $data->doctype[0]->{"data-name"} ? $data->doctype[0]->{"data-name"} : 'I';
					$columnnames = array('project_id','artefact_title', 'description', 'artefact_type');
					$artIds = array();

					for($f=0; $f<$filesCount; $f++) {
						$rowVals = array($projectId, $FILES['name'][$f], $FILES['name'][$f], $docType);
						$artIds[] = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS, $columnnames, $rowVals);
					}

					$ver_no = 0;
				}

				$ver_no++;

				// Get org_id from project_id to store documents in organization wise.
				$queryParams = array('project_id' => $projectId);
				$dbQuery = getQuery('getProjectOrganizationId', $queryParams);
				$org_id = $db->singleObjectQuery($dbQuery)->org_id;

				// Generate masked artefact version ids
				$masked_artefact_versions = array();
				for($f=0; $f<$filesCount; $f++) {
					$masked_artefact_versions[] = getRandomString(12) . $artIds[$f] . $ver_no;

				}

				// Upload File
				$targetPaths = array();
				for($f=0; $f<$filesCount; $f++) {
					$targetPaths[] = $this->uploadFile(array(
						'tmp_name'=> $FILES['tmp_name'][$f],
						'name'=> $FILES['name'][$f]
					), $projectId, $org_id, $artIds[$f], $masked_artefact_versions[$f]);
				}

				// Loop through all the artefacts. Multiple artefacts are there when mulipl upload is done.
				for($f=0; $f<$filesCount; $f++) {
					// Get previous artefact version shared
					$queryParams = array('artId' => $artIds[$f]);
					$dbQuery = getQuery('getLatestArtefactSharedValue', $queryParams);
					$shared = $db->singleObjectQuery($dbQuery)->shared;

					// Store the artefact detail in the tables related to artefacts and versions
					$verColumnNames = array("artefact_id", "masked_artefact_version_id", "created_by","document_path","MIME_type", "file_size", "state", "created_date", "version_no", "shared");
					$verRowValues = array($artIds[$f], $masked_artefact_versions[$f], $userId, $targetPaths[$f], $FILES['type'][$f], $FILES['size'][$f], 'A', date("Y-m-d H:i:s"), $ver_no, $shared);
					// Store the artefact version ids in $artefactVersionIds variable
					$artefactVersionIds[] = $artVerId = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS_VERSIONS, $verColumnNames, $verRowValues);

					// Update the latest art version id
					$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($artVerId), "artefact_id = " . $artIds[$f]);

					/***** Now share the artefact version *****/
					$columnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
					$rowValues = array();

					// Get members of the project.
					$params = array('project_id' => $projectId);
					$query = getQuery('getProjectMembers', $params);
					$result = $db->multiObjectQuery($query);
					for($i=0, $iLen=count($result); $i<$iLen; $i++) {
						$rowValues[] = array($artVerId, $artIds[$f], $result[$i]->user_id, $result[$i]->access_type, date("Y-m-d H:i:s"), $userId);
					}

					// Share this artefact to all project members based on their permissions
					if(count($result)) {
						$db->replaceMultipleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $columnNames, $rowValues);
					}


					// Add tags to the artefacts
					/*$tagsList = json_decode($data->tags);
					for($i = 0 ; $i<count($tagsList); $i++) {
						$tagColumnNames = array("artefact_id", "tag_id", "created_date", "created_by");
						$tagRowValues = array($artIds[$f], $tagsList[$i], date("Y-m-d H:i:s"), $userId );
						$db->insertSingleRow(TABLE_ARTEFACTS_TAGS, $tagColumnNames, $tagRowValues);
					}*/

					// Add references to the artefact
					$refColumnNames = array("artefact_ver_id", "artefact_id", "created_date", "created_by");
					$refRowValues = array();
					$refDocs = json_decode($data->referencesIds);
					for($i = 0 ; $i< count($refDocs); $i++) {
						$refRowValues[] = array($artVerId, $refDocs[$i], date("Y-m-d H:i:s"), $userId);
					}

					if(count($refDocs)) {
						$db->insertMultipleRow(TABLE_ARTEFACT_REFS, $refColumnNames, $refRowValues);
					}

					// Add Links to the artefacts
					/*if($data->linksIds) {
						$links = $this->linkArts($artIds[$f], $data->linksIds);
					}*/

					// Add this as project activity
					$activityColumnNames = array("project_id", "logged_by", "logged_time", "performed_on", "activity_type", "performed_on_id");
					$activityRowValues = array($projectId, $userId, date("Y-m-d H:i:s"), 'A', 'N', $artIds[$f]);
					$db->insertSingleRow(TABLE_PROJECT_ACTIVITY, $activityColumnNames, $activityRowValues);

					// Add this as notification
					$notificationColumnNames = array("user_id", "message", "project_id", "notification_by", "notification_date", "notification_type", "notification_ref_id", "notification_state");
					$notificationRowValues = array($userId, $FILES['name'][$f], $projectId, $userId, date("Y-m-d H:i:s"), 'S', $artVerId, 'U');
					$db->insertSingleRow(TABLE_NOTIFICATIONS, $notificationColumnNames, $notificationRowValues);

					// Share to members
					if(count($data->shared_members)) {
						$this->shareForTeam($artIds[$f], $artVerId, $data->shared_members, $userId);
					}
				}

				// $db->commitTransaction();
				// return array();
			} else {  // When existing file was choosed
				$data->{"choose-exiting-file"} = json_decode($data->{"choose-exiting-file"});
				$artId = $data->{"choose-existing-file"}[0]->{'data-id'};

				if(!$artId) {
					return false;
				}

				$versionArtefact = $data->{"choose-file"};

				// Get the latest artefact version of previos artefact
				$artefactVersionParams = array("artId" => $artId);
				$dbQuery = getQuery('getLatestVerionOfArtefact', $artefactVersionParams);
				$artVerId = $db->multiObjectQuery($dbQuery);
				$artVerId = $artVerId[0]->verId;

				if($versionArtefact && isset($versionArtefact[0]->{'data-id'})) {
					$latestArtefactid = $versionArtefact[0]->{'data-id'};

					$queryParams = array('artId' => $artId);
					$dbQuery = getQuery('getHighestVersionOfArtefact', $queryParams);
					$ver_no = $db->singleObjectQuery($dbQuery)->vers;
					$ver_no++;

					// Get the version details
					$params = array(artId => $latestArtefactid);
					$dbQuery = getQuery('getVerionDetailsOfArtefact', $params);
					$details = $db->multiObjectQuery($dbQuery);
					$details = $details[0];

					// Generate masked artefact version id
					$masked_artefact_version = getRandomString(12) . $artId . $ver_no;

					// Insert a new row for the new artefact version of the main artefact
					$column_names = array('version_no','artefact_id', 'masked_artefact_version_id', 'version_label','created_by','created_date','document_path','MIME_type','file_size','state','shared');
					$columnData = array($ver_no, $artId, $masked_artefact_version, $details->version_label, $userId, $details->created_date, $details->document_path, $details->MIME_type, $details->file_size, $details->state, $details->shared);
					$artVerId = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS_VERSIONS, $column_names , $columnData);

					//update the latest version number of the previous artefact
					$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($artVerId), "artefact_id = " . $artId);
				}

				// Share to members
				if(count($data->shared_members)) {
					$this->shareForTeam($artId, $artVerId, json_encode($data->shared_members), $userId);
				}

				// Store artefact version id in $artefactVersionIds
				$artefactVersionIds[] = $artVerId;

			}

			$mailInfo = $db->multiObjectQuery(getQuery('getAddArtefactMailQuery', array(
				"@artefactversionids" => join(",", $artefactVersionIds),
				"activitydoneuser" => $userId
			)));

			// prepare mail
			$this->addArtefactMail($mailInfo);

			$db->commitTransaction();
			return array();
		}

		public function customImplode($array){
			return join(' and ', array_filter(array_merge(array(join(', ', array_slice($array, 0, -1))), array_slice($array, -1)), 'strlen'));
		}

		public function addArtefactMail($infos){
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "mail info");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $infos);
			$mailData = new stdClass();
			foreach($infos as $key => $info){
				$artefactTitle = $info->{'artefact_title'};
				$projectName = $info->{'project_name'};
				$activityDoneUser = $info->{'activity_done_user'};
				$activityDoneUserMail = $info->{'activity_done_user_mail'};
				$mailData->username = $info->{'screen_name'};
				$email = $info->{'email'};

				$mailData->to = $email;

				if($activityDoneUserMail == $email){
					$mailData->subject = "$projectName: An artefact '$artefactTitle' is shared by you";

					$mailData->message = "Artefact '$artefactTitle' in $projectName is shared by you with " .
					$this->customImplode(array_map(function($a){
						return $a->{'screen_name'};
					}, array_filter($infos, function($a){
						return ($a->{'email'} != $a->{'activity_done_user_mail'});
					})));
				}
				else{
					$mailData->subject = "$projectName: An artefact '$artefactTitle' is shared with you";
					$mailData->message = "Artefact '$artefactTitle' in $projectName is shared with you by $activityDoneUser.";
				}

				Master::getLogManager()->log(DEBUG, MOD_MAIN, "add artefact mail");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $info);


				Email::sendMail($mailData);
			}
		}

		public function shareForTeam($artId, $artVerId, $team, $sharedBy) {
			$db = Master::getDBConnectionManager();
			$team = is_array($team)? $team: json_decode($team);

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
			$info = $interpreter->getData();
			$data = $info->data;
			$artVerId = isset($info->versionId)? $info->versionId: $data->{'artefact_ver_id'};
			$artId = $data->id;
			$userId = $interpreter->getUser()->user_id;
			$this->shareForTeam($artId, $artVerId,$info->sharedTo ? $info->sharedTo: $data->{'shared_members'}, $info->userId);
			return array();
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
			$artefactSharedQuery = getQuery('getArtefactSharedMembersList', $queryParams);
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

		public function getArtefactMetaInfo($interpreter) {
			$userId = $interpreter->getUser()->user_id;
			$data = $interpreter->getData()->data;

			$artId = $data->id;

			$db = Master::getDBConnectionManager();
			$queryParams = array('artId' => $artId);

			$dbQuery = getQuery('getDocumentReferences', $queryParams);
			$references = $db->multiObjectQuery($dbQuery);

			$dbQuery = getQuery('getArtefactSharedMembers', $queryParams);
			$sharedMembers = $db->multiObjectQuery($dbQuery);

			$dbQuery = getQuery('getArtefactType', $queryParams);
			$docType = $db->singleObjectQuery($dbQuery)->artefact_type;

			$result = array(
				'referenceDocs' => $references,
				'teamMembers' => $sharedMembers,
				'docType' => $docType
			);

			return $result;
		}
	}
?>
