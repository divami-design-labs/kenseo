Kenseo.collections.People = Backbone.Collection.extend({
	url: sb.getRelativePath('getPeople'),
	model: Kenseo.models.People
});