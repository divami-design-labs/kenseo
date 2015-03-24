<?php 


/**
 * This is the main interaction file for the UI. The requests are received by this file and passed on to the Framework.
 */

//setcookie("CFCTEST", "Santosh", time()+3600);

require_once("main.php");

try
{
	Master::getLogManager()->log(DEBUG, MOD_MAIN, "~~~~~~~~~~~~~~In UPLOAD~~~~~~~~~~~~~~~~");
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $_REQUEST);
	
	$req = $_REQUEST['request'];
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $req);
	
	$cmd = new CommandInterpreter($req);
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
