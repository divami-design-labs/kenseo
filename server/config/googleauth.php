<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

global $AppGlobal;

$AppGlobal['googleauth']['domain'] = "divami.com";

$AppGlobal['googleauth']['kenseo'] = array();
$AppGlobal['googleauth']['kenseo']['appName'] = "kenseo";
$AppGlobal['googleauth']['kenseo']['clientId'] = "606167827250-6gfcm8a83s3k4q5s3s97csi782mkb0oe.apps.googleusercontent.com";
$AppGlobal['googleauth']['kenseo']['clientSecret'] = "hsqP80yaiuBlvnQrbteBQTPj";
$AppGlobal['googleauth']['kenseo']['redirectURL'] = "http://kenseo.divami.com";
$AppGlobal['googleauth']['kenseo']['uiURL'] = $AppGlobal['global']['domain'] . "ui/index.html";

/* End of file googleauth.php */
?>
