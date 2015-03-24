<?php 


/**
 * This is the main interaction file for the UI. The requests are received by this file and passed on to the Framework.
 */

require_once("main.php");

try
{	
	$req->data = (object) $_GET;
	$req->command = $req->data->command;	
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $req);
	
	$cmd = new CommandInterpreter($req);
	$result = $cmd->execute();
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $result);
	 
	$data = $result->data();
	
	 
	header("Content-Type: ". $data['type']);
	header("Content-Length: ". $data['size']);
	$temp = 'Content-Disposition: inline; filename="'. $data['name'] . '"';


	header($temp);
    echo $data['content'];
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
