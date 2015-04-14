<?php

//here we will write a constraints for sql queries

global $AppGlobal;

$AppGlobal['sql'] = array();

//$AppGlobal['sql']['getDivamiHolidays'] = "SELECT * from ". TABLE_DIVAMI_HOLIDAYS;
$AppGlobal['sql']['validateSID'] = "SELECT employee.user_id, employee.email, auth_session.expiry 
										FROM " . TABLE_AUTH_SESSION ." AS auth_session, 
										". TABLE_USERS ." AS employee
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
											WHERE user_id = @~~userid~~@)
											LIMIT @~~limit~~@";	
$AppGlobal['sql']['getMyRecentArtefacts'] = "SELECT projects.project_id, projects.project_name, artefacts.artefact_title, project_activity.activity_id, project_activity.activity_type, project_activity.performed_on_id
											 FROM " . TABLE_PROJECT_ACTIVITY . "
											 JOIN " . TABLE_PROJECTS . " ON project_activity.project_id = projects.project_id
											 JOIN " . TABLE_ARTEFACTS . " ON artefacts.artefact_id = project_activity.performed_on_id
											 WHERE logged_by = @~~userid~~@ AND performed_on =  'A'";
$AppGlobal['sql']['getProjectArtefactsWithUsers'] = "SELECT artefacts.artefact_id, artefacts.artefact_title, artefacts.latest_version_id, artefacts.state, artefacts.artefact_type, users.name, users.profile_pic_url, users.user_id, artefact_versions.created_date, artefact_versions.document_path, artefact_versions.version_label
											FROM " . TABLE_ARTEFACTS . " 
											JOIN " . TABLE_ARTEFACTS_VERSIONS . " ON artefacts.latest_version_id = artefact_versions.artefact_ver_id
											JOIN " . TABLE_USERS . " ON users.user_id = artefact_versions.created_by
											WHERE project_id = @~~projectid~~@ ";
$AppGlobal['sql']['getProjectArtefactsWithoutUsers'] = "SELECT artefacts.artefact_id, artefacts.artefact_title, artefacts.latest_version_id, artefacts.state, artefacts.artefact_type, artefact_versions.created_date, artefact_versions.document_path, artefact_versions.version_label
											FROM " . TABLE_ARTEFACTS . " 
											JOIN " . TABLE_ARTEFACTS_VERSIONS . " ON artefacts.latest_version_id = artefact_versions.artefact_ver_id
											WHERE project_id = @~~projectid~~@ ";											 	 
$AppGlobal['sql']['getReviewRequests-old'] = "SELECT artefacts.*,(SELECT COUNT(*) FROM ". TABLE_COMMENTS ." AS comments where comments.artefact_ver_id = artefacts.latest_version_id) AS commentsCount from " . TABLE_ARTEFACTS . " AS artefacts 
											WHERE artefacts.artefact_id in 
											(SELECT versions.artefact_id from ". TABLE_ARTEFACTS_VERSIONS ." AS versions 
											WHERE versions.shared = 1 AND versions.artefact_ver_id in 
											(SELECT versions.artefact_ver_id from " . TABLE_ARTEFACTS_SHARED_MEMBERS . " AS members 
											WHERE members.user_id = @~~userid~~@ or members.shared_by = @~~userid~~@))";
											
$AppGlobal['sql']['getReviewRequests']="SELECT requestor.name AS requestedBy,versions.version_label AS title, 
										requestor.profile_pic_url AS requestorImage, artefacts.artefact_type AS documentType,
										requestor.user_id AS requestorId, members.shared_date AS requestTime,
										versions.state AS status, artefacts.artefact_id as id, artefacts.latest_version_id as version, 
										(SELECT COUNT(comment_id) FROM " . TABLE_COMMENTS . " as comments where artefacts.artefact_id = comments.artefact_id and
										artefacts.latest_version_id = comments.artefact_ver_id) as commentCount
										
										from " . TABLE_ARTEFACTS . " AS artefacts 
										JOIN " . TABLE_ARTEFACTS_VERSIONS . " AS versions 
										ON 
										artefacts.latest_version_id = versions.artefact_ver_id 
										AND  
										versions.artefact_id = artefacts.artefact_id 
										JOIN ". TABLE_USERS ." AS user ON versions.created_by = user.user_id
										JOIN ". TABLE_ARTEFACTS_SHARED_MEMBERS ." AS members ON 
										artefacts.latest_version_id = members.artefact_ver_id AND
										artefacts.artefact_id = members.artefact_id AND
										user.user_id = members.user_id
										JOIN " . TABLE_USERS . " AS requestor ON 
										members.shared_by = requestor.user_id
										WHERE artefacts.artefact_id 
										in 
										(SELECT versions.artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " AS versions 
										WHERE versions.shared = 1 AND versions.artefact_ver_id 
										in 
										(SELECT artefact_ver_id from " . TABLE_ARTEFACTS_SHARED_MEMBERS . " AS members 
										WHERE members.user_id = @~~userid~~@ or members.shared_by = @~~userid~~@))";
													 
$AppGlobal['sql']['getPeopleInProjects'] = "SELECT * from users WHERE user_id in (SELECT user_id from project_members WHERE proj_id in (SELECT proj_id from project_members WHERE user_id = @~~userid~~@))";

$AppGlobal['sql']['getNotifications'] = "SELECT * FROM " . TABLE_NOTIFICATIONS . " WHERE user_id = @~~id~~@";

$AppGlobal['sql']['matchUsers'] = "SELECT screen_name AS matchedString, user_id AS id FROM " . TABLE_USERS . " WHERE screen_name LIKE @~~string~~@";

$AppGlobal['sql']['matchArtefacts'] = "SELECT versions.version_label, artefacts.artefact_title AS matchedString, artefacts.artefact_id AS id 
										FROM " . TABLE_ARTEFACTS . " AS artefacts
										INNER JOIN " . TABLE_ARTEFACTS_VERSIONS . " AS versions ON
										artefacts.latest_version_id = versions.artefact_ver_id
										AND
										artefacts.artefact_id = versions.artefact_id
										
										WHERE artefact_title LIKE @~~string~~@";

$AppGlobal['sql']['matchProjects'] = "SELECT project_name AS matchedString, project_id AS id FROM " . TABLE_PROJECTS . " WHERE project_name LIKE @~~string~~@";

$AppGlobal['sql']['getTeamMembersList'] = "SELECT users.user_id, users.name, users.email, users.profile_pic_url 
											FROM " . TABLE_PROJECT_MEMBERS . " AS members 
											INNER JOIN " . TABLE_USERS . " AS users ON members.user_id = users.user_id  
											WHERE members.proj_id = @~~projectId~~@ AND members.user_id != @~~userId~~@";
$AppGlobal['sql']['getTagsList'] = "SELECT tags.tag_id, tags.tag_name from " . TABLE_USERS . " AS users
											INNER JOIN " . TABLE_ORGANIZATIONS . " AS organizations ON
											users.org_id = organizations.org_id
											INNER JOIN " . TABLE_TAGS . " AS tags ON
											tags.org_id = organizations.org_id
											where users.user_id = @~~userId~~@";
$AppGlobal['sql']['getLatestVerionOfArtefact'] = "SELECT latest_ver_id AS verId FROM " . TABLE_ARTEFACTS . " WHERE artefact_id = @~~artId~~@";
											

?>
