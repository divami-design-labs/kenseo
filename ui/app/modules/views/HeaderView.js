Kenseo.views.Header = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".header",
    userid: Kenseo.cookie.userid(),
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
        sb.renderTemplate('header', this.$el, this.model, this.headerAttachEvents.bind(this), {userid: this.userid});
        // Maintains chainability
        return this;
    },
    headerAttachEvents: function(){
        $('.hamburger').on('click', this.menuClick);
        $('.menu').on('click', this.stopMenuClick);
        $('.search-icon').on('click', this.showSearchBox);
        $('.popup-container').on('keyup','.search-field', this.validateSearch);
        $('.create-plus-nav-item').on('click', function(){
            $('.popup-container').show();
            var $self = $(this);
            Kenseo.popup = sb.getPopupsInfo($self.data('url'));
            sb.callPopup(0);
        });
    },
    menuClick: function(e){
        if(!$('.menu').html().length){
            sb.loadFiles(
                {
                    'models': ['Header', 'Projects', 'Activities', 'Requests', 'People'],
                    'collections': ['Projects', 'Activities', 'Requests', 'People']
                },
                function(){
                    var userid = Kenseo.cookie.userid();
                    sb.renderTemplate('nav-menu', $('.menu'));
                    sb.renderTemplate('menu-header', $('.menu-header'), new Kenseo.models.Header(), null, {userid: userid});
                    sb.renderTemplate('menu-projects-container', $('.menu-projects-container'), new Kenseo.collections.Projects(), null, {userid: userid, limit: 3});
                    sb.renderTemplate('menu-recent-activity', $('.menu-recent-activity'), new Kenseo.collections.Activities(), null, {userid: userid, limit: 3});
                    sb.renderTemplate('menu-recent-requests', $('.menu-recent-requests'), new Kenseo.collections.Requests(), null, {userid: userid, limit: 3});
                    sb.renderTemplate('menu-recent-notifications', $('.menu-recent-notifications'),  new Kenseo.collections.Notifications(), null, {userid: userid, limit: 3});
                    sb.renderTemplate('menu-recent-people', $('.menu-recent-people'),  new Kenseo.collections.People(), null, {userid: userid, limit: 3});
                }
            )
        }
    },
    stopMenuClick: function(e){
        e.stopPropagation();
    },
    showSearchBox: function(){
        var $popupContainer = $('.popup-container');
        $popupContainer.show();
        sb.renderTemplate('search', $popupContainer);
    },
    validateSearch: function(e) {
        var searchString = this.value;
        if(searchString.length > 2) {
            sb.loadFiles({
                'models': ['Search'],
                'collections': ['Search']
            }, function(){
                sb.renderTemplate('search-results', $('.search-section').find('.search-results'), new Kenseo.collections.Search(), null, {
                    'string': searchString
                });
            });
        }
    }
});