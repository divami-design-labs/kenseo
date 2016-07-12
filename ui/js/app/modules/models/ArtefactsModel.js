Kenseo.models.Artefacts = Backbone.Model.extend({
	// urlRoot: 'app/packages/artifacts.json'
	defaults: {
		MIME_type: null,
		artefact_time: null,
		artefact_ver_id: null,
		comment_count: null,
		document_type: null,
		id: null,
		image: null,
		masked_artefact_version_id: null,
		owner_id: null,
		person_name: null,
		project_id: null,
		project_name: null,
		status: null,
		title: null,
		version: null
	}
});