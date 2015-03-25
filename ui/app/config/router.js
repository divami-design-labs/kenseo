var Router = Backbone.Router.extend({
    initialize: function() {
        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();
    },
    // All of your Backbone Routes (add more)
    routes: {
        // When there is no hash on the url, the home method is called
        "": "index"
    },
    index: function() {
        new sb.loadFiles(   
            [
                "app/modules/Header/HeaderView.js", 
                "app/modules/Header/HeaderModel.js",
                "app/modules/Dashboard/DashboardView.js", 
                "app/modules/Notifications/NotificationsModel.js",
                "app/modules/Projects/ProjectsModel.js",
                "app/modules/Requests/RequestsModel.js"
            ],
            function(){
                // Instantiates a new view which will render the header text to the page
                new Kenseo.Header.View({'model': new Kenseo.Header.Model()});

                new Kenseo.Dashboard.View({
                    'notificationModel': new Kenseo.Notifications.Model(),
                    'projectModel': new Kenseo.Projects.Model(),
                    'reviewModel': new Kenseo.Requests.Model()
                });
            }
        );
    }
});