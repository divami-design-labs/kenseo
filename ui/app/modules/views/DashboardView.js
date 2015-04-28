Kenseo.views.Dashboard = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".content-wrapper",
    // View constructor
    initialize: function(collections) {
        this.collections = collections;
        new Kenseo.views.Header({'model': new Kenseo.models.Header()});
        // Calls the view's render method
        this.render();
    },
    // View Event Handlers
    events: {

    },
    // Renders the view's template to the UI
    render: function() {
        sb.renderTemplate({"templateName": 'db-projects-section', "templateHolder": $('.projects-section-content'), "collection": this.collections.projectCollection, "data": {limit: 6}});
        sb.renderTemplate({"templateName": 'db-notifications',"templateHolder": $('.notifications-content'), "collection": this.collections.notificationCollection,"data": {limit: 12}});
        sb.renderTemplate({"templateName": 'artefacts', "templateHolder": $('.review-requests-content'), "collection": this.collections.artefactCollection,"data": {shared: true, limit: 8}});
        this.attachEvents();
        return this;
    },
    attachEvents: function(){
    }
});