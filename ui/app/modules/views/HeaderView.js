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
        sb.renderTemplate('header', this.$el, this.model, this.headerAttachEvents.bind(this), null, {userid: 3});
        // Maintains chainability
        return this;
    },
    headerAttachEvents: function(){
        $('.hamburger').on('click', this.menuClick);
        $('.menu').on('click', this.stopMenuClick);
        $('.search-icon').on('click', this.showSearchBox);
        $('.popup-container').on('keyup','#input-text-field', this.validateSearch);
        $('.create-icon-holder').on('click', function(e){
            // if($(e.target).hasClass('create-plus-nav-item')){
            //     e.stopPropagation();
            //     return false;
            // }
            $(this).toggleClass('active');
        });
        $('.create-plus-nav-item').on('click', function(){
            $('.popup-container').show();
            sb.renderTemplate($(this).data('url'), $('.popup-container'), null, function(){
                $('.main-btn').on('click', function(e){
                    // debugger;
                    e.preventDefault();
                    sb.renderTemplate($(this).data('url'), $('.popup-container'));
                });
            });
        });
    },
    menuClick: function(e){
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