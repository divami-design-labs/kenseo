<?php

/**
 * @package Services
 * Cache Layer provides cache service to store the data.
 *
 * TBC (Doc) - Document usage.
 * 		Possibly extend to add additional functionality.
 * 		Code review needs to be done. 
 */
class CacheService implements CacheInterface
{	
	private $cacheObject = NULL;		//	Store Cache Object.
	private $cacheLiveTime;
	private $cacheID ;
	
	private $cacheNames	=	array("local" => "ApcCache", "remote" => "MEM", "memory" => "SessionMemoryCache");
	
	
	public static function createCacheID($string)
	{
		//return hash("crc32", $string);
		return ("crc32" + $string);
	}
	
	
	/**
	 * Construct The Cache Object.
	 * Param string $CacheName 		Parameter to choose the cache type 
	*/
	public function __construct( $cacheType, $cacheID )	
	{
		$this->cacheID = $cacheID . "_" ;
		$className = $this->cacheNames[$cacheType];
		if ($className)
			$this->cacheObject = call_user_func(array($className, "init"));
		if (!is_object($this->cacheObject) || !$this->cacheObject->isActive())
			$this->cacheObject = NULL ;
	}
	
	/**
	 * Store the data in cache.
	 * Param object $dataObject		dataobject to store.
	 * Param string $key			key for storing data.
	 * Param int $ttl				cache time to live . default is 60 secs. 
	*/
	public function store($key, $data, $ttl = 0)
	{
		$key = $this->cacheID . $key ;
		if ($this->cacheObject)
			$this->cacheObject->store( $key , $data, $ttl );
	}
	
	/**
	 * Retrieve the data from cache.
	 * Param string $key			 key for retrieving the data from cache. 
	*/
	public function retrieve( $key )
	{
		$key = $this->cacheID . $key ;
		if ($this->cacheObject)
			return $this->cacheObject->retrieve( $key );
		else
			return FALSE;
	}
	
	/**
	 * delete the cache
	 *
	 * @param string $key
	 */
	public function delete(  $key )	
	{	
		$key = $this->cacheID . $key ;
		if ($this->cacheObject)
			$this->cacheObject->delete( $key );	
	}
	
	/**
	 * clear the cache management.
	*/
	public function reset()	
	{	
		if ($this->cacheObject)
			$this->cacheObject->reset();	
	}
	
	/**
	 * Retrieve the cache informations.
	 */
	public function info() 
	{ 
		if ($this->cacheObject)
			return $this->cacheObject->info(); 
		else
			return FALSE ;
	}
	
	public function isActive() 
	{ 
		if ($this->cacheObject)
			return $this->cacheObject->isActive();
		else
			return FALSE ;
	}
	
}


interface CacheInterface
{
	public function isActive();
	public function info();
	public function store($key, $value, $ttl = 0);
	public function retrieve($key);
	public function delete($key);
	public function reset();
}

 ?>