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
			$userId = $interpreter->getUser()->user_id;

			$projectId = $data->project_id;
			$accessType = $data->access_type;
			$groupType = $data->group_type ? $data->group_type : 'I';
			
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

			$result = new stdClass();
			if($count != $actualCount) {
				$result->message = "Some of the users are not exists in DB.";
				return $result;
			} else {
				// Get project artefacts with versions
				$params = array('projectId' => $projectId);
				$query = getQuery('getAllArtefactsOfProject', $params);
				$projectArtefacts = $db->multiObjectQuery($query);
				$projectArtefactsCount = count($projectArtefacts);

				// Prepare artefact with latest versions
				$artefactVersions = new stdClass();
				for($j=0; $j<$projectArtefactsCount; $j++) {
					$artf = $projectArtefacts[$j];
					$artfId = $artf->artefact_id;

					if(!$artefactVersions->$artfId) {
						$artefactVersions->$artfId = $artf;
					} else {
						$artefactVersions->$artfId->artefact_ver_id = $artf->artefact_ver_id;
					}
				}

				$pr_members_columns = array("proj_id","user_id","access_type","group_type");
				$pr_members_values = array();

				$artf_members_columns = array("artefact_ver_id","artefact_id","user_id", "access_type", "shared_date", "shared_by", "while_creation");
				$artf_members_values = array();

				for($i=0; $i<$actualCount; $i++) {
					// Prepare rows for project_members
					$pr_members_values[] = array($projectId, $users[$i]->user_id, $accessType, $groupType);

					// Prepare rows for artefact shared members
					foreach($artefactVersions as $key => $value) {
						$artf_members_values[] = array($value->artefact_ver_id, $value->artefact_id, $users[$i]->user_id, $accessType, date("Y-m-d H:i:s"), $userId, 0);
					}
				}

				// Share all artefacts in a project to the users
				if($projectArtefactsCount) {
					$db->replaceMultipleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $artf_members_columns, $artf_members_values);
				}

				// Add users to the project.
				$db->replaceMultipleRow(TABLE_PROJECT_MEMBERS, $pr_members_columns, $pr_members_values);
				$db->commitTransaction();

				// Add 

				$result->message = "People added successfully.";
				return $result;
			}
		}
		
		public function removePeople($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->project_id;
			$peopleId = $data->id;	// This is people id
			
			//remove people
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