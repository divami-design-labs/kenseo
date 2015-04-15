<?php

//Here we will map API names to the local class and functions

//Here we need to define the both url based api and command map as a group

global $AppGlobal;

$AppGlobal['cmdmap'] = array();
$AppGlobal['urlmap'] = array();

$AppGlobal['cmdmap']['getHeader'] = array ("class" => "Header", "method" => "getHeader");
$AppGlobal['urlmap']['/getHeader'] = array ('command' => 'getHeader', 'type' => 'GET');

$AppGlobal['cmdmap']['getCustomers'] = array ("class" => "Customers", "method" => "getCustomers");
$AppGlobal['urlmap']['/getCustomers'] = array ('command' => 'getCustomers', 'type' => 'POST');

$AppGlobal['cmdmap']['getMyProjectsList'] = array ("class" => "Projects", "method" => "getMyProjectsList");
$AppGlobal['urlmap']['/getMyProjectsList'] = array ('command' => 'getMyProjectsList', 'type' => 'GET');

$AppGlobal['cmdmap']['getMyRecentArtefacts'] = array ("class" => "Artefacts", "method" => "getMyRecentArtefacts");
$AppGlobal['urlmap']['/getMyRecentArtefacts'] = array ('command' => 'getMyRecentArtefacts', 'type' => 'GET');

$AppGlobal['cmdmap']['getProjectArtefacts'] = array ("class" => "Projects", "method" => "getProjectArtefacts");
$AppGlobal['urlmap']['/getProjectArtefacts'] = array ('command' => 'getProjectArtefacts', 'type' => 'GET');

$AppGlobal['cmdmap']['getReviewRequests'] = array ("class" => "Requests", "method" => "getReviewRequests");
$AppGlobal['urlmap']['/getReviewRequests'] = array ('command' => 'getReviewRequests', 'type' => 'GET');

$AppGlobal['cmdmap']['getProjectsPeople'] = array ("class" => "People", "method" => "getProjectsPeople");
$AppGlobal['urlmap']['/getProjectsPeople'] = array ('command' => 'getProjectsPeople', 'type' => 'GET');

$AppGlobal['cmdmap']['getNotifications'] = array ("class" => "Notifications", "method" => "getNotifications");
$AppGlobal['urlmap']['/getNotifications'] = array ('command' => 'getNotifications', 'type' => 'GET');

$AppGlobal['cmdmap']['search'] = array ("class" => "Common", "method" => "searchAll");
$AppGlobal['urlmap']['/search'] = array ('command' => 'search', 'type' => 'GET');

$AppGlobal['cmdmap']['getTeamMembersList'] = array ("class" => "Projects", "method" => "getTeamMembersList");
$AppGlobal['urlmap']['/getTeamMembersList'] = array ('command' => 'getTeamMembersList', 'type' => 'GET');

$AppGlobal['cmdmap']['getTagsList'] = array ("class" => "Common", "method" => "getTagsList");
$AppGlobal['urlmap']['/getTagsList'] = array ('command' => 'getTagsList', 'type' => 'GET');

$AppGlobal['cmdmap']['addArtefactVersion'] = array ("class" => "Artefacts", "method" => "addArtefactVersion");
$AppGlobal['urlmap']['/addArtefactVersion'] = array ('command' => 'addArtefactVersion', 'type' => 'GET');

$AppGlobal['cmdmap']['test'] = array ("class" => "Common", "method" => "test");
$AppGlobal['urlmap']['/test'] = array ('command' => 'test', 'type' => 'GET');


?>
