Kenseo.views.SearchResults = Backbone.View.extend({
    tagName: 'div',
    render: function() {
        var _this = this;
        console.log(_this.collection);
        _this.collection.each(function(model) {
            var searchResultView = new Kenseo.views.searchResult({
                model: model
            })
            _this.$el.append(searchResultView.render().$el);
        });
        return _this;
    }
});

Kenseo.views.searchResult = Backbone.View.extend({
    tagName: 'div',
    template: function(data) {
       return sb.setTemplate('search-result', {data: data}); 
    },
    render: function() {
        var _this = this;
        this.$el.html(this.template(_this.model.toJSON()));
        console.log(_this);
        return _this;
    }
});

Kenseo.models.SearchResult = Backbone.Model.extend({
    defaults: {
        id: '',
        title: '',
        type: ''
    }
});

// Kenseo.view.SearchResult = Backbone.View.extend({});

Kenseo.collections.SearchResults = Backbone.Collection.extend({
    model: Kenseo.models.SearchResult
});
