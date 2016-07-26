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
                versionId: data.versionId
            });
            // var str = '<a href="#documentview/' + maskedVersionId + '" class="tab-item selectedTab" targetRel="' + data.versionId + '"><div class= "fileTab" ></div></a>';
            $('.dv-tab-panel-section').prepend(str);
            $('.pdfs-container').append(this.$el.html(sb.setTemplate('pdf-viewer', {data: data})));

            new paintPdf({
                url: sb.getRelativePath(data.documentPath),
                container: $('.outerContainer.inView').get(0),
                targetId: data.versionId,
                versionId: data.artefactId,

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
            annotator.init();
        }
        // Image viewer
        else if(data.type.indexOf('image') > -1){
            var str = sb.setTemplate('tab-img', {
                maskedVersionId: maskedVersionId,
                versionId: data.versionId
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
    stickToBottom: function (parent) {
        var bar = parent.querySelector('.bar');
        var top = bar.offsetTop;
        parent.addEventListener('scroll', function (e) {
            var el = e.currentTarget;
            bar.style.bottom = -el.scrollTop + "px";
            bar.style.left = el.scrollLeft + "px";
        });
    }
});

Kenseo.models.DocumentView = Backbone.Model.extend({
    urlRoot: 'hey',
    defaults: {

    }
});
