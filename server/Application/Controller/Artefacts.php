<?php 
	class Artefacts {
		public function getArtefacts($interpreter){
			// return "I am in";
			$data = $interpreter->getData()->data;
			if($data->shared){
				return $this->getSharedArtefacts($interpreter);
			}
			elseif($data->activities){
				return $this->getRecentArtefactActivities($interpreter);
			}
			elseif($data->linked){
				return $this->getArtefactsLink($interpreter);
			}
			elseif($data->references){
				return $this->getReferences($interpreter);
			}
			return "something else";
		}
		function getSharedArtefacts($interpreter) {
			$data = $interpreter->getData();
			$userid = $interpreter->getUser()->user_id;;
			
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $userid);
			
			$db = Master::getDBConnectionManager();
			$querDetails = getQuery('getReviewRequests',array('userid'=>$userid));
			$resultObj = $db->multiObjectQuery($querDetails);
			return $resultObj;
		}
		public function getRecentArtefactActivities($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $interpreter->getUser()->user_id;;
			$count = $data->count;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userid );
			$dbQuery = getQuery('getMyRecentArtefacts',$queryParams);
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}
		public function getArtefactsLink($interpreter) {
			$data = $interpreter->getData()->data;
			$userId =  $interpreter->getUser()->user_id;
			$projectId = $data -> projectId;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userId, 'projectid' => $projectId);
			$dbQuery = getQuery('getArtefactsLink',$queryParams);
			$resultObj = $db->multiObjectQuery($dbQuery);
			
			return $resultObj;
		}		
		public function addArtefactVersion($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;;
			$previousArtefactid = $data->previousArtefactid;
			$latestArtefactid = $data -> latestArtefactid;
			
			$db = Master::getDBConnectionManager();
			//first get the latest artefact version of previos artefact
			$artefactVersionParams = array(artId => $previousArtefactid);
			$dbQuery = getQuery('getLatestVerionOfArtefact', $artefactVersionParams);
			
			$latestVersion = $db->multiObjectQuery($dbQuery);
			$latestVersion = $latestVersion[0]->verId;

			//get the version details
			$artefactOldVersionParams = array(artId => $latestArtefactid);
			$dbQuery = getQuery('getVerionDetailsOfArtefact', $artefactOldVersionParams);
			$existingArtVersionDetails = $db->multiObjectQuery($dbQuery);
			
			$existingArtVersionDetails = $existingArtVersionDetails[0];
			

			//insert a new row for the new artefact version of the main artefact
			$column_names = array('artefact_ver_id','artefact_id','version_label','created_by','created_date','document_path','MIME_type','file_size','state','shared');
			$columnData = array($latestVersion+1,$previousArtefactid,$existingArtVersionDetails->version_label,$existingArtVersionDetails->created_by,$existingArtVersionDetails->created_date,$existingArtVersionDetails->document_path,$existingArtVersionDetails->MIME_type,$existingArtVersionDetails->file_size,$existingArtVersionDetails->state,0);
			$db->insertSingleRow(TABLE_ARTEFACTS_VERSIONS, column_names , $columnData);
			
			//update the latest version number of the previous artefact
			$db->updateTable(TABLE_ARTEFACTS, array("latest_version_id"),array($latestVersion+1),"artefact_id = " . $previousArtefactid);
			
			//now delete the latest artefact from the table
			//$db->deleteTable(TABLE_ARTEFACTS,"artefact_id = ". $latestArtefactid);
			//$db->deleteTable(TABLE_ARTEFACT_VERSIONS,"artefact_id = ". $latestArtefactid);
			
			return true;
		}

		public function replaceArtefact($interpreter) {
			$data = $interpreter->getData()->data;
			
			$artId = $data -> replaceArtefactId;
			$newArt = $data -> newArtefactid;
			$file = $data -> file;
			
			$db = Master::getDBConnectionManager();
			if($newArt > 0) {
				//control comes here while replacing with an existing artefact
				$db->updateTable(TABLE_ARTEFACTS, array("replace_ref_id"), array($newArt), "artefact_id = " . $artId);
			} else {
				//replacingg with a new file
			}
			
			return true;
		}
		
		public function archiveArtefact($interpreter) {
			$data = $interpreter->getData()->data;
			
			$artId = $data -> artefactId;
			
			$db = Master::getDBConnectionManager();
			$db->updateTable(TABLE_ARTEFACTS,array("state"),array('A'), "artefact_id = " . $artId);
			
			return true;
		}
		
		public function deleteArtefact($interpreter) {
			$data = $interpreter->getData()->data;			
			$artId = $data -> artefactId;
			
			$db = Master::getDBConnectionManager();
			$db->deleteTable(TABLE_ARTEFACTS, "artefact_id = " . $artId);
			
			return true;
		}		
		
		public function linkArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$artefactId = 1;
			$linkArtefacts = $data -> linkIds;
			
			$date = date("Y-m-d H:i:s");
			
			$db = Master::getDBConnectionManager();
			//$db->updateTable (TABLE_ARTEFACTS,array("linked_id"),array(0), "artefact_id = " . $artefactId);			
			//Get the artefact link id
			$queryParams = array('artefactid' => $artefactId );
			$dbQuery = getQuery('getArtefactLinkId',$queryParams);
			$artefactLinkId = $db->singleObjectQuery($dbQuery);
			$artefactLinkId	= $artefactLinkId -> linked_id;		
		
			if($artefactLinkId == 0) {
				$dbQuery = getQuery('getMaxLinkId');
				$artefactLinkId = $db->singleObjectQuery($dbQuery);
				
				//Get the max link id of all the artefacts link id and add one to get a new linked id.
				$artefactLinkId = $artefactLinkId -> linked_id + 1;
				
				//Update artefact linked id in artefacts table
				$db->updateTable (TABLE_ARTEFACTS,array("linked_id"),array("$artefactLinkId"), "artefact_id = " . $artefactId);
			}
			
			for($i = 0; $i < sizeof($linkArtefacts); $i++) {
				//Get the linked artefact link id
				$queryParams = array('artefactid' => $linkArtefacts[$i] );
				$dbQuery = getQuery('getArtefactLinkId',$queryParams);
				$linkedArtefactLinkId = $db->singleObjectQuery($dbQuery);
				$linkedArtefactLinkId = $linkedArtefactLinkId -> linked_id;
				
				if($artefactLinkId != $linkedArtefactLinkId) {
					if($linkedArtefactLinkId != 0) {
						//Update all linked artefacts linked id with artefact link id in artefacts table
						$db->updateTable (TABLE_ARTEFACTS,array("linked_id"),array("$artefactLinkId"), "linked_id = " . $linkedArtefactLinkId);	
						
						//Update only that linked artefacts linked id with artefact link id in artefact links table
						$db->updateTable (TABLE_ARTEFACT_LINKS,array("linked_id"),array("$artefactLinkId"), "linked_id = " . $linkedArtefactLinkId);
					} else {
						//Update linked artefacts linked id with artefact link id in artefacts table
						$db->updateTable (TABLE_ARTEFACTS,array("linked_id"),array("$artefactLinkId"), "artefact_id = " . $linkArtefacts[$i]);							
					}
					
					//Add link entry in artefact link table
					$db->insertSingleRow (TABLE_ARTEFACT_LINKS,array("linked_from_id","linked_to_id","linked_id","linked_date"),array("$artefactId","$linkArtefacts[$i]","$artefactLinkId","$date"));										
				}					
			}
			return $artefactLinkId -> linked_id + 1;
		}	

		public function getReferences($interpreter) {
			$data = $interpreter -> getData() -> data;
			
			$userid = $interpreter->getUser()->user_id;
			$ignore = $data->ignore;
			$projectid = $data->projectid;
			$db = Master::getDBConnectionManager();

			$queryParams = array("userid" =>$userid, "ignore"=>$ignore, "projectid" => $projectid);

			$dbQuery = getQuery('getReferences',$queryParams);
			
			$refs = $db-> multiObjectQuery($dbQuery);

			return $refs;
		}
	}
?>
