Kenseo.views.Dashboard = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".content-wrapper",
    // View constructor
    initialize: function(collections) {
        this.collections = collections;
        new Kenseo.views.Header({'model': new Kenseo.models.Header()});
        // Calls the view's render method
        this.render();
    },
    // View Event Handlers
    events: {

    },
    // Renders the view's template to the UI
    render: function() {
        sb.renderTemplate('db-projects-section', $('.projects-section')       , this.collections.projectCollection, null, {limit: 6});
        sb.renderTemplate('db-notifications'   , $('.notifications-section')  , this.collections.notificationCollection, null, {limit: 12});
        sb.renderTemplate('db-review-requests' , $('.review-requests-section'), this.collections.reviewCollection, null, {limit: 8});
        this.attachEvents();
        return this;
    },
    attachEvents: function(){
    }
});