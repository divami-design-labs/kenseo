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
        sb.svgLoader(["search"]);

        var $popupContainer = $(".popup-container");
        $popupContainer.show();
        sb.renderTemplate({ "templateName": "search", "templateHolder": $popupContainer });
    },
    validateSearch: function validateSearch(e) {
        var searchString = this.value;
        if (searchString.length > 2) {
            sb.loadFiles({
                // "models": ["Search"],
                // "collections": ["Search"]
                "modules": ["Search"]
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


Kenseo.models.Header = Backbone.Model.extend({
	urlRoot: sb.getRelativePath('getHeader')
});
