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

$AppGlobal['sql']['getHeader'] = "SELECT profile_pic_url as picture, name, designation FROM ". TABLE_USERS ." WHERE user_id = @~~userid~~@";

$AppGlobal['sql']['getMyProjectsList'] = "SELECT project_id as id, project_name as name, Date(last_updated_date) as last_updated_date, intro_image_url 
											FROM " . TABLE_PROJECTS . " 
											WHERE project_id IN (SELECT proj_id
											FROM " . TABLE_PROJECT_MEMBERS . " 
											WHERE user_id = @~~userid~~@)
											LIMIT @~~limit~~@";	
$AppGlobal['sql']['getMyProjectsListAll'] = "SELECT project_id as id, project_name as name, Date(last_updated_date) as last_updated_date, intro_image_url 
											FROM " . TABLE_PROJECTS . " 
											WHERE project_id IN (SELECT proj_id
											FROM " . TABLE_PROJECT_MEMBERS . " 
											WHERE user_id = @~~userid~~@)";
$AppGlobal['sql']['getMyRecentArtefacts'] = "SELECT projects.project_id, projects.project_name, 
											 artefacts.artefact_title, project_activity.activity_id, 
											 project_activity.activity_type, project_activity.performed_on_id
											 FROM " . TABLE_PROJECT_ACTIVITY . "
											 JOIN " . TABLE_PROJECTS . " ON project_activity.project_id = projects.project_id
											 JOIN " . TABLE_ARTEFACTS . " ON artefacts.artefact_id = project_activity.performed_on_id
											 WHERE logged_by = @~~userid~~@ AND performed_on =  'A'";

											 
$AppGlobal['sql']['getProjectArtefactsWithSharePermission'] = "SELECT arts.* FROM " . TABLE_ARTEFACTS . " AS arts 
																JOIN " . TABLE_ARTEFACTS_SHARED_MEMBERS. " AS memb ON arts.artefact_id = memb.artefact_id AND arts.latest_version_id = memb.artefact_ver_id 
																JOIN " . TABLE_USERS . " AS user on memb.user_id = user.user_id
																WHERE memb.user_id = @~~userid~~@ AND arts.project_id = @~~projectid~~@";

$AppGlobal['sql']['getProjectArtefactsWithoutSharePermission'] = "SELECT DISTINCT
											requestor.name as requestedBy, 
											versions.version_label as title, 
											requestor.profile_pic_url as requestorImage, 
											artefacts.artefact_type as documentType,
											requestor.user_id as requestorId,
											Date(members.shared_date) AS requestTime,
											versions.state AS status, 
											artefacts.artefact_id as id,
											artefacts.linked_id as linkedId, 
											versions.version_no as version,
											(select count(comment_id) from ". TABLE_COMMENTS ." as comments where 
											artefacts.latest_version_id = comments.artefact_ver_id) as commentCount 
											FROM " . TABLE_ARTEFACTS . " as artefacts 
											JOIN ". TABLE_ARTEFACTS_VERSIONS ." as versions 
											on 
											artefacts.latest_version_id = versions.artefact_ver_id 
											JOIN ". TABLE_ARTEFACTS_SHARED_MEMBERS ." as members on 
											artefacts.latest_version_id = members.artefact_ver_id
											JOIN " . TABLE_USERS . " as requestor on 
											members.shared_by = requestor.user_id or versions.created_by = requestor.user_id
											WHERE artefacts.project_id = @~~projectid~~@ and
											artefacts.artefact_id 
											in 
											(select versions.artefact_id from ". TABLE_ARTEFACTS_VERSIONS ." as versions 
											WHERE versions.artefact_ver_id 
											in 
											(select versions.artefact_ver_id from ". TABLE_ARTEFACTS_SHARED_MEMBERS ." as members 
											WHERE members.user_id = @~~userid~~@ or members.shared_by = @~~userid~~@)) AND
											artefacts.replace_ref_id = 0
											ORDER BY @~~sortBy~~@";

$AppGlobal['sql']['getReviewRequests-old'] = "SELECT artefacts.*,(SELECT COUNT(*) FROM ". TABLE_COMMENTS ." AS comments where comments.artefact_ver_id = artefacts.latest_version_id) AS commentsCount from " . TABLE_ARTEFACTS . " AS artefacts 
											WHERE artefacts.artefact_id in 
											(SELECT versions.artefact_id from ". TABLE_ARTEFACTS_VERSIONS ." AS versions 
											WHERE versions.shared = 1 AND versions.artefact_ver_id in 
											(SELECT versions.artefact_ver_id from " . TABLE_ARTEFACTS_SHARED_MEMBERS . " AS members 
											WHERE members.user_id = @~~userid~~@ or members.shared_by = @~~userid~~@))";
											
$AppGlobal['sql']['getReviewRequests'] = "SELECT DISTINCT requestor.name AS requestedBy,versions.version_label AS title, 
										requestor.profile_pic_url AS requestorImage, artefacts.artefact_type AS documentType,
										requestor.user_id AS requestorId, Date(members.shared_date) AS requestTime,
										versions.state AS status, artefacts.artefact_id as id, 
										(SELECT COUNT(artefact_id) FROM " . TABLE_ARTEFACTS_VERSIONS . " AS ver WHERE 
										ver.artefact_id = artefacts.artefact_id) as version,
										artefacts.project_id as projectId,
										(SELECT COUNT(comment_id) FROM " . TABLE_COMMENTS . " as comments where 
										artefacts.latest_version_id = comments.artefact_ver_id) as commentCount
										from " . TABLE_ARTEFACTS . " AS artefacts 
										JOIN " . TABLE_ARTEFACTS_VERSIONS . " AS versions 
										ON 
										artefacts.latest_version_id = versions.artefact_ver_id
										JOIN ". TABLE_ARTEFACTS_SHARED_MEMBERS ." AS members ON 
										artefacts.latest_version_id = members.artefact_ver_id
										JOIN " . TABLE_USERS . " AS requestor ON 
										members.shared_by = requestor.user_id
										WHERE artefacts.artefact_id 
										in 
										(SELECT versions.artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " AS versions 
										WHERE versions.artefact_ver_id 
										in 
										(SELECT versions.artefact_ver_id from " . TABLE_ARTEFACTS_SHARED_MEMBERS . " AS members 
										WHERE members.user_id = @~~userid~~@ or members.shared_by = @~~userid~~@)) AND
										artefacts.replace_ref_id = 0 AND
										artefacts.state != 'A'
										ORDER BY members.shared_date DESC
										LIMIT @~~limit~~@";
													 
$AppGlobal['sql']['getPeopleInProjects'] = "SELECT profile_pic_url as picture, name, email, 
											user_id as id from users 
											WHERE 
											user_id in (SELECT user_id from project_members 
											WHERE 
											proj_id in (SELECT proj_id from project_members 
											WHERE user_id = @~~userid~~@)) 
											and user_id != @~~userid~~@ LIMIT @~~limit~~@";

$AppGlobal['sql']['getPeopleInProject'] = "SELECT profile_pic_url as picture, name, email, 
											user_id as id from users 
											WHERE 
											user_id in (SELECT user_id from project_members 
											WHERE 
											proj_id = @~~projectId~~@) 
											and user_id != @~~userid~~@ LIMIT @~~limit~~@";


$AppGlobal['sql']['getNotifications'] = "SELECT nots.notification_id as id, nots.message as title, nots.notification_type as type, notification_ref_id as refId,
										 Date(nots.notification_date) as time, notifier.name as notifier, nots.notification_by as notifierId  
										 FROM " . TABLE_NOTIFICATIONS . " as nots
										 JOIN " . TABLE_USERS . " as notifier on notifier.user_id = nots.notification_by
										 WHERE nots.user_id = @~~id~~@ or nots.notification_by = @~~id~~@ LIMIT @~~limit~~@";

$AppGlobal['sql']['getMeetingNotificationDetails'] = "SELECT Date(meeting_time) as time, meeting_agenda as title FROM " . TABLE_MEETINGS . " WHERE meeting_id = @~~id~~@";

$AppGlobal['sql']['matchUsers'] = "SELECT screen_name AS matchedString, user_id AS id FROM " . TABLE_USERS . " WHERE screen_name LIKE @~~string~~@";

$AppGlobal['sql']['matchArtefacts'] = "SELECT versions.version_label, artefacts.artefact_title AS matchedString, artefacts.artefact_id AS id 
										FROM " . TABLE_ARTEFACTS . " AS artefacts
										INNER JOIN " . TABLE_ARTEFACTS_VERSIONS . " AS versions ON
										artefacts.latest_version_id = versions.artefact_ver_id
										AND
										artefacts.artefact_id = versions.artefact_id
										
										WHERE artefact_title LIKE @~~string~~@";

$AppGlobal['sql']['matchProjects'] = "SELECT project_name AS matchedString, project_id AS id FROM " . TABLE_PROJECTS . " WHERE project_name LIKE @~~string~~@";

$AppGlobal['sql']['getTeamMembersList'] = "SELECT users.user_id, users.name, users.email, users.profile_pic_url as picture
											FROM " . TABLE_PROJECT_MEMBERS . " AS members 
											INNER JOIN " . TABLE_USERS . " AS users ON members.user_id = users.user_id  
											WHERE members.proj_id = @~~projectId~~@ AND members.user_id != @~~userId~~@";

$AppGlobal['sql']['getTagsList'] = "SELECT tags.tag_id as id, tags.tag_name as name from " . TABLE_USERS . " AS users
											INNER JOIN " . TABLE_ORGANIZATIONS . " AS organizations ON
											users.org_id = organizations.org_id
											INNER JOIN " . TABLE_TAGS . " AS tags ON
											tags.org_id = organizations.org_id
											where users.user_id = @~~userId~~@";

$AppGlobal['sql']['getLatestVerionOfArtefact'] = "SELECT latest_version_id AS verId FROM " . TABLE_ARTEFACTS . " WHERE artefact_id = @~~artId~~@";

$AppGlobal['sql']['getVerionDetailsOfArtefact'] = "SELECT * FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@ and artefact_ver_id in (SELECT latest_version_id FROM " . TABLE_ARTEFACTS . " WHERE artefact_id = @~~artId~~@) ";

$AppGlobal['sql']['getArtefactLinkId'] = "SELECT artefacts.linked_id FROM " . TABLE_ARTEFACTS . " AS artefacts where artefacts.artefact_id = @~~artefactid~~@";

$AppGlobal['sql']['getMaxLinkId'] = "SELECT MAX(artefacts.linked_id) as linked_id FROM " . TABLE_ARTEFACTS . " AS artefacts";

$AppGlobal['sql']['getArtefactsLink'] = "SELECT DISTINCT artefacts.artefact_id,artefacts.linked_id FROM " . TABLE_ARTEFACTS . " AS artefacts 
										JOIN ". TABLE_ARTEFACTS_SHARED_MEMBERS ." AS members ON
										members.artefact_id = artefacts.artefact_id
										WHERE artefacts.project_id = @~~projectid~~@ AND artefacts.replace_ref_id = 0
										AND (members.user_id = @~~userid~~@ or members.shared_by = @~~userid~~@)
										ORDER BY artefacts.linked_id";
										
$AppGlobal['sql']['getReferences'] = "SELECT DISTINCT 
										artefacts.artefact_id as id, artefacts.artefact_title as name, date(vers.created_date) as date, user.name as userName
										from " . TABLE_ARTEFACTS . " AS artefacts 
										JOIN " . TABLE_ARTEFACTS_VERSIONS . " as vers on
										vers.artefact_ver_id = artefacts.latest_version_id
										JOIN " . TABLE_USERS . " as user on
										user.user_id = vers.created_by
										WHERE artefacts.artefact_id 
										in 
										(SELECT versions.artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " AS versions 
										WHERE versions.shared = 1 AND versions.artefact_ver_id 
										in 
										(SELECT versions.artefact_ver_id from " . TABLE_ARTEFACTS_SHARED_MEMBERS . " AS members
										WHERE members.user_id = @~~userid~~@ or members.shared_by = @~~userid~~@)) AND
										artefacts.replace_ref_id = 0 AND 
										artefacts.artefact_id != @~~ignore~~@ AND 
										artefacts.project_id = @~~projectid~~@";

$AppGlobal['sql']['getProjectActivity'] = "SELECT Date(pa.logged_time) as time, 
											pa.performed_on as activityOn, 
											pa.activity_id as id, 
											actBy.name as doneBy, 
											CASE activity_type
												WHEN 'N' THEN 'Added'
												WHEN 'D' THEN 'Removed'
												WHEN 'R' THEN 'Replace'
												WHEN 'U' THEN 'Updated'
												WHEN 'H' THEN 'Hold'
												WHEN 'C' THEN 'Comment'
												WHEN 'S' THEN 'Share'
											END as activityType,
											CASE performed_on
												WHEN 'U' THEN 'User'
												WHEN 'A' THEN 'Artefact'
												WHEN 'M' THEN 'Meeting'
												WHEN 'V' THEN 'Version'
											END as activityOn,
											CASE performed_on
												WHEN 'A' THEN (SELECT vers.version_label FROM artefacts as arts join artefact_versions as vers on vers.artefact_ver_id = arts.latest_version_id WHERE arts.artefact_id = pa.performed_on_id)
												WHEN 'U' THEN (SELECT name FROM users where user_id = pa.performed_on_id)
												WHEN 'M' THEN (SELECT meeting_agenda FROM meetings WHERE meeting_id = pa.performed_on_id)
											END as activityName	
											FROM 
											`project_activity` as pa
											JOIN users as actBy 
											on 
											actBy.user_id = pa.logged_by  
											WHERE 
											pa.project_id = @~~projectid~~@";

$AppGlobal['sql']['getMyRecentActivity'] = "";

$AppGlobal['sql']['getMeetingNotes'] = "SELECT * FROM " . TABLE_MEETING_NOTES . " as notes 
										JOIN " . TABLE_USERS . " as users ON 
										notes.participant_id = users.user_id
										WHERE meeting_id = @~~meetingId~~@ ";

$AppGlobal['sql']['getDocumentDetails'] = "SELECT arts.artefact_id as artefactId,
											arts.artefact_title as title,
											(SELECT COUNT(artefact_ver_id) FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@) as version,
											(SELECT COUNT(comment_id) FROM " . TABLE_COMMENTS . " as comments WHERE arts.latest_version_id = comments.artefact_ver_id) as commentCount,
											vers.state as status,
											user.name as createdBy,
											user.user_id as creatorId,
											user.profile_pic_url as picture
											FROM " . TABLE_ARTEFACTS . " as arts 
											JOIN " . TABLE_ARTEFACTS_VERSIONS . " as vers
											ON
											arts.latest_version_id = vers.artefact_ver_id
											JOIN users as user on 
											user.user_id = vers.created_by
											WHERE arts.artefact_id = 1";								

$AppGlobal['sql']['getDocumentVersions'] = "SELECT arts.artefact_title  as title,
											vers.version_no version,
											CASE vers.artefact_ver_id 
												when arts.latest_version_id then true
												else false 
											END as isCurrentVersion,
											Date(vers.created_date) as date
											
											FROM " . TABLE_ARTEFACTS_VERSIONS . " as vers 
											JOIN " . TABLE_ARTEFACTS . " as arts on
											arts.artefact_id = vers.artefact_id
											where vers.artefact_id = @~~artId~~@";

$AppGlobal['sql']['getDocumentSharedDetails'] = "SELECT user.user_id as id,
												user.name as name,
												user.email as email,
												user.profile_pic_url as profilePic,
												members.access_type as permission,
												(SELECT COUNT(comment_id) from " . TABLE_COMMENTS . " as comments WHERE arts.latest_version_id = comments.artefact_ver_id and comments.comment_by = user.user_id) as commentcount
												FROM " . TABLE_ARTEFACTS . " as arts
												JOIN " . TABLE_ARTEFACTS_SHARED_MEMBERS . " as members on
												members.artefact_ver_id = arts.latest_version_id
												JOIN " . TABLE_USERS . " as user on
												members.user_id = user.user_id
												WHERE arts.artefact_id = @~~artId~~@";

$AppGlobal['sql']['getDocumentReferences'] = "SELECT refs.artefact_id as id,
											refs.artefact_title as name 
											FROM  " . TABLE_ARTEFACTS . " as arts 
											join " . TABLE_ARTEFACT_REFS . " as docs on 
											arts.latest_version_id = docs.artefact_ver_id
											join " . TABLE_ARTEFACTS . " as refs on
											docs.artefact_id = refs.artefact_id
											where arts.artefact_id = @~~artId~~@";

$AppGlobal['sql']['getDocumentLinks'] = "SELECT * FROM " . TABLE_ARTEFACT_LINKS . " where linked_id = (select DISTINCT (linked_id) from " . TABLE_ARTEFACT_LINKS . " WHERE linked_from_id = @~~artId~~@ or linked_to_id = @~~artId~~@)";

$AppGlobal['sql']['getAllVersionsOfArtefact'] = "SELECT * FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@";

$AppGlobal['sql']['getHighestVersionOfArtefact'] = "SELECT count(version_no) as vers FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@";

$AppGlobal['sql']['getProjectOfArtefact'] = "SELECT project_id FROM " . TABLE_ARTEFACTS . " WHERE artefact_id = @~~artId~~@";

?>
