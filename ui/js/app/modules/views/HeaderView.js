Kenseo.views.Header = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".profile-pic-holder",
    // View constructor
    initialize: function initialize() {
        // Calls the view's render method
        //this.model = this.model || new Kenseo.models.Header()
        this.render();
    },
    // View Event Handlers
    // events: {
    //     'click .hamburger': 'menuClick',
    //     'click .menu': 'stopMenuClick'
    // },
    // Renders the view's template to the UI
    render: function render() {
        sb.renderTemplate({ "templateName": "header", "templateHolder": this.$el, "model": this.model, "callbackfunc": this.headerAttachEvents.bind(this) });
        // Maintains chainability
        return this;
    },
    headerAttachEvents: function headerAttachEvents() {
        $(".hamburger").on("click", this.menuClick);
        $(".menu").on("click", this.stopMenuClick);
        $(".search-icon").on("click", this.showSearchBox);
        $(".popup-container").on("keyup", ".search-field", this.validateSearch);
    },
    menuClick: function menuClick(e) {
        if (!$(".menu").html().length) {
            sb.router.menu();
        }
    },
    stopMenuClick: function stopMenuClick(e) {},
    showSearchBox: function showSearchBox() {
        var $popupContainer = $(".popup-container");
        $popupContainer.show();
        sb.renderTemplate({ "templateName": "search", "templateHolder": $popupContainer });
    },
    validateSearch: function validateSearch(e) {
        var searchString = this.value;
        if (searchString.length > 2) {
            sb.loadFiles({
                "models": ["Search"],
                "collections": ["Search"]
            }, function () {
                sb.renderTemplate({ "templateName": "search-results", "templateHolder": $(".search-section").find(".search-results"), "collection": new Kenseo.collections.Search(), "callbackfunc": function callbackfunc() {
                        if ($(".search-results").children().length) {
                            $(".search-results").show();
                        } else {
                            $(".search-results").hide();
                        }
                    }, "data": {
                        "string": searchString
                    } });
            });
        } else {
            $(".search-results").hide();
        }
    }
});

// e.stopPropagation();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2JhYmVsLWFwcC9tb2R1bGVzL3ZpZXdzL0hlYWRlclZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7O0FBRXZDLE1BQUUsRUFBRSxxQkFBcUI7O0FBRXpCLGNBQVUsRUFBRSxTQUFTLFVBQVUsR0FBRzs7O0FBRzlCLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNqQjs7Ozs7OztBQU9ELFVBQU0sRUFBRSxTQUFTLE1BQU0sR0FBRztBQUN0QixVQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7O0FBQUMsQUFFckosZUFBTyxJQUFJLENBQUM7S0FDZjtBQUNELHNCQUFrQixFQUFFLFNBQVMsa0JBQWtCLEdBQUc7QUFDOUMsU0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVDLFNBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQyxTQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDbEQsU0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQzNFO0FBQ0QsYUFBUyxFQUFFLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRTtBQUM3QixZQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRTtBQUMzQixjQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3BCO0tBQ0o7QUFDRCxpQkFBYSxFQUFFLFNBQVMsYUFBYSxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQzNDLGlCQUFhLEVBQUUsU0FBUyxhQUFhLEdBQUc7QUFDcEMsWUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDNUMsdUJBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN2QixVQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0tBQ3RGO0FBQ0Qsa0JBQWMsRUFBRSxTQUFTLGNBQWMsQ0FBQyxDQUFDLEVBQUU7QUFDdkMsWUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUM5QixZQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3pCLGNBQUUsQ0FBQyxTQUFTLENBQUM7QUFDVCx3QkFBUSxFQUFFLENBQUMsUUFBUSxDQUFDO0FBQ3BCLDZCQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7YUFDNUIsRUFBRSxZQUFZO0FBQ1gsa0JBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsWUFBWSxFQUFFLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxjQUFjLEVBQUUsU0FBUyxZQUFZLEdBQUc7QUFDck0sNEJBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFO0FBQ3hDLDZCQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt5QkFDL0IsTUFBTTtBQUNILDZCQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt5QkFDL0I7cUJBQ0osRUFBRSxNQUFNLEVBQUU7QUFDUCxnQ0FBUSxFQUFFLFlBQVk7cUJBQ3pCLEVBQUUsQ0FBQyxDQUFDO2FBQ1osQ0FBQyxDQUFDO1NBQ04sTUFBTTtBQUNILGFBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9CO0tBQ0o7Q0FDSixDQUFDOzs7QUFBQyIsImZpbGUiOiJIZWFkZXJWaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiS2Vuc2VvLnZpZXdzLkhlYWRlciA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcbiAgICAvLyBUaGUgRE9NIEVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgdmlld1xuICAgIGVsOiBcIi5wcm9maWxlLXBpYy1ob2xkZXJcIixcbiAgICAvLyBWaWV3IGNvbnN0cnVjdG9yXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgLy8gQ2FsbHMgdGhlIHZpZXcncyByZW5kZXIgbWV0aG9kXG4gICAgICAgIC8vdGhpcy5tb2RlbCA9IHRoaXMubW9kZWwgfHwgbmV3IEtlbnNlby5tb2RlbHMuSGVhZGVyKClcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9LFxuICAgIC8vIFZpZXcgRXZlbnQgSGFuZGxlcnNcbiAgICAvLyBldmVudHM6IHtcbiAgICAvLyAgICAgJ2NsaWNrIC5oYW1idXJnZXInOiAnbWVudUNsaWNrJyxcbiAgICAvLyAgICAgJ2NsaWNrIC5tZW51JzogJ3N0b3BNZW51Q2xpY2snXG4gICAgLy8gfSxcbiAgICAvLyBSZW5kZXJzIHRoZSB2aWV3J3MgdGVtcGxhdGUgdG8gdGhlIFVJXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHNiLnJlbmRlclRlbXBsYXRlKHsgXCJ0ZW1wbGF0ZU5hbWVcIjogXCJoZWFkZXJcIiwgXCJ0ZW1wbGF0ZUhvbGRlclwiOiB0aGlzLiRlbCwgXCJtb2RlbFwiOiB0aGlzLm1vZGVsLCBcImNhbGxiYWNrZnVuY1wiOiB0aGlzLmhlYWRlckF0dGFjaEV2ZW50cy5iaW5kKHRoaXMpIH0pO1xuICAgICAgICAvLyBNYWludGFpbnMgY2hhaW5hYmlsaXR5XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgaGVhZGVyQXR0YWNoRXZlbnRzOiBmdW5jdGlvbiBoZWFkZXJBdHRhY2hFdmVudHMoKSB7XG4gICAgICAgICQoXCIuaGFtYnVyZ2VyXCIpLm9uKFwiY2xpY2tcIiwgdGhpcy5tZW51Q2xpY2spO1xuICAgICAgICAkKFwiLm1lbnVcIikub24oXCJjbGlja1wiLCB0aGlzLnN0b3BNZW51Q2xpY2spO1xuICAgICAgICAkKFwiLnNlYXJjaC1pY29uXCIpLm9uKFwiY2xpY2tcIiwgdGhpcy5zaG93U2VhcmNoQm94KTtcbiAgICAgICAgJChcIi5wb3B1cC1jb250YWluZXJcIikub24oXCJrZXl1cFwiLCBcIi5zZWFyY2gtZmllbGRcIiwgdGhpcy52YWxpZGF0ZVNlYXJjaCk7XG4gICAgfSxcbiAgICBtZW51Q2xpY2s6IGZ1bmN0aW9uIG1lbnVDbGljayhlKSB7XG4gICAgICAgIGlmICghJChcIi5tZW51XCIpLmh0bWwoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNiLnJvdXRlci5tZW51KCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHN0b3BNZW51Q2xpY2s6IGZ1bmN0aW9uIHN0b3BNZW51Q2xpY2soZSkge30sXG4gICAgc2hvd1NlYXJjaEJveDogZnVuY3Rpb24gc2hvd1NlYXJjaEJveCgpIHtcbiAgICAgICAgdmFyICRwb3B1cENvbnRhaW5lciA9ICQoXCIucG9wdXAtY29udGFpbmVyXCIpO1xuICAgICAgICAkcG9wdXBDb250YWluZXIuc2hvdygpO1xuICAgICAgICBzYi5yZW5kZXJUZW1wbGF0ZSh7IFwidGVtcGxhdGVOYW1lXCI6IFwic2VhcmNoXCIsIFwidGVtcGxhdGVIb2xkZXJcIjogJHBvcHVwQ29udGFpbmVyIH0pO1xuICAgIH0sXG4gICAgdmFsaWRhdGVTZWFyY2g6IGZ1bmN0aW9uIHZhbGlkYXRlU2VhcmNoKGUpIHtcbiAgICAgICAgdmFyIHNlYXJjaFN0cmluZyA9IHRoaXMudmFsdWU7XG4gICAgICAgIGlmIChzZWFyY2hTdHJpbmcubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgc2IubG9hZEZpbGVzKHtcbiAgICAgICAgICAgICAgICBcIm1vZGVsc1wiOiBbXCJTZWFyY2hcIl0sXG4gICAgICAgICAgICAgICAgXCJjb2xsZWN0aW9uc1wiOiBbXCJTZWFyY2hcIl1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzYi5yZW5kZXJUZW1wbGF0ZSh7IFwidGVtcGxhdGVOYW1lXCI6IFwic2VhcmNoLXJlc3VsdHNcIiwgXCJ0ZW1wbGF0ZUhvbGRlclwiOiAkKFwiLnNlYXJjaC1zZWN0aW9uXCIpLmZpbmQoXCIuc2VhcmNoLXJlc3VsdHNcIiksIFwiY29sbGVjdGlvblwiOiBuZXcgS2Vuc2VvLmNvbGxlY3Rpb25zLlNlYXJjaCgpLCBcImNhbGxiYWNrZnVuY1wiOiBmdW5jdGlvbiBjYWxsYmFja2Z1bmMoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIi5zZWFyY2gtcmVzdWx0c1wiKS5jaGlsZHJlbigpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuc2VhcmNoLXJlc3VsdHNcIikuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNlYXJjaC1yZXN1bHRzXCIpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3RyaW5nXCI6IHNlYXJjaFN0cmluZ1xuICAgICAgICAgICAgICAgICAgICB9IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiLnNlYXJjaC1yZXN1bHRzXCIpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vLyBlLnN0b3BQcm9wYWdhdGlvbigpOyJdfQ==