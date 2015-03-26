Kenseo.View.Header = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".header",
    // View constructor
    initialize: function() {
        // Calls the view's render method
        this.render();
    },
    // View Event Handlers
    events: {
        'click .hamburger': 'menuClick',
        'click .menu': 'stopMenuClick'
    },
    // Renders the view's template to the UI
    render: function() {
        sb.renderTemplate('header', this.$el, this.model);


        // Maintains chainability
        return this;
    },
    menuClick: function(e){
        $(e.currentTarget).toggleClass('active');
        if(!$('.menu').html().length){
            sb.renderTemplate('nav-menu', $('.menu'));
        }
    },
    stopMenuClick: function(e){
        e.stopPropagation();
    }
});