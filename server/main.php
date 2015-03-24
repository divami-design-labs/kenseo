<?php 

/**
 * This defines which type of cache needs to be instantiated. For now, we are only relying
 * on APC cache. When the application/framework is instantiated from a batch script, since
 * APC is useless, we will try to use an in-memory temp cache. This constant needs to be
 * defined as "temp" at the beginning of such scripts.
 *
 */
define("CACHE_TYPE", "local");

global $APPLICATION_PATH;
$APPLICATION_PATH = dirname(__FILE__);

define('BASEPATH', $APPLICATION_PATH.'/');
define('PHP_EXT', '.php');

require_once("config/ConfigMain.php");
require_once("Framework/FrameworkMain.php");
require_once("Application/AppMain.php");

try
{
	// Initialize Framework.
	Master::init();
}
catch (CustomException $exception)
{
	LoggerService::logFailsafeException($exception);
	$result = Result::frameworkExceptionResult($exception);
	echo $result->toJSON();
}

?>