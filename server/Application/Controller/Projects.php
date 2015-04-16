<?php 
	class Projects {
		public function getMyProjectsList($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $data->userid;
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
			$userid = $data->userid;
			$sharePermission = $data->sharePermission;
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
			$userId = $data->userId;
			$projectId = $data->projectId;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userId' => $userId, 'projectId' => $projectId );
			
			$dbQuery = getQuery('getTeamMembersList',$queryParams);
			
			$resultObj = $db->multiObjectQuery($dbQuery);
			
			return $resultObj;
			
		}		
	}
?>
