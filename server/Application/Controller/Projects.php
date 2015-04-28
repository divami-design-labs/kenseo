<?php 
	class Projects {
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
		
		public function getTeamMembersList($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			$projectId = $data->projectId;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userId' => $userId, 'projectId' => $projectId );
			
			$dbQuery = getQuery('getTeamMembersList',$queryParams);
			
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
			$projectId = $data->projectId;
			
			//Archive project
			$db = Master::getDBConnectionManager();
			$db->updateTable(TABLE_PROJECTS,array("state"),array('A'), "project_id = " . $projectId);
			
			return true;		
		}
														
		public function addProject($interpreter) {
			$data = $interpreter->getData()->data;
			$projectName = $data->projectName;
			$date = date("Y-m-d H:i:s");
			
			//Archive project
			$db = Master::getDBConnectionManager();
			$db->insertSingleRow (TABLE_PROJECTS,array("project_name","description","intro_img_url","state","last_updated_date"),array("$projectName","","","O","$date"));
			
			return true;		
		}
		
		public function addPeople($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->projectId;
			$peopleId = $data->peopleId;
			$accessType = $data->accessType;
			$groupType = $data->groupType;
			
			//Archive project
			$db = Master::getDBConnectionManager();
			$db->insertSingleRow (TABLE_PROJECT_MEMBERS,array("proj_id","user_id","role","access_type","group_type"),array("$projectId","$peopleId","","$accessType","$groupType"));
			
			return true;		
		}
		
		public function removePeople($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->projectId;
			$peopleId = $data->peopleId;
			
			//Archive project
			$db = Master::getDBConnectionManager();
			$db->deleteTable(TABLE_PROJECT_MEMBERS, "proj_id = " . $projectId and "user_id" . $peopleId);
			
			return true;		
		}
	}
?>
