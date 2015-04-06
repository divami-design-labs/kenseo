<?php

global $AppGlobal;

$AppGlobal['log'] = array();
$AppGlobal['log']['path'] = "D://tmp/kenseo.log" ;
$AppGlobal['log']['mode'] = "ON" ;
$AppGlobal['log']['modules'] = "ALL" ;

$AppGlobal['global']['domain'] = "http://localhost/kenseo/";

$AppGlobal['cache'] = array();
$AppGlobal['cache']['type'] = "apc";
$AppGlobal['cache']['enable'] = "TRUE";
$AppGlobal['cache']['live'] = "0";
?>