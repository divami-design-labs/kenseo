Kenseo.popups = (function(){
	function meeting(payload){
		return [{
			"page_name": "createInvite",
			"title": _.capitalize(payload.populateType.split("-").join(" ")) + " invitation",
			"buttons": [{
				"label": "Cancel",
				"cls": "cancel-btn lnk-btn"
			},
			{
				"label": "Done",
				"cls": "main-btn done-btn",
				"disabled": false,
				'attr': {
					'data-target-validating-section': '.popup-body'
				}
			}],
			"populateType": payload.populateType,
			"callbackfunc": function() {
            	// sb.setPopupData('setMeetingInvitation', 'actionType');
            	sb.popup.meetingIvite();
            }
    	}];
	}
	function artefactOne(obj) {
		return {
				"page_name": "artefact-one",
				"title": obj.title,
				"buttons": [{
					"label": "Cancel",
					"cls": "lnk-btn cancel-btn"
				},
				{
					"label": "Proceed",
					"cls": "main-btn",
					"disabled": true
				}],
				"callbackfunc": sb.popup.getProjectsPopup
		}
	}
	function artefactTwo(obj) {
		return {
				"page_name": "artefact-two",
				"title": obj.title,
				"show_coming_soon": true,
				"allow_artefact_selection": true,
				// this variable has to come in case of share artifact
				//chooseExistingFile: true,
				"buttons": [{
					"label": "Back",
					"cls": "lnk-btn"
				},{
					"label": "Cancel",
					"cls": "cancel-btn lnk-btn"
				},
				{
					"label": "Proceed",
					"cls": "main-btn",
					"disabled": true
				}],
				"callbackfunc": sb.popup.createFilePopup
		}
	}
	function message() {
		return {
			'page_name': 'message',
			'title': 'General artefact sharing',
			'message': function(){
				return 'This artefact will be shared with your project team members (if any) automatically';
			},
			'buttons': [{
					'label': 'Back',
					'cls': 'lnk-btn'
				},{
					'label': 'Cancel',
					'cls': 'cancel-btn lnk-btn'
				},
				{
					'label': 'Proceed',
					'cls': 'main-btn'
				}],
		}
	}
	function artefactThree(obj) {
		return {
				"page_name": "artefact-three",
				"title": obj.title,
				"buttons": [{
					"label": "Back",
					"cls": "lnk-btn"
				},{
					"label": "Cancel",
					"cls": "cancel-btn lnk-btn"
				},
				{
					// in palce of done button Proceed button has to come in share artefact
					"label": "Done",
					"cls": "main-btn done-btn",
					"disabled": false
				}],
				"callbackfunc": obj.callbackfunc
		}
	}
	function artefactFour(obj) {
		return {
			"page_name": "artefact-four",
			"title": obj.title,
			"buttons": [{
					"label": "Back",
					"cls": "lnk-btn"
				},{
					"label": "Cancel",
					"cls": "cancel-btn lnk-btn"
				},
				{
					"label": "Done",
					"cls": "main-btn share-btn done-btn",
					"disabled": true
				}],
				"callbackfunc": sb.popup.shareWithPeoplePopup
		}
	}
	function addProject(obj) {
		return {
			"page_name": "add-project",
			title: obj.title,
			"buttons": [{
					"label": "Cancel",
					"cls": "cancel-btn lnk-btn"
				},
				{
					"label": "Done",
					"cls": "main-btn share-btn done-btn",
					"disabled": false,
					"attr": {
						"data-target-validating-section": ".popup-body"
					}
				},
				{
					"label": "Proceed",
					"cls": "main-btn nav-btn display-none",
					"disabled": false,
					"attr": {
						"data-target-validating-section": ".popup-body"
					}
				}],
				"callbackfunc": sb.popup.addNewProject
		}
	}
	function renameArtefact(obj) {
		return {
			"page_name": "rename-artefact",
			title: obj.title,
			"buttons": [{
				"label": "Cancel",
				"cls": "cancel-btn lnk-btn"
			},
			{
				"label": "Done",
				"cls": "main-btn share-btn done-btn",
				"disabled": false,
				"attr": {
					"data-target-validating-section": ".popup-body"
				}
			}],
			"callbackfunc": sb.popup.renameArtefact
		}
	}
	function artefactFive(obj) {
		return {
			"page_name": "artefact-five",
			"title": obj.title,
			"show_coming_soon": true,
			"allow_artefact_selection": true,
			chooseExistingFile: true,
			"buttons": [{
				"label": "Back",
				"cls": "lnk-btn"
			},{
				"label": "Cancel",
				"cls": "cancel-btn lnk-btn"
			},
			{
				"label": "Proceed",
				"cls": "main-btn",
				"disabled": true
			}],
			"callbackfunc": sb.popup.shareArtefactPopup,
			"popupRefresh": sb.popup.shareArtefactPopup
		}
	}
	var popups = {
	    "add-artefact": [
	        artefactOne({"title":"Add an Artefact"}),
					artefactTwo({"title":"Add an Artefact"}),
					artefactThree({"title":"Add an Artefact","callbackfunc" : sb.popup.teamPopup})
	    ],
	    "create-artefact": [
	    	{
	    		"page_name": "create-artefact",
	    		"title": "Create an Artefact"
	    	},
	    	{
	    		"page_name": "persona-templates",
	    		"title": "Choose a persona template"
	    	}
	    ],
	    "edit-artefact-info": [
	    	artefactThree({"title":"Edit an Artefact","callbackfunc" : sb.popup.editArtefactPopup})
	    ],
	    "share-artefact": [
				artefactOne({"title":"Share an Artefact"}),
				artefactFive({"title":"Share an Artefact"}),
				artefactFour({"title":"Share an Artefact"})
	    ],
	    "share-existing-artefact": [
	    	{
	    		'page_name': 'artefact-three',
	    		'title': 'Share an Artefact',
	    		"buttons": [{
	            	"label": "Cancel",
	            	"cls": "cancel-btn lnk-btn"
	            },
	            {
	            	"label": "Done",
	            	"cls": "main-btn share-btn done-btn",
	            	"disabled": false
	            }],
	            'callfrontfunc': function(){
	            	// get all necessary information through ajax calls
	            	return sb.ajaxCall({
			            url: sb.getRelativePath('getArtefactMetaInfo'),
			            data: {
			                id: sb.getPopupData('artefact_id')
			            },
			            success: function(){
			            	sb.popup.shareWithPeoplePopup();
			            }
			        });
	            },
	            'callbackfunc': function(){
	            	//
	            }
	    	}
	    ],
        "archive-artefact": [
        	{
        		"page_name": "message",
        		"title": "Archive an Artefact",
        		"message": function(){
        			return 'Do you want to archive "' + sb.getPopupData('title') + '" artefact?';
        		},
	        	"buttons": [{
	            	"label": "Yes",
	            	"cls": "main-btn done-btn",
	            },{
	            	"label": "No",
	            	"cls": "main-btn cancel-btn"
	            }],
	            "callbackfunc": function() {
	            	sb.setPopupData('archiveArtefact', 'actionType');
	            }
        	}
        ],
        "delete-artefact": [
        	{
        		"page_name": "message",
        		"title": "Delete an Artefact",
        		"message": function(){
        			return 'Do you want to Delete "' + sb.getPopupData('title') + '" artefact?';
        		},
	        	"buttons": [{
	            	"label": "Yes",
	            	"cls": "main-btn ok-btn",
	            },{
	            	"label": "No",
	            	"cls": "main-btn cancel-btn"
	            }],
	            "callbackfunc": function() {
	            	sb.setPopupData('deleteArtefact', 'actionType');
	            }
        	}
        ],
        "archive-project": [
        	{
        		"page_name": "message",
        		"title": "Archive a Project",
        		"message": function(){
        			return 'Do you want to archive "' + sb.getPopupData('name') + '" project ?';
        		},
	        	"buttons": [{
	            	"label": "Yes",
	            	"cls": "main-btn ok-btn",
	            },{
	            	"label": "No",
	            	"cls": "main-btn cancel-btn"
	            }],
	            // "callbackfunc": function() {
	            // 	sb.setPopupData('archiveProject', 'actionType');
	            // }

        	}
        ],
        "unarchive-project": [
        	{
        		"page_name": "message",
        		"title": "Unarchive a Project",
        		"message": function(){
        			return 'Do you want to unarchive "' + sb.getPopupData('name') + '" project ?';
        		},
	        	"buttons": [{
	            	"label": "Yes",
	            	"cls": "main-btn ok-btn",
	            },{
	            	"label": "No",
	            	"cls": "main-btn cancel-btn"
	            }],
	            // "callbackfunc": function() {
	            // 	sb.setPopupData('archiveProject', 'actionType');
	            // }

        	}
        ],
        "replace-artefact": [
        	{
        		"page_name": "artefact-six",
        		"title": "Replace an Artefact",
        		allow_artefact_selection: false,
	            chooseExistingFile: true,
        		"buttons": [{
	            	"label": "Cancel",
	            	"cls": "cancel-btn lnk-btn"
	            },
	            {
	            	"label": "Done",
	            	"cls": "main-btn done-btn",
	            	"disabled": true
	            }],
	            "callbackfunc": function() {
	            	// sb.setPopupData('replaceArtefact', 'actionType');
	            	sb.popup.createFilePopup();
	            }
        	}
        ],
        "add-people": [
        	{
        		"page_name": "add-people",
        		"title": "Add People to this Project",
        		"buttons": [{
        			"label": "Cancel",
        			"cls": "cancel-btn lnk-btn"
        		},
        		{
        			"label": "Done",
        			"cls": "main-btn done-btn",
        			"disabled": false,
        			"attr": {
        				"data-target-validating-section": ".popup-body"
        			}
        		}],
				"callbackfunc": function() {
					sb.popup.shareWithPeoplePopup();
				}
        	}
        ],
		"create-meeting" : meeting({
			"populateType": "create-meeting"
		}),
		"update-meeting": meeting({
			"populateType": "update-meeting"
		}),
        "add-version":[
        	{
        		"page_name": "artefact-six",
        		"title": "Add version",
        		allow_artefact_selection: false,
        		single_file_selector: true,
	            chooseExistingFile: true,
        		"buttons": [{
	            	"label": "Cancel",
	            	"cls": "cancel-btn lnk-btn"
	            },
	            {
	            	"label": "Done",
	            	"cls": "main-btn done-btn",
	            	"disabled": true
	            }],
	            "callbackfunc": function() {
	            	// sb.setPopupData('addArtefactVersion', 'actionType');
	            	sb.popup.createFilePopup();
	            }
        	}
        ],
		"private-message": [
			{
				"page_name": "private-message",
				"title": "Private Message",
				"buttons": [{
					"label": "Cancel",
					"cls": "lnk-btn cancel-btn"
				},{
					"label": "Save Message",
					"cls": "main-btn done-btn",
				}]
			}
		],
		"rename-artefact": [
			renameArtefact({"title":"Rename Artefact"}),
		],
		"add-project": [
				addProject({"title":"Add a project"}),
				artefactTwo({"title":"Add a project"}),
				artefactThree({"title":"Add a project","callbackfunc" : sb.popup.teamPopup})
			],
		"delete-project": [
			{
				"page_name": "message",
				"title": "Delete a Project",
				"message": function(){
					return 'Do you want to Delete "' + sb.getPopupData('name') + '" project?';
				},
				"buttons": [{
					"label": "Yes",
					"cls": "main-btn done-btn",
				},{
					"label": "No",
					"cls": "main-btn cancel-btn"
				}],
				"callbackfunc": function() {
					sb.setPopupData('deleteProject', 'actionType');
				}
			}
		],
		"download-persona": [
			{
				"page_name": "message",
				"title": "Delete a Project",
				"message": function(){
					return 'Do you want to Download this persona?';
				},
				"buttons": [{
					"label": "Yes",
					"cls": "main-btn yes-btn",
				},{
					"label": "No",
					"cls": "main-btn cancel-btn"
				}],
				"callbackfunc": function() {
					var $popup = Kenseo.current.popup;
					$popup.on('click', '.yes-btn', function(){
						var $personaHolder  = $('.persona-template-capture');
						html2canvas($personaHolder.get(0), {
							onrendered: function(canvas) {
								var imgData = canvas.toDataURL('image/png');              
								var pdf = new jsPDF('p', 'px', 'a2');
								pdf.addImage(imgData, 'PNG', 10, 10);
								pdf.save('persona.pdf');
							}
						});

						sb.popupCloser($popup.parents('.popup-container'));
					});
				}
			}
		],
		"cover-image": [
		{
			"page_name": "cover-image",
			"title": "Add Cover Image to this Project",
			"buttons": [{
				"label": "Cancel",
				"cls": "lnk-btn cancel-btn"
			},{
				"label": "Add",
				"cls": "main-btn done-btn",
			}],
			"callbackfunc": sb.popup.coverImage
		}
		],
		"removePeople": [{
			"page_name": "message",
			"title": "Confirmation",
			"message": function() {
				return "Do you want to remove this person?";
			},
			"buttons": [{
				"label": "Yes",
				"cls": "main-btn ok-btn",
			},{
				"label": "No",
				"cls": "main-btn cancel-btn"
			}],
			"callbackfunc": sb.popup.removePeople
		}],
		"submit-artefact": [
			{
				"page_name": "message",
				"title": "Confirmation",
				"message": function() {
					return "Do you want to submit this artefact?";
				},
				"buttons": [{
					"label": "Yes",
					"cls": "main-btn done-btn",
				},{
					"label": "No",
					"cls": "main-btn cancel-btn"
				}]
			}
		],
		"edit-comment": [
			{
				"page_name": "edit-comment",
				"title": "Edit comment",
				"buttons": [{
					"label": "Cancel",
					"cls": "lnk-btn cancel-btn"
				},{
					"label": "Done",
					"cls": "main-btn done-btn",
					"attr": {
						"data-target-validating-section": ".popup-body"
					}
				}]
			}
		],
		"delete-comment": [
			{
				"page_name": "message",
				"title": "Delete the comment",
				"message": function(){
					return 'Do you want to Delete this comment?';
				},
				"buttons": [{
					"label": "Yes",
					"cls": "main-btn done-btn",
				},{
					"label": "No",
					"cls": "main-btn cancel-btn"
				}]
			}
		]
	};

	return {
		getPopupsInfo: function(val){
			return _.cloneDeep(popups[val]);
		}
	}
})();
