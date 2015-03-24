<?php


/**
 * This class provides an execution timer utility. Each instance is intended to track a series of execution times.
 * Interleaving execution sequences and executions across modules should use different Timer instances.
 * The following sequence illustrates how the Timer utility should be used.
 * 
 * 		$timer = new CustomTimer()  // initializes the timer.
 * 		....
 * 		....
 * 		$timer->start() ;		// To start the timer.
 * 		.....
 * 		$timer->mark("DB Retrieval") ; // To mark the end of DB Retrieval.
 * 		.....
 * 		$timer->mark("action A");		// To mark the end of action A.
 * 		.....
 * 		$timer->stop("action B");	// marks the end of action B as well as stops the timer.
 * 		....
 * 		$times = $timer->times();			// returns an assoc array of execution times, keyed by the mark strings.
 * 		....
 * 		$timer->logTimes($logType, $module);	// Logs the execution times to the log with the corresponding log type and module.
 * 
 * 		$timer->reset()				// Resets the timer and gets it ready for another run.
 * 
 * PHP Version 5.2.4
 */

class CustomTimer
{
	private $id ;
	private $execTimes ;
	private $beginTime ;
	
	public function __construct($name = 'Timer')
	{
		$this->id = $name ;
		$this->execTimes = array() ;
		$this->beginTime = microtime(true);
	}
	
	public function reset()
	{
		unset($this->execTimes) ;
		$this->execTimes = array() ;
		$this->beginTime = microtime(true);
	}
	
	public function start()
	{
		$this->beginTime = microtime(true);
		$this->prevTime = $this->beginTime;
		return $this->beginTime;
	}
	
	public function mark($event)
	{
		$this->execTimes[$event] = microtime(true) - (float)($this->beginTime);
		return $this->execTimes[$event];
	}
	
	public function stop($event)
	{
		return $this->mark($event);
	}
	
	public function times()
	{
		return $this->execTimes ;
	}
	
	public function logTimes($logType, $module)
	{
		$logString = $this->logTimesString(FALSE) ;
		Master::getLogManager()->log($logType, $module, $logString);
	}
	
	public function logCumulativeTimes($logType, $module)
	{
		$logString = $this->logTimesString(TRUE) ;
		Master::getLogManager()->log($logType, $module, $logString);
	}
	
	private function logTimesString($cumulative = FALSE)
	{
		$logString = sprintf("Execution Times for %s Timer:\n", $this->id) ;
		$previous = 0 ;
		foreach ($this->execTimes as $event => $runtime)
		{
			$printTime = ($cumulative) ? ($runtime) : ($runtime - $previous) ;
			$logString .= sprintf("%s: %f secs\n", $event, $printTime);
			$previous = $runtime ;
		}
		return $logString ;
	}
}

?>