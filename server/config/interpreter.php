<?php

//Here we will map API names to the local class and functions

//Here we need to define the both url based api and command map as a group

global $AppGlobal;

$AppGlobal['cmdmap'] = array();
$AppGlobal['urlmap'] = array();

$AppGlobal['cmdmap']['getArtefacts'] = array ("class" => "Artefacts", "method" => "getArtefacts");
$AppGlobal['urlmap']['/getArtefacts'] = array ('command' => 'getArtefacts', 'type' => 'GET');

$AppGlobal['cmdmap']['getProjects'] = array ("class" => "Projects", "method" => "getProjects");
$AppGlobal['urlmap']['/getProjects'] = array ('command' => 'getProjects', 'type' => 'GET');

$AppGlobal['cmdmap']['getPeople'] = array ("class" => "People", "method" => "getPeople");
$AppGlobal['urlmap']['/getPeople'] = array ('command' => 'getPeople', 'type' => 'GET');

$AppGlobal['cmdmap']['getNotifications'] = array ("class" => "Notifications", "method" => "getNotifications");
$AppGlobal['urlmap']['/getNotifications'] = array ('command' => 'getNotifications', 'type' => 'GET');

$AppGlobal['cmdmap']['search'] = array ("class" => "Common", "method" => "searchAll");
$AppGlobal['urlmap']['/search'] = array ('command' => 'search', 'type' => 'GET');

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

$AppGlobal['cmdmap']['getTeamMembersList'] = array ("class" => "People", "method" => "getTeamMembersList");
$AppGlobal['urlmap']['/getTeamMembersList'] = array ('command' => 'getTeamMembersList', 'type' => 'GET');

$AppGlobal['cmdmap']['getTagsList'] = array ("class" => "Common", "method" => "getTagsList");
$AppGlobal['urlmap']['/getTagsList'] = array ('command' => 'getTagsList', 'type' => 'GET');

$AppGlobal['cmdmap']['addVersion'] = array ("class" => "Artefacts", "method" => "addVersion");
$AppGlobal['urlmap']['/addVersion'] = array ('command' => 'addVersion', 'type' => 'GET');

$AppGlobal['cmdmap']['replaceArtefact'] = array ("class" => "Artefacts", "method" => "replaceArtefact");
$AppGlobal['urlmap']['/replaceArtefact'] = array ('command' => 'replaceArtefact', 'type' => 'GET');

$AppGlobal['cmdmap']['getReferences'] = array ("class" => "Artefacts", "method" => "getReferences");
$AppGlobal['urlmap']['/getReferences'] = array ('command' => 'getReferences', 'type' => 'GET');

$AppGlobal['cmdmap']['addArtefact'] = array ("class" => "Artefacts", "method" => "addArtefact");
$AppGlobal['urlmap']['/addArtefact'] = array ('command' => 'addArtefact', 'type' => 'GET');

$AppGlobal['cmdmap']['getArtefactsLink'] = array ("class" => "Artefacts", "method" => "getArtefactsLink");
$AppGlobal['urlmap']['/getArtefactsLink'] = array ('command' => 'getArtefactsLink', 'type' => 'GET');

$AppGlobal['cmdmap']['archiveArtefact'] = array ("class" => "Artefacts", "method" => "archiveArtefact");
$AppGlobal['urlmap']['/archiveArtefact'] = array ('command' => 'archiveArtefact', 'type' => 'GET');

$AppGlobal['cmdmap']['deleteArtefact'] = array ("class" => "Artefacts", "method" => "deleteArtefact");
$AppGlobal['urlmap']['/deleteArtefact'] = array ('command' => 'deleteArtefact', 'type' => 'GET');

$AppGlobal['cmdmap']['deleteProject'] = array ("class" => "Projects", "method" => "deleteProject");
$AppGlobal['urlmap']['/deleteProject'] = array ('command' => 'deleteProject', 'type' => 'GET');

$AppGlobal['cmdmap']['archiveProject'] = array ("class" => "Projects", "method" => "archiveProject");
$AppGlobal['urlmap']['/archiveProject'] = array ('command' => 'archiveProject', 'type' => 'GET');

$AppGlobal['cmdmap']['unarchiveProject'] = array ("class" => "Projects", "method" => "unarchiveProject");
$AppGlobal['urlmap']['/unarchiveProject'] = array ('command' => 'unarchiveProject', 'type' => 'GET');

$AppGlobal['cmdmap']['addProject'] = array ("class" => "Projects", "method" => "addProject");
$AppGlobal['urlmap']['/addProject'] = array ('command' => 'addProject', 'type' => 'GET');

$AppGlobal['cmdmap']['addPeople'] = array ("class" => "People", "method" => "addPeople");
$AppGlobal['urlmap']['/addPeople'] = array ('command' => 'addPeople', 'type' => 'POST');

$AppGlobal['cmdmap']['removePeople'] = array ("class" => "People", "method" => "removePeople");
$AppGlobal['urlmap']['/removePeople'] = array ('command' => 'removePeople', 'type' => 'GET');

$AppGlobal['cmdmap']['getProjectActivity'] = array ("class" => "Projects", "method" => "getProjectActivity");
$AppGlobal['urlmap']['/getProjectActivity'] = array ('command' => 'getProjectActivity', 'type' => 'GET');

$AppGlobal['cmdmap']['createMeeting'] = array ("class" => "Meetings", "method" => "setMeetingInvitaion");
$AppGlobal['urlmap']['/createMeeting'] = array ('command' => 'createMeeting', 'type' => 'GET');

$AppGlobal['cmdmap']['getArtefactDetails'] = array ("class" => "Artefacts", "method" => "getArtefactDetails");
$AppGlobal['urlmap']['/getArtefactDetails'] = array ('command' => 'getArtefactDetails', 'type' => 'GET');

$AppGlobal['cmdmap']['getVersionDetails'] = array ("class" => "Artefacts", "method" => "getVersionDetails");
$AppGlobal['urlmap']['/getVersionDetails'] = array ('command' => 'getVersionDetails', 'type' => 'GET');

$AppGlobal['cmdmap']['getMeetingNotes'] = array ("class" => "Meetings", "method" => "getMeetingNotes");
$AppGlobal['urlmap']['/getMeetingNotes'] = array ('command' => 'getMeetingNotes', 'type' => 'GET');

$AppGlobal['cmdmap']['writeMeetingNotes'] = array ("class" => "Meetings", "method" => "writeMeetingNotes");
$AppGlobal['urlmap']['/writeMeetingNotes'] = array ('command' => 'writeMeetingNotes', 'type' => 'GET');

$AppGlobal['cmdmap']['getDocumentSummary'] = array ("class" => "Artefacts", "method" => "getDocumentSummary");
$AppGlobal['urlmap']['/getDocumentSummary'] = array ('command' => 'getDocumentSummary', 'type' => 'GET');

// Document Comments Section
$AppGlobal['cmdmap']['createComment'] = array ("class" => "Comments", "method" => "createComment");
$AppGlobal['urlmap']['/createComment'] = array ('command' => 'createComment', 'type' => 'POST');

// Get Artefact Details like Links, Tags, References, People
$AppGlobal['cmdmap']['getArtefactMetaInfo'] = array ("class" => "Artefacts", "method" => "getArtefactMetaInfo");
$AppGlobal['urlmap']['/getArtefactMetaInfo'] = array ('command' => 'getArtefactMetaInfo', 'type' => 'GET');


// Mail testing 
$AppGlobal['cmdmap']['sendDummyMail'] = array ("class" => "Email", "method" => "sendDummyMail");
$AppGlobal['urlmap']['/sendDummyMail'] = array ('command' => 'sendDummyMail', 'type' => 'GET');

?>
