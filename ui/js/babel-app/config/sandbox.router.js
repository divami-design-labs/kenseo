sb.router = {
    menu: function menu() {
        sb.loadFiles({
            'models': ['Header', 'Projects', 'Artefacts', 'People'],
            'collections': ['Projects', 'Artefacts', 'People', 'Notifications'],
            'views': ['Projects', 'Artefacts', 'People', 'Notifications']
        }, function () {
            sb.refresh.section('menu');
        });
    },
    dashboard: function dashboard() {
        sb.loadFiles({
            'views': ['Header', 'Artefacts', 'Projects', 'Notifications'],
            'models': ['Header', 'Notifications', 'Projects', 'Artefacts'],
            'collections': ['Projects', 'Artefacts', 'Notifications']
        }, function () {
            Kenseo.current.page = "dashboard";
            sb.setTitle('Dashboard');

            $('.header').removeClass('fixed-header');
            $('.hamburger-menu').removeClass('active');
            $('.project-section').hide();
            $('.documentView').hide();
            $('.dashboard-section').show();
            sb.refresh.section('header');
            sb.refresh.section('dashboard');
        });
    },
    projectPage: function projectPage(id) {
        sb.loadFiles({
            'views': ['Header', 'Artefacts', 'People', 'Activities'],
            'models': ['Projects', 'Header', 'Artefacts', 'People'],
            'collections': ['Projects', 'Artefacts', 'People']
        }, function () {
            Kenseo.current.page = "project-page";

            Kenseo.page.id = id;
            $('.hamburger-menu').removeClass('active');
            sb.ajaxCall({
                collection: new Kenseo.collections.Projects(),
                data: {
                    userProjects: true
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

                    sb.refresh.section('header');
                    sb.refresh.section('project-page');
                }
            });
        });
    },
    meetingNotes: function meetingNotes(id) {
        Kenseo.data.meetingId = id;
        // Write meeting notes title here

        //
        sb.loadFiles({
            'views': ['Header', 'Artefacts', 'People', 'Activities'],
            'models': ['Projects', 'Header', 'Artefacts', 'People'],
            'collections': ['Projects', 'Artefacts', 'People'],
            'files': [
                'js/app/components/texteditor.js',
                'js/app/config/sandbox.meeting.js'
            ]
        }, function () {
            Kenseo.current.page = "meeting-notes";
            $('.hamburger-menu').removeClass('active');
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
        });
    },
    documentView: function documentView(id) {
        if (!Kenseo.data.artefact) {
            Kenseo.data.artefact = {};
        }
        Kenseo.data.artefact.id = id;

        var _this = this;
        sb.loadFiles({
            'views': ['Header'],
            'models': ['Header'],
            'collections': ['People'],
            'files': ['js/libs/pdfjs/pdf.js', 'js/libs/pdfjs/pdf.worker.js', 
                    'js/libs/pdfjs/viewer.js', 'js/app/components/annotator.js']
        }, function () {
            Kenseo.current.page = "document-view";

            $('.header').addClass('fixed-header');
            $('.hamburger-menu').removeClass('active');
            $('.project-section').hide();
            $('.dashboard-section').hide();
            $('.documentView').show();

            new Kenseo.views.Header({ 'model': new Kenseo.models.Header() });
            $('.header').addClass('fixed-header');

            //before making the ajax call we need to verify if this document is already existing in the viewer
            if ($('.outerContainer[rel="pdf_' + Kenseo.data.artefact.id + '"]').length > 0) {
                // since it already exists we need to bring it into view
                $('.outerContainer.inView').removeClass('inView');
                $('.tab-item.selectedTab').removeClass('selectedTab');

                $('.outerContainer[rel="pdf_' + Kenseo.data.artefact.id + '"]').addClass('inView');

                var removedElem = $('.dv-tab-panel-section').detach('.tab-item[targetrel=' + Kenseo.data.artefact.id + ']');
                $('.dv-tab-panel-section').prepend(removedElem);
                $('.tab-item[targetrel=' + Kenseo.data.artefact.id + ']').addClass('selectedTab');
            } else {
                //since we don't have it in the viewer we need to get its details and render it
                sb.ajaxCall({
                    url: sb.getRelativePath('getArtefactDetails'),
                    data: {
                        artefactVersionId: Kenseo.data.artefact.id
                    },
                    type: 'GET',
                    success: function success(response) {
                        //before painting the new doc lets hide all the existing docs
                        $('.outerContainer.inView').removeClass('inView');

                        //before adding the new tabItem un select the existing ones
                        $('.tab-item.selectedTab').removeClass('selectedTab');

                        //before painting the pdf into the viewer we need to add a tab for it.
                        if (response.data.type == 'application/pdf') {
                            var str = '<a href="#documentview/' + response.data.versionId + '" class="tab-item selectedTab" targetRel="' + response.data.versionId + '"><div class= "fileTab" ></div></a>';
                        } else {
                            var str = '<a href="#documentview/' + response.data.versionId + '" class="tab-item selectedTab" targetRel="' + response.data.versionId + '"><div class= " imageTab" ></div></a>';
                        }
                        $('.dv-tab-panel-section').prepend(str);
                        $('.pdfs-container').append(_.template(templates['pdf-viewer'])(response.data));

                        new paintPdf({
                            url: sb.getRelativePath(response.data.documentPath),
                            container: $('.outerContainer.inView').get(0),
                            targetId: response.data.versionId
                        });

                        //now get the version details of this version and show shared details
                        sb.renderTemplate({
                            url: sb.getRelativePath('getVersionDetails'),
                            data: {
                                versionId: Kenseo.data.artefact.id
                            },
                            templateName: 'dv-peoplesection',
                            templateHolder: $('.dv-tb-people-section')
                        });

                        $(document).on('click', '.tab-item', function (e) {
                            rel = this.getAttribute('targetrel');
                            $('.tab-item').removeClass('selectedTab');
                            $(this).addClass('selectedTab');
                            $('.outerContainer.inView[rel!="pdf_' + rel + '"]').removeClass('inView');
                            $('.outerContainer[rel="pdf_' + rel + '"]').addClass('inView');
                        });

                        var parent = document.querySelector('#viewerContainer.parent');
                        stickToBottom(parent);

                        annotator();
                    }
                });
            }
        });
    }
};