Kenseo.views.DocumentView = Backbone.View.extend({
    tagName: 'div',
    className: 'outerContainer inView',
    initialize: function(payload){
        this.payload = payload.payload;


        return this;
    },
    render: function(){
        var _this = this;
        var maskedVersionId = _this.payload.maskedId;

        // setting the model
        _this.model.set('masked_version_id', maskedVersionId);

        // console.log(this);
        var data = _this.model.toJSON();

        _this.$el.attr({
            'rel': 'pdf_' + data.versionId
        });
        // var params = response.params;
        // var maskedVersionId = params.maskedArtefactVersionId;


        // Before painting the new doc lets hide all the existing docs
        $('.outerContainer.inView').removeClass('inView');

        // Before adding the new tabItem un select the existing ones
        $('.tab-item.selectedTab').removeClass('selectedTab');

        // Before painting the pdf into the viewer we need to add a tab for it.
        // pdf viewer
        if (data.type == 'application/pdf') {
            var str = sb.setTemplate('tab-file', {
                maskedVersionId: maskedVersionId,
                data: data
            });
            // var str = '<a href="#documentview/' + maskedVersionId + '" class="tab-item selectedTab" targetRel="' + data.versionId + '"><div class= "fileTab" ></div></a>';
            $('.dv-tab-panel-section').prepend(str);
            $('.pdfs-container').append(this.$el.html(sb.setTemplate('pdf-viewer', {data: data})));

            new paintPdf({
                url: sb.getRelativePath(data.documentPath),
                container: $('.outerContainer.inView').get(0),
                targetId: data.versionId,
                versionId: data.artefactId,
                documentView: this
            });

            //now get the version details of this version and show shared details
            sb.renderTemplate({
                url: sb.getRelativePath('getVersionDetails'),
                data: {
                    // versionId: Kenseo.data.artefact.id
                    versionId: data.versionId
                },
                templateName: 'dv-peoplesection',
                templateHolder: $('.dv-tb-people-section')
            });



            // Store the current artefact version related data in a global variable
            var threads = data.threads;
            // flag
            threads.noChangesDetected = true;
            sb.setCurrentDocumentData(data.versionId, threads);
            // annotator.init();
        }
        // Image viewer
        else if(data.type.indexOf('image') > -1){
            var str = sb.setTemplate('tab-img', {
                maskedVersionId: maskedVersionId,
                data: data
            });
            // var str = '<a href="#documentview/' + maskedVersionId + '" class="tab-item selectedTab" targetRel="' + data.versionId + '"><div class= " imageTab" ></div></a>';
            $('.dv-tab-panel-section').prepend(str);
            $('.pdfs-container').append(this.$el.html(sb.setTemplate('pdf-toolbar', {data: data})));
            // $('.pdfs-container').append('')
        }
        sb.setVersionIdForMaskedId(maskedVersionId, data.versionId);
        var parent = document.querySelector('.outerContainer.inView .viewerContainer.parent');
        _this.stickToBottom(parent);
    },
    events: {
        "click .new-textlayer": "handleDocumentLayerClick",
        "click .dvt-item.toggle-annotations-icon": "handleToggleAnnotations"
    },
    handleToggleAnnotations: function(e){
        var $self = $(e.currentTarget);
        var $outerContainer = $self.parents('.outerContainer');
        if($self.hasClass('active')){
            $outerContainer.find('.shape').addClass('hide-comment-section');
        }
        else{
            $outerContainer.find('.shape').removeClass('hide-comment-section');	
        }
    },
    handleDocumentLayerClick: function(e){
        var $self = $(e.currentTarget);
        var $outerContainer = $self.parents('.outerContainer');
        var $annotateIcon = $outerContainer.find('.dvt-item.add-comment-icon');
        // Do annotate if the annotate icon is active
        if($annotateIcon.hasClass('active')){
            this.annotate(e);
        }
    },
    stickToBottom: function (parent) {
        var bar = parent.querySelector('.bar');
        var top = bar.offsetTop;
        parent.addEventListener('scroll', function (e) {
            var el = e.currentTarget;
            bar.style.bottom = -el.scrollTop + "px";
            bar.style.left = el.scrollLeft + "px";
        });
    },
    closeTab: function(ele){
      var $el = ele.parents('.each-tab');
      //get the current tab item
      var rel = $el.find('.tab-item').attr('targetRel');
      $('.outerContainer[rel="pdf_' + rel + '"]').remove();
      $el.remove();
    },
    annotate: function(e){
        var $target = $(e.target);
        if(sb.hasInheritClass($target, ['comment-container', 'current-artefact-info'])){
            // bringToFront();
            var $currentCommentContainer = $target.hasClass('comment-container')? $target: $target.parents('.comment-container');
            annotator.bringCommentToFront($currentCommentContainer);
            return;
        }
        var $el = $(e.currentTarget);

        var threadModel = new Kenseo.models.Thread({
            isNewComment: true
        });

        var threadView = new Kenseo.views.Thread({
            "e": e,
            model: threadModel,
            "version_id": annotator.getCurrentVersionId($el)
        });

        // add the model to collection
        this.threadsCollection.add(threadModel);

        threadView.render();
    },
    paintExistingAnnotations: function(currentContainerVersionID){
        // Removing all the already painted comment sections
        $('.comment-container.isStoredLocally').remove();
        // Get the current container
        // -- For now, assume the current container as "158"
        // var currentContainerVersionID = 3;
        var currentVersionIdData = sb.getCurrentDocumentData(currentContainerVersionID);
        if(currentVersionIdData && currentVersionIdData.noChangesDetected){
            // if data is present and not changed, don't call for ajax.. use the existing data
            // insertCommentWrapper(currentContainerVersionID, currentVersionIdData);
            // var threadsView = new Kenseo.views.Threads({
            // 	currentArtefactId: currentContainerVersionID,
            // 	model: new Kenseo.models.Threads(currentVersionIdData)
            // });

            this.threadsCollection = new Kenseo.collections.Threads(_.values(currentVersionIdData));

            var threadsView = new Kenseo.views.Threads({
                currentArtefactId: currentContainerVersionID,
                collection: this.threadsCollection,
                documentViewScope: this
            });

            threadsView.render();
        }
        else{
            // get the calling url from paintPdf function
            sb.ajaxCall({
                url: sb.getRelativePath('getArtefactDetails'),
                // flag to say not to store the response data in Kenseo.data global variable
                excludeDump: true,
                data: {
                    artefactVersionId: Kenseo.data.artefact.id,
                    withVersions: true,
                    withComments: true
                },
                success: function(response){
                    var data = response.data;
                    // Store the current artefact version related data in a global variable
                    var threads = data.threads;
                    // flag
                    threads.noChangesDetected = true;
                    sb.setCurrentDocumentData(data.artefactId, threads);


                    insertCommentWrapper(currentArtefactId, data);
                }
            });
            // -- end of ajax call
        }
    }
});

Kenseo.models.DocumentView = Backbone.Model.extend({
    defaults: {

    }
});
