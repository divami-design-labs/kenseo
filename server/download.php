<?php 


/**
 * This is the main interaction file for the UI. The requests are received by this file and passed on to the Framework.
 */

require_once("main.php");

try
{
	Master::getLogManager()->log(DEBUG, MOD_MAIN, "~~~~~~~~~~~~~~In DOWNLOAD~~~~~~~~~~~~~~~~");
	$req = $HTTP_RAW_POST_DATA? $HTTP_RAW_POST_DATA: $_GET;

	$req2 = new stdClass();

	foreach($req as $key => $value){
		$req2->{$key} = $value;
	}
	$req2->data = $req2;
	Master::getLogManager()->log(DEBUG, MOD_MAIN, "req2");
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $req2);
	// $req2->command = $req['command'];
	// $req2->data = $req;

	$cmd = new CommandInterpreter($req2);
	$result = $cmd->execute();

	$reflector = new ReflectionObject($result);
	$nodes = $reflector->getProperty('data');
	$nodes->setAccessible(true);
	$data = $nodes->getValue($result);
	// $data = $result->data;
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.$data->title );
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    header('Content-Length: ' . $data->size);
    flush();
    echo $data->content;
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
