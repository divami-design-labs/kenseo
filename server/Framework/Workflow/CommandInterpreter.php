<?php

class CommandInterpreter
{

	private $command = '';
	private $data ;
	private $auth ;
	private $client;
	private $user = FALSE;

	public function __construct($request)
	{
		// Set default timezone to GMT
		date_default_timezone_set('UTC');

		$reqObj = $request;

		$this->command = $reqObj->command;
		$this->data = ($reqObj->data) ? $reqObj->data : new Object();
		$this->auth = $reqObj->auth;
		$this->client = ($reqObj->client) ? $reqObj->client : new Object();

		$result = Result::instance();
		$result->setClient($this->client);
		$result->setCommand($this->command);
	}

	/**
	 * This is the entry point and the main pathway of the Workflow.
	 */
	public function execute()
	{
		try {
			if ($this->command != "signout") {
				// Do your authentication stuff here.
				$this->user = appUtil_authenticate($this->client, $this->data);

				if ($this->user === false) {
					$exc = new CustomException('EXC_AUTH_FAILURE', 1);
					return Result::exceptionResult($exc);
				}

				// Also Set the session ID.
				$result = Result::instance();
				$result->setClient($this->client);
			} else {
				appUtil_logout($this->client, $this->data);
			}
		} catch (CustomException $exception) {
			Master::getLogManager()->logException($exception, MOD_CMDINT);
			return Result::interpreterExceptionResult($exception);
		}


		try
		{
			$comp = Master::getInterpreter($this->command);
			$controllerClass = $comp["class"];
			$controllerMethod = $comp["method"];

			if ($comp == FALSE)
				throw new CustomException('EXC_RESPONDER_NOT_FOUND', $this->command);

			$controllerObject = $this->loadNValidateClassMethod($controllerClass, $controllerMethod);
		}
		catch (CustomException $exception)
		{
			Master::getLogManager()->logException($exception, MOD_CMDINT);
			return Result::interpreterExceptionResult($exception);
		}

		$result = Result::instance();
		$result->setParams($this->data->data);
		$this->data = $controllerObject->$controllerMethod($this);

		$result->setStatus(SUCCESS);
		$result->setData($this->data);
		return $result;
	}

	public function getData()
	{
		return $this->data;
	}

	public function getClient()
	{
		return $this->client;
	}

	public function getUser()
	{
		return $this->user;
	}

	public function getCommand()
	{
		return $this->command;
	}

	private function loadNValidateClassMethod($controllerClass, $controllerMethod)
	{
		global $APPLICATION_PATH;
		global $CONTROLLER_PATH;

		$controllerFile = $controllerClass . PHP_EXT;
		//	Find controller PHP file.
		$controllerFilePath = $APPLICATION_PATH . "/" . $CONTROLLER_PATH . "/" . $controllerFile ;

		if(!file_exists($controllerFilePath))
		{
			throw new CustomException('EXC_RESPONDER_FILE_NOT_FOUND', $controllerFilePath, $this->command);
		}

		require_once($controllerFilePath);		//	Include controller file.
		$controllerObject =	new $controllerClass();		//	Build controller object.

		if (!is_object($controllerObject)) {
			throw new CustomException('EXC_RESPONDER_CLASS_NOT_FOUND', $controllerClass, $this->command);
		}

		if (!method_exists($controllerObject, $controllerMethod))
			throw new CustomException('EXC_RESPONDER_METHOD_NOT_FOUND', $controllerClass, $controllerMethod, $this->command);

		return $controllerObject;
	}
}
?>