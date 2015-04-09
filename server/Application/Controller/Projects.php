<?php 
	class Projects {
		public function getMyProjectsList($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $data->userid;
			$count = $data->count;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userid );
			$dbQuery = getQuery('getMyProjectsList',$queryParams);
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}
		
		public function getProjectArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $data->userid;
			$userSpecific = $data->userSpecific;
			$projectid = $data->projectid;
			$count = $data->count;
			
			$db = Master::getDBConnectionManager();
			$queryParams = array('userid' => $userid, 'projectid' => $projectid );
			if($userSpecific) {
				$dbQuery = getQuery('getProjectArtefactsWithUsers',$queryParams);
			} else {
				$dbQuery = getQuery('getProjectArtefactsWithoutUsers',$queryParams);
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
