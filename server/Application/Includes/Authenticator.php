<?php

/**
 * Handles authentication with Google
 */

require_once("thirdparty/google-api-php-client/autoload.php");
define("SECONDS_IN_WEEK", 604800);

class Authenticator
{
	private $client = null;
	private $oauth2 = null;
	private $authUrl = FALSE;
	private $kenseoSID = FALSE;
	private $googleAccessToken = FALSE;
	private $userInfo = null;
	
	public function __construct($project) {
		global $AppGlobal;
		
		Master::getLogManager()->log(DEBUG, MOD_MAIN, 'in constructor');
		Master::getLogManager()->log(DEBUG, MOD_MAIN, $project);
		// No matter what, we need to authenticating with Google anyway since this is the start of a new session!
		// So, initialize all the Google auth code first.
		$this->client = new Google_Client();
		$this->client->setApplicationName($AppGlobal['googleauth'][$project]['appName']);
		$this->client->setClientId($AppGlobal['googleauth'][$project]['clientId']);
		$this->client->setClientSecret($AppGlobal['googleauth'][$project]['clientSecret']);
		$this->client->setRedirectUri($AppGlobal['googleauth'][$project]['redirectURL']);
		$this->client->setApprovalPrompt('auto');
		$this->client->setScopes(array('https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/calendar'));

		$this->oauth2 = new Google_Service_OAuth2($this->client);
		
		$this->authUrl = $this->client->createAuthUrl();

		// Just check if we got a cookie with the SID.
		$this->kenseoSID = (isset($_COOKIE['DivamikenseoSID']) ? $_COOKIE['DivamikenseoSID'] : FALSE);
		$this->googleAccessToken = (isset($_COOKIE['DivamiKenseoGAT']) ? $_COOKIE['DivamiKenseoGAT'] : FALSE);
	}
	
	
	public function getSID() {
		return $this->kenseoSID;
	}
	
	public function getAuthURL() {
		return $this->authUrl;
	}

	public function setGoogleAuthCode($code) {
		$this->client->authenticate($code);
		$this->googleAccessToken = $this->client->getAccessToken();
		
		if ($this->googleAccessToken) {
			$this->getUserInfo();
			Master::getLogManager()->log(DEBUG, MOD_MAIN, $this->userInfo);
		}
		
		return $this->googleAccessToken;
	}
	
	public function getUserInfo() {
		$this->userInfo = $this->oauth2->userinfo_v2_me->get();
		$this->userInfo['email'] = filter_var($this->userInfo['email'], FILTER_SANITIZE_EMAIL);
		$this->userInfo['picture'] = filter_var($this->userInfo['picture'], FILTER_VALIDATE_URL);
		$this->userInfo['name'] = filter_var($this->userInfo['name'], FILTER_SANITIZE_STRING);
		
		return $this->userInfo;
	}


	public function invalidateSession() {
		$this->client->revokeToken();
		
		// Update DB to invalidate the session.
		if ($this->kenseoSID) {
			setcookie("DivamiKenseoSID", "", -1, "/");
			setcookie("DivamiKenseoGAT", "", -1, "/");
			Master::getDBConnectionManager()->updateTable(DBSchema::$Table_Session, array("expiry"), array(time()), "sid = '$this->kenseoSID'");
			$this->kenseoSID = FALSE;
			$this->googleAccessToken = FALSE;
		}
	}


	public function startNewSession() {
		// start a new session.
		$this->generateNewSession();
		
		// @TODO - Store all info in DB, set cookies & redirect to UI.
		$userId = $this->validateUserInfo();
		if (!$userId) {
			return FALSE;
		}
		
		// for now, store the access token also in a cookie. @TODO
		$this->storeSessionInfo($userId);
		setcookie("DivamiNestorUserID", $userId, 0, "/");
		return $userId;
	}
	
	public function generateNewSession() {
		session_start();
		session_regenerate_id(TRUE);
		
		$this->kenseoSID = session_id();
		Master::getLogManager()->log(DEBUG, MOD_MAIN, "Generated a new session id: %s", $this->kenseoSID);
	
		return $this->kenseoSID;
	}


	public function storeSessionInfo($userId) {
		// All is well. Save the session in DB.
		$expiry = time() + SECONDS_IN_WEEK;
		$clientId = $_SERVER['REMOTE_ADDR'];
		
	    $db = Master::getDBConnectionManager();
		$result = $db->insertSingleRow(DBSchema::$Table_Session, DBSchema::$Table_Session_Cols, array($this->kenseoSID, $userId, $clientId, $expiry));
		
		if (!$result) {
			throw new CustomException("Failed to save in DB.");
		}
		
		//session will be valid for 7 days.
		setcookie("DivamiKenseoSID", $this->kenseoSID, $expiry, "/");
		setcookie("DivamiKenseoGAT", $this->googleAccessToken, $expiry, "/");
		
		$this->setUserInfoCookies();
	}
	
	
	public function setUserInfoCookies() {
		setcookie("DivamiNestorUserName", $this->userInfo['name'], 0, "/");
		setrawcookie("DivamiNestorUserEmail", $this->userInfo['email'], 0, "/");
		setrawcookie("DivamiNestorUserPicture", $this->userInfo['picture'], 0, "/");
	}


	public function validateUserInfo() {
		global $AppGlobal;
		$emailParts = explode("@", $this->userInfo['email']);
		if ($emailParts[1] != $AppGlobal['googleauth']['domain']) {
			// This is not a user of this domain. Redirect to a page that informs them of this allows them to logout.
			// @TODO - For now, redirect to google.com
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "User (%s) is not part of this domain: %s", $this->userInfo['email'], $AppGlobal['googleauth']['domain']);
			$this->invalidateSession();
			return FALSE;
		}
		
		// Do we know this user?
		$userName = $emailParts[0];
	    $db = Master::getDBConnectionManager();
	    $userId = $db->singleResultQuery(getQuery('getActiveUserId', array('userName' => $userName, 'email' => $this->userInfo['email'])));
		
		if (!$userId) {
			// This user has not been setup in our DB yet. Redirect to a page that informs them of this and allows them to logout of Google.
			// @TODO - For now, redirect to google.com
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "User %s not found: %s", $userName, $userId);
			$this->invalidateSession();
			return FALSE;
		}
		
		return $userId;
	}


	public function validateSession() {
		if (!$this->kenseoSID || !$this->googleAccessToken) {
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "Session Id or Google Access Token missing.");
			return FALSE;
		}
		
		Master::getLogManager()->log(DEBUG, MOD_MAIN, "Have a valid session Id: %s", $this->kenseoSID);
		$now = time();
	    $db = Master::getDBConnectionManager();
	    $userObj = $db->singleObjectQuery(getQuery('validateSID', array('sid' => $this->kenseoSID, 'now' => $now)));
		if (!$userObj) {
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "Session ID: %s seems to have expired or not in DB", $this->kenseoSID);
			return FALSE;
		}
		Master::getLogManager()->log(DEBUG, MOD_MAIN, "Found User: %s", $userObj);
		
		$userObj->sid = $this->kenseoSID;
		return $userObj;

	}
}

?>
