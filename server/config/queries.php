<?php

//here we will write a constraints for sql queries

global $AppGlobal;

$AppGlobal['sql'] = array();

//$AppGlobal['sql']['getDivamiHolidays'] = "SELECT * from ". TABLE_DIVAMI_HOLIDAYS;
$AppGlobal['sql']['validateSID'] = "SELECT employee.user_id, employee.email, auth_session.expiry 
										FROM " . TABLE_AUTH_SESSION ." as auth_session, 
										". TABLE_USERS ." as employee
										WHERE auth_session.sid = @~~sid~~@ AND auth_session.expiry > @~~now~~@
										AND auth_session.user_id = employee.user_id";
$AppGlobal['sql']['getActiveUserId'] = "SELECT user_id 
											FROM ". TABLE_USERS ." 
											WHERE email = @~~email~~@";

$AppGlobal['sql']['getHeader'] = "SELECT * FROM". TABLE_USERS ."WHERE user_id = @~~userid~~@";

$AppGlobal['sql']['getMyProjectsList'] = "SELECT project_id, project_name, last_updated_date, intro_image_url 
											FROM " . TABLE_PROJECTS . " 
											WHERE project_id IN (SELECT proj_id
											FROM " . TABLE_PROJECT_MEMBERS . " 
											WHERE user_id = @~~userid~~@)";	
$AppGlobal['sql']['getMyRecentArtefacts'] = "SELECT projects.project_id, projects.project_name, artefacts.artefact_title, project_activity.activity_id, project_activity.activity_type, project_activity.performed_on_id
											 FROM " . TABLE_PROJECT_ACTIVITY . "
											 JOIN " . TABLE_PROJECTS . " ON project_activity.project_id = projects.project_id
											 JOIN " . TABLE_ARTEFACTS . " ON artefacts.artefact_id = project_activity.performed_on_id
											 WHERE logged_by = @~~userid~~@ AND performed_on =  'A'";
$AppGlobal['sql']['getProjectArtefacts'] = "SELECT artefacts.artefact_id, artefacts.artefact_title, artefacts.latest_version_id, artefacts.state, artefacts.artefact_type, users.name, users.profile_pic_url, users.user_id, artefact_versions.created_date, artefact_versions.document_path, artefact_versions.version_label
											FROM " . TABLE_ARTEFACTS . " 
											JOIN " . TABLE_ARTEFACTS_VERSIONS . " on artefacts.latest_version_id = artefact_versions.artefact_ver_id
											JOIN " . TABLE_USERS . " on users.user_id = artefact_versions.created_by
											WHERE project_id = @~~projectid~~@ ";											 	 
$AppGlobal['sql']['getReviewRequests'] = "select * from " . TABLE_ARTEFACTS . " as artefacts 
											WHERE artefacts.artefact_id in 
											(select versions.artefact_id from ". TABLE_ARTEFACTS_VERSIONS ." as versions 
											WHERE versions.shared = 1 and versions.artefact_ver_id in 
											(select versions.artefact_ver_id from " . TABLE_ARTEFACTS_SHARED_MEMBERS . " as members 
											WHERE members.user_id = @~~userid~~@ or members.shared_by = @~~userid~~@))";		 
$AppGlobal['sql']['getPeopleInProjects'] = "select * from users WHERE user_id in (select user_id from project_members WHERE proj_id in (select proj_id from project_members WHERE user_id = @~~userid~~@))";

$AppGlobal['sql']['getNotifications'] = "SELECT * FROM " . TABLE_NOTIFICATIONS . " WHERE user_id = @~~id~~@";
											
?>
