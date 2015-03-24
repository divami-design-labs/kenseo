<?php

require_once("main.php");

	global $AppGlobal;
	$uriGetParam = isset( $_GET['uri']) ? '/' . $_GET['uri'] : '/' ;
	try {
		$routeObj = $AppGlobal['urlmap'][$uriGetParam];
		if (!$routeObj)
			throw new CustomException('EXC_URL_RESPONDER_NOT_FOUND', $uriGetParam);
		$callType = $routeObj['type'] ;
		$request['command'] = $routeObj['command'] ;
		
		if ( $callType == "GET" ){
			$request['data'] = $_GET ;
		} elseif ( $callType == "POST" ) {
			$request['data'] = $_POST ;
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
