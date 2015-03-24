<?php

/**
 * @package Services
 * Cache pointer class provides exacts to cache method.
 *
 * TBC (Doc) - Document usage.
 * 		Possibly extend to add additional functionality.
 * 		Code review needs to be done.
 */

class ApcCache implements CacheInterface
{
	// This declaration prevents external instantiations. You must use the init class method to get a cache of this type.
	private function __construct() {}
	
	public static function init()
	{
		$c = __CLASS__ ;
		if (extension_loaded('apc'))
			return new $c ;
		else
			return NULL ;
	}
	
	public function store( $key , $value, $ttl = 0 )	
	{
		apc_store( $key, $value, $ttl );
	}

	public function retrieve( $key )	
	{
		return apc_fetch( $key );
	}
	
	public function delete( $key )
	{
		apc_delete( $key );
	}
	
	public function reset()	
	{
		apc_clear_cache();	
	}
	
	public function isActive()
	{
		return true ;
	}
	
	public function info()
	{
		return apc_cache_info("user");
	}
	
	public function advancedInfo()
	{
		return apc_sma_info();
	}

}
?>