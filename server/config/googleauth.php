<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

global $AppGlobal;

$AppGlobal['googleauth']['domain'] = "divami.com";

$AppGlobal['googleauth']['App'] = array();
$AppGlobal['googleauth']['App']['appName'] = "Kenseo";
// Server
// $AppGlobal['googleauth']['App']['clientId'] = "606167827250-6gfcm8a83s3k4q5s3s97csi782mkb0oe.apps.googleusercontent.com";
// $AppGlobal['googleauth']['App']['clientSecret'] = "hsqP80yaiuBlvnQrbteBQTPj";

// Localhost
$AppGlobal['googleauth']['App']['clientId'] = "1019561066915-thkpds88ll3e8b7aqb3lurlp0sn6ik89.apps.googleusercontent.com";
$AppGlobal['googleauth']['App']['clientSecret'] = "lD7UfQ8Avf9ce-3COpFEPjT_";
// $AppGlobal['googleauth']['App']['redirectURL'] = "http://kenseo.divami.com";
$AppGlobal['googleauth']['App']['redirectURL'] = "http://localhost/kenseo/server";
$AppGlobal['googleauth']['App']['uiURL'] = $AppGlobal['global']['domain'] . "ui/index.php";

/* End of file googleauth.php */
?>
