<?php
    class Uploader {
        public function uploadFile($fileInfo, $projectId, $org_id, $artId = "", $masked_artefact_version = null) {
			global $AppGlobal;
			$sourcePath      = $fileInfo['tmp_name'];	// Storing source path of the file in a variable

            $fileName        = $masked_artefact_version? $masked_artefact_version: $fileInfo['name'];

            if($artId){
                $artId       = "/" . $artId;
            }

			$fileExt         = explode('.', $fileInfo['name']);
			$path            = $AppGlobal['gloabl']['storeLocation'] . $org_id ."/". $projectId . $artId;
			if(! is_dir($path)) {
				mkdir($path, 0777, true);
			}

			// Target path where file is to be stored
			$targetPath = $path . "/" . $fileName .".". $fileExt[count($fileExt)-1];
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "targetPath");
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $targetPath);

			move_uploaded_file($sourcePath, $targetPath);

			return $targetPath;
		}
    }
?>
