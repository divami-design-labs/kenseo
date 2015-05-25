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
			$userid = $interpreter->getUser()->user_id;;
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
			$projectName = $data->projectName->value;
			$userId = $interpreter->getUser()->user_id;
			$date = date("Y-m-d H:i:s");
			
			//add project
			$db = Master::getDBConnectionManager();
			$projId = $db->insertSingleRowAndReturnId (TABLE_PROJECTS,array("project_name","state","last_updated_date"),array("$projectName","A","$date"));
			
			//now add user to the project members
			$db->insertSingleRow (TABLE_PROJECT_MEMBERS,array("proj_id","user_id","access_type","group_type"),array($projId,$userId,"S","I"));
			
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
