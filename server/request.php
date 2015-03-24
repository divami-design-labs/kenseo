<?php 


/**
 * This is the main interaction file for the UI. The requests are received by this file and passed on to the Framework.
 */

require_once("main.php");

try
{
	$req = $HTTP_RAW_POST_DATA;
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $req);
	$request = json_decode($req);
	
	$cmd = new CommandInterpreter($request);
	$result = $cmd->execute();
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $result);
	
	$resultString = $result->toJSON();
	Master::getLogManager()->log(DEBUG, MOD_MAIN, "Response: $resultString");
	print($resultString);
}
catch (CustomException $exception)
{
	$db = Master::getDBConnectionManager();
	if ($db->inTransaction()) {
		$db->abortTransaction();
	}
	Master::getLogManager()->logException($exception, MOD_MAIN);
	$result = Result::exceptionResult($exception);
	echo $result->toJSON();
}

?>
