Kenseo.views.Header = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".header",
    // View constructor
    initialize: function() {
        // Calls the view's render method
        this.render();
    },
    // View Event Handlers
    // events: {
    //     'click .hamburger': 'menuClick',
    //     'click .menu': 'stopMenuClick'
    // },
    // Renders the view's template to the UI
    render: function() {
        // try{
        //     // detach events (to refresh)
        //     $('.hamburger')[0].onclick = null;
        //     $('.menu')[0].onclick = null;
        // }
        // catch(e){}

        sb.renderTemplate('header', this.$el, this.model, this.attachEvents.bind(this), null, {userid: 3});
        // Maintains chainability
        return this;
    },
    attachEvents: function(){
        $('.hamburger').on('click', this.menuClick);
        $('.menu').on('click', this.stopMenuClick);
        $('.search-icon').on('click', this.showSearch);
    },
    menuClick: function(e){
        // console.log("-----------------");
        // console.log("clicked");

        $(e.currentTarget).toggleClass('active');
        if(!$('.menu').html().length){
            sb.loadFiles(
                {
                    'models': ['Projects', 'Activities', 'Requests', 'People'],
                    'collections': ['Projects', 'Activities', 'Requests', 'People']
                },
                function(){
                    sb.renderTemplate('nav-menu', $('.menu'));
                    sb.renderTemplate('menu-header', $('.menu-header'), new Kenseo.models.Header());
                    sb.renderTemplate('menu-projects-container', $('.menu-projects-container'), new Kenseo.collections.Projects());
                    sb.renderTemplate('menu-recent-activity', $('.menu-recent-activity'), new Kenseo.collections.Activities());
                    sb.renderTemplate('menu-recent-requests', $('.menu-recent-requests'), new Kenseo.collections.Requests());
                    sb.renderTemplate('menu-recent-notifications', $('.menu-recent-notifications'),  new Kenseo.collections.Notifications());
                    sb.renderTemplate('menu-recent-people', $('.menu-recent-people'),  new Kenseo.collections.People());
                }
            )
        }
    },
    stopMenuClick: function(e){
        e.stopPropagation();
    },
    showSearch: function(){
        var $popupContainer = $('.popup-container');
        $popupContainer.show();
        sb.renderTemplate('search', $popupContainer);
    }
});