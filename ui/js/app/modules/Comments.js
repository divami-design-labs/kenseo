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

        return this;
    },
    render: function(){
        var _this = this;

        _this.$el.html(sb.setTemplate('comment-item', {data : _this.model.toJSON()}));
        return _this;
    },
    events: {
        // edit
        "click .cv-comment-edit":   "handleEditClicked",
        // delete
        "click .cv-comment-delete": "handleDeleteClicked",
    },
    handleEditClicked: function(e){
        e.stopPropagation();  // necessary to avoid normalizing of actions
        this.$el.find('.cv-comment-detail').prop('contenteditable', true);
    },
    handleDeleteClicked: function(e){
        e.stopPropagation();  // necessary to avoid normalizing of actions
    }
});

Kenseo.models.Comment = Backbone.Model.extend({

});

Kenseo.collections.Comment = Backbone.Collection.extend({
    model: Kenseo.models.Comment
});
