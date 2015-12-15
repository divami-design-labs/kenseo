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

$AppGlobal['sql']['getMyProjectsList'] = "SELECT project_id as id, project_name as name, last_updated_date as last_updated_date, intro_image_url 
											FROM " . TABLE_PROJECTS . " 
											WHERE project_id IN (SELECT proj_id
											FROM " . TABLE_PROJECT_MEMBERS . " 
											WHERE user_id = @~~userid~~@)
											AND 
											state = 'A'
											LIMIT @~~limit~~@";	
$AppGlobal['sql']['getMyProjectsListAll'] = "SELECT project_id as id, project_name as name, last_updated_date as last_updated_date, intro_image_url 
											FROM " . TABLE_PROJECTS . " 
											WHERE project_id IN (SELECT proj_id
											FROM " . TABLE_PROJECT_MEMBERS . " 
											WHERE user_id = @~~userid~~@)
											AND 
											state = 'A'";
$AppGlobal['sql']['getMyRecentArtefacts'] = "SELECT projects.project_id, projects.project_name, 
											 artefacts.artefact_title, project_activity.activity_id, 
											 project_activity.activity_type, project_activity.performed_on_id
											 FROM " . TABLE_PROJECT_ACTIVITY . "
											 JOIN " . TABLE_PROJECTS . " ON project_activity.project_id = projects.project_id
											 JOIN " . TABLE_ARTEFACTS . " ON artefacts.artefact_id = project_activity.performed_on_id
											 WHERE logged_by = @~~userid~~@ AND performed_on =  'A' AND projects.state = 'A' limit @~~limit~~@";

											 
$AppGlobal['sql']['getProjectArtefactsWithSharePermission'] = "SELECT arts.* FROM " . TABLE_ARTEFACTS . " AS arts 
																JOIN " . TABLE_ARTEFACTS_SHARED_MEMBERS. " AS memb ON arts.artefact_id = memb.artefact_id AND arts.latest_version_id = memb.artefact_ver_id 
																JOIN " . TABLE_USERS . " AS user on memb.user_id = user.user_id
																WHERE memb.user_id = @~~userid~~@ AND arts.project_id = @~~projectid~~@";

$AppGlobal['sql']['getProjectArtefactsWithoutSharePermission'] = "SELECT DISTINCT
											requestor.name as requestedBy, 
											versions.artefact_ver_id as versionId,
											artefacts.artefact_title as title,
											artefacts.artefact_title as name, 
											requestor.profile_pic_url as requestorImage, 
											artefacts.artefact_type as documentType,
											requestor.user_id as requestorId,
											members.shared_date AS requestTime,
											versions.state AS status, 
											artefacts.artefact_id as id,
											artefacts.linked_id as linkedId, 
											versions.version_no as version,
											project.project_name as project_name,
											artefacts.project_id as project_id, 
											(select count(comment_thread_id) from ". TABLE_COMMENT_THREADS ." as thread
											WHERE 
											artefacts.latest_version_id = thread.artefact_ver_id) as commentCount 
											FROM " . TABLE_ARTEFACTS . " as artefacts
											JOIN " . TABLE_PROJECTS . " as project on
											artefacts.project_id = project.project_id
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

$AppGlobal['sql']['getReviewRequests'] = "SELECT DISTINCT requestor.name AS requestedBy,artefacts.artefact_title AS title, 
										requestor.profile_pic_url AS requestorImage, artefacts.artefact_type AS documentType,
										requestor.user_id AS requestorId, members.shared_date AS requestTime,
										versions.state AS status, artefacts.artefact_id as id, artefacts.latest_version_id as versionId,
										project.project_name as project_name,
										(SELECT COUNT(artefact_id) FROM " . TABLE_ARTEFACTS_VERSIONS . " AS ver WHERE 
										ver.artefact_id = artefacts.artefact_id) as version,
										artefacts.project_id as project_id,
										(SELECT COUNT(comment_thread_id) FROM " . TABLE_COMMENT_THREADS . " as thread where 
										artefacts.latest_version_id = thread.artefact_ver_id) as commentCount
										from " . TABLE_ARTEFACTS . " AS artefacts 
										JOIN " . TABLE_ARTEFACTS_VERSIONS . " AS versions 
										ON 
										artefacts.latest_version_id = versions.artefact_ver_id
										JOIN " . TABLE_PROJECTS . " as project ON
										artefacts.project_id = project.project_id
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
										artefacts.state != 'A' AND artefacts.state != 'D' AND
										project.state = 'A'
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
										 av.masked_artefact_version_id, nots.notification_date as time, notifier.name as notifier, nots.notification_by as notifierId  
										 FROM " . TABLE_NOTIFICATIONS . " as nots
										 LEFT JOIN artefact_versions av ON nots.notification_ref_id = av.artefact_ver_id AND nots.notification_type =  'S'
										 JOIN " . TABLE_USERS . " as notifier on notifier.user_id = nots.notification_by
										 WHERE nots.user_id = @~~id~~@ ORDER BY nots.notification_date DESC LIMIT @~~limit~~@";

$AppGlobal['sql']['getMeetingNotificationDetails'] = "SELECT meeting_time as time, meeting_title as title FROM " . TABLE_MEETINGS . " WHERE meeting_id = @~~id~~@";

$AppGlobal['sql']['matchUsers'] = "SELECT screen_name AS matchedString, user_id AS id FROM " . TABLE_USERS . " WHERE screen_name LIKE @~~string~~@";

$AppGlobal['sql']['matchArtefacts'] = "SELECT artefacts.artefact_title, artefacts.artefact_title AS matchedString, artefacts.artefact_id AS id 
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
											WHERE members.proj_id = @~~projectId~~@";// AND members.user_id != @~~userId~~@";

$AppGlobal['sql']['getTagsList'] = "SELECT tags.tag_id as id, tags.tag_name as name from " . TABLE_USERS . " AS users
											INNER JOIN " . TABLE_ORGANIZATIONS . " AS organizations ON
											users.org_id = organizations.org_id
											INNER JOIN " . TABLE_TAGS . " AS tags ON
											tags.org_id = organizations.org_id
											where users.user_id = @~~userId~~@";

$AppGlobal['sql']['getLatestVerionOfArtefact'] = "SELECT latest_version_id AS verId FROM " . TABLE_ARTEFACTS . " WHERE artefact_id = @~~artId~~@";

$AppGlobal['sql']['getVerionDetailsOfArtefact'] = "SELECT * FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@ and artefact_ver_id in 
													(SELECT latest_version_id FROM " . TABLE_ARTEFACTS . " WHERE artefact_id = @~~artId~~@) ";

$AppGlobal['sql']['getArtefactLinkId'] = "SELECT artefacts.linked_id FROM " . TABLE_ARTEFACTS . " AS artefacts where artefacts.artefact_id = @~~artefactid~~@";

$AppGlobal['sql']['getMaxLinkId'] = "SELECT MAX(artefacts.linked_id) as linked_id FROM " . TABLE_ARTEFACTS . " AS artefacts";

$AppGlobal['sql']['getArtefactsLink'] = "SELECT DISTINCT artefacts.artefact_id,artefacts.linked_id FROM " . TABLE_ARTEFACTS . " AS artefacts 
										JOIN ". TABLE_ARTEFACTS_SHARED_MEMBERS ." AS members ON
										members.artefact_id = artefacts.artefact_id
										WHERE artefacts.project_id = @~~projectid~~@ AND artefacts.replace_ref_id = 0
										AND (members.user_id = @~~userid~~@ or members.shared_by = @~~userid~~@)
										ORDER BY artefacts.linked_id";
										
$AppGlobal['sql']['getReferences'] = "SELECT DISTINCT
				 						artefacts.artefact_id as id, 
										artefacts.artefact_title as name, 
										versions.created_date as date,
										requestor.name as userName
										
										FROM " . TABLE_ARTEFACTS . " AS artefacts 
										
										JOIN " . TABLE_ARTEFACTS_VERSIONS . " AS versions 
										ON 
										artefacts.latest_version_id = versions.artefact_ver_id
										
										JOIN " . TABLE_USERS . " AS requestor ON 
										versions.created_by = requestor.user_id
										
										WHERE artefacts.artefact_id 
										in 
										
										(SELECT versions.artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " AS versions 
										WHERE versions.artefact_ver_id 
										in 
										(SELECT versions.artefact_ver_id from " . TABLE_ARTEFACTS_SHARED_MEMBERS . " AS members 
										WHERE members.user_id = @~~userid~~@ or members.shared_by =  @~~userid~~@)) AND
										artefacts.replace_ref_id IS NULL AND 
										artefacts.artefact_id != @~~ignore~~@ AND
										artefacts.state != 'A' AND artefacts.project_id = @~~projectid~~@";

$AppGlobal['sql']['getProjectActivity'] = "SELECT pa.logged_time as time, 
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
												WHEN 'A' THEN (SELECT arts.artefact_title FROM artefacts AS  arts WHERE arts.artefact_id = pa.performed_on_id)
												WHEN 'U' THEN (SELECT name FROM users where user_id = pa.performed_on_id)
												WHEN 'M' THEN (SELECT meeting_title FROM meetings WHERE meeting_id = pa.performed_on_id)
												WHEN 'V' THEN (SELECT vers.version_label FROM artefact_versions as vers WHERE vers.artefact_ver_id = pa.performed_on_id)
											END as activityName	
											FROM 
											`project_activity` as pa
											JOIN users as actBy 
											on 
											actBy.user_id = pa.logged_by  
											WHERE 
											pa.project_id = @~~projectid~~@ 
											ORDER BY pa.logged_time DESC";

$AppGlobal['sql']['getMyRecentActivity'] = "";

$AppGlobal['sql']['getMeetingNotes'] = "SELECT users.user_id as userId, notes.participant_notes as notes, notes.is_public as isPublic, users.profile_pic_url as profilePic, users.name as userName 
										FROM " . TABLE_MEETING_NOTES . " as notes 
										JOIN " . TABLE_USERS . " as users ON 
										notes.participant_id = users.user_id
										WHERE meeting_id = @~~meetingId~~@ and users.user_id != @~~userId~~@";
										
$AppGlobal['sql']['getMeetingDetails'] = "SELECT proj.project_name as projectName, arts.artefact_title as artefactName, user.name as createdBy, 
											meets.meeting_time as startTime, meets.meeting_end_time as endTime, meets.venue as venue, meets.meeting_agenda as agenda,
											notes.participant_notes as userNotes, participant.user_id as participantId, participant.name as participantName, participant.profile_pic_url as participantPic
											FROM " . TABLE_MEETINGS . " AS  meets 
											JOIN " . TABLE_MEETING_NOTES . " as notes on
											notes.meeting_id = @~~meetingId~~@ and participant_id = @~~userId~~@
											JOIN " . TABLE_PROJECTS . " AS proj ON
											proj.project_id = meets.project_id 
											JOIN " . TABLE_ARTEFACTS . " as arts ON 
											arts.artefact_id = meets.artefact_id
											JOIN " . TABLE_USERS . " as user ON
											user.user_id = meets.created_by
											JOIN " . TABLE_USERS . " as participant ON
											participant.user_id = @~~userId~~@
											WHERE meets.meeting_id = @~~meetingId~~@ ";

											
$AppGlobal['sql']['getMeetingParticipants'] = "SELECT user.user_id as id, user.name as participentName, user.profile_pic_url 
												FROM " . TABLE_MEETING_PARTICIPENTS . " AS parts 
												JOIN " . TABLE_USERS . " AS user ON
												user.user_id = parts.participent_id	 
												WHERE parts.meeting_id = @~~meetingId~~@";

$AppGlobal['sql']['getDocumentDetails'] = "SELECT arts.artefact_id as artefactId,
											arts.artefact_title as title,
											(SELECT COUNT(artefact_ver_id) FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@) as version,
											(SELECT COUNT(comment_thread_id) FROM " . TABLE_COMMENT_THREADS . " as thread WHERE arts.latest_version_id = thread.artefact_ver_id) as commentCount,
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
											vers.created_date as date
											
											FROM " . TABLE_ARTEFACTS_VERSIONS . " as vers 
											JOIN " . TABLE_ARTEFACTS . " as arts on
											arts.artefact_id = vers.artefact_id
											where vers.artefact_id = @~~artId~~@";

$AppGlobal['sql']['getDocumentSharedDetails'] = "SELECT user.user_id as id,
												user.name as name,
												user.email as email,
												user.profile_pic_url as profilePic,
												members.access_type as permission,
												(SELECT COUNT(comment_thread_id) from " . TABLE_COMMENT_THREADS . " as thread WHERE 
												arts.latest_version_id = thread.artefact_ver_id and thread.comment_thread_by = user.user_id) as commentcount
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

$AppGlobal['sql']['getDocumentLinks'] = "SELECT * FROM " . TABLE_ARTEFACT_LINKS . " where linked_id = 
										(select DISTINCT (linked_id) from " . TABLE_ARTEFACT_LINKS . " WHERE linked_from_id = @~~artId~~@ or linked_to_id = @~~artId~~@)";

$AppGlobal['sql']['getAllVersionsOfArtefact'] = "SELECT * FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@";

$AppGlobal['sql']['getHighestVersionOfArtefact'] = "SELECT count(version_no) as vers FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@";

$AppGlobal['sql']['getProjectOfArtefact'] = "SELECT project_id FROM " . TABLE_ARTEFACTS . " WHERE artefact_id = @~~artId~~@";

$AppGlobal['sql']['getOtherMembersList'] = "SELECT users.user_id, users.name, users.email, users.profile_pic_url as picture 
											FROM " . TABLE_USERS . " AS users WHERE users.user_id NOT IN 
											(SELECT members.user_id
											FROM " . TABLE_PROJECT_MEMBERS . " AS members   
											WHERE members.proj_id = @~~projectId~~@)" ;

$AppGlobal['sql']['getArtefactDetails'] = "SELECT proj.project_name as projName, arts.artefact_title as artTitle, vers.artefact_ver_id, arts.artefact_id as artefactId, arts.description as description,vers.version_no as versionCount 
											FROM " . TABLE_ARTEFACTS . " AS arts 
											JOIN " . TABLE_PROJECTS . " AS proj ON
											proj.project_id = arts.project_id
											JOIN " . TABLE_ARTEFACTS_VERSIONS . " as vers ON
											arts.artefact_id = vers.artefact_id
											WHERE vers.masked_artefact_version_id = @~~maskedArtefactVersionId~~@";

$AppGlobal['sql']['getArtefactVersionSummary'] = "SELECT vers.artefact_ver_id as versionId, vers.masked_artefact_version_id, vers.version_no as versionNo, vers.document_path as documentPath, vers.MIME_type as type,
												 vers.version_label as label, vers.created_by as authorId, user.name as authorName, shared,
												(SELECT COUNT(comment_thread_id) FROM " . TABLE_COMMENT_THREADS . " as thread where 
												vers.artefact_ver_id = thread.artefact_ver_id) as commentCount 
												FROM " . TABLE_ARTEFACTS_VERSIONS . " AS vers 
												JOIN " . TABLE_USERS . " AS user on
												user.user_id = vers.created_by
												WHERE artefact_id = (SELECT artefact_id from artefact_versions where masked_artefact_version_id = @~~maskedArtefactVersionId~~@)";
												
$AppGlobal['sql']['getArtefactVersionShared'] = "SELECT user.user_id as id, user.name as name, user.profile_pic_url as profilePic, membs.access_type as permission
												FROM " . TABLE_ARTEFACTS_SHARED_MEMBERS . " as membs 
												JOIN " . TABLE_USERS . " AS user on
												user.user_id = membs.user_id
												WHERE artefact_ver_id = @~~verId~~@";

$AppGlobal['sql']['getArtefactVersionComments'] = "SELECT thread.comment_id as commentId, user.name, 
												  thread.comment_thread_by as commentorId, thread.description
												  FROM " . TABLE_COMMENT_THREADS . " as thread 
												  JOIN " . TABLE_USERS . " as user on
												  thread.comment_thread_by = user.user_id  
												  JOIN " . TABLE_COMMENTS . " as comment on
												  comment.comment_id = thread.comment_id
												  WHERE artefact_ver_id = @~~verId~~@";
											
//document summary view related queries
$AppGlobal['sql']['getLinkedArtefactList'] = "SELECT DISTINCT * FROM " . TABLE_ARTEFACTS . " WHERE linked_id!=0 and linked_id = 
											(SELECT linked_id from " . TABLE_ARTEFACTS . " where artefact_id = 
											(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " where artefact_ver_id = @~~versionId~~@))";

$AppGlobal['sql']['getReferenceArtefactList'] = "SELECT DISTINCT arts.artefact_title as title FROM " . TABLE_ARTEFACT_REFS . " as refs
											JOIN " . TABLE_ARTEFACTS . " as arts on
											refs.artefact_id = arts.artefact_id
											WHERE refs.artefact_ver_id in 
											(SELECT artefact_ver_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = 
											(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_ver_id = @~~versionId~~@))";

$AppGlobal['sql']['getArtefactVersionsList'] = "SELECT DISTINCT * from " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = 
											(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_ver_id = @~~versionId~~@)";

$AppGlobal['sql']['getArtefactSharedMemebersList'] = "SELECT DISTINCT user.user_id as userId, user.name as name, user.email as email, user.profile_pic_url as userImage,
													(select count(comment_thread_id) from ". TABLE_COMMENT_THREADS ." as thread
													WHERE 
													thread.artefact_ver_id = @~~versionId~~@ and thread.comment_thread_by = user.user_id) as commentCount
													from " . TABLE_ARTEFACTS_SHARED_MEMBERS . " as membs
													JOIN " . TABLE_USERS . " as user on
													membs.user_id = user.user_id
													WHERE membs.artefact_id = 
													(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_ver_id = @~~versionId~~@) and user.user_id!=@~~userId~~@";
													
$AppGlobal['sql']['artefactBasicDetails'] = "SELECT arts.artefact_title as title, vers.version_no as versionNo, user.name as authorName, user.profile_pic_url as authorImage, 
											(select count(comment_thread_id) from ". TABLE_COMMENT_THREADS ." as thread
											WHERE 
											thread.artefact_ver_id = @~~versionId~~@) as commentCount, arts.state as status
											FROM " . TABLE_ARTEFACTS . " as arts 
											JOIN " . TABLE_ARTEFACTS_VERSIONS . " as vers on
											vers.artefact_ver_id = @~~versionId~~@
											JOIN " . TABLE_USERS . " as user on
											user.user_id = vers.created_by
											WHERE arts.artefact_id = (SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_ver_id = @~~versionId~~@)";

//summary timeline related queries
$AppGlobal['sql']['getTimeLineMeetings'] = "SELECT * FROM " . TABLE_MEETINGS . " WHERE artefact_id =
											(SELECT artefact_id FROM " . TABLE_ARTEFACTS_VERSIONS . " where artefact_ver_id = @~~versionId~~@) ORDER BY meeting_id";

$AppGlobal['sql']['getTimeLineReferences'] = "SELECT * FROM " . TABLE_ARTEFACT_REFS ." WHERE artefact_id = 
											(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_ver_id = @~~versionId~~@) and while_creation = 0 ORDER BY created_date";

$AppGlobal['sql']['getTimeLineLinks'] = "SELECT * FROM " . TABLE_ARTEFACT_LINKS .  " where linked_from_id = 
										(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_ver_id = @~~versionId~~@) and while_creation = 0 ORDER BY linked_date";

$AppGlobal['sql']['getTimeLineUsers'] = "SELECT memb.*, user.profile_pic_url as profPic FROM " . TABLE_ARTEFACTS_SHARED_MEMBERS . " as memb 
										JOIN " . TABLE_USERS . " as user on
										user.user_id = memb.user_id
										WHERE memb.artefact_id = 
										(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_ver_id = @~~versionId~~@) and while_creation = 0 ORDER BY shared_date";



// Get Organization id from users table
$AppGlobal['sql']['getUserOrganizationId'] = "SELECT org_id FROM " . TABLE_USERS . " WHERE user_id = @~~user_id~~@";

// Get Organization id from projects table
$AppGlobal['sql']['getProjectOrganizationId'] = "SELECT org_id FROM " . TABLE_PROJECTS . " WHERE project_id = @~~project_id~~@";

// Get comment threads from artefact version
$AppGlobal['sql']['getArtefactCommentThreads'] = "SELECT comment_thread_id, posx, posy, page_no, severity, category, is_private, state FROM " . TABLE_COMMENT_THREADS . 
													" WHERE artefact_ver_id = @~~artefactVerId~~@";

// Get comments from comment thread ids
$AppGlobal['sql']['getComments'] = "SELECT comment_id, comment_thread_id, u.name as user, created_at as time, description FROM ". TABLE_COMMENTS .
													" c INNER JOIN " . TABLE_USERS . " u ON u.user_id = c.comment_by WHERE comment_thread_id in (@~~commentThreadIds~~@)";

// Get artefact comment thread
$AppGlobal['sql']['getArtefactCommentThread'] = "SELECT comment_thread_id, posx, posy, page_no, severity, category, is_private, state FROM " . TABLE_COMMENT_THREADS . 
													" WHERE comment_thread_id = @~~commentThreadId~~@";


$AppGlobal['sql']['getCommentThread'] = "SELECT * FROM " . TABLE_COMMENT_THREADS . " t inner join " . TABLE_ARTEFACTS_VERSIONS . 
											" v on t.artefact_ver_id = v.artefact_ver_id where t.artefact_ver_id = @~~artefactVerId~~@ AND t.comment_thread_id = @~~commentThreadId~~@";

?>
