_.assign(sb, {
	params: {
		"add-project" :{
			params : ["project_name","project_description"]
		},
		"add-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_ver_id","comment_count","doctype","id","image","is_project_page",
						"linksIds","links","references","referencesIds","tags","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date","project_description",
						"status","title","version"]
		},
		"edit-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_ver_id","comment_count","doctype","id","image","is_project_page",
						"linksIds","links","references","referencesIds","tags","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"rename-artefact" : {
			params : ["id","name","owner_id","project_id","project_name","title","version","artefact_name","artefact_ver_id"]
		},
		"share-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_ver_id","comment_count","document_type","id","ids","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version","shared_members"]
		},
		"delete-artefact" : {
			params : ["artefact_ver_id","id","name","owner_id","project_id","status","title","version"]
		},
		"archive-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_ver_id","comment_count","document_type","id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"replace-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_ver_id","comment_count","document_type","id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"add-version" : {
			params : ["MIME_type","actionType","artefact_time","artefact_ver_id","comment_count","document_type","id","artefact_id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"private-message" : {
			params : ["MIME_type","actionType","artefact_time","artefact_ver_id","comment_count","document_type","id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"edit-artefact-info" : {
			params : ["MIME_type","actionType","artefact_time","artefact_ver_id","comment_count","document_type","id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"create-meeting" : {
			params :
			["projectId","venue","date","projectName","artefactId","artefactName","agenda","fromTime","toTime","participants","timezone"]
		},
		"update-meeting" : {
			params :
			["projectId","venue","date","projectName","artefactId","artefactName","agenda","fromTime","toTime","participants","timezone","meeting_id"]
		},
		"write-meeting-notes" : {
			params :
			["meeting_id","notes","is_public"]
		},
		"add-people" : {
			params :
			["project_id","access_type","group_type","users"]
		},
		"submit-artefact" : {
			params :
			["artefactVersionId"]
		},
		"cover-image" : {
			params :
			["dimensions","id","files"]
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

