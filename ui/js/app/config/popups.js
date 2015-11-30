Kenseo.popups = (function () {
							var popups = {
														"add-artefact": [{
																					"page_name": "artefact-one",
																					"title": "Add an Artefact",
																					"buttons": [{
																												"label": "Cancel",
																												"cls": "lnk-btn cancel-btn"
																					}, {
																												"label": "Proceed",
																												"cls": "main-btn",
																												"disabled": true
																					}],
																					"callbackfunc": sb.popup.getProjectsPopup
														}, {
																					"page_name": "artefact-two",
																					"title": "Add an Artefact",
																					"show_coming_soon": true,
																					"allow_artefact_selection": true,
																					"buttons": [{
																												"label": "Back",
																												"cls": "lnk-btn"
																					}, {
																												"label": "Cancel",
																												"cls": "cancel-btn lnk-btn"
																					}, {
																												"label": "Proceed",
																												"cls": "main-btn",
																												"disabled": true
																					}],
																					"callbackfunc": sb.popup.createFilePopup
														}, {
																					"page_name": "artefact-three",
																					"title": "Add an Artefact",
																					"buttons": [{
																												"label": "Back",
																												"cls": "lnk-btn"
																					}, {
																												"label": "Cancel",
																												"cls": "cancel-btn lnk-btn"
																					}, {
																												"label": "Done",
																												"cls": "main-btn done-btn",
																												"disabled": false
																					}],
																					"callbackfunc": sb.popup.teamPopup
														}],
														"share-artefact": [{
																					"page_name": "artefact-one",
																					"title": "Share an Artefact",
																					"buttons": [{
																												"label": "Cancel",
																												"cls": "cancel-btn lnk-btn"
																					}, {
																												"label": "Proceed",
																												"cls": "main-btn",
																												"disabled": true
																					}],
																					"callbackfunc": sb.popup.getProjectsPopup
														}, {
																					"page_name": "artefact-two",
																					"title": "Share an Artefact",
																					"show_coming_soon": false,
																					allow_artefact_selection: true,
																					chooseExistingFile: true,
																					"buttons": [{
																												"label": "Back",
																												"cls": "lnk-btn"
																					}, {
																												"label": "Cancel",
																												"cls": "cancel-btn lnk-btn"
																					}, {
																												"label": "Proceed",
																												"cls": "main-btn",
																												"disabled": true
																					}],
																					"callbackfunc": sb.popup.createFilePopup
														}, {
																					"page_name": "artefact-three",
																					"title": "Share an Artefact",
																					"buttons": [{
																												"label": "Back",
																												"cls": "lnk-btn"
																					}, {
																												"label": "Cancel",
																												"cls": "cancel-btn lnk-btn"
																					}, {
																												"label": "Proceed",
																												"cls": "main-btn"
																					}],
																					"callbackfunc": sb.popup.teamPopup
														}, {
																					"page_name": "artefact-four",
																					"title": "Share an Artefact",
																					"buttons": [{
																												"label": "Back",
																												"cls": "lnk-btn"
																					}, {
																												"label": "Cancel",
																												"cls": "cancel-btn lnk-btn"
																					}, {
																												"label": "Done",
																												"cls": "main-btn share-btn done-btn",
																												"disabled": false
																					}],
																					"callbackfunc": sb.popup.shareWithPeoplePopup
														}],
														"archive-artefact": [{
																					"page_name": "message",
																					"title": "Archive an Artefact",
																					"message": function () {
																												return "Do you want to archive " + sb.getPopupData('title') + " artefact?";
																					},
																					"buttons": [{
																												"label": "Yes",
																												"cls": "main-btn done-btn"
																					}, {
																												"label": "No",
																												"cls": "main-btn cancel-btn"
																					}],
																					"callbackfunc": function () {
																												sb.setPopupData('archiveArtefact', 'actionType');
																					}
														}],
														"delete-artefact": [{
																					"page_name": "message",
																					"title": "Delete an Artefact",
																					"message": function () {
																												return "Do you want to Delete " + sb.getPopupData('title') + " artefact?";
																					},
																					"buttons": [{
																												"label": "Yes",
																												"cls": "main-btn done-btn"
																					}, {
																												"label": "No",
																												"cls": "main-btn cancel-btn"
																					}],
																					"callbackfunc": function () {
																												sb.setPopupData('deleteArtefact', 'actionType');
																					}
														}],
														"archive-project": [{
																					"page_name": "message",
																					"title": "Archive a Project",
																					"message": function () {
																												return "Do you want to archive " + sb.getPopupData('name') + " project ?";
																					},
																					"buttons": [{
																												"label": "Yes",
																												"cls": "main-btn done-btn"
																					}, {
																												"label": "No",
																												"cls": "main-btn cancel-btn"
																					}]
														}],
														// "callbackfunc": function() {
														// 	sb.setPopupData('archiveProject', 'actionType');
														// }

														"replace-artefact": [{
																					"page_name": "artefact-two",
																					"title": "Replace an Artefact",
																					allow_artefact_selection: false,
																					chooseExistingFile: true,
																					"buttons": [{
																												"label": "Cancel",
																												"cls": "cancel-btn lnk-btn"
																					}, {
																												"label": "Done",
																												"cls": "main-btn done-btn",
																												"disabled": true
																					}],
																					"callbackfunc": function () {
																												// sb.setPopupData('replaceArtefact', 'actionType');
																												sb.popup.createFilePopup();
																					}
														}],
														"add-people": [{
																					"page_name": "add-people",
																					"title": "Add People to this Project",
																					"buttons": [{
																												"label": "Cancel",
																												"cls": "cancel-btn lnk-btn"
																					}, {
																												"label": "Done",
																												"cls": "main-btn done-btn",
																												"disabled": false
																					}]
														}],
														"create-meeting": [{
																					"page_name": "createInvite",
																					"title": "Create meeting invitation",
																					"buttons": [{
																												"label": "Cancel",
																												"cls": "cancel-btn lnk-btn"
																					}, {
																												"label": "Done",
																												"cls": "main-btn done-btn",
																												"disabled": false
																					}],
																					"callbackfunc": function () {
																												// sb.setPopupData('setMeetingInvitation', 'actionType');
																												sb.popup.meetingIvite();
																					}
														}],
														"add-version": [{
																					"page_name": "artefact-two",
																					"title": "Replace an Artefact",
																					allow_artefact_selection: false,
																					chooseExistingFile: true,
																					"buttons": [{
																												"label": "Cancel",
																												"cls": "cancel-btn lnk-btn"
																					}, {
																												"label": "Done",
																												"cls": "main-btn done-btn",
																												"disabled": true
																					}],
																					"callbackfunc": function () {
																												// sb.setPopupData('addArtefactVersion', 'actionType');
																												sb.popup.createFilePopup();
																					}
														}],
														// "share" : [{
														// 	"page_name": "artefact-four",
														// 	"title": "Share an Artefact",
														// 	"buttons": [{
														//     	"label": "Cancel",
														//     	"cls": "cancel-btn lnk-btn"
														//     },
														//     {
														//     	"label": "Done",
														//     	"cls": "main-btn share-btn done-btn",
														//     	"disabled": false
														//     }],
														//     "callbackfunc": function() {
														//     	sb.setPopupData('shareArtefact', 'actionType');
														//     	sb.popup.shareWithPeoplePopup()	
														//     }
														// }],
														"add-project": [{
																					"page_name": "add-project",
																					title: "Add a Project",
																					"buttons": [{
																												"label": "Cancel",
																												"cls": "cancel-btn lnk-btn"
																					}, {
																												"label": "Done",
																												"cls": "main-btn share-btn done-btn",
																												"disabled": false
																					}],
																					"callbackfunc": function () {
																												// sb.setPopupData('addProject', 'actionType');
																					}
														}],
														"delete-project": [{
																					"page_name": "message",
																					"title": "Delete an Artefact",
																					"message": function () {
																												return "Do you want to Delete " + sb.getPopupData('name') + " project?";
																					},
																					"buttons": [{
																												"label": "Yes",
																												"cls": "main-btn done-btn"
																					}, {
																												"label": "No",
																												"cls": "main-btn cancel-btn"
																					}],
																					"callbackfunc": function () {
																												sb.setPopupData('deleteArtefact', 'actionType');
																					}
														}],
														"cover-image": [{
																					"page_name": "cover-image",
																					"title": "Add Cover Image to this Project",
																					"buttons": [{
																												"label": "Cancel",
																												"cls": "lnk-btn cancel-btn"
																					}, {
																												"label": "Add",
																												"cls": "main-btn done-btn"
																					}],
																					"callbackfunc": sb.popup.coverImage
														}]
							};

							return {
														getPopupsInfo: function (val) {
																					return _.cloneDeep(popups[val]);
														}
							};
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2JhYmVsLWFwcC9jb25maWcvcG9wdXBzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxZQUFVO0FBQzFCLFdBQUksTUFBTSxHQUFHO0FBQ1QsNEJBQWMsRUFBRSxDQUNaO0FBQ0ksZ0NBQVcsRUFBRSxjQUFjO0FBQzNCLDRCQUFPLEVBQUUsaUJBQWlCO0FBQzFCLDhCQUFTLEVBQUUsQ0FBQztBQUNYLG1DQUFPLEVBQUUsUUFBUTtBQUNqQixpQ0FBSyxFQUFFLG9CQUFvQjtzQkFDM0IsRUFDRDtBQUNDLG1DQUFPLEVBQUUsU0FBUztBQUNsQixpQ0FBSyxFQUFFLFVBQVU7QUFDakIsc0NBQVUsRUFBRSxJQUFJO3NCQUNoQixDQUFDO0FBQ0YsbUNBQWMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLGdCQUFnQjtlQUM1QyxFQUNEO0FBQ0ksZ0NBQVcsRUFBRSxjQUFjO0FBQzNCLDRCQUFPLEVBQUUsaUJBQWlCO0FBQzFCLHVDQUFrQixFQUFFLElBQUk7QUFDeEIsK0NBQTBCLEVBQUUsSUFBSTtBQUNoQyw4QkFBUyxFQUFFLENBQUM7QUFDWCxtQ0FBTyxFQUFFLE1BQU07QUFDZixpQ0FBSyxFQUFFLFNBQVM7c0JBQ2hCLEVBQUM7QUFDRCxtQ0FBTyxFQUFFLFFBQVE7QUFDakIsaUNBQUssRUFBRSxvQkFBb0I7c0JBQzNCLEVBQ0Q7QUFDQyxtQ0FBTyxFQUFFLFNBQVM7QUFDbEIsaUNBQUssRUFBRSxVQUFVO0FBQ2pCLHNDQUFVLEVBQUUsSUFBSTtzQkFDaEIsQ0FBQztBQUNGLG1DQUFjLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlO2VBQzNDLEVBQ0Q7QUFDSSxnQ0FBVyxFQUFFLGdCQUFnQjtBQUM3Qiw0QkFBTyxFQUFFLGlCQUFpQjtBQUMxQiw4QkFBUyxFQUFFLENBQUM7QUFDWCxtQ0FBTyxFQUFFLE1BQU07QUFDZixpQ0FBSyxFQUFFLFNBQVM7c0JBQ2hCLEVBQUM7QUFDRCxtQ0FB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QUMxQyw4QkFBUyxFQUFFLENBQUM7QUFDUixtQ0FBTyxFQUFFLFFBQVE7QUFDakIsaUNBQUssRUFBRSxvQkFBb0I7c0JBQzNCLEVBQUM7QUFDRCxtQ0FBTyxFQUFFLEtBQUs7QUFDZCxpQ0FBSyxFQUFFLG1CQUFtQjtzQkFDMUIsQ0FBQztBQUNGLG1DQUFjLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVO2VBQ3RDLENBQ0Q7UUFDUCxDQUFDOztBQUVGLGNBQU87QUFDTiwyQkFBYSxFQUFFLFVBQVMsR0FBRyxFQUFDO0FBQzNCLDRCQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7ZUFDaEM7UUFDRCxDQUFBO0NBQ0QsQ0FBQSxFQUFHLENBQUMiLCJmaWxlIjoicG9wdXBzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiS2Vuc2VvLnBvcHVwcyA9IChmdW5jdGlvbigpe1xuXHR2YXIgcG9wdXBzID0ge1xuXHQgICAgXCJhZGQtYXJ0ZWZhY3RcIjogW1xuXHQgICAgICAgIHtcblx0ICAgICAgICAgICAgXCJwYWdlX25hbWVcIjogXCJhcnRlZmFjdC1vbmVcIixcblx0ICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkFkZCBhbiBBcnRlZmFjdFwiLFxuXHQgICAgICAgICAgICBcImJ1dHRvbnNcIjogW3tcblx0ICAgICAgICAgICAgXHRcImxhYmVsXCI6IFwiQ2FuY2VsXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJsbmstYnRuIGNhbmNlbC1idG5cIlxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgIFx0XCJsYWJlbFwiOiBcIlByb2NlZWRcIixcblx0ICAgICAgICAgICAgXHRcImNsc1wiOiBcIm1haW4tYnRuXCIsXG5cdCAgICAgICAgICAgIFx0XCJkaXNhYmxlZFwiOiB0cnVlXG5cdCAgICAgICAgICAgIH1dLFxuXHQgICAgICAgICAgICBcImNhbGxiYWNrZnVuY1wiOiBzYi5wb3B1cC5nZXRQcm9qZWN0c1BvcHVwXG5cdCAgICAgICAgfSxcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIFwicGFnZV9uYW1lXCI6IFwiYXJ0ZWZhY3QtdHdvXCIsXG5cdCAgICAgICAgICAgIFwidGl0bGVcIjogXCJBZGQgYW4gQXJ0ZWZhY3RcIixcblx0ICAgICAgICAgICAgXCJzaG93X2NvbWluZ19zb29uXCI6IHRydWUsXG5cdCAgICAgICAgICAgIFwiYWxsb3dfYXJ0ZWZhY3Rfc2VsZWN0aW9uXCI6IHRydWUsXG5cdCAgICAgICAgICAgIFwiYnV0dG9uc1wiOiBbe1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJCYWNrXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJsbmstYnRuXCJcblx0ICAgICAgICAgICAgfSx7XG5cdCAgICAgICAgICAgIFx0XCJsYWJlbFwiOiBcIkNhbmNlbFwiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwiY2FuY2VsLWJ0biBsbmstYnRuXCJcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAge1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJQcm9jZWVkXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJtYWluLWJ0blwiLFxuXHQgICAgICAgICAgICBcdFwiZGlzYWJsZWRcIjogdHJ1ZVxuXHQgICAgICAgICAgICB9XSxcblx0ICAgICAgICAgICAgXCJjYWxsYmFja2Z1bmNcIjogc2IucG9wdXAuY3JlYXRlRmlsZVBvcHVwXG5cdCAgICAgICAgfSxcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIFwicGFnZV9uYW1lXCI6IFwiYXJ0ZWZhY3QtdGhyZWVcIixcblx0ICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkFkZCBhbiBBcnRlZmFjdFwiLFxuXHQgICAgICAgICAgICBcImJ1dHRvbnNcIjogW3tcblx0ICAgICAgICAgICAgXHRcImxhYmVsXCI6IFwiQmFja1wiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwibG5rLWJ0blwiXG5cdCAgICAgICAgICAgIH0se1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJDYW5jZWxcIixcblx0ICAgICAgICAgICAgXHRcImNsc1wiOiBcImNhbmNlbC1idG4gbG5rLWJ0blwiXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHtcblx0ICAgICAgICAgICAgXHRcImxhYmVsXCI6IFwiRG9uZVwiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwibWFpbi1idG4gZG9uZS1idG5cIixcblx0ICAgICAgICAgICAgXHRcImRpc2FibGVkXCI6IGZhbHNlXG5cdCAgICAgICAgICAgIH1dLFxuXHQgICAgICAgICAgICBcImNhbGxiYWNrZnVuY1wiOiBzYi5wb3B1cC50ZWFtUG9wdXBcblx0ICAgICAgICB9XG5cdCAgICBdLFxuXHQgICAgXCJzaGFyZS1hcnRlZmFjdFwiOiBbXG5cdCAgICAgICAge1xuXHQgICAgICAgICAgICBcInBhZ2VfbmFtZVwiOiBcImFydGVmYWN0LW9uZVwiLFxuXHQgICAgICAgICAgICBcInRpdGxlXCI6IFwiU2hhcmUgYW4gQXJ0ZWZhY3RcIixcblx0ICAgICAgICAgICAgXCJidXR0b25zXCI6IFt7XG5cdCAgICAgICAgICAgIFx0XCJsYWJlbFwiOiBcIkNhbmNlbFwiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwiY2FuY2VsLWJ0biBsbmstYnRuXCJcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAge1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJQcm9jZWVkXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJtYWluLWJ0blwiLFxuXHQgICAgICAgICAgICBcdFwiZGlzYWJsZWRcIjogdHJ1ZVxuXHQgICAgICAgICAgICB9XSxcblx0ICAgICAgICAgICAgXCJjYWxsYmFja2Z1bmNcIjogc2IucG9wdXAuZ2V0UHJvamVjdHNQb3B1cFxuXHQgICAgICAgIH0sXG5cdCAgICAgICAge1xuXHQgICAgICAgIFx0XCJwYWdlX25hbWVcIjogXCJhcnRlZmFjdC10d29cIixcblx0ICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlNoYXJlIGFuIEFydGVmYWN0XCIsXG5cdCAgICAgICAgICAgIFwic2hvd19jb21pbmdfc29vblwiOiBmYWxzZSxcblx0ICAgICAgICAgICAgYWxsb3dfYXJ0ZWZhY3Rfc2VsZWN0aW9uOiB0cnVlLFxuXHQgICAgICAgICAgICBjaG9vc2VFeGlzdGluZ0ZpbGU6IHRydWUsXG5cdCAgICAgICAgICAgIFwiYnV0dG9uc1wiOiBbe1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJCYWNrXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJsbmstYnRuXCJcblx0ICAgICAgICAgICAgfSx7XG5cdCAgICAgICAgICAgIFx0XCJsYWJlbFwiOiBcIkNhbmNlbFwiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwiY2FuY2VsLWJ0biBsbmstYnRuXCJcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAge1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJQcm9jZWVkXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJtYWluLWJ0blwiLFxuXHQgICAgICAgICAgICBcdFwiZGlzYWJsZWRcIjogdHJ1ZVxuXHQgICAgICAgICAgICB9XSxcblx0ICAgICAgICAgICAgXCJjYWxsYmFja2Z1bmNcIjogc2IucG9wdXAuY3JlYXRlRmlsZVBvcHVwXG5cdCAgICAgICAgfSxcblx0ICAgICAgICB7XG5cdCAgICAgICAgICAgIFwicGFnZV9uYW1lXCI6IFwiYXJ0ZWZhY3QtdGhyZWVcIixcblx0ICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlNoYXJlIGFuIEFydGVmYWN0XCIsXG5cdCAgICAgICAgICAgIFwiYnV0dG9uc1wiOiBbe1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJCYWNrXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJsbmstYnRuXCJcblx0ICAgICAgICAgICAgfSx7XG5cdCAgICAgICAgICAgIFx0XCJsYWJlbFwiOiBcIkNhbmNlbFwiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwiY2FuY2VsLWJ0biBsbmstYnRuXCJcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAge1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJQcm9jZWVkXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJtYWluLWJ0blwiXG5cdCAgICAgICAgICAgIH1dLFxuXHQgICAgICAgICAgICBcImNhbGxiYWNrZnVuY1wiOiBzYi5wb3B1cC50ZWFtUG9wdXBcblx0ICAgICAgICB9LFxuXHQgICAgICAgIHtcblx0ICAgICAgICBcdFwicGFnZV9uYW1lXCI6IFwiYXJ0ZWZhY3QtZm91clwiLFxuXHQgICAgICAgIFx0XCJ0aXRsZVwiOiBcIlNoYXJlIGFuIEFydGVmYWN0XCIsXG5cdCAgICAgICAgXHRcImJ1dHRvbnNcIjogW3tcblx0ICAgICAgICAgICAgXHRcImxhYmVsXCI6IFwiQmFja1wiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwibG5rLWJ0blwiXG5cdCAgICAgICAgICAgIH0se1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJDYW5jZWxcIixcblx0ICAgICAgICAgICAgXHRcImNsc1wiOiBcImNhbmNlbC1idG4gbG5rLWJ0blwiXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHtcblx0ICAgICAgICAgICAgXHRcImxhYmVsXCI6IFwiRG9uZVwiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwibWFpbi1idG4gc2hhcmUtYnRuIGRvbmUtYnRuXCIsXG5cdCAgICAgICAgICAgIFx0XCJkaXNhYmxlZFwiOiBmYWxzZVxuXHQgICAgICAgICAgICB9XSxcblx0ICAgICAgICAgICAgXCJjYWxsYmFja2Z1bmNcIjogc2IucG9wdXAuc2hhcmVXaXRoUGVvcGxlUG9wdXBcblx0ICAgICAgICB9LFxuXHQgICAgXSxcbiAgICAgICAgXCJhcmNoaXZlLWFydGVmYWN0XCI6IFtcbiAgICAgICAgXHR7XG4gICAgICAgIFx0XHRcInBhZ2VfbmFtZVwiOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgXHRcdFwidGl0bGVcIjogXCJBcmNoaXZlIGFuIEFydGVmYWN0XCIsXG4gICAgICAgIFx0XHRcIm1lc3NhZ2VcIjogZnVuY3Rpb24oKXtcbiAgICAgICAgXHRcdFx0cmV0dXJuIFwiRG8geW91IHdhbnQgdG8gYXJjaGl2ZSBcIiArIHNiLmdldFBvcHVwRGF0YSgndGl0bGUnKSArIFwiIGFydGVmYWN0P1wiO1xuICAgICAgICBcdFx0fSxcblx0ICAgICAgICBcdFwiYnV0dG9uc1wiOiBbe1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJZZXNcIixcblx0ICAgICAgICAgICAgXHRcImNsc1wiOiBcIm1haW4tYnRuIGRvbmUtYnRuXCIsXG5cdCAgICAgICAgICAgIH0se1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJOb1wiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwibWFpbi1idG4gY2FuY2VsLWJ0blwiXG5cdCAgICAgICAgICAgIH1dLFxuXHQgICAgICAgICAgICBcImNhbGxiYWNrZnVuY1wiOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgXHRzYi5zZXRQb3B1cERhdGEoJ2FyY2hpdmVBcnRlZmFjdCcsICdhY3Rpb25UeXBlJyk7IFxuXHQgICAgICAgICAgICB9XG4gICAgICAgIFx0fVxuICAgICAgICBdLFxuICAgICAgICBcImRlbGV0ZS1hcnRlZmFjdFwiOiBbXG4gICAgICAgIFx0e1xuICAgICAgICBcdFx0XCJwYWdlX25hbWVcIjogXCJtZXNzYWdlXCIsXG4gICAgICAgIFx0XHRcInRpdGxlXCI6IFwiRGVsZXRlIGFuIEFydGVmYWN0XCIsXG4gICAgICAgIFx0XHRcIm1lc3NhZ2VcIjogZnVuY3Rpb24oKXtcbiAgICAgICAgXHRcdFx0cmV0dXJuIFwiRG8geW91IHdhbnQgdG8gRGVsZXRlIFwiICsgc2IuZ2V0UG9wdXBEYXRhKCd0aXRsZScpICsgXCIgYXJ0ZWZhY3Q/XCI7XG4gICAgICAgIFx0XHR9LFxuXHQgICAgICAgIFx0XCJidXR0b25zXCI6IFt7XG5cdCAgICAgICAgICAgIFx0XCJsYWJlbFwiOiBcIlllc1wiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwibWFpbi1idG4gZG9uZS1idG5cIixcblx0ICAgICAgICAgICAgfSx7XG5cdCAgICAgICAgICAgIFx0XCJsYWJlbFwiOiBcIk5vXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJtYWluLWJ0biBjYW5jZWwtYnRuXCJcblx0ICAgICAgICAgICAgfV0sXG5cdCAgICAgICAgICAgIFwiY2FsbGJhY2tmdW5jXCI6IGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgICBcdHNiLnNldFBvcHVwRGF0YSgnZGVsZXRlQXJ0ZWZhY3QnLCAnYWN0aW9uVHlwZScpO1xuXHQgICAgICAgICAgICB9XG4gICAgICAgIFx0fVxuICAgICAgICBdLFxuICAgICAgICBcImFyY2hpdmUtcHJvamVjdFwiOiBbXG4gICAgICAgIFx0e1xuICAgICAgICBcdFx0XCJwYWdlX25hbWVcIjogXCJtZXNzYWdlXCIsXG4gICAgICAgIFx0XHRcInRpdGxlXCI6IFwiQXJjaGl2ZSBhIFByb2plY3RcIixcbiAgICAgICAgXHRcdFwibWVzc2FnZVwiOiBmdW5jdGlvbigpe1xuICAgICAgICBcdFx0XHRyZXR1cm4gXCJEbyB5b3Ugd2FudCB0byBhcmNoaXZlIFwiICsgc2IuZ2V0UG9wdXBEYXRhKCduYW1lJykgKyBcIiBwcm9qZWN0ID9cIjtcbiAgICAgICAgXHRcdH0sXG5cdCAgICAgICAgXHRcImJ1dHRvbnNcIjogW3tcblx0ICAgICAgICAgICAgXHRcImxhYmVsXCI6IFwiWWVzXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJtYWluLWJ0biBkb25lLWJ0blwiLFxuXHQgICAgICAgICAgICB9LHtcblx0ICAgICAgICAgICAgXHRcImxhYmVsXCI6IFwiTm9cIixcblx0ICAgICAgICAgICAgXHRcImNsc1wiOiBcIm1haW4tYnRuIGNhbmNlbC1idG5cIlxuXHQgICAgICAgICAgICB9XSxcblx0ICAgICAgICAgICAgLy8gXCJjYWxsYmFja2Z1bmNcIjogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIC8vIFx0c2Iuc2V0UG9wdXBEYXRhKCdhcmNoaXZlUHJvamVjdCcsICdhY3Rpb25UeXBlJyk7XG5cdCAgICAgICAgICAgIC8vIH1cblx0ICAgICAgICAgICAgXG4gICAgICAgIFx0fVxuICAgICAgICBdLFxuICAgICAgICBcInJlcGxhY2UtYXJ0ZWZhY3RcIjogW1xuICAgICAgICBcdHtcbiAgICAgICAgXHRcdFwicGFnZV9uYW1lXCI6IFwiYXJ0ZWZhY3QtdHdvXCIsXG4gICAgICAgIFx0XHRcInRpdGxlXCI6IFwiUmVwbGFjZSBhbiBBcnRlZmFjdFwiLFxuICAgICAgICBcdFx0YWxsb3dfYXJ0ZWZhY3Rfc2VsZWN0aW9uOiBmYWxzZSxcblx0ICAgICAgICAgICAgY2hvb3NlRXhpc3RpbmdGaWxlOiB0cnVlLFxuICAgICAgICBcdFx0XCJidXR0b25zXCI6IFt7XG5cdCAgICAgICAgICAgIFx0XCJsYWJlbFwiOiBcIkNhbmNlbFwiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwiY2FuY2VsLWJ0biBsbmstYnRuXCJcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAge1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJEb25lXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJtYWluLWJ0biBkb25lLWJ0blwiLFxuXHQgICAgICAgICAgICBcdFwiZGlzYWJsZWRcIjogdHJ1ZVxuXHQgICAgICAgICAgICB9XSxcblx0ICAgICAgICAgICAgXCJjYWxsYmFja2Z1bmNcIjogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIFx0Ly8gc2Iuc2V0UG9wdXBEYXRhKCdyZXBsYWNlQXJ0ZWZhY3QnLCAnYWN0aW9uVHlwZScpO1xuXHQgICAgICAgICAgICBcdHNiLnBvcHVwLmNyZWF0ZUZpbGVQb3B1cCgpO1x0XG5cdCAgICAgICAgICAgIH1cbiAgICAgICAgXHR9XG4gICAgICAgIF0sXG4gICAgICAgIFwiYWRkLXBlb3BsZVwiOiBbXG4gICAgICAgIFx0e1xuICAgICAgICBcdFx0XCJwYWdlX25hbWVcIjogXCJhZGQtcGVvcGxlXCIsXG4gICAgICAgIFx0XHRcInRpdGxlXCI6IFwiQWRkIFBlb3BsZSB0byB0aGlzIFByb2plY3RcIixcbiAgICAgICAgXHRcdFwiYnV0dG9uc1wiOiBbe1xuICAgICAgICBcdFx0XHRcImxhYmVsXCI6IFwiQ2FuY2VsXCIsXG4gICAgICAgIFx0XHRcdFwiY2xzXCI6IFwiY2FuY2VsLWJ0biBsbmstYnRuXCJcbiAgICAgICAgXHRcdH0sXG4gICAgICAgIFx0XHR7XG4gICAgICAgIFx0XHRcdFwibGFiZWxcIjogXCJEb25lXCIsXG4gICAgICAgIFx0XHRcdFwiY2xzXCI6IFwibWFpbi1idG4gZG9uZS1idG5cIixcbiAgICAgICAgXHRcdFx0XCJkaXNhYmxlZFwiOiBmYWxzZVxuICAgICAgICBcdFx0fV1cbiAgICAgICAgXHR9XG4gICAgICAgIF0sXG5cdFx0XCJjcmVhdGUtbWVldGluZ1wiIDogW3tcblx0XHRcdFwicGFnZV9uYW1lXCI6IFwiY3JlYXRlSW52aXRlXCIsXG5cdFx0XHRcInRpdGxlXCI6IFwiQ3JlYXRlIG1lZXRpbmcgaW52aXRhdGlvblwiLFxuXHRcdFx0XCJidXR0b25zXCI6IFt7XG5cdFx0XHRcdFwibGFiZWxcIjogXCJDYW5jZWxcIixcblx0XHRcdFx0XCJjbHNcIjogXCJjYW5jZWwtYnRuIGxuay1idG5cIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0XCJsYWJlbFwiOiBcIkRvbmVcIixcblx0XHRcdFx0XCJjbHNcIjogXCJtYWluLWJ0biBkb25lLWJ0blwiLFxuXHRcdFx0XHRcImRpc2FibGVkXCI6IGZhbHNlXG5cdFx0XHR9XSxcblx0XHRcdFwiY2FsbGJhY2tmdW5jXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgXHQvLyBzYi5zZXRQb3B1cERhdGEoJ3NldE1lZXRpbmdJbnZpdGF0aW9uJywgJ2FjdGlvblR5cGUnKTtcbiAgICAgICAgICAgIFx0c2IucG9wdXAubWVldGluZ0l2aXRlKCk7XHRcbiAgICAgICAgICAgIH1cbiAgICBcdH1dLFxuICAgICAgICBcImFkZC12ZXJzaW9uXCI6W1xuICAgICAgICBcdHtcbiAgICAgICAgXHRcdFwicGFnZV9uYW1lXCI6IFwiYXJ0ZWZhY3QtdHdvXCIsXG4gICAgICAgIFx0XHRcInRpdGxlXCI6IFwiUmVwbGFjZSBhbiBBcnRlZmFjdFwiLFxuICAgICAgICBcdFx0YWxsb3dfYXJ0ZWZhY3Rfc2VsZWN0aW9uOiBmYWxzZSxcblx0ICAgICAgICAgICAgY2hvb3NlRXhpc3RpbmdGaWxlOiB0cnVlLFxuICAgICAgICBcdFx0XCJidXR0b25zXCI6IFt7XG5cdCAgICAgICAgICAgIFx0XCJsYWJlbFwiOiBcIkNhbmNlbFwiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwiY2FuY2VsLWJ0biBsbmstYnRuXCJcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAge1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJEb25lXCIsXG5cdCAgICAgICAgICAgIFx0XCJjbHNcIjogXCJtYWluLWJ0biBkb25lLWJ0blwiLFxuXHQgICAgICAgICAgICBcdFwiZGlzYWJsZWRcIjogdHJ1ZVxuXHQgICAgICAgICAgICB9XSxcblx0ICAgICAgICAgICAgXCJjYWxsYmFja2Z1bmNcIjogZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICAgIFx0Ly8gc2Iuc2V0UG9wdXBEYXRhKCdhZGRBcnRlZmFjdFZlcnNpb24nLCAnYWN0aW9uVHlwZScpO1xuXHQgICAgICAgICAgICBcdHNiLnBvcHVwLmNyZWF0ZUZpbGVQb3B1cCgpO1x0XG5cdCAgICAgICAgICAgIH1cbiAgICAgICAgXHR9XG4gICAgICAgIF0sXG4gICAgICAgIC8vIFwic2hhcmVcIiA6IFt7XG4gICAgICAgIC8vIFx0XCJwYWdlX25hbWVcIjogXCJhcnRlZmFjdC1mb3VyXCIsXG4gICAgICAgIC8vIFx0XCJ0aXRsZVwiOiBcIlNoYXJlIGFuIEFydGVmYWN0XCIsXG4gICAgICAgIC8vIFx0XCJidXR0b25zXCI6IFt7XG4gICAgICAgIC8vICAgICBcdFwibGFiZWxcIjogXCJDYW5jZWxcIixcbiAgICAgICAgLy8gICAgIFx0XCJjbHNcIjogXCJjYW5jZWwtYnRuIGxuay1idG5cIlxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgLy8gICAgIFx0XCJsYWJlbFwiOiBcIkRvbmVcIixcbiAgICAgICAgLy8gICAgIFx0XCJjbHNcIjogXCJtYWluLWJ0biBzaGFyZS1idG4gZG9uZS1idG5cIixcbiAgICAgICAgLy8gICAgIFx0XCJkaXNhYmxlZFwiOiBmYWxzZVxuICAgICAgICAvLyAgICAgfV0sXG4gICAgICAgIC8vICAgICBcImNhbGxiYWNrZnVuY1wiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgIFx0c2Iuc2V0UG9wdXBEYXRhKCdzaGFyZUFydGVmYWN0JywgJ2FjdGlvblR5cGUnKTtcbiAgICAgICAgLy8gICAgIFx0c2IucG9wdXAuc2hhcmVXaXRoUGVvcGxlUG9wdXAoKVx0XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1dLFxuICAgICAgICBcImFkZC1wcm9qZWN0XCI6IFt7XG4gICAgICAgIFx0XCJwYWdlX25hbWVcIjogXCJhZGQtcHJvamVjdFwiLFxuICAgICAgICBcdHRpdGxlOiBcIkFkZCBhIFByb2plY3RcIixcbiAgICAgICAgXHRcImJ1dHRvbnNcIjogW3tcbiAgICAgICAgICAgIFx0XCJsYWJlbFwiOiBcIkNhbmNlbFwiLFxuICAgICAgICAgICAgXHRcImNsc1wiOiBcImNhbmNlbC1idG4gbG5rLWJ0blwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgXHRcImxhYmVsXCI6IFwiRG9uZVwiLFxuICAgICAgICAgICAgXHRcImNsc1wiOiBcIm1haW4tYnRuIHNoYXJlLWJ0biBkb25lLWJ0blwiLFxuICAgICAgICAgICAgXHRcImRpc2FibGVkXCI6IGZhbHNlXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIFwiY2FsbGJhY2tmdW5jXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgXHQvLyBzYi5zZXRQb3B1cERhdGEoJ2FkZFByb2plY3QnLCAnYWN0aW9uVHlwZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XSxcbiAgICAgICAgXCJkZWxldGUtcHJvamVjdFwiOiBbXG4gICAgICAgIFx0e1xuICAgICAgICBcdFx0XCJwYWdlX25hbWVcIjogXCJtZXNzYWdlXCIsXG4gICAgICAgIFx0XHRcInRpdGxlXCI6IFwiRGVsZXRlIGFuIEFydGVmYWN0XCIsXG4gICAgICAgIFx0XHRcIm1lc3NhZ2VcIjogZnVuY3Rpb24oKXtcbiAgICAgICAgXHRcdFx0cmV0dXJuIFwiRG8geW91IHdhbnQgdG8gRGVsZXRlIFwiICsgc2IuZ2V0UG9wdXBEYXRhKCduYW1lJykgKyBcIiBwcm9qZWN0P1wiO1xuICAgICAgICBcdFx0fSxcblx0ICAgICAgICBcdFwiYnV0dG9uc1wiOiBbe1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJZZXNcIixcblx0ICAgICAgICAgICAgXHRcImNsc1wiOiBcIm1haW4tYnRuIGRvbmUtYnRuXCIsXG5cdCAgICAgICAgICAgIH0se1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJOb1wiLFxuXHQgICAgICAgICAgICBcdFwiY2xzXCI6IFwibWFpbi1idG4gY2FuY2VsLWJ0blwiXG5cdCAgICAgICAgICAgIH1dLFxuXHQgICAgICAgICAgICBcImNhbGxiYWNrZnVuY1wiOiBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgICAgXHRzYi5zZXRQb3B1cERhdGEoJ2RlbGV0ZUFydGVmYWN0JywgJ2FjdGlvblR5cGUnKTtcblx0ICAgICAgICAgICAgfVxuICAgICAgICBcdH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb3Zlci1pbWFnZVwiOiBbXG4gICAgICAgIFx0e1xuICAgICAgICBcdFx0XCJwYWdlX25hbWVcIjogXCJjb3Zlci1pbWFnZVwiLFxuICAgICAgICBcdFx0XCJ0aXRsZVwiOiBcIkFkZCBDb3ZlciBJbWFnZSB0byB0aGlzIFByb2plY3RcIixcbiAgICAgICAgXHRcdFwiYnV0dG9uc1wiOiBbe1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJDYW5jZWxcIixcblx0ICAgICAgICAgICAgXHRcImNsc1wiOiBcImxuay1idG4gY2FuY2VsLWJ0blwiXG5cdCAgICAgICAgICAgIH0se1xuXHQgICAgICAgICAgICBcdFwibGFiZWxcIjogXCJBZGRcIixcblx0ICAgICAgICAgICAgXHRcImNsc1wiOiBcIm1haW4tYnRuIGRvbmUtYnRuXCIsXG5cdCAgICAgICAgICAgIH1dLFxuXHQgICAgICAgICAgICBcImNhbGxiYWNrZnVuY1wiOiBzYi5wb3B1cC5jb3ZlckltYWdlXG4gICAgICAgIFx0fVxuICAgICAgICBdXG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRnZXRQb3B1cHNJbmZvOiBmdW5jdGlvbih2YWwpe1xuXHRcdFx0cmV0dXJuIF8uY2xvbmVEZWVwKHBvcHVwc1t2YWxdKTtcblx0XHR9XG5cdH1cbn0pKCk7Il19