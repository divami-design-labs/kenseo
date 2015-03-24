<?php

/**
 * @package Services
 * Cache pointer class provides exacts to cache method.
 *
 * TBC (Doc) - Document usage.
 * 		Possibly extend to add additional functionality.
 * 		Code review needs to be done.
 */

class SessionMemoryCache implements CacheInterface
{
	private static $cacheObj = NULL ;
	private static $CacheContainer ;
	
	// This declaration prevents external instantiations. You must use the init class method to get a cache of this type.
	private function __construct() {}
	
	public static function init()
	{
		/**
		 * We implement the cache as just an assocative array, keyed by the key passed in.
		 */
		self::$CacheContainer = array();

		if (!$cacheObj)
		{
			$c = __CLASS__ ;
			$cacheObj = new $c ;
		}
		return $cacheObj ;
	}
	
	
	public function store( $key , $value, $ttl = 0 )	
	{
		self::$CacheContainer[$key] = $value ;
	}

	public function retrieve( $key )	
	{
		return self::$CacheContainer[$key] ;
	}
	
	public function delete( $key )
	{
		self::$CacheContainer[$key] = FALSE ;
		unset(self::$CacheContainer[$key]);
	}
	
	public function reset()	
	{
		unset(self::$CacheContainer) ;
		self::$CacheContainer = array();
	}
	
	public function isActive()
	{
		return true ;
	}
	
	public function info()
	{
		return count(self::$CacheContainer);
	}
	
	public function advancedInfo()
	{
		return array_keys(self::$CacheContainer);
	}

}
?>