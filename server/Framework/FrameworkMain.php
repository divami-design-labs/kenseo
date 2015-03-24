<?php

/**
 * @package Main
 * MAIN FRAMEWORK CONTROLLER PAGE.
 * 
 * This is the main page that includes all framework and application files.
 * This is the primary entry point into the Framework
 * The Framework is initialized here by Master::init() 
 * 
 * PHP Version 5.2.4
 * 
 */

require_once("Utilities/constants.php");			// Include Constants to configure.

require_once("Services/CacheService.php");			//	Include Cache Service.
require_once("Services/LoggerService.php");			//	Include Exception Loggers.
require_once("Services/DBConnection.php");			//	Include DB Service.

require_once("Utilities/Object.php");				//	Include Common Cbject
require_once("Utilities/CustomException.php");	//	Include Exception Handlers.
require_once("Utilities/CustomTimer.php");				//	Include the Timer utility.
require_once("Utilities/generalfunctions.php");		//	Include Framework General methods.
require_once("Utilities/ApcCache.php");
require_once("Utilities/SessionMemoryCache.php");

require_once("Workflow/CommandInterpreter.php");	//	Include Command Interpreter.
require_once("Workflow/Result.php");	//	Include Result Class.

require_once("Services/Master.php");				//	Include Singleton For Framework.

?>