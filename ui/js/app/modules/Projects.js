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
        if(payload.archivedTemplateHolder){
          this.archivedTemplateHolder = payload.archivedTemplateHolder;
        }
        this.render();
    },
    events: {},
    render: function render() {
        // sb.renderXTemplate(this);
        var _this = this;

        // Making sure the element is empty
        _this.templateHolder.html('');
        if(_this.archivedTemplateHolder){
          _this.archivedTemplateHolder.html('');
        }


        _this.collection.fetch(sb.getStandardData({
            data: _this.data,
            success: function(collection, response){
                console.log("hello");
                var data = response.data;
                //filter the data to get active projects
                data.filter(function(item){
                  return item['is_archive'] === "0"
                }).forEach(function(item){
                  appendItems(item, _this.templateHolder);
                });

                //filter the data to get archived projects
                data.filter(function(item){
                  return item['is_archive'] === "1"
                }).forEach(function(item){
                  appendItems(item, _this.archivedTemplateHolder);
                });


                function appendItems(item,templateHolder){
                    var view = new Kenseo.views.Project({
                        model: new Kenseo.models.Projects(item),
                        collection: _this.collection,
                        parent: _this,

                    });
                    templateHolder.append(view.el);
                }
            }
        }));

        sb.subscribe($(window), 'addProject', function(){
            var view = new Kenseo.views.Project({
                // Insert global variable data in to the model
                model: new Kenseo.models.Projects(Kenseo.data.model),
                collection: _this.collection,
                parent: _this
            })
            _this.templateHolder.prepend(view.el);

            // Empty the used global variable
            Kenseo.data.model = {};

        });
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
    initialize: function initialize(payload) {
        // if(this.model){
        //     this.listenTo(this.model, 'remove', this.remove);
        // }
        this.listenTo(this.model, 'change', this.render);

        this.parent = payload.parent;
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
        var data = this.model.toJSON();
        var html = this.template({ data: data });

        this.$el.html(html);
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
        var peopleView = new Kenseo.views.People({});
        peopleView.addPeople(e, this);
    },
    archiveProject: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this,
            afterRender: function($popupContainer, scope){
                sb.attachIn('click', '.ok-btn', function(){
                    var includeArchives = scope.parent.data.includeArchives;
                    if(!includeArchives){  // if includeArchives is true, the user is in projects page
                        // hide the item temporarily
                        scope.$el.hide();
                    }
                    else{
                        var isArchive = scope.model.get('is_archive');
                        scope.model.set('is_archive', "1");
                    }
                    sb.ajaxCall({
                        url: sb.getRelativePath('archiveProject'),
                        data: scope.model.toJSON(),
                        success: function(response){
                            // console.log("delete artefact");
                            if(response.data){ // is true
                                if(!includeArchives){
                                    // delete the item permanently
                                    scope.$el.remove();
                                }
                                // hide popup
                                $popupContainer.children().remove();
                                $popupContainer.hide();
                                if(response.data.messages) {
                        			    sb.showGlobalMessages(response);
                                }
                                // delete the item permanently

                            }
                            //move the archived project to archived projects list
                            scope.parent.archivedTemplateHolder.prepend(scope.$el);
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
            scope: this,
            afterRender: function($popupContainer, scope){
                sb.attachIn('click', '.ok-btn', function(){
                    var isArchive = scope.model.get('is_archive');
                    scope.model.set('is_archive', "0");
                    sb.ajaxCall({
                        url: sb.getRelativePath('unarchiveProject'),
                        data: scope.model.toJSON(),
                        success: function(response){
                            // console.log("delete artefact");
                            if(response.data){ // is true
                                // hide popup
                                $popupContainer.children().remove();
                                $popupContainer.hide();
                                if(response.data.messages) {
                        			    sb.showGlobalMessages(response);
                                }
                            }
                            //add the unarchived project to active projects
                            scope.parent.templateHolder.prepend(scope.$el);
                        }
                    })
                }, $popupContainer);
            }
        });
    }
});


Kenseo.models.Projects = Backbone.Model.extend({
    // urlRoot: "app/packages/db-projects.json",
    defaults: {
        id: null,
        intro_image_url: null,
        is_archive: null,
        is_owner: null,
        last_updated_date: null,
        name: null
    }
});

Kenseo.collections.Projects = Backbone.Collection.extend({
	url: sb.getRelativePath("getProjects"),
	model: function(attrs, options){
		return new Kenseo.models.Projects();
	}
});
