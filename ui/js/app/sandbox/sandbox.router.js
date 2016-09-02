/*
 * This library has the initiating code for each different page
 */
sb.router = (function(){

    function regulator(toShow){
        var classes = {
            '.header': 'fixed-header',
            '.hamburger-menu': 'active'
        };

        $('.hamburger-menu').removeClass('active');
        $('.header').removeClass('fixed-header');

        $('.project-section').hide();
        $('.dashboard-section').hide();
        $('.meeting-notes-section').hide();
        $('.projects-page').hide();
        $('.persona-page-section').hide();
        $('.documentView').hide();

        if(Array.isArray(toShow)){
            toShow.forEach(function(el){
                if(classes[el]){
                    $(el).addClass(classes[el]);
                }
                else{
                    $(el).show();
                }
            })
        }
    }

    return {
        menu: function menu() {
            sb.refresh.section('menu');
        },
        dashboard: function dashboard() {
            sb.svgLoader(['common', 'dashboard']);

            Kenseo.current.page = "dashboard";
            sb.setTitle('Dashboard');

            regulator(['.dashboard-section'])
            sb.refresh.section('header');
            sb.refresh.section('dashboard');
        },
        projectPage: function projectPage(id) {
            sb.svgLoader(['common', 'projectpage']);

            Kenseo.current.page = "project-page";


            Kenseo.page.id = id;
            $('.hamburger-menu').removeClass('active');


            sb.refresh.section('project-page-info');
            regulator(['.project-section']);
        },
        meetingNotes: function meetingNotes(id) {
            sb.svgLoader(['common', 'meetingnotes']);

            Kenseo.data.meetingId = id;
            // Write meeting notes title here

            Kenseo.current.page = "meeting-notes";

            regulator(['.meeting-notes-section']);

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
        documentView: function documentView(maskedId) {
            var _this = this;
            sb.svgLoader(['common', 'documentview']);

            Kenseo.current.page = "document-view";

            // new Kenseo.views.Header({ 'model': new Kenseo.models.Header() });
            // $('.header').addClass('fixed-header');
            sb.refresh.section('header');
            regulator(['.documentView', '.header']);

            var artefactId = sb.getVersionIdFromMaskedId(maskedId);
            //before making the ajax call we need to verify if this document is already existing in the viewer
            if ($('.outerContainer[rel="pdf_' + artefactId + '"]').length > 0) {
                // since it already exists we need to bring it into view
                $('.outerContainer.inView').removeClass('inView');
                $('.tab-item.selectedTab').removeClass('selectedTab');

                $('.outerContainer[rel="pdf_' + artefactId + '"]').addClass('inView');

                // Re-order the tab placement to starting point
                // remove the current position (detach the tab element)
                var removedElem = $('.dv-tab-panel-section').detach('.tab-item[targetrel=' + artefactId + ']');
                // And then add the removed element to the first place of the parent element
                $('.dv-tab-panel-section').prepend(removedElem);
                // Make the tab look like selected
                $('.tab-item[targetrel=' + artefactId + ']').addClass('selectedTab');
            } else {
                // since we don't have it in the viewer we need to get its details and render it
                // This case also happens when user reloads the page
                sb.ajaxCall({
                    url: sb.getRelativePath('getArtefactDetails'),
                    data: {
                        // artefactVersionId: Kenseo.data.artefact.id,
                        maskedArtefactVersionId: maskedId,
                        withVersions: true,
                        withComments: true
                    },
                    type: 'GET',
                    success: function success(response) {

                        var view = new Kenseo.views.DocumentView({
                            payload: {
                                maskedId: maskedId
                            },
                            model: new Kenseo.models.DocumentView(response.data)
                        });

                        view.render();
                    }
                });
            }
        },
        projects: function(){
            sb.svgLoader(['common', 'projects']);

            Kenseo.current.page = "projects-page";
            sb.setTitle('All Projects');

            regulator(['.projects-page']);

            sb.refresh.section('header');
            sb.refresh.section('projects-page');
        },
        persona: function(id){
            sb.svgLoader(['common', 'persona']);

            Kenseo.current.page = "persona";
            sb.setTitle('Persona');

            regulator(['.header', '.persona-page-section'])

            sb.refresh.section('header');
            sb.loadCss('assets/styles/css/persona.css');

            var $personaPageSection = $('.persona-page-section');
            // Show persona page
            $personaPageSection.show()
                .html(sb.setTemplate('persona'));

            // After filling the html template, apply persona related interactions
            var persona = new Persona();

            $personaPageSection.find('.current-artefact-info').css({
                'bottom': 0
            });
        }
    };
})()
