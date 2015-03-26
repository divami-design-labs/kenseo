var i18n = {
	text : {
		'ongoing_review_requests': 'Ongoing review requests',
		'create_review_request': 'Create review request'
	},
	apiCall: {
		'login': 'login',
		'create_review_request': 'createreviewrequest',
		'header_template': 'templates/header.html',
		'section_template': 'templates/section.html'
	},
	files: {
	    'jquery': {
	        'path': 'app/libs/jquery.js'
	    },
	    'backbone': {
	        'path': 'app/libs/backbone.js'
	    },
	    'router': {
	        'path': 'app/config/router.js'
	    },
	    'init': {
	        'path': 'app/init.js'
	    },
	    'dashboardView':{
	        'path': 'app/modules/dashboard/DashboardView.js'
	    },
	    'headerView': {
	    	'path': 'app/modules/header/headerView.js'
	    }
	},
	views: {

	},
	models: {
		
	}
};

//to extend this object later in other files use _.extend(Kenseo["i18n"],{/*object to extend*/});
// Please do check this link to know which method to be used exactly: http://stackoverflow.com/q/19965844/1577396
