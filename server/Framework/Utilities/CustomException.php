<?php

/**
 * @package Services
 * CustomException class provides exception handling.
 *
 * TBC (Doc) - Document usage.
 * 		Possibly extend to add additional functionality.
 */
class CustomException extends Exception 
{
	private $messageString;
	private $messageCode;
	private $uniqueId;
	private $messageArgs ;
	private $parentObject = NULL;
	
	
	/**
	 * Generates a unique exception ID based on current time stamp.
	 * @return EXCID
	 *
	 */
	public static function getUniqueExceptionID()
	{
		$curTimeStamp = time();
		return (((string)$curTimeStamp) . ((string)rand(0, 1000))) ;
	}
	
	
	/**
	 * Initializes a CustomException object from a given Exception instance.
	 * Used to turn an external exception into a CustomException for ease of reporting.
	 *
	 * @param Exception $exception
	 */
	public static function initFromException($exception)
	{
		$message = $exception->getMessage();
		$code = $exception->getCode();
		$rException = new CustomException($message, $code);
		$rException->parentObject = $exception ;
		return $rException ;
	}
	
	public function __construct($message, $arg1 = '', $arg2 = '', $arg3 = '', $arg4 = '', $arg5 = '')
	{
		$this->uniqueId = self::getUniqueExceptionID() ;
		$this->parentObject = NULL ;
		
		$this->messageString = Master::getException($message);
		if (!$this->messageString) {
			$this->messageString = $message;
			$this->messageCode = $arg1;
		} else {
			$this->messageCode = $message;
		}
		
		$messageArgs = array($arg1, $arg2, $arg3, $arg4, $arg5);
		foreach ($messageArgs as $arg)
		{
			if (is_array($arg))
			{
				// That means there are no more arguments after this array of arguments.
				$this->messageArgs = array_merge($this->messageArgs, $arg);
				break ;
			}
			else
			{
				$this->messageArgs[] = $arg ;
			}
		}
		
		$this->replacePlaceholdersInMessage();
		
		// The messageString and the msgCode will be stored in the Exception object itself as the
		// getMessage() and getCode() respectively.
		parent::__construct($this->messageString, 0);
	}
	
	public function getExceptionCode()
	{
		return $this->messageCode;
	}
	
	
	/**
	 * This method fills in the placeholders in the error message with the appropriate arguments.
	 * The placeholders are of the form %1%, %2% etc. with %1% to be replaced with the first argument and so on.
	 *
	 */
	private function replacePlaceholdersInMessage()
	{
		if (($count = preg_match_all("/%(\d+)%/", $this->messageString, $matches)) == FALSE)
		{
			return ;
		}
		
		foreach ($matches[1] as $match)
		{
			// This is the subpattern in $matchArray[1] which has the arg index.
			$num = trim($match);
			$patterns[] = "/%$num%/" ;
			$replacements[] = $this->messageArgs[$num];
		}
		
		$this->messageString = preg_replace($patterns, $replacements, $this->messageString);
	}
	
	/**
	 * getExceptionID will return the Unique ID of this exception.
	 *
	 * @return summary message.
	 */
	public function getExceptionID()
	{
		return $this->uniqueId;
	}


	/**
	 * Returns the arguments for the exception message.
	 *
	 * @return array of Args.
	 */
	public function getMessageArgs()
	{
		return $this->messageArgs ;
	}
	
	
	/**
	 * This is to get around the problem of not being able to overload
	 * the getTraceAsString function since it is final. Used to print the stack trace.
	 *
	 */
	public function getStackTraceString()
	{
		return ($this->parentObject) ? $this->parentObject->getTraceAsString() : parent::getTraceAsString();
	}
}
?>