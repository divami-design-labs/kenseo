"use strict";

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
																					"message": function message() {
																												return 'Do you want to archive "' + sb.getPopupData('title') + '" artefact?';
																					},
																					"buttons": [{
																												"label": "Yes",
																												"cls": "main-btn done-btn"
																					}, {
																												"label": "No",
																												"cls": "main-btn cancel-btn"
																					}],
																					"callbackfunc": function callbackfunc() {
																												sb.setPopupData('archiveArtefact', 'actionType');
																					}
														}],
														"delete-artefact": [{
																					"page_name": "message",
																					"title": "Delete an Artefact",
																					"message": function message() {
																												return 'Do you want to Delete "' + sb.getPopupData('title') + '" artefact?';
																					},
																					"buttons": [{
																												"label": "Yes",
																												"cls": "main-btn done-btn"
																					}, {
																												"label": "No",
																												"cls": "main-btn cancel-btn"
																					}],
																					"callbackfunc": function callbackfunc() {
																												sb.setPopupData('deleteArtefact', 'actionType');
																					}
														}],
														"archive-project": [{
																					"page_name": "message",
																					"title": "Archive a Project",
																					"message": function message() {
																												return 'Do you want to archive "' + sb.getPopupData('name') + '" project ?';
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

														"unarchive-project": [{
																					"page_name": "message",
																					"title": "Unarchive a Project",
																					"message": function message() {
																												return 'Do you want to unarchive "' + sb.getPopupData('name') + '" project ?';
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
																					"callbackfunc": function callbackfunc() {
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
																												"disabled": false,
																												"attr": {
																																			"data-target-validating-section": ".popup-body"
																												}
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
																					"callbackfunc": function callbackfunc() {
																												// sb.setPopupData('setMeetingInvitation', 'actionType');
																												sb.popup.meetingIvite();
																					}
														}],
														"add-version": [{
																					"page_name": "artefact-two",
																					"title": "Add version",
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
																					"callbackfunc": function callbackfunc() {
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
																												"disabled": false,
																												"attr": {
																																			"data-target-validating-section": ".popup-body"
																												}
																					}],
																					"callbackfunc": function callbackfunc() {
																												// sb.setPopupData('addProject', 'actionType');
																					}
														}],
														"delete-project": [{
																					"page_name": "message",
																					"title": "Delete a Project",
																					"message": function message() {
																												return 'Do you want to Delete "' + sb.getPopupData('name') + '" project?';
																					},
																					"buttons": [{
																												"label": "Yes",
																												"cls": "main-btn done-btn"
																					}, {
																												"label": "No",
																												"cls": "main-btn cancel-btn"
																					}],
																					"callbackfunc": function callbackfunc() {
																												sb.setPopupData('deleteProject', 'actionType');
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
														getPopupsInfo: function getPopupsInfo(val) {
																					return _.cloneDeep(popups[val]);
														}
							};
})();