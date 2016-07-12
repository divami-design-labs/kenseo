// Kenseo.views.Artefacts = Backbone.View.extend({
//     // The DOM Element associated with this view
//     el: '.review-requests-content',
//     itemView: function itemView(x) {
//         return new Kenseo.views.Artefact(x);
//     },
//     // View constructor
//     initialize: function initialize(payload) {
//         this.data = payload.data;
//         this.colStr = payload.colStr;
//         this.el = payload.el;
//         this.$el.html(this.template);
//         this.preLoader = payload.preLoader;
//         this.id = payload.id;
//         this.stopRenderX = payload.stopRenderX;
//         // this.payload = payload;
//         this.render();
//     },
//     render: function render() {
//         sb.renderXTemplate(this);
//
//         return this;
//     }
// });
//
// Kenseo.views.Artefact = Backbone.View.extend({
//     // The DOM Element associated with this view
//     tagName: 'a',
//     className: 'review-request-item',
//     template: function(data){
//         return sb.setTemplate('artefact', data);
//     },
//     // View constructor
//     initialize: function initialize() {
//         this.listenTo(this.model, 'remove', this.remove);
//     },
//     events: {
//         'click .popup-click': 'openPopup',
//         'click .artefact-cur-version': 'toggleVersions'
//     },
//     render: function render() {
//         var data = this.model.toJSON();
//         var html = this.template({ data: data });
//         this.$el.append(html);
//         var dataComparer = -1;
//         this.$el.attr('data-pass', (function () {
//             if (dataComparer == data.linkedId) {
//                 dataComparer = data.linkedId;
//                 return 1;
//             } else {
//                 dataComparer = data.linkedId;
//                 return 0;
//             }
//         })());
//
//         this.$el.attr('href', '#documentview/' + data.versionId);
//
//         return this;
//     },
//     openPopup: function openPopup(e) {
//         e.preventDefault();
//         // var model = this.model.collection.get($(e.currentTarget).data('id'));
//         sb.setPopupData(this.model.toJSON());
//
//         // Kenseo.currentModel = model;
//     },
//     toggleVersions: function toggleVersions(e) {
//         var $self = $(this);
//         var num = +$self.html().substr(1);
//         if (num > 0) {
//             $self.toggleClass('active');
//         }
//     }
// });

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
        _this.collection.fetch(sb.getStandardData({
            data: _this.data,
            success: function(collection, response){
                // console.dir(response);
                var data = response.data;
                if(_this.templateWrapperHolder){
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
                    sb.attach($('.sub-menu-item'), 'click', function(e){
                        var el = e.currentTarget;
                        var sortType = el.getAttribute('data-stype');
                        _this.sortBy = sortType;
                        _this.data.sortBy = sortType;
                        _this.render();
                    });
                }

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
                })
            }
        }));
    }
});

Kenseo.views.Artefact = Backbone.View.extend({
    tagName: 'div',
    className: 'review-request-item',
    template: function(data){
        return sb.setTemplate('artefact', {data: data});
    },
    initialize: function(payload){
        this.linkedArtefactNo = payload.linkedArtefactNo();
        this.render();
        return this;//.render();
    },
    render: function(){
        var data = this.model.toJSON();
        this.$el.html(this.template(data));
        this.$el.attr('data-pass', this.linkedArtefactNo);
        return this;
    },
    events: {
        "click [data-url='delete-artefact']"    :   "deleteArtefact",
        "click [data-url='archive-artefact']"   :   "archiveArtefact",
        "click [data-url='replace-artefact']"   :   "replaceArtefact",
        "click [data-url='add-version']"        :   "addVersion",
        "click [data-url='share-artefact']"     :   "shareArtefact"
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
                        data: scope.model,
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
    }
});