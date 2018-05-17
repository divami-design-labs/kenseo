/*
 * This library handles all main API calls, related to sections like Project, Notifications, Artefacts, Activities, People.
 * This library also has implementation for success callbacks of ajax requests to do actions like add, delete, archive etc
 */
sb.refresh = (function(){
	var sections = {
		'menu': {
			'menu-section': function(){
				return sb.renderTemplate({
					'templateName': 'nav-menu',
					'templateHolder': $('.menu')
				})
			},
			'menu-header': function(){
				return sb.renderTemplate({
					'templateName': 'menu-header',
					'templateHolder': $('.menu-header'),
					'model': new Kenseo.models.Header(),
					container: $('.menu')
				})
			},
            'menu-projects-container': function(){
            	return sb.renderTemplate({
					'templateName': 'menu-projects-container',
					'templateHolder': $('.menu-projects-section'),
					'collection': new Kenseo.collections.Projects(),
					'data': { limit: 3, userProjects: true },
					container: $('.menu')
				});
            },
            'menu-recent-activity': function(){
				// @OLDCODE
            	// return sb.renderTemplate({ 'templateName': 'menu-recent-activity', 'templateHolder': $('.menu-recent-activity-section'), 'collection': new Kenseo.collections.Artefacts(), 'data': 'menu-activities' });

				// @NEWCODE
				return new Kenseo.views.Notifications({
					collection: new Kenseo.collections.Notifications(),
					templateHolder: $('.menu-recent-activity'),
					data: {
		                limit: 3,
						userActivities: true
		            },
		            fromMenu: true
				});
            },
            'menu-request-section': function(){
				// @OLDCODE
            	// return new Kenseo.views.Artefacts({ el: '.menu-recent-requests-section', colStr: 'Artefacts', data: 'menu-artefacts' });

				// @NEWCODE
				return new Kenseo.views.Artefacts({
					collection: new Kenseo.collections.Artefacts(),
					templateHolder: $('.menu-recent-requests-section'),
					data: {
		                shared: true,
						withVersions: true,
		                limit: 3
		            }
				});
            },
            // sb.renderTemplate({"templateName": 'artefact', "templateHolder": $('.menu-recent-requests-section'), "collection": new Kenseo.collections.Artefacts(), "data": 'menu-artefacts'});
            'menu-recent-notifications': function(){
				return new Kenseo.views.Notifications({
					collection: new Kenseo.collections.Notifications(),
					templateHolder: $('.menu-recent-notifications'),
					data: {
		                limit: 3
		            },
		            fromMenu: true
				});
            },
            // 'menu-recent-notifications': function(){
            // 	return sb.renderTemplate({ 'templateName': 'menu-recent-notifications', 'templateHolder': $('.menu-recent-notifications-section'), 'collection': new Kenseo.collections.Notifications(), 'data': 'menu-notifications' });
            // },
            'menu-recent-people': function(){
            	return sb.renderTemplate({ 'templateName': 'menu-recent-people', 'templateHolder': $('.menu-recent-people-section'), 'collection': new Kenseo.collections.People(), 'data': { limit: 3, projects: true } });
            }
		},
		'dashboard': {
			'dashboard-section': function(){
				return sb.renderTemplate({ templateName: 'dashboard', 'templateHolder': $('.dashboard-section') });

			},
            'db-projects': function(){
            	// return new Kenseo.views.Projects({ colStr: 'Projects', data: 'db-projects' });
				// @OLDCODE
            	// return sb.renderTemplate({ templateName: 'db-projects-section', 'templateHolder': $('.projects-section-content'), collection: new Kenseo.collections.Projects(), data: 'db-projects'})
				// @NEWCODE
				return new Kenseo.views.Projects({
					collection: new Kenseo.collections.Projects(),
					templateHolder: $('.projects-section-content'),
					data: {
						userProjects: true,
						limit: 6
					}
				});
            },
            'db-notifications': function(){
				// @OLDCODE
            	// return new Kenseo.views.Notifications({ collection: new Kenseo.collections.Notifications(), data: 'db-notifications' });
            	// return sb.renderTemplate({ templateName: 'db-notifications', templateHolder: $('.') collection: new Kenseo.collections.Notifications(), data: 'db-notifications'})

				// @NEWCODE
				return new Kenseo.views.Notifications({
					collection: new Kenseo.collections.Notifications(),
					templateHolder: $('.notifications-content'),
					timeRelated: true,
					data: { limit: 12 }
				})
            },
            'db-artefacts': function(){
            	$('.dashboard-section .review-requests-content').html("");
            	// return new Kenseo.views.Artefacts({ colStr: 'Artefacts', data: 'db-artefacts' });
				// @OLDCODE - commented
            	// return sb.renderTemplate({ templateName: 'artefacts', templateHolder: $('.dashboard-section .review-requests-section'), collection: new Kenseo.collections.Artefacts(), data: 'db-artefacts'})

				// @NEWCODE
				return new Kenseo.views.Artefacts({
					collection: new Kenseo.collections.Artefacts(),
					templateHolder: $('.review-requests-content'),
					data: {
		                shared: true,
		                limit: 8,
		                withVersions: true
		            }
				})
            }
		},
		'header': {
			'header': function(){
				return new Kenseo.views.Header({ 'model': new Kenseo.models.Header() });
			}
		},
		'project-page': {
			'project-page-section': function(){
				return sb.renderTemplate({ 'templateName': 'project-page', 'templateHolder': $('.project-section') });
			},
            'pp-artefacts': function(sortBy) {
				// @OLDCODE
            	// return new Kenseo.views.Artefacts({
	            //     el: '.artifacts-content',
	            //     id: Kenseo.page.id,
	            //     colStr: 'Artefacts',
	            //     data: { projects: true, project_id: Kenseo.page.id, sharePermission: false, sortBy: 'default' },
	            //     stopRenderX: true,
	            //     preLoader: function preLoader(response) {
	            //         $('.artifacts-section').html(sb.setTemplate('artefacts', response));
	            //     }
	            // });

				// @NEWCODE
				// sb.renderTemplate({
				// 	templateHolder: $('.review-requests-content.artifacts-section'),
				// 	templateName: 'artefacts',
				// 	data: {}
				// })
				sortBy = sortBy || 'default';
				return new Kenseo.views.Artefacts({
					collection: new Kenseo.collections.Artefacts(),
					templateHolder: $('.artifacts-content'),
					templateWrapperHolder: $('.review-requests-content.artifacts-section'),
					sortBy: sortBy,
					data: { projects: true, project_id: Kenseo.page.id, sharePermission: false, sortBy: sortBy, withVersions: true }
				})
            },
            'pp-activities': function(){
            	return new Kenseo.views.Activities({
					collection: new Kenseo.collections.Activities(),
					templateHolder: '.activity-section-content',
					templateWrapperHolder: $('.activity-section'),
					data: { project_id: Kenseo.page.id }
				});
            },
            'pp-people': function(){
				// @OLDCODE
            	// return new Kenseo.views.People({
	            //     el: '.people-section-content',
	            //     colStr: 'People',
	            //     data: { projectId: Kenseo.page.id },
	            //     preLoader: function preLoader(response) {
	            //         $('.people-section').html(sb.setTemplate('people'));
	            //     }
	            // });

				// @NEWCODE
				if(Kenseo.current.page === "project-page"){
					var peopleView = new Kenseo.views.People({
						collection: new Kenseo.collections.People(),
						templateHolder: '.people-section-content',
						templateWrapperHolder: $('.people-section'),
						data: { projectId: Kenseo.page.id }
					});

					peopleView.render();
				}
            }
		},
		'meeting-notes': {
			'meeting-notes': function(){
				return sb.ajaxCall({
					url: sb.getRelativePath('getMeetingNotes'),
					data: {
	                    meeting_id: Kenseo.data.meetingId
	                },
					success: function(response){
						var data = response.data;

						var meetingNoteView = new Kenseo.views.MeetingNotes({
							model: new Kenseo.models.Meeting(data),
							meeting_id: response.params.meeting_id
						});

						meetingNoteView.render();
					}
				});
			}
		},
		'projects-page': {
			'projects-page': function(){
				// @OLDCODE
				// return sb.renderTemplate({ collection: new Kenseo.collections.Projects(),data: { includeArchives: true,userProjects: true }, templateName: 'db-projects-section', 'templateHolder': $('.projects-page-wrapper') });

				// @NEWCODE
				return new Kenseo.views.Projects({
					collection: new Kenseo.collections.Projects(),
					templateHolder: $('.active-projects-page-wrapper'),
					archivedTemplateHolder: $('.archived-projects-page-wrapper'),
					data: {
						includeArchives: true,
						userProjects: true
					}
				});
			}
		},
		'project-page-info': {
			'project-page-info': function(){
				sb.ajaxCall({
	                collection: new Kenseo.collections.Projects(),
	                data: {
	                    userProjects: true,
	                    includeArchives: true
	                },
	                success: function success(response) {
						if(Object.keys(Kenseo.data.projects).length < 1){
							window.location.href =DOMAIN_UI_URL+'#projects';
							sb.router.projects();
							// Router("projects");
							return false;
						}
	                    var currentProjectInfo = Kenseo.data.projects[Kenseo.page.id];
	                    sb.setTitle(currentProjectInfo['project_name']);
						sb.setPageData(currentProjectInfo, 'project');

						sb.refresh.section('header');
						// sb.refresh.section('project-page');
						sb.ajaxCall({
			                url: sb.getRelativePath('getProjectDetails'),
			                data: {
			                    // artefactVersionId: Kenseo.data.artefact.id,
			                    projectId: Kenseo.page.id
			                },
			                type: 'GET',
			                success: function success(response) {

			                    var view = new Kenseo.views.projectPage({
			                        payload: {
			                            projectId: Kenseo.page.id,
			                            templateHolder: $('.project-section')

			                        },
			                        model: new Kenseo.models.projectPage(response.data)
			                    });
			                    view.render();
			                }
			            });

						// registring click event to the create meeting link from project actions to store field populating data
						sb.attachIn('click', '.main-section-project-icon-holder [data-url="create-meeting"]', function(){
							// for populating the project id in meeting invitation form
							sb.setPopulateValue('create-meeting', 'project_id', Kenseo.page.id);
							// for populating the project name in meeting invitation form
							sb.setPopulateValue('create-meeting', 'project_name', currentProjectInfo['project_name']);
						});
	                }
	            });
			}
		}
	}

	var actionType = {
		// archiveProject : function(){
		// 	refreshSection('dashboard', 'db-projects');
		// },
		archiveArtefact: function(response){
			// Kenseo.currentModel.collection.remove(Kenseo.currentModel);
			// refreshSection('dashboard', 'db-artefacts');
			var _this = Kenseo.scope;
			_this.destroy();
			// Kenseo.data.model = response.data.notification;
			// sb.trigger($(window), 'addNotification');
		},
		deleteArtefact: function(){
			Kenseo.scope.$el.remove();
			// Kenseo.currentModel.collection.remove(Kenseo.currentModel);
			if(Kenseo.current.page == "dashboard"){
				// @OLDCODE - commented
				// refreshSection('dashboard', 'db-artefacts');
				console.dir(Kenseo.popup.data);
			}
			else if(Kenseo.current.page == "project-page"){
				refreshSection('project-page', 'pp-artefacts');
			}
		},
		addProject: function(response){
			// refreshSection('dashboard', 'db-projects');
			Kenseo.data.model = response.data.data;
			sb.trigger($(window), 'addProject');
		},
		addArtefact: function(response){
			//if(response.data.project_data) {
			//	Kenseo.data.model = response.data.project_data.data;
			//	sb.trigger($(window), 'addProject');
		//	}
			refreshTasks(response);
			if(response.data.projectData){
				Kenseo.data.model = response.data.projectData.data;
				sb.trigger($(window), 'addProject');
			}
		},
		shareArtefact: function(response){
			//triggers an event to add artefact
			Kenseo.data.model = response.data.artefact;
			sb.trigger($(window), 'addArtefact');
			//triggers an event to add activity
			Kenseo.data.model = response.data.notification;
			sb.trigger($(window), 'addActivity');
			//triggers an event to adda notification
			Kenseo.data.model = response.data.notification;
			sb.trigger($(window), 'addNotification');
		},
		editArtefact: function(response){
			refreshTasks(response);
		},
		addVersion: function(response){
			var obj = Kenseo.scope.model.toJSON();
			obj.version = response.data.versionSummary[response.data.versionSummary.length - 1].versionNo;
			obj.versionSummary = response.data.versionSummary;
			Kenseo.scope.model.set(obj);
			// Kenseo.data.model = response.data.notification;
			// sb.trigger($(window), 'addNotification');
		},
		// unarchiveProject: function(){
		// 	refreshSection('projects-page', 'projects-page');
		// },
		addPeople: function(response){
			//triggers an event to add people
			Kenseo.data.model = response.data.people;
			sb.trigger($(window), 'addPeople');
			//refreshSection('project-page', 'pp-people');
		},
		removePeople: function(){
			refreshSection('project-page', 'pp-people');
		},
		renameArtefact: function(response) {
			var newname = response.params.artefact_name+"."+_.last(response.params.title.split('.'));
			Kenseo.scope.model.set('title', newname);
			Kenseo.scope = null;
			// Kenseo.data.model = response.data.notification;
			// sb.trigger($(window), 'addNotification');
		},
		personPermissions: function(response) {
			var accessType = response.params.access_type;
			Kenseo.scope.model.set('access_type', accessType);
			Kenseo.scope = null;
		},
		submitArtefact: function(response){
			// console.dir(response);
			var _this = Kenseo.scope;
			if(_this.threads){        //to change state of thread if document is opened
				_this.threads.forEach(function(e){
					e.comments.forEach(function(el){
						el.model.set({"is_submitted": "1"});  // set submitted flag
					});
				});
			}

		},
		editComment: function(response){
			var _this = Kenseo.scope;
			_this.model.set({
				description: response.params.description
				// @TODO: Also change the current time
			});
		},
		deleteComment: function(response){
			var _this = Kenseo.scope;
			_this.model.destroy();
		},
		createMeeting: function(response){
			Kenseo.data.model = response.data.notification;
			sb.trigger($(window), 'addNotification');
		},
		updateMeeting: function(response){
			// @TODO: Uncomment the below lines after fixing the way params are being fetched for create invitation form
			if(response.data.messages.type === "success"){
				var params = response.params;
				var _this = Kenseo.scope;
				_this.model.set(params);
				console.dir(_this.model.toJSON());
			}
		}
	}
	function refreshTasks(response){
		//triggers an event to add artefact
		Kenseo.data.model = [response.data.artefact];
		sb.trigger($(window), 'addArtefact');
		//triggers an event to add activity
		Kenseo.data.model = response.data.notification;
		sb.trigger($(window), 'addActivity');
		//triggers an event to add notification
		Kenseo.data.model = response.data.notification;
		sb.trigger($(window), 'addNotification');
	}
	function refreshSection(sectionName, subSection){
		var specificSection = sections[sectionName];
		if(!subSection){
			for(var s in specificSection){
				specificSection[s]();
			}
		}
		else{
			specificSection[subSection]();
		}
	}
	return {
		section: refreshSection,
		type: function(actionTypeProp, response){
			if(actionType[actionTypeProp]){
				actionType[actionTypeProp](response);
			}
			else{
				sb.log("undefined actionType");
			}
		}
	}
})();
