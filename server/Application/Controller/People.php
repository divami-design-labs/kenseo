<?php
    // require_once('Email.php');
    require_once('Notifications.php');
    class People {
    	public function getPeople($interpreter){
    		$data = $interpreter->getData()->data;
    		if(isset($data->projects) && $data->projects == "true"){
    			return $this->getProjectsPeople($interpreter);
    		} elseif (isset($data->all) && $data->all == "true") {
                return $this->getAllPeople($interpreter);
    			// return $this->getOthersAndProjectPeople($interpreter);
    		} elseif(isset($data->projectId) && $data->projectId){
    			return $this->getTeamMembersList($interpreter);
    		}
    	}

        public function getAllPeople($interpreter){
            $data = $interpreter->getData()->data;
            $versionId = $data->versionId;
            $projectId = $data->projectId;
			$userId = $interpreter->getUser()->user_id;
            $db = Master::getDBConnectionManager();
            $db->beginTransaction();
            if($data->versionId){
                $people = $db->multiObjectQuery(getQuery('getAllPeopleSpecificToAProject', array(
                    "versionid" => $versionId
                )));
            }else{
                $people = $db->multiObjectQuery(getQuery('getOtherMembersList', array(
                    "projectId" => $projectId
                )));
            }

            $db->commitTransaction();
            return $people;
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

        public function getArtefactSharedMembersList($interpreter){
            $data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			$artefactVersionId = $data->versionId;

			$db = Master::getDBConnectionManager();

			$queryParams = array('userId' => $userId, 'versionid' => $artefactVersionId );

			$dbQuery = getQuery('getArtefactSharedMembersListFromVersionId',$queryParams);

			$resultObj = $db->multiObjectQuery($dbQuery);

			return $resultObj;
        }

		public function addPeople($interpreter) {

			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->userId;

			$projectId = $data->project_id;
			$accessType = $data->access_type;
      // @TODO:TO be implemented in future
			$groupType = isset($data->group_type) ? $data->group_type : 'I';

			$users = $data->users;
			$count = count($users);
			// for($i=0; $i<$count; $i++) {
			// 	$users[$i] = "'" . $users[$i] . "'";
			// }
              foreach($users as $key => $value) {
                $userids[] = $value->user_id;
              }

			// Get DB Connection and start new transaction
			$db = Master::getDBConnectionManager();
			$db->beginTransaction();

			//@TODO: Get user ids from email ids. Remove this section once UI implement suggestions list
			$queryParams = array('@userids' => join(",", $userids));
			$query = getQuery('getUserIdsFromUserIds', $queryParams);
			$actualusers = $db->multiObjectQuery($query);
			$actualCount = count($actualusers);

            // Master::getLogManager()->log(DEBUG, MOD_MAIN, "users in implode");
            // Master::getLogManager()->log(DEBUG, MOD_MAIN, implode(array_map(function($c){ return $c->{'user_id'}; }, $users), ","));

            $addedUserIds = array_map(function($c){ return $c->{'user_id'}; }, $actualusers);

			$result = new stdClass();
            if($actualCount == 0){
                $result->status = "fail";
                $result->message = "No user found with that mail";
                return $result;
            }
			else if($actualCount > 0 && $count != $actualCount) {
				$result->message = "Some of the users are not exists in DB.";
				return $result;
			}
            else {
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
						$artefactVersions->$artfId->artefact_ver_id = $artf->artefact_version_id;
					}
				}

				$pr_members_columns = array("proj_id","user_id","access_type","group_type");
				$pr_members_values = array();

				$artf_members_columns = array("artefact_ver_id","artefact_id","user_id", "access_type", "shared_date", "shared_by", "while_creation");
				$artf_members_values = array();

				for($i=0; $i<$actualCount; $i++) {
           $notificationRecipients[] =  $actualusers[$i]->user_id;
					// Prepare rows for project_members
            for($j=0; $j<$count; $j++){
              if($actualusers[$i]->user_id == $users[$j]->user_id){
                $accessType = $users[$j]->access_type;
              }
            }
					$pr_members_values[] = array($projectId, $actualusers[$i]->user_id, $accessType, $groupType);

					// Prepare rows for artefact shared members
					foreach($artefactVersions as $key => $value) {
						$artf_members_values[] = array($value->artefact_ver_id, $value->artefact_id, $actualusers[$i]->user_id,$accessType, date("Y-m-d H:i:s"), $userId, 0);
                        Master::getLogManager()->log(DEBUG, MOD_MAIN, "shared details");
        				Master::getLogManager()->log(DEBUG, MOD_MAIN, $value);
  				}
				}

				// Share all artefacts in a project to the users
				if($projectArtefactsCount) {
					$db->replaceMultipleRow(TABLE_ARTEFACTS_SHARED_MEMBERS, $artf_members_columns, $artf_members_values);
				}

				// Add users to the project.
				$db->replaceMultipleRow(TABLE_PROJECT_MEMBERS, $pr_members_columns, $pr_members_values);

				// Add

				$result->message = "People added successfully.";


          $params = array('project_id' => $projectId);
    			$query = getQuery('getProjectMembers', $params);
    			$projectMembersInfo = $db->multiObjectQuery($query);
                // $notificationRecipients[] = $userId;
                $i = 0;
                foreach($projectMembersInfo as $recipient) {
                    $notificationRecipients[$i] = $recipient->user_id;
                    $i++;
                }

                Master::getLogManager()->log(DEBUG, MOD_MAIN, "new recipients");
				Master::getLogManager()->log(DEBUG, MOD_MAIN, $notificationRecipients);

    			$newNotification = Notifications::addNotification(array(
    				'by'			=> $userId,
    				'type'			=> 'add',
    				'on'			=> 'user',
    				'ref_id'		=> $projectId,
    				'recipient_ids' => $notificationRecipients,
    				'project_id'	=> $projectId,
                    'added_user_ids'=> $addedUserIds
    			),$db);
                // $mailInfo = $db->singleObjectQuery(getQuery('getOtherProjectMembersMailUserAdded', array(
                //     "projectid" => $projectId,
                //     "userid" => $userId,
                //     "@addeduserids" => join(",", $addedUserIds)
                // )));
                //
                // $this->addUserMail($mailInfo);
                $db->commitTransaction();
                
      			$resultMessage = new stdClass();
      			$resultMessage->type = "success";
      			$resultMessage->message = "Successfully added people";
      			$resultMessage->icon = "message-people";
      			//return $resultMessage;
			}

            $propleQuery = getQuery('getTeamMember',array('projectid' => $projectId, 'userid' => $addedUserIds));
                $peopleObj = $db->multiObjectQuery($propleQuery);

                $dataList = array(
                    people => $peopleObj,
                    messages => $resultMessage
                );


            if(count($dataList)){
                return $dataList;
            } else {
                return false;
            }
		}

		public function removePeople($interpreter) {
			$data = $interpreter->getData()->data;
            $userId = $interpreter->getUser()->user_id;
			$projectId = $data->proj_id;
			$peopleId = $data->id;	// This is people id

			//remove people
			$db = Master::getDBConnectionManager();
            $db->beginTransaction();
            try{


                $params = array('project_id' => $projectId);
                $query = getQuery('getProjectMembers', $params);
                $projectMembersInfo = $db->multiObjectQuery($query);
                $notificationRecipients[] = $userId;
                $notificationRecipients[] = $peopleId;

                $newNotification = Notifications::addNotification(array(
                    'by'			=> $userId,
                    'type'			=> 'delete',
                    'on'			=> 'user',
                    'ref_id'		=> $projectId,
                    'recipient_ids' => $notificationRecipients,
                    'project_id'	=> $projectId,
                    'removeduserid' => $peopleId
                ),$db);

                $querDetails = getQuery('getSharedArtefacts',array('userid'=>$userid, '@limit' => $limit ));
                $resultObj = $db->multiObjectQuery($querDetails);
                $i = 0;
                $artefactIdOfThisProject = array();
                foreach($resultObj as $resObj) {
                    if($resObj.p.project_id === $projectId){
                        $artefactIdOfThisProject[] = $resObj.a.artefact_id; 
                    }
                }
                Master::getLogManager()->log(DEBUG, MOD_MAIN, $resultObj);
                $db->deleteTable(TABLE_PROJECT_MEMBERS, "proj_id = " . $projectId . " and user_id =" . $peopleId);
                // $db->deleteTable(T)


                // $mailInfo = $db->singleObjectQuery(getQuery('getOtherProjectMembersMailUserRemoved', array(
                //     "projectid" => $projectId,
                //     "userid" => $userId,
                //     "removeduserid" => $peopleId
                // )));
                //
                // $this->removeUserMail($mailInfo);
                $db->commitTransaction();
            }
            catch(Exception $e){
                $db->abortTransaction();
            }

              $resultMessage = new stdClass();
              $resultMessage->messages = new stdClass();
              $resultMessage->messages->type = "success";
              $resultMessage->messages->message = "Successfully removed people";
              $resultMessage->messages->icon = "message-people";
              return $resultMessage;
		}

        public function personPermissions($interpreter) {
            $data = $interpreter->getData()->data;
            $userId = $interpreter->getUser()->user_id;
            $accessType = $data->access_type;
            $projectId = $data->project_id;
            $person_id = $data->user_id;  // This is people id
            $db = Master::getDBConnectionManager();
            $db->beginTransaction();
            $resultObj = $db->updateTable(
            TABLE_PROJECT_MEMBERS,
            array(
                "access_type"
            ),
            array(
                $accessType
            ),
            "user_id = " . $person_id . " and proj_id = " . $projectId
            );

            $newNotification = Notifications::addNotification(array(
                'by'			=> $userId,
                'type'			=> 'change permission',
                'on'			=> 'user',
                'ref_id'		=> $projectId,
                'recipient_ids' => $person_id,
                'project_id'	=> $projectId,
            ),$db);

            $db->commitTransaction();

             return $resultObj;
        }

		public function getOthersAndProjectPeople($interpreter) {
			$data = $interpreter->getData()->data;
			$projectId = $data->projectId;

            // Get artefact shared members list
			$teamMembers = $this->getArtefactSharedMembersList($interpreter);

			$db = Master::getDBConnectionManager();
			$queryParams = array('projectId' => $projectId );

			$dbQuery = getQuery('getOtherMembersList',$queryParams);

			$otherMembers = $db->multiObjectQuery($dbQuery);

			$resultObj = array(
				"otherMembers" => $otherMembers,
				"teamMembers" => $teamMembers
			);
			return $resultObj;
		}

        public function getOtherProjectMembers($interpreter){
            $result = new stdClass();

            $data = $interpreter->getData()->data;
			$projectId = $data->projectId;

            $db = Master::getDBConnectionManager();
            $db->beginTransaction();


            try{
                $result->users = $db->multiObjectQuery(getQuery('getOtherMembersList', array(
                    "projectId" => $projectId
                )));

                $db->commitTransaction();
            }
            catch(Exception $e){
                $db->abortTransaction();
                $result->status = "fail";
            }

            return $result;
        }

        public function addUserMail($info){
            // Send mail to project members
            $mailData = new stdClass();
            // $mailData->to = $info->emails;
            $addedUsers = $info->{'added_users'};
            $addedUsersCount = count(explode(",", $addedUsers));
            $activityDoneUser = $info->{'activity_done_user'};
            $projectName = $info->{'project_name'};
            $emails = explode(",", $info->emails);
            $addedUserEmails = explode(",", $info->{'added_user_emails'});

            $verb = $addedUsersCount > 1 ? "are" : "is";
            $plural = $addedUsersCount > 1 ? "s" : "";

            $mailData->subject = "[Kenseo] $projectName: New User$plural $verb added by $activityDoneUser";

            $users = explode(",", $info->users);
            // Master::getLogManager()->log(DEBUG, MOD_MAIN, "email data");
            // Master::getLogManager()->log(DEBUG, MOD_MAIN, $addedUserEmails);
            foreach($users as $key => $user){
                $email = $emails[$key];
                $mailData->to = $email;
                $mailData->username = $user;

                $messageExcerpt = in_array($email, $addedUserEmails)? "You are": "New user$plural '$addedUsers' $verb";
                $mailData->message = "$messageExcerpt added to '$projectName' project by $activityDoneUser";

                // Master::getLogManager()->log(DEBUG, MOD_MAIN, "email data");
                // Master::getLogManager()->log(DEBUG, MOD_MAIN, $mailData);

                // Not using $this to avoid referencing to the called class
                Email::sendMail($mailData);
            }
        }

        public function removeUserMail($info){
            // Send mail to project members
            $mailData = new stdClass();
            // $mailData->to = $info->emails;
            $removedUsers = $info->{'removed_users'};
            $removedUsersArray = explode(",", $removedUsers);
            $removedUsersCount = count($removeUsersArray);
            $activityDoneUser = $info->{'activity_done_user'};
            $projectName = $info->{'project_name'};
            $emails = explode(",", $info->emails);
            $removedUserEmails = explode(",", $info->{'removed_user_emails'});

            $verb = $removedUsersCount > 1 ? "are" : "is";
            $plural = $removedUsersCount > 1 ? "s" : "";

            // Concat two arrays
            $emails = array_merge($emails, $removedUserEmails);
            $users = array_merge(explode(",", $info->users), $removedUsersArray);

            $mailData->subject = "[Kenseo] $projectName: User$plural $verb removed by $activityDoneUser";

            // Master::getLogManager()->log(DEBUG, MOD_MAIN, "email data");
            // Master::getLogManager()->log(DEBUG, MOD_MAIN, $removedUserEmails);
            foreach($users as $key => $user){
                $email = $emails[$key];
                $mailData->to = $email;

                $mailData->username = $user;

                $messageExcerpt = in_array($email, $removedUserEmails)? "You are": "User$plural '$removedUsers' $verb";
                $mailData->message = "$messageExcerpt removed from '$projectName' project by $activityDoneUser";



                // Not using $this to avoid referencing to the called class
                Email::sendMail($mailData);
            }
        }
    }
?>
