var Router = Backbone.Router.extend({
    initialize: function() {
        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();
    },
    // All of your Backbone Routes (add more)
    routes: {
        // When there is no hash on the url, the home method is called
        "": "index",
        "projectpage/:id": "projectPage"
    },
    index: function() {
        sb.loadFiles(   
            {
                'views' : ['Header', 'Artefacts', 'Projects', 'Notifications'],
                'models': ['Header', 'Notifications', 'Projects', 'Artefacts'],
                'collections': ['Projects', 'Artefacts', 'Notifications']
            },
            function(){
                new Kenseo.views.Header({'model': new Kenseo.models.Header()});
                new Kenseo.views.Projects({colStr: 'Projects', data: {limit: 6, userProjects: true}});
                new Kenseo.views.Notifications({collection: new Kenseo.collections.Notifications(), data: {limit: 12}});
                new Kenseo.views.Artefacts({colStr: 'Artefacts', data: {limit: 8, shared: true}});
            }
        );
    },
    projectPage: function(id){
        sb.loadFiles(
            {
                'views': ['Header', 'Artefacts', 'People', 'Activities'],
                'models': ['Header','Artefacts', 'People'],
                'collections': ['Artefacts', 'People']
            },
            function(){
                sb.renderTemplate({"templateName": 'projects-page', "templateHolder": $(".content-wrapper")});
                new Kenseo.views.Header({'model': new Kenseo.models.Header()});

                new Kenseo.views.Artefacts({
                    el: '.artifacts-content',
                    id: id,
                    colStr: 'Artefacts', 
                    data: {projects: true, project_id: id, sharePermission: false, sortBy: "default"}, 
                    preLoader: function(response){
                        $('.artifacts-section').html(_.template(templates['artefacts'])(response));
                    }
                });
                new Kenseo.views.Activities({collection: new Kenseo.collections.Artefacts(), data: {projectActivities: true, project_id: id}});
                new Kenseo.views.People({
                    el: '.people-section-content', 
                    colStr: 'People', 
                    data: {projectId: id},
                    preLoader: function(response){
                        $('.people-section').html(_.template(templates['people'])());
                    }
                });
            }
        )
    }
});