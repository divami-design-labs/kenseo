<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

global $AppGlobal;

$AppGlobal['googleauth']['domain'] = "divami.com";

$AppGlobal['googleauth']['App'] = array();
$AppGlobal['googleauth']['App']['appName'] = "Kenseo";
// Server
// $AppGlobal['googleauth']['App']['clientId'] = "606167827250-6gfcm8a83s3k4q5s3s97csi782mkb0oe.apps.googleusercontent.com";
// $AppGlobal['googleauth']['App']['clientSecret'] = "hsqP80yaiuBlvnQrbteBQTPj";

// Localhost
$AppGlobal['googleauth']['App']['clientId'] = "620805159491-maiv301gjres7gdbn7k0e8lgg1lnebm9.apps.googleusercontent.com";
$AppGlobal['googleauth']['App']['clientSecret'] = "Gi4obPHtddRfZ9AjHtL_6ELu";
// $AppGlobal['googleauth']['App']['redirectURL'] = "http://kenseo.divami.com";
$AppGlobal['googleauth']['App']['redirectURL'] = "http://localhost/kenseo/";
$AppGlobal['googleauth']['App']['uiURL'] = $AppGlobal['global']['domain'] . "ui.php";

/* End of file googleauth.php */
?>
