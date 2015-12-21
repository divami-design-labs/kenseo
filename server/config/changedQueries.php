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


?>