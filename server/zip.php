<?php 


/**
 * This is the main interaction file for the UI. The requests are received by this file and passed on to the Framework.
 */

require_once("main.php");

try
{
	Master::getLogManager()->log(DEBUG, MOD_MAIN, "~~~~~~~~~~~~~~In ZIP~~~~~~~~~~~~~~~~");
	$req = $HTTP_RAW_POST_DATA? $HTTP_RAW_POST_DATA: $_GET;

	$req2 = new stdClass();

	foreach($req as $key => $value){
		$req2->{$key} = $value;
	}
	$req2->data = $req2;
	Master::getLogManager()->log(DEBUG, MOD_MAIN, "req2");
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $req2);
	// retrieve data from downloadProject command
	$cmd = new CommandInterpreter($req2);
	$result = $cmd->execute();
	$reflector = new ReflectionObject($result);
	$nodes = $reflector->getProperty('data');
	$nodes->setAccessible(true);
	$data = $nodes->getValue($result);
	//fetching all the file names, paths to zip
	$filenames = array();
	foreach ($data as $file) {
		$document_path = $file->document_path;
		$content = file_get_contents($document_path);
		// creating a temporary directory to store the zip file path
		$temp_file = sys_get_temp_dir() . "\\" . $file->artefact_title;

		file_put_contents($temp_file , $content);

		array_push($filenames, $temp_file);
	}
	// zip all the files
	$zipname = $data[0]->project_name.".zip";
	$zip = new ZipArchive;
	$tmp_file = tempnam('.','');
	$zip->open($tmp_file, ZipArchive::CREATE);

	foreach ($filenames as $key => $filex) {
		$download_file = file_get_contents($filex);
		$zip->addFromString(basename($filex),$download_file);
	}
	$zip->close();
	//download the zip file
    header('Content-Type: application/zip');
	header('Content-disposition: attachment; filename='.$zipname);
	header('Content-Length: ' . filesize($tmp_file));
	header("Pragma: no-cache"); 
	header("Expires: 0");
	readfile($tmp_file);
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
