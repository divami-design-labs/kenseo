<?php 
	class Projects {
		public function getProjects($interpreter) {
			$data = $interpreter->getData()->data;

			if($data->userProjects == "true"){
				return $this->getMyProjectsList($interpreter);
			}
		}
		
		public function getMyProjectsList($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;
			$limit = $data->limit;
			$includeArchives = $data->includeArchives;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userid, '@limit'=>$limit);
			if($includeArchives) {
				// Get all projects along with archived projects
				$dbQuery = getQuery('getMyProjectsWithArchive', $queryParams);
			} else if($limit) {
				$dbQuery = getQuery('getMyProjectsList', $queryParams);
			} else {
				$dbQuery = getQuery('getMyProjectsListAll', $queryParams);
			}
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}

		public function deleteProject($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->projectId;
			
			// Delete the project
			$db = Master::getDBConnectionManager();
			$db->deleteTable(TABLE_PROJECTS, "project_id = " . $projectId);
			
			return true;
		}
											
		public function archiveProject($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->id;
			
			//Archive project
			$db = Master::getDBConnectionManager();
			$db->updateTable(TABLE_PROJECTS, array("state"), array('Z'), "project_id = " . $projectId);
			
			return true;
		}

		public function unArchiveProject($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->id;
			
			//Un archive project
			$db = Master::getDBConnectionManager();
			$db->updateTable(TABLE_PROJECTS, array("state"), array('A'), "project_id = " . $projectId);
			
			return true;
		}
														
		public function addProject($interpreter) {
			$data = $interpreter->getData()->data;
			// $projectName = $data->projectName->value;
			$projectName = $data->projectName;
			$userId = $interpreter->getUser()->user_id;
			$date = date("Y-m-d H:i:s");

			$db = Master::getDBConnectionManager();
			$db->beginTransaction();

			// Get org_id id from user_id and save org_id in projects table.
			$queryParams = array('user_id' => $userId);
			$dbQuery = getQuery('getUserOrganizationId', $queryParams);
			$org_id = $db->singleObjectQuery($dbQuery)->org_id;
			
			// Add project
			$projId = $db->insertSingleRowAndReturnId(TABLE_PROJECTS,
				array("project_name", "state", "org_id", "created_by", "last_updated_date"), 
				array("$projectName", "A", $org_id, $userId, "$date")
			);

			Master::getLogManager()->log(DEBUG, MOD_MAIN, $projId);

			// Add user as default project member and give full permissions as 'X'
			$columns = array("proj_id", "user_id", "access_type", "group_type");
			$rows = array();
			$rows[] = array($projId, $userId, "X", "I");
			
			//@TODO: Remove this code when UI for "Adding management users to the project" is implemented.
			// Add management users also to this project.
			$management_users = array("naveen@divami.com", "vasu@divami.com");
			$queryParams = array('@emailIds' => "'" . join("','", $management_users) . "'");

			$query = getQuery('getUserIdsFromEmails', $queryParams);
			$users = $db->multiObjectQuery($query);

			for($i=0, $iLen=count($users); $i<$iLen; $i++) {
				$rows[] = array($projId, $users[$i]->user_id, "X", "I");
			}

			// Insert above users as project members
			$db->insertMultipleRow(TABLE_PROJECT_MEMBERS, $columns, $rows);

			$db->commitTransaction();
			
			return true;
		}
		
		public function getProjectActivity($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->projectId;
			
			$db = Master::getDBConnectionManager();
			$queryParams = array('projectId' => $projectId);
			
			$dbQuery = getQuery('getProjectActivity',$queryParams);
			
			$resultObj = $db->multiObjectQuery($dbQuery);
			
		}
	}
?>
