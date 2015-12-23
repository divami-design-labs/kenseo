"use strict";

Kenseo.collections.Projects = Backbone.Collection.extend({
	url: sb.getRelativePath("getProjects"),
	model: Kenseo.models.Projects
});
//# sourceMappingURL=ProjectsCollection.js.map
