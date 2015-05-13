Kenseo.views.Activities = Backbone.View.extend({
    // The DOM Element associated with this view
    el: '.activity-section',
    // template: _.template(templates['activities']),
    // View constructor
    initialize: function(payload) {
        this.data = payload.data;
        this.render();
    },
    events: {

    },
    render: function() {
        var _this = this;
        this.collection.fetch(sb.getStandardData({data: this.data})).then(function(response){
            var html = _.template(templates['activities'])({data: response.data});
            _this.$el.html(html);
        });
        return this;
    }
});