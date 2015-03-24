<?php


/**
 * All constants for the DB schema are defined here.
 * PHP Version 5.2.4
 */

// TABLE Part Constants.
define("TABLEPART_MISC", "misc");
define("TABLEPART_IDGENERATOR", "idgenerator_");


class DBSchema
{
	public static $Table_Session = "auth_session";
	public static $Table_Session_Cols = array("sid", "userid", "clientid", "expiry");
	
	public static $Table_Appuser = "appuser";
	public static $Table_Appuser_Cols = array("profileId", "username", "authtype", "password");
	
	public static $Table_Tasklog = "ts_tasklog";
	public static $Table_Tasklog_Cols = array('taskdate','tasktype','taskid','shortname','projectid','description','hours','createdate','authorid');
	public static $Table_Tasklog_UpdCols = array('taskdate','tasktype','shortname','projectid','description','hours');
	
}


?>
