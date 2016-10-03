<?php
    class Search{
        public function fetchResults($interpreter) {
    		$data = $interpreter->getData();

			Master::getLogManager()->log(DEBUG, MOD_DB, "STK");
			Master::getLogManager()->log(DEBUG, MOD_DB, $data);

            $searchKey = $data->data->searchKey;
			$searchString = $searchKey . "%";
			/* $searchString = "%vest%"; */
			
			$db = Master::getDBConnectionManager();

            // @TODO: Consider whether the user has access to that information or not
			$resultObj = $db->multiObjectQuery(getQuery('searchResults',array('query'=>$searchString)));

            // @TODO: remove the below unused queries from queries.php. (make sure it is not being used somewhere else)

			// $userQueryDetails = getQuery('matchUsers',array('string'=>$searchString));
			// /* $artefactQueryDetails = getQuery('matchArtefacts',array('string'=>$searchString)); */
			// $tagQueryDetails = getQuery('matchTags',array('string'=>$searchString));
			// /* $projectQueryDetails = getQuery('matchProjects',array('string'=>$searchString)); */
			// $projectQueryDetails = getQuery('matchProjects',array('string'=>$searchString));
			
			// $userResultObj = $db->multiObjectQuery($userQueryDetails);
			// /* $artefactResultObj = $db->multiObjectQuery($artefactQueryDetails); */
			// /* $projectResultObj = $db->multiObjectQuery($projectQueryDetails); */
			// $tagArtefactResultObj = $db->multiObjectQuery($tagQueryDetails);

			// $projectsResultObj = $db->multiObjectQuery($projectQueryDetails);

            // foreach($userResultObj as $user) {
            //     $user -> type = 'user';
            // }
			
            // foreach($tagArtefactResultObj as $artefact) {
            //     $artefact -> type = 'artefact';
            // }

            // foreach($projectsResultObj as $project) {
            //     $project -> type = 'project';
            // }

            // $resultObj = array_merge($userResultObj, $tagArtefactResultObj,$projectsResultObj);

			/* $resultObj->users = $userResultObj; */
			/* $resultObj->artefacts = $artefactResultObj; */
			/* $resultObj->projects = $projectResultObj; */
			/* $resultObj->tagArtefacts = $tagArtefactResultObj; */

			Master::getLogManager()->log(DEBUG, MOD_DB, "VK");
			Master::getLogManager()->log(DEBUG, MOD_DB, $resultObj);

			return $resultObj;
			
    	}
    }