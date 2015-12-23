"use strict";

Kenseo.views.Popup = Backbone.View.extend({
    // The DOM Element associated with this view
    el: "",
    // View constructor
    initialize: function initialize(collections) {

        this.render();
    },
    // View Event Handlers
    events: {},
    // Renders the view's template to the UI
    render: function render() {
        this.attachEvents();
        return this;
    },
    attachEvents: function attachEvents() {}
});
//# sourceMappingURL=PopupView.js.map
