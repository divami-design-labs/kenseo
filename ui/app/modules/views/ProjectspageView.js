Kenseo.views.Projectspage = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".content-wrapper",
    // View constructor
    initialize: function() {
        new Kenseo.views.Header({'model': new Kenseo.models.Header()});

        this.artefactsCollection  = new Kenseo.collections.Artefacts();
        this.peopleCollection     = new Kenseo.collections.People();
        // Calls the view's render method
        this.render();
    },
    // View Event Handlers
    events: {

    },
    // Renders the view's template to the UI
    render: function() {
        sb.renderTemplate('projects-page', this.$el);
        sb.renderTemplate('artifacts', $('.artifacts-section'), this.artefactsCollection, null, {linked: true});
        sb.renderTemplate('people', $('.people-section'), this.peopleCollection);
        sb.renderTemplate('activities', $('.activity-section'), this.artefactsCollection, null, {activities: true});
        // Maintains chainability
        return this;
    }
});