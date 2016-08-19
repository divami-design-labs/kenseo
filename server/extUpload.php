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
	Master::getLogManager()->log(DEBUG, MOD_MAIN, "~~~~~~~~~~~~~~Files~~~~~~~~~~~~~~");
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $_FILES);
	
	$req->data = (object) $_REQUEST;
	foreach ($_FILES as $key => $value) {
	    $req->data->$key = $value;
	}
	$req->command = $req->data->command? $req->data->command: $req->data->actionType;
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $req->data);
	
	$cmd = new CommandInterpreter($req);
	$result = $cmd->execute();
	
	if($result){
		$result->success = true;
	}
	
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
