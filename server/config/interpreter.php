<?php

//Here we will map API names to the local class and functions

//Here we need to define the both url based api and command map as a group

global $AppGlobal;

$AppGlobal['cmdmap'] = array();
$AppGlobal['urlmap'] = array();

$AppGlobal['cmdmap']['getCustomers'] = array ("class" => "Customers", "method" => "getCustomers");
$AppGlobal['urlmap']['/getCustomers'] = array ('command' => 'getCustomers', 'type' => 'POST');

$AppGlobal['cmdmap']['getMyProjectsList'] = array ("class" => "Projects", "method" => "getMyProjectsList");
$AppGlobal['urlmap']['/getMyProjectsList'] = array ('command' => 'getMyProjectsList', 'type' => 'GET');

$AppGlobal['cmdmap']['getMyRecentArtefacts'] = array ("class" => "Artefacts", "method" => "getMyRecentArtefacts");
$AppGlobal['urlmap']['/getMyRecentArtefacts'] = array ('command' => 'getMyRecentArtefacts', 'type' => 'GET');

$AppGlobal['cmdmap']['getProjectArtefacts'] = array ("class" => "Projects", "method" => "getProjectArtefacts");
$AppGlobal['urlmap']['/getProjectArtefacts'] = array ('command' => 'getProjectArtefacts', 'type' => 'GET');
?>
