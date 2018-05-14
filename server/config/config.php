<?php

global $AppGlobal;

$AppGlobal['log'] = array();

// Server
// $AppGlobal['log']['path'] = "/var/tmp/kenseo.log" ;

// Local
$AppGlobal['log']['path'] = "C:/xampp/htdocs/kenseo/error.log" ;	
$AppGlobal['log']['mode'] = "ON" ;
$AppGlobal['log']['modules'] = "ALL" ;
// $AppGlobal['global']['domain'] = "https://kenseo.divami.com/";

$AppGlobal['global']['domain'] = "http://localhost/kenseo/";

$AppGlobal['gloabl']['storeLocation'] = "media/";

$AppGlobal['cache'] = array();
$AppGlobal['cache']['type'] = "apc";
$AppGlobal['cache']['enable'] = "TRUE";
$AppGlobal['cache']['live'] = "0";
?>