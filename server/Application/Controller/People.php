<?php
    class People {
    	public function getPeople($interpreter){
    		$data = $interpreter->getData()->data;
    		if($data->projects == "true"){
    			return $this->getProjectsPeople($interpreter);
    		}
    		elseif($data->projectId){
    			return $this->getTeamMembersList($interpreter);
    		}
    	}
    	public function getProjectsPeople($interpreter) {
    		$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			
			if($data->limit) {
				$limit  =  $data->limit;
			} else {
				$limit = 2147483647;
			}
			if($data->projectId) {
				$projectId = $data->projectId;
				$query = 'getPeopleInProject';
			} else {
				$projectId = null;
				$query = 'getPeopleInProjects';
			}
			$db = Master::getDBConnectionManager();
			$querDetails = getQuery($query,array('userid'=>$userId, '@limit' => $limit, 'projectId' => $projectId));
			$resultObj = $db->multiObjectQuery($querDetails);
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