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
		
		public function getProjectArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;;
			$sharePermission = $data->sharepermission;
			$projectid = $data->projectid;
			$count = $data->count;
			
			$db = Master::getDBConnectionManager();
			$queryParams = array('userid' => $userid, 'projectid' => $projectid );
			if($sharePermission) {
				$dbQuery = getQuery('getProjectArtefactsWithSharePermission',$queryParams);
			} else {
				$dbQuery = getQuery('getProjectArtefactsWithoutSharePermission',$queryParams);
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
	}
?>
