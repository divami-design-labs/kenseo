(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['reference-items'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 _.each(data, function(d){ ;
__p += '\r\n<div class="reference-suggestion-item" name="' +
((__t = ( d.id )) == null ? '' : __t) +
'" ';
if(d.email) { ;
__p += 'email= "' +
((__t = ( d.email )) == null ? '' : __t) +
'" ';
 } ;
__p += '  ';
if(d.date) { ;
__p += 'date= "' +
((__t = ( d.date )) == null ? '' : __t) +
'" ';
 } ;
__p += ' ';
if(d. userName) { ;
__p += ' userName= "' +
((__t = ( d. userName )) == null ? '' : __t) +
'" ';
 } ;
__p += '>\r\n\t' +
((__t = ( d.name )) == null ? '' : __t) +
'\r\n</div>\r\n';
 }); ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['artefacts'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(params.projects && params.sortBy){ ;
__p += '\r\n<div class="sub-heading-section">\r\n\t<div class="artifacts-heading sub-heading">\r\n\t\t<div class="sub-heading-label">Artefacts</div>\r\n\t\t<div class="sub-heading-add-wrapper">\r\n\t\t\t<div class="sub-heading-add-icon popup-click" data-url="add-artefact" data-index="1">\r\n\t\t\t\t<svg><use xlink:href="#add"></use></svg>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 if(data.length){ ;
__p += '\r\n\t\t<div class="sub-heading-more-options html-click sub-menu-nav" data-html-class="active">\r\n\t\t\t<div class="sub-heading-more-icon"><svg><use xlink:href="#more"></use></svg></div>\r\n\t\t\t<div class="sub-menu-holder left-nav bottom-nav">\r\n\t\t\t\t<div class="sub-menu-item sort-item" data-stype="name">Sort by Name</div>\r\n\t\t\t\t<div class="sub-menu-item sort-item" data-stype="date">Sort by Date</div>\r\n\t\t\t\t<div class="sub-menu-item sort-item" data-stype="owner">Group by Owner</div>\r\n\t\t\t\t<div class="sub-menu-item sort-item" data-stype="default">Default Sort</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } ;
__p += '\r\n\t</div>\r\n</div>\r\n<div class="artifacts-content sub-section-content ';
 if(params.sortBy && params.sortBy === 'default'){ ;
__p += ' linked-artefacts ';
 } ;
__p += '">\r\n\t<div class="sort-view">Sort By ';
 if(params && params.sortBy){ ;
__p += ' ' +
((__t = ( _.capitalize(params.sortBy) )) == null ? '' : __t) +
' ';
 } else { ;
__p += 'Default ';
 } ;
__p += '</div>\r\n';
 } else{ ;
__p += '\r\n\t<div class="review-requests-heading">            \r\n\t\t<div class="review-requests-icon">\r\n\t\t\t<svg><use xlink:href="#reviewrequest"></use></svg>\r\n\t\t</div>\r\n\t\t<div class="heading-text">Shared Artefacts</div>\r\n\t</div>\r\n\t<div class="review-requests-content">\r\n';
 } ;
__p += '\r\n\t\t';
 _.each(data, function(d){ ;
__p += '\r\n\t\t\t' +
((__t = ( sb.setTemplate('artefact', {data: d}) )) == null ? '' : __t) +
'\r\n\t\t';
 }) ;
__p += '\r\n';
 if(params.projects && params.sortBy){ ;
__p += '\r\n</div>\r\n';
 } else{ ;
__p += '\r\n\t</div>\r\n';
 } ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['no-items'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="no-items ';
 if(data.classes){ ;
__p += ' ' +
((__t = ( data.classes )) == null ? '' : __t) +
' ';
 } ;
__p += '">\r\n\t';
 if(data.message){ ;
__p += '\r\n\t\t' +
((__t = ( data.message )) == null ? '' : __t) +
'\r\n\t';
 } else if(data.add){ ;
__p += '\r\n\t\t<div class="add-icon big inlineBlockMid"></div>\r\n\t\t<div class="no-items-text inlineBlockMid">' +
((__t = ( data.name )) == null ? '' : __t) +
'</div>\r\n\t';
 } else { ;
__p += '\r\n\t\tNo Items to show\r\n\t';
 } ;
__p += '\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['versions'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 for(var i=0; i< data.length; i++){ ;
__p += '\r\n\t';
 if(i === 0 || i%4 === 0){ ;
__p += '\r\n\t<div>\r\n\t';
 } ;
__p += '\r\n\t';
 var v = data[i] ;
__p += '\r\n\t<span data-date="' +
((__t = ( v.date )) == null ? '' : __t) +
'">' +
((__t = ( v.num )) == null ? '' : __t) +
'</span>\r\n\t';
 if(i === data.length-1 || (i+1)%4 === 0){ ;
__p += '\t\t\r\n\t</div>\r\n\t';
 } ;
__p += '\r\n';
 } ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['add-persona-widget'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="add-widget-section">\n\t<button class="add-widget-btn">\n\t\t<span class="add-widget-text">Add Widget</span>\n\t\t<span class="widget-add"><svg><use xlink:href="#add"></use></svg></span>\n\t</button>\n\t<div class="widget-items">\n\t\t<div class="widget-item-name" persona-widget-type="tags">Tags</div>\n\t\t<div class="widget-item-name" persona-widget-type="list-items">List Items</div>\n\t\t<div class="widget-item-name" persona-widget-type="progress-indicators">Progress Indicators</div>\n\t</div></div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['persona-indicator'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="persona-indicator-holder template-section">\n\t';
 var percentage = percentage || 50 ;
__p += '\n\t<div class="template-section--close">\n\t\t<svg><use xlink:href="#close"></use></svg>\n\t</div>\n\t<div class="persona-indicator-name editable">' +
((__t = ( heading )) == null ? '' : __t) +
'<br />' +
((__t = ( caption )) == null ? '' : __t) +
'</div>\n\t<div class="persona-indicator">\n\t\t<div class="persona-indicator-seek-bar" style="width: ' +
((__t = ( percentage )) == null ? '' : __t) +
'%"></div>\n\t</div></div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['persona'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="persona-template">\n\t' +
((__t = ( sb.setTemplate('add-persona-widget') )) == null ? '' : __t) +
'\n\t<div class="persona-template-header">\n\t\t<div class="persona-personal-details-top">\n\t\t\t<span class="persona-name caps editable">full name, </span>\n\t\t\t<span class="persona-age caps editable">age</span>\n\t\t</div>\n\t\t<div class="persona-project-name editable">Project</div>\n\t</div>\n\t<div class="persona-cards-holder">\n\t\t<div class="persona-cards-holder--left">\n\t\t\t<div class="persona-personal-details persona-card template-section persona-card--no-highlight">\n\t\t\t\t<!-- <div class="persona-card--close template-section--close">\n\t\t\t\t\t<svg><use xlink:href="#close"></use></svg>\n\t\t\t\t</div> -->\n\t\t\t\t<div class="persona-image">\n\t\t\t\t\t<label class="persona--img-uploader">\n\t\t\t\t\t\t<svg><use xlink:href="#dropdown"></use></svg>\n\t\t\t\t\t\t<input class="input-hidden persona-img-uploader-input" type="file"></input>\n\t\t\t\t\t</label>\n\t\t\t\t\t<img class="persona-img" src="http://dummyimage.com/310x205" alt="persona image" />\n\t\t\t\t</div>\n\t\t\t\t<div class="persona-personal-details-bottom">\n\t\t\t\t\t<div class="persona-caption editable">Persona Caption</div>\n\t\t\t\t\t<div class="persona-occupation editable">Occupation: Job Title</div>\n\t\t\t\t\t<div class="persona-location editable">Location: City, State</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="persona-description persona-card template-section persona-card--no-highlight">\n\t\t\t\t<!-- <div class="persona-card--close template-section--close">\n\t\t\t\t\t<svg><use xlink:href="#close"></use></svg>\n\t\t\t\t</div> -->\n\t\t\t\t<div class="editable">A short biographical description of the persona that provides a quick insight into the lifestyle, personality and professional traits of the persona that would be helpful while coming up with designs. Make sure these details are related to the primary use case of the product so that all the details are covered within the given context.</div>\n\t\t\t</div>\n\t\t\t' +
((__t = ( sb.setTemplate('widget-persona-tags') )) == null ? '' : __t) +
'\n\t\t</div>\n\t\t<div class="persona-cards-holder--mid">\n\n\t\t\t' +
((__t = ( sb.setTemplate('widget-persona-list-items', {
				heading: "PERSONA DIFFERENTIATORS",
				items: [
					"Student, part-time copywriter with a fair amount of financial independence",
					"Busy youngster, juggling between college, work, friends and personal interests",
					"A true Tennis fan and a player himself",
					"Active on Social Networking sites. Keeps in touch with friends. Got registered from his mobile as well",
					"Loves to try new trends in technology and gadgets"
				]
			}) )) == null ? '' : __t) +
'\n\n\t\t\t' +
((__t = ( sb.setTemplate('widget-persona-list-items', {
				heading: "GOALS",
				items: [
					"Need a computer to get help in academics in planning and scheduling his tasks, prepare assignments etc.",
					"Handle official work from home - OSen prefers to work and submit his work from home.",
					"Stay up-to-date on social and other events",
					"Stay in touch with Family and Friends"
				]
			}) )) == null ? '' : __t) +
'\n\n\t\t\t' +
((__t = ( 
				sb.setTemplate('widget-persona-list-items', {
					heading: "PAIN POINTS",
					items: [
						"Manage college admission applications on the go - As he spends most of his time outside his home during weekends, he expects to take help from a handy computer that he could use from anywhere",
						"Efficient Work Management - A handicap of not having a computer forces him to stay at office to get his work done. A personal computer solves his problems to a great extent",
						"Manage Music files - As a music aficionado, he expects to have a personal computer that he could use to manage his music files.",
						"Work on the move"
					]
				})
			)) == null ? '' : __t) +
'\n\t\t</div>\n\t\t<div class="persona-cards-holder--right">\n\t\t\t' +
((__t = ( sb.setTemplate('widget-progress-indicators', {
				indicators: [{
					heading: 'Communication',
					caption: 'Stay in touch with family and friends',
					percentage: 45
				},{
					heading: 'Work',
					caption: 'Accomplish his tasks',
					percentage: 70
				},{
					heading: 'Entertainment',
					caption: 'Sports, Music etc.'
				}]
			}) )) == null ? '' : __t) +
'\n\t\t</div>\n\t</div>\n\t<div class="current-artefact-info fixed-bar">\n        <div>\n            <a class="popup-click" data-url="create-artefact">Create Artefacts > </a><a class="popup-click" data-url="create-artefact" data-index="1">Persona Templates >  </a>\n            Persona template 1 \n        </div>\n    </div></div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['widget-persona-list-items'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="persona-points-holder persona-card template-section">\n\t<div class="persona-card--close template-section--close">\n\t\t<svg><use xlink:href="#close"></use></svg>\n\t</div>\n\t<div class="persona-card-heading editable">' +
((__t = ( heading )) == null ? '' : __t) +
'</div>\n\t<ul class="persona-points editable">\n\t\t';
 _.each(items, function(item){ ;
__p += '\n\t\t\t<li class="persona-point">' +
((__t = ( item )) == null ? '' : __t) +
'</li>\n\t\t';
 }) ;
__p += '\n\t</ul></div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['widget-persona-tags'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="persona-traits persona-card template-section">\n\t<div class="persona-card--close template-section--close">\n\t\t<svg><use xlink:href="#close"></use></svg>\n\t</div>\n\t<div class="persona-card-heading editable">traits</div>\n\t<div class="persona-trait-item">\n\t\t<span class="persona-trait-item-text editable">Introvert</span>\n\t\t<span class="persona-trait-item-close widget-close">\n\t\t\t<svg class="tilt"><use xlink:href="#add"></use></svg>\n\t\t</span>\n\t</div>\n\t<div class="persona-trait-item">\n\t\t<span class="persona-trait-item-text editable">Conservative</span>\n\t\t<span class="persona-trait-item-close widget-close">\n\t\t\t<svg class="tilt"><use xlink:href="#add"></use></svg>\n\t\t</span>\n\t</div>\n\t<div class="persona-trait-item">\n\t\t<span class="persona-trait-item-text editable">Tag name</span>\n\t\t<span class="persona-trait-item-close persona-trait-item--add widget-close">\n\t\t\t<svg><use xlink:href="#add"></use></svg>\n\t\t</span>\n\t</div></div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['widget-progress-indicators'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="persona-indicators persona-card template-section">\n\t<div class="persona-card--close template-section--close">\n\t\t<svg><use xlink:href="#close"></use></svg>\n\t</div>\n\t<div class="persona-card-heading editable">persona indicators</div>\n\t';
 for(var indicator in indicators){ ;
__p += '\n\t\t' +
((__t = ( sb.setTemplate('persona-indicator', indicators[indicator]) )) == null ? '' : __t) +
'\n\t';
 } ;
__p += '\n\t<div class="persona-indicator--add">\n\t\t<span class="widget-add">\n\t\t\t<svg><use xlink:href="#add"></use></svg>\n\t\t</span>\n\t</div></div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['create-artefact'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popup popup-large">\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\n\t<div class="popup-body">\n\t\t<div class="popup-body-wrapper">\n\t\t\t<div class="templates-viewer">\n\t\t\t\t<div class="template-item nav-btn" data-index="1" template-type="Persona"></div>\n\t\t\t\t<!-- <div class="template-item nav-btn" data-index="2" template-type="Document"></div> -->\n\t\t\t</div>\n\t\t</div>\n\t</div></div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['persona-templates'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="popup popup-large">\n\t';
 console.dir(data) ;
__p += '\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\n\t<div class="popup-body">\n\t\t<div class="popup-body-wrapper">\n\t\t\t';
 if(data.index > 0){ ;
__p += '\n\t\t\t<button class="nav-btn" data-index="0">Back</button>\n\t\t\t';
 } ;
__p += '\n\t\t\t<div class="templates-viewer">\n\t\t\t\t<div class="template-item nav-btn" data-href="#persona/1" template-type="Persona 1"></div>\n\t\t\t\t<!-- <div class="template-item nav-btn" data-href="#persona/2" template-type="Persona 2"></div> -->\n\t\t\t</div>\n\t\t</div>\n\t</div></div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['dashboard'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="fixed-content">\r\n    <div class="review-requests-section">\r\n        <div class="review-requests-heading">\r\n            <div class="review-requests-icon">\r\n                <svg><use xlink:href="#reviewrequest"></use></svg>\r\n            </div>\r\n            <div class="heading-text">Shared Artefacts</div>\r\n        </div>\r\n        <div class="review-requests-content">\r\n            \r\n        </div>\r\n    </div>\r\n    <div class="notifications-section">\r\n        <div class="notifications-heading">\r\n            <div class="notifications-heading-icon">\r\n                <svg><use xlink:href="#notify"></use></svg>\r\n            </div>\r\n            <div class="heading-text">Notifications</div>\r\n        </div>\r\n        <div class="notifications-content">\r\n            \r\n        </div>\r\n    </div>\r\n</div>\r\n<div class="projects-section">\r\n    <div class="projects-heading">\r\n        <div class="projects-heading-icon">\r\n            <svg><use xlink:href="#projects"></use></svg>\r\n        </div>\r\n        <a href="#projects" class="heading-text">Projects</a>\r\n    </div>\r\n    <div class="projects-section-content">\r\n\r\n    </div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['db-notifications'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var newData = sb.getDayWiseData(data) ;
__p += '\r\n';
 if(newData){ ;
__p += '\r\n';
 for(var key in newData){ ;
__p += '\r\n<div class="day-notifications">\r\n\t<div class="day-notifications-label">' +
((__t = ( key )) == null ? '' : __t) +
'</div>\r\n\t<div class="notifications-holder">\r\n\t\t';
 _.each(newData[key], function(n){ ;
__p += '\r\n\t\t<a href="';
 if(n.type == "M"){ ;
__p += '#meetingnotes/' +
((__t = ( n.refId )) == null ? '' : __t);
 } else { ;
__p += '#documentview/' +
((__t = ( n.masked_artefact_version_id )) == null ? '' : __t) +
' ';
 } ;
__p += '" class="notification-item page-click" data-url="meeting-notes">\r\n\t\t\t';
 if(n.type == "M"){ ;
__p += '\r\n\t\t\t\t<div class="notification-meeting-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#calendar"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t';
 } else if(n.type == "C") { ;
__p += '\r\n\t\t\t\t<div class="notification-comment-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#baloon1"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t';
 } else if(n.type == "S"){ ;
__p += '\r\n\t\t\t\t<div class="notification-file-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#file"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t<div class="notification-title" title="' +
((__t = ( n.title )) == null ? '' : __t) +
'">\r\n\t\t\t\t' +
((__t = ( n.title )) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t\t<div class="notification-time">\r\n\t\t\t\t' +
((__t = ( sb.timeFormat(n.time) )) == null ? '' : __t) +
' by ' +
((__t = ( n.notifier )) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t\t';
 if(n.meetingDetails){ ;
__p += '\r\n\t\t\t<div class="meeting-notify-section">\r\n\t\t\t\t<div class="mn-left">\r\n\t\t\t\t\t<div>Meeting @ Conference 2</div>\r\n\t\t\t\t\t<div class="mn-left-title">' +
((__t = ( n.meetingDetails.title )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t<div class="meeting-notify-icon"></div>\r\n\t\t\t\t\t<div class="clock-icon"><svg><use xlink:href="#clock"></use></svg></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="mn-right">\r\n\t\t\t\t\t<div>' +
((__t = ( sb.timeFormat(n.meetingDetails.time) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t<div>' +
((__t = ( sb.getTime(n.meetingDetails.time) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</a>\r\n\t\t';
 }); ;
__p += '\r\n\t</div>\r\n</div>\r\n';
 } ;
__p += '\r\n';
 } else{ ;
__p += '\r\n<div class="no-items">\r\n\tNo notifications yet\r\n</div>\r\n';
 } ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['db-projects-section'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(data.length){ ;
__p += ' \r\n';
 _.each(data, function(p){ ;
__p += '\r\n<div class="project-block">\r\n\t' +
((__t = ( sb.setTemplate('project-section', {data: p}) )) == null ? '' : __t) +
'\r\n</div>\r\n';
 }); ;
__p += '\r\n';
 } else{ ;
__p += '\r\n<div class="no-items">\r\n\tNo projects to show\r\n</div>\r\n';
 } ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['project-section'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<img src="http://lorempixel.com/sports/280/200" />\r\n<div class="project-block-overlay">\r\n\t<div class="project-block-overlay-wrapper">\r\n\t\t<div class="project-block-title">\r\n\t\t\t' +
((__t = ( data.name )) == null ? '' : __t) +
'\r\n\t\t</div>\r\n\t\t<div class="project-block-details">\r\n\t\t\t<div class="project-block-details-icon">\r\n\t\t\t\t<svg><use xlink:href="#calendar"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="project-block-details-text ellipsis">Last Updated ' +
((__t = ( sb.timeFormat(data.last_updated_date) )) == null ? '' : __t) +
'</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class="project-block-hover-content data-holder" data-key="projects" data-id="' +
((__t = ( data.id )) == null ? '' : __t) +
'">\r\n\t<div class="project-black-out"></div>\r\n\t<div class="project-actions-wrapper">\r\n\t\t<div class="project-action popup-click" data-url="add-artefact" data-index="1">\r\n\t\t\t<div class="project-action-icon add-artefact-icon">\r\n\t\t\t\t<svg><use xlink:href="#artifacts"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="project-action-label">Add an Artefact</div>\r\n\t\t</div>\r\n\t\t<div class="project-action popup-click" data-url="add-people">\r\n\t\t\t<div class="project-action-icon add-user-icon">\r\n\t\t\t\t<svg><use xlink:href="#adduser"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="project-action-label">Add User</div>\r\n\t\t</div>\r\n\t\t';
 if(data['is_archive'] == "0"){ ;
__p += '\r\n\t\t<div class="project-action popup-click" data-url="archive-project" data-index="0">\r\n\t\t\t<div class="project-action-icon archive-icon">\r\n\t\t\t\t<svg><use xlink:href="#archive"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="project-action-label">Archive</div>\r\n\t\t</div>\r\n\t\t';
 } else { ;
__p += '\r\n\t\t<div class="project-action popup-click" data-url="unarchive-project" data-index="0">\r\n\t\t\t<div class="project-action-icon archive-icon">\r\n\t\t\t\t<svg><use xlink:href="#archive"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="project-action-label">Unarchive</div>\r\n\t\t</div>\r\n\t\t';
 } ;
__p += '\r\n\t</div>\r\n\t<a href="#projectpage/' +
((__t = ( data.id )) == null ? '' : __t) +
'" class="btn-project-open page-click">Open Project</a>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['comment-item'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var data = arguments[0] ;
__p += '\r\n<div class="cv-comments-item">\r\n\t<div class="cv-main-person">\r\n\t\t<div class="cv-person-left">\r\n\t\t\t<svg class="profile-image-comment"><use xlink:href="#avatar"></use></svg>\r\n\t\t</div>\r\n\t\t<div class="cv-person-right">\r\n\t\t\t<div class="cv-person-right-top">\r\n\t\t\t\t<div class="cv-person-name-holder">\r\n\t\t\t\t\t<span class="cv-person-name">' +
((__t = ( data.user )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t<span class="cv-person-time">' +
((__t = ( sb.timeFormat(data.time) )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t</div>\r\n\t\t\t\t';
 if(data.metaInfo){ ;
__p += '\r\n\t\t\t\t<div class="cv-person-meta">\r\n\t\t\t\t\t<span class="cv-person-category">Typo</span>\r\n\t\t\t\t\t<span class="cv-person-status">Open</span>\r\n\t\t\t\t</div>\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t</div>\r\n\t\t\t<div class="cv-comment-detail">' +
((__t = ( data.description )) == null ? '' : __t) +
'</div>\r\n\t\t\t';
 if(data.metaInfo){ ;
__p += '\r\n\t\t\t<div class="cv-more-replys"><a href="#">+2 More</a></div>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</div>\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['comment'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


	var severities = Kenseo.settings.severities;

	var categories = Kenseo.settings.categories;

	var states = Kenseo.settings.states;
;
__p += '\r\n<div class="shape" data-type="severity" data-k-severity=\'' +
((__t = ( data.severity || "R" )) == null ? '' : __t) +
'\'>\r\n</div>\r\n<div class="drpdwn drpdwn--severity html-click" data-html-target="this > .drpdwn-items" data-html-class="show">\r\n\t<svg><use xlink:href="#severity-drpdwn-icn"></use></svg>\r\n\t<div class="drpdwn-items">\r\n\t\t';
 var severityCounter = 1 ;
__p += '\r\n\t\t';
 for(var key in severities){ ;
__p += '\r\n\t\t<div class="drpdwn-item" ';
 if(data.severity){ ;
__p += ' ';
 if(data.severity == "R"){ ;
__p += 'data-selected="true" ';
 } } else { if(severityCounter == 1) { ;
__p += 'data-selected="true" ';
 } } ;
__p += ' data-value="' +
((__t = ( key )) == null ? '' : __t) +
'">\r\n\t\t\t<div class="drpdwn-item-icon drpdwn-item-icon__' +
((__t = ( key )) == null ? '' : __t) +
'"></div>\r\n\t\t\t<div class="drpdwn-item-text">' +
((__t = ( severities[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t';
 severityCounter++ ;
__p += '\r\n\t\t</div>\r\n\t\t';
 } ;
__p += '\r\n\t</div>\r\n</div>\r\n<div class="comment-section">\r\n\t<div class="comment-section-header">\r\n\t\t<div class="drpdwn drpdwn--category html-click" data-type="category" data-k-category="' +
((__t = ( data.category )) == null ? '' : __t) +
'" data-html-class="show" data-html-target="this > .drpdwn-items">\r\n\t\t\t<div class="drpdwn-hdg-txt">Category:&nbsp;\r\n\t\t\t</div>\r\n\t\t\t<div class="drpdwn-selected-text">\r\n\t\t\t\t' +
((__t = ( categories[data.category] || categories["I"] )) == null ? '' : __t) +
'\r\n\t\t\t\t<svg class="drpdwn-selected-text-icn"><use xlink:href="#dropdown-icn"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="drpdwn-items">\r\n\t\t\t\t';
 for(var key in categories){ ;
__p += '\r\n\t\t\t\t<div class="drpdwn-item" data-value="' +
((__t = ( key )) == null ? '' : __t) +
'">' +
((__t = ( categories[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="drpdwn drpdwn--status html-click" data-type="state" data-k-state="' +
((__t = ( data.state )) == null ? '' : __t) +
'" data-html-class="show" data-html-target="this > .drpdwn-items">\r\n\t\t\t<div class="drpdwn-hdg-txt">Status:&nbsp;</div>\r\n\t\t\t<div class="drpdwn-selected-text">\r\n\t\t\t\t' +
((__t = ( states[data.state] || states["O"] )) == null ? '' : __t) +
'\r\n\t\t\t\t<svg class="drpdwn-selected-text-icn"><use xlink:href="#dropdown-icn"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="drpdwn-items">\r\n\t\t\t\t';
 for(var key in states){ ;
__p += '\r\n\t\t\t\t<div data-value="' +
((__t = ( key )) == null ? '' : __t) +
'" class="drpdwn-item">' +
((__t = ( states[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="comment-section-body">\r\n\t\t<div class="comment-sec-wrapper">\r\n\t\t\t';
 for(var key in data.comments){ ;
__p += '\r\n\t\t\t' +
((__t = ( sb.setTemplate('comment-item', data.comments[key]) )) == null ? '' : __t) +
'\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</div>\r\n\t\t<div class="write-comment-section">\r\n\t\t\t<textarea class="write-comment" placeholder="Type your comment here"></textarea>\r\n\t\t</div>\r\n\t\t<div class="buttons-section">\r\n\t\t\t<div class="buttons-left-section">\r\n\t\t\t\t';
  
					var privateObj = {
						'text': "Private message",
						"attr": {
							"data-k-is_private": data.is_private || 0,
							"class": "private-chk"
						}
					}
				;
__p += '\r\n\t\t\t\t';

					if(data['is_private'] == "1"){
						privateObj.attr.checked = true;
					}
				;
__p += '\r\n\t\t\t\t' +
((__t = ( sb.toolbox.checkbox(privateObj) )) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t\t<div class="buttons-right-section">\r\n\t\t\t\t';
 var postObj = {
					"data": {
						"buttons": [{
							"label": "Cancel",
							"cls": "lnk-btn cancel-btn"
						},
						{
							"label": "Done",
							"cls": "main-btn"
						}]
					}
				}
				;
__p += '\r\n\t\t\t\t';

					if(!data.newComment){
						postObj.data.buttons[1].disabled = "true";
					}
				;
__p += '\r\n\t\t\t\t' +
((__t = ( sb.toolbox.buttons(postObj) )) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['comments-viewer'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="comments-view-holder">\r\n\t<div class="comments-viewer-header">\r\n\t\tComments Summary\r\n\t\t<div class="filter-icon"></div>\r\n\t</div>\r\n\t<div class="comments-view-section">\r\n\t\t<form class="comments-view-filter-section">\r\n\t\t\t<div class="filter-checkboxes">\r\n\t\t\t\t<div class="filter-checkboxes-heading">Severities</div>\r\n\t\t\t\t<div class="filter-checkboxes-content">\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "All Severities",
							attr: {
								'name': 'severities',
								'data-all': true
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "Red",
							attr: {
								'name': 'severities[0]'
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "Green",
							attr: {
								'name': 'severities[1]'
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="filter-checkboxes">\r\n\t\t\t\t<div class="filter-checkboxes-heading">Categories</div>\r\n\t\t\t\t<div class="filter-checkboxes-content">\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "All Categories",
							attr: {
								'name': 'categories',
								'data-all': true
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "Typo",
							attr: {
								'name': 'categories[0]'
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "IXD",
							attr: {
								'name': 'categories[1]'
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "UID",
							attr: {
								'name': 'categories[2]'
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "IA",
							attr: {
								'name': 'categories[3]'
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "Persona",
							attr: {
								'name': 'categories[4]'
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="filter-checkboxes">\r\n\t\t\t\t<div class="filter-checkboxes-heading">Status</div>\r\n\t\t\t\t<div class="filter-checkboxes-content">\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "All Statuses",
							attr: {
								'name': 'status',
								'data-all': true
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "Addressed",
							attr: {
								'name': 'status[0]'
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "Open",
							attr: {
								'name': 'status[1]'
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "Reopened",
							attr: {
								'name': 'status[2]'
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t\t' +
((__t = ( 
						sb.toolbox.checkbox({
							text: "Closed",
							attr: {
								'name': 'status[3]'
							}
						}) 
					)) == null ? '' : __t) +
'\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="buttons-section">\r\n\t\t\t\t' +
((__t = ( sb.toolbox.button({
					data: { 
						cls: "main-btn", 
						"label": "Apply Filters"
					}
				}) )) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t\t<div class="cv-comments-section">\r\n\t\t\t\r\n\t\t\t' +
((__t = ( sb.setTemplate('comment-item') )) == null ? '' : __t) +
'\r\n\r\n\t\t\t' +
((__t = ( sb.setTemplate('comment-item') )) == null ? '' : __t) +
'\r\n\r\n\t\t\t' +
((__t = ( sb.setTemplate('comment-item') )) == null ? '' : __t) +
'\r\n\t\t</div>\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['dv-peoplesection'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="dv-tb-people-wrapper">\r\n\t';
 if(data && data.sharedTo.length > 3){ ;
__p += '\r\n\t\t<div class="left-slider">\r\n\t\t\t<svg><use xlink:href="#left-slider"></use></svg>\r\n\t\t</div>\r\n\t';
 } ;
__p += '\r\n\t<div class="dv-tb-people">\r\n\t\t';
 _.each(data.sharedTo, function(p){ ;
__p += '\r\n\t\t';
 if(data.profilePic !== "assets/imgs/avatar.svg"){ ;
__p += '\r\n\t\t\t<img class="profile-image-black" src="' +
((__t = ( p.profilePic )) == null ? '' : __t) +
'"/>\r\n\t\t';
 } else { ;
__p += '\r\n\t\t\t<svg class="profile-image-black"><use xlink:href="#avatar"></use></svg>\r\n\t\t';
 } ;
__p += '\r\n\t\t';
 }); ;
__p += '\r\n\t</div>\r\n\t';
 if(data && data.sharedTo.length > 3){ ;
__p += '\r\n\t\t<div class="right-slider">\r\n\t\t\t<svg><use xlink:href="#right-slider"></use></svg>\r\n\t\t</div>\r\n\t';
 } ;
__p += '\r\n</div>\r\n';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['image-viewer'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="outerContainer inView" rel="pdf_' +
((__t = ( data['artefact_ver_id'] )) == null ? '' : __t) +
'">' +
((__t = ( sb.setTemplate('pdf-toolbar', {data: data}) )) == null ? '' : __t) +
'</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['pdf-toolbar'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- sidebarContainer -->\n    <div id="mainContainer">\n        <div class="findbar hidden doorHanger hiddenSmallView" id="findbar">\n            <label for="findInput" class="toolbarLabel" data-l10n-id="find_label">Find:</label>\n            <input id="findInput" class="toolbarField" tabindex="91">\n            <div class="splitToolbarButton">\n                <button class="toolbarButton findPrevious" title="" id="findPrevious" tabindex="92" data-l10n-id="find_previous">\n                <span data-l10n-id="find_previous_label">Previous</span>\n                </button>\n                <button class="toolbarButton findNext" title="" id="findNext" tabindex="93" data-l10n-id="find_next">\n                <span data-l10n-id="find_next_label">Next</span>\n                </button>\n            </div>\n            <input type="checkbox" id="findHighlightAll" class="toolbarField">\n            <label for="findHighlightAll" class="toolbarLabel" tabindex="94" data-l10n-id="find_highlight">Highlight all</label>\n            <input type="checkbox" id="findMatchCase" class="toolbarField">\n            <label for="findMatchCase" class="toolbarLabel" tabindex="95" data-l10n-id="find_match_case_label">Match case</label>\n            <span id="findMsg" class="toolbarLabel"></span>\n        </div>\n        <!-- findbar -->\n        <div id="secondaryToolbar" class="secondaryToolbar hidden doorHangerRight">\n            <div id="secondaryToolbarButtonContainer">\n                <button id="secondaryPresentationMode" class="secondaryToolbarButton presentationMode visibleLargeView" title="Switch to Presentation Mode" tabindex="51" data-l10n-id="presentation_mode">\n                <span data-l10n-id="presentation_mode_label">Presentation Mode</span>\n                </button>\n                <button id="secondaryOpenFile" class="secondaryToolbarButton openFile visibleLargeView" title="Open File" tabindex="52" data-l10n-id="open_file">\n                <span data-l10n-id="open_file_label">Open</span>\n                </button>\n                <button id="secondaryPrint" class="secondaryToolbarButton print visibleMediumView" title="Print" tabindex="53" data-l10n-id="print">\n                <span data-l10n-id="print_label">Print</span>\n                </button>\n                <button id="secondaryDownload" class="secondaryToolbarButton download visibleMediumView" title="Download" tabindex="54" data-l10n-id="download">\n                <span data-l10n-id="download_label">Download</span>\n                </button>\n                <a href="#" id="secondaryViewBookmark" class="secondaryToolbarButton bookmark visibleSmallView" title="Current view (copy or open in new window)" tabindex="55" data-l10n-id="bookmark">\n                <span data-l10n-id="bookmark_label">Current View</span>\n                </a>\n                <div class="horizontalToolbarSeparator visibleLargeView"></div>\n                <button id="firstPage" class="secondaryToolbarButton firstPage" title="Go to First Page" tabindex="56" data-l10n-id="first_page">\n                <span data-l10n-id="first_page_label">Go to First Page</span>\n                </button>\n                <button id="lastPage" class="secondaryToolbarButton lastPage" title="Go to Last Page" tabindex="57" data-l10n-id="last_page">\n                <span data-l10n-id="last_page_label">Go to Last Page</span>\n                </button>\n                <div class="horizontalToolbarSeparator"></div>\n                <button id="pageRotateCw" class="secondaryToolbarButton rotateCw" title="Rotate Clockwise" tabindex="58" data-l10n-id="page_rotate_cw">\n                <span data-l10n-id="page_rotate_cw_label">Rotate Clockwise</span>\n                </button>\n                <button id="pageRotateCcw" class="secondaryToolbarButton rotateCcw" title="Rotate Counterclockwise" tabindex="59" data-l10n-id="page_rotate_ccw">\n                <span data-l10n-id="page_rotate_ccw_label">Rotate Counterclockwise</span>\n                </button>\n                <div class="horizontalToolbarSeparator"></div>\n                <button id="toggleHandTool" class="secondaryToolbarButton handTool" title="Enable hand tool" tabindex="60" data-l10n-id="hand_tool_enable">\n                <span data-l10n-id="hand_tool_enable_label">Enable hand tool</span>\n                </button>\n                <div class="horizontalToolbarSeparator"></div>\n                <button id="documentProperties" class="secondaryToolbarButton documentProperties" title="Document Properties…" tabindex="61" data-l10n-id="document_properties">\n                <span data-l10n-id="document_properties_label">Document Properties…</span>\n                </button>\n            </div>\n        </div>\n        <!-- secondaryToolbar -->\n        <div class="toolbar">\n            <div id="toolbarContainer">\n                <div id="toolbarViewer">\n                    <div id="toolbarViewerLeft">\n                        <button id="viewFind" class="toolbarButton group hiddenSmallView" title="Find in Document" tabindex="12" data-l10n-id="findbar">\n                        <span data-l10n-id="findbar_label">Find</span>\n                        </button>\n                    </div>\n                    ';
 if(data.isPdf) { ;
__p += '\n                    <div id="toolbarViewerRight">\n                        <button id="zoomOut" class="toolbarButton zoomOut" title="Zoom Out" tabindex="21" data-l10n-id="zoom_out">\n                            <svg><use xlink:href="#zoom-out"></use></svg>\n                            <span data-l10n-id="zoom_out_label">Zoom Out</span>\n                        </button>\n                        <div class="slider">\n                            <div class="thumb"></div>\n                        </div>\n                        <button id="zoomIn" class="toolbarButton zoomIn" title="Zoom In" tabindex="22" data-l10n-id="zoom_in">\n                            <svg><use xlink:href="#zoom-in"></use></svg>\n                            <span data-l10n-id="zoom_in_label">Zoom In</span>\n                        </button>\n                        <button class="toolbarButton pageUp" title="Previous Page" id="previous" tabindex="13" data-l10n-id="previous">\n                            <svg><use xlink:href="#previous-page-icon"></use></svg>\n                            <span data-l10n-id="previous_label">Previous</span>\n                        </button>\n                        <input type="text" id="pageNumber" class="toolbarField pageNumber" value="1" size="4" min="1" tabindex="15">\n                        <span id="numPages" class="toolbarLabel"></span>\n                        <button class="toolbarButton pageDown" title="Next Page" id="next" tabindex="14" data-l10n-id="next">\n                            <svg><use xlink:href="#next-page-icon"></use></svg>\n                            <span data-l10n-id="next_label">Next</span>\n                        </button>\n                    </div>\n                    <button id="presentationMode" class="toolbarButton presentationMode hiddenLargeView" title="Switch to Presentation Mode" tabindex="31" data-l10n-id="presentation_mode">\n                    <span data-l10n-id="presentation_mode_label">Presentation Mode</span>\n                    </button>\n                    ';
 } ;
__p += '\n                </div>\n            </div>\n            <div id="loadingBar">\n                <div class="progress">\n                    <div class="glimmer">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ' +
((__t = ( sb.setTemplate('comments-viewer') )) == null ? '' : __t) +
'\n    <div id="viewerContainer" class="parent viewerContainer" tabindex="0">\n        <div class="annotate-wrapper">\n            ';
 if(data.isPdf) { ;
__p += '\n            <div id="viewer" class="pdfViewer"></div>\n            ';
 } else { ;
__p += ' \n            <img class="image-viewer" src="' +
((__t = ( sb.getRelativePath(data.documentPath) )) == null ? '' : __t) +
'"/>\n            ';
 } ;
__p += '\n        </div>\n        <div class="current-artefact-info bar">\n            <div>\n                <a href="#projects">Projects > </a><a href="#projectpage/' +
((__t = ( data.projId )) == null ? '' : __t) +
'">' +
((__t = ( data.projName  )) == null ? '' : __t) +
' >  </a>' +
((__t = ( data.artTitle  )) == null ? '' : __t) +
' </div>\n            <div class="html-click show-all-versions">\n                <div>\n                    <span>v' +
((__t = ( data.versionNo  )) == null ? '' : __t) +
'.0</span>\n                    <div class="info-bar-dropdown-version-no-icon">\n                        <svg><use xlink:href="#up-drpdwn"></use></svg>\n                    </div>\n                </div>\n                <div class="sub-menu-holder left-nav top-nav">\n                    ';
 _.each(data.versions, function(p){ ;
__p += '\n                    <div class="sub-menu-item">\n                        <span>v' +
((__t = ( p.versionNo )) == null ? '' : __t) +
'.0</span>\n                        <div class="actions">\n                            <a href="#compare/' +
((__t = ( p.masked_artefact_version_id)) == null ? '' : __t) +
'" class="v-compare-icon page-click">\n                                <svg><use xlink:href="#v_compare"></use></svg>\n                            </a>\n                            <a href="#documentview/' +
((__t = ( p.masked_artefact_version_id)) == null ? '' : __t) +
'" class="v-open-icon page-click">\n                                <svg><use xlink:href="#v_open"></use></svg>\n                            </a>\n                        </div>\n                    </div>\n                    ';
 }); ;
__p += '    \n                </div>\n            </div>\n        </div>\n    </div>\n    <div id="errorWrapper" hidden=\'true\'>\n        <div id="errorMessageLeft">\n            <span id="errorMessage"></span>\n            <button id="errorShowMore" data-l10n-id="error_more_info">\n            More Information\n            </button>\n            <button id="errorShowLess" data-l10n-id="error_less_info" hidden=\'true\'>\n            Less Information\n            </button>\n        </div>\n        <div id="errorMessageRight">\n            <button id="errorClose" data-l10n-id="error_close">\n            Close\n            </button>\n        </div>\n        <div class="clearBoth"></div>\n        <textarea id="errorMoreInfo" hidden=\'true\' readonly="readonly"></textarea>\n    </div>\n    <div class="dv-toolbox">\n        <div class="dvt-item document-info-icon overlay-click" data-url="summary" title="Document summary">\n            <svg><use xlink:href="#document-info"></use></svg>\n        </div>\n        <div class="dvt-item html-click add-comment-icon ';
 if(!data.isPdf){ ;
__p += ' hide ';
 } ;
__p += '" data-value="rectangle" title="Add comment" data-html-outside-click="false">\n            <svg><use xlink:href="#add-comment"></use></svg>\n        </div>\n        <div class="dvt-item html-click toggle-annotations-icon ';
 if(!data.isPdf){ ;
__p += ' hide ';
 } ;
__p += '" title="Toggle Comment view" data-html-outside-click="false">\n            <svg><use xlink:href="#toggle-annotations"></use></svg>\n        </div>\n        <div class="dvt-item hide comment-summary-icon';
 if(!data.isPdf){ ;
__p += ' hide ';
 } ;
__p += '" title="Comment summary">\n            <svg><use xlink:href="#comment-summary"></use></svg>\n        </div>\n        <div class="dvt-item share-artefact-icon popup-click" data-url="share-artefact" data-index="3" title="Share this artefact">\n            <svg><use xlink:href="#share-artefact"></use></svg>\n        </div>\n        <div class="dvt-item submit-review-icon';
 if(!data.isPdf){ ;
__p += ' hide ';
 } ;
__p += '" title="Submit this document for review">\n            <svg><use xlink:href="#submit-review"></use></svg>\n        </div>\n        <div class="dvt-item more-menu-icon" title="more options">\n            <svg><use xlink:href="#more-menu"></use></svg>\n        </div>\n    </div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['pdf-viewer'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="outerContainer inView" rel=\'pdf_' +
((__t = ( data.versionId  )) == null ? '' : __t) +
'\' >\r\n    <div id="sidebarContainer">\r\n        <div id="toolbarSidebar">\r\n            <div class="splitToolbarButton toggled">\r\n                <button id="viewThumbnail" class="toolbarButton group toggled" title="Show Thumbnails" tabindex="2" data-l10n-id="thumbs">\r\n                <span data-l10n-id="thumbs_label">Thumbnails</span>\r\n                </button>\r\n                <button id="viewOutline" class="toolbarButton group" title="Show Document Outline" tabindex="3" data-l10n-id="outline">\r\n                <span data-l10n-id="outline_label">Document Outline</span>\r\n                </button>\r\n                <button id="viewAttachments" class="toolbarButton group" title="Show Attachments" tabindex="4" data-l10n-id="attachments">\r\n                <span data-l10n-id="attachments_label">Attachments</span>\r\n                </button>\r\n            </div>\r\n        </div>\r\n        <div id="sidebarContent">\r\n            <div id="thumbnailView">\r\n            </div>\r\n            <div id="outlineView" class="hidden">\r\n            </div>\r\n            <div id="attachmentsView" class="hidden">\r\n            </div>\r\n        </div>\r\n    </div>\r\n    ';
 data.isPdf = true ;
__p += '\r\n    ' +
((__t = ( sb.setTemplate('pdf-toolbar', {data: data}) )) == null ? '' : __t) +
'\r\n</div>\r\n<!-- mainContainer -->\r\n<div id="overlayContainer" class="hidden">\r\n    <div id="passwordOverlay" class="container hidden">\r\n        <div class="dialog">\r\n            <div class="row">\r\n                <p id="passwordText" data-l10n-id="password_label">Enter the password to open this PDF file:</p>\r\n            </div>\r\n            <div class="row">\r\n                <input type="password" id="password" class="toolbarField" />\r\n            </div>\r\n            <div class="buttonRow">\r\n                <button id="passwordCancel" class="overlayButton"><span data-l10n-id="password_cancel">Cancel</span></button>\r\n                <button id="passwordSubmit" class="overlayButton"><span data-l10n-id="password_ok">OK</span></button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- overlayContainer -->\r\n</div> <!-- outerContainer -->';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['tab-file'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#documentview/' +
((__t = ( maskedVersionId )) == null ? '' : __t) +
'" class="tab-item selectedTab" targetRel="' +
((__t = ( versionId )) == null ? '' : __t) +
'"><div class= "fileTab"><svg><use xlink:href="#file-tab"></use></svg></div></a>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['tab-img'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="#documentview/' +
((__t = ( maskedVersionId )) == null ? '' : __t) +
'" class="tab-item selectedTab" targetRel="' +
((__t = ( versionId )) == null ? '' : __t) +
'"><div class= "imageTab"><svg><use xlink:href="#img-tab"></use></svg></div></a>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['artefact'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var dataComparer = -1; ;
__p += '\r\n';
 var isSupportedFile = data.MIME_type.indexOf('pdf') > -1 || data.MIME_type.indexOf('image') > -1 ;
__p += '\r\n<a ';
 if(isSupportedFile){ ;
__p += 'href="#documentview/' +
((__t = ( data.masked_artefact_version_id )) == null ? '' : __t) +
'"';
 } else{ ;
__p += ' style="cursor:default;" ';
 } ;
__p += ' class="review-request-item data-holder" data-pass="';
 (function () {
            if (dataComparer == data.linkedId) {
                dataComparer = data.linkedId;
                return 1;
            } else {
                dataComparer = data.linkedId;
                return 0;
            }
        })() ;
__p += '" data-id="' +
((__t = ( data.id )) == null ? '' : __t) +
'" data-k-project_id="' +
((__t = ( data.project_id )) == null ? '' : __t) +
'" data-key="artefacts">\r\n\t<div class="rr-left">\r\n\t\t<div class="rr-status status-' +
((__t = ( data.status )) == null ? '' : __t) +
'">';
 if(data['document_type']){  ;
__p +=
((__t = ( Kenseo.settings.docTypeShort[data['document_type']] )) == null ? '' : __t);
 } ;
__p += '</div>\r\n\t\t<img class="rr-owner-image" src="' +
((__t = ( data.image )) == null ? '' : __t) +
'"/>\r\n\t</div>\r\n\t<div class="rr-right">\r\n\t\t<div class="rr-title ellipsis" title="' +
((__t = ( data.title )) == null ? '' : __t);
 if(!isSupportedFile){ ;
__p += ' - Unsupported format';
 } ;
__p += '">' +
((__t = ( data['project_name'] )) == null ? '' : __t) +
': ' +
((__t = ( data.title )) == null ? '' : __t) +
'</div>\r\n\t\t<div class="rr-details ellipsis" title="' +
((__t = ( sb.timeFormat(data['artefact_time']) )) == null ? '' : __t) +
' by ' +
((__t = ( data['person_name'] )) == null ? '' : __t) +
'">' +
((__t = ( sb.timeFormat(data['artefact_time']) )) == null ? '' : __t) +
' by ' +
((__t = ( data['person_name'] )) == null ? '' : __t) +
'</div>\r\n\t\t<div class="rr-state-details">\r\n\t\t\t<div class="rr-state">\r\n\t\t\t\t<span class="artefact-cur-version">v' +
((__t = ( data.version )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t<div class="rr-other-versions"></div>\r\n\t\t\t\t<div class="rr-comment">\r\n\t\t\t\t\t<svg><use xlink:href="#baloon"></use></svg>\r\n\t\t\t\t\t<div class="rr-comment-count">' +
((__t = ( data.comment_count )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="requests-dropdown html-click prevent-default" data-html-class="active">\r\n\t\t<div class="requests-dropdown-icon">\r\n\t\t\t<svg><use xlink:href="#dropdown"></use></svg>\r\n\t\t</div>\r\n\t\t<div class="requests-dropdown-items sub-menu-holder small">\r\n\t\t\t<div class="popup-click sub-menu-item" data-url="archive-artefact">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#archive1"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Archive</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="popup-click sub-menu-item" data-url="replace-artefact">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#replace"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Replace</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="popup-click sub-menu-item" data-url="add-version">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#addversion"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Add Version</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="popup-click sub-menu-item" data-url="share-artefact" data-index="3">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#share"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Share</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="popup-click sub-menu-item" data-url="delete-artefact">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg fill="#DBDCE0"><use xlink:href="#delete"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Delete </div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</a>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['new-file'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="notification-item S-type">\r\n\t<svg class="notification-s-type-icon"><use xlink:href="#file"></use></svg>\r\n\t<div class="close-icon">\r\n\t\t<svg><use xlink:href="#close"></use></svg>\r\n\t</div>\r\n\t<div class="notification-title ellipsis" title="' +
((__t = ( data.name )) == null ? '' : __t) +
'">\r\n\t\t' +
((__t = ( data.name )) == null ? '' : __t) +
'\r\n\t</div>\r\n\t<div class="notification-time">\r\n\t\t' +
((__t = ( data.date )) == null ? '' : __t) +
' by ' +
((__t = ( data.username )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['notification'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="day-notifications">\r\n\t<div class="day-notifications-label">' +
((__t = ( key )) == null ? '' : __t) +
'</div>\r\n\t<div class="notifications-holder">\r\n\t\t';
 _.each(newData[key], function(n){ ;
__p += '\r\n\t\t<div class="notification-item ' +
((__t = ( n.type )) == null ? '' : __t) +
'-type">\r\n\t\t\t';
 if(n.type == "S"){ ;
__p += '\r\n\t\t\t\t<svg class="notification-s-type-icon"><use xlink:href="#file"></use></svg>\r\n\t\t\t';
 } else if(n.type == "M"){ ;
__p += '\r\n\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t<div class="notification-title ellipsis" title="' +
((__t = ( n.title )) == null ? '' : __t) +
'">\r\n\t\t\t\t' +
((__t = ( n.title )) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t\t<div class="notification-time">\r\n\t\t\t\t' +
((__t = ( sb.timeFormat(n.time) )) == null ? '' : __t) +
' by ' +
((__t = ( n.notifier )) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t\t';
 if(n.meetingDetails){ ;
__p += '\r\n\t\t\t<div class="meeting-notify-section">\r\n\t\t\t\t<div class="mn-left">\r\n\t\t\t\t\t<div>Meeting @ Conference 2</div>\r\n\t\t\t\t\t<div class="mn-left-title">' +
((__t = ( n.meetingDetails.title )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t<div class="meeting-notify-icon"></div>\r\n\t\t\t\t\t<div class="clock-icon"><svg><use xlink:href="#clock"></use></svg></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="mn-right">\r\n\t\t\t\t\t<div>' +
((__t = ( sb.timeFormat(n.meetingDetails.time) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t<div>' +
((__t = ( sb.getTime(n.meetingDetails.time) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</div>\r\n\t\t';
 }); ;
__p += '\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['person'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="people-item-left">\r\n\t';
 if(data.picture !== "assets/imgs/avatar.svg"){ ;
__p += '\r\n\t\t<img class="people-icon" src="' +
((__t = ( data.picture )) == null ? '' : __t) +
'" />\r\n\t';
 } else { ;
__p += '\r\n\t\t<svg class="people-icon"><use xlink:href="#avatar"></use></svg>\r\n\t';
 } ;
__p += '\r\n</div>\r\n<div class="people-item-right">\r\n\t<div class="people-name-section data-holder" data-k-project_id="1" data-key="people" data-id="' +
((__t = ( data.id )) == null ? '' : __t) +
'">\r\n\t\t<div class="people-name inlineBlockTop">' +
((__t = ( data.name )) == null ? '' : __t) +
'</div>\r\n\t\t<div class="people-request-holder html-click sub-menu-nav inlineBlockTop">\r\n\t\t\t<div class="requests-dropdown-icon">\r\n\t\t\t\t<svg><use xlink:href="#dropdown"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="sub-menu-holder left-nav bottom-nav">\r\n\t\t\t\t';
 if(data['is_owner'] != "1") {;
__p += '\r\n\t\t\t\t<div class="sub-menu-item popup-click" data-url="removePeople" data-id="' +
((__t = ( data.id )) == null ? '' : __t) +
'" >\r\n\t\t\t\t\t<div class="people-remove-icon">\r\n\t\t\t\t\t\t<svg><use xlink:href="#delete"></use></svg>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="sub-menu-item-text">Remove</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t';
};
__p += '\r\n\t\t\t\t<div class="sub-menu-item">\r\n\t\t\t\t\t<div class="people-manage-icon">\r\n\t\t\t\t\t\t<svg><use xlink:href="#lock1"></use></svg>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="sub-menu-item-text">Manage Permissions</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="people-access-text">';
 if(data['access_type']=="X"){;
__p += '\r\n\tCan Edit & Share ';
} else if(data['access_type']=='S'){;
__p += '\r\n\tCan Share ';
} else {;
__p += ' Can Edit';
};
__p += '</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['popup-meta-content'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var dump = data.dump ;
__p += '\n';
 var metaInfo = sb.getPopupMetaInfo(dump) ;
__p += '\n';
 if(data.project){ ;
__p += '\n\t<div class="meta-item">\t\n\t\t<div class="meta-heading">Under</div>\n\t\t<div class="meta-text popup-meta-project-name-txt title-txt" title="' +
((__t = ( metaInfo.getProjectName() )) == null ? '' : __t) +
'"></div>\n\t</div>\n';
 } ;
__p += '\n';
 if(data.file){ ;
__p += '\n\t<div class="meta-item">\t\n\t\t<div class="meta-heading">File</div>\t\n\t\t<div class="meta-text popup-meta-file-name title-txt" title="' +
((__t = ( metaInfo.getFileName() )) == null ? '' : __t) +
'">\n\t\t</div>\n\t</div>\n';
 } ;
__p += '\n';
 if(data.type){ ;
__p += '\n\t<div class="meta-item">\t\n\t\t<div class="meta-heading">Type</div>\t\n\t\t';
 if(dump.doctype){ ;
__p += '\t\t\t\n\t\t<div class="meta-text popup-meta-type title-txt" title="' +
((__t = ( metaInfo.getType() )) == null ? '' : __t) +
'"></div>\t\n\t\t';
 } ;
__p += '\n\t</div>\n';
 } ;
__p += '\n';
 if(data.references){ ;
__p += '\n\t<div class="meta-item">\t\n\t\t<div class="meta-heading">References</div>\t\n\t\t';
 if(dump.references){ ;
__p += '\t\t\n\t\t<div class="meta-text title-txt popup-meta-references" title="' +
((__t = ( metaInfo.getReferences() )) == null ? '' : __t) +
'"></div>\t\n\t\t';
 } ;
__p += '\n\t</div>\n';
 } ;
__p += '\n';
 if(data.tags){ ;
__p += '\n\t<div class="meta-item">\t\n\t\t<div class="meta-heading">Tags</div>\t\n\t\t';
 if(dump.tags){ ;
__p += '\t\t\t\n\t\t<div class="meta-text popup-meta-tags title-txt" title="' +
((__t = ( metaInfo.getTags() )) == null ? '' : __t) +
'"></div>\n\t\t';
 } ;
__p += '\t\n\t</div>\n';
 } ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['reference-items'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 _.each(data, function(d){ ;
__p += '\r\n<div class="suggestion-item ';
 if(d.className) { ;
__p +=
((__t = ( d.className )) == null ? '' : __t) +
' ';
 } ;
__p += '" name="' +
((__t = ( d.id )) == null ? '' : __t) +
'" ';
if(d.email) { ;
__p += 'email= "' +
((__t = ( d.email )) == null ? '' : __t) +
'" ';
 } ;
__p += ' >\r\n\t' +
((__t = ( d.name )) == null ? '' : __t) +
'\r\n</div>\r\n';
 }); ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['share-people'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


var accessType = sb.getAccessType(data['access_type'])
;
__p += '\r\n<div class="share-artefact-people-item" data-k-user_id="' +
((__t = ( data.id )) == null ? '' : __t) +
'" data-access_type="' +
((__t = ( data['access_type'] )) == null ? '' : __t) +
'">\r\n\t<div class="share-artefacts-img-holder">\r\n\t\t<img class="share-artefacts-img" src=' +
((__t = ( data.picture)) == null ? '' : __t) +
' />\r\n\t</div>\r\n\t<span class="share-artefacts-text" title="' +
((__t = ( data.name )) == null ? '' : __t) +
'">' +
((__t = ( data.name )) == null ? '' : __t) +
'</span>\r\n\t';
 if(data['is_owner'] != "1"){ ;
__p += '\r\n\t\t<div class="share-artefact-people-item-section">\r\n\t\t\t<div class="share-artefact-right-panel">\r\n\t\t\t\t<div class="sarp-text">Can Add comments</div>\r\n\t\t\t\t' +
((__t = ( 
					sb.toolbox.checkbox({
						class: "add-comments-chk",
						toggle: true,
						dataName: "sharedTo",
						checked: !!+accessType[0],
						"data-array": "1"
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t\t<div class="share-artefact-right-panel">\r\n\t\t\t\t<div class="sarp-text">Share with others</div>\r\n\t\t\t\t' +
((__t = ( 
					sb.toolbox.checkbox({
						class: "others-chk",
						toggle: true,
						dataName: "sharedTo",
						checked: !!+accessType[1],
						"data-array": "1"
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t\t<div class="sarp-checkbox-holder">\r\n\t\t\t\t' +
((__t = ( 
					sb.toolbox.checkbox({
						class: "apply-to-all",
						text: "Apply to all users in this group",
						ignore: 1
					}) 
				)) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t';
 } ;
__p += '\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['header'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(data.picture !== "assets/imgs/avatar.svg"){ ;
__p += '\r\n\t<img width="50" height="50" src="' +
((__t = ( data.picture )) == null ? '' : __t) +
'"/>\r\n';
 } else { ;
__p += '\r\n\t<svg width="50" height="50"><use xlink:href="#avatar"></use></svg>\r\n';
 } ;
__p += '\r\n<div class="sub-menu-holder right-nav bottom-nav">\r\n    <div class="sub-menu-item">Profile</div>\r\n    <div class="sub-menu-item">Settings</div>\r\n    <div class="separator"></div>\r\n    <div class="sub-menu-item">Log Out</div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['search-results'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 _.each(data.projects, function(p){ ;
__p += '\r\n<div class="search-row">\r\n    <div class="search-row-img search-img-type-folder">\r\n    \t<svg><use xlink:href="#search-folder"></use></svg>\r\n    </div>\r\n    <div  class="search-row-txt">' +
((__t = ( p.matchedString )) == null ? '' : __t) +
'</div> \r\n</div>\r\n';
 }); ;
__p += '\r\n';
 _.each(data.artefacts, function(a){ ;
__p += '\r\n<div class="search-row">\r\n    <div class="search-row-img search-img-type-file">\r\n    \t<svg><use xlink:href="#search-file"></use></svg>\r\n    </div>\r\n    <div  class="search-row-txt">' +
((__t = ( a.matchedString )) == null ? '' : __t) +
'</div> \r\n</div>\r\n';
 }); ;
__p += '\r\n';
 _.each(data.images, function(i){ ;
__p += '\r\n<div class="search-row">\r\n    <div class="search-row-img search-img-type-pic">\r\n    \t<svg><use xlink:href="#search-pic"></use></svg>\r\n    </div>\r\n    <div  class="search-row-txt">' +
((__t = ( i.matchedString )) == null ? '' : __t) +
'</div> \r\n</div>\r\n';
 }); ;
__p += '\r\n';
 _.each(data.users, function(u){ ;
__p += '\r\n<div class="search-row">\r\n    <div class="search-row-img search-img-type-folder">\r\n    \t<svg><use xlink:href="#search-folder"></use></svg>\r\n    </div>\r\n    <div  class="search-row-txt">' +
((__t = ( u.matchedString )) == null ? '' : __t) +
'</div> \r\n</div>\r\n';
 }); ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['search'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="search-section">\r\n    <form class="input-field">\r\n    \t<svg class="search-svg-icon"><use xlink:href="#search"></use></svg>\r\n        <input class="search-field" placeholder="Search all" type="text"></input>\r\n    </form>\r\n    <div class="search-results">\r\n    </div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['meetingnotes'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 Kenseo.populate.meeting = data ;
__p += '\r\n<div class="meeting-section">\r\n    <div class="project-heading">       \r\n        <div class="projects-heading-icon">\r\n            <svg><use xlink:href="#projects"></use></svg>\r\n        </div>       \r\n        <a href="#projects" class="heading-text-project">Projects &gt; </a>\r\n        <a href="#projectpage/' +
((__t = ( data.projectId )) == null ? '' : __t) +
'" class="heading-text-project-name">' +
((__t = ( data.projectName )) == null ? '' : __t) +
'</a>  \r\n        <span class="heading-date">(' +
((__t = ( sb.timeFormat(data.startTime, true, true) )) == null ? '' : __t) +
')</span>\r\n        <div class="meeting-update-btn-holder">\r\n            <div class="popup-click meeting-update-button" data-url="create-meeting">Update</div>\r\n        </div>\r\n    </div>\r\n    <div class="meeting-wrapper">\r\n        <div class="meeting-left-section">\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Under</div>\r\n                <div class="meta-text">' +
((__t = ( data.projectName )) == null ? '' : __t) +
'</div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Artefact</div>\r\n                <div class="meta-text">' +
((__t = ( data.artefactName )) == null ? '' : __t) +
'</div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Sender</div>\r\n                <div class="meta-text">' +
((__t = ( data.createdBy )) == null ? '' : __t) +
'</div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Agenda</div>\r\n                <div class="meta-text">' +
((__t = ( data.agenda )) == null ? '' : __t) +
'</div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Scheduled On</div>\r\n                <div class="meta-text">\r\n                    <div>Dec 04, 2014</div>\r\n                    <div>11:00 am to 12:00 pm</div>\r\n                </div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Venue</div>\r\n                <div class="meta-text">' +
((__t = ( data.venue )) == null ? '' : __t) +
'</div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Recipients</div>\r\n                ';
 _.each(data.participants, function(p){ ;
__p += '\r\n                <div class="meta-text">' +
((__t = ( p.participentName )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t';
 }); ;
__p += '\r\n            </div>\r\n        </div>\r\n        <div class="meeting-right-section">\r\n            <div class="meeting-people-section">\r\n                <div class="meeting-people-active">\r\n                \t<div class=\'currentPersonNotes acitiveNotesPartcipant\' data-user="' +
((__t = ( data.participantId )) == null ? '' : __t) +
'">\r\n\t                    <div class="people-img-wrapper">\r\n\t                        <img src="' +
((__t = (data.participantPic)) == null ? '' : __t) +
'" />\r\n\t                    </div>\r\n\t                    <span class="meeting-people-name">\r\n\t                        ' +
((__t = (data.participantName)) == null ? '' : __t) +
'\r\n\t                    </span>\r\n                \t</div>\r\n\t                ';
 _.each(data.notes, function(p){ ;
__p += '\r\n\t            \t\t<div class=\'currentPersonNotes\' data-user="' +
((__t = ( p.userId )) == null ? '' : __t) +
'">\r\n\t\t            \t\t<div class="meeting-people-active">\r\n\t\t\t                    <div class="people-img-wrapper">\r\n\t\t\t                        <img src="' +
((__t = (p.profilePic)) == null ? '' : __t) +
'" />\r\n\t\t\t                    </div>\r\n\t\t\t                    <span class="meeting-people-name">\r\n\t\t\t                        ' +
((__t = (p.userName)) == null ? '' : __t) +
'\r\n\t\t\t                    </span>\r\n\t\t\t                </div>\r\n\t            \t';
 }); ;
__p += '\r\n               </div>\r\n                <div class="meeting-people-other">\r\n                    <div class="people-img-wrapper participant active" data-user=' +
((__t = (data.participantId)) == null ? '' : __t) +
'>\r\n                        <img src="' +
((__t = (data.participantPic)) == null ? '' : __t) +
'" />\r\n                    </div>\r\n                    <div class="v-separator"></div>\r\n                    ';
 _.each(data.notes, function(p){ ;
__p += '\r\n                    <div class="people-img-wrapper participant" data-user=' +
((__t = (p.userId)) == null ? '' : __t) +
'>\r\n                        <img src="' +
((__t = (p.profilePic)) == null ? '' : __t) +
'" />\r\n                    </div>\r\n                    ';
 }); ;
__p += '\r\n                </div>\r\n            </div>\r\n            <div class="text-editor-section">\r\n                <div class="text-actions-section">\r\n                    <button name="text-b" text-name="bold">Bold</button>\r\n                    <button name="text-i" text-name="italic">Italic</button>\r\n                    <button name="text-u" text-name="underline">Underline</button>\r\n                </div>\r\n                <div class="text-editor view-notes selectedNotes" contenteditable=true data-user="' +
((__t = ( data.participantId )) == null ? '' : __t) +
'">\r\n                \t' +
((__t = (data.userNotes)) == null ? '' : __t) +
'\r\n                </div>\r\n                ';
 _.each(data.notes, function(p){ ;
__p += '\r\n            \t\t<div class="view-notes" data-user="' +
((__t = ( p.userId )) == null ? '' : __t) +
'" >\r\n            \t\t\t' +
((__t = ( p.notes)) == null ? '' : __t) +
'\r\n        \t\t\t</div>\r\n            \t';
 }); ;
__p += '\r\n               \r\n            </div>\r\n            <label class="checkbox">\r\n                <input class="existing-files-chk" type="checkbox">\r\n                <span>Let others see my notes</span>\r\n            </label>\r\n        </div>\r\n    </div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['menu-header'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="menu-profile">\r\n    <div class="menu-profile-img-dv">\r\n        ';
 if(data.picture !== "assets/imgs/avatar.svg"){ ;
__p += '\r\n            <img class="menu-profile-img" src="' +
((__t = ( data.picture )) == null ? '' : __t) +
'" />\r\n        ';
 } else { ;
__p += '\r\n            <svg class="menu-profile-img"><use xlink:href="#avatar"></use></svg>\r\n        ';
 } ;
__p += '\r\n    </div>\r\n    <div class="menu-profile-text">\r\n        <div class="menu-profile-txt-nm">' +
((__t = ( data.name )) == null ? '' : __t) +
'</div>\r\n        <div class="menu-profile-txt-dsgn">' +
((__t = ( data.designation )) == null ? '' : __t) +
'</div>\r\n    </div>\r\n</div>\r\n<div class="menu-settings">\r\n    <a href="#" class="menu-settings-dshbd-dv page-click">\r\n        <div class="menu-settings-img menu-dashboard-icon">\r\n            <svg><use xlink:href="#dashboard"></use></svg>\r\n        </div>\r\n        <span class="menu-settings-txt">Dashboard</span>\r\n    </a>\r\n    <a href="#projects" class="menu-settings-dshbd-dv page-click hide">\r\n        <div class="menu-settings-img menu-archive-icon">\r\n            <svg fill="#BEC0CF"><use xlink:href="#archive-icn"></use></svg>\r\n        </div>\r\n        <span class="menu-settings-txt">Projects</span>\r\n    </a>\r\n    <a href="#" class="menu-settings-dshbd-dv page-click hide">\r\n        <div class="menu-settings-img menu-analytics-icon">\r\n            <svg><use xlink:href="#analytics"></use></svg>\r\n        </div>\r\n        <span class="menu-settings-txt">Analytics</span>\r\n    </a>\r\n    <a href="#" class="menu-settings-dshbd-dv page-click hide">\r\n        <div class="menu-settings-img menu-archive-icon">\r\n            <svg fill="#BEC0CF"><use xlink:href="#archive-icn"></use></svg>\r\n        </div>\r\n        <span class="menu-settings-txt">Archives</span>\r\n    </a>\r\n    <a href="#" class="menu-settings-dshbd-dv page-click hide">\r\n        <div class="menu-settings-img menu-settings-icon">\r\n            <svg><use xlink:href="#settings"></use></svg>\r\n        </div>\r\n        <span class="menu-settings-txt">Settings</span>\r\n    </a>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['menu-projects-container'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(data && data.length){ ;
__p += '\r\n';
 _.each(data, function(p){ ;
__p += '\r\n<a href="#projectpage/' +
((__t = ( p.id )) == null ? '' : __t) +
'" class="projects-img-dv">\r\n    <img src=\'http://lorempixel.com/sports/280/200\' class="menu-project-img" />\r\n    <span class="projects-img-dv-txt">' +
((__t = ( p.name )) == null ? '' : __t) +
'</span>\r\n</a>\r\n';
 }); ;
__p += '\r\n';
 } else{ ;
__p += '\r\n<div class="no-items">\r\n\tNo projects to show\r\n</div>\r\n';
 } ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['menu-recent-activity'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(data && data.length){ ;
__p += '\r\n';
 _.each(data, function(a){ ;
__p += '\r\n<div class="menu-recent-cnt">\r\n    <div class="menu-recent-img-dv">\r\n    \t<svg><use xlink:href="#addfile"></use></svg>\r\n    </div>\r\n    <div class="menu-recent-cnt-txt">\r\n    \t<div class="menu-activity-name">' +
((__t = ( a.project_name )) == null ? '' : __t) +
'</div>\r\n        <div class="menu-activity-title ellipsis" title="' +
((__t = ( a.artefact_title )) == null ? '' : __t) +
'">' +
((__t = ( a.artefact_title )) == null ? '' : __t) +
'</div>\r\n    </div>\r\n</div>\r\n';
 }); ;
__p += '\r\n';
 } else { ;
__p += '\r\n<div class="no-items">\r\n\tNo Recent activities to show\r\n</div>\r\n';
 } ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['menu-recent-notifications'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(data && data.length){ ;
__p += '\r\n';
 _.each(data, function(d){ ;
__p += '\r\n<div class="menu-notifications-cnt">\r\n\r\n    <div class="menu-notifications-img-dv">\r\n    <svg class="menu-notifications-img"><use xlink:href="#calendar"></use></svg>\r\n    </div>\r\n    <div class="menu-notifications-txt">\r\n        <span class="menu-notifications-txt-nm">Conflux:Designer</span>\r\n        <span class="menu-notifications-txt-tm">' +
((__t = ( sb.timeFormat(d.time) )) == null ? '' : __t) +
' by ' +
((__t = ( d.notifier )) == null ? '' : __t) +
'</span>\r\n        ';
 if(d.meetingDetails){ ;
__p += '\r\n        <div class="menu-notifications-txt-dttme">\r\n            <svg class="menu-notifications-txt-dttme-img"><use xlink:href="#clock"></use></svg>\r\n            ' +
((__t = ( sb.timeFormat(d.meetingDetails.time, true) )) == null ? '' : __t) +
', ' +
((__t = ( sb.getTime(d.meetingDetails.time) )) == null ? '' : __t) +
'\r\n        </div>\r\n        ';
 } ;
__p += '\r\n    </div>\r\n</div>\r\n';
 }); ;
__p += '\r\n';
 } else{ ;
__p += '\r\n<div class="no-items">\r\n    No notifications to show\r\n</div>\r\n';
 } ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['menu-recent-people'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(data && data.length){ ;
__p += '\r\n';
 _.each(data, function(p){ ;
__p += '\r\n<div class="menu-recent-people-cnt">\r\n\t';
 if(p.picture == "assets/imgs/avatar.svg"){ ;
__p += '\r\n\t\t<svg><use xlink:href="#avatar" class="menu-people-img"></use></svg>\r\n    ';
 } else { ;
__p += '\r\n    \t<img src="' +
((__t = ( p.picture )) == null ? '' : __t) +
'" class="menu-people-img" />\r\n    ';
 } ;
__p += '\r\n</div>\r\n';
 }); ;
__p += '\r\n';
 } else{ ;
__p += '\r\n<div class="no-items">\r\n\tNo added people\r\n</div>\r\n';
 } ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['nav-menu'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n<!-- Menu Header -->\r\n<div class="menu-header">\r\n   \r\n</div>\r\n\r\n<!-- Menu Projects Container -->\r\n<div class="menu-projects-container">\r\n   <p class="projects-hd"><a style="color: inherit;font-size: 0.8em;text-decoration: none;"href="#projects">Projects</a></p>\r\n   <div class="menu-projects-section">\r\n\r\n   </div>\r\n</div>\r\n\r\n<!-- Menu Recent -->\r\n<div class="menu-recent">\r\n\r\n    <div class="menu-recent-activity">\r\n \t\t<p class="recent-hd">Recent Artefacts</p>\r\n \t\t<div class="menu-recent-activity-section">\r\n\r\n \t\t</div>\r\n    </div>\r\n    <div class="menu-recent-requests">\r\n        <p class="recent-hd">Shared Artefacts</p>\r\n        <div class="menu-recent-requests-section">\r\n          \r\n        </div>\r\n    </div>\r\n    <div class="menu-recent-notifications">\r\n    \t<p class="notifications-hd">Notifications</p>\r\n    \t<div class="menu-recent-notifications-section">\r\n\r\n    \t</div>\r\n    </div>\r\n    <div class="menu-recent-people">\r\n   \t\t<p class="people-hd">People</p>\r\n   \t\t<div class="menu-recent-people-section">\r\n   \t\t\t\r\n   \t\t</div>\r\n    </div>\r\n</div>\r\n\r\n<!-- Menu End -->';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['summary'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="overlay summary-section-overlay view">\r\n    <div class="summary-section-header">\r\n        <div class="summary-header-left">\r\n            <div class="review-request-item" >\r\n                <div class="rr-left">\r\n                    <div class="rr-status status-' +
((__t = ( data.basicDetails.status )) == null ? '' : __t) +
'">IXD</div>\r\n                    <img class="rr-owner-image" title="' +
((__t = (data.basicDetails.authorName )) == null ? '' : __t) +
'" src="' +
((__t = ( data.basicDetails.authorImage )) == null ? '' : __t) +
'"/>\r\n                </div>\r\n                <div class="rr-right">\r\n                    <div class="rr-title ellipsis" title="' +
((__t = ( data.basicDetails.title )) == null ? '' : __t) +
'">' +
((__t = ( data.basicDetails.title )) == null ? '' : __t) +
'</div>\r\n                    <div class="rr-details ellipsis" title="Version ' +
((__t = (data.basicDetails.versionNo)) == null ? '' : __t) +
'.0">Version ' +
((__t = (data.basicDetails.versionNo)) == null ? '' : __t) +
'.0</div>\r\n                    <div class="rr-state-details">\r\n                        <div class="rr-state-x">\r\n                            <div class="rr-comment">\r\n                                <svg><use xlink:href="#baloon"></use></svg>\r\n                                <div class="rr-comment-count">' +
((__t = ( data.basicDetails['comment_count'] )) == null ? '' : __t) +
'</div>\r\n                            </div>\r\n                            <div class="status-c secondary-status-rr"></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="summary-header-right">\r\n            <div class="summary-header-actions">\r\n                <div class="summary-header-action-item submit-action-icon">\r\n                    <svg class="summary-header-icon"><use xlink:href="#submit"></use></svg>\r\n                    Submit\r\n                </div>\r\n                <div class="summary-header-action-item archive-action-icon">\r\n                    <svg class="summary-header-icon" fill="#6A6F82"><use xlink:href="#archive-icn"></use></svg>\r\n                    Archive\r\n                </div>\r\n                <div class="summary-header-action-item delete-action-icon">\r\n                    <svg fill="#6A6F82" class="summary-header-icon"><use xlink:href="#delete"></use></svg>\r\n                    Delete\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="summary-section-body unselectable">\r\n        <div class="close-icon"><svg><use xlink:href="#close"></use></svg></div>\r\n        <div class="time-frame-section">\r\n            <div class="time-frame-extended mg-parent">\r\n            \t';
 for(var v in data.timeline){ ;
__p += '\r\n\t                <div class="time-frame-holder mg-holder">\r\n\t                    <div class="time-frame-item mg-item">\r\n\t                        <div class="time-frame">\r\n\t                            ';
_.each(data.timeline[v], function(item) {;
__p += '\r\n                            \t\t\r\n                            \t\t\t';
 if(item.type === "links") {;
__p += '\r\n                        \t\t\t\t\t <div class="file-type top-viewer">\r\n                        \t\t\t\t';
 } else if(item.type === "shared") {;
__p += '\r\n                        \t\t\t\t\t<div class="user-type top-viewer">\r\n                        \t\t\t\t\t<div class="user-type-viewer top-hover-viewer">\r\n\t\t\t                                    <div class="user-type-content">\r\n\t\t\t                                        <div class="tf-images">\r\n\t\t\t                                            <img src=' +
((__t = ( item.profPic )) == null ? '' : __t) +
' />\r\n\t\t\t                                        </div>\r\n\t\t\t                                        <div class="tf-more-people">' +
((__t = ( sb.timeFormat(item.shared_date,true,true))) == null ? '' : __t) +
' @' +
((__t = ( sb.getTime(item.shared_date) )) == null ? '' : __t) +
'</div>\r\n\t\t\t                                    </div>\r\n\t\t                                    </div>\r\n                        \t\t\t\t';
 } else if(item.type === "versions") {;
__p += '\r\n                        \t\t\t\t\t<div class="version-type top-viewer">v ' +
((__t = ( item.version_no )) == null ? '' : __t) +
'\r\n                        \t\t\t\t';
 } else if(item.type === "meetings") {;
__p += '\r\n                        \t\t\t\t\t<div class="meeting-type top-viewer">\r\n                        \t\t\t\t';
 } else if(item.type === "references") {;
__p += '\r\n                        \t\t\t\t\t <div class="file-type top-viewer">\r\n                \t\t\t\t\t \t';
 } else if(item.type === "comments") {;
__p += '\r\n                        \t\t\t\t<div class="comment-type top-viewer">\r\n                        \t\t\t\t';
 };
__p += '\r\n                            \t\t';
 }) ;
__p += '</%>\r\n                            \t';
_.each(data.timeline[v], function(item) {;
__p += '\r\n                            \t\t</div>\r\n                            \t';
 }) ;
__p += '</%>\r\n\t                            <div class="time-frame-date">' +
((__t = ( sb.timeFormat(v+" 00:00:00", true, true))) == null ? '' : __t) +
'</div>\r\n\t                        </div>\r\n\t                    </div>\r\n\t                </div>\r\n                ';
 } ;
__p += '\r\n            </div>\r\n            <div class="time-frame-selector mg-parent">\r\n                ';
 _.each(data.versions, function(v){ ;
__p += '\r\n                <div class="time-frame-holder mg-holder">\r\n                    <div class="time-selector-item mg-item">\r\n                        <div class="time-frame">\r\n                            <div class="version-type top-viewer">v' +
((__t = ( v.version_no )) == null ? '' : __t) +
'</div>\r\n                            <div class="time-frame-date">' +
((__t = ( sb.timeFormat(v.created_date, true))) == null ? '' : __t) +
'</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                ';
 }); ;
__p += '\r\n                <div class="time-frame-holder mg-holder">\r\n                    <div class="time-selector-item mg-item">\r\n                        <div class="time-frame">\r\n                            <div class="current-type top-viewer">\r\n                                <svg><use xlink:href="#currentdate"></use></svg>\r\n                            </div>\r\n                            <div class="time-frame-date">' +
((__t = ( sb.timeFormat(new Date(), true, true))) == null ? '' : __t) +
'</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="slider-component">\r\n                <div class="slider-left"></div>\r\n                <div class="slider-right"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="summary-section-footer">\r\n        <div class="summary-footer-item">Summary</div>\r\n        <div class="summary-footer-item">Notes</div>\r\n    </div>\r\n\r\n\r\n\r\n    <div class="summary-section-below-content">\r\n        <div class="summary-people-section">\r\n            <div class="sub-heading-section">\r\n                <div class="artifacts-heading sub-heading">\r\n                    <div class="sub-heading-label">Shared with</div>\r\n                    <div class="sub-heading-add-wrapper">\r\n                        <div class="sub-heading-add-icon">\r\n                            <svg><use xlink:href="#add"></use></svg>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="sub-section-content">\r\n                 ';
 _.each(data.sharedTo, function(d){ ;
__p += '\r\n\t                 <div class="summary-people-item">\r\n\t                    <div class="sp-left">\r\n\t                        <img title"' +
((__t = ( d.name)) == null ? '' : __t) +
'" src="' +
((__t = ( d.userImage)) == null ? '' : __t) +
'" />\r\n\t                    </div>\r\n\t                    <div class="sp-right">\r\n\t                        <div class="sp-name ellipsis" title"' +
((__t = ( d.name)) == null ? '' : __t) +
'">' +
((__t = ( d.name)) == null ? '' : __t) +
'</div>\r\n\t                        <div class="sp-below-section">\r\n\t                            <div class="rr-comment">\r\n                                    <svg><use xlink:href="#baloon"></use></svg>\r\n                                    <div class="rr-comment-count">' +
((__t = ( d['comment_count'] )) == null ? '' : __t) +
'</div>\r\n                                </div>\r\n\t                            <div class="status-c secondary-status-rr"></div>\r\n\t                        </div>\r\n\t                    </div>\r\n\t                </div>\r\n                ';
 }); ;
__p += '\r\n            </div>\r\n        </div>\r\n        <div class="summary-versions-section">\r\n            <div class="sub-heading-section">\r\n                <div class="sub-heading">\r\n                    <div class="sub-heading-label">Versions</div>\r\n                    <div class="sub-heading-add-wrapper">\r\n                        <div class="sub-heading-add-icon">\r\n                            <svg><use xlink:href="#add"></use></svg>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="sub-section-content">\r\n                <a class="summary-compare-btn" href="">Compare selected</a>\r\n                \r\n                ';
 _.each(data.versions, function(d){ ;
__p += '\r\n                    ';
 if(d.artefact_ver_id !== data.basicDetails.versionId){ ;
__p += '\r\n\t                <div class="summary-version-item">\r\n\t                    <label class="checkbox">\r\n\t                        <input type="checkbox"></input>\r\n\t                        <span>\r\n\t                            <span class="version-type">v' +
((__t = (d.version_no )) == null ? '' : __t) +
'</span>\r\n\t                            <div class="doc-type" title="' +
((__t = ( data.basicDetails.title )) == null ? '' : __t) +
'">' +
((__t = ( data.basicDetails.title )) == null ? '' : __t) +
'</div>\r\n\t                        </span>\r\n\t                    </label>\r\n\t                    <div class="summary-version-date">\r\n                            <span>' +
((__t = ( sb.timeFormat(d.created_date, true))) == null ? '' : __t) +
'</span>\r\n                            <a class="page-click" href="#documentview/' +
((__t = ( d['masked_artefact_version_id'] )) == null ? '' : __t) +
'">Open</a>\r\n                        </div>\r\n\t                </div>\r\n                    ';
 } ;
__p += '\r\n         \t\t';
 }); ;
__p += '\r\n            </div>\r\n        </div>\r\n        <div class="summary-references-section">\r\n            <div class="sub-heading-section">\r\n                <div class="sub-heading">\r\n                    <div class="sub-heading-label">References</div>\r\n                    <div class="sub-heading-add-wrapper">\r\n                        <div class="sub-heading-add-icon">\r\n                            <svg><use xlink:href="#add"></use></svg>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="sub-section-content">\r\n            \t';
 _.each(data.references, function(d){ ;
__p += '\r\n\t                <div class="summary-reference-item ellipsis" title="' +
((__t = ( d.title )) == null ? '' : __t) +
'">\r\n\t                    ' +
((__t = ( d.title )) == null ? '' : __t) +
'\r\n\t                </div>\r\n                ';
 }); ;
__p += '\r\n            </div>\r\n        </div>\r\n        <div class="summary-linked-artefacts-section">\r\n            <div class="sub-heading-section">\r\n                <div class="sub-heading">\r\n                    <div class="sub-heading-label">Linked Artefacts</div>\r\n                    <div class="sub-heading-add-wrapper">\r\n                        <div class="sub-heading-add-icon">\r\n                            <svg><use xlink:href="#add"></use></svg>\r\n                        </div>\r\n                    </div>\r\n                    <div class="sub-section-content">\r\n                        ';
 _.each(data.links, function(d){ ;
__p += '\r\n\t\t\t                <div class="linked-item" title="' +
((__t = ( d.artefact_title )) == null ? '' : __t) +
'">\r\n                                <svg class="linked-item-icon"><use xlink:href="#linkIcon"></use></svg>\r\n\t\t\t                    ' +
((__t = ( d.artefact_title )) == null ? '' : __t) +
'\r\n\t\t\t                </div>\r\n\t\t                ';
 }); ;
__p += '\r\n\t                </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['add-people'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="popup popup-add-people k-form">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body k-field" data-k-project_id="' +
((__t = ( Kenseo.popup.data.id )) == null ? '' : __t) +
'">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t<div class="add-people-text-project">\r\n\t\t\t\tAdd People under ' +
((__t = ( Kenseo.popup.data.project_name )) == null ? '' : __t) +
' Project\r\n\t\t\t</div>\r\n\t\t\t' +
((__t = ( 
				sb.toolbox.textBox({
					placeholder: "Enter mail ID. Use comma to add multiple people.",
					inputClass: "xm required k-field",
					dataName: 'people',
					attr: {
						'data-validate-this': 'empty',
						'data-xtype': 'text-with-comma',
						'data-xtype-key': 'users'
					}
				})
			)) == null ? '' : __t) +
'\r\n\t\t\t<div class="existing-users-section">\r\n\t\t\t\t';
 _.each(data.existingUsers, function(u){ ;
__p += '\r\n\t\t\t\t\t,&nbsp;' +
((__t = ( u.mailId )) == null ? '' : __t) +
'\r\n\t\t\t\t';
 }) ;
__p += '\r\n\t\t\t</div>\r\n\t\t\t<div class="people-permissions-section">\r\n\t\t\t\t<div class="permissions-header">This Person(s) can</div>\r\n\t\t\t\t<div class="permissions-wrapper k-field" data-xtype="access_type">\r\n\t\t\t\t\t<div class="permission-item">\r\n\t\t\t\t\t\t<div class="permission-item-text">Add comments</div>\r\n\t\t\t\t\t\t<div class="checkbox-holder">\r\n\t\t\t\t\t\t\t<label class="toggle-checkbox">\r\n\t\t\t\t\t\t\t\t<input type="checkbox" data-subtype="comments"></input><span></span>\r\n\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="permission-item">\r\n\t\t\t\t\t\t<div class="permission-item-text">Share with others</div>\r\n\t\t\t\t\t\t<div class="checkbox-holder">\r\n\t\t\t\t\t\t\t<label class="toggle-checkbox">\r\n\t\t\t\t\t\t\t\t<input type="checkbox" data-subtype="share"></input><span></span>\r\n\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['add-project'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popup popup-small k-form">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t' +
((__t = ( 
				sb.toolbox.textBox({
					placeholder: "Project name",
					inputClass: "project-input required k-field",
					dataName : "projectName",
					required: true,
					attr: {
						'data-validate-this': 'empty',
						'data-v-label': 'Project',
						'data-xtype': 'text',
						'data-xtype-key': 'projectName'
					}
				})
			)) == null ? '' : __t) +
'\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['archive-one'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var data = Kenseo.popup.info[index] ;
__p += '\r\n<div class="popup popup-small">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t<select class="projects-dropdown dropdown">\r\n\t\t\t</select>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['artefact-four'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var dump = sb.getPopupData() ;
__p += '\r\n<div class="popup popup-large k-form">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-left-section">\r\n\t\t' +
((__t = ( 
			sb.setTemplate('popup-meta-content', {
				'data': {
					project: true,
					file: true,
					type: true,
					references: true,
					tags: true,
					'dump': sb.getPopupData()
				},
			}) 
		)) == null ? '' : __t) +
'\r\n\t</div>\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper popup-right-section">\r\n\t\t\t<div class="your-team-section">\r\n\t\t\t\t<div class="your-team-heading">Your Team</div>\r\n\t\t\t\t<form class="your-team-body">\r\n\t\t\t\t\t<div class="field-section your-team-field" data-name="new-people">\r\n\t\t\t\t\t\t<form>\r\n\t\t\t\t\t\t\t';

							var fields = {
								shareCombo: sb.toolbox.comboBox({
									"label": "Add People",
									"class": "xm people-combobox",
									"dataName": "otherMembers",
									"placeholder": "Add People"
								})
							}
							;
__p += '\r\n\t\t\t\t\t\t\t' +
((__t = ( fields.shareCombo )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t</form>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="share-artefact-people">\r\n\t\t\t\t\t\t<div class="share-artefact-people-wrapper k-field" data-xtype="share-permissions" data-xtype-key="shared_members">\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</form>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['artefact-one'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popup popup-small">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t' +
((__t = ( 
				sb.toolbox.comboBox({
					"fieldClass": "flt-none",
					"class": "projects-dropdown",
				})
			)) == null ? '' : __t) +
'\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['artefact-three'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var dump = sb.getPopupData() ;
__p += '\r\n<div class="popup popup-large">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-left-section">\r\n\t\t' +
((__t = ( 
			sb.setTemplate('popup-meta-content', {
				'data': {
					project: true,
					file: true,
					'dump': sb.getPopupData()
				},
			}) 
		)) == null ? '' : __t) +
'\r\n\t\t\r\n\t</div>\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper popup-right-section">\r\n\t\t\t<form>\r\n\t\t\t\t';

				var fields = {
					comboBoxOne: sb.toolbox.comboBox({
						"label": "References",
						"class": "xm reference-combobox",
						"dataName": "references",
						"placeholder": "References"
					}),
					textBoxTwo: sb.toolbox.textBox({
						"label": "Tags",
						"inputClass": "tags-input-txt",
						"dataName": "tags",
						"placeholder": "Tags"
					}),
					comboBoxThree: sb.toolbox.comboBox({
						"label": "Links",
						"class": "xm links-combobox",
						"dataName": "links",
						"placeholder": "Links"
					}),
					comboBoxFour: sb.toolbox.comboBox({
						'label': 'Document Type',
						'class': 'xm doctype-combobox',
						'dataName': 'doctype',
						'placeholder': 'Document Type',
						required: true
					})
				}

				;
__p += '\r\n\r\n\t\t\t\t\r\n\r\n\t\t\t\t' +
((__t = ( fields.comboBoxFour )) == null ? '' : __t) +
'\r\n\t\t\t\t' +
((__t = ( fields.comboBoxOne )) == null ? '' : __t) +
'\r\n\t\t\t\t' +
((__t = ( fields.textBoxTwo )) == null ? '' : __t) +
'\r\n\t\t\t\t' +
((__t = ( fields.comboBoxThree )) == null ? '' : __t) +
'\r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t</form>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['artefact-two'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var dump = sb.getPopupData() ;
__p += '\r\n<div class="popup popup-large">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-left-section">\r\n\t\t' +
((__t = ( 
			sb.setTemplate('popup-meta-content', {
				'data': {
					project: true,
					'dump': sb.getPopupData()
				},
			}) 
		)) == null ? '' : __t) +
'\r\n\t</div>\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper popup-right-section">\r\n\t\t\t<div class="files-section">\r\n\t\t\t\t<label class="upload-file-section">\r\n\t\t\t\t\t<input type="file" class="upload-files-input" ';
 if(!data.single_file_selector){ ;
__p += 'multiple=""';
 } ;
__p += '></input>\r\n\t\t\t\t\t<div class="file-heading">\r\n\t\t\t\t\t\tUpload a new file\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="uploader-section">\r\n\t\t\t\t\t\t<div class="uploader-section-img">\r\n\t\t\t\t\t\t\t<svg><use xlink:href="#pdfnpng"></use></svg>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</label>\r\n\t\t\t\t<span class="or-btn">Or</span>\r\n\t\t\t\t<div class="create-file-section">\r\n\t\t\t\t\t';
 if(data.chooseExistingFile){ ;
__p += '\r\n\t\t\t\t\t\t<div class="file-heading">\r\n\t\t\t\t\t\t\tChoose an existing file\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.comboBox({
								"class": "xm choose-file-combobox",
								"dataName": "choose-existing-file"
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t';
 } else{ ;
__p += '\r\n\t\t\t\t\t\t<div class="file-heading">\r\n\t\t\t\t\t\t\tCreate file\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t';
 if(data.show_coming_soon){ ;
__p += '\r\n\t\t\t\t\t\t<div class="coming-soon-text">Coming soon!</div>\r\n\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t<div class="choose-existing-file-holder">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="files-list">\r\n\t\t\t\t<div class="create-file-item">\r\n\t\t\t\t\t<div class="notification-item S-type">\r\n\t\t\t\t\t\t<svg class="notification-s-type-icon"><use xlink:href="#file"></use></svg>\r\n\t\t\t\t\t\t<div class="notification-title">\r\n\t\t\t\t\t\t\tBalfour: Image Share\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="notification-time">\r\n\t\t\t\t\t\t\t@ 11:20 AM by Rakesh\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="create-file-close-icon">\r\n\t\t\t\t\t\t<svg><use xlink:href="#close"></use></svg>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t';
 if(data.allow_artefact_selection){ ;
__p += '\r\n\t\t\t\t<label class="checkbox">\r\n\t\t\t\t\t<input type="checkbox" disabled="true" class="existing-files-chk"></input>\r\n\t\t\t\t\t<span>This is a new version of an existing file</span>\r\n\t\t\t\t</label>\r\n\t\t\t\t' +
((__t = ( 
					sb.toolbox.comboBox({
						"class": "xm existing-files-combobox",
						"dataName": "choose-file"
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['cover-image'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popup popup-large">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t<div class="image-cover-section">\r\n\t\t\t\t<label class="upload-file-section">\r\n\t\t\t\t\t<input type="file" class="upload-files-input" accept="image/*"></input>\r\n\t\t\t\t\t<div class="file-heading">\r\n\t\t\t\t\t\tClick to upload image\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="uploader-section">\r\n\t\t\t\t\t\t<div class="uploader-section-img">\r\n\t\t\t\t\t\t\t<svg><use xlink:href="#pdfnpng"></use></svg>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</label>\r\n\t\t\t</div>\r\n\t\t\t<div class="cover-image-viewer">\r\n\t\t\t    <div class="img-wrapper">\r\n\t\t\t\t    <img class="img-content" src="" />\r\n\t\t\t\t    <img class="pan-img" src="assets/imgs/blank.png" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['createInvite'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var toolbox = sb.toolbox ;
__p += '\r\n<div class="popup popup-meeting k-form">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t<form class="meeting-invite-form">\r\n\t\t\t\t\r\n\t\t\t\t' +
((__t = ( 
					toolbox.comboBox({
						"label": "Project",
						required: true,
						"class": "xm project-combobox",
						"dataName": "meetingProject",
						"placeholder": "Choose Project"
					}) 
				)) == null ? '' : __t) +
'\r\n\t\t\t\t' +
((__t = ( 
					toolbox.comboBox({
						"label": "Artefact",
						required: true,
						"class": "xm artefact-combobox",
						"dataName": "meetingArtefact",
						"placeholder": "Choose Artefact"
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t\t' +
((__t = ( 
					toolbox.textBox({
						"label": "Agenda",
						required: true,
						textArea: true,
						dataName: "agenda",
						"inputClass": "input-meeting-textarea meeting-agenda",
						'attr': {
							'data-validate-this': 'empty'
						}
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t\t<div style="clear: both; padding-top: 20px;">\r\n\t\t\t\t\t<div class="field-section in-line" data-name="date" data-ignore="1">\r\n\t\t\t\t\t\t<div class="input-label required">Scheduled on</div>\r\n\t\t\t\t\t\t<div class="input-wrapper float-left mini-datepicker">\r\n\t\t\t\t\t\t\t<input type="text" class="input-meeting-date float-left"></input>\r\n\t\t\t\t\t\t\t<div class="datepicker-icon-holder float-left">\r\n\t\t\t\t\t\t\t\t<div class="datepicker-icon">\r\n\t\t\t\t\t\t\t\t\t<svg><use xlink:href="#calendar"></use></svg>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="field-section in-line" data-name="fromTime">\r\n\t\t\t\t\t\t<div class="input-wrapper float-left">\r\n\t\t\t\t\t\t\t<div class="time-label">From</div>\r\n\t\t\t\t\t\t\t<select class="projects-dropdown dropdown mini-dropdown no-margin fromTime">\r\n\t\t\t\t\t\t\t    <option value="00:00">12:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="01:00">01:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="02:00">02:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="03:00">03:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="04:00">04:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="05:00">05:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="06:00">06:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="07:00">07:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="08:00">08:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="09:00">09:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="10:00">10:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="11:00">11:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="12:00">12:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="13:00">01:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="14:00">02:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="15:00">03:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="16:00">04:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="17:00">05:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="18:00">06:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="19:00">07:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="20:00">08:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="21:00">09:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="22:00">10:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="23:00">11:00 PM</option>\r\n\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="field-section in-line" data-name="toTime">\r\n\t\t\t\t\t\t<div class="input-wrapper float-left">\r\n\t\t\t\t\t\t\t<div class="time-label">To</div>\r\n\t\t\t\t\t\t\t<select class="projects-dropdown dropdown no-margin mini-dropdown toTime">\r\n\t\t\t\t\t\t\t    <option value="00:00">12:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="01:00">01:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="02:00">02:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="03:00">03:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="04:00">04:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="05:00">05:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="06:00">06:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="07:00">07:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="08:00">08:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="09:00">09:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="10:00">10:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="11:00">11:00 AM</option>\r\n\t\t\t\t\t\t\t    <option value="12:00">12:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="13:00">01:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="14:00">02:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="15:00">03:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="16:00">04:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="17:00">05:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="18:00">06:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="19:00">07:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="20:00">08:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="21:00">09:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="22:00">10:00 PM</option>\r\n\t\t\t\t\t\t\t    <option value="23:00">11:00 PM</option>\r\n\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t</div>\t\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t' +
((__t = ( 
					toolbox.textBox({
						"label": "Venue",
						inputClass: "meeting-location",
						dataName: "location",
						'attr': {
							'data-validate-this': 'empty'
						}
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t\t' +
((__t = ( 
					toolbox.textBox({
						"label": "Recipients List",
						textArea: true,
						required: true,
						inputClass: "recipients-meeting-txt-section",
						"class": "xm people-name tags-combobox",
						"dataName": "attendees",
						'attr': {
							'data-validate-this': 'empty'
						}
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t</form>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['message'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popup popup-message k-form">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body k-field">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t' +
((__t = ( data.message() )) == null ? '' : __t) +
'\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['popup-header'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="popup-header">\r\n\t' +
((__t = ( title )) == null ? '' : __t) +
'\r\n\t';
 if(close) { ;
__p += '\r\n\t<div class="popup-close-icon">\r\n\t\t<svg><use xlink:href="#close"></use></svg>\r\n\t</div>\r\n\t';
 } ;
__p += '\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['activities'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


	var newData = sb.getDayWiseData(data)
;
__p += '\r\n';
 
	var svgicons = {
		"user-added": "#icon11",
		"artefact-share": "#icon11",
		"artefact-approved": "#file12",
		"artefact-added": "#addfile",
		"artefact-comment": "#icon15",
		"meeting-added": "#icon4",
		"user-removed": "#icon2"
	}
;
__p += '\r\n<div class="sub-heading-section">\r\n\t<div class="sub-heading">\r\n\t\t<div class="sub-heading-label">Activity</div>\r\n\t</div>\r\n</div>\r\n<div class="activity-section-content sub-section-content">\r\n\t';
 if(newData){ ;
__p += '\r\n\t';
 for(var key in newData){ ;
__p += '\r\n\t<div class="day-activity">\r\n\t\t<div class="day-activity-label">\r\n\t\t\t' +
((__t = ( key )) == null ? '' : __t) +
'\r\n\t\t</div>\r\n\t\t<div class="day-activity-section">\r\n\t\t\t';
 _.each(newData[key], function(a){ ;
__p += '\r\n\t\t\t\t';
 var activityTypeX = a.activityOn.toLowerCase() + "-" + a.activityType.toLowerCase() ;
__p += '\r\n\t\t\t\t';
 console.log(activityTypeX) ;
__p += '\r\n\t\t\t<div class="activity-holder">\r\n\t\t\t\t<div class="activity-left">\r\n\t\t\t\t\t<div class="activity-icon">\r\n\t\t\t\t\t\t<svg><use xlink:href="' +
((__t = ( svgicons[activityTypeX] )) == null ? '' : __t) +
'"></use></svg>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="activity-right">\r\n\t\t\t\t\t<div class="activity-title ellipsis" title="' +
((__t = ( a.activityName )) == null ? '' : __t) +
'">' +
((__t = ( a.project_name )) == null ? '' : __t) +
': \r\n\t\t\t\t\t\t';
 if(a.activityType.toLowerCase() === "removed" && a.activityName.toLowerCase() === "user"){ ;
__p += '\r\n\t\t\t\t\t\t\t' +
((__t = ( a.activityType )) == null ? '' : __t) +
' ' +
((__t = ( a.activityName )) == null ? '' : __t) +
'\t\r\n\t\t\t\t\t\t';
 } else { ;
__p += '\r\n\t\t\t\t\t\t\t' +
((__t = ( a.activityName )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="activity-details ellipsis" title="' +
((__t = ( a.doneBy )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t<div class="activity-time">' +
((__t = ( sb.timeFormat(a.time) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t\t<div class="activity-sender"> by ' +
((__t = ( a.doneBy )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t';
 }); ;
__p += '\r\n\t\t</div>\r\n\t</div>\r\n\t';
 } ;
__p += '\r\n\t';
 } else{ ;
__p += '\r\n\t<div class="no-items">\r\n\t\tNo activies yet\r\n\t</div>\r\n\t';
 } ;
__p += '\r\n</div>\r\n\r\n';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['people'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="sub-heading-section">\r\n\t<div class="sub-heading">\r\n\t\t<div class="sub-heading-label">People</div>\r\n\t\t<div class="sub-heading-add-wrapper">\r\n\t\t\t<div class="sub-heading-add-icon popup-click" data-url="add-people">\r\n\t\t\t\t<svg><use xlink:href="#add"></use></svg>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class="people-section-content sub-section-content">\r\n\t\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['project-page'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="project-heading data-holder" data-key="projects" data-id="' +
((__t = ( Kenseo.page.id )) == null ? '' : __t) +
'">\r\n\t<div class="projects-heading-icon">\r\n\t\t<svg><use xlink:href="#projects"></use></svg>\r\n\t</div>\r\n\t<a href="#projects" class="heading-text-project">Projects > </a>\r\n\t<span class="heading-text-project-name">' +
((__t = ( Kenseo.page.data.project.name )) == null ? '' : __t) +
'</span>\r\n\t<div class="main-section-project-icon-holder html-click sub-menu-nav inlineBlockTop" data-html-class="active">\r\n\t\t<div class="sub-heading-more-icon">\r\n\t\t\t<svg><use xlink:href="#more"></use></svg>\r\n\t\t</div>\r\n\t\t<div class="sub-menu-holder right-nav bottom-nav">\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="add-artefact" data-index="1">Add an Artefact</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="add-people">Add People</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="create-meeting">Create a Meeting</div>\r\n\t\t\t<div class="sub-menu-item">Share a Project</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="archive-project">Archive a Project</div>\r\n\t\t\t<div class="sub-menu-item popup-click hide">Delete a Project</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="cover-image">Add Cover Image</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class="project-section-content data-holder" data-key="projects" data-id="' +
((__t = ( Kenseo.page.id )) == null ? '' : __t) +
'">\r\n\t<div class="artifacts-section review-requests-content sub-section">\r\n\t\t\r\n\t</div>\r\n\r\n\t<div class="activity-section sub-section">\r\n\t\t\r\n\t</div>\r\n\t<div class="people-section sub-section">\r\n\t\t\r\n\t</div>\r\n\r\n</div>\r\n';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['button'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<button type="button"\r\n\t';
 if(data.disabled){ ;
__p += ' \r\n\t\tdisabled="true" autocomplete="off" \r\n\t';
 } ;
__p += ' \r\n\t\tclass="' +
((__t = ( data.cls )) == null ? '' : __t) +
' ';
 if(data.label === "Proceed" || data.label === "Back"){ ;
__p += 'nav-btn';
 } ;
__p += '"\r\n\t\t';
 if(data.label === "Proceed"){ ;
__p += '\r\n\t\t\tdata-index="' +
((__t = ( +data.index+1 )) == null ? '' : __t) +
'"\r\n\t\t';
 } else if(data.label === "Back"){ ;
__p += '\r\n\t\t\tdata-index="' +
((__t = ( +data.index-1 )) == null ? '' : __t) +
'"\r\n\t\t';
 } ;
__p += '\r\n\r\n\t\t' +
((__t = ( sb.setTemplate('attributes', {data: data}) )) == null ? '' : __t) +
'\r\n\t>' +
((__t = ( data.label )) == null ? '' : __t) +
'\r\n</button>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['buttons'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var buttons = data.buttons ;
__p += '\r\n';
 for(var i=0; i < buttons.length; i++){ ;
__p += '\r\n\t';
 var b = buttons[i]; ;
__p += '\r\n\t';
 if(!isNaN(Number(data.index))){ ;
__p += '\r\n\t\t';
 _.extend(b, { index: data.index }) ;
__p += '\r\n\t';
 } ;
__p += '\r\n\t' +
((__t = ( sb.toolbox.button({data: b}) )) == null ? '' : __t) +
'\r\n';
 }; ;


}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['checkbox'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="field-section" ';
 if(data['dataName']) { ;
__p += 'data-name=' +
((__t = ( data.dataName )) == null ? '' : __t);
 } ;
__p += ' ';
 if(data['data-array']){ ;
__p += ' data-array="' +
((__t = ( data['data-array'] )) == null ? '' : __t) +
'" ';
 } ;
__p += '>\r\n\t<label class="';
 if(data.toggle){ ;
__p += 'toggle-checkbox';
 } else {;
__p += 'checkbox';
 } ;
__p += ' ' +
((__t = ( data.class )) == null ? '' : __t) +
'">\r\n\t\t<input type="checkbox" \r\n\t\t\t';
 if(data.checked == true){ ;
__p += '\r\n\t\t\t\tchecked\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t' +
((__t = ( sb.setTemplate('attributes', {data: data}) )) == null ? '' : __t) +
'\r\n\t\t></input>\r\n\t\t<span>' +
((__t = ( data.text )) == null ? '' : __t) +
'</span>\r\n\t</label>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['combobox'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="field-section ';
 if(data.fieldClass){ ;
__p +=
((__t = ( data.fieldClass )) == null ? '' : __t);
 } ;
__p += '" ';
 if(data.dataName){ ;
__p += ' data-name="' +
((__t = ( data.dataName )) == null ? '' : __t) +
'" ';
 } ;
__p += '>\r\n\t';
 if(data.label){ ;
__p += '<div class="input-label ';
 if(data.required) {;
__p += 'required';
 } ;
__p += '">' +
((__t = ( data.label )) == null ? '' : __t) +
'</div>';
 } ;
__p += '\r\n\t<div class="combobox ';
 if(data.class){ ;
__p +=
((__t = ( data.class )) == null ? '' : __t);
 } ;
__p += '" data-xtype="' +
((__t = ( data['data-xtype'] )) == null ? '' : __t) +
'" ';
 if(data['data-xtype-key']){ ;
__p += 'data-xtype-key="' +
((__t = (  data['data-xtype-key'] )) == null ? '' : __t) +
'"';
 } ;
__p += '>\r\n\t\t<div class="combobox-wrapper">\r\n\t\t\t<input class="';
 if(data.required){ ;
__p += 'k-required';
 } ;
__p += '" type="text" placeholder="' +
((__t = ( data.placeholder )) == null ? '' : __t) +
'" ';
 if(data.required){ ;
__p += 'data-validate-this="empty,valid-list-item"';
 } ;
__p += '>\r\n\t\t</div>\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['textbox'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="field-section" ';
 if(data.dataName){ ;
__p += ' data-name="' +
((__t = ( data.dataName )) == null ? '' : __t) +
'" ';
 } ;
__p += '>\r\n\t';
 if(data.label){ ;
__p += '<div class="input-label ';
 if(data.labelClass){ ;
__p +=
((__t = ( data.labelClass )) == null ? '' : __t);
 } ;
__p += ' ';
 if(data.required){ ;
__p += ' required';
 } ;
__p += '">' +
((__t = ( data.label )) == null ? '' : __t) +
'</div>';
 } ;
__p += '\r\n\t<div class="input-wrapper">\r\n\t\t';
 if(!data.textArea){ ;
__p += '\r\n\t\t<input \r\n\t\t\ttype="text" \r\n\t\t\tclass="input-text ';
 if(data.inputClass) { ;
__p +=
((__t = ( data.inputClass )) == null ? '' : __t) +
' ';
 } ;

 if(data.required){ ;
__p += ' k-required';
 } ;
__p += '" \r\n\t\t\t';
 if(data.placeholder){ ;
__p += '\r\n\t\t\tplaceholder="' +
((__t = ( data.placeholder )) == null ? '' : __t) +
'" \r\n\t\t\t';
 } ;
__p += ' \r\n\t\t\t' +
((__t = ( sb.setTemplate('attributes', {data: data}) )) == null ? '' : __t) +
'\r\n\t\t></input>\r\n\t\t';
 } else { ;
__p += '\r\n\t\t<textarea class="';
 if(data.inputClass) { ;
__p +=
((__t = ( data.inputClass )) == null ? '' : __t) +
' ';
 } ;

 if(data.required){ ;
__p += ' k-required';
 } ;
__p += '" \r\n\t\t\t';
 if(data.placeholder){ ;
__p += '\r\n\t\t\tplaceholder="' +
((__t = ( data.placeholder )) == null ? '' : __t) +
'" \r\n\t\t\t';
 } ;
__p += ' \r\n\t\t\t' +
((__t = ( sb.setTemplate('attributes', {data: data}) )) == null ? '' : __t) +
'\r\n\t\t ></textarea>\r\n\t\t';
 } ;
__p += '\r\n\t</div>\r\n\t';
 if(data.enableSuggestions){ ;
__p += '\r\n\t<div class="field-suggestions"></div>\r\n\t<div class="field-suggestions-viewer"></div>\r\n\t';
 } ;
__p += '\r\n</div>';

}
return __p
}})();
(function() {
var _ = window._ || {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['templates'] = window['templates'] || {})['attributes'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(data.attr && typeof data.attr == "object"){ 
	var attributes = data.attr;
	for(var key in attributes){ ;
__p += '\r\n\t\t' +
((__t = ( key )) == null ? '' : __t) +
' = "' +
((__t = ( attributes[key] )) == null ? '' : __t) +
'" \r\n';
	}
 } ;


}
return __p
}})();