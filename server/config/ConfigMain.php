<?php

/**
 * This file contains all the global (application-specific) variables that are used in the
 * project. We should try to minimize the number of globals, but sometimes, for efficiency,
 * we may choose to use globals. All such globals should be declared here.
 * 
 * Please note that this file does not track any of the super globals.
 * 
 * We strongly recommend the following style of usage of these variables: $_GLOBALS['<global-var-name>'] = 'xyz';
 * rather than:		global $<global-var-name> ;  $<global-var-name> = 'xyz';
 */

/**
 * The $CallerID global is used to check security perms of who is
 * making the request. Typically these variables are *only* set during login authentication
 * or session verification after the session has been authenticated. They are set in LoginController.php.
 */
global $CallerID ;


/**
 * This global is set in main.php to figure out dynamically what the application path is.
 * This is used primarily for directory structure management, especially when things are
 * invoked from the shell (workflow purposes), rather than from the client.
 */
global $APPLICATION_PATH ;

global $CONTROLLER_PATH;

$CONTROLLER_PATH = "Application/Controller" ;

global $AppGlobal;

$AppGlobal = array();


require_once("config/dbSchema.php");			// Include Constants for database table names.
require_once("config/config.php");
require_once("config/database.php");
require_once("config/googleauth.php");
require_once("config/errormessages.php");
require_once("config/interpreter.php");
require_once("config/queries.php");


?>