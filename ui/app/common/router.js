var Router = Backbone.Router.extend({
    initialize: function() {
        // Tells Backbone to start watching for hashchange events
        Backbone.history.start();
    },
    // All of your Backbone Routes (add more)
    routes: {
        // When there is no hash on the url, the home method is called
        "": "index",
        "projectpage/:id": "projectPage",
        "meetingnotes/:id": "meetingNotes",
        "documentview/:id": "documentView"
    },
    index: function() {
        sb.loadFiles(   
            {
                'views' : ['Header', 'Artefacts', 'Projects', 'Notifications'],
                'models': ['Header', 'Notifications', 'Projects', 'Artefacts'],
                'collections': ['Projects', 'Artefacts', 'Notifications']
            },
            function(){
                $('.header').removeClass('fixed-header');
                sb.renderTemplate({templateName: 'dashboard', 'templateHolder': $('.content')});
                new Kenseo.views.Header({'model': new Kenseo.models.Header()});
                new Kenseo.views.Projects({colStr: 'Projects', data: {limit: 6, userProjects: true}});
                new Kenseo.views.Notifications({collection: new Kenseo.collections.Notifications(), data: {limit: 12}});
                new Kenseo.views.Artefacts({colStr: 'Artefacts', data: {limit: 8, shared: true}});
            }
        );
    },
    projectPage: function(id){
        sb.loadFiles(
            {
                'views': ['Header', 'Artefacts', 'People', 'Activities'],
                'models': ['Projects', 'Header','Artefacts', 'People'],
                'collections': ['Projects', 'Artefacts', 'People']
            },
            function(){
                sb.ajaxCall({
                    collection: new Kenseo.collections.Projects(),
                    data: {
                        userProjects: true
                    },
                    success: function(response){
                        // sb.setPopupData(Kenseo.data.projects[id].name, 'project_name');
                        sb.setPageData(Kenseo.data.projects[id], 'project');
                        $('.header').removeClass('fixed-header');
                        sb.renderTemplate({"templateName": 'project-page', "templateHolder": $(".content")});
                        new Kenseo.views.Header({'model': new Kenseo.models.Header()});

                        new Kenseo.views.Artefacts({
                            el: '.artifacts-content',
                            id: id,
                            colStr: 'Artefacts', 
                            data: {projects: true, project_id: id, sharePermission: false, sortBy: "default"}, 
                            preLoader: function(response){
                                $('.artifacts-section').html(_.template(templates['artefacts'])(response));
                            }
                        });
                        new Kenseo.views.Activities({collection: new Kenseo.collections.Artefacts(), data: {projectActivities: true, project_id: id}});
                        new Kenseo.views.People({
                            el: '.people-section-content', 
                            colStr: 'People', 
                            data: {projectId: id},
                            preLoader: function(response){
                                $('.people-section').html(_.template(templates['people'])());
                            }
                        });
                    }
                });
            }
        )
    },
    meetingNotes: function(id){
        sb.loadFiles(
            {
                'views': ['Header', 'Artefacts', 'People', 'Activities'],
                'models': ['Projects', 'Header','Artefacts', 'People'],
                'collections': ['Projects', 'Artefacts', 'People']
            },
            function(){
                new Kenseo.views.Header({'model': new Kenseo.models.Header()});
                sb.renderTemplate({templateName: "meetingnotes", templateHolder: $(".content-wrapper")});
            }
        )
    },
    documentView: function(id){
    	if(!Kenseo.data.artefact){
    		Kenseo.data.artefact = {};
    	} 
        Kenseo.data.artefact.id =  id;
        
        var _this = this;
        sb.loadFiles(
            {
                'views': ['Header'],
                'models': ['Header'],
                'collections': ['People'],
                'files':    [
                                'libs/pdfjs/web/l10n.js',
                                'libs/pdfjs/build/pdf.js',
                                'libs/pdfjs/build/pdf.worker.js',
                                'libs/pdfjs/web/viewer.js',
                //                 'app/config/sandbox.documentview.js',
                //                 'app/components/annotator.js',
                            ]
            },
            function(){
                // _this.oldLoader();
                _this.newLoader();
                // _this.iframeLoader();
            }
        );
    },
    newLoader: function(){
        new Kenseo.views.Header({'model': new Kenseo.models.Header()});
        $('.header').addClass('fixed-header');
        $('.content').html(_.template(templates['documentview'])());
        $('.pdfs-container').append(_.template(templates['pdf-viewer'])());
        // sb.renderTemplate({templateName: "pdf-viewer", templateHolder: $("body")});
        webViewerLoad();
    },
    oldLoader: function(){
        new Kenseo.views.Header({'model': new Kenseo.models.Header()});
        $('.header').addClass('fixed-header');
        sb.ajaxCall({
         url : sb.getRelativePath("getArtefactDetails"),
         data: {
             artefactVersionId : Kenseo.data.artefact.id
         },
         type: 'GET',
         success: function(response) {
             var versCount = response.data.versionCount
                var annotator = new annotation();
                annotator.init({
                    "fileName": 'compressed.tracemonkey-pldi-09.pdf',
                    afterLoadCallBack: function(pdf, lastPage){
                        sb.documentview.pagination();
                        sb.documentview.imageSlider();
                        sb.documentview.zoomSlider();
                    }
                });
                
                $('.zoom-in').on('click', function(e){
                    var value = $('.document-viewer').data('scale') || 3;
                    value = value + 1;
                    annotator.paintPdf({scale: value});
                    if(value > 5){
                        $(this).removeClass('active');
                    }
                    else{
                        $(this).addClass('active');
                        annotator.paintPdf({scale: value});
                    }
                });

                $('.zoom-out').on('click', function(e){
                    var value = $('.document-viewer').data('scale') || 3;
                    value = value - 1;
                    if(value < 0){
                        $(this).removeClass('active');
                    }
                    else{
                        $(this).addClass('active');
                        annotator.paintPdf({scale: value});
                    }
                });

             sb.renderTemplate({
                 url: sb.getRelativePath('getVersionDetails'),
                 data: {
                     versionId: Kenseo.data.artefact.id
                 },
                 templateName: "dv-peoplesection", 
                 templateHolder: $(".dv-tb-people-section"),
             })
         }
        });
        xPdfViewer();
        pdfHistoryPageShow();
        webViewerInitialized();
        PDFViewerApplication.initialize().then(webViewerInitialized);
        webViewerLoad();
    },
    iframeLoader: function(){
        sb.renderTemplate({templateName: "documentview", templateHolder: $(".content")});
        PDFJS.workerSrc = 'libs/pdfjs/build/pdf.worker.js';
        PDFJS.getDocument('compressed.tracemonkey-pldi-09.pdf').then(function (pdf) {
            // pdf.getPage(currentPage).then(renderPage);
            // console.dir(pdf);
            $('.range').next('span').html("of " + pdf.numPages);
        });

        // Assigning default values.
        var $viewer = $('.document-viewer.active');
        var $pageNumber = $viewer.contents().find('#pageNumber');
        var pageNum = $pageNumber.attr('max');

        $viewer.on('load', function(){
            var $pageNumber = $(this).contents().find('#pageNumber');
            $pageNumber.on('change', function(){
                $('.range').html(this.value);
            });
        })
        // The page number value will be available when the iframe content has already been loaded.
        if(pageNum){
            $('.range').next('span').html("of " + pageNum);
        }

        // Events
        $('.zoom-in').click(function(){
            var $viewer = $('.document-viewer.active');
            $viewer.contents().find('#zoomIn').click();
        });

        $('.zoom-out').click(function(){
            var $viewer = $('.document-viewer.active');
            $viewer.contents().find('#zoomOut').click();
        });


        $('.next-page').click(function(){
            var $viewer = $('.document-viewer.active');
            $viewer.contents().find('.toolbarButton.pageDown').click();
        });

        $('.previous-page').click(function(){
            var $viewer = $('.document-viewer.active');
            $viewer.contents().find('.toolbarButton.pageUp').click();
        });

    }
});