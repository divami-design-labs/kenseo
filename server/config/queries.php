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

$AppGlobal['sql']['getHeader'] = "SELECT profile_pic_url as picture, name, screen_name, designation FROM ". TABLE_USERS ." WHERE user_id = @~~userid~~@";

// Get Projects
$AppGlobal['sql']['getMyProjectsList'] = "SELECT project_id, project_name as project_name, description as project_description,
											CONVERT_TZ((SELECT MAX(notification_date) FROM ".TABLE_NOTIFICATIONS." WHERE project_id = projects.project_id LIMIT 1),	@@session.time_zone,
												'+00:00'
											) as last_updated_date,
											intro_image_url,IF(created_by=@~~userid~~@, 1, 0) as is_owner, IF( state =  'Z', 1, 0 ) AS is_archive
											FROM " . TABLE_PROJECTS . " as projects
											WHERE project_id IN (SELECT proj_id
											FROM " . TABLE_PROJECT_MEMBERS . "
											WHERE user_id = @~~userid~~@) AND state = 'A' ORDER BY last_updated_date DESC LIMIT @~~limit~~@";

$AppGlobal['sql']['getAProject'] = "SELECT project_id, project_name as project_name, last_updated_date as last_updated_date, intro_image_url,
											IF(created_by=@~~userid~~@, 1, 0) as is_owner, IF( state =  'Z', 1, 0 ) AS is_archive
											FROM " . TABLE_PROJECTS . "
											WHERE project_id = @~~projectid~~@ AND state = 'A' ORDER BY last_updated_date DESC";

$AppGlobal['sql']['getMyProjectsListAll'] = "SELECT project_id as project_id, project_name as project_name, description as project_description,
											(SELECT MAX(notification_date) FROM ".TABLE_NOTIFICATIONS." WHERE project_id = projects.project_id LIMIT 1) as last_updated_date,
											intro_image_url,IF(created_by=@~~userid~~@, 1, 0) as is_owner, IF( state =  'Z', 1, 0 ) AS is_archive
											FROM " . TABLE_PROJECTS . " as projects
											WHERE project_id IN (SELECT proj_id
											FROM " . TABLE_PROJECT_MEMBERS . "
											WHERE user_id = @~~userid~~@) AND state = 'A' ORDER BY last_updated_date DESC";

$AppGlobal['sql']['getMyProjectsWithArchive'] = "SELECT project_id as project_id, project_name as project_name, description as project_description,
											(SELECT MAX(notification_date) FROM ".TABLE_NOTIFICATIONS." WHERE project_id = projects.project_id LIMIT 1) as last_updated_date,
											intro_image_url,IF(created_by=@~~userid~~@, 1, 0) as is_owner, IF( state =  'Z', 1, 0 ) AS is_archive
											FROM " . TABLE_PROJECTS . " as projects
											WHERE project_id IN (SELECT proj_id
											FROM " . TABLE_PROJECT_MEMBERS . "
											WHERE user_id = @~~userid~~@) ORDER BY last_updated_date DESC";

$AppGlobal['sql']['getMyRecentArtefactsActivities'] = "SELECT p.project_name, pa.logged_time as time,
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
											FROM " .
											TABLE_PROJECT_ACTIVITY . " as pa
											JOIN " . TABLE_USERS . " as actBy
											on
											actBy.user_id = pa.logged_by
											join " . TABLE_PROJECTS . " as p on p.project_id = pa.project_id
											WHERE logged_by = @~~userid~~@ AND performed_on =  'A'
											ORDER BY pa.logged_time DESC limit @~~limit~~@";

											// "SELECT projects.project_id, projects.project_name,
											//  artefacts.artefact_title, project_activity.activity_id,
											//  project_activity.activity_type, project_activity.performed_on_id
											//  FROM " . TABLE_PROJECT_ACTIVITY . "
											//  JOIN " . TABLE_PROJECTS . " ON project_activity.project_id = projects.project_id
											//  JOIN " . TABLE_ARTEFACTS . " ON artefacts.artefact_id = project_activity.performed_on_id
											//  WHERE logged_by = @~~userid~~@ AND performed_on =  'A' AND projects.state = 'A' limit @~~limit~~@";


$AppGlobal['sql']['getProjectArtefactsWithSharePermission'] = "SELECT arts.* FROM " . TABLE_ARTEFACTS . " AS arts
																JOIN " . TABLE_ARTEFACTS_SHARED_MEMBERS. " AS memb ON arts.artefact_id = memb.artefact_id AND arts.latest_version_id = memb.artefact_ver_id
																JOIN " . TABLE_USERS . " AS user on memb.user_id = user.user_id
																WHERE memb.user_id = @~~userid~~@ AND arts.project_id = @~~projectid~~@";

$AppGlobal['sql']['getNonReferenceFiles'] = "SELECT DISTINCT sm.shared_date, a.artefact_id as id, v.artefact_ver_id, v.masked_artefact_version_id,
											v.created_date as artefact_time, a.linked_id, a.project_id, p.project_name,
											a.artefact_title as title, a.artefact_title as name, v.MIME_type,
											a.artefact_type as artefact_type, v.state AS status, v.version_no as version,
											u.name as person_name, u.user_id as owner_id from " . TABLE_ARTEFACTS . " a
											inner join ". TABLE_ARTEFACTS_VERSIONS ." v on a.latest_version_id = v.artefact_ver_id
											inner join ". TABLE_PROJECTS ." p on p.project_id = a.project_id
											inner join ". TABLE_USERS ." u on u.user_id = v.created_by
											inner join ". TABLE_ARTEFACTS_SHARED_MEMBERS ." sm on sm.artefact_ver_id = a.latest_version_id AND sm.artefact_id = a.artefact_id AND u.user_id = sm.user_id
											inner join ". TABLE_PROJECT_MEMBERS ." m on m.proj_id = p.project_id WHERE a.project_id = @~~projectId~~@ AND a.artefact_id
											NOT IN (SELECT artefact_id FROM artefact_ref_docs WHERE artefact_ver_id = @~~versionId~~@) AND a.state != 'D' AND a.latest_version_id !=@~~versionId~~@ ";

$AppGlobal['sql']['getNonLinkedFiles'] = "SELECT DISTINCT sm.shared_date, a.artefact_id as id, v.artefact_ver_id, v.masked_artefact_version_id,
											v.created_date as artefact_time, a.linked_id, a.project_id, p.project_name,
											a.artefact_title as title, a.artefact_title as name, v.MIME_type,
											a.artefact_type as artefact_type, v.state AS status, v.version_no as version,
											u.name as person_name, u.user_id as owner_id from " . TABLE_ARTEFACTS . " a
											inner join ". TABLE_ARTEFACTS_VERSIONS ." v on a.latest_version_id = v.artefact_ver_id
											inner join ". TABLE_PROJECTS ." p on p.project_id = a.project_id
											inner join ". TABLE_USERS ." u on u.user_id = v.created_by
											inner join ". TABLE_ARTEFACTS_SHARED_MEMBERS ." sm on sm.artefact_ver_id = a.latest_version_id AND sm.artefact_id = a.artefact_id AND u.user_id = sm.user_id
											inner join ". TABLE_PROJECT_MEMBERS ." m on m.proj_id = p.project_id WHERE a.project_id = @~~projectId~~@ AND a.state != 'D' AND a.artefact_id
											NOT IN (SELECT linked_to_id FROM artefact_links WHERE linked_from_id = @~~artefactId~~@ ) AND a.artefact_id NOT IN (SELECT linked_from_id FROM artefact_links WHERE linked_to_id = @~~artefactId~~@) AND a.artefact_id !=@~~artefactId~~@ ";

$AppGlobal['sql']['getProjectArtefacts'] = "SELECT DISTINCT
											a.artefact_id,
											v.artefact_ver_id as artefact_version_id,
											v.masked_artefact_version_id,
											CONVERT_TZ(
												(
													SELECT n.notification_date FROM notifications n
													JOIN notification_on_map no ON no.notification_on_id = n.notification_on
													JOIN notification_type_map nt ON nt.notification_type_id = n.notification_type
													JOIN notification_users_map nu ON nu.notification_id = n.notification_id
													WHERE nu.user_id =  @~~userid~~@ 					# user id
														AND no.notification_on_id = 1 					# notification on - Artefact
														AND nt.notification_type_id IN (1, 10, 11) 	# Add, Replace and Add version
														 AND n.notification_ref_id = a.latest_version_id
													ORDER BY n.notification_date
													LIMIT 1
												), 
												@@session.time_zone, 
												'+00:00'
											) as artefact_activity_date,  
											a.linked_id, 
											a.project_id, 
											p.project_name,
											a.artefact_title as artefact_name, 
											v.MIME_type,
											a.artefact_type, 
											v.state AS status, 
											v.version_no as version,
											u.name as user_name, 
											u.profile_pic_url as user_image, 
											u.user_id as user_id,
											(select count(t.comment_thread_id) from ". TABLE_COMMENT_THREADS ." as
												t WHERE a.latest_version_id = t.artefact_ver_id
											) as comment_count
											from " . TABLE_ARTEFACTS . " a
											inner join ". TABLE_NOTIFICATIONS ." n on n.notification_ref_id = a.latest_version_id
											inner join ". TABLE_ARTEFACTS_VERSIONS ." v on a.latest_version_id = v.artefact_ver_id
											inner join ". TABLE_PROJECTS ." p on p.project_id = a.project_id
											inner join ". TABLE_USERS ." u on u.user_id = @~~userid~~@
											inner join ". TABLE_ARTEFACTS_SHARED_MEMBERS ." sm on sm.artefact_ver_id = a.latest_version_id AND sm.artefact_id = a.artefact_id AND u.user_id = sm.user_id
											inner join ". TABLE_PROJECT_MEMBERS ." m on m.proj_id = p.project_id
											where m.user_id = @~~userid~~@ AND p.project_id = @~~projectid~~@ AND
											a.replace_ref_id is null
											AND a.state != 'A' AND a.state != 'D' ORDER BY @~~sortBy~~@";

$AppGlobal['sql']['getDownloadArtefact'] = "SELECT v.*, a.artefact_title from ". TABLE_ARTEFACTS_VERSIONS." as v JOIN 
											" .TABLE_ARTEFACTS. " as a ON v.artefact_id = a.artefact_id
											where v.artefact_id = @~~artefactid~~@";

$AppGlobal['sql']['getDownloadProject'] = "SELECT v.*, a.artefact_title, p.project_name from ". TABLE_ARTEFACTS_VERSIONS." as v 
											JOIN " .TABLE_ARTEFACTS. " as a ON v.artefact_id = a.artefact_id
											JOIN " .TABLE_PROJECTS. " as p ON a.project_id = p.project_id
											where a.project_id = @~~projectid~~@";										

$AppGlobal['sql']['getProjectArtefact'] = "SELECT 
											a.artefact_id as artefact_id, 
											v.artefact_ver_id as artefact_version_id, 
											v.masked_artefact_version_id,
											CONVERT_TZ(
												(
													SELECT n.notification_date FROM notifications n
													JOIN notification_on_map no ON no.notification_on_id = n.notification_on
													JOIN notification_type_map nt ON nt.notification_type_id = n.notification_type 
													JOIN notification_users_map nu ON nu.notification_id = n.notification_id
													WHERE nu.user_id =  @~~userid~~@ 					# user id
														AND no.notification_on_id = 1 					# notification on - Artefact
														AND nt.notification_type_id IN (1, 10, 11)   	# Add, Replace and Add version
													ORDER BY n.notification_date
													LIMIT 1
												), 
												@@session.time_zone, 
												'+00:00'
											) as artefact_activity_date, 
											a.linked_id, 
											a.project_id, 
											p.project_name,
											a.artefact_title as artefact_name, 
											v.MIME_type,
											a.artefact_type, 
											v.state AS status, 
											v.version_no as version,
											u.name as user_name, 
											u.profile_pic_url as user_image, 
											u.user_id as owner_id,
											(select count(t.comment_thread_id) from ". TABLE_COMMENT_THREADS ." as
												t WHERE a.latest_version_id = t.artefact_ver_id
											) as comment_count
											from " . TABLE_ARTEFACTS . " a
											inner join ". TABLE_ARTEFACTS_VERSIONS ." v on a.latest_version_id = v.artefact_ver_id
											inner join ". TABLE_PROJECTS ." p on p.project_id = a.project_id
											inner join ". TABLE_USERS ." u on u.user_id = v.created_by
											inner join ". TABLE_ARTEFACTS_SHARED_MEMBERS ." sm on sm.artefact_ver_id = a.latest_version_id AND sm.artefact_id = a.artefact_id AND u.user_id = sm.user_id
											inner join ". TABLE_PROJECT_MEMBERS ." m on m.proj_id = p.project_id
											where m.user_id = @~~userid~~@ AND p.project_id = @~~projectid~~@ AND
											v.artefact_ver_id = @~~artefactversionid~~@ AND
											a.replace_ref_id is null
											AND a.state != 'A' AND a.state != 'D'";


$AppGlobal['sql']['getSharedArtefacts'] = "SELECT DISTINCT
											a.artefact_id 			as artefact_id,
											a.latest_version_id 	as artefact_version_id,
											a.artefact_title 		as artefact_name, 
											a.artefact_type 		as artefact_type,
											av.masked_artefact_version_id, 
											av.state 				as artefact_version_state,
											av.MIME_type,
											p.project_id,
											p.project_name,
											(SELECT asm.access_type FROM artefact_shared_members asm where asm.artefact_ver_id = a.latest_version_id AND asm.user_id = @~~userid~~@) as permission,
											(SELECT max(asm.shared_date) FROM artefact_shared_members asm WHERE asm.artefact_id = a.artefact_id) AS artefact_activity_date,				# Artefact shared date with the user
											u.name as user_name,
											u.profile_pic_url as user_image,
											u.user_id as owner_id,
											(
												SELECT 
													COUNT(artefact_id) 
												FROM ". TABLE_ARTEFACTS_VERSIONS ." AS ver 
												WHERE ver.artefact_id = a.artefact_id
											) as version,
											(
												SELECT 
													COUNT(comment_thread_id) 
												FROM ". TABLE_COMMENT_THREADS ." t 
												WHERE a.latest_version_id = t.artefact_ver_id
											) as comment_count

											FROM artefact_shared_members asm

											JOIN users u ON u.user_id = @~~userid~~@
											JOIN artefacts a ON a.artefact_id = asm.artefact_id
											JOIN projects p ON a.project_id = p.project_id
											JOIN artefact_versions av ON av.artefact_ver_id = a.latest_version_id
											WHERE (asm.user_id = u.user_id OR asm.shared_by = u.user_id) AND
												asm.user_id != asm.shared_by AND	
												a.replace_ref_id is NULL AND 		# Artefact is not replaced
												a.state != 'A' AND 					# Artefact is not archived
												a.state != 'D' AND 					# Artefact is not deleted
												p.state = 'A'						# Project is in Active state
											ORDER BY artefact_activity_date DESC
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


// $AppGlobal['sql']['getNotifications'] = "SELECT 
// 											nots.notification_id as id, 
// 											nots.message as title, 
// 											nots.notification_type as type, 
// 											notification_ref_id as refId,
// 										 	av.masked_artefact_version_id, 
// 											av.MIME_type, nots.notification_date as time, 
// 											notifier.name as notifier, 
// 											nots.notification_by as notifierId
// 										 FROM " . TABLE_NOTIFICATIONS . " as nots
// 										 LEFT JOIN artefact_versions av ON nots.notification_ref_id = av.artefact_ver_id AND nots.notification_type =  'S'
// 										 JOIN " . TABLE_USERS . " as notifier on notifier.user_id = nots.notification_by
// 										 WHERE nots.user_id = @~~id~~@ ORDER BY nots.notification_date DESC LIMIT @~~limit~~@";

$AppGlobal['sql']['getNotifications'] = 'SELECT
											t1.notification_id,
											COALESCE(t4.artefact_title, t3.project_name) as notification_name,
											COALESCE(t2.artefact_ver_id, t3.project_id) as notification_ref_id,
											t2.masked_artefact_version_id,
											t2.MIME_type,
											CONVERT_TZ(
												t1.notification_date, 
												@@session.time_zone, 
												"+00:00"
											)  as time,
											CONCAT(UCASE(LEFT(t5.screen_name, 1)),LCASE(SUBSTRING(t5.screen_name, 2))) as notifier_name,
											t1.notification_by as notifier_id,
											t7.notification_type_name
											as notification_type,
											t8.notification_on_name
										   as notification_on,
											CONCAT(notification_type,"-",notification_on) as notification_type_name
										FROM notifications t1
										LEFT JOIN artefact_versions t2 ON t1.notification_ref_id = t2.artefact_ver_id AND
										t1.notification_on = 1 		#notification on artefact
										JOIN artefacts t4 ON t4.artefact_id = t2.artefact_id
										LEFT JOIN projects t3 ON t1.notification_ref_id = t3.project_id AND
										t1.notification_on = 2		#notification on project
										JOIN users t5 ON t5.user_id = t1.notification_by
										JOIN notification_users_map t6 ON t6.notification_id = t1.notification_id
										JOIN notification_type_map t7 ON t1.notification_type = t7.notification_type_id
                                        JOIN notification_on_map t8 ON t1.notification_on = t8.notification_on_id
										WHERE t6.user_id = @~~userid~~@ ORDER BY t1.notification_date DESC LIMIT @~~limit~~@';
$AppGlobal['sql']['getUserNotifications'] = 'SELECT
											t1.notification_id,
											COALESCE(t4.artefact_title, t3.project_name) as notification_name,
											COALESCE(t2.artefact_ver_id, t3.project_id) as notification_ref_id,
											t2.masked_artefact_version_id,
											t2.MIME_type,
											CONVERT_TZ(
												t1.notification_date,
												@@session.time_zone,
												"+00:00"
											)  as time,
											CONCAT(UCASE(LEFT(t5.screen_name, 1)),LCASE(SUBSTRING(t5.screen_name, 2))) as notifier_name,
											t1.notification_by as notifier_id,
											t7.notification_type_name
											as notification_type,
											t8.notification_on_name
										   as notification_on,
											CONCAT(notification_type,"-",notification_on) as notification_type_name
										FROM notifications t1
										LEFT JOIN artefact_versions t2 ON t1.notification_ref_id = t2.artefact_ver_id AND
										t1.notification_on = 1 		#notification on artefact
										JOIN artefacts t4 ON t4.artefact_id = t2.artefact_id
										LEFT JOIN projects t3 ON t1.notification_ref_id = t3.project_id AND
										t1.notification_on = 2		#notification on project
										JOIN users t5 ON t5.user_id = t1.notification_by
										JOIN notification_type_map t7 ON t1.notification_type = t7.notification_type_id
                                        JOIN notification_on_map t8 ON t1.notification_on = t8.notification_on_id
										WHERE t1.notification_by = @~~userid~~@ ORDER BY t1.notification_date DESC LIMIT @~~limit~~@';


$AppGlobal['sql']['getMeetingNotifications'] = 'SELECT
										t1.notification_id,
										COALESCE(t4.meeting_title, t3.project_name) as notification_name,
										COALESCE(t4.meeting_id, t3.project_id) as notification_ref_id,
										t2.masked_artefact_version_id,
										t2.MIME_type,
										CONVERT_TZ(
												t1.notification_date, 
												@@session.time_zone, 
												"+00:00"
											)  as time,
										CONCAT(UCASE(LEFT(t5.screen_name, 1)),LCASE(SUBSTRING(t5.screen_name, 2))) as notifier_name,
										t1.notification_by as notifier_id,
										t7.notification_type_name
										as notification_type,
										t8.notification_on_name
									    as notification_on,
										CONCAT(notification_type,"-",notification_on) as notification_type_name
										FROM notifications t1
										LEFT JOIN artefact_versions t2 ON t1.notification_ref_id = t2.artefact_ver_id AND
										t1.notification_on = 3 #notification on meeting
										JOIN meetings t4 ON t4.meeting_id = t1.notification_ref_id
										LEFT JOIN projects t3 ON t1.notification_ref_id = t3.project_id AND
										t1.notification_on = 2
										JOIN users t5 ON t5.user_id = t1.notification_by
										JOIN notification_users_map t6 ON t6.notification_id = t1.notification_id
										JOIN notification_type_map t7 ON t1.notification_type = t7.notification_type_id
		                                JOIN notification_on_map t8 ON t1.notification_on = t8.notification_on_id
										WHERE t6.user_id = @~~userid~~@ ORDER BY t1.notification_date DESC LIMIT @~~limit~~@';
$AppGlobal['sql']['getArtefactNotifications'] = 'SELECT DISTINCT
											t1.notification_id,
											COALESCE(t4.artefact_title, t3.project_name) as notification_name,
											COALESCE(t2.artefact_ver_id, t3.project_id) as notification_ref_id,
											t2.masked_artefact_version_id,
											t2.MIME_type,
											t1.notification_date as time,
											CONCAT(UCASE(LEFT(t5.screen_name, 1)),LCASE(SUBSTRING(t5.screen_name, 2))) as notifier_name,
											t1.notification_by as notifier_id,
											t7.notification_type_name
											as notification_type,
											t8.notification_on_name
										   as notification_on,
											CONCAT(t7.notification_type_name,"-",t8.notification_on_name) as notification_type_name
										FROM notifications t1
										LEFT JOIN artefact_versions t2 ON t1.notification_ref_id = t2.artefact_ver_id
										AND t1.notification_on = 1
										JOIN artefacts t4 ON t4.artefact_id = t2.artefact_id
										LEFT JOIN projects t3 ON t1.notification_ref_id = t3.project_id
										AND t1.notification_on = 2
										JOIN users t5 ON t5.user_id = t1.notification_by
										JOIN notification_users_map t6 ON t6.notification_id = t1.notification_id
										JOIN notification_type_map t7 ON t1.notification_type = t7.notification_type_id
                                        JOIN notification_on_map t8 ON t1.notification_on = t8.notification_on_id
										WHERE t6.user_id IN (@~~ids~~@) AND t1.notification_id IN (@~~notificationIds~~@)';

// $AppGlobal['sql']['getNotification'] = "SELECT
// 											nots.notification_id as id,
// 											nots.message as title,
// 											nots.notification_type as type,
// 											notification_ref_id as refId,
// 										 	av.masked_artefact_version_id, 
// 											av.MIME_type, nots.notification_date as time, 
// 											notifier.name as notifier, 
// 											nots.notification_by as notifierId
// 										 FROM " . TABLE_NOTIFICATIONS . " as nots
// 										 LEFT JOIN artefact_versions av ON nots.notification_ref_id = av.artefact_ver_id AND nots.notification_type =  'S'
// 										 JOIN " . TABLE_USERS . " as notifier on notifier.user_id = nots.notification_by
// 										 WHERE nots.user_id = @~~id~~@ && notification_id = @~~newNotification~~@";

$AppGlobal['sql']['getNotification'] = 'SELECT
											t1.notification_id,
											COALESCE(t4.artefact_title, t3.project_name) as notification_name,
											COALESCE(t2.artefact_ver_id, t3.project_id) as notification_ref_id,
											t2.masked_artefact_version_id,
											t2.MIME_type,
											CONVERT_TZ(
												t1.notification_date, 
												@@session.time_zone, 
												"+00:00"
											)  as time,
											CONCAT(UCASE(LEFT(t5.screen_name, 1)),LCASE(SUBSTRING(t5.screen_name, 2))) as notifier_name,
											t1.notification_by as notifier_id,
											t7.notification_type_name
											as notification_type,
											t8.notification_on_name
										   as notification_on,
											CONCAT(notification_type,"-",notification_on) as notification_type_name
										FROM notifications t1
										LEFT JOIN artefact_versions t2 ON t1.notification_ref_id = t2.artefact_ver_id
										AND t1.notification_on = 1
										JOIN artefacts t4 ON t4.artefact_id = t2.artefact_id
										LEFT JOIN projects t3 ON t1.notification_ref_id = t3.project_id
										AND t1.notification_on = 2
										JOIN users t5 ON t5.user_id = t1.notification_by
										JOIN notification_users_map t6 ON t6.notification_id = t1.notification_id
										JOIN notification_type_map t7 ON t1.notification_type = t7.notification_type_id
										JOIN notification_on_map t8 ON t1.notification_on = t8.notification_on_id
										WHERE t1.notification_id = @~~notificationid~~@';
$AppGlobal['sql']['getMeetingNotification'] = 'SELECT
											t1.notification_id,
											t4.meeting_title as notification_name,
											t4.meeting_id as notification_ref_id,
											t2.masked_artefact_version_id,
											t2.MIME_type,
											t1.notification_date as time,
											CONCAT(UCASE(LEFT(t5.screen_name, 1)),LCASE(SUBSTRING(t5.screen_name, 2))) as notifier_name,
											t1.notification_by as notifier_id,
											t7.notification_type_name
											as notification_type,
											t8.notification_on_name
										   as notification_on,
											CONCAT(notification_type,"-",notification_on) as notification_type_name
										FROM notifications t1
										LEFT JOIN artefact_versions t2 ON t1.notification_ref_id = t2.artefact_ver_id
										AND t1.notification_on = 1
										JOIN meetings t4 ON t4.meeting_id = t1.notification_ref_id AND t1.notification_on = 3
										LEFT JOIN projects t3 ON t1.notification_ref_id = t3.project_id
										AND t1.notification_on = 2
										JOIN users t5 ON t5.user_id = t1.notification_by
										JOIN notification_users_map t6 ON t6.notification_id = t1.notification_id
										JOIN notification_type_map t7 ON t1.notification_type = t7.notification_type_id
										JOIN notification_on_map t8 ON t1.notification_on = t8.notification_on_id
										WHERE t1.notification_id = @~~notificationid~~@ AND t7.notification_type_name = "@~~type~~@"';


// Same as getNotifications query but with additional where clause to filter by project id
$AppGlobal['sql']['getProjectActivities'] = 'SELECT
											t1.notification_id,
											COALESCE(t4.artefact_title, t3.project_name) as notification_name,
											COALESCE(t2.artefact_ver_id, t3.project_id) as notification_ref_id,
											t2.masked_artefact_version_id,
											t2.MIME_type,
											CONVERT_TZ(
												t1.notification_date, 
												@@session.time_zone, 
												"+00:00"
											)  as time,
											CONCAT(UCASE(LEFT(t5.screen_name, 1)),LCASE(SUBSTRING(t5.screen_name, 2))) as notifier_name,
											t1.notification_by as notifier_id,
											t7.notification_type_name
											as notification_type,
											t8.notification_on_name
										   as notification_on,
											CONCAT(notification_type,"-",notification_on) as notification_type_name
										FROM notifications t1
										LEFT JOIN artefact_versions t2 ON t1.notification_ref_id = t2.artefact_ver_id
										AND t1.notification_on = 1
										JOIN artefacts t4 ON t4.artefact_id = t2.artefact_id
										LEFT JOIN projects t3 ON t1.notification_ref_id = t3.project_id
										AND t1.notification_on = 2
										JOIN users t5 ON t5.user_id = t1.notification_by
										JOIN notification_users_map t6 ON t6.notification_id = t1.notification_id
										JOIN notification_type_map t7 ON t1.notification_type = t7.notification_type_id
                                        JOIN notification_on_map t8 ON t1.notification_on = t8.notification_on_id
										WHERE t6.user_id = @~~userid~~@ AND t1.project_id = @~~projectid~~@ ORDER BY t1.notification_date DESC';

$AppGlobal['sql']['getMeetingNotificationDetails'] = "SELECT meeting_time as time, meeting_title as title FROM " . TABLE_MEETINGS . " WHERE meeting_id = @~~id~~@";

$AppGlobal['sql']['notificationTypeIdFromTypeName'] = "SELECT * FROM notification_type_map WHERE notification_type_name = @~~typename~~@";

$AppGlobal['sql']['notificationOnIdFromOnName'] = "SELECT * FROM notification_on_map WHERE notification_on_name = @~~onname~~@";

$AppGlobal['sql']['getMeetingInfoFromId'] = "SELECT * FROM meetings WHERE meeting_id = @~~meetingid~~@";

$AppGlobal['sql']['getParticipantsFromMeetingId'] = "SELECT * FROM meeting_participents WHERE meeting_id = @~~meetingid~~@";

$AppGlobal['sql']['matchUsers'] = "SELECT screen_name AS title, user_id AS id FROM " . TABLE_USERS . " WHERE screen_name LIKE @~~string~~@";

$AppGlobal['sql']['getUsers'] = "SELECT * FROM users WHERE user_id IN (@~~userids~~@)";

$AppGlobal['sql']['matchArtefacts'] = "SELECT artefacts.artefact_id AS id, artefacts.artefact_title
										FROM " . TABLE_ARTEFACTS . " AS artefacts
										INNER JOIN " . TABLE_ARTEFACTS_VERSIONS . " AS versions ON
										artefacts.latest_version_id = versions.artefact_ver_id
										AND
										artefacts.artefact_id = versions.artefact_id
										WHERE artefact_title LIKE @~~string~~@";

$AppGlobal['sql']['matchProjects'] = "SELECT project_name AS title, project_id AS id FROM " . TABLE_PROJECTS . " WHERE project_name LIKE @~~string~~@";


$AppGlobal['sql']['getTeamMembersList'] = "SELECT u.user_id as id, m.proj_id, u.name, u.email, u.profile_pic_url as picture, m.access_type,
											IF(p.created_by=u.user_id, 1, 0) as is_owner FROM " . TABLE_PROJECT_MEMBERS . " m
											INNER JOIN " . TABLE_USERS . " u ON m.user_id = u.user_id
											INNER JOIN " . TABLE_PROJECTS . " p ON p.project_id = m.proj_id
											WHERE m.proj_id = @~~projectId~~@";

$AppGlobal['sql']['getTeamMembers'] = "SELECT u.user_id as id, m.proj_id, u.name, u.email, u.profile_pic_url as picture, 
										m.access_type FROM " . TABLE_PROJECT_MEMBERS . " m
											INNER JOIN " . TABLE_USERS . " u ON m.user_id = u.user_id
											INNER JOIN " . TABLE_PROJECTS . " p ON p.project_id = m.proj_id
											WHERE m.proj_id = @~~projectId~~@";						


$AppGlobal['sql']['getTeamMember'] = "SELECT u.user_id as id, m.proj_id, u.name, u.email, u.profile_pic_url as picture, m.access_type,
											IF(p.created_by=u.user_id, 1, 0) as is_owner FROM " . TABLE_PROJECT_MEMBERS . " m
											INNER JOIN " . TABLE_USERS . " u ON m.user_id = u.user_id
											INNER JOIN " . TABLE_PROJECTS . " p ON p.project_id = m.proj_id
											WHERE u.user_id IN (@~~userid~~@) AND m.proj_id = @~~projectid~~@";


$AppGlobal['sql']['getArtefactSharedMembersListFromVersionId'] = "SELECT t1.user_id as id, t3.project_id as proj_id, t4.name, t4.email, t4.profile_pic_url as picture, t1.access_type, IF(t2.created_by=t4.user_id, 1, 0) as is_owner
													FROM artefact_shared_members t1
													JOIN artefact_versions t2 ON t2.artefact_ver_id = t1.artefact_ver_id
													JOIN artefacts t3 ON t3.artefact_id = t2.artefact_id
													JOIN users t4 ON t4.user_id = t1.user_id
													WHERE t1.artefact_ver_id = @~~versionid~~@";


$AppGlobal['sql']['getTagsList'] = "SELECT tags.tag_id as id, tags.tag_name as name from " . TABLE_USERS . " AS users
											INNER JOIN " . TABLE_ORGANIZATIONS . " AS organizations ON
											users.org_id = organizations.org_id
											INNER JOIN " . TABLE_TAGS . " AS tags ON
											tags.org_id = organizations.org_id
											where users.user_id = @~~userId~~@";

$AppGlobal['sql']['getTagsName'] = "SELECT tags.tag_id as id from " . TABLE_TAGS . " AS tags
											where tags.tag_name = @~~tagName~~@";


$AppGlobal['sql']['matchTags'] = "SELECT artefacts.artefact_id AS id, artefacts.artefact_title AS title FROM artefacts, artefact_tags_map, tags
                                        WHERE artefacts.artefact_id = artefact_tags.artefact_id AND artefact_tags.tag_id= tags.tag_id AND tags.tag_name LIKE @~~string~~@";


$AppGlobal['sql']['getLatestVerionOfArtefact'] = "SELECT a.latest_version_id AS verId, av.version_no as version FROM " . TABLE_ARTEFACTS . " AS a
												INNER JOIN " . TABLE_ARTEFACTS_VERSIONS . " AS av ON av.artefact_ver_id = a.latest_version_id
 												WHERE a.artefact_id = @~~artId~~@";

$AppGlobal['sql']['getLatestArtefactMaskedVersionId'] = "SELECT masked_artefact_version_id AS maskedVerId FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE 																artefact_ver_id = @~~newVer~~@";

$AppGlobal['sql']['getVerionDetailsOfArtefact'] = "SELECT * FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@ and artefact_ver_id in
													(SELECT latest_version_id FROM " . TABLE_ARTEFACTS . " WHERE artefact_id = @~~artId~~@) ";

$AppGlobal['sql']['getArtefactLinkId'] = "SELECT artefacts.linked_id FROM " . TABLE_ARTEFACTS . " AS artefacts where artefacts.artefact_id = @~~artefactid~~@";

$AppGlobal['sql']['getMaxLinkId'] = "SELECT MAX(artefacts.linked_id) as linked_id FROM " . TABLE_ARTEFACTS . " AS artefacts";

$AppGlobal['sql']['getArtefactsLink'] = "SELECT DISTINCT artefacts.artefact_id,artefacts.linked_id FROM " . TABLE_ARTEFACTS . " AS artefacts
										JOIN ". TABLE_ARTEFACTS_SHARED_MEMBERS ." AS members ON
										members.artefact_id = artefacts.artefact_id
										WHERE artefacts.project_id = @~~projectid~~@ AND artefacts.replace_ref_id is null
										AND (members.user_id = @~~userid~~@ or members.shared_by = @~~userid~~@)
										ORDER BY artefacts.linked_id";

$AppGlobal['sql']['getArtefactInfo'] = "SELECT * FROM " . TABLE_ARTEFACTS . " WHERE artefact_id = @~~artefactid~~@";

$AppGlobal['sql']['getReferences'] = "SELECT DISTINCT
				 						artefacts.artefact_id as artefact_id,
										artefacts.artefact_type as artefact_type,
										artefacts.artefact_title as artefact_name,
										versions.created_date as date,
										versions.artefact_ver_id as artefact_version_id,
										versions.version_no as version_no,
										requestor.name as user_name

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
										artefacts.artefact_id != @~~ignore~~@ AND artefacts.artefact_id != @~~artefactid~~@ AND
										artefacts.state != 'A' AND artefacts.state != 'D' AND artefacts.project_id = @~~projectid~~@";

$AppGlobal['sql']['getProjectActivity'] = "SELECT p.project_name, pa.logged_time as time,
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
											FROM " .
											TABLE_PROJECT_ACTIVITY . " as pa
											JOIN " . TABLE_USERS . " as actBy
											on
											actBy.user_id = pa.logged_by
											join " . TABLE_PROJECTS . " as p on p.project_id = pa.project_id
											WHERE
											pa.project_id = @~~projectid~~@
											ORDER BY pa.logged_time DESC";


$AppGlobal['sql']['getProjectSingleActivity'] = "SELECT p.project_name, pa.logged_time as time,
											artefacts.artefact_title as activityName,
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
											FROM " .
											TABLE_PROJECT_ACTIVITY . " as pa
											JOIN " . TABLE_USERS . " as actBy
											on
											actBy.user_id = pa.logged_by
											join " . TABLE_PROJECTS . " as p on p.project_id = pa.project_id
											JOIN " . TABLE_ARTEFACTS . " AS artefacts on artefacts.artefact_id = pa.performed_on_id
											WHERE
											pa.project_id = @~~projectid~~@ AND pa.activity_id = @~~activityid~~@";


$AppGlobal['sql']['getMyRecentActivity'] = "";

$AppGlobal['sql']['getMeetingNotes'] = "SELECT users.user_id as userId, notes.participant_notes as notes, notes.is_public as isPublic, users.profile_pic_url as profilePic, users.name as userName
										FROM " . TABLE_MEETING_NOTES . " as notes
										JOIN " . TABLE_USERS . " as users ON
										notes.participant_id = users.user_id
										WHERE meeting_id = @~~meetingId~~@ and users.user_id != @~~userId~~@ and notes.is_public = 1";

$AppGlobal['sql']['getMeetingDetails'] = "SELECT
											proj.project_name as project_name,
											arts.artefact_title as artefact_name,
											user.name as created_by,
											meets.meeting_time as meeting_date,
											DATE_FORMAT(meets.meeting_time, '%H:%i') as meeting_date_from_time,
											DATE_FORMAT(meets.meeting_end_time, '%H:%i') as meeting_date_to_time,
											meets.venue as venue,
											meets.meeting_agenda as agenda,
											notes.meeting_id,
											notes.is_public,
											meets.project_id as project_id,
											notes.participant_notes as user_notes,
											participant.user_id as participant_id,
											participant.name as participant_name,
											participant.profile_pic_url as participant_pic
											FROM " . TABLE_MEETINGS . " AS  meets
											JOIN " . TABLE_MEETING_NOTES . " as notes on
											notes.meeting_id = @~~meetingId~~@ and participant_id = @~~userId~~@
											JOIN " . TABLE_PROJECTS . " AS proj ON
											proj.project_id = meets.project_id
											JOIN " . TABLE_ARTEFACTS . " as arts ON
											arts.artefact_id = meets.meeting_on_artefact_id
											JOIN " . TABLE_USERS . " as user ON
											user.user_id = meets.created_by
											JOIN " . TABLE_USERS . " as participant ON
											participant.user_id = @~~userId~~@
											WHERE meets.meeting_id = @~~meetingId~~@";


$AppGlobal['sql']['getMeetingParticipants'] = "SELECT user.user_id as id, user.name as participentName, user.profile_pic_url
												FROM " . TABLE_MEETING_PARTICIPENTS . " AS parts
												JOIN " . TABLE_USERS . " AS user ON
												user.user_id = parts.participent_id
												WHERE parts.meeting_id = @~~meetingId~~@";

$AppGlobal['sql']['getDocumentDetails'] = "SELECT arts.artefact_id as artefactId,
											arts.artefact_title as title,
											(SELECT COUNT(artefact_ver_id) FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@) as version,
											(SELECT COUNT(comment_thread_id) FROM " . TABLE_COMMENT_THREADS . " as thread WHERE arts.latest_version_id = thread.artefact_ver_id) as comment_count,
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

$AppGlobal['sql']['getTagsWithArtefactId'] = "SELECT tag_name from tags, artefact_tags_map where artefact_id = @~~artId~~@ AND tags.tag_id = artefact_tags_map.tag_id";

$AppGlobal['sql']['getTagIdsWithArtefactId'] = "SELECT tag_id from artefact_tags_map where artefact_id = @~~artId~~@ ";

$AppGlobal['sql']['deleteWithArtIdTagIdTagName'] = "DELETE a , t from artefact_tags_map a INNER JOIN tags t WHERE a.artefact_id = @~~artId~~@ AND t.tag_name = @~~tagName~~@ AND a.tag_id = t.tag_id";

$AppGlobal['sql']['getDocumentSharedDetails'] = "SELECT user.user_id as id,
												user.name as name,
												user.email as email,
												user.profile_pic_url as profilePic,
												members.access_type as permission,
												(SELECT COUNT(comment_thread_id) from " . TABLE_COMMENT_THREADS . " as thread WHERE
												arts.latest_version_id = thread.artefact_ver_id and thread.comment_thread_by = user.user_id) as comment_count
												FROM " . TABLE_ARTEFACTS . " as arts
												JOIN " . TABLE_ARTEFACTS_SHARED_MEMBERS . " as members on
												members.artefact_ver_id = arts.latest_version_id
												JOIN " . TABLE_USERS . " as user on
												members.user_id = user.user_id
												WHERE arts.artefact_id = @~~artId~~@";

$AppGlobal['sql']['getDocumentReferences'] = "SELECT refs.artefact_id as id,
											refs.artefact_title as name,
											docs.artefact_ver_id as artefact_version_id
											FROM  " . TABLE_ARTEFACTS . " as arts
											join " . TABLE_ARTEFACT_REFS . " as docs on
											arts.latest_version_id = docs.artefact_ver_id
											join " . TABLE_ARTEFACTS . " as refs on
											docs.artefact_id = refs.artefact_id
											where arts.artefact_id = @~~artId~~@";

$AppGlobal['sql']['getDocumentLinks'] = "SELECT DISTINCT a.artefact_id as id, v.artefact_ver_id as artefact_version_id, v.masked_artefact_version_id,
											v.created_date as artefact_time, a.linked_id, a.project_id, p.project_name,
											a.artefact_title as title, a.artefact_title as name, v.MIME_type,
											a.artefact_type as artefact_type, v.state AS status, v.version_no as version,
											u.name as person_name, u.user_id as owner_id from " . TABLE_ARTEFACTS . " a
											inner join ". TABLE_ARTEFACTS_VERSIONS ." v on a.latest_version_id = v.artefact_ver_id
											inner join ". TABLE_PROJECTS ." p on p.project_id = a.project_id
											inner join ". TABLE_USERS ." u on u.user_id = v.created_by
											inner join ". TABLE_ARTEFACTS_SHARED_MEMBERS ." sm on sm.artefact_ver_id = a.latest_version_id AND sm.artefact_id = a.artefact_id AND u.user_id = sm.user_id
											 AND a.state != 'D' AND a.artefact_id
											IN (SELECT linked_to_id FROM artefact_links WHERE linked_from_id = @~~artId~~@ ) OR a.artefact_id IN (SELECT linked_from_id FROM artefact_links WHERE linked_to_id = @~~artId~~@) AND a.artefact_id !=@~~artId~~@";

$AppGlobal['sql']['getAllVersionsOfArtefact'] = "SELECT * FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@";

// @TODO Highest version number is being fetched using count. I think we should use MAX instead of COUNT here.
$AppGlobal['sql']['getHighestVersionOfArtefact'] = "SELECT count(version_no) as vers FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id = @~~artId~~@";

$AppGlobal['sql']['getProjectOfArtefact'] = "SELECT project_id FROM " . TABLE_ARTEFACTS . " WHERE artefact_id = @~~artId~~@";

$AppGlobal['sql']['getProjectfromVersionId'] = "SELECT a.project_id FROM " . TABLE_ARTEFACTS . " a
												inner join ". TABLE_ARTEFACTS_VERSIONS ." v on a.artefact_id = v.artefact_id
 												WHERE v.artefact_ver_id = @~~artefactVerId~~@";

$AppGlobal['sql']['getOtherMembersList'] = "SELECT users.user_id as id, users.name, users.email, users.profile_pic_url as picture
											FROM " . TABLE_USERS . " AS users WHERE users.user_id NOT IN
											(SELECT members.user_id
											FROM " . TABLE_PROJECT_MEMBERS . " AS members
											WHERE members.proj_id = @~~projectId~~@)" ;

$AppGlobal['sql']['getAllPeopleSpecificToAProject'] = "SELECT
															users.user_id as id,
															users.name,
															users.email,
															users.profile_pic_url as picture,
															(
																IF (
																	(
																		SELECT
																			COUNT(t1.user_id)
																		FROM
																			artefact_shared_members AS t1
																		WHERE
																			t1.artefact_ver_id = @~~versionid~~@
																			AND users.user_id = t1.user_id
																	),
																	1,
																	0
																)
															) as in_project
														FROM
															users AS users";

$AppGlobal['sql']['getArtefactDetails'] = "SELECT proj.project_name as project_name, proj.project_id as project_id, arts.artefact_title as artefact_name, MIME_type as type, vers.artefact_ver_id as artefact_version_id, vers.masked_artefact_version_id, arts.artefact_id, arts.description as artefact_description,arts.artefact_type,vers.version_no as versionCount, IF(vers.created_by = @~~userid~~@, 1, 0) as is_owner
											FROM " . TABLE_ARTEFACTS . " AS arts
											JOIN " . TABLE_PROJECTS . " AS proj ON
											proj.project_id = arts.project_id
											JOIN " . TABLE_ARTEFACTS_VERSIONS . " as vers ON
											arts.artefact_id = vers.artefact_id
											WHERE vers.masked_artefact_version_id = @~~maskedArtefactVersionId~~@";

$AppGlobal['sql']['getArtefactFromVersionId'] = "SELECT * FROM " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_ver_id = @~~artefactversionid~~@";

$AppGlobal['sql']['getArtefactVersionSummary'] = "SELECT vers.artefact_ver_id as versionId, vers.masked_artefact_version_id, vers.version_no as versionNo, vers.document_path as documentPath, vers.MIME_type as type,
												 vers.version_label as label, vers.created_by as authorId, vers.created_date as createdDate, user.name as authorName, shared,
												(SELECT COUNT(comment_thread_id) FROM " . TABLE_COMMENT_THREADS . " as thread where
												vers.artefact_ver_id = thread.artefact_ver_id) as comment_count
												FROM " . TABLE_ARTEFACTS_VERSIONS . " AS vers
												JOIN " . TABLE_USERS . " AS user on
												user.user_id = vers.created_by
												WHERE artefact_id = (SELECT artefact_id from artefact_versions where masked_artefact_version_id = @~~maskedArtefactVersionId~~@) ORDER BY versionNo";

$AppGlobal['sql']['getArtefactVersionShared'] = "SELECT user.user_id as id, user.name as name, user.profile_pic_url as profilePic, membs.access_type as permission
												FROM " . TABLE_ARTEFACTS_SHARED_MEMBERS . " as membs
												JOIN " . TABLE_USERS . " AS user on
												user.user_id = membs.user_id
												WHERE artefact_ver_id = @~~verId~~@";

$AppGlobal['sql']['getArtefactVersionComments'] = "SELECT thread.comment_thread_id as commentId, user.name,
												  thread.comment_thread_by as commentorId, comment.description
												  FROM " . TABLE_COMMENT_THREADS . " as thread
												  JOIN " . TABLE_USERS . " as user on
												  thread.comment_thread_by = user.user_id
												  JOIN " . TABLE_COMMENTS . " as comment on
												  comment.comment_thread_id = thread.comment_thread_id
												  WHERE thread.artefact_ver_id = @~~verId~~@";

//document summary view related queries
$AppGlobal['sql']['getLinkedArtefactList'] = "SELECT DISTINCT * FROM " . TABLE_ARTEFACTS . " WHERE linked_id!=0 and linked_id =
											(SELECT linked_id from " . TABLE_ARTEFACTS . " where artefact_id =
											(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " where masked_artefact_version_id = @~~maskedVerId~~@))";

$AppGlobal['sql']['getReferenceArtefactList'] = "SELECT DISTINCT arts.artefact_title as title FROM " . TABLE_ARTEFACT_REFS . " as refs
											JOIN " . TABLE_ARTEFACTS . " as arts on
											refs.artefact_id = arts.artefact_id
											WHERE refs.artefact_ver_id in
											(SELECT artefact_ver_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id =
											(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE masked_artefact_version_id = @~~maskedVerId~~@))";


$AppGlobal['sql']['getArtefactTagList'] = "SELECT artTags.tag_id as tag_id, tag.tag_name as tag_name FROM artefact_tags_map artTags
											JOIN tags as tag ON artTags.tag_id = tag.tag_id WHERE artefact_id = @~~artefactId~~@";


$AppGlobal['sql']['getArtefactVersionsList'] = "SELECT DISTINCT * from " . TABLE_ARTEFACTS_VERSIONS . " WHERE artefact_id =
											(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE masked_artefact_version_id = @~~maskedVerId~~@)";

$AppGlobal['sql']['getArtefactSharedMembersList'] = "SELECT DISTINCT user.user_id as userId, user.name as name, user.email as email, user.profile_pic_url as userImage,
													(select count(comment_thread_id) from ". TABLE_COMMENT_THREADS ." as thread
													WHERE
													thread.artefact_ver_id IN (select artefact_ver_id from " . TABLE_ARTEFACTS_VERSIONS . " where masked_artefact_version_id = @~~maskedVerId~~@)
													and thread.comment_thread_by = user.user_id) as comment_count
													from " . TABLE_ARTEFACTS_SHARED_MEMBERS . " as membs
													JOIN " . TABLE_USERS . " as user on
													membs.user_id = user.user_id
													WHERE membs.artefact_id =
													(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE masked_artefact_version_id = @~~maskedVerId~~@) and user.user_id!=@~~userId~~@";

$AppGlobal['sql']['artefactBasicDetails'] = "SELECT arts.artefact_title as artefact_title,arts.artefact_id as artefact_id, arts.project_id as project_id,arts.artefact_type as artefact_type,vers.version_no as versionNo,vers.artefact_ver_id as versionId, arts.latest_version_id, user.name as authorName, user.profile_pic_url as authorImage,
											(select count(comment_thread_id) from ". TABLE_COMMENT_THREADS ." as thread
											WHERE
											thread.artefact_ver_id IN (select artefact_ver_id from " . TABLE_ARTEFACTS_VERSIONS . " where masked_artefact_version_id = @~~maskedVerId~~@)) as comment_count, vers.state as status
											FROM " . TABLE_ARTEFACTS . " as arts
											JOIN " . TABLE_ARTEFACTS_VERSIONS . " as vers on
											vers.masked_artefact_version_id = @~~maskedVerId~~@
											JOIN " . TABLE_USERS . " as user on
											user.user_id = vers.created_by
											WHERE arts.artefact_id = (SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE masked_artefact_version_id = @~~maskedVerId~~@)";

//summary timeline related queries
$AppGlobal['sql']['getTimeLineMeetings'] = "SELECT m.meeting_id,m.meeting_title,n.notification_date as created_date,m.meeting_time, nt.notification_type_name FROM meetings as m
											JOIN notifications as n ON m.meeting_id = n.notification_ref_id AND n.notification_on = 3
											JOIN notification_type_map as nt ON n.notification_type = nt.notification_type_id
											WHERE m.meeting_on_artefact_id =(SELECT artefact_id FROM artefact_versions where masked_artefact_version_id = @~~maskedVerId~~@)
											ORDER BY n.notification_date";

$AppGlobal['sql']['getTimeLineReferences'] = "SELECT * FROM " . TABLE_ARTEFACT_REFS ." r WHERE r.artefact_id =
											(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " v WHERE v.masked_artefact_version_id = @~~maskedVerId~~@) ORDER BY r.created_date";

$AppGlobal['sql']['getTimeLineLinks'] = "SELECT * FROM " . TABLE_ARTEFACT_LINKS .  " where linked_from_id =
										(SELECT artefact_id from " . TABLE_ARTEFACTS_VERSIONS . " WHERE masked_artefact_version_id = @~~maskedVerId~~@) and while_creation = 0 ORDER BY linked_date";

$AppGlobal['sql']['getTimeLineUsers'] = "SELECT n.notification_date as created_date , n.notification_id FROM notifications n
									    WHERE n.notification_type = 1 AND n.notification_on = 4 AND n.notification_ref_id = @~~refId~~@";
$AppGlobal['sql']['getAddedUsers'] = "SELECT u.name,u.profile_pic_url FROM notification_users_map nu
									  JOIN users u ON u.user_id = nu.user_id
									  JOIN notifications n ON n.notification_id = nu.notification_id
									  WHERE n.notification_id = @~~notification_id~~@ AND u.user_id != @~~userId~~@";

$AppGlobal['sql']['getTimeLineSharedMembers'] = "SELECT n.notification_date as created_date ,u.name ,u.profile_pic_url  FROM notification_users_map nu
												JOIN notifications n ON n.notification_id = nu.notification_id
												JOIN users u ON u.user_id = nu.user_id
									    		WHERE n.notification_type = 3 AND n.notification_on = 1 AND n.notification_ref_id = @~~refId~~@ AND u.user_id != @~~userId~~@";
$AppGlobal['sql']['getTimeLineUserRemoved'] = "SELECT n.notification_date as created_date ,u.name ,u.profile_pic_url  FROM notification_users_map nu
												JOIN notifications n ON n.notification_id = nu.notification_id
												JOIN users u ON u.user_id = nu.user_id
									    		WHERE n.notification_type = 7 AND n.notification_on = 4 AND n.notification_ref_id = @~~refId~~@ AND u.user_id != @~~userId~~@";
$AppGlobal['sql']['getTimeLineArtefact'] = "SELECT n.notification_date as created_date ,n.project_id FROM notifications n
												WHERE n.notification_type = @~~notificationType~~@ AND n.notification_on = @~~notificationOn~~@ AND n.notification_ref_id = @~~refId~~@";
//Get comments timeline
$AppGlobal['sql']['getTimeLineComments'] ="SELECT DISTINCT n.notification_date as created_date, c.comment_by, u.profile_pic_url FROM artefact_comment_threads ct
											JOIN artefact_comments c ON ct.comment_thread_id=c.comment_thread_id
											JOIN notifications n ON n.notification_ref_id = ct.artefact_ver_id
											JOIN users u on c.comment_by = u.user_id
											WHERE n.notification_ref_id = @~~refId~~@ AND n.notification_on = 5 AND n.notification_type = 1";
// Get Organization id from users table
$AppGlobal['sql']['getUserOrganizationId'] = "SELECT org_id FROM " . TABLE_USERS . " WHERE user_id = @~~user_id~~@";

// Get Organization id from projects table
$AppGlobal['sql']['getProjectOrganizationId'] = "SELECT org_id FROM " . TABLE_PROJECTS . " WHERE project_id = @~~project_id~~@";

// Get comment threads from artefact version
$AppGlobal['sql']['getArtefactCommentThreads'] = "SELECT
														comment_thread_id,
														posx,
														posy, 
														page_no,
														severity,
														category,
														is_private,
														t1.state
													FROM
														" . TABLE_COMMENT_THREADS . " t1
													JOIN artefact_versions t2 ON t2.artefact_ver_id = t1.artefact_ver_id
													WHERE
														t1.artefact_ver_id = @~~artefactVerId~~@
														AND (
															is_private = 0
															OR comment_thread_by = @~~userid~~@
													        OR t2.created_by = @~~userid~~@
														)";

$AppGlobal['sql']['getCommentInfoFromCommentId'] = "SELECT * FROM artefact_comments where comment_id = @~~commentid~~@"; 

// Get comments from comment thread ids
$AppGlobal['sql']['getComments'] = "SELECT 
										comment_id, 
										is_submitted, 
										comment_thread_id, 
										u.name as user,
										u.user_id as userId, 
										created_at as time, 
										description 
									FROM " . TABLE_COMMENTS . " c 
									INNER JOIN " . TABLE_USERS . " u 
										ON u.user_id = c.comment_by 
										WHERE comment_thread_id in 
											(@~~commentThreadIds~~@) 
											AND (is_submitted = 1 OR comment_by = @~~userid~~@)";

// Get artefact comment thread
$AppGlobal['sql']['getArtefactCommentThread'] = "SELECT comment_thread_id, posx, posy, page_no, severity, category, is_private, state FROM " . TABLE_COMMENT_THREADS .
													" WHERE comment_thread_id = @~~commentThreadId~~@";


$AppGlobal['sql']['getCommentThread'] = "SELECT * FROM " . TABLE_COMMENT_THREADS . " t inner join " . TABLE_ARTEFACTS_VERSIONS .
											" v on t.artefact_ver_id = v.artefact_ver_id where t.artefact_ver_id = @~~artefactVerId~~@ AND t.comment_thread_id = @~~commentThreadId~~@";

$AppGlobal['sql']['getCommentSummary'] = "SELECT ct.comment_thread_id as commentThreadId,ct.category as category,ct.severity as severity,
										     ct.state as commentState,c.created_at as time ,c.description as description ,u.name as user ,u.profile_pic_url as profilePic
											 FROM artefact_comment_threads ct
											 JOIN artefact_comments c ON ct.comment_thread_id = c.comment_thread_id
											 JOIN users u ON ct.comment_thread_by = u.user_id
											 WHERE artefact_ver_id = @~~versionId~~@";
$AppGlobal['sql']['getCommentedMembers'] = "SELECT DISTINCT u.name, u.user_id as userId FROM artefact_comment_threads ct
											JOIN users u ON ct.comment_thread_by = u.user_id
											 WHERE artefact_ver_id = @~~versionId~~@";

$AppGlobal['sql']['getEarliestDate'] = "SELECT MIN(c.created_at) as earliestDate
										FROM artefact_comments c
										JOIN artefact_comment_threads ct ON ct.comment_thread_id = c.comment_thread_id
										WHERE c.comment_thread_id IN (@~~threadIds~~@)";
//GEt Project Details
$AppGlobal['sql']['getProjectDetails'] = "SELECT project_name, description, state, project_id, created_by  as projectOwner FROM projects WHERE project_id = @~~projectId~~@";

// Get users from emails
$AppGlobal['sql']['getUserIdsFromEmails'] = "SELECT user_id FROM " . TABLE_USERS . " WHERE email in (@~~emailIds~~@)";

$AppGlobal['sql']['getUserIdsFromUserIds'] = "SELECT user_id FROM " . TABLE_USERS . " WHERE user_id in (@~~userids~~@)";


// Get project members
$AppGlobal['sql']['getProjectMembers'] = "SELECT * FROM " . TABLE_PROJECT_MEMBERS . " WHERE proj_id = @~~project_id~~@";

// Get artefacts & versions of a project
$AppGlobal['sql']['getAllArtefactsOfProject'] = "SELECT a.artefact_id, v.artefact_ver_id as artefact_version_id FROM " . TABLE_ARTEFACTS . " a JOIN " .
											TABLE_ARTEFACTS_VERSIONS . " v ON a.artefact_id = v.artefact_id WHERE a.project_id = @~~projectId~~@";

// Get comments severities in an artefact version Id
$AppGlobal['sql']['getArtefactCommentSeverities'] = "SELECT t.artefact_ver_id, t.severity FROM " . TABLE_COMMENT_THREADS ." t WHERE
														artefact_ver_id = @~~artefact_ver_id~~@ group by t.severity";


// Get latest artefact shared value
$AppGlobal['sql']['getLatestArtefactSharedValue'] = "SELECT shared FROM " . TABLE_ARTEFACTS_VERSIONS . " v join " . TABLE_ARTEFACTS .
														" a on a.latest_version_id = v.artefact_ver_id WHERE a.artefact_id = @~~artId~~@";


$AppGlobal['sql']['getArtefactSharedMembers'] = "SELECT u.user_id AS id, u.name, u.email, u.profile_pic_url AS picture, asm.access_type, asm.shared_by,
													IF( p.created_by = u.user_id, 1, 0 ) AS is_owner FROM " . TABLE_ARTEFACTS_SHARED_MEMBERS ." asm
													INNER JOIN " . TABLE_USERS . " u ON asm.user_id = u.user_id
													INNER JOIN " . TABLE_ARTEFACTS . " a ON a.artefact_id = asm.artefact_id
													INNER JOIN " . TABLE_PROJECTS . " p ON p.project_id = a.project_id
													WHERE asm.artefact_id =@~~artId~~@";


$AppGlobal['sql']['getArtefactType'] = "SELECT artefact_type FROM " . TABLE_ARTEFACTS . " WHERE artefact_id = @~~artId~~@";

$AppGlobal['sql']['getUserIdFromEmail'] = "SELECT user_id, email FROM " . TABLE_USERS . " WHERE email = @~~email~~@";

$AppGlobal['sql']['submitComments'] = "UPDATE artefact_comments t1
JOIN artefact_comment_threads t2 ON t1.comment_thread_id = t2.comment_thread_id
SET t1.is_submitted = 1
WHERE t2.artefact_ver_id = @~~artefactversionid~~@ AND t1.comment_by = @~~userid~~@";


$AppGlobal['sql']['searchResults'] = 'SELECT * FROM ( 
    (SELECT v.masked_artefact_version_id as id, "artefact" as type, t1.artefact_title as name FROM `artefacts` t1 JOIN artefact_versions v ON v.artefact_ver_id = t1.latest_version_id)
    UNION
    (SELECT  t2.project_id, "project", t2.project_name FROM projects t2)
    UNION
    (SELECT t4.user_id, "designer", t4.name FROM artefact_versions t3 JOIN users t4 ON t4.user_id = t3.created_by)
    UNION
    (SELECT t5.meeting_id, "meeting", t5.meeting_title FROM meetings t5)
) as u
WHERE
	u.name LIKE @~~query~~@';

/** Mail activities **/
// user added
$AppGlobal['sql']['getOtherProjectMembersMailUserAdded'] = "SELECT
														(
															select
																t4.screen_name
															from
																users t4
															where
																user_id = @~~userid~~@
														) as activity_done_user_name,
														(SELECT GROUP_CONCAT(t5.screen_name SEPARATOR ', ') FROM users as t5 WHERE user_id in (@~~addeduserids~~@)) as added_users,
													    (SELECT GROUP_CONCAT(t5.email SEPARATOR ',') FROM users as t5 WHERE user_id in (@~~addeduserids~~@)) as added_user_emails,
														GROUP_CONCAT(t2.email SEPARATOR ',') as emails,
														GROUP_CONCAT(t2.screen_name SEPARATOR ',') as users,
														t3.project_name as project_name,
														(select name from users where user_id = @~~receiveruserid~~@) as receivers_user_name,
														(select email from users where user_id = @~~receiveruserid~~@ ) as receivers_user_email
													FROM
														project_members t1
														JOIN users t2 ON t2.user_id = t1.user_id
														JOIN projects t3 ON t3.project_id = t1.proj_id
													WHERE
														proj_id = @~~projectid~~@
														and t1.user_id != @~~userid~~@";

// user removed
$AppGlobal['sql']['getOtherProjectMembersMailUserRemoved'] = "SELECT
														(
															select
																t4.screen_name
															from
																users t4
															where
																user_id = @~~userid~~@
														) as activity_done_user_name,
														(SELECT GROUP_CONCAT(t5.screen_name SEPARATOR ', ') FROM users as t5 WHERE user_id in (@~~removeduserid~~@)) as removed_users,
													    (SELECT GROUP_CONCAT(t5.email SEPARATOR ',') FROM users as t5 WHERE user_id in (@~~removeduserid~~@)) as removed_user_emails,
														GROUP_CONCAT(t2.email SEPARATOR ',') as emails,
														GROUP_CONCAT(t2.screen_name SEPARATOR ',') as users,
														t3.project_name as project_name,
														(select name from users where user_id = @~~receiveruserid~~@) as receivers_user_name,
														(select email from users where user_id = @~~receiveruserid~~@ ) as receivers_user_email
													FROM
														project_members t1
														JOIN users t2 ON t2.user_id = t1.user_id
														JOIN projects t3 ON t3.project_id = t1.proj_id
													WHERE
														proj_id = @~~projectid~~@
														and t1.user_id != @~~userid~~@";
$AppGlobal['sql']['getUserPermissionMail'] = "SELECT
														(
															select
																t4.screen_name
															from
																users t4
															where
																user_id = @~~userid~~@
														) as activity_done_user_name,

														t3.project_name as project_name,
														(select name from users where user_id = @~~receiveruserid~~@) as receivers_user_name,
														(select email from users where user_id = @~~receiveruserid~~@ ) as receivers_user_email
													FROM
														project_members t1
														JOIN users t2 ON t2.user_id = t1.user_id
														JOIN projects t3 ON t3.project_id = t1.proj_id
													WHERE
														proj_id = @~~projectid~~@
														and t1.user_id != @~~userid~~@";

$AppGlobal['sql']['getUserNameWithId'] = "SELECT name from users where user_id = @~~user_id~~@";
$AppGlobal['sql']['artefactMailQuery'] = "SELECT
												a.artefact_title,
												(select u1.screen_name FROM users u1 WHERE u1.user_id = @~~activitydoneuserid~~@) as activity_done_user_name,
												(select u3.screen_name FROM users u3 WHERE u3.user_id = @~~receiveruserid~~@) as receivers_user_name,
												(select u4.email FROM users u4 WHERE u4.user_id = @~~receiveruserid~~@) as receivers_user_email,
												(select GROUP_CONCAT(u5.screen_name SEPARATOR ', ') FROM users u5 WHERE u5.user_id IN (@~~otheruserids~~@)) as other_user_names,
												(select p.project_name FROM projects p WHERE p.project_id = @~~projectid~~@) as project_name
											FROM artefact_versions av
											JOIN artefacts a ON a.artefact_id = av.artefact_id
											WHERE av.artefact_ver_id IN (@~~artefactversionids~~@)";
$AppGlobal['sql']['artefactMailQueryWithoutUsers'] = "SELECT
												a.artefact_title,
												(select u1.screen_name FROM users u1 WHERE u1.user_id = @~~activitydoneuserid~~@) as activity_done_user_name,
												(select u3.screen_name FROM users u3 WHERE u3.user_id = @~~receiveruserid~~@) as receivers_user_name,
												(select u4.email FROM users u4 WHERE u4.user_id = @~~receiveruserid~~@) as receivers_user_email,
												(select p.project_name FROM projects p WHERE p.project_id = @~~projectid~~@) as project_name
											FROM artefact_versions av
											JOIN artefacts a ON a.artefact_id = av.artefact_id
											WHERE av.artefact_ver_id IN (@~~artefactversionids~~@)";

$AppGlobal['sql']['projectMailQuery'] = "SELECT
												p.project_name,
												(select u1.screen_name FROM users u1 WHERE u1.user_id = @~~activitydoneuserid~~@) as activity_done_user_name,
												(select u3.screen_name FROM users u3 WHERE u3.user_id = @~~receiveruserid~~@) as receivers_user_name,
												(select u4.email FROM users u4 WHERE u4.user_id = @~~receiveruserid~~@) as receivers_user_email,
												(select GROUP_CONCAT(u5.screen_name SEPARATOR ', ') FROM users u5 WHERE u5.user_id IN (@~~otheruserids~~@)) as other_user_names
											FROM projects p
											WHERE p.project_id = @~~projectid~~@";
$AppGlobal['sql']['projectMailQueryWithoutUsers'] = "SELECT
												p.project_name,
												(select u1.screen_name FROM users u1 WHERE u1.user_id = @~~activitydoneuserid~~@) as activity_done_user_name,
												(select u3.screen_name FROM users u3 WHERE u3.user_id = @~~receiveruserid~~@) as receivers_user_name,
												(select u4.email FROM users u4 WHERE u4.user_id = @~~receiveruserid~~@) as receivers_user_email
											FROM projects p
											WHERE p.project_id = @~~projectid~~@";

$AppGlobal['sql']['projectMembersForMail'] = "SELECT t1.project_name, t3.screen_name as user_name,
													t3.email as user_mail,
													(SELECT t5.screen_name FROM users t5 WHERE t5.user_id = t1.created_by) as owner_name,
													(SELECT t5.email FROM users t5 WHERE t5.user_id = t1.created_by) as owner_mail,
													(SELECT t5.screen_name FROM users t5 WHERE t5.user_id = @~~userid~~@) as activity_done_user,
													(SELECT t5.email FROM users t5 WHERE t5.user_id = @~~userid~~@) as activity_done_user_mail
												FROM projects t1
												JOIN project_members t2 ON t1.project_id = t2.proj_id
												JOIN users t3 ON t3.user_id = t2.user_id
												WHERE t1.project_id = @~~projectid~~@";

$AppGlobal['sql']['artefactRelatedMail'] = "SELECT
													t4.project_name,
													t1.artefact_title,
													t3.screen_name as username,
												    t3.email as usermail,
													(
														SELECT
															t5.screen_name
														FROM
															users t5
														WHERE
															t5.user_id = @~~userid~~@
													) as activity_done_user,
													(
														SELECT
															t5.email
														FROM
															users t5
														WHERE
															t5.user_id = @~~userid~~@
													) as activity_done_user_mail,
												    (
														SELECT
															t5.screen_name
														FROM
															users t5
														WHERE
															t5.user_id = t6.created_by
													) as owner_name,
													(
														SELECT
															t5.email
														FROM
															users t5
														WHERE
															t5.user_id = t6.created_by
													) as owner_mail

												FROM
													artefacts t1
													JOIN artefact_shared_members t2 ON t2.artefact_ver_id = t1.latest_version_id
												    JOIN users t3 ON t3.user_id = t2.user_id
												    JOIN projects t4 ON t4.project_id = t1.project_id
												    JOIN artefact_versions t6 ON t6.artefact_ver_id = t1.latest_version_id
												WHERE
													t1.artefact_id = @~~artefactid~~@";
/* Mail activities ended */
?>
