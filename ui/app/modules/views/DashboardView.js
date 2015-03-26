Kenseo.View.Dashboard = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".content-wrapper",
    // View constructor
    initialize: function(models) {
        this.model = models;
        // Calls the view's render method
        this.render();
    },
    // View Event Handlers
    events: {

    },
    // Renders the view's template to the UI
    render: function() {
        sb.renderTemplate('db-review-requests' , $('.review-requests-section'), this.model.reviewModel);
        sb.renderTemplate('db-notifications'   , $('.notifications-section')  , this.model.notificationModel);
        sb.renderTemplate('db-projects-section', $('.projects-section')       , this.model.projectModel);
        return this;
    }
});