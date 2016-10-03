Kenseo.views.Artefacts = Backbone.View.extend({
    initialize: function(payload){
        this.data = payload.data;
        this.templateHolder = payload.templateHolder;
        // presence of templateWrapperHolder is assumed to render the project page section
        this.templateWrapperHolder = payload.templateWrapperHolder;
        this.sortBy = payload.sortBy;
        this.render();
        return this;
    },
    render: function(){
        var _this = this;
        // ajax call
        _this.collection.fetch(sb.getStandardData({
            data: _this.data,
            success: function(collection, response){
                // console.dir(response);
                var data = response.data;
                if(_this.templateWrapperHolder){
                    // Making sure the element is empty
                    _this.templateWrapperHolder.html('');

                    sb.renderTemplate({
                        templateHolder: _this.templateWrapperHolder,
                        templateName: 'artefacts',
                        data: {
                            data: {
                                projects: data,
                                sortBy: _this.sortBy  // for template massaging
                            }
                        }
                    });

                    _this.templateHolder = _this.templateWrapperHolder.find('.artifacts-content');

                    // Attach necessary events
                    sb.attach($('.sort-item'), 'click', function(e){
                        var el = e.currentTarget;
                        var sortType = el.getAttribute('data-stype');
                        _this.sortBy = sortType;
                        _this.data.sortBy = sortType;
                        _this.render();
                    });
                }

                // make sure the element is empty
                _this.templateHolder.html('');

                var linkedId = -1;
                data.forEach(function(m, i, a){
                    // console.log(linkedId, m['linked_id'], linkedId === +m['linked_id']);
                    var view = new Kenseo.views.Artefact({
                        model: new Kenseo.models.Artefacts(m),
                        collection: _this.collection,
                        linkedArtefactNo: function(){
                            if(m['linked_id'] !== null){
                                if(((a[i-1] && a[i-1]['linked_id']) === m['linked_id'])){
                                    // console.log(m['linked_id'], "else if");
                                    return 1
                                }
                            }
                            // console.log(m['linked_id'], "something");
                            return 0;
                        }
                    });
                    linkedId = m['linked_id'];
                    _this.templateHolder.append(view.el);
                });

                // no items template
                if(data.length === 0){
                    _this.templateHolder.html("No artefacts found");
                }
            }
        }));
        //adds data to particular template holder when artefact is added
        sb.subscribe($(window), 'addArtefact', function(){
            var filteredData = null;
            Kenseo.data.model = Kenseo.data.model;
            if(Kenseo.current.page === "dashboard") {
                filteredData = Kenseo.data.model.filter(function(model){
                    return model.share;
                });
                filteredData.forEach(function(model){
                    $('.review-requests-content').find('.review-request-item').each(function(){
                        if($(this).find('.rr-title').attr('data-id') == model.id){
                            $(this).remove();
                        }
                    });
                });

            } else if(Kenseo.current.page === "project-page"){
                filteredData = Kenseo.data.model.filter(function(model){
                    return (Kenseo.page.id === model.project_id);
                })
            }
            filteredData.forEach(function(model){
                var view = new Kenseo.views.Artefact({
                    // Insert global variable data in to the model
                    model: new Kenseo.models.Artefacts(model),
                    collection: _this.collection,
                    parent: _this
                });
                _this.templateHolder.prepend(view.el);
            });

            // Empty the used global variable
            Kenseo.data.model = {};

        });

        return this;
    }
});

Kenseo.views.Artefact = Backbone.View.extend({
    tagName: 'div',
    className: 'review-request-item',
    template: function(data){
        return sb.setTemplate(this.payload.templateName|| 'artefact', {data: data});
    },
    initialize: function(payload){
        this.payload = payload;
        this.listenTo(this.model, 'change', this.render);
        if(payload.linkedArtefactNo) {
            this.linkedArtefactNo = payload.linkedArtefactNo();
        }
        this.render();
        return this;//.render();
    },
    render: function(){
        if(Kenseo.current.page === "project-page"){
            // setting a property which determines the artefact card is related to project page
            // and renders as necessary
            this.model.set('is_project_page', true);
        }
        var data = this.model.toJSON();
        this.$el.html(this.template(data));
        this.$el.attr('data-pass', this.linkedArtefactNo);
        return this;
    },
    destroy: function(){
        this.$el.remove();
    },
    events: {
        "click [data-url='rename-artefact']"    :   "renameArtefact",
        "click [data-url='edit-artefact-info']" :   "editArtefactInfo",
        "click [data-url='delete-artefact']"    :   "deleteArtefact",
        "click [data-url='archive-artefact']"   :   "archiveArtefact",
        "click [data-url='replace-artefact']"   :   "replaceArtefact",
        "click [data-url='add-version']"        :   "addVersion",
        "click [data-url='share-artefact']"     :   "shareArtefact",
        "click [data-url='create-meeting']"     :   "createMeeting",
        "click [data-url='private-message']"    :   "sendPrivateMessage"
    },
    sendPrivateMessage: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    },
    createMeeting: function(e){
        // this click handler runs along with the popup-click handler
        // the main intention of this click handler is to populate fields differently other than the main popup-click handler functionality

        // populate project name and artefact names
        var data = this.model.toJSON();
        sb.setPopulateValue('create-meeting', 'project_name',   data['project_name']);
        sb.setPopulateValue('create-meeting', 'project_id',     data['project_id']);
        sb.setPopulateValue('create-meeting', 'artefact_name',  data['title']);
        sb.setPopulateValue('create-meeting', 'artefact_id',    data['id']);
    },
    deleteArtefact: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this,
            afterRender: function($popupContainer, scope){
                sb.attachIn('click', '.ok-btn', function(){
                    // hide the item temporarily
                    scope.$el.hide();
                    sb.ajaxCall({
                        url: sb.getRelativePath('deleteArtefact'),
                        data: scope.model.toJSON(),
                        success: function(response){
                            // console.log("delete artefact");
                            if(response.data){ // is true
                                // hide popup
                                sb.popupCloser($popupContainer);
                                if(response.data.messages) {
                                  sb.showGlobalMessages(response);
                                }
                                // delete the item permanently
                                scope.$el.remove();
                            }
                        }
                    })
                }, $popupContainer);
            }
        });
    },
    shareArtefact: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this,
            beforeRender: function(){
                Kenseo.popup.info.projectComboboxValueChanged = false;
            }
        });
    },
    addVersion: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    },
    replaceArtefact: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    },
    archiveArtefact: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    },
    editArtefactInfo: function(e){
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    },
    renameArtefact: function(e){
        // Kenseo.scope = this;
        var el = e.currentTarget;
        sb.newCallPopup({
            el: el,
            scope: this
        });
    }
});

Kenseo.models.Artefacts = Backbone.Model.extend({
	// urlRoot: 'app/packages/artifacts.json'
	defaults: {
		MIME_type: null,
		artefact_time: null,
		artefact_ver_id: null,
		comment_count: null,
		document_type: null,
		id: null,
		image: null,
		masked_artefact_version_id: null,
		owner_id: null,
		person_name: null,
		project_id: null,
		project_name: null,
		status: null,
		title: null,
		version: null
	}
});

Kenseo.collections.Artefacts = Backbone.Collection.extend({
	url: sb.getRelativePath('getArtefacts'),
	model: function(attrs, options){
		// console.dir(arguments);
		return new Kenseo.models.Artefacts();
	}
});
