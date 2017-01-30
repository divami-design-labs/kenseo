Kenseo.views.projectPage = Backbone.View.extend({
    tagName: 'div',
    className: 'projectPage',
    initialize: function(payload){
        this.payload = payload.payload;
        return this;
    },
    render: function(){
        var _this = this;
        var data = _this.model.toJSON();
        // Kenseo.popup.data = Kenseo.page.id;
         sb.setPopupData(Kenseo.page.id, "project_id");
         sb.setPopupData(this.model.toJSON());
        // sb.router.regulator(['.project-section']);
        console.log(sb.router, "hereee");
        sb.renderTemplate({ 'templateName': 'project-page', 'templateHolder': _this.payload.templateHolder, 'data': data });
        _this.payload.templateHolder.show();
        var sortBy = sortBy || 'default';
        new Kenseo.views.Artefacts({
                    collection: new Kenseo.collections.Artefacts(),
                    templateHolder: $('.artifacts-content'),
                    templateWrapperHolder: $('.review-requests-content.artifacts-section'),
                    sortBy: sortBy,
                    data: { projects: true, project_id: Kenseo.page.id, sharePermission: false, sortBy: sortBy, withVersions: true }
                });
        new Kenseo.views.Activities({
                    collection: new Kenseo.collections.Activities(),
                    templateHolder: '.activity-section-content',
                    templateWrapperHolder: $('.activity-section'),
                    data: { project_id: Kenseo.page.id }
                });
        var peopleView = new Kenseo.views.People({
                        collection: new Kenseo.collections.People(),
                        templateHolder: '.people-section-content',
                        templateWrapperHolder: $('.people-section'),
                        data: { projectId: Kenseo.page.id }
                    });

                    peopleView.render();

    },
    events: {
        // 'click [data-url="add-artefact"]': 'addArtefact'
    },
    addArtefact: function(e){
        var $self = $(e);
        var $dataHolder = $self.closest('.data-holder');
        if($dataHolder.length){
            sb.insertPopupData($dataHolder);
        }
        else if($self.hasClass('data-holder')){
            sb.insertPopupData($self);
        }
        else{
            sb.log("Didn't provide data-holder class to the element or its parent");
        }

        sb.navigate('popup', this);
    }
    // events: {
    //     // 'click .popup-click': 'openPopup',
    //     // 'click [data-url="add-artefact"]': 'addArtefact',
    //     // 'click [data-url="add-people"]': 'addPeople',
    //     // 'click [data-url="archive-project"]': 'archiveProject',
    //     // 'click [data-url="unarchive-project"]': 'unarchiveProject'
    // },
    // render: function render(data) {
    //     var data = this.model.toJSON();
    //     var html = this.template({ data: data });

    //     this.$el.html(html);
    //     return this;
    // },
    // openPopup: function openPopup(e) {
    //     // e.preventDefault();
    //     // // var model = this.model.collection.get($(e.currentTarget).data('id'));
    //     // sb.setPopupData(this.model.toJSON());

    //     // Kenseo.currentModel = model;
    // },
    // addArtefact: function(e){
    //     var el = e.currentTarget;
    //     sb.newCallPopup({
    //         el: el,
    //         scope: this
    //     });
    // },
    // addPeople: function(e){
    //     var peopleView = new Kenseo.views.People({});
    //     peopleView.addPeople(e, this);
    // },
    // archiveProject: function(e){
    //     var el = e.currentTarget;
    //     sb.newCallPopup({
    //         el: el,
    //         scope: this,
    //         afterRender: function($popupContainer, scope){
    //             sb.attachIn('click', '.ok-btn', function(){
    //                 var includeArchives = scope.parent.data.includeArchives;
    //                 if(!includeArchives){  // if includeArchives is true, the user is in projects page
    //                     // hide the item temporarily
    //                     scope.$el.hide();
    //                 }
    //                 else{
    //                     var isArchive = scope.model.get('is_archive');
    //                     scope.model.set('is_archive', "1");
    //                 }
    //                 sb.ajaxCall({
    //                     url: sb.getRelativePath('archiveProject'),
    //                     data: scope.model.toJSON(),
    //                     container: $('.popup'),
    //                     success: function(response){
    //                         // console.log("delete artefact");
    //                         if(response.data){ // is true
    //                             if(!includeArchives){
    //                                 // delete the item permanently
    //                                 scope.$el.remove();
    //                             }
    //                             // hide popup
    //                             $popupContainer.children().remove();
    //                             $popupContainer.hide();
    //                             if(response.data.messages) {
    //                                     sb.showGlobalMessages(response);
    //                             }
    //                             // delete the item permanently

    //                         }
    //                         //move the archived project to archived projects list
    //                         if(scope.parent.archivedTemplateHolder){  // template will be available only for projectspage but not for dashboard
    //                             scope.parent.archivedTemplateHolder.prepend(scope.$el);
    //                         }
    //                     }
    //                 })
    //             }, $popupContainer);
    //         }
    //     });
    // },
    // unarchiveProject: function(e){
    //     var el = e.currentTarget;
    //     sb.newCallPopup({
    //         el: el,
    //         scope: this,
    //         afterRender: function($popupContainer, scope){
    //             sb.attachIn('click', '.ok-btn', function(){
    //                 var isArchive = scope.model.get('is_archive');
    //                 scope.model.set('is_archive', "0");
    //                 sb.ajaxCall({
    //                     url: sb.getRelativePath('unarchiveProject'),
    //                     data: scope.model.toJSON(),
    //                     container: $('.popup'),
    //                     success: function(response){
    //                         // console.log("delete artefact");
    //                         if(response.data){ // is true
    //                             // hide popup
    //                             $popupContainer.children().remove();
    //                             $popupContainer.hide();
    //                             if(response.data.messages) {
    //                                     sb.showGlobalMessages(response);
    //                             }
    //                         }
    //                         //add the unarchived project to active projects
    //                         scope.parent.templateHolder.prepend(scope.$el);
    //                     }
    //                 })
    //             }, $popupContainer);
    //         }
    //     });
    // }
});

Kenseo.models.projectPage = Backbone.Model.extend({
    defaults: {

    }
});
