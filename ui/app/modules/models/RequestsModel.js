Kenseo.models.Requests = Backbone.Model.extend({
    // urlRoot: app/packages/db-reviews.json
    default: {
        id: null,
        title: null,
        requestedBy: null,
        requestorImage: null,
        doctype: null,
        requestorId: null,
        requestTime: null,
        status: null,
        comments: null,
        cycleCount: null,
        attention: null
    }
});
