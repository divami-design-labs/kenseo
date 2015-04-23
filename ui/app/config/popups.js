Kenseo.popups = (function(){
	var popups = {
	    "add-artefact": [
	        {
	            "page_name": "artefact-one",
	            "title": "Add Artefact",
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
	            "title": "Add Artefact",
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
	            "title": "Share Artefact",
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
	            "title": "Share Artefact",
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
	            	"disabled": true
	            }],
	            "callbackfunc": sb.popup.fourthLoader
	        }
	    ]
	};

	return {
		getPopupsInfo: function(val){
			return _.cloneDeep(popups[val]);
		}
	}
})();