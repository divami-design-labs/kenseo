/*
 * This library has the initiating code for each different page
 */
sb.router = {
    menu: function menu() {
        sb.refresh.section('menu');
    },
    dashboard: function dashboard() {
        sb.svgLoader(['common', 'dashboard']);

        Kenseo.current.page = "dashboard";
        sb.setTitle('Dashboard');


        $('.header').removeClass('fixed-header');
        $('.hamburger-menu').removeClass('active');
        $('.project-section').hide();
        $('.projects-page').hide();
        $('.documentView').hide();
        $('.meeting-notes-section').hide();
        $('.persona-page-section').hide();
        $('.dashboard-section').show();
        sb.refresh.section('header');
        sb.refresh.section('dashboard');
    },
    projectPage: function projectPage(id) {
        sb.svgLoader(['common', 'projectpage']);

        Kenseo.current.page = "project-page";


        Kenseo.page.id = id;
        $('.hamburger-menu').removeClass('active');
        sb.ajaxCall({
            collection: new Kenseo.collections.Projects(),
            data: {
                userProjects: true,
                includeArchives: true
            },
            success: function success(response) {
                var currentProjectInfo = Kenseo.data.projects[id];
                sb.setTitle(currentProjectInfo['name']);
                // sb.setPopupData(currentProjectInfo.name, 'project_name');
                sb.setPageData(currentProjectInfo, 'project');
                $('.header').removeClass('fixed-header');

                $('.documentView').hide();
                $('.dashboard-section').hide();
                $('.project-section').show();
                $('.projects-page').hide();
                $('.meeting-notes-section').hide();
                $('.persona-page-section').hide();
                sb.refresh.section('header');
                sb.refresh.section('project-page');
            }
        });
    },
    meetingNotes: function meetingNotes(id) {
        sb.svgLoader(['common', 'meetingnotes']);

        Kenseo.data.meetingId = id;
        // Write meeting notes title here

        Kenseo.current.page = "meeting-notes";
        $('.hamburger-menu').removeClass('active');
        $('.projects-page').hide();
        $('.project-section').hide();
        $('.dashboard-section').hide();
        $('.persona-page-section').hide();
        $('.meeting-notes-section').show();
        sb.ajaxCall({
            collection: new Kenseo.collections.Projects(),
            data: {
                userProjects: true
            },
            success: function success(response) {
                sb.refresh.section('header');
                sb.refresh.section('meeting-notes');
            }
        });
    },
    documentView: function documentView(id) {
        var maskedId = id;

        sb.svgLoader(['common', 'documentview']);

        var _this = this;

        (function(){
            Kenseo.current.page = "document-view";

            $('.header').addClass('fixed-header');
            $('.hamburger-menu').removeClass('active');
            $('.project-section').hide();
            $('.dashboard-section').hide();
            $('.meeting-notes-section').hide();
            $('.projects-page').hide();
            $('.persona-page-section').hide();
            $('.documentView').show();

            new Kenseo.views.Header({ 'model': new Kenseo.models.Header() });
            $('.header').addClass('fixed-header');

            var artefactId = sb.getVersionIdFromMaskedId(this);
            //before making the ajax call we need to verify if this document is already existing in the viewer
            if ($('.outerContainer[rel="pdf_' + artefactId + '"]').length > 0) {
                // since it already exists we need to bring it into view
                $('.outerContainer.inView').removeClass('inView');
                $('.tab-item.selectedTab').removeClass('selectedTab');

                $('.outerContainer[rel="pdf_' + artefactId + '"]').addClass('inView');

                var removedElem = $('.dv-tab-panel-section').detach('.tab-item[targetrel=' + artefactId + ']');
                $('.dv-tab-panel-section').prepend(removedElem);
                $('.tab-item[targetrel=' + artefactId + ']').addClass('selectedTab');
            } else {
                //since we don't have it in the viewer we need to get its details and render it
                sb.ajaxCall({
                    url: sb.getRelativePath('getArtefactDetails'),
                    data: {
                        // artefactVersionId: Kenseo.data.artefact.id,
                        maskedArtefactVersionId: this,
                        withVersions: true,
                        withComments: true
                    },
                    type: 'GET',
                    success: function success(response) {
                        // console.log(this);
                        var data = response.data;
                        var params = response.params;
                        var maskedVersionId = params.maskedArtefactVersionId;
                        //before painting the new doc lets hide all the existing docs
                        $('.outerContainer.inView').removeClass('inView');

                        //before adding the new tabItem un select the existing ones
                        $('.tab-item.selectedTab').removeClass('selectedTab');

                        //before painting the pdf into the viewer we need to add a tab for it.
                        // pdf viewer
                        if (data.type == 'application/pdf') {
                            var str = sb.setTemplate('tab-file', {
                                maskedVersionId: maskedVersionId,
                                versionId: data.versionId
                            });
                            // var str = '<a href="#documentview/' + maskedVersionId + '" class="tab-item selectedTab" targetRel="' + data.versionId + '"><div class= "fileTab" ></div></a>';
                            $('.dv-tab-panel-section').prepend(str);
                            $('.pdfs-container').append(sb.setTemplate('pdf-viewer', {data: data}));

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
                            $('.pdfs-container').append(sb.setTemplate('image-viewer', {data: data}));
                            // $('.pdfs-container').append('')
                        }
                        sb.setVersionIdForMaskedId(this, data.versionId);
                        var parent = document.querySelector('.outerContainer.inView .viewerContainer.parent');
                        stickToBottom(parent);
                    }.bind(this)
                });
            }
        }.bind(maskedId))();
    },
    projects: function(){
        sb.svgLoader(['common', 'projects']);

        Kenseo.current.page = "projects-page";
        sb.setTitle('All Projects');

        $('.header').removeClass('fixed-header');
        $('.hamburger-menu').removeClass('active');
        $('.project-section').hide();
        $('.documentView').hide();
        $('.dashboard-section').hide();
        $('.projects-page').show();
        $('.meeting-notes-section').hide();
        $('.persona-page-section').hide();
        sb.refresh.section('header');
        sb.refresh.section('projects-page');
    },
    persona: function(id){
        sb.svgLoader(['common', 'persona']);

        Kenseo.current.page = "persona";
        sb.setTitle('Persona');

        $('.header').addClass('fixed-header');
        $('.hamburger-menu').removeClass('active');
        $('.project-section').hide();
        $('.documentView').hide();
        $('.dashboard-section').hide();
        $('.projects-page').hide();
        $('.meeting-notes-section').hide();

        sb.refresh.section('header');
        sb.loadCss('assets/styles/css/persona.css');
        // Show persona page
        $('.persona-page-section').show()
            .html(sb.setTemplate('persona'));

        // After filling the html template, apply persona related interactions
        var persona = new Persona();
    }
};
