var Router = Backbone.Router.extend({
    initialize: function() {
        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();
    },
    // All of your Backbone Routes (add more)
    routes: {
        // When there is no hash on the url, the home method is called
        "": "index",
        "projectspage": "projectsPage",
        "menu": "showMenu"
    },
    index: function() {
        sb.loadFiles(   
            {
                'views': ['Header', 'Dashboard'],
                'models': ['Header', 'Notifications', 'Projects', 'Requests']
            },
            function(){
                // Instantiates a new view which will render the header text to the page
                new Kenseo.View.Header({'model': new Kenseo.Model.Header()});

                new Kenseo.View.Dashboard({
                    'notificationModel': new Kenseo.Model.Notifications(),
                    'projectModel': new Kenseo.Model.Projects(),
                    'reviewModel': new Kenseo.Model.Requests()
                });
            }
        );
    },
    projectsPage: function(){
        sb.loadFiles(
            {
                'views': ['Header', 'Projectspage'],
                'models': []
            },
            function(){
                new Kenseo.View.Projectspage();
            }
        )
    }
});