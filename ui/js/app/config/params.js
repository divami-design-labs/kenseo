[
	// Projects
	"project_id",
	"project_name",

	// Artefacts
	"artefact_id",
	"artefact_version_id",
	"artefact_name",
	"artefact_type",       // IXD, UID, Persona
	"artefact_extension",  // MIME type

	// Activities
	"activity_id",

	// Users
	"user_id",
	"user_name",
	"user_email",
	"user_designation",
	"is_artefact_version_owner",  // holds 1 or 0
	"is_self",             // holds 1 or 0

	// Dates
	"last_updated_date",
	"created_date",
	"updated_date",

	// meeting
	"meeting_id",
	"meeting_date",
	"agenda",
	"venue",
	"meeting_date",
	"meeting_date_from_time",
	"meeting_date_to_time",
	"participants_user_ids"
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
