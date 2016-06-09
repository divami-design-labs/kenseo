<?php

global $AppGlobal;

$AppGlobal['log'] = array();
$AppGlobal['log']['path'] = "/Users/venkateshwar/Documents/Projects/kenseo/error.log" ;
$AppGlobal['log']['mode'] = "ON" ;
$AppGlobal['log']['modules'] = "ALL" ;

$AppGlobal['global']['domain'] = "http://localhost/kenseo/";
$AppGlobal['store']['path'] = "/Applications/venkateshwar/Documents/Projects/kenseo/";
$AppGlobal['gloabl']['storeLocation'] = "media/";

$AppGlobal['cache'] = array();
$AppGlobal['cache']['type'] = "apc";
$AppGlobal['cache']['enable'] = "TRUE";
$AppGlobal['cache']['live'] = "0";
?>