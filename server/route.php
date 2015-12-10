<?php

require_once("main.php");

	global $AppGlobal;
	$uriGetParam = isset( $_GET['uri']) ? '/' . $_GET['uri'] : '/';

	try {
		$routeObj = $AppGlobal['urlmap'][$uriGetParam];

		if (!$routeObj)
			throw new CustomException('EXC_URL_RESPONDER_NOT_FOUND', $uriGetParam);
		//$callType = $routeObj['type'];
		$callType = $_SERVER['REQUEST_METHOD'];
		$request['command'] = $routeObj['command'];
		
		if ( $callType == "GET" ) {
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "GET Call..");
			$request['data'] = $_GET ;
		} elseif ( $callType == "POST" ) {
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "POST Call..");
			if($_POST) {
				$postParams = $_POST;
			} else {
				$postParams = json_decode($HTTP_RAW_POST_DATA);
			}
			
			$request['data'] = new stdClass();
			$request['data']->data = $postParams;
		}
	} catch (CustomException $exception) {
		Master::getLogManager()->logException($exception, MOD_CMDINT);
		return Result::interpreterExceptionResult($exception);
	}
    
    $jsonData =   json_encode( $request );
	$request = json_decode( $jsonData ) ;
	
	try {
		Master::getLogManager()->log(DEBUG, MOD_MAIN, $request);
		$cmd = new CommandInterpreter($request);
		$result = $cmd->execute();
		Master::getLogManager()->log(DEBUG, MOD_MAIN, $result);
		$resultString = $result->toJSON();
		Master::getLogManager()->log(DEBUG, MOD_MAIN, "Response: $resultString");
		print($resultString);
	} catch (CustomException $exception) {
		$db = Master::getDBConnectionManager();
		if ($db->inTransaction()) {
			$db->abortTransaction();
		}
		Master::getLogManager()->logException($exception, MOD_MAIN);
		$result = Result::exceptionResult($exception);
		echo $result->toJSON();
	}

?>
