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
	            "callbackfunc": sb.popup.firstLoader
	        },
	        {
	            "page_name": "artefact-two",
	            "title": "Add an Artefact",
	            "show_coming_soon": true,
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
	            "callbackfunc": sb.popup.secondLoader
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
	            "callbackfunc": sb.popup.thirdLoader
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
	            "callbackfunc": sb.popup.firstLoader
	        },
	        {
	        	"page_name": "artefact-two",
	            "title": "Share an Artefact",
	            "show_coming_soon": false,
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
	            "callbackfunc": sb.popup.secondLoader
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
	            "callbackfunc": sb.popup.thirdLoader
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
	            "callbackfunc": sb.popup.fourthLoader
	        },
	    ],
        "archive-artefact": [
        	{
        		"page_name": "message",
        		"title": "Archive an Artefact",
        		"message": function(){
        			return "Do you want to archive " + Kenseo.popup.data.artefact_name + " artefact?";
        		},
	        	"buttons": [{
	            	"label": "Yes",
	            	"cls": "main-btn done-btn",
	            },{
	            	"label": "No",
	            	"cls": "main-btn cancel-btn"
	            }],
        	}
        ],
        "archive-project": [
        	{
        		"page_name": "message",
        		"title": "Archive a Project",
        		"message": function(){
        			return "Do you want to archive " + Kenseo.popup.data.project_name + " project ?";
        		},
	        	"buttons": [{
	            	"label": "Yes",
	            	"cls": "main-btn done-btn",
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
        ]
	};

	return {
		getPopupsInfo: function(val){
			return _.cloneDeep(popups[val]);
		}
	}
})();