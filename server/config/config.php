<?php

global $AppGlobal;

$AppGlobal['log'] = array();
$AppGlobal['log']['path'] = "E://tmp/kenseo.log" ;
$AppGlobal['log']['mode'] = "ON" ;
$AppGlobal['log']['modules'] = "ALL" ;

$AppGlobal['global']['domain'] = "http://localhost:8088/git/kenseo/";
$AppGlobal['store']['path'] = "E://tmp/";

$AppGlobal['cache'] = array();
$AppGlobal['cache']['type'] = "apc";
$AppGlobal['cache']['enable'] = "TRUE";
$AppGlobal['cache']['live'] = "0";
?>