<?php

/**
 * This is the starting point for the UI. Handles authentication with Google and launches the UI.
 */

require_once("main.php");


/*
 * We want to do the following:
 * 
 * -1: Handle Logout (clear session variables, destroy session, notify Google to revoke token)
 * 0. Handle redirects. (Here is where creating a new session will be handled)
 * 1. First check the session for a valid SID - We will use (set) KenseoSID to indicate we have an active session (same as Session ID)
 * 2. If we have KenseoSID, check in the DB to see if this SID is still valid. If it is, take the Google auth tokens etc. and the user
 *    name from the DB and verify with Google to ensure this info is still valid. If it is not, Google will redirect anyway and come back
 *    to us via a redirect at which time we will be starting a new session in Step #0.
 * 3. If the DB says we dont have a valid SID (expired), use Google API to authenticate and we will be back in Step #0.
 * 4. When we have a new session, store the SID, Google Tokens & user info in the DB and set an appropriate session timeout (1 week?)
 * 5. Once session is validated, set the username, user's email and user's image as cookies and redirect to the App HTML page.
 */

try
{
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $_SERVER['HTTP_HOST']);
	$url = $_SERVER['HTTP_HOST'];
	Master::getLogManager()->log(DEBUG, MOD_MAIN, $url);
	$urlParts = explode('.', $url);
	$project = "kenseo";
	$authenticator = new Authenticator($project);
	
	if (isset($_REQUEST['logout'])) {
		Master::getLogManager()->log(DEBUG, MOD_MAIN, "Logout");
		$authenticator->invalidateSession();
		
		//@TODO - Figure out where to go from here. - for now, redirect to google login page
		$redirectURL = $AppGlobal['googleauth'][$project]['redirectURL'];
		util_redirectToURL("https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=$redirectURL");
	} else if (isset($_GET['code'])) {
		// We are here from a redirect. And we got the authentication code from Google!
		
		$token = $authenticator->setGoogleAuthCode($_GET['code']);
		
		if ($token) {
			$userId = $authenticator->startNewSession();
			if (!$userId) {
				// This user is not authorized to access Kenseo. Redirect to a descriptive page that has a Google Logout button.
				//@TODO - Figure out where to go from here. - for now, redirect to Google.com
				Master::getLogManager()->log(DEBUG, MOD_MAIN, "Redirecting to authentication URL");
				util_redirectToURL($authenticator->getAuthURL());
			}
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "Redirecting to UI URL");
			util_redirectToURL($AppGlobal['global']['domain'] . 'ui/index.html');
		} else {
			Master::getLogManager()->log(DEBUG, MOD_MAIN, "GAT token unavailable");
			$authenticator->invalidateSession();
			util_redirectToURL($authenticator->getAuthURL());
		}
	} else {
		$userObj = $authenticator->validateSession();
		if (!$userObj) {
			$authenticator->invalidateSession();
			util_redirectToURL($authenticator->getAuthURL());
		}
		Master::getLogManager()->log(DEBUG, MOD_MAIN, "set cookie ");
		setcookie("DivamiKenseoUserID", $userObj->id, 0, "/");
		// everything is fine. redirect to app page.
		// Not needed anymore -- $authenticator->setUserInfoCookies();
		util_redirectToURL($AppGlobal['global']['domain'] . 'ui/index.html');
	}
	
} catch (CustomeException $exception) {
	Master::getLogManager()->logException($exception, MOD_MAIN);
	$result = Result::exceptionResult($exception);
	print_r($result);
}

?>
