Kenseo.views.Notifications = Backbone.View.extend({
    // The DOM Element associated with this view
    el: '.notifications-content',
    template: function(data){
        return sb.setTemplate('db-notifications', data)
    },
    // View constructor
    initialize: function initialize(payload) {
        this.data = payload.data;
        this.render();
    },
    events: {},
    render: function render() {
        var _this = this;
        sb.fetch(this.collection, this.data, function (collection, response, options) {
            var html = sb.setTemplate('db-notifications', { data: response.data });
            _this.$el.html(html);
        });
        return this;
    }
});

// Kenseo.views.Notification = Backbone.View.extend({
//     // The DOM Element associated with this view
//     tagName: 'div',
//     className: 'review-request-item',
//     template: sb.setTemplate('notification'),
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