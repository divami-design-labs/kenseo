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
				return new Kenseo.views.Activities({
					collection: new Kenseo.collections.Activities(),
					templateHolder: $('.menu-recent-activity'),
					data: {
		                activities: true,
		                limit: 3
		            }
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
		                limit: 3
		            }
				});
            },
            // sb.renderTemplate({"templateName": 'artefact', "templateHolder": $('.menu-recent-requests-section'), "collection": new Kenseo.collections.Artefacts(), "data": 'menu-artefacts'});
            'menu-recent-notifications': function(){
            	return sb.renderTemplate({ 'templateName': 'menu-recent-notifications', 'templateHolder': $('.menu-recent-notifications-section'), 'collection': new Kenseo.collections.Notifications(), 'data': 'menu-notifications' });
            },
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
		                limit: 8
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
					data: { projects: true, project_id: Kenseo.page.id, sharePermission: false, sortBy: sortBy }
				})
            },
            'pp-activities': function(){
            	return new Kenseo.views.Activities({
					collection: new Kenseo.collections.Artefacts(),
					templateHolder: '.activity-section-content',
					templateWrapperHolder: $('.activity-section'),
					data: { projectActivities: true, project_id: Kenseo.page.id }
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
				return sb.renderTemplate({
	                url: sb.getRelativePath('getMeetingNotes'),
	                data: {
	                    meetingId: Kenseo.data.meetingId
	                },
	                templateName: 'meetingnotes',
	                templateHolder: $('.meeting-notes-section'),
	                callbackfunc: function(response) {
						var data = response.data;
						// prepare the edit meeting invitation field values
						sb.setPopulateValue('update-meeting', 'agenda', data.agenda);
						sb.setPopulateValue('update-meeting', 'artefact_name', data.artefactName);
						sb.setPopulateValue('update-meeting', 'project_id', data.projectId);
						sb.setPopulateValue('update-meeting', 'project_name', data.projectName);
						sb.setPopulateValue('update-meeting', 'venue', data.venue);
						sb.setPopulateValue('update-meeting', 'meeting_date', data.startTime.split(" ")[0]);
						sb.setPopulateValue('update-meeting', 'meeting_date_from_time', data.startTime);
						sb.setPopulateValue('update-meeting', 'meeting_date_to_time', data.endTime);
						sb.setPopulateValue('update-meeting', 'participants_user_ids', data.participants.map(function(participant){ return participant.id }));
	                    //since we have the Html ready now we can have the editor in place.
	                    var textEditorObj = new textEditor(document.querySelector('.text-editor-section'));
	                    sb.meeting.notes();
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
	                    var currentProjectInfo = Kenseo.data.projects[Kenseo.page.id];
	                    sb.setTitle(currentProjectInfo['name']);
						// for populating the project id in meeting invitation form
						sb.setPopulateValue('create-meeting', 'project_id', Kenseo.page.id);
						// for populating the project name in meeting invitation form
						sb.setPopulateValue('create-meeting', 'project_name', currentProjectInfo['name']);
	                    // sb.setPopupData(currentProjectInfo.name, 'project_name');
	                    sb.setPageData(currentProjectInfo, 'project');

	                    sb.refresh.section('header');
	                    sb.refresh.section('project-page');
	                }
	            });
			}
		}
	}

	var actionType = {
		// archiveProject : function(){
		// 	refreshSection('dashboard', 'db-projects');
		// },
		archiveArtefact: function(){
			// Kenseo.currentModel.collection.remove(Kenseo.currentModel);
			refreshSection('dashboard', 'db-artefacts');
		},
		deleteArtefact: function(){
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
			Kenseo.data.model = response.data.artefact;
			sb.trigger($(window), 'addArtefact');
			
			Kenseo.data.model = response.data.notification;
			sb.trigger($(window), 'addNotification');
			// refreshSection('dashboard', 'db-artefacts');
			// refreshSection('dashboard', 'db-notifications');
			// refreshSection('project-page', 'pp-artefacts');
		},
		// unarchiveProject: function(){
		// 	refreshSection('projects-page', 'projects-page');
		// },
		addPeople: function(){
			refreshSection('project-page', 'pp-people');
		},
		removePeople: function(){
			refreshSection('project-page', 'pp-people');
		}
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
