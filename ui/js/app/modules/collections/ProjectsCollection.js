Kenseo.collections.Projects = Backbone.Collection.extend({
	url: sb.getRelativePath("getProjects"),
	model: function(attrs, options){
		return new Kenseo.models.Projects();
	}
});