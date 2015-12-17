<?php
    class People {
    	public function getPeople($interpreter){
    		$data = $interpreter->getData()->data;
    		if($data->projects == "true"){
    			return $this->getProjectsPeople($interpreter);
    		} elseif ($data->all == "true") {
    			return $this->getOthersAndProjectPeople($interpreter);
    		} elseif($data->projectId){
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

			$projectId = $data->project_id;
			$accessType = $data->access_type;
			$groupType = $data->groupType ? $data->group_type : 'I';
			
			$users = $data->users;
			$count = count($users);
			for($i=0; $i<$count; $i++) {
				$users[$i] = "'" . $users[$i] . "'";
			}

			// Get DB Connection and start new transaction
			$db = Master::getDBConnectionManager();
			$db->beginTransaction();

			//@TODO: Get user ids from email ids. Remove this section once UI implement suggestions list
			$queryParams = array('@emailIds' => join(",", $users));
			$query = getQuery('getUserIdsFromEmails', $queryParams);
			$users = $db->multiObjectQuery($query);
			$actualCount = count($users);

			if($count != $actualCount) {
				return "Some of the users are not exists in DB.";
			} else {
				$column_names = array("proj_id","user_id","access_type","group_type");
				$row_values = array();
				for($i=0; $i<$actualCount; $i++) {
					$row_values[] = array($projectId, $users[$i]->user_id, $accessType, $groupType);
				}

				// Add all users to the project.
				$db->replaceMultipleRow(TABLE_PROJECT_MEMBERS, $column_names, $row_values);
				$db->commitTransaction();

				return "People added successfully.";
			}
		}
		
		public function removePeople($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->projectId;
			$peopleId = $data->peopleId;
			
			//remove people
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "peopleId");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $peopleId);
			$db = Master::getDBConnectionManager();
			$db->deleteTable(TABLE_PROJECT_MEMBERS, "proj_id = " . $projectId . " and user_id =" . $peopleId);
			
			return true;		
		}
		
		public function getOthersAndProjectPeople($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->projectId;
			
			$teamMembers = $this->getTeamMembersList($interpreter);
			
			$db = Master::getDBConnectionManager();
			$queryParams = array('projectId' => $projectId );
			
			$dbQuery = getQuery('getOtherMembersList',$queryParams);
			
			$otherMembers = $db->multiObjectQuery($dbQuery);
			
			$resultObj = array(
				otherMembers => $otherMembers,
				teamMembers => $teamMembers
			);
			return $resultObj;
		}
    }
?>