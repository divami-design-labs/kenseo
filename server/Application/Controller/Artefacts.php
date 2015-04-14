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
			$latestVersion = $db->multiObjectQuery($dbQuery)->verId;
			 
			//update the latest artefact version number with the new one and change the artefact id
			$db->updateTable(TABLE_ARTEFACTS_VERSIONS,array("artefact_ver_id","artefact_id"),array($latestVersion+1,$previousArtefactid),"artefact_id = " . $latestArtefactid);
			
			//update the latest version number of the previous artefact
			$db->updateTable(TABLE_ARTEFACTS, array("artefact_ver_id","artefact_id"),array($latestVersion+1,$previousArtefactid),"artefact_id = " . $latestArtefactid);
			
			//now delete the latest artefact from the table
			$db->deleteTable(TABLE_ARTEFACTS,"artefact_id = ". $latestArtefactid);
			
		}
	}
?>
