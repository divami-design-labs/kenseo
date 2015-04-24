var Router = Backbone.Router.extend({
    initialize: function() {
        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();
    },
    // All of your Backbone Routes (add more)
    routes: {
        // When there is no hash on the url, the home method is called
        "": "index",
        "projectspage": "projectsPage"
    },
    index: function() {
        sb.loadFiles(   
            {
                'views' : ['Header', 'Dashboard'],
                'models': ['Header', 'Notifications', 'Projects', 'Artefacts'],
                'collections': ['Projects', 'Artefacts', 'Notifications']
            },
            function(){
                // Instantiates a new view which will render the header text to the page
                new Kenseo.views.Dashboard({
                    // 'projectModel': new Kenseo.models.Projects(),
                    'projectCollection': new Kenseo.collections.Projects(),
                    'artefactCollection': new Kenseo.collections.Artefacts(),
                    'notificationCollection': new Kenseo.collections.Notifications()
                });
            }
        );
    },
    projectsPage: function(id){
        Kenseo.page.data.project_id = id;
        sb.loadFiles(
            {
                'views': ['Header', 'Projectspage'],
                'models': ['Header','Artefacts', 'People'],
                'collections': ['Artefacts', 'People']
            },
            function(){
                new Kenseo.views.Projectspage();
            }
        )
    }
});