Kenseo.views.Notifications = Backbone.View.extend({
    // The DOM Element associated with this view
    el: '.notifications-content',
    template: _.template(templates['db-notifications']),
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
            var html = _.template(templates['db-notifications'])({data: response.data});
            _this.$el.html(html);
        });
        return this;
    }
});

// Kenseo.views.Notification = Backbone.View.extend({
//     // The DOM Element associated with this view
//     tagName: 'div',
//     className: 'review-request-item',
//     template: _.template(templates['notification']),
//     // View constructor
//     initialize: function() {

//     },
//     events: {
//         'click .popup-click': 'openPopup'
//     },
//     render: function() {
//         var data = this.model.toJSON();
//         var html = this.template({data: data});
//         this.$el.append(html);

//         return this;
//     },
//     openPopup: function(e){
//         e.preventDefault();
//         var model = this.model.collection.get($(e.currentTarget).data('id'));
//         Kenseo.data = model.toJSON();
//     }
// });