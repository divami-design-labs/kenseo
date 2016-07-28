[
	"project_id",
	"project_name",
	"artefact_id",
	"artefact_version_id",
	"artefact_name",
	"activity_id",
	"user_id",
	"user_name",
	"user_email",
	"user_designation",
	"is_artefact_version_owner", 
	"is_self",
	// Dates
	"last_updated_date",
	"created_date",
	"updated_date"
]

// Kenseo.params = (function () {
// 	var params = {
// 		'db-projects': { limit: 6,  userProjects: true },
// 		'db-artefacts': { limit: 8, shared: true },
// 		'db-notifications': { limit: 12 },
//
// 		'menu-projects': { limit: 3, userProjects: true },
// 		'menu-activities': { activities: true, limit: 3 },
// 		'menu-artefacts': { shared: true, limit: 3 },
// 		'menu-notifications': { limit: 3 },
// 		'menu-people': { limit: 3, projects: true }
//
// 	};
// 	function fetchParams(str) {
// 		return params[str];
// 	}
// 	return {
// 		getParams: function getParams(str) {
// 			var result = {};
// 			if (!str) {
// 				sb.log('params.js :: getParams :: undefined argument');
// 				return false;
// 			}
// 			// String
// 			if (typeof str === 'string') {
// 				result = fetchParams(str);
// 			}
// 			// Array
// 			else if (typeof str === 'object' && typeof str.length === 'undefined') {
// 				result = str;
// 			}
// 			// Object: if the passed argument is already an object then send it as it is.
// 			else if (typeof str === 'object') {
// 				result = _.extend(fetchParams(str[0]), str[1] || {});
// 			}
// 			return result;
// 		}
// 	};
// })();
