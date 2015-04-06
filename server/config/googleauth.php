<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

global $AppGlobal;

$AppGlobal['googleauth']['domain'] = "divami.com";

$AppGlobal['googleauth']['kenseo'] = array();
$AppGlobal['googleauth']['kenseo']['appName'] = "Gapp";
$AppGlobal['googleauth']['kenseo']['clientId'] = "812255691385-5vb8r97m642bpam478ns7k6u9sahac68.apps.googleusercontent.com";
$AppGlobal['googleauth']['kenseo']['clientSecret'] = "dXGEK8SXoqwW2pIOJJSrbrX0";
$AppGlobal['googleauth']['kenseo']['redirectURL'] = $AppGlobal['global']['domain'] . "server/index.php";
$AppGlobal['googleauth']['kenseo']['uiURL'] = $AppGlobal['global']['domain'] . "ui/index.html";

/* End of file googleauth.php */
?>
