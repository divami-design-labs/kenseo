<?php


/**
 * @package Services
 * This class is a Singleton - intended as a container class for all the framework resources.
 * 
 * This class contains all required services/utilities for the framework.
 * All individual services will be initiated and 
 * gathered together in this class.
 * 
 * As this is a singleton pattern, no one can call the constructor or clone for this object.
 * For initialization, the class method init() should be called. Once initialized, any service
 * resources should be accessed using the get<Resource>() methods. example code:
 * 
 * 		// Initialize class
 * 		Master::init();
 * 		...
 * 		...
 * 		// Get the DB Connection resource
 * 		$dbconnection = Master::getDBConnectionManager();
 * 
 * 		// Get the logger resource
 * 		$logger = Master::getLogManager();
 * 
 * 		// Get the Exception manager
 * 		$excMgr = Master::getExceptionManager(); 
 * 
*/


class Master
{
	private static $cacheManager;		//	For Cache Service.
	private static $dbConnectionManager;//  DB Connection Manager.
	private static $logManager;			//	For Logger Service.	
	
	// A Private constructor and clone ensures that no one can construct/clone this Singleton.
	private function __construct( )	{}
	private function __clone() {}
	
	/**
	 * This class method initializes the class and the container.
	 * Each service is in turn initialized and stored here.
	 */
	public static function init()
	{
		// First figure out the instance name for the cache key prefix.
		// We are using the CRC32 hash of the application physical path as the key prefix.
		global $APPLICATION_PATH ;
		global $AppGlobal;
		
		// Create Cache Instance.
		if (CACHE_TYPE)
			self::$cacheManager	= new CacheService(CACHE_TYPE, CacheService::createCacheID($APPLICATION_PATH));
		else
			self::$cacheManager = new CacheService('', '');
		
		self::$logManager =	new LoggerService( $AppGlobal["log"]["path"], $AppGlobal["log"]["mode"], $AppGlobal["log"]["modules"] );
		self::$dbConnectionManager = new DBConnection($AppGlobal["db"]["hostname"], $AppGlobal["db"]["username"], $AppGlobal["db"]["password"], $AppGlobal["db"]["database"], $AppGlobal["db"]["char_set"] );
	}
	
	/**
	 * Access the Cache Manager.
	 *
	 * @return CacheService	an instance of the CacheService
	 */
	public static function getCacheManager()
	{
		return self::$cacheManager;
	}
	
	/**
	 * Access the DB Connection Manager
	 *
	 * @return DBConnection	an instance of the DBConnection (currently uses mysqli).
	 */
	public static function getDBConnectionManager()
	{
		return self::$dbConnectionManager;
	}
	
	/**
	 * Access the Logger Service
	 *
	 * @return LoggerService an instance of the LoggerService
	 */
	public static function getLogManager()
	{
			
		return self::$logManager;
	}
	
	
	/**
	 * Returns the Interpreter array that parses the corresponding command
	 */
	public static function getInterpreter( $interpreterKey = '' )
	{
		global $AppGlobal;

		if(!empty($interpreterKey))
				return $AppGlobal['cmdmap'][$interpreterKey];
		else
				return false;
	}
	
	/**
	 * Returns the Exception message for the given key.
	 */
	public static function getException($key = '')
	{
		global $AppGlobal;

		if(!empty($key))
				return $AppGlobal['error'][$key];
		else
				return '';
	}
			
	/**
	 * Returns the SQL Query string that corresponds to the key
	 */
	public static function getQueryLanguage( $queryLanguageKey = '')
	{
		global $AppGlobal;
		
		if(!empty($queryLanguageKey))
				return $AppGlobal['sql'][$queryLanguageKey];
		else
				return false;
	}
	
}
?>
