sb.router = {
    menu: function menu() {
        sb.loadFiles({
            'models': ['Header', 'Projects', 'Artefacts', 'People'],
            'collections': ['Projects', 'Artefacts', 'People', 'Notifications'],
            'views': ['Projects', 'Artefacts', 'People', 'Notifications']
        }, function () {
            sb.renderTemplate({ 'templateName': 'nav-menu', 'templateHolder': $('.menu') });
            sb.renderTemplate({ 'templateName': 'menu-header', 'templateHolder': $('.menu-header'), 'model': new Kenseo.models.Header() });
            sb.renderTemplate({ 'templateName': 'menu-projects-container', 'templateHolder': $('.menu-projects-section'), 'collection': new Kenseo.collections.Projects(), 'data': 'menu-projects' });
            sb.renderTemplate({ 'templateName': 'menu-recent-activity', 'templateHolder': $('.menu-recent-activity-section'), 'collection': new Kenseo.collections.Artefacts(), 'data': 'menu-activities' });
            new Kenseo.views.Artefacts({ el: '.menu-recent-requests-section', colStr: 'Artefacts', data: 'menu-artefacts' });
            // sb.renderTemplate({"templateName": 'artefact', "templateHolder": $('.menu-recent-requests-section'), "collection": new Kenseo.collections.Artefacts(), "data": 'menu-artefacts'});
            sb.renderTemplate({ 'templateName': 'menu-recent-notifications', 'templateHolder': $('.menu-recent-notifications-section'), 'collection': new Kenseo.collections.Notifications(), 'data': 'menu-notifications' });
            sb.renderTemplate({ 'templateName': 'menu-recent-people', 'templateHolder': $('.menu-recent-people-section'), 'collection': new Kenseo.collections.People(), 'data': 'menu-people' });
        });
    },
    dashboard: function dashboard() {
        sb.loadFiles({
            'views': ['Header', 'Artefacts', 'Projects', 'Notifications'],
            'models': ['Header', 'Notifications', 'Projects', 'Artefacts'],
            'collections': ['Projects', 'Artefacts', 'Notifications']
        }, function () {
            $('.header').removeClass('fixed-header');
            $('.project-section').hide();
            $('.documentView').hide();
            $('.dashboard-section').show();

            sb.renderTemplate({ templateName: 'dashboard', 'templateHolder': $('.dashboard-section') });
            new Kenseo.views.Header({ 'model': new Kenseo.models.Header() });
            new Kenseo.views.Projects({ colStr: 'Projects', data: 'db-projects' });
            new Kenseo.views.Notifications({ collection: new Kenseo.collections.Notifications(), data: 'db-notifications' });
            new Kenseo.views.Artefacts({ colStr: 'Artefacts', data: 'db-artefacts' });
        });
    },
    projectPage: function projectPage(id) {
        sb.loadFiles({
            'views': ['Header', 'Artefacts', 'People', 'Activities'],
            'models': ['Projects', 'Header', 'Artefacts', 'People'],
            'collections': ['Projects', 'Artefacts', 'People']
        }, function () {
            sb.ajaxCall({
                collection: new Kenseo.collections.Projects(),
                data: {
                    userProjects: true
                },
                success: function success(response) {
                    // sb.setPopupData(Kenseo.data.projects[id].name, 'project_name');
                    sb.setPageData(Kenseo.data.projects[id], 'project');
                    $('.header').removeClass('fixed-header');

                    $('.documentView').hide();
                    $('.dashboard-section').hide();
                    $('.project-section').show();

                    sb.renderTemplate({ 'templateName': 'project-page', 'templateHolder': $('.project-section') });
                    new Kenseo.views.Header({ 'model': new Kenseo.models.Header() });

                    new Kenseo.views.Artefacts({
                        el: '.artifacts-content',
                        id: id,
                        colStr: 'Artefacts',
                        data: { projects: true, project_id: id, sharePermission: false, sortBy: 'default' },
                        preLoader: function preLoader(response) {
                            $('.artifacts-section').html(_.template(templates['artefacts'])(response));
                        }
                    });
                    new Kenseo.views.Activities({ collection: new Kenseo.collections.Artefacts(), data: { projectActivities: true, project_id: id } });
                    new Kenseo.views.People({
                        el: '.people-section-content',
                        colStr: 'People',
                        data: { projectId: id },
                        preLoader: function preLoader(response) {
                            $('.people-section').html(_.template(templates['people'])());
                        }
                    });
                }
            });
        });
    },
    meetingNotes: function meetingNotes(id) {
        Kenseo.data.meetingId = id;
        sb.loadFiles({
            'views': ['Header', 'Artefacts', 'People', 'Activities'],
            'models': ['Projects', 'Header', 'Artefacts', 'People'],
            'collections': ['Projects', 'Artefacts', 'People'],
            'files': [
                'js/app/components/textEditor.js',
                'js/app/config/sandbox.meeting.js'
            ]
        }, function () {
            sb.ajaxCall({
                collection: new Kenseo.collections.Projects(),
                data: {
                    userProjects: true
                },
                success: function success(response) {
                    new Kenseo.views.Header({ 'model': new Kenseo.models.Header() });

                    sb.renderTemplate({
                        url: sb.getRelativePath('getMeetingNotes'),
                        data: {
                            meetingId: Kenseo.data.meetingId
                        },
                        templateName: 'meetingnotes',
                        templateHolder: $('.content-wrapper'),
                        callbackfunc: function() {
		                    //since we have the Html ready now we can have the editor in place.
		                    var textEditorObj = new textEditor(document.querySelector('.text-editor-section'));
		                    sb.meeting.notes();
                        }
                    });

                    
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
            'files': ['js/libs/pdfjs/pdf.js', 'js/libs/pdfjs/pdf.worker.js', 'js/libs/pdfjs/viewer.js']
        }, function () {
            $('.header').addClass('fixed-header');

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
                            var str = '<div class="tab-item selectedTab" targetRel="' + response.data.versionId + '"><div class= "fileTab" ></div></div>';
                        } else {
                            var str = '<div class="tab-item selectedTab" targetRel="' + response.data.versionId + '"><div class= " imageTab" ></div></div>';
                        }
                        $('.dv-tab-panel-section').prepend(str);
                        $('.pdfs-container').append(_.template(templates['pdf-viewer'])(response.data));

                        new paintPdf({
                            //url: sb.getRelativePath(response.data.documentPath),
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
                    }
                });
            }
        });
    }
};