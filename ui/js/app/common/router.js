"use strict";

var Router = Backbone.Router.extend({
    initialize: function initialize() {
        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();
    },
    // All of your Backbone Routes (add more)
    routes: {
        // When there is no hash on the url, the home method is called
        "": "index",
        "projectpage/:id": "projectPage",
        "meetingnotes/:id": "meetingNotes",
        "documentview/:id": "documentView",
        "projects": "projects"
    },
    index: sb.router.dashboard,
    projectPage: sb.router.projectPage,
    meetingNotes: sb.router.meetingNotes,
    documentView: sb.router.documentView,
    projects: sb.router.projects
});