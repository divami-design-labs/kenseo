Kenseo.views.Header = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".profile-pic-holder",
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
        sb.renderTemplate({"templateName": 'header', "templateHolder": this.$el, "collection": this.model, "callbackfunc": this.headerAttachEvents.bind(this) });
        // Maintains chainability
        return this;
    },
    headerAttachEvents: function(){
        $('.hamburger').on('click', this.menuClick);
        $('.menu').on('click', this.stopMenuClick);
        $('.search-icon').on('click', this.showSearchBox);
        $('.popup-container').on('keyup','.search-field', this.validateSearch);
    },
    menuClick: function(e){
        if(!$('.menu').html().length){
            sb.loadFiles(
                {
                    'models': ['Header', 'Projects', 'Artefacts', 'People'],
                    'collections': ['Projects', 'Artefacts', 'People']
                },
                function(){
                    sb.renderTemplate({ "templateName": 'nav-menu', "templateHolder":$('.menu')});
                    sb.renderTemplate({"templateName": 'menu-header', "templateHolder": $('.menu-header'), "collection": new Kenseo.models.Header()});
                    sb.renderTemplate({"templateName": 'menu-projects-container',"templateHolder": $('.menu-projects-container'), "collection": new Kenseo.collections.Projects(), "data": {limit: 3}});
                    sb.renderTemplate({"templateName": 'menu-recent-activity', "templateHolder": $('.menu-recent-activity'), "collection": new Kenseo.collections.Artefacts(), "data": {activities: true, limit: 3}});
                    sb.renderTemplate({"templateName": 'menu-recent-requests', "templateHolder": $('.menu-recent-requests'), "collection": new Kenseo.collections.Artefacts(), "data": {shared: true, limit: 3}});
                    sb.renderTemplate({"templateName": 'menu-recent-notifications', "templateHolder": $('.menu-recent-notifications'), "collection": new Kenseo.collections.Notifications(),"data": {limit: 3}});
                    sb.renderTemplate({"templateName": 'menu-recent-people', "templateHolder": $('.menu-recent-people'), "collection": new Kenseo.collections.People(), "data": {limit: 3}});
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
                sb.renderTemplate('search-results', $('.search-section').find('.search-results'), new Kenseo.collections.Search(), function(){
                    $('.search-results').show();
                }, {
                    'string': searchString
                });
            });
        }
        else{
            $('.search-results').hide();
        }
    }
});