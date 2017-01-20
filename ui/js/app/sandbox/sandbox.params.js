_.assign(sb, {
	params: {
		"add-project" :{
			params : ["project_name","project_description"]
		},
		"add-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_version_id","comment_count","doctype","id","image","is_project_page",
						"linksIds","links","references","referencesIds","tags","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date","project_description",
						"status","title","version", "command"]
		},
		"edit-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_version_id","comment_count","doctype","artefact_id","image","is_project_page",
						"linksIds","links","references","referencesIds","tags","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"rename-artefact" : {
			params : ["artefact_id","name","owner_id","project_id","project_name","title","version","artefact_name","artefact_new_name","artefact_version_id"]
		},
		"share-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_version_id","comment_count","document_type","artefact_id","ids","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","artafact_name","version","shared_members"]
		},
		"delete-artefact" : {
			params : ["artefact_version_id","artefact_id","artefact_name","owner_id","project_id","status","title","version"]
		},
		"archive-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_version_id","comment_count","document_type","artefact_id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"replace-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_version_id","comment_count","document_type","artefact_id","existing_artefact_id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"add-version" : {
			params : ["MIME_type","actionType","artefact_time","artefact_version_id","comment_count","document_type","existing_artefact_id","artefact_id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"private-message" : {
			params : ["MIME_type","actionType","artefact_time","artefact_version_id","comment_count","document_type","id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"edit-artefact-info" : {
			params : ["MIME_type","actionType","artefact_time","artefact_version_id","comment_count","document_type","artefact_id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"create-meeting" : {
			params :
			["project_id","venue","meeting_date","project_name","artefact_id","artefact_name","agenda","meeting_date_from_time","meeting_date_to_time","participants","timezone"]
		},
		"update-meeting" : {
			params :
			["project_id","venue","meeting_date","project_name","artefact_id","artefact_name","agenda","meeting_date_from_time","meeting_date_to_time","participants","participants_user_ids","timezone","meeting_id"]
		},
		"write-meeting-notes" : {
			params :
			["meeting_id","notes","is_public"]
		},
		"add-people" : {
			params :
			["project_id","access_type","group_type","users","artefact_version_id"]
		},
		"submit-artefact" : {
			params :
			["artefactVersionId","project_id"]
		},
		"cover-image" : {
			params :
			["dimensions","actionType","project_id","files"]
		},
		"delete-comment" : {
			params :
			["comment_id"]
		}
	},
	getPreparedParams: function(actionType){
		return sb.params[_.kebabCase(actionType)].params;
	}
});

