_.assign(sb, {
	params: {
		"add-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_ver_id","comment_count","document_type","id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
		},
		"editArtefact" : {
			params : ["artefact_ver_id","document_type","id","name","owner_id","project_id","title","version", "tags"]
		},
		"renameArtefact" : {
			params : ["id","name","owner_id","project_id","project_name","title","version","artefact_name","artefact_ver_id"]
		},
		"share-artefact" : {
			params : ["MIME_type","actionType","artefact_time","artefact_ver_id","comment_count","document_type","id","image","is_project_page",
						"linked_id","masked_artefact_version_id","name","owner_id","person_name","project_id","project_name","shared_date",
						"status","title","version"]
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
			params : ["MIME_type","actionType","artefact_time","artefact_ver_id","comment_count","document_type","id","image","is_project_page",
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
		}
	},
	getPreparedParams: function(actionType){
		return sb.params[_.kebabCase(actionType)].params;
	}
});

