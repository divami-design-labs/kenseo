<?php
/*
 * Created on Feb 8, 2008
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
 

/**
 * This routine fetches the contents of the named file. If the file is cached, the contents
 * are returned from the cache, otherwise the file is retrieved from the file system and the
 * contents are placed in cache.
 *
 * @param string $fileName	The path of the file that is to be retrieved.
 * @return string $fileText	Contents of the file
 */
function appUtil_getCachedFile($fileName)
{
	$cache = Master::getCacheManager();
	$fileKey = CACHEKEY_NAMEDFILES . $fileName ;
	$fileObject = $cache->retrieve($fileKey);
	if (!is_object($fileObject))
	{
		Master::getLogManager()->log(DEBUG, MOD_APPUTIL, "Retrieving file: %s", $fileName);
		if (!is_readable($fileName))
		{
			$retryFileName = Master::getApplicationPath() . "/" . $fileName ;
			if (!is_readable($retryFileName))
			{
				throw new CustomException('EXC_FUN_FILE_NOT_FOUND', $fileName);
			}
			else 
			{
				$fileName = $retryFileName ;
			}
		}
		
		$fileContents = file_get_contents($fileName);

		$fileObject = new stdClass();
		$fileObject->content = $fileContents ;
		$cache->store($fileKey, $fileObject);
	}
		
	return $fileObject->content ;
}


/**
 * This method searches all the pathnames matching with $filter in the $folderPath folder.
 * While returning the files, the absolute path names are replaced with relative names
 *
 * @param string $folderPath
 * @param string $filter
 * @param string $relativePath
 * @return array $path
 */
function appUtil_findFilesWithFilter( $folderPath, $filter, $relativePath = FALSE )
{
	$fileList = glob($folderPath . $filter);
	
	if ($relativePath !== FALSE && trim($relativePath) != "")
	{
		$newList = array();
		foreach($fileList as $path)
		{
			$newList[] = $relativePath . basename($path);
		}
	}
	else
	{
		$newList = $fileList ;
	}
	
	return $newList;
}


/**
 * This function simulates the pathinfo() as of PHP 5.2 which returns  in addition to dirname,
 * basename and extension, a "filename" which is the filename without the extension.
 * when we move to PHP 5.2, this function can be safely removed and replced with pathinfo().
 * In fact, pathinfo() has more functionality in that it can selectively return the required value
 * based on the second parameter, which we dont support.
 * 
 * @param string $fileName
 * @return array
 */
function appUtil_getPathInfo($fileName)
{
	$fileInfo = pathinfo($fileName);
	if (empty($fileInfo["filename"]))
	{
		$fullFile = $fileInfo["basename"];
		$ext = $fileInfo["extension"];
		
		$lastpos = strrpos($fullFile, ".");
		if ($lastpos === FALSE)
		{
			$fileInfo["filename"] = $fileInfo["basename"];
		}
		else
		{
			$fileInfo["filename"] = substr($fileInfo["basename"], 0, $lastpos);
		}
	}
	
	return $fileInfo ;
}


/**
 * This function compares 2 dates and returns whether or not they are equal.
 * The dates are assumed to be in the Y-m-d format. Each component, especially
 * the month and date could be in the "04" or "4" format (with or without leading
 * zeroes).
 *
 * @param string $date1
 * @param string $date2
 */
function appUtil_datesAreEqual($date1, $date2)
{
	$dateArr1 = explode("-", $date1);
	$dateArr2 = explode("-", $date2);

	return ((((int)$dateArr1[0]) == ((int)$dateArr2[0]))
		&& (((int)$dateArr1[1]) == ((int)$dateArr2[1]))
		&& (((int)$dateArr1[2]) == ((int)$dateArr2[2]))) ;
}


/**
 * This function generates a new threadId by inserting a new row into a threads table which has an auto increment field.
 * @return int $threadId
 */
function appUtil_generateThreadId()
{
	$db = Master::getDBConnectionManager();

	// Get a new thread Id.
	$res = $db->insertSingleRow(DBSchema::$Table_EmailThread, array(), array());
	if ($res != 1) {
		throw new CustomException('EXC_INSERT_FAILED', DBSchema::$Table_EmailThread);
	}
	$threadId = $db->autoIncrementId();
	if (!$threadId) {
		throw new CustomException('EXC_INSERT_FAILED', DBSchema::$Table_EmailThread);
	}
	
	return $threadId;
}


/**
 * Authenticates the current user - profileId, clientId & SessionId
 * @param $clientId			ClientID
 * @param $data		SessionID
 * @return Object 	$userObj	returns user information if user is authenticated, FALSE otherwise.
 */
function appUtil_authenticate($clientId, $data)
{
	try {
		$authenticator = new Authenticator();
		
		$userObj = $authenticator->validateSession();
		if (!$userObj) {
			return FALSE;
		}
		
		$clientId->sid = $userObj->sid;
		$clientId->userId = $userObj->user_id;
		$data->userId = $userObj->user_id;
		$userObj->userId = $userObj->user_id;
		
		return $userObj;
	} catch (CustomException $exception) {
		Master::getLogManager()->logException($exception, MOD_MAIN);
		return false;
	}
}

function appUtil_logout($clientId, $data)
{
	try {
		$authenticator = new Authenticator();
		
		$authenticator->invalidateSession();
	} catch (CustomException $exception) {
		Master::getLogManager()->logException($exception, MOD_MAIN);
		return false;
	}
}

function isWeekEnd($time) {
	$week = date('w', $time);
	if($week == 0 || $week == 6) {
		return 1;
	} else {
		return 0;
	}
}
?>