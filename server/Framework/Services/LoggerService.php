<?php

/**
 * @package Services
 * LoggerService provides error logging functionality.
 * 
 * TBC (Doc) - Document usage.
 *
 */
class LoggerService
{
	private $logFile ;
	private $debugModules ;
	private $debugAllModules ;
	private $logMode ;
	private $remoteServer;
		
	/**
	 * Use this function to log errors that happen outside the initialization.
	 *
	 * @param string $errorstring
	 */
	public static function logFailsafeException($exception)
	{
		$datestr = date("Y/m/d H:i:s") ;
		
		$errorstring = sprintf("%s [EXC] ID:%s(%s) Error Initializing Framework: %s\n", $datestr, 
							$exception->getExceptionID(), $exception->getExceptionCode(), $exception->getMessage());
		error_log($errorstring, 0);
		$errorstring = sprintf("%s [EXC] TRACE:\n%s\n", $datestr, $exception->getStackTraceString());
		error_log($errorstring, 0);
	}


	public function __construct($logFileName = '', $logMode = '', $debugModules = '')
	{
		$this->logFile = $logFileName;						
		$this->logMode = ($logMode == "OFF") ? FALSE : TRUE ;
		if ($debugModules == "ALL")
		{
			$this->debugAllModules = TRUE ;
			$this->debugModules = array() ;
		}
		else
		{
			$this->debugAllModules = FALSE ;
			$mods = explode("," , strtoupper($debugModules) );
			$this->debugModules = util_array_fill_keys($mods, TRUE) ;
		}
		
		$this->remoteServer = (array_key_exists('REMOTE_ADDR', $_SERVER)) ? $_SERVER['REMOTE_ADDR'] : 'command_line';
		$this->log(DEBUG, MOD_LOG, "***************Start App Log******************");
	}
	
	/**
	 * Get all errors in string and write it into a file.
	 *
	 * @param object $objException
	 */
	public function logException($objException, $module = '')
	{
		$errorStr = sprintf("EXCID:%s(%s) %s", $objException->getExceptionID(),
						$objException->getCode(), $objException->getMessage());
		$this->log(EXCEPTION, $module, $errorStr);
		
		$errorStr = sprintf("TRACE:\n%s", $objException->getStackTraceString());
		$this->log(EXCEPTION, $module, $errorStr);
	}
	
	
	/**
	 * This method is added as an alternative to support arguments to the message string with
	 * a different order of parameters. Over time, we hope to migrate all calls to this new format.
	 *
	 * @param string $logType
	 * @param string $moduleName
	 * @param string $errorMessage
	 * @param mixed $optionalArgs	[Optional]
	 */
	public function log($logType, $moduleName, $errorMessage)
	{
		$moduleName = strtoupper($moduleName);
		if ($this->logMode == FALSE || ($logType == DEBUG && ($this->debugAllModules == FALSE) && !array_key_exists($moduleName , $this->debugModules)))
		{
			return ;
		}
		
		$numArgs = func_num_args();
		if ($numArgs == 3)
		{
			$printMessage = (is_object($errorMessage) || is_array($errorMessage))
							? ("Multi-Line Value: " . print_r($errorMessage, TRUE))
							: $errorMessage ;
		}
		else
		{
			// Get the arguments and pop off the first three arguments.
			$args = func_get_args();
			$args = array_slice($args, 3);
			
			foreach ($args as &$arg)
			{
				if (is_array($arg) || is_object($arg))
				{
					$arg = print_r($arg, TRUE);
				}
			}
			
			// The remaining arguments should be passed to vsprintf to get the actual message.
			$printMessage = vsprintf($errorMessage, $args);
		}
		
		$errorString		=	sprintf("%s [%s:%s] IP:%s %s\n", date("Y/m/d H:i:s"),
									$logType, $moduleName, $this->remoteServer, $printMessage);
		$this->logString($errorString);	
	}
	
	
	/**
	 * logString helps to log the exception into a file. 
	 *
	 * @param string $errorString
	 */
	private function logString($errorString)
	{
		error_log($errorString, 3, $this->logFile);
		
		/*
		if (!($fileHandle = fopen( $this->logFile, "a+" )))
		{
			// We cant do much. Just return.
			return ;
		}
		flock(	$fileHandle , LOCK_EX	);	// Lock the file to write exception.
		fwrite( $fileHandle , $errorString );
		flock(	$fileHandle , LOCK_UN	);	// Unlock the file.
		fclose( $fileHandle				);	//	Close the connection.	
		*/	
	}
	
}

?>
