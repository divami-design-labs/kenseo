Kenseo.collections.Projects = Backbone.Collection.extend({
	url: "app/packages/db-projects.json",
	model: Kenseo.models.Projects
	// parse: function(response){
	// 	// console.log(response);
	// 	return response.data;
	// }
});
