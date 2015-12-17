<?php 
	class Projects {
		public function getProjects($interpreter){
			$data = $interpreter->getData()->data;

			if($data->userProjects == "true"){
				return $this->getMyProjectsList($interpreter);
			}
		}
		public function getMyProjectsList($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;
			$count = $data->limit;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userid, '@limit'=>$count );
			if($count){
				$dbQuery = getQuery('getMyProjectsList',$queryParams);
			}
			else{
				$dbQuery = getQuery('getMyProjectsListAll',$queryParams);
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
			$db->updateTable(TABLE_PROJECTS,array("state"),array('Z'), "project_id = " . $projectId);
			
			return true;		
		}
														
		public function addProject($interpreter) {
			$data = $interpreter->getData()->data;
			// $projectName = $data->projectName->value;
			$projectName = $data->projectName;
			$userId = $interpreter->getUser()->user_id;
			$date = date("Y-m-d H:i:s");

			$db = Master::getDBConnectionManager();

			// Get org_id id from user_id and save org_id in projects table.
			$queryParams = array('user_id' => $userId);
			$dbQuery = getQuery('getUserOrganizationId',$queryParams);
			$org_id = $db->singleObjectQuery($dbQuery)->org_id;
			
			// Add project
			$projId = $db->insertSingleRowAndReturnId (TABLE_PROJECTS, array("project_name","state","org_id","last_updated_date"), array("$projectName", "A", $org_id, "$date"));
			
			// Add user as default project member and give full permissions as 'X'
			$db->insertSingleRow (TABLE_PROJECT_MEMBERS,array("proj_id","user_id","access_type","group_type"),array($projId,$userId,"X","I"));
			
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
