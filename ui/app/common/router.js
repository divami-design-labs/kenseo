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
				$('.project-section').hide();
				$('.documentView').hide();
                $('.dashboard-section').show();
                sb.renderTemplate({templateName: 'dashboard', 'templateHolder': $('.dashboard-section')});
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
						
						$('.documentView').hide();
			            $('.dashboard-section').hide();
                        $('.project-section').show();
                        
                        sb.renderTemplate({"templateName": 'project-page', "templateHolder": $(".project-section")});
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

        $('.project-section').hide();
        $('.dashboard-section').hide();
		$('.documentView').show();

        new Kenseo.views.Header({'model': new Kenseo.models.Header()});
        $('.header').addClass('fixed-header');
        
        //before making the ajax call we need to verify if this document is already existing in the viewer
        if($('.outerContainer[rel="pdf_' + Kenseo.data.artefact.id + '"]').length > 0) {
        	// since it already exists we need to bring it into view
        } else {
        	//since we don't have it in the viewer we need to get its details and render it
	        sb.ajaxCall({
	            url : sb.getRelativePath("getArtefactDetails"),
	            data: {
	                artefactVersionId : Kenseo.data.artefact.id
	            },
	            type: 'GET',
	            success: function(response) {
	                var versCount = response.data.versionCount
	                
	                //before painting the new doc lets hide all the existing docs
	                $('.outerContainer.inView').removeClass('inView');
	                
	                //before adding the new tabItem un select the existing ones
	                $('.tab-item.selectedTab').removeClass('selectedTab')
	                
	                //before painting the pdf into the viewer we need to add a tab for it.
	                if(response.data.versions[versCount - 1].type == 'application/pdf') {
		                var str = '<div class="tab-item selectedTab" targetRel="' + response.data.versions[versCount - 1].versionId + '"><div class= "fileTab" ></div></div>'; 
	                } else {
	                	var str = '<div class="tab-item selectedTab" targetRel="' + response.data.versions[versCount - 1].versionId + '"><div class= " imageTab" ></div></div>';
	                }
	                $('.dv-tab-panel-section').prepend(str);
			        $('.pdfs-container').append(_.template(templates['pdf-viewer'])(response.data.versions[versCount - 1]));
	                new paintPdf({
	                	url: sb.getRelativePath(response.data.versions[versCount - 1].documentPath),
	                	container: $('.outerContainer.inView').get(0),
	                	taargetId: response.data.versions[versCount - 1].versionId
	            	});
					//now get the version details of this version and show shared details
					sb.renderTemplate({
						url: sb.getRelativePath('getVersionDetails'),
						data: {
							versionId: Kenseo.data.artefact.id
						},
						templateName: "dv-peoplesection", 
						templateHolder: $(".dv-tb-people-section"),
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
    }
});