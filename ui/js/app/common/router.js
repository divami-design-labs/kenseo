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
        "documentview/:id": "documentView"
    },
    index: sb.router.dashboard,
    projectPage: sb.router.projectPage,
    meetingNotes: sb.router.meetingNotes,
    documentView: sb.router.documentView
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2JhYmVsLWFwcC9jb21tb24vcm91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2hDLGNBQVUsRUFBRSxTQUFTLFVBQVUsR0FBRzs7QUFFOUIsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDNUI7O0FBRUQsVUFBTSxFQUFFOztBQUVKLFVBQUUsRUFBRSxPQUFPO0FBQ1gseUJBQWlCLEVBQUUsYUFBYTtBQUNoQywwQkFBa0IsRUFBRSxjQUFjO0FBQ2xDLDBCQUFrQixFQUFFLGNBQWM7S0FDckM7QUFDRCxTQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTO0FBQzFCLGVBQVcsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVc7QUFDbEMsZ0JBQVksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVk7QUFDcEMsZ0JBQVksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVk7Q0FDdkMsQ0FBQyxDQUFDIiwiZmlsZSI6InJvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSb3V0ZXIgPSBCYWNrYm9uZS5Sb3V0ZXIuZXh0ZW5kKHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICAgICAvLyBUZWxscyBCYWNrYm9uZSB0byBzdGFydCB3YXRjaGluZyBmb3IgaGFzaGNoYW5nZSBldmVudHNcbiAgICAgICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCgpO1xuICAgIH0sXG4gICAgLy8gQWxsIG9mIHlvdXIgQmFja2JvbmUgUm91dGVzIChhZGQgbW9yZSlcbiAgICByb3V0ZXM6IHtcbiAgICAgICAgLy8gV2hlbiB0aGVyZSBpcyBubyBoYXNoIG9uIHRoZSB1cmwsIHRoZSBob21lIG1ldGhvZCBpcyBjYWxsZWRcbiAgICAgICAgXCJcIjogXCJpbmRleFwiLFxuICAgICAgICBcInByb2plY3RwYWdlLzppZFwiOiBcInByb2plY3RQYWdlXCIsXG4gICAgICAgIFwibWVldGluZ25vdGVzLzppZFwiOiBcIm1lZXRpbmdOb3Rlc1wiLFxuICAgICAgICBcImRvY3VtZW50dmlldy86aWRcIjogXCJkb2N1bWVudFZpZXdcIlxuICAgIH0sXG4gICAgaW5kZXg6IHNiLnJvdXRlci5kYXNoYm9hcmQsXG4gICAgcHJvamVjdFBhZ2U6IHNiLnJvdXRlci5wcm9qZWN0UGFnZSxcbiAgICBtZWV0aW5nTm90ZXM6IHNiLnJvdXRlci5tZWV0aW5nTm90ZXMsXG4gICAgZG9jdW1lbnRWaWV3OiBzYi5yb3V0ZXIuZG9jdW1lbnRWaWV3XG59KTsiXX0=