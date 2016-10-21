Kenseo.views.versions = Backbone.View.extend({
    el: '.versions-content',
    initialize: function initialize(payload) {
        this.payload = payload;
        this.templateHolder = payload.templateHolder;
        this.render();
    },
    render: function render() {
        var _this = this;
		_this.collection.each(function(model, modelIndex, models){
            var currentVersionId = (model.toJSON()).artefact_ver_id;
            if(currentVersionId != _this.payload.data.versionId){
                var version = new Kenseo.views.version({
                    model: model,
                    parentScope: _this
                });

                _this.el.appendChild(version.render().el);
            }

        });


        return this;
    }
});

Kenseo.views.version = Backbone.View.extend({
    tagName: "div",
    className: "version-holder",
    template: function(data){
        return sb.setTemplate('version', {data: data});
    },
    initialize: function(payload){
        this.data = payload.data;
        this.payload = payload;
        return this;
    },
    render: function(){
        var _this = this;
		var data = _this.model.toJSON();
        data.artefact_name = _this.payload.parentScope.payload.data.artefact_name;
        _this.$el.append(this.template(data));
        return this;
    },
    events: {

    },

});


Kenseo.models.versions = Backbone.Model.extend({
    "default": {

    }
});

Kenseo.collections.versions = Backbone.Collection.extend({
    model: Kenseo.models.versions
});
