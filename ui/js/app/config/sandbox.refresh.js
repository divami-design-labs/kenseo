'use strict';

sb.refresh = (function () {
	var sections = {
		'menu': {
			'menu-section': function menuSection() {
				return sb.renderTemplate({ 'templateName': 'nav-menu', 'templateHolder': $('.menu') });
			},
			'menu-header': function menuHeader() {
				return sb.renderTemplate({ 'templateName': 'menu-header', 'templateHolder': $('.menu-header'), 'model': new Kenseo.models.Header() });
			},
			'menu-projects-container': function menuProjectsContainer() {
				return sb.renderTemplate({ 'templateName': 'menu-projects-container', 'templateHolder': $('.menu-projects-section'), 'collection': new Kenseo.collections.Projects(), 'data': 'menu-projects' });
			},
			'menu-recent-activity': function menuRecentActivity() {
				return sb.renderTemplate({ 'templateName': 'menu-recent-activity', 'templateHolder': $('.menu-recent-activity-section'), 'collection': new Kenseo.collections.Artefacts(), 'data': 'menu-activities' });
			},
			'menu-request-section': function menuRequestSection() {
				return new Kenseo.views.Artefacts({ el: '.menu-recent-requests-section', colStr: 'Artefacts', data: 'menu-artefacts' });
			},
			// sb.renderTemplate({"templateName": 'artefact', "templateHolder": $('.menu-recent-requests-section'), "collection": new Kenseo.collections.Artefacts(), "data": 'menu-artefacts'});
			'menu-recent-notifications': function menuRecentNotifications() {
				return sb.renderTemplate({ 'templateName': 'menu-recent-notifications', 'templateHolder': $('.menu-recent-notifications-section'), 'collection': new Kenseo.collections.Notifications(), 'data': 'menu-notifications' });
			},
			'menu-recent-people': function menuRecentPeople() {
				return sb.renderTemplate({ 'templateName': 'menu-recent-people', 'templateHolder': $('.menu-recent-people-section'), 'collection': new Kenseo.collections.People(), 'data': 'menu-people' });
			}
		},
		'dashboard': {
			'dashboard-section': function dashboardSection() {
				return sb.renderTemplate({ templateName: 'dashboard', 'templateHolder': $('.dashboard-section') });
			},
			'db-projects': function dbProjects() {
				// return new Kenseo.views.Projects({ colStr: 'Projects', data: 'db-projects' });
				return sb.renderTemplate({ templateName: 'db-projects-section', 'templateHolder': $('.projects-section-content'), collection: new Kenseo.collections.Projects(), data: 'db-projects' });
			},
			'db-notifications': function dbNotifications() {
				return new Kenseo.views.Notifications({ collection: new Kenseo.collections.Notifications(), data: 'db-notifications' });
				// return sb.renderTemplate({ templateName: 'db-notifications', templateHolder: $('.') collection: new Kenseo.collections.Notifications(), data: 'db-notifications'})
			},
			'db-artefacts': function dbArtefacts() {
				$('.review-requests-content').html("");
				// return new Kenseo.views.Artefacts({ colStr: 'Artefacts', data: 'db-artefacts' });
				return sb.renderTemplate({ templateName: 'artefacts', templateHolder: $('.dashboard-section .review-requests-section'), collection: new Kenseo.collections.Artefacts(), data: 'db-artefacts' });
			}
		},
		'header': {
			'header': function header() {
				return new Kenseo.views.Header({ 'model': new Kenseo.models.Header() });
			}
		},
		'project-page': {
			'project-page-section': function projectPageSection() {
				return sb.renderTemplate({ 'templateName': 'project-page', 'templateHolder': $('.project-section') });
			},
			'pp-artefacts': function ppArtefacts() {
				return new Kenseo.views.Artefacts({
					el: '.artifacts-content',
					id: Kenseo.page.id,
					colStr: 'Artefacts',
					data: { projects: true, project_id: Kenseo.page.id, sharePermission: false, sortBy: 'default' },
					preLoader: function preLoader(response) {
						$('.artifacts-section').html(_.template(templates['artefacts'])(response));
					}
				});
			},
			'pp-activities': function ppActivities() {
				return new Kenseo.views.Activities({ collection: new Kenseo.collections.Artefacts(), data: { projectActivities: true, project_id: Kenseo.page.id } });
			},
			'pp-people': function ppPeople() {
				return new Kenseo.views.People({
					el: '.people-section-content',
					colStr: 'People',
					data: { projectId: Kenseo.page.id },
					preLoader: function preLoader(response) {
						$('.people-section').html(_.template(templates['people'])());
					}
				});
			}
		},
		'meeting-notes': {
			'meeting-notes': function meetingNotes() {
				return sb.renderTemplate({
					url: sb.getRelativePath('getMeetingNotes'),
					data: {
						meetingId: Kenseo.data.meetingId
					},
					templateName: 'meetingnotes',
					templateHolder: $('.content-wrapper'),
					callbackfunc: function callbackfunc() {
						//since we have the Html ready now we can have the editor in place.
						var textEditorObj = new textEditor(document.querySelector('.text-editor-section'));
						sb.meeting.notes();
					}
				});
			}
		}
	};

	var actionType = {
		archiveProject: function archiveProject() {
			refreshSection('dashboard', 'db-projects');
		},
		archiveArtefact: function archiveArtefact() {
			// Kenseo.currentModel.collection.remove(Kenseo.currentModel);
			refreshSection('dashboard', 'db-artefacts');
		},
		deleteArtefact: function deleteArtefact() {
			// Kenseo.currentModel.collection.remove(Kenseo.currentModel);
			if (Kenseo.current.page == "dashboard") {
				refreshSection('dashboard', 'db-artefacts');
			} else if (Kenseo.current.page == "project-page") {
				refreshSection('project-page', 'pp-artefacts');
			}
		},
		addProject: function addProject() {
			refreshSection('dashboard', 'db-projects');
		},
		addArtefact: function addArtefact() {
			refreshSection('dashboard', 'db-artefacts');
			refreshSection('dashboard', 'db-notifications');
		}
	};
	function refreshSection(sectionName, subSection) {
		var specificSection = sections[sectionName];
		if (!subSection) {
			for (var s in specificSection) {
				specificSection[s]();
			}
		} else {
			specificSection[subSection]();
		}
	}
	return {
		section: refreshSection,
		type: function type(actionTypeProp) {
			if (actionType[actionTypeProp]) {
				actionType[actionTypeProp]();
			} else {
				sb.log("undefined actionType");
			}
		}
	};
})();