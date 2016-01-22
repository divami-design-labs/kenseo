'use strict';

Kenseo.collections.Tags = Backbone.Collection.extend({
	// model  : Kenseo.models.Activities,
	// url: 'app/packages/activities.json'
	url: sb.getRelativePath('getTagsList')
});