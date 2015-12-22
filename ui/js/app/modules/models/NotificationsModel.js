"use strict";

Kenseo.models.Notifications = Backbone.Model.extend({
    // urlRoot: "app/packages/db-notifications.json"
    "default": {
        id: null,
        title: null,
        type: null,
        time: null,
        notifier: null,
        notifierId: null
    }
});