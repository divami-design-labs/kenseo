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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2JhYmVsLWFwcC9tb2R1bGVzL3ZpZXdzL1BvcHVwVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7QUFFdEMsTUFBRSxFQUFFLEVBQUU7O0FBRU4sY0FBVSxFQUFFLFNBQVMsVUFBVSxDQUFDLFdBQVcsRUFBRTs7QUFFekMsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2pCOztBQUVELFVBQU0sRUFBRSxFQUFFOztBQUVWLFVBQU0sRUFBRSxTQUFTLE1BQU0sR0FBRztBQUN0QixZQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDcEIsZUFBTyxJQUFJLENBQUM7S0FDZjtBQUNELGdCQUFZLEVBQUUsU0FBUyxZQUFZLEdBQUcsRUFBRTtDQUMzQyxDQUFDLENBQUMiLCJmaWxlIjoiUG9wdXBWaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiS2Vuc2VvLnZpZXdzLlBvcHVwID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuICAgIC8vIFRoZSBET00gRWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhpcyB2aWV3XG4gICAgZWw6IFwiXCIsXG4gICAgLy8gVmlldyBjb25zdHJ1Y3RvclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoY29sbGVjdGlvbnMpIHtcblxuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0sXG4gICAgLy8gVmlldyBFdmVudCBIYW5kbGVyc1xuICAgIGV2ZW50czoge30sXG4gICAgLy8gUmVuZGVycyB0aGUgdmlldydzIHRlbXBsYXRlIHRvIHRoZSBVSVxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmF0dGFjaEV2ZW50cygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGF0dGFjaEV2ZW50czogZnVuY3Rpb24gYXR0YWNoRXZlbnRzKCkge31cbn0pOyJdfQ==