Kenseo.views.Projectspage = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".content-wrapper",
    // View constructor
    initialize: function() {
        new Kenseo.views.Header({'model': new Kenseo.models.Header()});

        this.artifactsModel  = new Kenseo.collections.Artifacts();
        this.activitiesModel = new Kenseo.collections.Activities();
        this.peopleModel     = new Kenseo.collections.People();
        // Calls the view's render method
        this.render();
    },
    // View Event Handlers
    events: {

    },
    // Renders the view's template to the UI
    render: function() {
        sb.renderTemplate('projects-page', this.$el);
        sb.renderTemplate('artifacts', $('.artifacts-section'), this.artifactsModel);
        sb.renderTemplate('people', $('.people-section'), this.peopleModel);
        sb.renderTemplate('activities', $('.activity-section'), this.activitiesModel);
        // Maintains chainability
        return this;
    }
});