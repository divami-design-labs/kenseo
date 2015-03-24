<?php

global $AppGlobal;

$AppGlobal['log'] = array();
$AppGlobal['log']['path'] = "E://tmp/kenseo.log" ;
$AppGlobal['log']['mode'] = "ON" ;
$AppGlobal['log']['modules'] = "ALL" ;

$AppGlobal['cache'] = array();
$AppGlobal['cache']['type'] = "apc";
$AppGlobal['cache']['enable'] = "TRUE";
$AppGlobal['cache']['live'] = "0";
?>