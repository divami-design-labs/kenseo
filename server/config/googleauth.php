<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

global $AppGlobal;

$AppGlobal['googleauth']['domain'] = "divami.com";

$AppGlobal['googleauth']['App'] = array();
$AppGlobal['googleauth']['App']['appName'] = "kenseo";
$AppGlobal['googleauth']['App']['clientId'] = "606167827250-6gfcm8a83s3k4q5s3s97csi782mkb0oe.apps.googleusercontent.com";
$AppGlobal['googleauth']['App']['clientSecret'] = "hsqP80yaiuBlvnQrbteBQTPj";
$AppGlobal['googleauth']['App']['redirectURL'] = "http://kenseo.divami.com";
$AppGlobal['googleauth']['App']['uiURL'] = $AppGlobal['global']['domain'] . "ui/index.php";

/* End of file googleauth.php */
?>
