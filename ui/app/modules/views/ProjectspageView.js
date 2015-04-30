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
        sb.renderTemplate({"templateName": 'projects-page', "templateHolder": this.$el});
        sb.renderTemplate({"templateName": 'artefacts',"templateHolder": $('.artifacts-content'), "collection": this.artefactsCollection, "data": {projects: true, project_id: Kenseo.page.data.project_id, sharePermission: false, sortBy: "default"}});
        sb.renderTemplate({"templateName": 'people', "templateHolder": $('.people-section'), "collection": this.peopleCollection});
        sb.renderTemplate({"templateName": 'activities', "templateHolder": $('.activity-section'), "collection": this.artefactsCollection, "data": {activities: true, project_id: Kenseo.page.data.project_id}});
        // Maintains chainability
        return this;
    }
});