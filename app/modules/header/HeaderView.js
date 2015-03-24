Kenseo.Header.View = Backbone.View.extend({
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
        var template = templates['header'];
        // Setting the view's template property using the Underscore template method
        // Backbone will automatically include Underscore plugin in it.
        this.template = _.template(template);
        // Dynamically updates the UI with the view's template
        this.$el.html(this.template(this.Model.toJSON());
        // Maintains chainability
        return this;
    }
});