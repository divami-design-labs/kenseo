Kenseo.collections.Artefacts = Backbone.Collection.extend({
	url: sb.getRelativePath('getArtefacts'),
	model: function(attrs, options){
		// console.dir(arguments);
		return new Kenseo.models.Artefacts();
	}
});