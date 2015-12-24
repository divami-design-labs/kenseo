<?php

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
										artefacts.replace_ref_id is null AND
										artefacts.state != 'A' AND artefacts.state != 'D' AND
										project.state = 'A'
										ORDER BY members.shared_date DESC
										LIMIT @~~limit~~@";


$AppGlobal['sql']['getReviewRequests'] = "SELECT DISTINCT requestor.name AS person_name, artefacts.artefact_title AS title, 
										requestor.profile_pic_url AS image, artefacts.artefact_type AS document_type,
										requestor.user_id AS owner_id, members.shared_date AS artefact_time,
										versions.state AS status, artefacts.artefact_id as id, artefacts.latest_version_id as versionId,
										project.project_name as project_name,
										versions.masked_artefact_version_id,
										versions.MIME_type,
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
										(SELECT m.artefact_id FROM " . TABLE_ARTEFACTS_SHARED_MEMBERS . " m where artefact_id 
											in (SELECT artefact_id FROM " . TABLE_ARTEFACTS_SHARED_MEMBERS . " as m group by artefact_id 
											having count(*) > 1) and (m.user_id = @~~userid~~@ OR m.shared_by =  @~~userid~~@) 
											group by m.artefact_ver_id) AND
										artefacts.replace_ref_id is null AND
										artefacts.state != 'A' AND artefacts.state != 'D' AND
										project.state = 'A'
										ORDER BY members.shared_date DESC
										LIMIT @~~limit~~@";


$AppGlobal['sql']['getProjectArtefactsWithoutSharePermission'] = "SELECT DISTINCT
											requestor.name as requestedBy, 
											versions.artefact_ver_id as versionId,
											versions.masked_artefact_version_id as masked_artefact_version_id,
											artefacts.artefact_title as title,
											artefacts.artefact_title as name, 
											requestor.profile_pic_url as requestorImage, 
											artefacts.artefact_type as documentType,
											requestor.user_id as requestorId,
											members.shared_date AS requestTime,
											versions.state AS status, 
											versions.MIME_type,
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
											artefacts.replace_ref_id is null
											ORDER BY @~~sortBy~~@";


?>