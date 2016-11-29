Kenseo.views.Tags = Backbone.View.extend({
    el: '.outerContainer.inView .tags-content',
    initialize: function initialize(payload) {
        this.payload = payload;
        this.templateHolder = payload.templateHolder;
        this.render();
    },
    render: function render() {
        var _this = this;
		_this.collection.each(function(model, modelIndex, models){
            var tag = new Kenseo.views.Tag({
                model: model,
				parentScope: _this
            });

            _this.el.appendChild(tag.render().el);
        });


        return this;
    }
});

Kenseo.views.Tag = Backbone.View.extend({
    tagName: "div",
    className: "tag-holder",
    template: function(data){
        return sb.setTemplate('document-summary-tag', {data: data});
    },
    initialize: function(payload){
        this.data = payload.data;
        this.payload = payload;
        return this;
    },
    render: function(){
        var _this = this;
		var data = _this.model.toJSON();
        _this.$el.append(this.template(data));
        return this;
    },
    events: {
		"click .close-tag-icon" : "deleteTag"
    },
	deleteTag: function(){
		var _this = this;
		var data = _this.model.toJSON();
        var artefact_id = _this.payload.parentScope.payload.data;
        sb.setPopupData("removeTag", "actionType");
        sb.setPopupData("removeTag", "command");
        sb.setPopupData(artefact_id, "artefact_id");
        sb.setPopupData(data.tag_id, "tag_id");
        sb.setPopupData(data.tag_name, "tag_name");
	}
});


Kenseo.models.Tags = Backbone.Model.extend({
    "default": {

    }
});

Kenseo.collections.Tags = Backbone.Collection.extend({
    model: Kenseo.models.Tags
});
