Kenseo.collections.Artefacts = Backbone.Collection.extend({
	url: sb.getRelativePath('getArtefacts'),
	model: Kenseo.models.Artefacts
});
