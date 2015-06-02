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
                _this.newLoader();
            }
        );
    },
    newLoader: function(){
        new Kenseo.views.Header({'model': new Kenseo.models.Header()});
        $('.header').addClass('fixed-header');

        $('.content').html(_.template(templates['documentview'])());
        $('.pdfs-container').append(_.template(templates['pdf-viewer'])());

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
                new paintPdf({url: sb.getRelativePath(response.data.versions[versCount - 1].documentPath)});

                function moveIt($el, e) {
                    var remaining = e.pageX - $el.offset().left,
                        width = $el.width();

                    var thumbWidth = $('.thumb').width()
                    if (remaining < 0) {
                        remaining = 0;
                    } else if (remaining > width - thumbWidth) {
                        remaining = width - thumbWidth
                    }
                    remaining = remaining / width * 100;
                    $('.thumb').css({
                        'left': remaining + "%"
                    }).attr('range-value', remaining);
                }
                $(document).on('mousedown', '.thumb', function () {
                    $(window).on('mousemove', function (e) {
                        moveIt($('.slider'), e);
                    });

                    $(window).on('mouseup', function () {
                        $(window).off('mousemove');
                    });
                });


                $(document).on('click', '.slider', function (e) {
                    moveIt($(this), e);
                });
            }
        });
    }
});