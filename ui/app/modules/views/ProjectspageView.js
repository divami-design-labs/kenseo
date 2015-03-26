Kenseo.View.Projectspage = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".page-wrapper",
    // View constructor
    initialize: function() {
        // Calls the view's render method
        this.render();
    },
    // View Event Handlers
    events: {

    },
    // Renders the view's template to the UI
    render: function() {
        sb.renderTemplate('projects-page', this.$el);
        // Maintains chainability
        return this;
    }
});