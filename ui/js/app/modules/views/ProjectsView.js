Kenseo.views.Projects = Backbone.View.extend({
    // The DOM Element associated with this view
    tagName: 'div',
    itemView: function itemView(x) {
        return new Kenseo.views.Project(x);
    },
    // View constructor
    initialize: function initialize(payload) {
        this.data = payload.data;
        this.templateHolder = payload.templateHolder;
        this.render();
    },
    events: {},
    render: function render() {
        // sb.renderXTemplate(this);
        var _this = this;
        _this.collection.fetch(sb.getStandardData({
            data: _this.data,
            success: function(collection, response){
                console.log("hello");
                var data = response.data;
                data.forEach(function(item){
                    var view = new Kenseo.views.Project({
                        model: new Kenseo.models.Projects(item),
                        collection: _this.collection
                    });
                    _this.templateHolder.append(view.el);
                });
            }
        }));
        return this;
    }
});

Kenseo.views.Project = Backbone.View.extend({
    // The DOM Element associated with this view
    tagName: 'div',
    className: 'project-block',
    template: function(data){
        return sb.setTemplate('project-section', data)
    },
    // View constructor
    initialize: function initialize() {
        if(this.model){
            this.listenTo(this.model, 'remove', this.remove);
        }
        this.render();
        return this;
        // this.listenTo(this.model.collection, 'add', this.render);
    },
    events: {
        'click .popup-click': 'openPopup',
        'click [data-url="add-artefact"]': 'addArtefact',
        'click [data-url="add-people"]': 'addPeople',
        'click [data-url="archive-project"]': 'archiveProject',
        'click [data-url="unarchive-project"]': 'unarchiveProject'
    },
    render: function render(data) {
        var data = data || this.model.toJSON();
        var html = this.template({ data: data });
        // make sure the element is empty
        this.$el.html('');

        this.$el.append(html);
        return this;
    },
    openPopup: function openPopup(e) {
        // e.preventDefault();
        // // var model = this.model.collection.get($(e.currentTarget).data('id'));
        // sb.setPopupData(this.model.toJSON());

        // Kenseo.currentModel = model;
    },
    addArtefact: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    },
    addPeople: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    },
    archiveProject: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this,
            afterRender: function($popupContainer, scope){
                sb.attachIn('click', '.ok-btn', function(){
                    // hide the item temporarily
                    scope.$el.hide();
                    sb.ajaxCall({
                        url: sb.getRelativePath('archiveProject'),
                        data: scope.model.toJSON(),
                        success: function(response){
                            // console.log("delete artefact");
                            if(response.data){ // is true
                                // hide popup
                                $popupContainer.remove();
                                $popupContainer.hide();
                                // delete the item permanently
                                scope.$el.remove();
                            }
                        }
                    })
                }, $popupContainer);
            }
        });
    },
    unarchiveProject: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    }
});