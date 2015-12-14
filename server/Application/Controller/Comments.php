<?php 
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

			$db->commitTransaction();

			$queryParams = array('commentThreadId' => $comment_thread_id);
			$query = getQuery('getArtefactCommentThread', $queryParams);
			$commentThreads = $db->multiObjectQuery($query);

			return $this->getThreadComments($db, null, $commentThreads);
		}

		public static function getThreadComments($db, $artefactVerId, $commentThreads) {
			// Create threads object
			$commentThreadsData = new stdClass();

			if($artefactVerId) {
				$queryParams = array('artefactVerId' => $artefactVerId);

				// Get all comment threads of artefact version id
				$commentThreadQuery = getQuery('getArtefactCommentThreads', $queryParams);
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $commentThreadQuery);
				$commentThreads = $db->multiObjectQuery($commentThreadQuery);
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
				$queryParams = array('@commentThreadIds' => join(",", $commentThreadIds));
				$commentsQuery = getQuery('getComments', $queryParams);
				$comments = $db->multiObjectQuery($commentsQuery);

				// Format the structure as UI needs
				$commentsCount = count($comments);
				for($i=0; $i<$commentsCount; $i++) {
					$comment = $comments[$i];
					$commentId = $comment->comment_id;
					$threadId = $comment->comment_thread_id;

					if(!$commentThreadsData->$threadId->comments) {
						$commentThreadsData->$threadId->comments = new stdClass();
					}
					unset($comment->comment_thread_id);
					$commentThreadsData->$threadId->comments->$commentId = $comment;
				}
			}

			return $commentThreadsData;
		}
	}
?>
