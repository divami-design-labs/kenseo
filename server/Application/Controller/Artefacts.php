<?php

	require_once("Comments.php");
	// require_once('Email.php');
	require_once('Notifications.php');
	require_once('tags.php');

	//@TODO: too much code is repetetive in here needs refinement
	class Artefacts {
		public function getArtefacts($interpreter){
			
			$data = $interpreter->getData()->data;
			if($data->shared == "true"){
				return $this->getSharedArtefacts($interpreter);
			}
			elseif($data->activities == "true"){
				// To show in menu dashboard
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
				// To show in Project page
				return $this->getProjectActivity($interpreter);
			}elseif($data->all == "true"){
				return $this->getProjectInfo($interpreter);
			}elseif ($data->nonreferences == "true") {
				return $this->getNonreferenceFiles($interpreter);
			}elseif ($data->nonlinkedfiles == "true") {
				return $this->getNonLinkedFiles($interpreter);
			}elseif ($data->tags == "true") {
				return $this->getArtefactTags($interpreter);
			}
			return "something else";
		}
		public function getArtefactTags($interpreter) {
			$userId = $interpreter->getUser()->user_id;
			$data = $interpreter->getData()->data;
			$db = Master::getDBConnectionManager();
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $data->artefact_id);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "aretefact_id");

			$tagsdata = getQuery('getTagsWithArtefactId', array('artId' => $data->artefact_id));
			$tagsListData = $db->multiObjectQuery($tagsdata);
			return $tagsListData;
		}

		public function renameArtefact($interpreter) {
			$userId = $interpreter->getUser()->user_id;
			$data = $interpreter->getData()->data;
			$db = Master::getDBConnectionManager();
			$id = $data->artefact_id;
			$verId = $data->artefact_version_id;

			$queryParams = array('versionid' => $verId);
			$sharedMembersQuery = getQuery('getArtefactSharedMembersListFromVersionId', $queryParams);
			$recipients = $db->multiObjectQuery($sharedMembersQuery);
			$i = 0;
			foreach($recipients as $recipient) {
				$notificationRecipients[$i] = $recipient->id;
				$i++;
			}

			$extension = end(explode('.', $data->artefact_name));
			$artefact_name = $data->artefact_new_name.".".$extension;
			$resultObj->artefact = $db->updateTable(
						TABLE_ARTEFACTS,
						array(
							"artefact_title"
						),
						array(
							$artefact_name
						),
						"artefact_id = " . $id
					);

			$resultMessage = new stdClass();
			$resultMessage->type = "success";
			$resultMessage->message = "Successfully renamed artefact";
			$resultMessage->icon = "success";
			$resultObj->messages = $resultMessage;

			$newNotification = Notifications::addNotification(array(
				'by'				=> $userId,
				'type'				=> 'rename',
				'on'				=> 'artefact',
				'artefact_title'	=> $artefact_name,
				'artefact_id'		=> $id,
				'recipient_ids' 	=> $notificationRecipients,
				'ref_ids'			=> $verId,
				'ref_id'			=> $verId,
				'project_id'        => $data->project_id
			),$db);

			$queryDetails = getQuery('getNotification',array("id" => $userId, '@notificationid'=>$newNotification));
			$result = $db->singleObjectQuery($queryDetails);
			$resultObj->notification[] = $result;

			return $resultObj;
		}

		public function downloadArtefact($req) {
			//  data required to download the artefact
			$artefactId 	= $req->getData()->{'artefact_id'};
			$db 			= Master::getDBConnectionManager();
			$queryParams 	= array('artefactid' => $artefactId);
			$dbQuery 		= getQuery('getDownloadArtefact',$queryParams);
			$resultObj 		= $db->singleObjectQuery($dbQuery);
			$filename 		= $resultObj->document_path;
			$filetitle 		= $resultObj->artefact_title;
			$this->filename = $filename;
			// $resultData = new stdClass();
			// retrieving file title,size and content to download the file in same format with same name
			$resultObj->name 	= $filename;
			$resultObj->title 	= $filetitle;
			$resultObj->size 	= filesize($filename);
			$resultObj->content = file_get_contents($filename);
			// $resultObj->data = $resultData;
			return $resultObj;
		}

		public function getNonreferenceFiles($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->project_id;
			$versionId = $data->versionId;
	
			$db = Master::getDBConnectionManager();
			$queryParams = array('projectId' => $projectId, 'versionId' => $versionId);

			$dbQuery = getQuery('getNonReferenceFiles',$queryParams);

			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}

		public function getNonLinkedFiles($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->project_id;
			$artefactId = $data->artefactId;

			$db = Master::getDBConnectionManager();
			$queryParams = array('projectId' => $projectId, 'artefactId' => $artefactId);

			$dbQuery = getQuery('getNonLinkedFiles',$queryParams);

			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}

		public function editArtefact($interpreter){
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			$projectId = $data->project_id;
			if($data->projId){
				$projectId = $data->projId;
			}
			$artId = $data->id;
			if($data->artefact_id){
				 $artId = $data->artefact_id;
			}
			$artVerId = $data->artefact_version_id;
			$fileName = $data->title;
			if($data->artTitle){
				$fileName = $data->artTitle;
			}
			$type = $data->doctype[0]->{"data-name"};
    		$dataList = new stdClass();
			$db = Master::getDBConnectionManager();

			

			$db->updateTable(TABLE_ARTEFACTS,array("artefact_type"),array($type),"artefact_id = " . $artId);

			$getTags = getQuery('getTagsWithArtefactId',array('artId'=>$artId));
			$tagsObj = $db->multiObjectQuery($getTags);
			$tagsObjList = array();
			for($i=0; $i<count($tagsObj); $i++) {
				$tagsObjList[] = trim($tagsObj[$i]->tag_name);
			}
			$tagList = $data->tags;

			$tagsList = explode(",", $tagList->value);


			$dbAddTags = array();
			$dbRemoveTags = array();
			$dbRemoveTags = array_diff($tagsObjList, $tagsList);
			$dbAddTags = array_diff($tagsList,$tagsObjList);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "removed tags");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $dbRemoveTags);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $dbAddTags);

			//modifying tags list.
			Tags::add_tags($dbAddTags, $artId);
			Tags::remove_tags($dbRemoveTags, $artId);



			// Add references to the artefact
			$refColumnNames = array("artefact_ver_id", "artefact_id", "created_date", "created_by");
			$refRowValues = array();
			$refDocs = $data->referencesIds;

			$queryParams = array('artId' => $artId);

			$dbQuery = getQuery('getDocumentReferences', $queryParams);
			$references = $db->multiObjectQuery($dbQuery);
			$docReferenceIds = array();

			for($i = 0 ; $i< count($references); $i++) {
				$docReferenceIds[] = $references[$i]->id;
			}


			$referencesToAdd = array();
			$referencesToDelete = array();
			$referencesToAdd = array_diff($refDocs,$docReferenceIds);
			$referencesToDelete = array_diff($docReferenceIds,$refDocs);


			Master::getLogManager()->log(DEBUG, MOD_MAIN, "refernce ids");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $referencesToAdd);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $referencesToDelete);
			for($i = 1 ; $i<= count($referencesToAdd); $i++) {
				$refRowValues[] = array($artVerId, $referencesToAdd[$i], date("Y-m-d H:i:s"), $userId);
			}

			if(count($referencesToAdd)) {
				$db->insertMultipleRow(TABLE_ARTEFACT_REFS, $refColumnNames, $refRowValues);
			}
			if(count($referencesToDelete)) {
				for($i = 1 ; $i<= count($referencesToDelete); $i++) {
				    $db->deleteTable(TABLE_ARTEFACT_REFS, "artefact_ver_id = " . $artVerId . " and artefact_id =" . $referencesToDelete[$i]);
				}
			}

			// Add Links to the artefacts

			if($data->linksIds) {
				$links = $this->linkArts($artId, $data->linksIds);
			}

			// Add this as project activity
			$activityColumnNames = array("project_id", "logged_by", "logged_time", "performed_on", "activity_type", "performed_on_id");
			$activityRowValues = array($projectId, $userId, date("Y-m-d H:i:s"), 'A', 'U', $artId);
			$activityId = $db->insertSingleRowAndReturnId(TABLE_PROJECT_ACTIVITY, $activityColumnNames, $activityRowValues);

			// Add this as notification
			// $notificationColumnNames = array("user_id", "message", "project_id", "notification_by", "notification_date", "notification_type", "notification_ref_id", "notification_state");
			// $notificationRowValues = array($userId, $fileName, $projectId, $userId, date("Y-m-d H:i:s"), 'S', $artVerId, 'U');
			// $newNotification = $db->insertSingleRowAndReturnId(TABLE_NOTIFICATIONS, $notificationColumnNames, $notificationRowValues);

			//query to get data of single notification when artefact is updated
			// $queryDetails = getQuery('getNotification',array("id" => $userId, '@newNotification'=>$newNotification));
			// $resultObj = $db->singleObjectQuery($queryDetails);

			//query to get data of single artefact when artefact is updated
			$queryParams = array('userid' => $userId, 'projectid' => $projectId, 'artefactversionid' => $artVerId);
			$detailsQuery = getQuery('getProjectArtefact', $queryParams);
			$artefactObj = $db->singleObjectQuery($detailsQuery);

			//query used to get no of people in the project
			$peopleQuery = getQuery('getTeamMembers',array('projectId' => $projectId));
			$peopleObj = $db->multiObjectQuery($peopleQuery);

			//artefact is shared if the people present in the project
			if(count($peopleObj) > 1) {
				$artefactObj->share = true;
			} else {
				$artefactObj->share = false;
			}

			$queryParams = array('maskedArtefactVersionId' => $artefactObj->masked_artefact_version_id, "userid" => $userId);
			$versionQuery = getQuery('getArtefactVersionSummary', $queryParams);
			$versionSummary = $db->multiObjectQuery($versionQuery);
			$artefactObj->versionSummary = $versionSummary;

			//query to get data of single activity when artefact is updated
			$activityQuery = getQuery('getProjectSingleActivity',array('projectid' => $projectId, 'activityid' => $activityId));
			$activityObj = $db->singleObjectQuery($activityQuery);


			//we have $artId;
			$tag_query = getQuery('getTagsWithArtefactId',array('artId' => $artId));

			// $tagsList = $db->singleObjectQuery($tag_query);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "tagslist_");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $tag_query);
			// $mailInfo = $db->multiObjectQuery(getQuery('getAddArtefactMailQuery', array(
			// 	"@artefactversionids" => $artVerId,
			// 	"activitydoneuser" => $userId
			// )));
			$actiontype = "updated";

			// prepare mail
			// $this->addArtefactMail($mailInfo, $actiontype);




			$queryParams = array('versionid' => $artVerId);
			$sharedMembersQuery = getQuery('getArtefactSharedMembersListFromVersionId', $queryParams);
			$recipients = $db->multiObjectQuery($sharedMembersQuery);
			$i = 0;
			foreach($recipients as $recipient) {
				$notificationRecipients[$i] = $recipient->id;
				$i++;
			}

			$newNotification = Notifications::addNotification(array(
				'by'			=> $userId,
				'type'			=> 'edit',
				'on'			=> 'artefact',
				'ref_ids'		=> $artVerId,
				'ref_id'		=> $artVerId,
				'recipient_ids' => $notificationRecipients,
				'project_id'	=> $projectId
			),$db);



			Master::getLogManager()->log(DEBUG, MOD_MAIN, "single-notification-id");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $newNotification);
			$queryDetails = getQuery('getNotification',array("id" => $userId, '@notificationid'=>$newNotification));
			$resultObj = $db->singleObjectQuery($queryDetails);
			$resultMessage = new stdClass();
			$resultMessage->type = "success";
			$resultMessage->message = "Successfully updated artefact";
			$resultMessage->icon = "success";

			$dataList->messages = $resultMessage;
			$dataList->notification[] = $resultObj;
			$dataList->artefact = $artefactObj;

			return $dataList;
		}

		public function getProjectInfo($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->project_id;

			$resultObj->artefacts = $this->getProjectArtefacts($interpreter);
			return $resultObj;
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

			if($data->withVersions) {
				foreach($resultObj as $result) {
					$queryParams = array('maskedArtefactVersionId' => $result->masked_artefact_version_id, "userid" => $userid);
					$versionQuery = getQuery('getArtefactVersionSummary', $queryParams);
					$versionSummary = $db->multiObjectQuery($versionQuery);
						$result->versionSummary = $versionSummary;
				}
			}
			// foreach($resultObj as $result) {
			// 	$resObj2 = $db->singleObjectQuery(" select name from ".TABLE_ARTEFACTS_VERSIONS ." v inner join ". TABLE_USERS ." u where v.created_by = u.user_id AND v.artefact_version_id = " $result->artefact_version_id );
			// 	$result->createdBy = $resObj2;
			// }
			return $resultObj;
		}
		function getSharedArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;
			$limit = $data->limit;

			$db = Master::getDBConnectionManager();
			$querDetails = getQuery('getSharedArtefacts',array('userid'=>$userid, '@limit' => $limit ));

			$resultObj = $db->multiObjectQuery($querDetails);

			if($data->withVersions) {
				foreach($resultObj as $result) {
					$queryParams = array('maskedArtefactVersionId' => $result->masked_artefact_version_id, "userid" => $userid);
					$versionQuery = getQuery('getArtefactVersionSummary', $queryParams);
					$versionSummary = $db->multiObjectQuery($versionQuery);
						$result->versionSummary = $versionSummary;
				}
			}
			return $resultObj;
		}

		public function getRecentArtefactActivities($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;;
			$limit = $data->limit;

			$db = Master::getDBConnectionManager();

			$queryParams = array('userid' => $userid , '@limit' => $limit);
			$dbQuery = getQuery('getMyRecentArtefactsActivities',$queryParams);
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
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "welcome to replace");
			$data = $interpreter->getData();
			$resultMessage = new stdClass();
			if($data->data != null) {
				$data = $data->data;
			}

			$projectId = $data->project_id;
			$targetArtefactId 	= $data->artefact_id;
			// $targetProjectId	= $data->project_id;
			$existingArtefactId	= $data->existing_artefact_id;

			$userId = $interpreter->getUser()->user_id;
			$date = date("Y-m-d H:i:s");
			$db = Master::getDBConnectionManager();
			$db->beginTransaction();
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $targetArtefactId);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $data);
			try{

				// => Get the latest artefact version of the target artefact
				// $targetArtefactId 				= $artId;  // relevant name
				$targetLatestArtefactVersionId 	= $db->singleObjectQuery(
					getQuery(
						'getLatestVerionOfArtefact',
						array(
							"artId" => $targetArtefactId
						)
					)
				)->verId;
				
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $targetLatestArtefactVersionId);
				// => Get the target artefacts info from artefact table
				$targetArtefactInfo 		= $db->singleObjectQuery(
					getQuery(
						'getArtefactInfo',
						array(
							"artefactid" => $targetArtefactId
						)
					)
				);

				$targetArtefactProjectId	= $targetArtefactInfo->{"project_id"};

				if(isset($data->filesToUpload)) {

					// When file is uploaded
					//
					// => when a new file is replaced with artefact-a
					// then a new artefact is created with the latest version of artefact-a as its initial version
					// and its latest version will be holding the newly added file.
					//
					// => Use the above fetched target artefact's info to insert new row in artefact table
					$newArtefactId	= $db->insertSingleRowAndReturnId(
						TABLE_ARTEFACTS,
						array(
							"project_id",
							"artefact_title",
							"description",
							"latest_version_id",
							"state",
							"artefact_type",
							"replace_ref_id",
							"linked_id"
						),
						array(
							$targetArtefactProjectId,
							$targetArtefactInfo->{"artefact_title"},
							$targetArtefactInfo->{"description"},
							$targetArtefactInfo->{"latest_version_id"}, // TEMPORARY: In forward code, the exact latest version will be added
							$targetArtefactInfo->{"state"},
							$targetArtefactInfo->{"artefact_type"},
							$targetArtefactInfo->{"replace_ref_id"},
							$targetArtefactInfo->{"linked_id"}
						)
					);

					// => Add the new artefact's id as replace_ref_id in the target artefact's row
					$db->updateTable(
						TABLE_ARTEFACTS,
						array(
							"replace_ref_id",
							"state"
						),
						array(
							$newArtefactId,
							// => delete previous versions of the target artefact
							"D" // delete artefact
						),
						"artefact_id = " . $targetArtefactId
					);

					// => Replace target artefact id with new artefact id in artefact versions to the latest artefact version id row
					//    and mention the version_no as 1
					$db->updateTable(
						TABLE_ARTEFACTS_VERSIONS,
						array(
							"artefact_id",
							"version_no"
						),
						array(
							$newArtefactId,
							"1"  // making it as initial version
						),
						"artefact_id = " . $targetArtefactId . " and artefact_ver_id = " . $targetLatestArtefactVersionId
					);
					// => and also insert new row with masked_artefact_version_id and document_path
					$newArtefactLatestVersionId 	= $db->insertSingleRowAndReturnId(
						TABLE_ARTEFACTS_VERSIONS,
						array(
							"artefact_id",
							"version_no",
							// "masked_artefact_version_id",
							"created_by"
							// "document_path"
						),
						array(
							$newArtefactId,
							"2",  // next version (latest version)
							// $maskedNewArtefactVersionId,
							$userId
							// $documentPath					// TODO: to be implemented
						)
					);
					// => update the newly created artefact_version_id as latest version to the new artefact row in artefact table
					$maskedNewArtefactVersionId 	= getRandomString(12) . $newArtefactId . $newArtefactLatestVersionId;
					$FILES 	= $data->filesToUpload;

					$org_id = $db->singleObjectQuery(getQuery(
							'getProjectOrganizationId',
							array(
								'project_id' => $targetArtefactProjectId
							)
						)
					)->org_id;

					$documentPath = $this->uploadFile(
						array(
							'tmp_name'	=> $FILES['tmp_name'][0],
							'name'		=> $FILES['name'][0]
						),
						$targetArtefactProjectId,
						$org_id,
						$newArtefactId,
						$newArtefactLatestVersionId
					);
					// update document path and masked artefact version id to new artefact version id
					$db->updateTable(
						TABLE_ARTEFACTS_VERSIONS,
						array(
							"masked_artefact_version_id",
							"document_path"
						),
						array(
							$maskedNewArtefactVersionId,
							$documentPath
						),
						"artefact_ver_id = " . $newArtefactLatestVersionId
					);
					//
					$db->updateTable(
						TABLE_ARTEFACTS,
						array(
							"latest_version_id"
						),
						array(
							$newArtefactLatestVersionId
						),
						"artefact_id = " . $newArtefactId
					);

					// => Update the artefact_shared_members of target artefact with newly created artefact's version
					$db->updateTable(
						TABLE_ARTEFACTS_SHARED_MEMBERS,
						array(
							"artefact_id"
						),
						array(
							$targetArtefactId
						),
						"artefact_id = " . $targetArtefactId  // @IMPORTANT: I am not considering artefact_version_id as I need to remove that column from the table
					);

					$artefact_ver_id = $newArtefactLatestVersionId;






					// $FILES = $data->filesToUpload;
					//
					// //replacing with a new file
					// $uploadFile = $FILES['type'][0];
					// Master::getLogManager()->log(DEBUG, MOD_MAIN, "we have the file with us");
					//
					// // $data->userId = $interpreter->getUser()->user_id;
					// //get the latest version
					// $queryParams = array('artId' => $newArt);
					// $dbQuery = getQuery('getHighestVersionOfArtefact', $queryParams);
					// $latestVer = $db->singleObjectQuery($dbQuery)->vers;
					//
					//
					// $sourcePath = $FILES['tmp_name'][0];       // Storing source path of the file in a variable
					// $path = $AppGlobal['global']['storeLocation'] . $projId . "/" . $artId;
					// if(! is_dir($path)) {
					// 	mkdir($path, 0777, true);
					// }
					// $newVersion = $latestVer+1;
					// $targetPath = $path . "/" .$artId."_".$newVersion; // Target path where file is to be stored
					// move_uploaded_file($sourcePath, $targetPath) ;
					//
					// //now store the artefact detail in the tables related to artefacts and versions
					// Master::getLogManager()->log(DEBUG, MOD_MAIN, $AppGlobal['global']['storeLocation']);
					// //create a new version
					// $columnNames = array('artefact_id', 'version_no', 'created_by', 'created_date', 'document_path', 'MIME_type', 'file_size', 'state', 'shared');
					// $rowValues = array($artId, $latestVer, $userId, $date, $targetPath, $FILES["type"][0], $FILES["size"][0], 'C', 0);
					// $newVer = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS_VERSIONS, $columnNames, $rowValues);
					//
					// //update the artefact table
					// $db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($newVer), "artefact_id = " . $artId);
					//
					// //share the arrtefact to Owner
					// $shareColumnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
					// $shareRowValues = array($newVer, $artId, $userId, 'S', date("Y-m-d H:i:s"), $userId);
					// $db->insertSingleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $shareColumnNames, $shareRowValues);
					//
					// return true;
					} else {
						// when target artefact is replaced with existing artefact
						//
						// => If artefact-a has three versions and artefact-b has three versions
						// and artefact-a is replaced with artefact-b then information of artefact-a will be deleted
						// and latest version of artefact-a will be added as initial version of artefact-b.
						// The latest version of artefact-b remains the same (So, artefact-b will now have four versions)
						//
						// => Increment all versions of existing artefact id to 1 in artefact versions table
						// @TODO: change it to update table function
						$db->singleResultQuery("UPDATE artefact_versions set version_no = version_no+1 where artefact_id=$existingArtefactId");
						// => Replace target artefact id with existing artefact id to the latest artefact version of target artefact id in artefact versions table
						//    and also keep the version_no as 1
						$db->updateTable(
							TABLE_ARTEFACTS_VERSIONS,
							array(
								"artefact_id",
								"version_no"
							),
							array(
								$existingArtefactId,
								"1"		// Initial version
							),
							"artefact_ver_id = " . $targetLatestArtefactVersionId
						);

						$db->updateTable(
							TABLE_ARTEFACTS,
							array(
								"replace_ref_id",
								"state"
							),
							array(
								$existingArtefactId,
								// => delete previous versions of the target artefact
								"D" // delete artefact
							),
							"artefact_id = " . $targetArtefactId
						);
						// => Differentiate the target artefact members and existing artefact members
						//    and add to the existing artefact members
						$artefact_ver_id = $targetLatestArtefactVersionId;

						$differenceMembers = array();
						$targetArtefactSharedMembersList 	= $db->multiObjectQuery(getQuery(
							'getArtefactSharedMembers',
							array(
								"artId" => $targetArtefactId
							)
						));
						$existingArtefactSharedMembersList	= $db->multiObjectQuery(getQuery(
							'getArtefactSharedMembers',
							array(
								"artId" => $existingArtefactId
							)
						));
						foreach($targetArtefactSharedMembersList as $key => $item){
							$inArrayFlag = false;
							foreach($existingArtefactSharedMembersList as $index => $newItem){
								if($item->{'user_id'} == $newItem->{'user_id'}){
									$inArrayFlag = true;
									break;
								}
							}

							if(!$inArrayFlag){
								$storeObj = new stdClass();
								// @TODO: @IMPORTANT: need to remove artefact_version_id column from artefat_shared_members table
								// $storeObj->{"artefact_ver_id"}	= $existingArtefactVersionId;
								$storeObj->{"artefact_id"}		= $existingArtefactId;
								$storeObj->{"user_id"}			= $item->{"user_id"};
								$storeObj->{"access_type"}		= $item->{"access_type"};
								$storeObj->{"shared_by"}		= $item->{"shared_by"};
								$storeObj->{"while_creation"} 	= 0; // @TODO: no idea what it does..
								$differenceMembers[] = $storeObj;
							}
						}

						// Add the difference members to the target artefact
						if(count($differenceMembers)){  // if difference members are available
							Master::getLogManager()->log(DEBUG, MOD_MAIN, "Replace artefact: existing. difference members");
							Master::getLogManager()->log(DEBUG, MOD_MAIN, $differenceMembers);
							$db->insertMultipleRow(
								TABLE_ARTEFACTS_SHARED_MEMBERS,
								array(
									// "artefact_ver_id",
									"artefact_id",
									"user_id",
									"access_type",
									"shared_by",
									"while_creation"  // @TODO: no idea what it does..
								),
								$differenceMembers
							);
						}

						// // first get all the versions of newArt
						// $newArtVers = 	$db->multiObjectQuery(
						// 					getQuery(
						// 						'getAllVersionsOfArtefact',
						// 						array(
						// 							'artId' => $newArt
						// 						)
						// 					)
						// 				);
						//
						// // get the latestVersion of the artefact
						// $latestVer = 	$db->singleObjectQuery(
						// 					getQuery(
						// 						'getHighestVersionOfArtefact',
						// 						array(
						// 							'artId' => $artId
						// 						)
						// 					)
						// 				)->vers;
						//
						// Master::getLogManager()->log(DEBUG, MOD_MAIN, $latestVer);
						//
						// //update artefact version Numbers
						// // @TODO: change it to update table function
						// $db->singleResultQuery("UPDATE artefact_versions set version_no = version_no+$latestVer where artefact_id=$newArt");
						// //now change the artefact id
						// $db->updateTable(TABLE_ARTEFACTS_VERSIONS, array("artefact_id"), array($newVer), "artefact_id = " . $artId);
						//
						// //update the latest version
						// $db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($newVer), "artefact_id = " . $artId);
						// //update the new artefact that it is replaced.
						// $db->updateTable(TABLE_ARTEFACTS, array("replace_ref_id"), array($artId), "artefact_id = " . $newArt);
						//
						// //add an activity of replacement
						// $db->insertSingleRow(
						// 	TABLE_PROJECT_ACTIVITY,
						// 	array('project_id', 'logged_by', 'logged_time', 'performed_on', 'activity_type', 'performed_on_id'),
						// 	array($projId, $userId, $date, 'A', 'R', $artId)
						// );

					}

				$params = array('project_id' => $projectId);
				$query = getQuery('getProjectMembers', $params);
				$projectMembersInfo = $result = $db->multiObjectQuery($query);
				$notificationRecipients = array_map(function($info){
					return $info->user_id;
				}, $projectMembersInfo);


				$newNotification = Notifications::addNotification(array(
					'by'			=> $userId,
					'type'			=> 'replace',
					'on'			=> 'artefact',
					'ref_ids'		=> $targetLatestArtefactVersionId,
					'ref_id'		=> $targetLatestArtefactVersionId,
					'recipient_ids' => $notificationRecipients,
					'project_id'	=> $projectId
				),$db);
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "END OF TRY");			
				$db->commitTransaction();
			}
			catch(Exception $e){
				$db->abortTransaction();
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "Replace artefact: error");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $e);
			}


			$resultMessage->messages = new stdClass();
			$resultMessage->messages->type = "success";
			$resultMessage->messages->message = "Successfully replaced artefact";
			$resultMessage->messages->icon = "done";
			return $resultMessage;

		}

		public function archiveArtefact($interpreter) {
			$data = $interpreter->getData()->data;
			$userId =  $interpreter->getUser()->user_id;
			$artId = $data->artefact_id;

			$db = Master::getDBConnectionManager();
			$db->beginTransaction();
			$db->updateTable(TABLE_ARTEFACTS, array("state"), array('A'), "artefact_id = " . $artId);

			// mail
			// $mailInfo = $db->multiObjectQuery(getQuery('artefactRelatedMail', array(
			// 	"artefactid" => $artId,
			// 	"userid" => $userId
			// )));

			// $this->sendArtefactActionMail($mailInfo, "archived");

			$params = array('project_id' => $data->project_id);
			$query = getQuery('getProjectMembers', $params);
			$projectMembersInfo = $db->multiObjectQuery($query);
			$notificationRecipients = array_map(function($info){
				return $info->user_id;
			}, $projectMembersInfo);

			$newNotification = Notifications::addNotification(array(
				'by'			=> $userId,
				'type'			=> 'archive',
				'on'			=> 'artefact',
				'ref_ids'		=> $data->artefact_version_id,
				'ref_id'		=> $data->artefact_version_id,
				'recipient_ids' => $notificationRecipients,
				'project_id'	=> $data->project_id
			),$db);



			Master::getLogManager()->log(DEBUG, MOD_MAIN, "single-notification-id");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $newNotification);
			$queryDetails = getQuery('getNotification',array("id" => $userId, '@notificationid'=>$newNotification));
			$resultObj = $db->singleObjectQuery($queryDetails);


			$db->commitTransaction();

			$resultMessage = new stdClass();
			$resultMessage->messages = new stdClass();
			$resultMessage->notification[] = $resultObj;
			$resultMessage->messages->type = "success";
			$resultMessage->messages->message = "Successfully archived the artefact";
			$resultMessage->messages->icon = "message-archieve";
			return $resultMessage;
		}

		public function deleteArtefact($interpreter) {
			$data = $interpreter->getData()->data;
			$artId = $data ->artefact_id;
			$userId = $interpreter->getUser()->user_id;

			//first get project ID
			$db = Master::getDBConnectionManager();
			$db->beginTransaction();
			$queryParams = array('artId' => $artId );
			$dbQuery = getQuery('getProjectOfArtefact',$queryParams);
			$artefactProjId = $db->singleObjectQuery($dbQuery);
			$project_id = $artefactProjId ->project_id;

			$db->updateTable(TABLE_ARTEFACTS, array('state'), array('D') ,"artefact_id = " . $artId);

			//Add project activity that this artefact is deleted
			$activityColumnNames = array("project_id", "logged_by", "logged_time", "performed_on", "activity_type", "performed_on_id");
			$activityRowValues = array($project_id, $userId, date("Y-m-d H:i:s"), 'A', 'D', $artId);
			$db->insertSingleRow(TABLE_PROJECT_ACTIVITY, $activityColumnNames, $activityRowValues);


			// mail
			// $mailInfo = $db->multiObjectQuery(getQuery('artefactRelatedMail', array(
			// 	"artefactid" => $artId,
			// 	"userid" => $userId
			// )));
			//
			// $this->sendArtefactActionMail($mailInfo, "deleted");
			$params = array('project_id' => $data->project_id);
			$query = getQuery('getProjectMembers', $params);
			$projectMembersInfo = $db->multiObjectQuery($query);
			$notificationRecipients = array_map(function($info){
				return $info->user_id;
			}, $projectMembersInfo);

			$newNotification = Notifications::addNotification(array(
				'by'			=> $userId,
				'type'			=> 'delete',
				'on'			=> 'artefact',
				'ref_ids'		=> $data->artefact_version_id,
				'ref_id'		=> $data->artefact_version_id,
				'recipient_ids' => $notificationRecipients,
				'project_id'	=> $data->project_id
			),$db);

			$db->commitTransaction();
			$resultMessage = new stdClass();
			$resultMessage->messages = new stdClass();
			$resultMessage->messages->type = "success";
			$resultMessage->messages->message = "Successfully deleted artefact";
			$resultMessage->messages->icon = "message-delete";
			return $resultMessage;
		}

		public function sendArtefactActionMail($infos, $action){
			foreach($infos as $key => $info){
				$mailData = new stdClass();
				$projectName = $info->{'project_name'};
				$artefactName = $info->{'artefact_title'};
				$mailData->to = $info->{'usermail'};
				$mailData->username = $info->{'username'};

				$userInsideName = $info->{'activity_done_user_mail'} == $info->{'usermail'}? "you": $info->{'activity_done_user'};

				$mailData->subject = "'$projectName': Artefact $action";

				$mailData->message = "Artefact '$artefactName' is $action from '$projectName' project by $userInsideName";

				// Email::sendMail($mailData);
			}
		}

		public function linkArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$artefactId = 1;
			$linkArtefacts = $data -> linkIds;

			return $this->linkarts($artefactId, $linkArtefacts);
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
			$data = $interpreter->getData()->data;

			$userid = $interpreter->getUser()->user_id;
			$ignore = $data->ignore;
			$projectid = $data->project_id;
			$artefactId = $data->artefact_id;
			$db = Master::getDBConnectionManager();

			$queryParams = array("userid" =>$userid, "ignore"=>$ignore, "projectid" => $projectid, "artefactid" => $artefactId );

			$dbQuery = getQuery('getReferences',$queryParams);

			$refs = $db-> multiObjectQuery($dbQuery);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $data);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "references");
			return $refs;
		}

		public function uploadFile($fileInfo, $projectId, $org_id, $artId, $masked_artefact_version) {
			global $AppGlobal;
			$sourcePath = $fileInfo['tmp_name'];	// Storing source path of the file in a variable

			$fileExt = explode('.', $fileInfo['name']);
			$path = $AppGlobal['global']['storeLocation'] . $org_id ."/". $projectId . "/" . $artId;
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
			$versionSummary;
			// => For example, lets say there are three version of Artefact-a
			// and three versions of artefact-b. if from artefact-a, artefact-b is added as new version
			// then artefact-a will currently have six versions (first three versions from artefact-a
			// and next three versions from artefact-b).
			// The latest version of artefact-a will be the latest version of artefact-b
			// and the information of artefact-b will not be available (should be archived or deleted?)

			// => if a new file is added as version to artefact-a,
			// then the new file will be treated as latest version of the artefact-a.

			global $AppGlobal;
			$data = $interpreter->getData();
			if($data->data != null) {
				$data = $data->data;
			}

			$userId = $interpreter->getUser()->user_id;

			// params
			$projectId = $data->project_id;
			if($data->projId){
				$projectId = $data->projId;
			}
			$previousArtefactid = $data->artefact_id;
			if($data->artefactId){
				$previousArtefactid = $data->artefactId;
			}

			$db = Master::getDBConnectionManager();
			$db->beginTransaction();

			//get the latest version
			$queryParams = array('artId' => $previousArtefactid);
			$dbQuery = getQuery('getHighestVersionOfArtefact', $queryParams);
			$ver_no = $db->singleObjectQuery($dbQuery)->vers;
			$ver_no++;

			// if a new file is being added as new version
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
				$artefact_ver_id = $newVer;

				$versionParams = array('newVer' => $newVer);
				$versionQuery = getQuery('getLatestArtefactMaskedVersionId', $versionParams);
				$newMaskedArtefactVErsionVersionId = $db->singleObjectQuery($versionQuery);


				$versionSummaryParams = array('maskedArtefactVersionId' => $newMaskedArtefactVErsionVersionId->maskedVerId, "userid" => $userId);
				$versionSummaryQuery = getQuery('getArtefactVersionSummary', $versionSummaryParams);

				$versionSummary = $db->multiObjectQuery($versionSummaryQuery);

				Master::getLogManager()->log(DEBUG, MOD_MAIN, "versionsumary");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $versionSummary);
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "versionsumary");

				// Update the artefact table with latest version id
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

				// $db->commitTransaction();
				// return true;
			}
			// if existing artefact is being added as new version to this artefact
			else {
				// @TODO: replace the add_version_artefact_id in artefact version with the artefact_id, in every row
				// @TODO: and in artefacts table, delete the add_version_artefact_id related row

				// @TODO: The below code seems outdated
				// $latestArtefactid = $data->artefact_id;
				//
				// // Get the version details
				// $params = array(artId => $latestArtefactid);
				// $dbQuery = getQuery('getVerionDetailsOfArtefact', $params);
				// $details = $db->multiObjectQuery($dbQuery);
				// $details = $details[0];
				//
				// // Generate masked artefact version id
				// $masked_artefact_version = getRandomString(12) . $previousArtefactid . $ver_no;
				//
				// // Insert a new row for the new artefact version of the main artefact
				// $column_names = array('version_no','artefact_id', 'masked_artefact_version_id', 'version_label','created_by','created_date','document_path','MIME_type','file_size','state','shared');
				// $columnData = array($ver_no, $previousArtefactid, $masked_artefact_version, $details->version_label, $userId, $details->created_date, $details->document_path, $details->MIME_type, $details->file_size, $details->state, $details->shared);
				// $newVer = $db->insertSingleRowAndReturnId(TABLE_ARTEFACTS_VERSIONS, $column_names , $columnData);
				//
				// // Update the latest version number of the previous artefact
				// $db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"), array($newVer), "artefact_id = " . $previousArtefactid);
				//
				// /***** Now share the artefact version *****/
				// $columnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
				// $rowValues = array();
				//
				// // Get members of the project.
				// $params = array('project_id' => $projectId);
				// $query = getQuery('getProjectMembers', $params);
				// $result = $db->multiObjectQuery($query);
				// for($i=0, $iLen=count($result); $i<$iLen; $i++) {
				// 	$rowValues[] = array($newVer, $previousArtefactid, $result[$i]->user_id, $result[$i]->access_type, date("Y-m-d H:i:s"), $userId);
				// }
				// // Share this artefact to all project members based on their permissions
				// $db->replaceMultipleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $columnNames, $rowValues);

				// params
				$targetArtefactId 	= $previousArtefactid;
				$otherArtefactId 	= $data->existing_artefact_id;
				// get latest artefact version of target artefact
				$targetArtefactInfo = $db->singleObjectQuery(getQuery(
					"getLatestVerionOfArtefact",
					array(
						"artId" => $targetArtefactId
					)
				));

				$targetArtefactVersionId = $targetArtefactInfo->verId;
				$version = $targetArtefactInfo->version;


				$otherArtefactInfo = $db->singleObjectQuery(getQuery(
					"getLatestVerionOfArtefact",
					array(
						"artId" => $otherArtefactId
					)
				));

				// => Replace other artefact id's info from database with target artefact id

				$db->singleResultQuery("UPDATE artefact_versions set artefact_id = $targetArtefactId,version_no = version_no+$version where artefact_id=$otherArtefactId");


				// => Mention in the artefact table that the other artefact id is replaced with the target artefact id
				$db->updateTable(
					TABLE_ARTEFACTS,
					array(
						"replace_ref_id"
					),
					array(
						$targetArtefactId
					),
					"artefact_id = " . $otherArtefactId
				);
				$db->updateTable(
					TABLE_ARTEFACTS,
					array(
						"latest_version_id"
					),
					array(
						$otherArtefactInfo->verId
					),
					"artefact_id = " . $targetArtefactId
				);

				$db->updateTable(
					TABLE_ARTEFACTS_SHARED_MEMBERS,
					array(
						"artefact_id"
					),
					array(
						$targetArtefactId
					),
					"artefact_id = " . $otherArtefactId
				);

				// $versionParams = array('artId' => $targetArtefactId);
				// $versionQuery = getQuery('getLatestVerionOfArtefact', $versionParams);
				$artefact_ver_id = $otherArtefactInfo->verId;

				$versionParams = array('newVer' => $otherArtefactInfo->verId);
				$versionQuery = getQuery('getLatestArtefactMaskedVersionId', $versionParams);
				$newMaskedArtefactVErsionVersionId = $db->singleObjectQuery($versionQuery);


				$versionSummaryParams = array('maskedArtefactVersionId' => $newMaskedArtefactVErsionVersionId->maskedVerId, "userid" => $userId);
				$versionSummaryQuery = getQuery('getArtefactVersionSummary', $versionSummaryParams);

				$versionSummary = $db->multiObjectQuery($versionSummaryQuery);

				// => Add shared members of other artefact to the target artefact
				// get shared members of the other artefact
				$otherArtefactSharedMembersList 	= $db->multiObjectQuery(getQuery(
					'getArtefactSharedMembers',
					array(
						"artId" => $otherArtefactId
					)
				));

				// get shared members of the target artefact
				$targetArtefactSharedMembersList	= $db->multiObjectQuery(getQuery(
					'getArtefactSharedMembers',
					array(
						"artId" => $targetArtefactId
					)
				));

				// Differentiate shared members of the other artefact and target artefact
				// and the difference members to the target artefact
				$differenceMembers = array();
				foreach($otherArtefactSharedMembersList as $key => $item){
					$inArrayFlag = false;
					foreach($targetArtefactSharedMembersList as $index => $newItem){
						if($item->{'user_id'} == $newItem->{'user_id'}){
							$inArrayFlag = true;
							break;
						}
					}

					if(!$inArrayFlag){
						$storeObj = new stdClass();
						$storeObj->{"artefact_ver_id"}	= $otherArtefactInfo->verId;
						$storeObj->{"artefact_id"}		= $targetArtefactId;
						$storeObj->{"user_id"}			= $item->{"user_id"};
						$storeObj->{"access_type"}		= $item->{"access_type"};
						$storeObj->{"shared_by"}		= $item->{"shared_by"};
						$storeObj->{"while_creation"} 	= 0; // @TODO: no idea what it does..
						$differenceMembers[] = $storeObj;
					}
				}

				// Add the difference members to the target artefact
				if(count($differenceMembers)){  // if difference members are available
					$db->insertMultipleRow(
						TABLE_ARTEFACTS_SHARED_MEMBERS,
						array(
							"artefact_ver_id",
							"artefact_id",
							"user_id",
							"access_type",
							"shared_by",
							"while_creation"  // @TODO: no idea what it does..
						),
						$differenceMembers
					);
				}

				// @TODO: update references, tags and links related tables also in database

			}

			$params = array('project_id' => $projectId);
			$query = getQuery('getProjectMembers', $params);
			$projectMembersInfo = $result = $db->multiObjectQuery($query);
			$notificationRecipients = array_map(function($info){
				return $info->user_id;
			}, $projectMembersInfo);


			$newNotification = Notifications::addNotification(array(
				'by'			=> $userId,
				'type'			=> 'add version',
				'on'			=> 'artefact',
				'ref_ids'		=> $artefact_ver_id,
				'ref_id'		=> $artefact_ver_id,
				'recipient_ids' => $notificationRecipients,
				'project_id'	=> $projectId
			),$db);



			Master::getLogManager()->log(DEBUG, MOD_MAIN, "single-version-notification-id");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $newNotification);
			$queryDetails = getQuery('getNotification',array("id" => $userId, '@notificationid'=>$newNotification));
			$resultObj = $db->singleObjectQuery($queryDetails);


			$db->commitTransaction();
			$resultMessage = new stdClass();
			$resultMessage->messages = new stdClass();
			$resultMessage->notification[] = $resultObj;
			$resultMessage->messages->type = "success";
			$resultMessage->messages->message = "Successfully added new version to artefact";
			$resultMessage->messages->icon = "done";
			$resultMessage->versionSummary = $versionSummary;
			return $resultMessage;
		}

		/**
		 * Function to add new artefact (with new file upload).
		 */
		public function addArtefact($interpreter) {
			$dataList = new stdClass();
			$userId = $interpreter->getUser()->user_id;

			$data = $interpreter->getData();
			if($data->data) {
				$data = $data->data;
			} else{
				$interpreter->getData()->data = $data;
			}
			$projectId = isset($data->project_id) ? $data->project_id : $data->id;

			if(!$projectId) {
				require_once('Projects.php');
				$newdata = Projects::addProject($interpreter);
				// Get the newly added project's id
				$data->project_id = $newdata->projectid;
				$projectId = $data->project_id;
				$dataList->projectData = $newdata;
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $data->project_name);
			}
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "artefact-data");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $data);

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
						'tmp_name'	=> $FILES['tmp_name'][$f],
						'name'		  => $FILES['name'][$f]
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
					$projectMembersInfo = $result = $db->multiObjectQuery($query);
					for($i=0, $iLen=count($result); $i<$iLen; $i++) {
						$rowValues[] = array($artVerId, $artIds[$f], $result[$i]->user_id, $result[$i]->access_type, date("Y-m-d H:i:s"), $userId);
					}

					// Share this artefact to all project members based on their permissions
					if(count($result)) {
						$db->replaceMultipleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $columnNames, $rowValues);
					}

					$org_id = $db->singleObjectQuery(getQuery('getProjectOrganizationId',
							array('project_id' => $projectId)))->org_id;
					$author_name = $db->singleObjectQuery(getQuery('getUserNameWithId',array('user_id' => $data->userId)))->name;
					// Add tags to the artefacts]
					$tagList = json_decode($data->tags);
					$tagsList = explode(",", $tagList->value);

					$predefinedTagsList = array();
					$predefinedTagsList[] = $author_name;
					$predefinedTagsList[] = $data->project_name;
					$predefinedTagsList[] = $FILES['name'][$f];

					//Adding tags both predefined and user mentioned.
					Tags::add_tags($predefinedTagsList, $artIds[$f]);
					Tags::add_tags($tagsList, $artIds[$f]);


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
					$linksIds = json_decode($data->linksIds);
					if($data->linksIds) {
						$links = $this->linkArts($artIds[$f], $linksIds);
					}

					// Add this as project activity
					$activityColumnNames = array("project_id", "logged_by", "logged_time", "performed_on", "activity_type", "performed_on_id");
					$activityRowValues = array($projectId, $userId, date("Y-m-d H:i:s"), 'A', 'N', $artIds[$f]);
					$activityId = $db->insertSingleRowAndReturnId(TABLE_PROJECT_ACTIVITY, $activityColumnNames, $activityRowValues);

					// Add this as notification
					$notificationColumnNames = array("user_id", "message", "project_id", "notification_by", "notification_date", "notification_type", "notification_ref_id", "notification_state");
					$notificationRowValues = array($userId, $FILES['name'][$f], $projectId, $userId, date("Y-m-d H:i:s"), 'S', $artVerId, 'U');
					// $newNotification = $db->insertSingleRowAndReturnId(TABLE_NOTIFICATIONS, $notificationColumnNames, $notificationRowValues);

					//query to get data of single notification when artefact is added
					// $queryDetails = getQuery('getNotification',array("id" => $userId, '@newNotification'=>$newNotification));
					// $resultObj = $db->singleObjectQuery($queryDetails);

					//query to get data of single artefact when artefact is added
					$queryParams = array('userid' => $userId, 'projectid' => $projectId, 'artefactversionid' => $artefactVersionIds[0]);
					$detailsQuery = getQuery('getProjectArtefact', $queryParams);
					$artefactObj = $db->singleObjectQuery($detailsQuery);

					//query to get data of single activity when artefact is added
					$activityQuery = getQuery('getProjectSingleActivity',array('projectid' => $projectId, 'activityid' => $activityId));
					$activityObj = $db->singleObjectQuery($activityQuery);

					//query used to get no of people in the project
					$peopleQuery = getQuery('getTeamMembers',array('projectId' => $projectId));
					$peopleObj = $db->multiObjectQuery($peopleQuery);

					//artefact is shared if the people present in the project
 					if(count($peopleObj) > 1) {
						$artefactObj->share = true;
					} else {
						$artefactObj->share = false;
					}

					$queryParams = array('maskedArtefactVersionId' => $artefactObj->masked_artefact_version_id, "userid" => $userId);
					$versionQuery = getQuery('getArtefactVersionSummary', $queryParams);
					$versionSummary = $db->multiObjectQuery($versionQuery);
					$artefactObj->versionSummary = $versionSummary;

					//variable to know whether the artefact is shared or not, initially it set to false
					// Share to members
					if(count($data->shared_members)) {
						$this->shareForTeam($artIds[$f], $artVerId, $data->shared_members, $userId);
						//If particular project has members it is set to true means artefact is shared
					}

					// $dataList['notification'] 	= $resultObj;
					$dataList->artefact 		= $artefactObj;
					// $dataList['activity'] 		= $activityObj;

				}


				// $notificationRecipients[] 	= $userId;
				$notificationRecipients = array_map(function($info){
					return $info->user_id; 
				}, $projectMembersInfo);
				// Add notification
				$notificationIds = Notifications::addNotifications(array(
					'by'			=> $userId,
					'type'			=> 'add',
					'on'			=> 'artefact',
					'ref_ids'		=> $artefactVersionIds,
					'recipient_ids' => $notificationRecipients,
					'project_id'	=> $projectId
				));
				
				//query to get data of single notification when artefact is added
				$queryDetails = getQuery('getArtefactNotifications',array("ids" => $notificationRecipients, "notificationIds" => $notificationIds));
				$resultObj = $db->multiObjectQuery($queryDetails);
				$dataList->notification = $resultObj;

				// $mailInfo = $db->multiObjectQuery(getQuery('getAddArtefactMailQuery', array(
				// 	"@artefactversionids" => join(",", $artefactVersionIds),
				// 	"activitydoneuser" => $userId
				// )));
				$actiontype = "shared";
				// prepare mail
				// $this->addArtefactMail($mailInfo, $actiontype);
			}

			// @TODO: Get Notifications data to update the Notifications section

			$db->commitTransaction();
			$resultMessage = new stdClass();
			$resultMessage->type = "success";
			$resultMessage->message = "Successfully added artefact";
			$resultMessage->icon = "success";
			if($dataList->projectData){
				$resultMessage->message = "Successfully added project and artefact";
			}
			// return $resultMessage;
			//return array();
			$dataList->messages = $resultMessage;

			if(count($dataList)){
				return $dataList;
			} else {
				return false;
			}

		}

		// public function customImplode($array){
		// 	return join(' and ', array_filter(array_merge(array(join(', ', array_slice($array, 0, -1))), array_slice($array, -1)), 'strlen'));
		// }

		// public function addArtefactMail($infos, $actionType){
		// 	Master::getLogManager()->log(DEBUG, MOD_MAIN, "mail info");
		// 	Master::getLogManager()->log(DEBUG, MOD_MAIN, $infos);
		// 	$mailData = new stdClass();
		// 	foreach($infos as $key => $info){
		// 		$artefactTitle = $info->{'artefact_title'};
		// 		$projectName = $info->{'project_name'};
		// 		$activityDoneUser = $info->{'activity_done_user'};
		// 		$activityDoneUserMail = $info->{'activity_done_user_mail'};
		// 		$mailData->username = $info->{'screen_name'};
		// 		$email = $info->{'email'};

		// 		$mailData->to = $email;

		// 		if($activityDoneUserMail == $email){
		// 			$sharedWithUsers = array_map(function($a){
		// 				return $a->{'screen_name'};
		// 			}, array_filter($infos, function($a){
		// 				return ($a->{'email'} != $a->{'activity_done_user_mail'});
		// 			}));
		// 			$mailData->subject = "$projectName: An artefact '$artefactTitle' is $actionType by you";

		// 			$mailData->message = "Artefact '$artefactTitle' in $projectName is $actionType by you";
		// 			if(count($sharedWithUsers) > 0 && $actionType!="updated"){
		// 				$mailData->message = $mailData->message . " with " . $this->customImplode($sharedWithUsers);
		// 			}
		// 		}
		// 		else{
		// 			if($actionType == "updated"){
		// 				$mailData->subject = "$projectName: An artefact '$artefactTitle' is $actionType";
		// 				$mailData->message = "Artefact '$artefactTitle' in $projectName is $actionType by $activityDoneUser.";
		// 			}else{
		// 				$mailData->subject = "$projectName: An artefact '$artefactTitle' is shared with you";
		// 				$mailData->message = "Artefact '$artefactTitle' in $projectName is shared with you by $activityDoneUser.";
		// 			}

		// 		}

		// 		Master::getLogManager()->log(DEBUG, MOD_MAIN, "add artefact mail");
		// 		Master::getLogManager()->log(DEBUG, MOD_MAIN, $info);


		// 		// Email::sendMail($mailData);
		// 	}
		// }

		public function shareForTeam($artId, $artVerId, $team, $sharedBy) {
			$db = Master::getDBConnectionManager();
			$db->beginTransaction();
			try{
				$team = is_array($team)? $team: json_decode($team);

				$shareColumnNames = array("artefact_ver_id", "artefact_id", "user_id", "access_type", "shared_date", "shared_by");
				$shareRowValues = array();
				for($i=0, $iLen=count($team); $i<$iLen; $i++) {
					$shareRowValues[] = array($artVerId, $artId, $team[$i]->user_id, $team[$i]->access_type , date("Y-m-d H:i:s"), $sharedBy);
				}
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "shareForTeam");
				// Insert or replace all shared members of this artefact.
				$db->replaceMultipleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $shareColumnNames, $shareRowValues);

				// Update artefact version as shared.
				$db->updateTable(TABLE_ARTEFACTS_VERSIONS, array('shared'), array(1), "artefact_ver_id = $artVerId");
				$db->commitTransaction();
			}
			catch(Exception $e){
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "ERROR: share for team");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $e);
			}
		}

		public function shareArtefact($interpreter) {
			$info = $interpreter->getData();
			$data = $info->data;
			$userId = $info->userId;
			$projectId = $data->project_id;
			$messages = new stdClass();
			$dataList = new stdClass();
			// $artVerId = isset($info->versionId)? $info->versionId: $data->{'artefact_ver_id'};
			// $artId = $data->id;

			$artefactAndVersionIds = $data->{'ids'};
      		$sharedMembers = $data->{'shared_members'};
			if($sharedMembers){

				// if multiple artefact version ids' are not mentioned
				// then safely we can assume only one artefact version id is being passed
				$db = Master::getDBConnectionManager();
				$db->beginTransaction();

				if(!$artefactAndVersionIds){
					$projectId = $data->project_id;
					if($data->projId){
						$projectId = $data->projId;
					}
					$artefactAndVersionIds = array();
					$artefactVersionIdHolder = new stdClass();
					$artefactVersionIdHolder->{'artefact_version_id'} = $data->artefact_version_id;
					$artefactVersionIdHolder->{'artefact_id'} = $data->artefact_id;
					if($data->artefactId){
						$artefactVersionIdHolder->{'artefact_id'} = $data->artefactId;
					}
					$artefactVersionIdHolder->{'artefact_name'} = $data->title;
					$artefactAndVersionIds[] = $artefactVersionIdHolder;
				}
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "share artefact version id");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $artefactAndVersionIds);
				$length = count($artefactAndVersionIds);
				//$userId = $interpreter->getUser()->user_id;
				$dataList->notification = array();
				$dataList->artefact = array();
				$dataList->activity = array();
				$dataList->messages = array();

				// Storing recipient ids along with the sender's id to send notifications
				$notificationRecipients = array_map(function($info){
					return $info->user_id;
				}, $sharedMembers);
				$notificationRecipients[] = $userId;

				for($i=0; $i<$length; $i++){
					$artId = $artefactAndVersionIds[$i]->artefact_id;
					$artVerId = $artefactAndVersionIds[$i]->artefact_version_id;
					$artName = $artefactAndVersionIds[$i]->artefact_name;
					$this->shareForTeam($artId, $artVerId, $info->sharedTo ? $info->sharedTo: $data->{'shared_members'}, $info->userId);


					// Add this as project activity
					$activityColumnNames = array("project_id", "logged_by", "logged_time", "performed_on", "activity_type", "performed_on_id");
					$activityRowValues = array($projectId, $userId, date("Y-m-d H:i:s"), 'A', 'S', $artId);
					$activityId = $db->insertSingleRowAndReturnId(TABLE_PROJECT_ACTIVITY, $activityColumnNames, $activityRowValues);

					// Add this as notification
					// $notificationColumnNames = array("user_id", "message", "project_id", "notification_by", "notification_date", "notification_type", "notification_ref_id", "notification_state");
					// $notificationRowValues = array($userId, $artName, $projectId, $userId, date("Y-m-d H:i:s"), 'S', $artVerId, 'U');
					// $newNotification = $db->insertSingleRowAndReturnId(TABLE_NOTIFICATIONS, $notificationColumnNames, $notificationRowValues);

					//query to get data of single notification when artefact is added


					//query to get data of single artefact when artefact is added
					$queryParams = array('userid' => $userId, 'projectid' => $projectId, 'artefactversionid' => $artVerId);
					$detailsQuery = getQuery('getProjectArtefact', $queryParams);
					$artefactObj = $db->singleObjectQuery($detailsQuery);
					$artefactObj->share = true;

					$queryParams = array('maskedArtefactVersionId' => $artefactObj->masked_artefact_version_id, "userid" => $userId);
					$versionQuery = getQuery('getArtefactVersionSummary', $queryParams);
					$versionSummary = $db->multiObjectQuery($versionQuery);
					$artefactObj->versionSummary = $versionSummary;

					//query to get data of single activity when artefact is added
					// $activityQuery = getQuery('getProjectSingleActivity',array('projectid' => $projectId, 'activityid' => $activityId));
					// $activityObj = $db->singleObjectQuery($activityQuery);




					// Add Notification
					$newNotification = Notifications::addNotification(array(
						'by'			=> $userId,
						'type'			=> 'share',
						'on'			=> 'artefact',
						'ref_ids'		=> $artefactAndVersionIds[$i]->artefact_version_id,
						'ref_id'		=> $artefactAndVersionIds[$i]->artefact_version_id,
						'recipient_ids' => $notificationRecipients,
						'project_id'	=> $projectId
					),$db);



					Master::getLogManager()->log(DEBUG, MOD_MAIN, "single-notification-id");
					Master::getLogManager()->log(DEBUG, MOD_MAIN, $newNotification);
					$queryDetails = getQuery('getNotification',array("id" => $userId, '@notificationid'=>$newNotification));
					$resultObj = $db->singleObjectQuery($queryDetails);
					$dataList->notification[] = $resultObj;
					$dataList->artefact[] = $artefactObj;
					$dataList->activity[] = $activityObj;
				}


				$messages->type = "success";
				$messages->message = "Successfully shared artefact";
				$messages->icon = "success";
			}else{
				$messages->type = "error";
				$messages->message = "You haven't selected any user to share the artefact with";
				$messages->icon = "error";
			}

			$dataList->messages = $messages;
			return $dataList;
			//return array();
		}

		public function getArtefactDetails($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			$maskedArtefactVersionId = $data->maskedArtefactVersionId;

			$db = Master::getDBConnectionManager();

			// Get current artefact version details
			$queryParams = array('maskedArtefactVersionId' => $maskedArtefactVersionId, "userid" => $userId);
			$detailsQuery = getQuery('getArtefactDetails', $queryParams);
			$artefactObj = $db->singleObjectQuery($detailsQuery);
			$artefactVerId = $artefactObj->artefact_version_id;

			// Get all versions of an artefact
			$versionQuery = getQuery('getArtefactVersionSummary', $queryParams);
			$versionSummary = $db->multiObjectQuery($versionQuery);
			if($data->withVersions) {
				$artefactObj->versions = $versionSummary;
			}

			// Before sending all the date we can simply have the gist of the targeted version directly.
			// The gist is nothing but the documentPath, versionNo, versionId etc.
			$versionCount = count($versionSummary);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "versionCount");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $versionCount);
			for($i=0; $i<$versionCount; $i++) {
				if($versionSummary[$i]->masked_artefact_version_id == $maskedArtefactVersionId) {
					$artefactObj->documentPath = $versionSummary[$i]->documentPath;
					$artefactObj->versionNo = $versionSummary[$i]->versionNo;
					$artefactObj->versionId = $versionSummary[$i]->versionId;
					$artefactObj->type = $versionSummary[$i]->type;
					Master::getLogManager()->log(DEBUG, MOD_MAIN, "typee");
					Master::getLogManager()->log(DEBUG, MOD_MAIN, $versionSummary[$i]->type);
				}
			}

			// Get comments of current artefact version Id
			if($data->withComments) {
				$resObj = new stdClass();
				$resObj->artefactVerId 	= $artefactVerId;
				$resObj->userId 		= $userId;
				// Get all comments based on generated comment thread ids
				$artefactObj->threads = Comments::getThreadComments($db, $resObj);
			}

			$memberPermission = $db->multiObjectQuery("SELECT access_type FROM ". TABLE_PROJECT_MEMBERS ." where user_id = ".  $userId ." and proj_id = ". $artefactObj->project_id);
			$artefactObj->permission =  $memberPermission[0]->access_type ; 
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "artefactobj");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $artefactObj);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "interpreter");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $interpreter);
			// if($artefactObj->versions[0]->shared == null) {
			// 	return [] ;
			// }
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
			
			$basicDetails->permission = $db->singleResultQuery("select access_type from ". TABLE_ARTEFACTS_SHARED_MEMBERS ." where artefact_ver_id = (select artefact_ver_id from ". TABLE_ARTEFACTS_VERSIONS . " where masked_artefact_version_id = '". $maskedVerId ."') and user_id =  " . $userId);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $permission);
			
			//get linked artefacts.
			$linkedArtefactQuery = getQuery('getLinkedArtefactList', $queryParams);
			$linkedArtefacts = $db->multiObjectQuery($linkedArtefactQuery);

			//get reference artefacts.
			$refArtefactQuery = getQuery('getReferenceArtefactList', $queryParams);
			$referenceArtefacts = $db->multiObjectQuery($refArtefactQuery);

			$tagQueryParams = array('artefactId' => $basicDetails->artefactId);
			$artefactTagsQuery = getQuery('getArtefactTagList', $tagQueryParams);
			$artefacttags = $db->multiObjectQuery($artefactTagsQuery);
			//get versions of the artefact.
			$artefactVersionQuery = getQuery('getArtefactVersionsList', $queryParams);
			$artefactVersions = $db->multiObjectQuery($artefactVersionQuery);

			//get shared members of the document.
			$artefactSharedQuery = getQuery('getArtefactSharedMembersList', $queryParams);
			$artefactSharedMemebers = $db->multiObjectQuery($artefactSharedQuery);

			$timelineSharedParams = array("refId" => $basicDetails->latest_version_id,"userId" =>$userId );
			$timelineSharedMembersQuery = getQuery('getTimeLineSharedMembers', $timelineSharedParams);
			$timelineSharedMembers = $db->multiObjectQuery($timelineSharedMembersQuery);
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
	;
			// we need sharing details
			$userQueryParams = array("refId" => $basicDetails->project_id,"userId" =>$userId );
			$timelineUsersAddedQuery = getQuery('getTimeLineUsers', $userQueryParams);
			$timelineUsersAdded = $db->multiObjectQuery($timelineUsersAddedQuery);

			$userQueryParams = array("refId" => $basicDetails->project_id,"userId" =>$userId );
			$timelineUserRemovedQuery = getQuery('getTimeLineUserRemoved', $userQueryParams);
			$timelineUserRemoved = $db->multiObjectQuery($timelineUserRemovedQuery);

			$artefactQueryParams = array("refId" => $basicDetails->latest_version_id, "notificationType" => 2,"notificationOn" => 1);
			$timelineArtefactQuery = getQuery('getTimeLineArtefact', $artefactQueryParams);
			$timelineArtefactUpdated = $db->multiObjectQuery($timelineArtefactQuery);

			$artefactQueryParams = array("refId" => $basicDetails->latest_version_id, "notificationType" => 10,"notificationOn" => 1);
			$timelineArtefactQuery = getQuery('getTimeLineArtefact', $artefactQueryParams);
			$timelineArtefactreplaced = $db->multiObjectQuery($timelineArtefactQuery);

			Master::getLogManager()->log(DEBUG, MOD_MAIN, "get-time-line-users");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $timelineShared);

			// we need comment details
			$commentQueryParams = array("refId" => $basicDetails->latest_version_id,"userId" =>$userId );
			$timelineCommentQuery = getQuery('getTimeLineComments', $commentQueryParams);
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
				$date = date_create($timelineMeetings[$i]->created_date);
				$formattedDate = date_format($date, 'Y-m-d');

				$data = $timelineMeetings[$i];
				$data->type = 'meetings';

				$timeline[$formattedDate][] = $data;
			}

			for($i=0; $i<count($timelineUsersAdded); $i++) {
				$date = date_create($timelineUsersAdded[$i]->created_date);

				$addedUsersQueryParams = array("notification_id" => $timelineUsersAdded[$i]->notification_id,"userId" =>$userId);
				$addedUsersQuery = getQuery('getAddedUsers', $addedUsersQueryParams);
				$addedUsers = $db->multiObjectQuery($addedUsersQuery);

				$formattedDate = date_format($date, 'Y-m-d');

				$data = $timelineUsersAdded[$i];
				$data->type = 'usersAdded';
				$data->addedUsers = $addedUsers;

				$timeline[$formattedDate][] = $data;
			}

			for($i=0; $i<count($timelineSharedMembers); $i++) {
				$date = date_create($timelineSharedMembers[$i]->created_date);
				$formattedDate = date_format($date, 'Y-m-d');

				$data = $timelineSharedMembers[$i];
				$data->type = 'shared';

				$timeline[$formattedDate][] = $data;
			}

			for($i=0; $i<count($timelineUserRemoved); $i++) {
				$date = date_create($timelineUserRemoved[$i]->created_date);
				$formattedDate = date_format($date, 'Y-m-d');

				$data = $timelineUserRemoved[$i];
				$data->type = 'userRemoved';

				$timeline[$formattedDate][] = $data;
			}

			for($i=0; $i<count($timelineArtefactUpdated); $i++) {
				$date = date_create($timelineArtefactUpdated[$i]->created_date);
				$formattedDate = date_format($date, 'Y-m-d');

				$data = $timelineArtefactUpdated[$i];
				$data->type = 'updated';

				$timeline[$formattedDate][] = $data;
			}

			for($i=0; $i<count($timelineArtefactreplaced); $i++) {
				$date = date_create($timelineArtefactreplaced[$i]->created_date);
				$formattedDate = date_format($date, 'Y-m-d');

				$data = $timelineArtefactreplaced[$i];
				$data->type = 'replaced';

				$timeline[$formattedDate][] = $data;
			}

			for($i=0; $i<count($timelineComment); $i++) {
				$date = date_create($timelineComment[$i]->created_date);
				$formattedDate = date_format($date, 'Y-m-d');

				$data = $timelineComment[$i];
				$data->type = 'comments';

				$timeline[$formattedDate][] = $data;
			}


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
				timeline => $timeline,
				tags => $artefacttags
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

			$dbQuery = getQuery('getDocumentLinks', $queryParams);
			$links = $db->multiObjectQuery($dbQuery);

			$dbQuery = getQuery('getArtefactSharedMembers', $queryParams);
			$sharedMembers = $db->multiObjectQuery($dbQuery);

			$dbQuery = getQuery('getArtefactType', $queryParams);
			$docType = $db->singleObjectQuery($dbQuery)->artefact_type;

			$result = array(
				'links' => $links,
				'referenceDocs' => $references,
				'teamMembers' => $sharedMembers,
				'docType' => $docType
			);

			return $result;
		}

		public function submitArtefact($interpreter){
			$result = new stdClass();
			$result->messages = new stdClass();
			$data = $interpreter->getData()->data;
			$projectId = $data->project_id;
			// needed params
			// @artefact version id
			// @user id
			// 
			// prepare params
			$userId 			= $interpreter->getUser()->user_id;
			$artefactVersionId 	= $data->artefactVersionId;
			//
			$db 	= Master::getDBConnectionManager();
			$db->beginTransaction();

			try {
				// get owner of the aretefact
				// $artefactVersionInfo = $db->singleObjectQuery(getQuery('getArtefactVersionInfo', array(
				// 	"artefactversionid" => $artefactVersionId
				// )));

				$db->multiObjectQuery(getQuery('submitComments', array(
					"userid"			=> $userId,
					"artefactversionid"	=> $artefactVersionId
				)));

				$db->commitTransaction();

				// @TODO
				//=> send mail to the artefact owner
				// $mailData = 
				// $this->submitArtefactMail($mailData);
				// get artefact owner information

				$params = array('project_id' => $projectId);
				$query = getQuery('getProjectMembers', $params);
				$projectMembersInfo = $result->data = $db->multiObjectQuery($query);
				$notificationRecipients = array_map(function($info){
					return $info->user_id;
				}, $projectMembersInfo);


				$newNotification = Notifications::addNotification(array(
					'by'			=> $userId,
					'type'			=> 'submit',
					'on'			=> 'artefact',
					'ref_ids'		=> $artefactVersionId,
					'ref_id'		=> $artefactVersionId,
					'recipient_ids' => $notificationRecipients,
					'project_id'	=> $projectId
				),$db);

				$result->messages->type 	= "success";
				$result->messages->message 	= "Successfully submitted the artefact";
				$result->messages->icon 	= "success";
			}
			catch (Exception $e) {
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "submit artefact");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $e);
				$db->abortTransaction();
				$result->messages->type 	= "error";
				$result->messages->message 	= "Failed to submit the artefact";
				$result->messages->icon 	= "error";
			}

			return $result;
		}
	}
?>
