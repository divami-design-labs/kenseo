<?php
	require_once('Notifications.php');
	class Comments {
		public function createComment($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;

			// Get DB Connection and start new transaction
			$db = Master::getDBConnectionManager();
			$db->beginTransaction();

			$category = $data->category;
			$severity = $data->severity;
			$is_private = $data->is_private;
			$state = $data->state;
			$comment_thread_id = $data->comment_thread_id;

			if(!$category) {
				$category = 'I';
			}
			if(!$severity) {
				$severity = 'R';
			}
			if(!$is_private || !in_array($is_private, array(0, 1))) {
				$is_private = 0;
			}
			if(!$state) {
				$state = 'O';
			}
			if(!$data->artefact_ver_id) {
				return;
			}

			// Create new comment thread
			if(!$comment_thread_id || $comment_thread_id == -1) {
				$columnnames = array('artefact_ver_id', 'comment_thread_by', 'page_no', 'posx', 'posy', 'category', 'severity', 'is_private', 'state', 'comment_type');
				$rowvals = array($data->artefact_ver_id, $userId, $data->page_no, $data->posx, $data->posy, $category, $severity, $is_private, $state, 'I');
				$comment_thread_id = $db->insertSingleRowAndReturnId(TABLE_COMMENT_THREADS, $columnnames, $rowvals);
			} else {
				// Check whether artefact_ver_id and comment_thread_id are original
				$params = array('artefactVerId' => $data->artefact_ver_id, 'commentThreadId' => $comment_thread_id);
				$query = getQuery('getCommentThread', $params);
				$result = $db->multiObjectQuery($query);

				if(!count($result)) {
					return;
				}

				$db->updateTable(TABLE_COMMENT_THREADS,
					array('category', 'severity', 'is_private', 'state'),
					array($category, $severity, $is_private, $state),
					"comment_thread_id = " . $comment_thread_id);
			}

			// Create new comment if description is there
			if($data->description) {
				if(!$data->comment_id) {
					$columnnames = array('comment_thread_id','comment_by', 'description');
					$rowvals = array($comment_thread_id, $userId, $data->description);
					$data->comment_id = $db->insertSingleRowAndReturnId(TABLE_COMMENTS, $columnnames, $rowvals);
				} else {
					//@TODO: Edit comment in future
				}
			}

			// Update state of an artefact_version_id based on type of comments in that artefact.
			// If atleast 1 RED comment is there, then state will be 'C' (Critical)
			// If no RED, and atleast 1 BLUE comment is there, then state will be 'N' (Normal)
			// If no RED and BLUE comments, then state will be 'A' (Approved)
			$params = array('artefact_ver_id'=>$data->artefact_ver_id);
			$query = getQuery('getArtefactCommentSeverities', $params);
			$rows = $db->multiObjectQuery($query);

			$attValues = Comments::getSpecificAttrValues($rows, "artefact_ver_id", $data->artefact_ver_id, "severity");
			if(in_array("R", $attValues)) {
				$artefact_ver_state = 'C';
			} else if(in_array("B", $attValues)) {
				$artefact_ver_state = 'N';
			} else {
				$artefact_ver_state = 'A';
			}

			// Update state in artefact versions table
			$db->updateTable(TABLE_ARTEFACTS_VERSIONS,
					array('state'),
					array($artefact_ver_state),
					"artefact_ver_id = " . $data->artefact_ver_id);

			$params = array('artefactVerId' => $data->artefact_ver_id);
			$query = getQuery('getProjectfromVersionId', $params);
			$project = $db->singleObjectQuery($query);
			$newNotification = Notifications::addNotification(array(
				'by'			=> $userId,
				'type'			=> 'add',
				'on'			=> 'comment',
				'ref_ids'		=> $data->artefact_ver_id,
				'ref_id'		=> $data->artefact_ver_id,
				'recipient_ids' => $userId,
				'project_id'	=> $project->project_id
			),$db);


			$db->commitTransaction();

			$queryParams = array('commentThreadId' => $comment_thread_id);
			$query = getQuery('getArtefactCommentThread', $queryParams);
			$commentThreads = $db->multiObjectQuery($query);

			$data = new stdClass();
			$data->userId = $userId;

			return $this->getThreadComments($db, $data, $commentThreads);
		}


		/**
		 * @TODO: Move this generic function to utilities. This is not using as of now.
		 * Get column values as ARRAY based on selector value
		 * @param {Array} $arr
		 * @param {String} $attr_name		// Attribute name to search
		 * @param {String} $attr_val		// Attribute value to match
		 * @param {String} $final_attr		// This attributes will include in result array
		 * @return Array
		 */
		public function getSpecificAttrValues($arr, $attr_name, $attr_val, $final_attr) {
			$result = array();

			for($j=0, $jLen=count($arr); $j<$jLen; $j++) {
				$row = $arr[$j];
				if($row->$attr_name == $attr_val) {
					$result[] = $row->$final_attr;
				}
			}

			return $result;
		}

		// @TODO: the below function is made static to access from other classes.  Not sure whether this is the right thing.
		public static function getThreadComments($db, $data, $commentThreads) {
			// Create threads object
			$commentThreadsData = new stdClass();
			if($data){
				$artefactVerId 	= $data->artefactVerId;
				$userId 		= $data->userId;

				if($artefactVerId) {
					$queryParams = array('artefactVerId' => $artefactVerId, 'userid' => $userId);

					// Get all comment threads of artefact version id
					$commentThreadQuery = getQuery('getArtefactCommentThreads', $queryParams);
					$commentThreads = $db->multiObjectQuery($commentThreadQuery);
				}
			}

			// Generate an array of comment thread ids
			$threadCount = count($commentThreads);
			$commentThreadIds = array();
			for($i=0; $i<$threadCount; $i++) {
				$threadId = $commentThreads[$i]->comment_thread_id;
				$commentThreadsData->$threadId = $commentThreads[$i];

				$commentThreadIds[] = "'" . $threadId . "'";
			}


			// Get all comments based on generated comment thread ids
			if(count($commentThreadIds)) {
				$queryParams = array(
					'@commentThreadIds' => join(",", $commentThreadIds),
					'userid'			=> $userId
				);
				$commentsQuery = getQuery('getComments', $queryParams);
				$comments = $db->multiObjectQuery($commentsQuery);

				// Format the structure as UI needs
				$commentsCount = count($comments);
				$threadsData = new stdClass();
				for($i=0; $i<$commentsCount; $i++) {
					$comment = $comments[$i];
					$commentId = $comment->comment_id;
					$threadId = $comment->comment_thread_id;
					if(!$threadsData->$threadId){
						$threadsData->$threadId = $commentThreadsData->$threadId;
					}
					if(!$threadsData->$threadId->comments) {
						$threadsData->$threadId->comments = new stdClass();
					}
					unset($comment->comment_thread_id);
					$threadsData->$threadId->comments->$commentId = $comment;
				}
			}

			return $threadsData;
		}
		public function getCommentSummary($interpreter) {
      		$resultObj = new stdClass();
			$data = $interpreter->getData()->data;
			$maskedVerId = $data->maskedVerId;
			$userId = $interpreter->getUser()->user_id;
			//get the basic details of the artefact based on the artefact version.
			$db = Master::getDBConnectionManager();
			$queryParams = array('maskedVerId' => $maskedVerId, userId=>$userId);

			$basicDetailsQuery = getQuery('artefactBasicDetails', $queryParams);
			$basicDetails = $db->singleObjectQuery($basicDetailsQuery);

			$versionId = $basicDetails->versionId;
			$queryParams = array('artefactVerId' => $versionId, userid=>$userId);

			$commentThreads = new stdClass();
			$commentThreadQuery = getQuery('getArtefactCommentThreads', $queryParams);
			$commentThreads = $db->multiObjectQuery($commentThreadQuery);

			$threadCount = count($commentThreads);
			$threadIds = array();
			for($i=0; $i<$threadCount; $i++) {
				$threadIds[] = $commentThreads[$i]->comment_thread_id;
			}
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "commentsdate");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $threadIds);
			$dateParams = array('@threadIds' => join(",", $threadIds));
			$initiatedDateQuery = getQuery('getEarliestDate', $dateParams);
			$initiatedDate = $db->singleObjectQuery($initiatedDateQuery);
			for($i=0; $i<$threadCount; $i++) {
				$threadId = $commentThreads[$i]->comment_thread_id;
				$queryParams = array(
					'@commentThreadIds' => $threadId,
					'userid'			=> $userId
				);
				$commentsQuery = getQuery('getComments', $queryParams);
				$comments = $db->multiObjectQuery($commentsQuery);
				$commentThreads[$i]->comments = $comments;
			}

			$queryParams = array('versionId' => $versionId, userId=>$userId);
			$dbQuery = getQuery('getCommentedMembers',$queryParams);

			$commentMembers = $db->multiObjectQuery($dbQuery);

			$resultObj->threads = $commentThreads;
			$resultObj->commentMembers = $commentMembers;
			$resultObj->initiatedDate = $initiatedDate -> earliestDate;
			return $resultObj;
		}

		public function editComment($interpreter){
			$result 	= new stdClass();
			$messages 	= new stdClass();

			$userId = $interpreter->getUser()->user_id;
			$data 	= $interpreter->getData()->data;

			// params
			$commentId 		= $data->{'comment_id'};
			$commentContent = $data->{'description'};

			$db = Master::getDBConnectionManager();
			$db->beginTransaction();
			try{
				// functionality here
				// get comment data from comment id
				$commentInfo = $db->singleObjectQuery(getQuery('getCommentInfoFromCommentId', array(
					"commentid" => $commentId
				)));

				// check if the comment is_submitted or not 
				// check if the comment is added by the user or not
				if($commentInfo->{'is_submitted'} == "0" && $commentInfo->{'comment_by'} == $userId){
					// edit the row
					$db->updateTable(
						"artefact_comments",
						array(
							"description"
							// @TODO: update time as well
						),
						array(
							$commentContent
						),
						"comment_id = " . $commentId
					);

					$result->status 	= "success";
					$result->message 	= "done";

					$messages->type 	= "success";
					$messages->message 	= "Successfully edited the comment";
					$messages->icon 	= "success";
				}
				else{
					$messages->type 	= "error";
					$messages->message 	= "You can't edit this comment";
					$messages->icon 	= "error";
				}

				$db->commitTransaction();
			}
			catch(Exception $e){
				$db->abortTransaction();

				Master::getLogManager()->log(DEBUG, MOD_MAIN, "Edit comment");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $e);

				$result->status 	= "fail";
				$result->message 	= "Exception occured";

				$messages->type 	= "error";
				$messages->message 	= "Unable to edit the comment";
				$messages->icon 	= "error";
			}

			$result->messages = $messages;

			return $result;
		}

		public function deleteComment($interpreter){
			$result 	= new stdClass();
			$messages 	= new stdClass();

			$userId = $interpreter->getUser()->user_id;
			$data 	= $interpreter->getData()->data;

			$result->status = "fail";
			// params
			$commentId = $data->{'comment_id'};

			$db = Master::getDBConnectionManager();
			$db->beginTransaction();
			try{
				// functionality here
				// get comment data from comment id
				$commentInfo = $db->singleObjectQuery(getQuery('getCommentInfoFromCommentId', array(
					"commentid" => $commentId
				)));

				// check if the comment is_submitted or not 
				// check if the comment is added by the user or not
				if($commentInfo->{'is_submitted'} == "0" && $commentInfo->{'comment_by'} == $userId){
					$db->deleteTable("artefact_comments", "comment_id = " . $commentId);
					$result->status 	= "success";
					$result->message 	= "done";

					$messages->type 	= "success";
					$messages->message 	= "Successfully deleted the comment";
					$messages->icon 	= "success";
				}
				else{
					$result->message = "You can't delete this comment";

					$messages->type 	= "error";
					$messages->message 	= "You can't delete this comment";
					$messages->icon 	= "error";
				}

				$db->commitTransaction();
			}
			catch(Exception $e){
				$db->abortTransaction();

				Master::getLogManager()->log(DEBUG, MOD_MAIN, "Edit comment");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $e);

				$result->status 	= "fail";
				$result->message 	= "Exception occured";

				$messages->type 	= "error";
				$messages->message 	= "Unable to delete the comment";
				$messages->icon 	= "error";
			}

			$result->messages = $messages;

			return $result;
		}
	}
?>
