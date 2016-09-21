Kenseo.views.Comments = Backbone.View.extend({
    initialize: function(payload){
        this.payload = payload;
        this.el = document.createDocumentFragment();
        return this;
    },
    render: function(){
        var _this = this;
        _this.collection.each(function(model, modelIndex, models){
            var commentView = new Kenseo.views.Comment({
                model: model,
                threadScope: _this.payload.parentScope
            });

            _this.el.appendChild(commentView.render().el);
        });

        return _this;
    }
});

Kenseo.views.Comment = Backbone.View.extend({
    tagName: "div",
    className: "cv-comments-item",
    initialize: function(payload){
        this.payload = payload;

        var thread = payload.threadScope;
        thread.comments.push(this);

        // bind events
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.destroy);

        return this;
    },
    render: function(){
        var _this = this;

        _this.$el.html(sb.setTemplate('comment-item', {data : _this.model.toJSON()}));
        return _this;
    },
    destroy: function(){
        this.$el.remove();
    },
    events: {
        // edit
        "click [data-url='edit-comment']"   : "handleEditClicked",
        // delete
        "click [data-url='delete-comment']" : "handleDeleteClicked",
    },
    handleEditClicked: function(e){
        Kenseo.scope        = this;
        Kenseo.popup.data   = this.model.toJSON();
    },
    handleDeleteClicked: function(e){
        Kenseo.scope        = this;
        Kenseo.popup.data   = this.model.toJSON();
    }
});

Kenseo.models.Comment = Backbone.Model.extend({

});

Kenseo.collections.Comment = Backbone.Collection.extend({
    model: Kenseo.models.Comment
});
