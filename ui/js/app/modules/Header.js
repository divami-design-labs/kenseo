Kenseo.views.Header = Backbone.View.extend({
    // The DOM Element associated with this view
    el: ".header",
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
        sb.renderTemplate({ 
            "templateName":     "header", 
            "templateHolder":   $(".profile-pic-holder"), 
            "model":            this.model, 
            "callbackfunc":     this.headerAttachEvents.bind(this) 
        });
        // Maintains chainability
        return this;
    },
    headerAttachEvents: function headerAttachEvents() {
        $(".hamburger")         .on("click", this.menuClick);
        $(".menu")              .on("click", this.stopMenuClick);
        $(".search-icon")       .on("click", this.showSearchBox);
        $(".popup-container")   .on("keyup", ".custom-search-field", this.validateSearch);
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
        if (searchString.length <= 2) {
            $(".search-results").hide();
            return;
        }
        $(".search-results").show();
        // var searchResults = new Kenseo.collections.SearchResults([
        //     new Kenseo.models.SearchResult({id: 1, title: 'Hello World'}),
        //     new Kenseo.models.SearchResult({id: 2, title: 'Bye World'})
        // ]);
        // var resultsView = new Kenseo.views.SearchResults({
        //     collection: searchResults
        // });
        // resultsView.render();
        sb.ajaxCall({
            url: sb.getRelativePath('search'),
            data: {
                searchKey: searchString
            },
            success: function(response) {
                console.log('Backend Response', response);
                var data = response.data || [];
                var resultsCollection = new Kenseo.collections.SearchResults(data);
                console.log('Result Collecton', resultsCollection);
                var searchResultsView = new Kenseo.views.SearchResults({
                    collection: resultsCollection
                });
                console.log('Results View', searchResultsView.render());
                $('.search-results').html(searchResultsView.$el[0].outerHTML)
            }
        })
        // sb.renderTemplate({
        //     "templateName": "search-results",
        //     "templateHolder": $(".search-section").find(".search-results"),
        //     "collection": searchResults,
        //     "callbackfunc": function callbackfunc() {
        //         if ($(".search-results").children().length) {
        //             $(".search-results").show();
        //         } else {
        //             $(".search-results").hide();
        //         }
        //     },
        //     "data": {
        //         "string": searchString
        //     }
        // });
    }
});


Kenseo.models.Header = Backbone.Model.extend({
	urlRoot: sb.getRelativePath('getHeader')
});
