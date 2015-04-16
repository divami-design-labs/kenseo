<?php 
	class Artefacts {
		public function getMyRecentArtefacts($interpreter) {
			$data = $interpreter->getData()->data;
			$userid = $data->userid;
			$count = $data->count;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = array('userid' => $userid );
			$dbQuery = getQuery('getMyRecentArtefacts',$queryParams);
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}
		public function addArtefactVersion($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $data->userId;
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
			$db->updateTable (TABLE_ARTEFACTS,array("state"),array('A'), "artefact_id = " . $artId);
			
			return true;
		}
	}
?>
