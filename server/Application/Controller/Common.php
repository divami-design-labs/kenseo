<?php
    class Common {
    	public function searchAll($interpreter) {
    		$data = $interpreter->getData();

			Master::getLogManager()->log(DEBUG, MOD_DB, "STK");
			Master::getLogManager()->log(DEBUG, MOD_DB, $data);

            $searchKey = $data -> data -> searchKey;
			$searchString = "%" . $searchKey . "%";
			/* $searchString = "%vest%"; */
			
			$db = Master::getDBConnectionManager();
			 
			$userQueryDetails = getQuery('matchUsers',array('string'=>$searchString));
			/* $artefactQueryDetails = getQuery('matchArtefacts',array('string'=>$searchString)); */
			$tagQueryDetails = getQuery('matchTags',array('string'=>$searchString));
			/* $projectQueryDetails = getQuery('matchProjects',array('string'=>$searchString)); */
			
			$userResultObj = $db->multiObjectQuery($userQueryDetails);
			/* $artefactResultObj = $db->multiObjectQuery($artefactQueryDetails); */
			/* $projectResultObj = $db->multiObjectQuery($projectQueryDetails); */
			$tagArtefactResultObj = $db->multiObjectQuery($tagQueryDetails);

            foreach($userResultObj as $user) {
                $user -> type = 'user';
            }
			
            foreach($tagArtefactResultObj as $artefact) {
                $artefact -> type = 'artefact';
            }
			
            $resultObj = array_merge($userResultObj, $tagArtefactResultObj);

			/* $resultObj->users = $userResultObj; */
			/* $resultObj->artefacts = $artefactResultObj; */
			/* $resultObj->projects = $projectResultObj; */
			/* $resultObj->tagArtefacts = $tagArtefactResultObj; */

			Master::getLogManager()->log(DEBUG, MOD_DB, "VK");
			Master::getLogManager()->log(DEBUG, MOD_DB, $resultObj);

			return $resultObj;
			
    	}
		
		public function getTagsList($interpreter) {
			$data = $interpreter->getData()->data;
			$userId = $interpreter->getUser()->user_id;
			
			$db = Master::getDBConnectionManager();
			
			$queryParams = getQuery('getTagsList',array('userId'=>$userId));
			$resultObj = $db->multiObjectQuery($queryParams);
			
			return $resultObj;
		}
		
    }
?>
