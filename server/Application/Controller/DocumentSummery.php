<?php
    class DocumentSummary {
    	public function getDocumentSummary($interpreter) {
    		
    	}
		
		public function getDocumentVersions($interpreter) {
			$data = $interpreter->getData()->data;
			$user = $interpreter->getUser();
			
			$db = Master::getDBConnectionManager();
			$queryParams = array('artId' => $data->artefact_id);
			
			$dbQuery = getQuery('getDocumentVersions',$queryParams);
			
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}
		public function getDocumentSharedDetails($interpreter) {
			$data = $interpreter->getData()->data;
			$user = $interpreter->getUser();
			
			$db = Master::getDBConnectionManager();
			$queryParams = array('artId' => $data->artefact_id);
			
			$dbQuery = getQuery('getDocumentSharedDetails',$queryParams);
			
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
			
		}
		public function getDocumentReferences($interpreter) {
			$data = $interpreter->getData()->data;
			$user = $interpreter->getUser();
			
			$db = Master::getDBConnectionManager();
			$queryParams = array('artId' => $data->artefact_id);
			
			$dbQuery = getQuery('getDocumentReferences',$queryParams);
			
			$resultObj = $db->multiObjectQuery($dbQuery);
			return $resultObj;
		}
		public function getDocumentLinks($interpreter) {
			$data = $interpreter->getData()->data;
			$user = $interpreter->getUser();
			
			$db = Master::getDBConnectionManager();
			$queryParams = array('artId' => $data->artefact_id);
			
			$dbQuery = getQuery('getProjectActivity',$queryParams);
			
			$resultObj = $db->multiObjectQuery($dbQuery);
		}
    }
?>