"use strict";

Kenseo.collections.Notifications = Backbone.Collection.extend({
    // url: "app/packages/db-notifications.json",
    url: sb.getRelativePath("getNotifications"),
    model: Kenseo.models.Notifications
});