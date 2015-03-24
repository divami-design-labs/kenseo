<?php


class Result
{
	private static $instanceObj = FALSE;
	
	private $status = FAILURE;
	private $data = '';
	private $client = '';
	private $command = '';
	
	public static function instance()
	{
		if (!(self::$instanceObj)) {
			self::$instanceObj = new Result();
		}
		
		return self::$instanceObj;
	}
	
	private function __construct() 
	{
	}
	
	public static function frameworkExceptionResult(CustomException $exc)
	{
		$result = self::instance();
		$result->status = FAILURE;
		$result->data = new Object();
		$result->data->message = "Unexpected error initializing framework: " . $exc->getMessage();
		$result->data->code = $exc->getExceptionCode();
		
		return $result;
	}

	public static function interpreterExceptionResult(CustomException $exc)
	{
		$result = self::instance();
		$result->status = FAILURE;
		$result->data = new Object();
		$result->data->message = "Unexpected error parsing request: " . $exc->getMessage();
		$result->data->code = $exc->getExceptionCode();
		
		return $result;
	}
	
	public static function exceptionResult(CustomException $exc)
	{
		$result = self::instance();
		$result->status = FAILURE;
		$result->data = new Object();
		$result->data->message = $exc->getMessage();
		$result->data->code = $exc->getExceptionCode();
		
		return $result;
	}
	
	public function setCommand($comm)
	{
		$this->command = $comm;
	}
	
	public function setClient($cli)
	{
		$this->client = $cli;
	}
	
	public function setStatus($stat)
	{
		$this->status = $stat;
	}
	
	public function setData($dat)
	{
		$this->data = $dat;
	}
	
	public function data()
	{
		return $this->data;
	}
	
	public function toJSON()
	{
		$str = '{"status":"' . $this->status . '", "command":"' . $this->command . '", '
				. '"client":' . json_encode($this->client) . ', '
				. '"data":' . json_encode($this->data)
				. '}';
		return $str;
	}
	
}