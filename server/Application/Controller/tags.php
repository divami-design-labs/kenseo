<?php 

class  Tags {
	public function add_tags($tagsList, $artId, $auto_generated) {
		$db = Master::getDBConnectionManager();
		foreach($tagsList as $key=>$tagName) {
			$tagDetails = getQuery('getTagsName',array('tagName'=>$tagName));
			$tagObj = $db->singleObjectQuery($tagDetails);
			if($tagObj) {
				$tagId = $tagObj->id;
			} else {
				$tagColumnNames = array("tag_name");
				$tagRowValues = array($tagName);
				$tagId = $db->insertSingleRowAndReturnId(TABLE_TAGS, $tagColumnNames, $tagRowValues);
			}
			$tagColumnNames = array("tag_id", "artefact_id");
			$tagRowValues = array($tagId, $artId);
			$db->insertSingleRow(TABLE_ARTEFACT_TAGS_MAP, $tagColumnNames, $tagRowValues);
		}
	}
	public function remove_tags($tagsList, $artId) {
		$db = Master::getDBConnectionManager();
		foreach($tagsList as $key=>$tagName) {

			Master::getLogManager()->log(DEBUG, MOD_MAIN, "heregoestagname");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $tagName);
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $tagsList);
			$tagDetails = getQuery('deleteWithArtIdTagIdTagName',array('tagName'=>$tagName, 'artId'=>$artId));
			$tagObj = $db->singleObjectQuery($tagDetails);
		}
	}
}

?>