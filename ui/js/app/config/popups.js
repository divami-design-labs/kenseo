Kenseo.popups = (function(){
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
				"callbackfunc": sb.popup.teamPopup
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
					"disabled": false
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
				"callbackfunc": sb.popup.createFilePopup
		}
	}
	var popups = {
	    "add-artefact": [
	        artefactOne({"title":"Add an Artefact"}),
					artefactTwo({"title":"Add an Artefact"}),
					artefactThree({"title":"Add an Artefact"})
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
        		"page_name": "artefact-two",
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
			          sb.popup.addPeopleAndPermissions();
			      }
        	}
        ],
			"create-meeting" : [{
				"page_name": "createInvite",
				"title": "Create meeting invitation",
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
				"callbackfunc": function() {
	            	// sb.setPopupData('setMeetingInvitation', 'actionType');
	            	sb.popup.meetingIvite();
	            }
	    	}],
    	"add-version":[
      	{
      		"page_name": "artefact-two",
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
      "add-project": [
				addProject({"title":"Add a project"}),
				artefactTwo({"title":"Add a project"}),
				artefactThree({"title":"Add a project"})
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
      }]
	};

	return {
		getPopupsInfo: function(val){
			return _.cloneDeep(popups[val]);
		}
	}
})();
