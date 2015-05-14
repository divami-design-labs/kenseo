Kenseo.popups = (function(){
	var popups = {
	    "add-artefact": [
	        {
	            "page_name": "artefact-one",
	            "title": "Add an Artefact",
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
	        },
	        {
	            "page_name": "artefact-two",
	            "title": "Add an Artefact",
	            "show_coming_soon": true,
	            "allow_artefact_selection": true,
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
	        },
	        {
	            "page_name": "artefact-three",
	            "title": "Add an Artefact",
	            "buttons": [{
	            	"label": "Back",
	            	"cls": "lnk-btn"
	            },{
	            	"label": "Cancel",
	            	"cls": "cancel-btn lnk-btn"
	            },
	            {
	            	"label": "Done",
	            	"cls": "main-btn done-btn",
	            	"disabled": false
	            }],
	            "callbackfunc": sb.popup.teamPopup
	        }
	    ],
	    "share-artefact": [
	        {
	            "page_name": "artefact-one",
	            "title": "Share an Artefact",
	            "buttons": [{
	            	"label": "Cancel",
	            	"cls": "cancel-btn lnk-btn"
	            },
	            {
	            	"label": "Proceed",
	            	"cls": "main-btn",
	            	"disabled": true
	            }],
	            "callbackfunc": sb.popup.getProjectsPopup
	        },
	        {
	        	"page_name": "artefact-two",
	            "title": "Share an Artefact",
	            "show_coming_soon": false,
	            allow_artefact_selection: true,
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
	        },
	        {
	            "page_name": "artefact-three",
	            "title": "Share an Artefact",
	            "buttons": [{
	            	"label": "Back",
	            	"cls": "lnk-btn"
	            },{
	            	"label": "Cancel",
	            	"cls": "cancel-btn lnk-btn"
	            },
	            {
	            	"label": "Proceed",
	            	"cls": "main-btn"
	            }],
	            "callbackfunc": sb.popup.teamPopup
	        },
	        {
	        	"page_name": "artefact-four",
	        	"title": "Share an Artefact",
	        	"buttons": [{
	            	"label": "Back",
	            	"cls": "lnk-btn"
	            },{
	            	"label": "Cancel",
	            	"cls": "cancel-btn lnk-btn"
	            },
	            {
	            	"label": "Done",
	            	"cls": "main-btn done-btn",
	            	"disabled": false
	            }],
	            "callbackfunc": sb.popup.shareWithPeoplePopup
	        },
	    ],
        "archive-artefact": [
        	{
        		"page_name": "message",
        		"title": "Archive an Artefact",
        		"message": function(){
        			return "Do you want to archive " + Kenseo.popup.data.title + " artefact?";
        		},
	        	"buttons": [{
	            	"label": "Yes",
	            	"cls": "main-btn done-btn",
	            },{
	            	"label": "No",
	            	"cls": "main-btn cancel-btn"
	            }],
	            "callbackfunc": function() {
	            	Kenseo.popup.data.actionType = 'art-archive'
	            }
        	}
        ],
        "delete-artefact": [
        	{
        		"page_name": "message",
        		"title": "Delete an Artefact",
        		"message": function(){
        			return "Do you want to Delete " + Kenseo.popup.data.title + " artefact?";
        		},
	        	"buttons": [{
	            	"label": "Yes",
	            	"cls": "main-btn done-btn",
	            },{
	            	"label": "No",
	            	"cls": "main-btn cancel-btn"
	            }],
	            "callbackfunc": function() {
	            	Kenseo.popup.data.actionType = 'art-delete'
	            }
        	}
        ],
        "archive-project": [
        	{
        		"page_name": "message",
        		"title": "Archive a Project",
        		"message": function(){
        			return "Do you want to archive " + Kenseo.popup.data.name + " project ?";
        		},
	        	"buttons": [{
	            	"label": "Yes",
	            	"cls": "main-btn archiveProject-btn",
	            },{
	            	"label": "No",
	            	"cls": "main-btn cancel-btn"
	            }],
	            
        	}
        ],
        "replace-artefact": [
        	{
        		"page_name": "artefact-two",
        		"title": "Replace an Artefact",
        		"buttons": [{
	            	"label": "Cancel",
	            	"cls": "cancel-btn lnk-btn"
	            },
	            {
	            	"label": "Done",
	            	"cls": "main-btn done-btn",
	            	"disabled": false
	            }],
	            "callbackfunc": function() {
	            	Kenseo.popup.data.actionType = 'art-replace'
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
        			"disabled": false
        		}]
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
				"cls": "main-btn meeting-btn",
				"disabled": false
			}],
			"callbackfunc": sb.popup.meetingIvite
    	}],
        "add-version":[
        	{
        		"page_name": "artefact-two",
        		"title": "Add Version",
        		"buttons": [{
        			"label": "Cancel",
        			"cls": "cancel-btn lnk-btn"
        		},
        		{
        			"label": "Done",
        			"cls": "main-btn done-btn",
        			"disabled": false
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