Kenseo.views.Notifications = Backbone.View.extend({
    // The DOM Element associated with this view
    el: '.notifications-content',
    template: _.template(templates['db-notifications']),
    // View constructor
    initialize: function initialize(payload) {
        this.data = payload.data;
        this.render();
    },
    events: {},
    render: function render() {
        var _this = this;
        sb.fetch(this.collection, this.data, function (collection, response, options) {
            var html = _.template(templates['db-notifications'])({ data: response.data });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2JhYmVsLWFwcC9tb2R1bGVzL3ZpZXdzL05vdGlmaWNhdGlvbnNWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUU5QyxNQUFFLEVBQUUsd0JBQXdCO0FBQzVCLFlBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUVuRCxjQUFVLEVBQUUsU0FBUyxVQUFVLENBQUMsT0FBTyxFQUFFO0FBQ3JDLFlBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUN6QixZQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDakI7QUFDRCxVQUFNLEVBQUUsRUFBRTtBQUNWLFVBQU0sRUFBRSxTQUFTLE1BQU0sR0FBRztBQUN0QixZQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDakIsVUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRTtBQUMxRSxnQkFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLGlCQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QixDQUFDLENBQUM7QUFDSCxlQUFPLElBQUksQ0FBQztLQUNmO0NBQ0osQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMiLCJmaWxlIjoiTm90aWZpY2F0aW9uc1ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJLZW5zZW8udmlld3MuTm90aWZpY2F0aW9ucyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICAvLyBUaGUgRE9NIEVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgdmlld1xuICAgIGVsOiAnLm5vdGlmaWNhdGlvbnMtY29udGVudCcsXG4gICAgdGVtcGxhdGU6IF8udGVtcGxhdGUodGVtcGxhdGVzWydkYi1ub3RpZmljYXRpb25zJ10pLFxuICAgIC8vIFZpZXcgY29uc3RydWN0b3JcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gcGF5bG9hZC5kYXRhO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0sXG4gICAgZXZlbnRzOiB7fSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgc2IuZmV0Y2godGhpcy5jb2xsZWN0aW9uLCB0aGlzLmRhdGEsIGZ1bmN0aW9uIChjb2xsZWN0aW9uLCByZXNwb25zZSwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGh0bWwgPSBfLnRlbXBsYXRlKHRlbXBsYXRlc1snZGItbm90aWZpY2F0aW9ucyddKSh7IGRhdGE6IHJlc3BvbnNlLmRhdGEgfSk7XG4gICAgICAgICAgICBfdGhpcy4kZWwuaHRtbChodG1sKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn0pO1xuXG4vLyBLZW5zZW8udmlld3MuTm90aWZpY2F0aW9uID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuLy8gICAgIC8vIFRoZSBET00gRWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhpcyB2aWV3XG4vLyAgICAgdGFnTmFtZTogJ2RpdicsXG4vLyAgICAgY2xhc3NOYW1lOiAncmV2aWV3LXJlcXVlc3QtaXRlbScsXG4vLyAgICAgdGVtcGxhdGU6IF8udGVtcGxhdGUodGVtcGxhdGVzWydub3RpZmljYXRpb24nXSksXG4vLyAgICAgLy8gVmlldyBjb25zdHJ1Y3RvclxuLy8gICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuXG4vLyAgICAgfSxcbi8vICAgICBldmVudHM6IHtcbi8vICAgICAgICAgJ2NsaWNrIC5wb3B1cC1jbGljayc6ICdvcGVuUG9wdXAnXG4vLyAgICAgfSxcbi8vICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICB2YXIgZGF0YSA9IHRoaXMubW9kZWwudG9KU09OKCk7XG4vLyAgICAgICAgIHZhciBodG1sID0gdGhpcy50ZW1wbGF0ZSh7ZGF0YTogZGF0YX0pO1xuLy8gICAgICAgICB0aGlzLiRlbC5hcHBlbmQoaHRtbCk7XG5cbi8vICAgICAgICAgcmV0dXJuIHRoaXM7XG4vLyAgICAgfSxcbi8vICAgICBvcGVuUG9wdXA6IGZ1bmN0aW9uKGUpe1xuLy8gICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4vLyAgICAgICAgIHZhciBtb2RlbCA9IHRoaXMubW9kZWwuY29sbGVjdGlvbi5nZXQoJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2lkJykpO1xuLy8gICAgICAgICBLZW5zZW8uZGF0YSA9IG1vZGVsLnRvSlNPTigpO1xuLy8gICAgIH1cbi8vIH0pOyJdfQ==