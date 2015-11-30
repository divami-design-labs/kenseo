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
            $('.header').removeClass('fixed-header');
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
            Kenseo.page.id = id;
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

                    sb.refresh.section('header');
                    sb.refresh.section('project-page');
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
            'files': ['js/app/components/texteditor.js', 'js/app/config/sandbox.meeting.js']
        }, function () {
            sb.ajaxCall({
                collection: new Kenseo.collections.Projects(),
                data: {
                    userProjects: true
                },
                success: function success(response) {
                    // new Kenseo.views.Header({ 'model': new Kenseo.models.Header() });

                    // sb.renderTemplate({
                    //     url: sb.getRelativePath('getMeetingNotes'),
                    //     data: {
                    //         meetingId: Kenseo.data.meetingId
                    //     },
                    //     templateName: 'meetingnotes',
                    //     templateHolder: $('.content-wrapper'),
                    //     callbackfunc: function() {
                    //   //since we have the Html ready now we can have the editor in place.
                    //   var textEditorObj = new textEditor(document.querySelector('.text-editor-section'));
                    //   sb.meeting.notes();
                    //     }
                    // });
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
            'files': ['js/libs/pdfjs/pdf.js', 'js/libs/pdfjs/pdf.worker.js', 'js/libs/pdfjs/viewer.js', 'js/app/components/annotator.js']
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
                            var str = '<a href="#documentview/' + response.data.versionId + '" class="tab-item selectedTab" targetRel="' + response.data.versionId + '"><div class= "fileTab" ></div></a>';
                        } else {
                            var str = '<a href="#documentview/' + response.data.versionId + '" class="tab-item selectedTab" targetRel="' + response.data.versionId + '"><div class= " imageTab" ></div></a>';
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

                        var parent = document.querySelector('#viewerContainer.parent');
                        stickToBottom(parent);

                        annotator();
                    }
                });
            }
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2JhYmVsLWFwcC9jb25maWcvc2FuZGJveC5yb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsRUFBRSxDQUFDLE1BQU0sR0FBRztBQUNSLFFBQUksRUFBRSxTQUFTLElBQUksR0FBRztBQUNsQixVQUFFLENBQUMsU0FBUyxDQUFDO0FBQ1Qsb0JBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQztBQUN2RCx5QkFBYSxFQUFFLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDO0FBQ25FLG1CQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxlQUFlLENBQUM7U0FDaEUsRUFBRSxZQUFZO0FBQ1gsY0FBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUIsQ0FBQyxDQUFDO0tBQ047QUFDRCxhQUFTLEVBQUUsU0FBUyxTQUFTLEdBQUc7QUFDNUIsVUFBRSxDQUFDLFNBQVMsQ0FBQztBQUNULG1CQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUM7QUFDN0Qsb0JBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQztBQUM5RCx5QkFBYSxFQUFFLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUM7U0FDNUQsRUFBRSxZQUFZO0FBQ1gsYUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN6QyxhQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM3QixhQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDMUIsYUFBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDL0IsY0FBRSxD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LENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUMsNkJBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDaEMsNkJBQUMsQ0FBQyxtQ0FBbUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFFLDZCQUFDLENBQUMsMkJBQTJCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDbEUsQ0FBQyxDQUFDOztBQUVILDRCQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDL0QscUNBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFdEIsaUNBQVMsRUFBRSxDQUFDO3FCQUNmO2lCQUNKLENBQUMsQ0FBQzthQUNOO1NBQ0osQ0FBQyxDQUFDO0tBQ047Q0FDSixDQUFDIiwiZmlsZSI6InNhbmRib3gucm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsic2Iucm91dGVyID0ge1xuICAgIG1lbnU6IGZ1bmN0aW9uIG1lbnUoKSB7XG4gICAgICAgIHNiLmxvYWRGaWxlcyh7XG4gICAgICAgICAgICAnbW9kZWxzJzogWydIZWFkZXInLCAnUHJvamVjdHMnLCAnQXJ0ZWZhY3RzJywgJ1Blb3BsZSddLFxuICAgICAgICAgICAgJ2NvbGxlY3Rpb25zJzogWydQcm9qZWN0cycsICdBcnRlZmFjdHMnLCAnUGVvcGxlJywgJ05vdGlmaWNhdGlvbnMnXSxcbiAgICAgICAgICAgICd2aWV3cyc6IFsnUHJvamVjdHMnLCAnQXJ0ZWZhY3RzJywgJ1Blb3BsZScsICdOb3RpZmljYXRpb25zJ11cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2IucmVmcmVzaC5zZWN0aW9uKCdtZW51Jyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZGFzaGJvYXJkOiBmdW5jdGlvbiBkYXNoYm9hcmQoKSB7XG4gICAgICAgIHNiLmxvYWRGaWxlcyh7XG4gICAgICAgICAgICAndmlld3MnOiBbJ0hlYWRlcicsICdBcnRlZmFjdHMnLCAnUHJvamVjdHMnLCAnTm90aWZpY2F0aW9ucyddLFxuICAgICAgICAgICAgJ21vZGVscyc6IFsnSGVhZGVyJywgJ05vdGlmaWNhdGlvbnMnLCAnUHJvamVjdHMnLCAnQXJ0ZWZhY3RzJ10sXG4gICAgICAgICAgICAnY29sbGVjdGlvbnMnOiBbJ1Byb2plY3RzJywgJ0FydGVmYWN0cycsICdOb3RpZmljYXRpb25zJ11cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdmaXhlZC1oZWFkZXInKTtcbiAgICAgICAgICAgICQoJy5wcm9qZWN0LXNlY3Rpb24nKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuZG9jdW1lbnRWaWV3JykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmRhc2hib2FyZC1zZWN0aW9uJykuc2hvdygpO1xuICAgICAgICAgICAgc2IucmVmcmVzaC5zZWN0aW9uKCdoZWFkZXInKTtcbiAgICAgICAgICAgIHNiLnJlZnJlc2guc2VjdGlvbignZGFzaGJvYXJkJyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcHJvamVjdFBhZ2U6IGZ1bmN0aW9uIHByb2plY3RQYWdlKGlkKSB7XG4gICAgICAgIHNiLmxvYWRGaWxlcyh7XG4gICAgICAgICAgICAndmlld3MnOiBbJ0hlYWRlcicsICdBcnRlZmFjdHMnLCAnUGVvcGxlJywgJ0FjdGl2aXRpZXMnXSxcbiAgICAgICAgICAgICdtb2RlbHMnOiBbJ1Byb2plY3RzJywgJ0hlYWRlcicsICdBcnRlZmFjdHMnLCAnUGVvcGxlJ10sXG4gICAgICAgICAgICAnY29sbGVjdGlvbnMnOiBbJ1Byb2plY3RzJywgJ0FydGVmYWN0cycsICdQZW9wbGUnXVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBLZW5zZW8ucGFnZS5pZCA9IGlkO1xuICAgICAgICAgICAgc2IuYWpheENhbGwoe1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246IG5ldyBLZW5zZW8uY29sbGVjdGlvbnMuUHJvamVjdHMoKSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJQcm9qZWN0czogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzYi5zZXRQb3B1cERhdGEoS2Vuc2VvLmRhdGEucHJvamVjdHNbaWRdLm5hbWUsICdwcm9qZWN0X25hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgc2Iuc2V0UGFnZURhdGEoS2Vuc2VvLmRhdGEucHJvamVjdHNbaWRdLCAncHJvamVjdCcpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2ZpeGVkLWhlYWRlcicpO1xuXG4gICAgICAgICAgICAgICAgICAgICQoJy5kb2N1bWVudFZpZXcnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5kYXNoYm9hcmQtc2VjdGlvbicpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLnByb2plY3Qtc2VjdGlvbicpLnNob3coKTtcblxuICAgICAgICAgICAgICAgICAgICBzYi5yZWZyZXNoLnNlY3Rpb24oJ2hlYWRlcicpO1xuICAgICAgICAgICAgICAgICAgICBzYi5yZWZyZXNoLnNlY3Rpb24oJ3Byb2plY3QtcGFnZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG1lZXRpbmdOb3RlczogZnVuY3Rpb24gbWVldGluZ05vdGVzKGlkKSB7XG4gICAgICAgIEtlbnNlby5kYXRhLm1lZXRpbmdJZCA9IGlkO1xuICAgICAgICBzYi5sb2FkRmlsZXMoe1xuICAgICAgICAgICAgJ3ZpZXdzJzogWydIZWFkZXInLCAnQXJ0ZWZhY3RzJywgJ1Blb3BsZScsICdBY3Rpdml0aWVzJ10sXG4gICAgICAgICAgICAnbW9kZWxzJzogWydQcm9qZWN0cycsICdIZWFkZXInLCAnQXJ0ZWZhY3RzJywgJ1Blb3BsZSddLFxuICAgICAgICAgICAgJ2NvbGxlY3Rpb25zJzogWydQcm9qZWN0cycsICdBcnRlZmFjdHMnLCAnUGVvcGxlJ10sXG4gICAgICAgICAgICAnZmlsZXMnOiBbXG4gICAgICAgICAgICAgICAgJ2pzL2FwcC9jb21wb25lbnRzL3RleHRlZGl0b3IuanMnLFxuICAgICAgICAgICAgICAgICdqcy9hcHAvY29uZmlnL3NhbmRib3gubWVldGluZy5qcydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2IuYWpheENhbGwoe1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246IG5ldyBLZW5zZW8uY29sbGVjdGlvbnMuUHJvamVjdHMoKSxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJQcm9qZWN0czogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBuZXcgS2Vuc2VvLnZpZXdzLkhlYWRlcih7ICdtb2RlbCc6IG5ldyBLZW5zZW8ubW9kZWxzLkhlYWRlcigpIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNiLnJlbmRlclRlbXBsYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHVybDogc2IuZ2V0UmVsYXRpdmVQYXRoKCdnZXRNZWV0aW5nTm90ZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBtZWV0aW5nSWQ6IEtlbnNlby5kYXRhLm1lZXRpbmdJZFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRlbXBsYXRlTmFtZTogJ21lZXRpbmdub3RlcycsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0ZW1wbGF0ZUhvbGRlcjogJCgnLmNvbnRlbnQtd3JhcHBlcicpLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY2FsbGJhY2tmdW5jOiBmdW5jdGlvbigpIHtcblx0XHQgICAgICAgICAgICAgICAgICAvLyAgIC8vc2luY2Ugd2UgaGF2ZSB0aGUgSHRtbCByZWFkeSBub3cgd2UgY2FuIGhhdmUgdGhlIGVkaXRvciBpbiBwbGFjZS5cblx0XHQgICAgICAgICAgICAgICAgICAvLyAgIHZhciB0ZXh0RWRpdG9yT2JqID0gbmV3IHRleHRFZGl0b3IoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZWRpdG9yLXNlY3Rpb24nKSk7XG5cdFx0ICAgICAgICAgICAgICAgICAgLy8gICBzYi5tZWV0aW5nLm5vdGVzKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgICAgICBzYi5yZWZyZXNoLnNlY3Rpb24oJ2hlYWRlcicpO1xuICAgICAgICAgICAgICAgICAgICBzYi5yZWZyZXNoLnNlY3Rpb24oJ21lZXRpbmctbm90ZXMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBkb2N1bWVudFZpZXc6IGZ1bmN0aW9uIGRvY3VtZW50VmlldyhpZCkge1xuICAgICAgICBpZiAoIUtlbnNlby5kYXRhLmFydGVmYWN0KSB7XG4gICAgICAgICAgICBLZW5zZW8uZGF0YS5hcnRlZmFjdCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIEtlbnNlby5kYXRhLmFydGVmYWN0LmlkID0gaWQ7XG5cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgc2IubG9hZEZpbGVzKHtcbiAgICAgICAgICAgICd2aWV3cyc6IFsnSGVhZGVyJ10sXG4gICAgICAgICAgICAnbW9kZWxzJzogWydIZWFkZXInXSxcbiAgICAgICAgICAgICdjb2xsZWN0aW9ucyc6IFsnUGVvcGxlJ10sXG4gICAgICAgICAgICAnZmlsZXMnOiBbJ2pzL2xpYnMvcGRmanMvcGRmLmpzJywgJ2pzL2xpYnMvcGRmanMvcGRmLndvcmtlci5qcycsIFxuICAgICAgICAgICAgICAgICAgICAnanMvbGlicy9wZGZqcy92aWV3ZXIuanMnLCAnanMvYXBwL2NvbXBvbmVudHMvYW5ub3RhdG9yLmpzJ11cbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnLmhlYWRlcicpLmFkZENsYXNzKCdmaXhlZC1oZWFkZXInKTtcblxuICAgICAgICAgICAgJCgnLnByb2plY3Qtc2VjdGlvbicpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5kYXNoYm9hcmQtc2VjdGlvbicpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5kb2N1bWVudFZpZXcnKS5zaG93KCk7XG5cbiAgICAgICAgICAgIG5ldyBLZW5zZW8udmlld3MuSGVhZGVyKHsgJ21vZGVsJzogbmV3IEtlbnNlby5tb2RlbHMuSGVhZGVyKCkgfSk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyJykuYWRkQ2xhc3MoJ2ZpeGVkLWhlYWRlcicpO1xuXG4gICAgICAgICAgICAvL2JlZm9yZSBtYWtpbmcgdGhlIGFqYXggY2FsbCB3ZSBuZWVkIHRvIHZlcmlmeSBpZiB0aGlzIGRvY3VtZW50IGlzIGFscmVhZHkgZXhpc3RpbmcgaW4gdGhlIHZpZXdlclxuICAgICAgICAgICAgaWYgKCQoJy5vdXRlckNvbnRhaW5lcltyZWw9XCJwZGZfJyArIEtlbnNlby5kYXRhLmFydGVmYWN0LmlkICsgJ1wiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBzaW5jZSBpdCBhbHJlYWR5IGV4aXN0cyB3ZSBuZWVkIHRvIGJyaW5nIGl0IGludG8gdmlld1xuICAgICAgICAgICAgICAgICQoJy5vdXRlckNvbnRhaW5lci5pblZpZXcnKS5yZW1vdmVDbGFzcygnaW5WaWV3Jyk7XG4gICAgICAgICAgICAgICAgJCgnLnRhYi1pdGVtLnNlbGVjdGVkVGFiJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkVGFiJyk7XG5cbiAgICAgICAgICAgICAgICAkKCcub3V0ZXJDb250YWluZXJbcmVsPVwicGRmXycgKyBLZW5zZW8uZGF0YS5hcnRlZmFjdC5pZCArICdcIl0nKS5hZGRDbGFzcygnaW5WaWV3Jyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlZEVsZW0gPSAkKCcuZHYtdGFiLXBhbmVsLXNlY3Rpb24nKS5kZXRhY2goJy50YWItaXRlbVt0YXJnZXRyZWw9JyArIEtlbnNlby5kYXRhLmFydGVmYWN0LmlkICsgJ10nKTtcbiAgICAgICAgICAgICAgICAkKCcuZHYtdGFiLXBhbmVsLXNlY3Rpb24nKS5wcmVwZW5kKHJlbW92ZWRFbGVtKTtcbiAgICAgICAgICAgICAgICAkKCcudGFiLWl0ZW1bdGFyZ2V0cmVsPScgKyBLZW5zZW8uZGF0YS5hcnRlZmFjdC5pZCArICddJykuYWRkQ2xhc3MoJ3NlbGVjdGVkVGFiJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vc2luY2Ugd2UgZG9uJ3QgaGF2ZSBpdCBpbiB0aGUgdmlld2VyIHdlIG5lZWQgdG8gZ2V0IGl0cyBkZXRhaWxzIGFuZCByZW5kZXIgaXRcbiAgICAgICAgICAgICAgICBzYi5hamF4Q2FsbCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogc2IuZ2V0UmVsYXRpdmVQYXRoKCdnZXRBcnRlZmFjdERldGFpbHMnKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJ0ZWZhY3RWZXJzaW9uSWQ6IEtlbnNlby5kYXRhLmFydGVmYWN0LmlkXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2JlZm9yZSBwYWludGluZyB0aGUgbmV3IGRvYyBsZXRzIGhpZGUgYWxsIHRoZSBleGlzdGluZyBkb2NzXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcub3V0ZXJDb250YWluZXIuaW5WaWV3JykucmVtb3ZlQ2xhc3MoJ2luVmlldycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2JlZm9yZSBhZGRpbmcgdGhlIG5ldyB0YWJJdGVtIHVuIHNlbGVjdCB0aGUgZXhpc3Rpbmcgb25lc1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnRhYi1pdGVtLnNlbGVjdGVkVGFiJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkVGFiJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYmVmb3JlIHBhaW50aW5nIHRoZSBwZGYgaW50byB0aGUgdmlld2VyIHdlIG5lZWQgdG8gYWRkIGEgdGFiIGZvciBpdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnR5cGUgPT0gJ2FwcGxpY2F0aW9uL3BkZicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gJzxhIGhyZWY9XCIjZG9jdW1lbnR2aWV3LycgKyByZXNwb25zZS5kYXRhLnZlcnNpb25JZCArICdcIiBjbGFzcz1cInRhYi1pdGVtIHNlbGVjdGVkVGFiXCIgdGFyZ2V0UmVsPVwiJyArIHJlc3BvbnNlLmRhdGEudmVyc2lvbklkICsgJ1wiPjxkaXYgY2xhc3M9IFwiZmlsZVRhYlwiID48L2Rpdj48L2E+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ciA9ICc8YSBocmVmPVwiI2RvY3VtZW50dmlldy8nICsgcmVzcG9uc2UuZGF0YS52ZXJzaW9uSWQgKyAnXCIgY2xhc3M9XCJ0YWItaXRlbSBzZWxlY3RlZFRhYlwiIHRhcmdldFJlbD1cIicgKyByZXNwb25zZS5kYXRhLnZlcnNpb25JZCArICdcIj48ZGl2IGNsYXNzPSBcIiBpbWFnZVRhYlwiID48L2Rpdj48L2E+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kdi10YWItcGFuZWwtc2VjdGlvbicpLnByZXBlbmQoc3RyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wZGZzLWNvbnRhaW5lcicpLmFwcGVuZChfLnRlbXBsYXRlKHRlbXBsYXRlc1sncGRmLXZpZXdlciddKShyZXNwb25zZS5kYXRhKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBwYWludFBkZih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91cmw6IHNiLmdldFJlbGF0aXZlUGF0aChyZXNwb25zZS5kYXRhLmRvY3VtZW50UGF0aCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiAkKCcub3V0ZXJDb250YWluZXIuaW5WaWV3JykuZ2V0KDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldElkOiByZXNwb25zZS5kYXRhLnZlcnNpb25JZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbm93IGdldCB0aGUgdmVyc2lvbiBkZXRhaWxzIG9mIHRoaXMgdmVyc2lvbiBhbmQgc2hvdyBzaGFyZWQgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICAgICAgc2IucmVuZGVyVGVtcGxhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogc2IuZ2V0UmVsYXRpdmVQYXRoKCdnZXRWZXJzaW9uRGV0YWlscycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbklkOiBLZW5zZW8uZGF0YS5hcnRlZmFjdC5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVOYW1lOiAnZHYtcGVvcGxlc2VjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVIb2xkZXI6ICQoJy5kdi10Yi1wZW9wbGUtc2VjdGlvbicpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy50YWItaXRlbScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldHJlbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy50YWItaXRlbScpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZFRhYicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkVGFiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLm91dGVyQ29udGFpbmVyLmluVmlld1tyZWwhPVwicGRmXycgKyByZWwgKyAnXCJdJykucmVtb3ZlQ2xhc3MoJ2luVmlldycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5vdXRlckNvbnRhaW5lcltyZWw9XCJwZGZfJyArIHJlbCArICdcIl0nKS5hZGRDbGFzcygnaW5WaWV3Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWV3ZXJDb250YWluZXIucGFyZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja1RvQm90dG9tKHBhcmVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFubm90YXRvcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07Il19