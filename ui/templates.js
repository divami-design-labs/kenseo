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
(window['templates'] = window['templates'] || {})['add-persona-widget'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="add-widget-section">\r\n\t<div class="add-widget-btn-section">\r\n\t\t<button class="add-widget-btn">\r\n\t\t\t<span class="add-widget-text">Add Widget</span>\r\n\t\t\t<span class="widget-add"><svg><use xlink:href="#add"></use></svg></span>\r\n\t\t</button>\r\n\t\t<div class="widget-items">\r\n\t\t\t<div class="widget-item-name" persona-widget-type="tags">Tags</div>\r\n\t\t\t<div class="widget-item-name" persona-widget-type="list-items">List Items</div>\r\n\t\t\t<div class="widget-item-name" persona-widget-type="progress-indicators">Progress Indicators</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<button class="popup-click" data-url="download-persona">Download Persona</button>\r\n</div>';

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
__p += '<div class="persona-indicator-holder template-section">\r\n\t';
 var percentage = percentage || 50 ;
__p += '\r\n\t<div class="template-section--close">\r\n\t\t<svg><use xlink:href="#close"></use></svg>\r\n\t</div>\r\n\t<div class="persona-indicator-name editable">' +
((__t = ( heading )) == null ? '' : __t) +
'<br />' +
((__t = ( caption )) == null ? '' : __t) +
'</div>\r\n\t<div class="persona-indicator">\r\n\t\t<div class="persona-indicator-seek-bar" style="width: ' +
((__t = ( percentage )) == null ? '' : __t) +
'%"></div>\r\n\t</div></div>';

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
__p += '<div class="persona-template">\r\n\t' +
((__t = ( sb.setTemplate('add-persona-widget') )) == null ? '' : __t) +
'\r\n\t<div class="persona-template-capture">\r\n\t\t<div class="persona-template-header">\r\n\t\t\t<div class="persona-personal-details-top">\r\n\t\t\t\t<span class="persona-name caps editable">full name, </span>\r\n\t\t\t\t<span class="persona-age caps editable">age</span>\r\n\t\t\t</div>\r\n\t\t\t<div class="persona-project-name editable">Project</div>\r\n\t\t</div>\r\n\t\t<div class="persona-cards-holder">\r\n\t\t\t<div class="persona-cards-holder--left">\r\n\t\t\t\t<div class="persona-personal-details persona-card template-section persona-card--no-highlight">\r\n\t\t\t\t\t<!-- <div class="persona-card--close template-section--close">\r\n\t\t\t\t\t\t<svg><use xlink:href="#close"></use></svg>\r\n\t\t\t\t\t</div> -->\r\n\t\t\t\t\t<div class="persona-image">\r\n\t\t\t\t\t\t<label class="persona--img-uploader">\r\n\t\t\t\t\t\t\t<svg><use xlink:href="#dropdown"></use></svg>\r\n\t\t\t\t\t\t\t<input class="input-hidden persona-img-uploader-input" type="file"></input>\r\n\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t<img class="persona-img" src="http://dummyimage.com/310x205" alt="persona image" />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="persona-personal-details-bottom">\r\n\t\t\t\t\t\t<div class="persona-caption editable">Persona Caption</div>\r\n\t\t\t\t\t\t<div class="persona-occupation editable">Occupation: Job Title</div>\r\n\t\t\t\t\t\t<div class="persona-location editable">Location: City, State</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="persona-description persona-card template-section persona-card--no-highlight">\r\n\t\t\t\t\t<!-- <div class="persona-card--close template-section--close">\r\n\t\t\t\t\t\t<svg><use xlink:href="#close"></use></svg>\r\n\t\t\t\t\t</div> -->\r\n\t\t\t\t\t<div class="editable">A short biographical description of the persona that provides a quick insight into the lifestyle, personality and professional traits of the persona that would be helpful while coming up with designs. Make sure these details are related to the primary use case of the product so that all the details are covered within the given context.</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t' +
((__t = ( sb.setTemplate('widget-persona-tags') )) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t\t<div class="persona-cards-holder--mid">\r\n\r\n\t\t\t\t' +
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
'\r\n\r\n\t\t\t\t' +
((__t = ( sb.setTemplate('widget-persona-list-items', {
					heading: "GOALS",
					items: [
						"Need a computer to get help in academics in planning and scheduling his tasks, prepare assignments etc.",
						"Handle official work from home - OSen prefers to work and submit his work from home.",
						"Stay up-to-date on social and other events",
						"Stay in touch with Family and Friends"
					]
				}) )) == null ? '' : __t) +
'\r\n\r\n\t\t\t\t' +
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
'\r\n\t\t\t</div>\r\n\t\t\t<div class="persona-cards-holder--right">\r\n\t\t\t\t' +
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
'\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="current-artefact-info fixed-bar">\r\n        <div>\r\n            <a class="popup-click" data-url="create-artefact">Create Artefacts > </a><a class="popup-click" data-url="create-artefact" data-index="1">Persona Templates >  </a>\r\n            Persona template 1 \r\n        </div>\r\n    </div>\r\n</div>';

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
__p += '<div class="persona-points-holder persona-card template-section">\r\n\t<div class="persona-card--close template-section--close">\r\n\t\t<svg><use xlink:href="#close"></use></svg>\r\n\t</div>\r\n\t<div class="persona-card-heading editable">' +
((__t = ( heading )) == null ? '' : __t) +
'</div>\r\n\t<ul class="persona-points editable">\r\n\t\t';
 _.each(items, function(item){ ;
__p += '\r\n\t\t\t<li class="persona-point">' +
((__t = ( item )) == null ? '' : __t) +
'</li>\r\n\t\t';
 }) ;
__p += '\r\n\t</ul></div>';

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
__p += '<div class="persona-traits persona-card template-section">\r\n\t<div class="persona-card--close template-section--close">\r\n\t\t<svg><use xlink:href="#close"></use></svg>\r\n\t</div>\r\n\t<div class="persona-card-heading editable">traits</div>\r\n\t<div class="persona-trait-item">\r\n\t\t<span class="persona-trait-item-text editable">Introvert</span>\r\n\t\t<span class="persona-trait-item-close widget-close">\r\n\t\t\t<svg class="tilt"><use xlink:href="#add"></use></svg>\r\n\t\t</span>\r\n\t</div>\r\n\t<div class="persona-trait-item">\r\n\t\t<span class="persona-trait-item-text editable">Conservative</span>\r\n\t\t<span class="persona-trait-item-close widget-close">\r\n\t\t\t<svg class="tilt"><use xlink:href="#add"></use></svg>\r\n\t\t</span>\r\n\t</div>\r\n\t<div class="persona-trait-item">\r\n\t\t<span class="persona-trait-item-text editable">Tag name</span>\r\n\t\t<span class="persona-trait-item-close persona-trait-item--add widget-close">\r\n\t\t\t<svg><use xlink:href="#add"></use></svg>\r\n\t\t</span>\r\n\t</div></div>';

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
__p += '<div class="persona-indicators persona-card template-section">\r\n\t<div class="persona-card--close template-section--close">\r\n\t\t<svg><use xlink:href="#close"></use></svg>\r\n\t</div>\r\n\t<div class="persona-card-heading editable">persona indicators</div>\r\n\t';
 for(var indicator in indicators){ ;
__p += '\r\n\t\t' +
((__t = ( sb.setTemplate('persona-indicator', indicators[indicator]) )) == null ? '' : __t) +
'\r\n\t';
 } ;
__p += '\r\n\t<div class="persona-indicator--add">\r\n\t\t<span class="widget-add">\r\n\t\t\t<svg><use xlink:href="#add"></use></svg>\r\n\t\t</span>\r\n\t</div></div>';

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
(window['templates'] = window['templates'] || {})['edit-comment'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popup popup-medium k-form">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n            ' +
((__t = (
				sb.toolbox.textBox({
					"label": "Comment description",
					inputClass: "required k-field",
                    fieldClass: "field-section--stretch",
					required: true,
					attr: {
						'data-validate-this': 'empty',
						'data-v-label': 'Project',
						'data-xtype': 'text',
						'data-xtype-key': 'description',
                        'value': Kenseo.popup.data.description
					},
					"fieldSectionErrorMessages": {
						'empty': 'Please enter comment description',
					}
				})
			)) == null ? '' : __t) +
'\r\n        </div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
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
(window['templates'] = window['templates'] || {})['artefacts'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(data.projects && data.sortBy){ ;
__p += '\r\n<div class="sub-heading-section">\r\n\t<div class="artifacts-heading sub-heading">\r\n\t\t<div class="sub-heading-label">Artefacts</div>\r\n\t\t<div class="sub-heading-add-wrapper">\r\n\t\t\t<div class="sub-heading-add-icon popup-click" data-url="add-artefact" data-index="1">\r\n\t\t\t\t<svg><use xlink:href="#add"></use></svg>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 if(data.projects.length){ ;
__p += '\r\n\t\t<div class="sub-heading-more-options html-click sub-menu-nav" data-html-class="active">\r\n\t\t\t<div class="sub-heading-more-icon"><svg><use xlink:href="#more"></use></svg></div>\r\n\t\t\t<div class="sub-menu-holder left-nav bottom-nav">\r\n\t\t\t\t<div class="sub-menu-item sort-item" data-stype="name">Sort by Name</div>\r\n\t\t\t\t<div class="sub-menu-item sort-item" data-stype="date">Sort by Date</div>\r\n\t\t\t\t<div class="sub-menu-item sort-item" data-stype="owner">Group by Owner</div>\r\n\t\t\t\t<div class="sub-menu-item sort-item" data-stype="default">Default Sort</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t';
 } ;
__p += '\r\n\t</div>\r\n</div>\r\n<div class="sort-view">Sort By ';
 if(data && data.sortBy){ ;
__p += ' ' +
((__t = ( _.capitalize(data.sortBy) )) == null ? '' : __t) +
' ';
 } else { ;
__p += 'Default ';
 } ;
__p += '</div>\r\n<div class="artifacts-content sub-section-content ';
 if(data.sortBy && data.sortBy === 'default'){ ;
__p += ' linked-artefacts ';
 } ;
__p += '">\r\n';
 } else{ ;
__p += '\r\n\t<div class="review-requests-heading">\r\n\t\t<div class="review-requests-icon">\r\n\t\t\t<svg><use xlink:href="#reviewrequest"></use></svg>\r\n\t\t</div>\r\n\t\t<div class="heading-text">Shared Artefacts</div>\r\n\t</div>\r\n\t<div class="review-requests-content">\r\n';
 } ;
__p += '\r\n\r\n';
 if(data.projects && data.sortBy){ ;
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
(window['templates'] = window['templates'] || {})['day-wise-item'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="day-activity">\r\n    <div class="day-activity-label">\r\n        ' +
((__t = ( data.label )) == null ? '' : __t) +
'\r\n    </div>\r\n    <div class="day-activity-section">\r\n        ' +
((__t = ( data.content )) == null ? '' : __t) +
'\r\n    </div>\r\n</div>\r\n';

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
(window['templates'] = window['templates'] || {})['show-global-messages'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="messages-wrapper ' +
((__t = (type)) == null ? '' : __t) +
'-messages-wrapper ">\r\n  <svg class="error-or-success-img ">\r\n    <use xlink:href="#' +
((__t = (icon)) == null ? '' : __t) +
'"></use>\r\n  </svg>\r\n  <span class="messages">' +
((__t = (message)) == null ? '' : __t) +
'</span>\r\n</div>\r\n';

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
(window['templates'] = window['templates'] || {})['create-artefact'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popup popup-large">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t<div class="templates-viewer">\r\n\t\t\t\t<div class="template-item nav-btn" data-index="1" template-type="Persona"></div>\r\n\t\t\t\t<!-- <div class="template-item nav-btn" data-index="2" template-type="Document"></div> -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div></div>';

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
__p += '<div class="popup popup-large">\r\n\t';
 console.dir(data) ;
__p += '\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t';
 if(data.index > 0){ ;
__p += '\r\n\t\t\t<button class="nav-btn" data-index="0">Back</button>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t<div class="templates-viewer">\r\n\t\t\t\t<div class="template-item nav-btn" data-href="#persona/1" template-type="Persona 1"></div>\r\n\t\t\t\t<!-- <div class="template-item nav-btn" data-href="#persona/2" template-type="Persona 2"></div> -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div></div>';

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
__p += '\r\n\t\t';
 var mime = n.MIME_type || "" ;
__p += '\r\n\t\t';
 var isSupportedFile = (mime.indexOf('pdf') > -1 || mime.indexOf('image') > -1) ;
__p += '\r\n\t\t<a ';
 if(n.type == "M"){ ;
__p += 'href="#meetingnotes/' +
((__t = ( n.refId )) == null ? '' : __t) +
'" data-url="meeting-notes"';
 } else if(!isSupportedFile){ ;
__p += 'style="cursor: default;"';
} else { ;
__p += 'href="#documentview/' +
((__t = ( n.masked_artefact_version_id )) == null ? '' : __t) +
'"';
 } ;
__p += ' class="notification-item">\r\n\t\t\t';
 if(n.type == "M"){ ;
__p += '\r\n\t\t\t\t<div class="notification-meeting-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#calendar"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t';
 } else if(n.type == "C") { ;
__p += '\r\n\t\t\t\t<div class="notification-comment-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#baloon1"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t';
 } else if(n.type == "S"){ ;
__p += '\r\n\t\t\t\t<div class="notification-file-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#file"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t<div class="notification-title" title="' +
((__t = ( n.title )) == null ? '' : __t);
 if(!isSupportedFile && !(n.type == "M")){ ;
__p += ' - Unsupported format';
 } ;
__p += '">\r\n\t\t\t\t' +
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
__p += '\r\n';

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

 var dummyImage = "http://placeimg.com/280/200/arch" ;
__p += '\r\n<img src="' +
((__t = ( data['intro_image_url'] || dummyImage )) == null ? '' : __t) +
'" />\r\n<div class="project-block-overlay">\r\n\t<div class="project-block-overlay-wrapper">\r\n\t\t<div class="project-block-title">\r\n\t\t\t' +
((__t = ( data.project_name )) == null ? '' : __t) +
'\r\n\t\t</div>\r\n\t\t<div class="project-block-details">\r\n\t\t\t<div class="project-block-details-icon">\r\n\t\t\t\t<svg><use xlink:href="#calendar"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="project-block-details-text ellipsis">Last Updated ' +
((__t = ( sb.timeFormat(sb.addTimeZoneToDate(data.last_updated_date)) )) == null ? '' : __t) +
'</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class="project-block-hover-content data-holder" data-key="projects" data-id="' +
((__t = ( data.project_id )) == null ? '' : __t) +
'">\r\n\t<div class="project-black-out"></div>\r\n\t<div class="project-actions-wrapper">\r\n\t\t<div class="project-action" data-url="add-artefact" data-index="1">\r\n\t\t\t<div class="project-action-icon add-artefact-icon">\r\n\t\t\t\t<svg><use xlink:href="#artifacts"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="project-action-label">Add an Artefact</div>\r\n\t\t</div>\r\n\t\t<div class="project-action" data-url="add-people">\r\n\t\t\t<div class="project-action-icon add-user-icon">\r\n\t\t\t\t<svg><use xlink:href="#adduser"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="project-action-label">Add User</div>\r\n\t\t</div>\r\n\t\t';
 if(data['is_archive'] == "0"){ ;
__p += '\r\n\t\t<div class="project-action" data-url="archive-project" data-index="0">\r\n\t\t\t<div class="project-action-icon archive-icon">\r\n\t\t\t\t<svg><use xlink:href="#archive"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="project-action-label">Archive</div>\r\n\t\t</div>\r\n\t\t';
 } else { ;
__p += '\r\n\t\t<div class="project-action" data-url="unarchive-project" data-index="0">\r\n\t\t\t<div class="project-action-icon archive-icon">\r\n\t\t\t\t<svg><use xlink:href="#archive"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t<div class="project-action-label">Unarchive</div>\r\n\t\t</div>\r\n\t\t';
 } ;
__p += '\r\n\t</div>\r\n\t<a href="#projectpage/' +
((__t = ( data.project_id )) == null ? '' : __t) +
'" class="btn-project-open">Open Project</a>\r\n</div>';

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
__p += '<div class="cv-main-person">\r\n\t<div class="cv-person-left">\r\n      ';
 if(data.profilePic && data.profilePic !== "ui/assets/imgs/avatar.svg"){ ;
__p += '\r\n        <img class="profile-image-black" src="' +
((__t = ( data.profilePic )) == null ? '' : __t) +
'"/>\r\n        ';
 } else { ;
__p += '\r\n            <svg class="profile-image-black"><use xlink:href="#avatar"></use></svg>\r\n        ';
 } ;
__p += '\r\n\r\n\t</div>\r\n\t<div class="cv-person-right">\r\n\t\t<div class="cv-person-right-top">\r\n\t\t\t<div class="cv-person-name-holder">\r\n\t\t\t\t<span class="cv-person-name ellipsis">' +
((__t = ( data.user )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t<span class="cv-person-time">' +
((__t = ( sb.timeFormat(data.time) )) == null ? '' : __t) +
'</span>\r\n\t\t\t</div>\r\n\t\t\t';
 if(data.metaInfo){ ;
__p += '\r\n\t\t\t<div class="cv-person-meta">\r\n\t\t\t\t<span class="cv-person-category">Typo</span>\r\n\t\t\t\t<span class="cv-person-status">Open</span>\r\n\t\t\t</div>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t';
 if(data['is_submitted'] === "0"){ ;
__p += '\r\n\t\t\t<div class="cv-comment-actions">\r\n\t\t\t\t<div class="cv-comment-edit popup-click" data-url="edit-comment">\r\n\t\t\t\t\t<svg><use xlink:href="#edit"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="cv-comment-delete popup-click" data-url="delete-comment">\r\n\t\t\t\t\t<svg><use xlink:href="#delete"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</div>\r\n\t\t<div class="cv-comment-detail">' +
((__t = ( data.description )) == null ? '' : __t) +
'</div>\r\n\t\t';
 if(data.metaInfo){ ;
__p += '\r\n\t\t<div class="cv-more-replys"><a href="#">+2 More</a></div>\r\n\t\t';
 } ;
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
__p += '\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="comment-section-body">\r\n\t\t<div class="comment-sec-wrapper">\r\n\t\t\t\r\n\t\t</div>\r\n\t\t<div class="write-comment-section">\r\n\t\t\t<textarea class="write-comment" placeholder="Type your comment here"></textarea>\r\n\t\t</div>\r\n\t\t<div class="buttons-section">\r\n\t\t\t<div class="buttons-left-section">\r\n\t\t\t\t';

					var privateObj = {
						'text': "Private message",
						"inputClass": "private-chk",
						"attr": {
							"data-k-is_private": data.is_private || 0,
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
(window['templates'] = window['templates'] || {})['comments-description'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="comment-section-body">\r\n    <div class="comment-sec-wrapper">\r\n        <div class="comment-severity severity-' +
((__t = (data.severity )) == null ? '' : __t) +
'" ></div>\r\n        <div class="type-and-state">\r\n            <div class = "comment-category">' +
((__t = (data.category)) == null ? '' : __t) +
'</div>\r\n            <div>' +
((__t = (data.state)) == null ? '' : __t) +
'</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n';

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
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="comments-view-holder toolbar-slider">\r\n\t<div class="comments-view-header">\r\n\t\t<div class="comments-viewer-header">\r\n\t\t\tComments Summary\r\n\r\n\t\t</div>\r\n\t\t<div class="filter-icon html-click" data-html-class="enable-filter-list">\r\n\t\t\t<svg class="filter-commentList-dropdown">\r\n\t\t\t\t<use xlink:href="#filter"></use>\r\n\t\t\t</svg>\r\n\t\t\t<form class="comments-view-filter-section">\r\n\t\t\t\t<div class="filter-checkboxes severity">\r\n\t\t\t\t\t<div class="filter-checkboxes-heading">Severities</div>\r\n\t\t\t\t\t<div class="filter-checkboxes-content">\r\n\t\t\t\t\t\t';
var severities = Kenseo.settings.severities ;
__p += '\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "All Severities",
								attr: {
									'name': 'severities',
									'data-all': true
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "High",
								attr: {
									'name': 'High'
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "Medium",
								attr: {
									'name': 'Medium'
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "Low",
								attr: {
									'name': 'Low'
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="filter-checkboxes category">\r\n\t\t\t\t\t<div class="filter-checkboxes-heading">Categories</div>\r\n\t\t\t\t\t<div class="filter-checkboxes-content">\r\n\t\t\t\t\t\t\t';
var categories = Kenseo.settings.categories;
__p += '\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "All Categories",
								attr: {
									'name': 'categories',
									'data-all': true
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "Typo",
								attr: {
									'name': 'Typo'
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "IxD",
								attr: {
									'name': 'IxD'
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "UID",
								attr: {
									'name': 'UID'
								}
							})
						)) == null ? '' : __t) +
'\r\n\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "Persona",
								attr: {
									'name': 'Persona'
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="filter-checkboxes status">\r\n\t\t\t\t\t<div class="filter-checkboxes-heading">Status</div>\r\n\t\t\t\t\t<div class="filter-checkboxes-content">\r\n\t\t\t\t\t\t';
var status = Kenseo.settings.status;
__p += '\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "All Statuses",
								attr: {
									'name': 'status',
									'data-all': true
								}
							})
						)) == null ? '' : __t) +
'\r\n\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "Open",
								attr: {
									'name': 'Open'
								}
							})
						)) == null ? '' : __t) +
'\r\n\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "Close",
								attr: {
									'name': 'Close'
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "Resolved",
								attr: {
									'name': 'Resolved'
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "Reopen",
								attr: {
									'name': 'Reopen'
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.checkbox({
								text: "Deferred",
								attr: {
									'name': 'Deferred'
								}
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="comment-members-list">\r\n\t\t\t\t' +
((__t = (
					sb.setTemplate('select', {
						data: {
							"label": "Users",
							inputClass: "comment-members",
							"selectAttr": {
								"multiple": ""
							}
						}
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="comment-dates">\r\n\t\t\t\t\t<div class="comment-dates-heading">Date</div>\r\n\t\t\t\t\t<div class="input-wrapper float-left mini-datepicker">\r\n\t\t\t\t\t\t<input type="text"  class="input-comments-date float-left"></input>\r\n\t\t\t\t\t\t<div class="datepicker-icon-holder float-left">\r\n\t\t\t\t\t\t\t<div class="datepicker-icon">\r\n\t\t\t\t\t\t\t\t<svg><use xlink:href="#calendar"></use></svg>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="apply-filter-btn ">\r\n\t\t\t\t\t' +
((__t = ( sb.toolbox.button({
						data: {
							cls: "main-btn",
							"label": "Apply Filters"
						}
					}) )) == null ? '' : __t) +
'\r\n\t\t\t\t</div>\r\n\t\t\t</form>\r\n\t\t</div>\r\n\r\n\t</div>\r\n\t<div class="comments-view-section">\r\n\t\t<div class="cv-comments-section">\t\t</div>\r\n\t</div>\r\n</div>\r\n';

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
(window['templates'] = window['templates'] || {})['document-summary-tag'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="tag-item" title="' +
((__t = ( data.tag_name )) == null ? '' : __t) +
'" tag-id="' +
((__t = ( data.tag_id )) == null ? '' : __t) +
'">\r\n    ' +
((__t = ( data.tag_name )) == null ? '' : __t) +
'\r\n    <div class="close-tag-icon popup-click" data-url="remove-tag">\r\n        <svg>\r\n            <use xlink:href="#close"></use>\r\n        </svg>\r\n    </div>\r\n</div>\r\n';

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
 if(p.profilePic !== "ui/assets/imgs/avatar.svg"){ ;
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
(window['templates'] = window['templates'] || {})['pdf-toolbar'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- sidebarContainer -->\r\n    <div id="mainContainer">\r\n        <div class="findbar hidden doorHanger hiddenSmallView" id="findbar">\r\n            <label for="findInput" class="toolbarLabel" data-l10n-id="find_label">Find:</label>\r\n            <input id="findInput" class="toolbarField" tabindex="91">\r\n            <div class="splitToolbarButton">\r\n                <button class="toolbarButton findPrevious" title="" id="findPrevious" tabindex="92" data-l10n-id="find_previous">\r\n                <span data-l10n-id="find_previous_label">Previous</span>\r\n                </button>\r\n                <button class="toolbarButton findNext" title="" id="findNext" tabindex="93" data-l10n-id="find_next">\r\n                <span data-l10n-id="find_next_label">Next</span>\r\n                </button>\r\n            </div>\r\n            <input type="checkbox" id="findHighlightAll" class="toolbarField">\r\n            <label for="findHighlightAll" class="toolbarLabel" tabindex="94" data-l10n-id="find_highlight">Highlight all</label>\r\n            <input type="checkbox" id="findMatchCase" class="toolbarField">\r\n            <label for="findMatchCase" class="toolbarLabel" tabindex="95" data-l10n-id="find_match_case_label">Match case</label>\r\n            <span id="findMsg" class="toolbarLabel"></span>\r\n        </div>\r\n        <!-- findbar -->\r\n        <div id="secondaryToolbar" class="secondaryToolbar hidden doorHangerRight">\r\n            <div id="secondaryToolbarButtonContainer">\r\n                <button id="secondaryPresentationMode" class="secondaryToolbarButton presentationMode visibleLargeView" title="Switch to Presentation Mode" tabindex="51" data-l10n-id="presentation_mode">\r\n                <span data-l10n-id="presentation_mode_label">Presentation Mode</span>\r\n                </button>\r\n                <button id="secondaryOpenFile" class="secondaryToolbarButton openFile visibleLargeView" title="Open File" tabindex="52" data-l10n-id="open_file">\r\n                <span data-l10n-id="open_file_label">Open</span>\r\n                </button>\r\n                <button id="secondaryPrint" class="secondaryToolbarButton print visibleMediumView" title="Print" tabindex="53" data-l10n-id="print">\r\n                <span data-l10n-id="print_label">Print</span>\r\n                </button>\r\n                <button id="secondaryDownload" class="secondaryToolbarButton download visibleMediumView" title="Download" tabindex="54" data-l10n-id="download">\r\n                <span data-l10n-id="download_label">Download</span>\r\n                </button>\r\n                <a href="#" id="secondaryViewBookmark" class="secondaryToolbarButton bookmark visibleSmallView" title="Current view (copy or open in new window)" tabindex="55" data-l10n-id="bookmark">\r\n                <span data-l10n-id="bookmark_label">Current View</span>\r\n                </a>\r\n                <div class="horizontalToolbarSeparator visibleLargeView"></div>\r\n                <button id="firstPage" class="secondaryToolbarButton firstPage" title="Go to First Page" tabindex="56" data-l10n-id="first_page">\r\n                <span data-l10n-id="first_page_label">Go to First Page</span>\r\n                </button>\r\n                <button id="lastPage" class="secondaryToolbarButton lastPage" title="Go to Last Page" tabindex="57" data-l10n-id="last_page">\r\n                <span data-l10n-id="last_page_label">Go to Last Page</span>\r\n                </button>\r\n                <div class="horizontalToolbarSeparator"></div>\r\n                <button id="pageRotateCw" class="secondaryToolbarButton rotateCw" title="Rotate Clockwise" tabindex="58" data-l10n-id="page_rotate_cw">\r\n                <span data-l10n-id="page_rotate_cw_label">Rotate Clockwise</span>\r\n                </button>\r\n                <button id="pageRotateCcw" class="secondaryToolbarButton rotateCcw" title="Rotate Counterclockwise" tabindex="59" data-l10n-id="page_rotate_ccw">\r\n                <span data-l10n-id="page_rotate_ccw_label">Rotate Counterclockwise</span>\r\n                </button>\r\n                <div class="horizontalToolbarSeparator"></div>\r\n                <button id="toggleHandTool" class="secondaryToolbarButton handTool" title="Enable hand tool" tabindex="60" data-l10n-id="hand_tool_enable">\r\n                <span data-l10n-id="hand_tool_enable_label">Enable hand tool</span>\r\n                </button>\r\n                <div class="horizontalToolbarSeparator"></div>\r\n                <button id="documentProperties" class="secondaryToolbarButton documentProperties" title="Document Properties…" tabindex="61" data-l10n-id="document_properties">\r\n                <span data-l10n-id="document_properties_label">Document Properties…</span>\r\n                </button>\r\n            </div>\r\n        </div>\r\n        <!-- secondaryToolbar -->\r\n        <div class="toolbar">\r\n            <div id="toolbarContainer">\r\n                <div id="toolbarViewer">\r\n                    <div id="toolbarViewerLeft">\r\n                        <button id="viewFind" class="toolbarButton group hiddenSmallView" title="Find in Document" tabindex="12" data-l10n-id="findbar">\r\n                        <span data-l10n-id="findbar_label">Find</span>\r\n                        </button>\r\n                    </div>\r\n                    ';
 if(data.isPdf) { ;
__p += '\r\n                    <div id="toolbarViewerRight">\r\n                        <button id="zoomOut" class="toolbarButton zoomOut" title="Zoom Out" tabindex="21" data-l10n-id="zoom_out">\r\n                            <svg><use xlink:href="#zoom-out"></use></svg>\r\n                            <span data-l10n-id="zoom_out_label">Zoom Out</span>\r\n                        </button>\r\n                        <div class="slider">\r\n                            <div class="thumb"></div>\r\n                        </div>\r\n                        <button id="zoomIn" class="toolbarButton zoomIn" title="Zoom In" tabindex="22" data-l10n-id="zoom_in">\r\n                            <svg><use xlink:href="#zoom-in"></use></svg>\r\n                            <span data-l10n-id="zoom_in_label">Zoom In</span>\r\n                        </button>\r\n                        <button class="toolbarButton pageUp" title="Previous Page" id="previous" tabindex="13" data-l10n-id="previous">\r\n                            <svg><use xlink:href="#previous-page-icon"></use></svg>\r\n                            <span data-l10n-id="previous_label">Previous</span>\r\n                        </button>\r\n                        <input type="text" id="pageNumber" class="toolbarField pageNumber" value="1" size="4" min="1" tabindex="15">\r\n                        <span id="numPages" class="toolbarLabel"></span>\r\n                        <button class="toolbarButton pageDown" title="Next Page" id="next" tabindex="14" data-l10n-id="next">\r\n                            <svg><use xlink:href="#next-page-icon"></use></svg>\r\n                            <span data-l10n-id="next_label">Next</span>\r\n                        </button>\r\n                    </div>\r\n                    <button id="presentationMode" class="toolbarButton presentationMode hiddenLargeView" title="Switch to Presentation Mode" tabindex="31" data-l10n-id="presentation_mode">\r\n                    <span data-l10n-id="presentation_mode_label">Presentation Mode</span>\r\n                    </button>\r\n                    ';
 } ;
__p += '\r\n                </div>\r\n            </div>\r\n            <div id="loadingBar">\r\n                <div class="progress">\r\n                    <div class="glimmer">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id="viewerContainer" class="parent viewerContainer" tabindex="0">\r\n        <div class="slider-container"></div>\r\n        <div class="annotate-wrapper">\r\n            ';
 if(data.isPdf) { ;
__p += '\r\n            <div id="viewer" class="pdfViewer"></div>\r\n            ';
 } else { ;
__p += '\r\n            <img class="image-viewer" src="' +
((__t = ( sb.getRelativePath(data.documentPath) )) == null ? '' : __t) +
'"/>\r\n            ';
 } ;
__p += '\r\n        </div>\r\n        <div class="current-artefact-info bar">\r\n            <div>\r\n                <a href="#projects">Projects > </a><a href="#projectpage/' +
((__t = ( data.project_id )) == null ? '' : __t) +
'">' +
((__t = ( data.project_name  )) == null ? '' : __t) +
' >  </a>' +
((__t = ( data.artefact_name  )) == null ? '' : __t) +
' </div>\r\n            <div class="html-click show-all-versions">\r\n                <div>\r\n                    <span>v' +
((__t = ( data.versionNo  )) == null ? '' : __t) +
'.0</span>\r\n                    <div class="info-bar-dropdown-version-no-icon">\r\n                        <svg><use xlink:href="#up-drpdwn"></use></svg>\r\n                    </div>\r\n                </div>\r\n                <div class="sub-menu-holder left-nav top-nav">\r\n                    ';
 _.each(data.versions, function(p){ ;
__p += '\r\n                    <div class="sub-menu-item">\r\n                        <span>v' +
((__t = ( p.versionNo )) == null ? '' : __t) +
'.0</span>\r\n                        <div class="actions">\r\n                            <a href="#compare/' +
((__t = ( p.masked_artefact_version_id)) == null ? '' : __t) +
'" class="v-compare-icon page-click">\r\n                                <svg><use xlink:href="#v_compare"></use></svg>\r\n                            </a>\r\n                            <a href="#documentview/' +
((__t = ( p.masked_artefact_version_id)) == null ? '' : __t) +
'" class="v-open-icon page-click">\r\n                                <svg><use xlink:href="#v_open"></use></svg>\r\n                            </a>\r\n                        </div>\r\n                    </div>\r\n                    ';
 }); ;
__p += '    \r\n                </div>\r\n            </div>\r\n            <div class="active-close-icon active-tab-close-icon">\r\n        \t\t\t<svg>\r\n        \t\t\t\t<use xlink:href="#close"></use>\r\n        \t\t\t</svg>\r\n        \t\t</div>\r\n        </div>\r\n    </div>\r\n    <div id="errorWrapper" hidden=\'true\'>\r\n        <div id="errorMessageLeft">\r\n            <span id="errorMessage"></span>\r\n            <button id="errorShowMore" data-l10n-id="error_more_info">\r\n            More Information\r\n            </button>\r\n            <button id="errorShowLess" data-l10n-id="error_less_info" hidden=\'true\'>\r\n            Less Information\r\n            </button>\r\n        </div>\r\n        <div id="errorMessageRight">\r\n            <button id="errorClose" data-l10n-id="error_close">\r\n            Close\r\n            </button>\r\n        </div>\r\n        <div class="clearBoth"></div>\r\n        <textarea id="errorMoreInfo" hidden=\'true\' readonly="readonly"></textarea>\r\n    </div>\r\n    <div class="dv-toolbox">\r\n        <div class="dvt-item document-info-icon slider-click" data-url="document-summary" title="Document summary">\r\n            <svg><use xlink:href="#document-info"></use></svg>\r\n        </div>\r\n        <div class="dvt-item html-click add-comment-icon ';
 if(!data.isPdf){ ;
__p += ' hide ';
 } ;
__p += ' ';
 if(data.permission === 'R' || data.permission === 'S' ){ ;
__p += ' hide ';
 } ;
__p += '" data-value="rectangle" title="Add comment" data-html-outside-click="false">\r\n            <svg><use xlink:href="#add-comment"></use></svg>\r\n        </div>\r\n        <div class="dvt-item html-click toggle-annotations-icon ';
 if(!data.isPdf){ ;
__p += ' hide ';
 } ;
__p += '" title="Toggle Comment view" data-html-outside-click="false">\r\n            <svg><use xlink:href="#toggle-annotations"></use></svg>\r\n        </div>\r\n        <div class="dvt-item html-click ';
 if(!data.isPdf){ ;
__p += ' hide ';
 } ;
__p += '" title="Toggle Annotations completely" data-url="toggle-all-annotations" data-html-outside-click="false">\r\n            <svg><use xlink:href="#toggle-annotations"></use></svg>\r\n        </div>\r\n        <div class="dvt-item comment-summary-icon slider-click';
 if(!data.isPdf){ ;
__p += ' hide ';
 } ;
__p += '" data-url="comment-summary" title="Comment summary">\r\n            <svg><use xlink:href="#comment-summary"></use></svg>\r\n        </div>\r\n        <div class="dvt-item share-artefact-icon popup-click ';
 if(data.permission === 'R'){ ;
__p += ' hide ';
 } ;
__p += '" data-url="share-artefact" data-index="2" title="Share this artefact">\r\n            <svg><use xlink:href="#share-artefact"></use></svg>\r\n        </div>\r\n        <div class="dvt-item submit-review-icon popup-click';
 if(!data.isPdf){ ;
__p += ' hide ';
 } ;
__p += ' ';
 if(data.permission === 'R' || data.permission === 'S'){ ;
__p += ' hide ';
 } ;
__p += '" title="Submit this document for review" data-url="submit-artefact?artefactVersionId=' +
((__t = ( data.artefact_version_id )) == null ? '' : __t) +
'">\r\n            <svg><use xlink:href="#submit-review"></use></svg>\r\n        </div>\r\n        <div class="dvt-item html-click sub-menu-nav more-menu-icon ';
 if(data.permission === 'R' || data.permission === 'S'){ ;
__p += ' hide ';
 } ;
__p += '" title="more options">\r\n            <svg><use xlink:href="#more-menu"></use></svg>\r\n            <div class="sub-menu-holder top-right-nav">\r\n                <div class="sub-menu-item popup-click" data-url="add-version">Add Version</div>\r\n                <div class="sub-menu-item popup-click" data-url="replace-artefact">Replace</div>\r\n                <div class="sub-menu-item popup-click" data-url="private-message">Send Private Message</div>\r\n            </div>\r\n        </div>\r\n    </div>';

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
__p += '    <div id="sidebarContainer">\r\n        <div id="toolbarSidebar">\r\n            <div class="splitToolbarButton toggled">\r\n                <button id="viewThumbnail" class="toolbarButton group toggled" title="Show Thumbnails" tabindex="2" data-l10n-id="thumbs">\r\n                <span data-l10n-id="thumbs_label">Thumbnails</span>\r\n                </button>\r\n                <button id="viewOutline" class="toolbarButton group" title="Show Document Outline" tabindex="3" data-l10n-id="outline">\r\n                <span data-l10n-id="outline_label">Document Outline</span>\r\n                </button>\r\n                <button id="viewAttachments" class="toolbarButton group" title="Show Attachments" tabindex="4" data-l10n-id="attachments">\r\n                <span data-l10n-id="attachments_label">Attachments</span>\r\n                </button>\r\n            </div>\r\n        </div>\r\n        <div id="sidebarContent">\r\n            <div id="thumbnailView">\r\n            </div>\r\n            <div id="outlineView" class="hidden">\r\n            </div>\r\n            <div id="attachmentsView" class="hidden">\r\n            </div>\r\n        </div>\r\n    </div>\r\n    ';
 data.isPdf = true ;
__p += '\r\n    ' +
((__t = ( sb.setTemplate('pdf-toolbar', {data: data}) )) == null ? '' : __t) +
'\r\n    <!-- mainContainer -->\r\n    <div id="overlayContainer" class="hidden">\r\n        <div id="passwordOverlay" class="container hidden">\r\n            <div class="dialog">\r\n                <div class="row">\r\n                    <p id="passwordText" data-l10n-id="password_label">Enter the password to open this PDF file:</p>\r\n                </div>\r\n                <div class="row">\r\n                    <input type="password" id="password" class="toolbarField" />\r\n                </div>\r\n                <div class="buttonRow">\r\n                    <button id="passwordCancel" class="overlayButton"><span data-l10n-id="password_cancel">Cancel</span></button>\r\n                    <button id="passwordSubmit" class="overlayButton"><span data-l10n-id="password_ok">OK</span></button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n<!-- overlayContainer -->\r\n';

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
__p += '<div class="each-tab">\r\n<a href="#documentview/' +
((__t = ( maskedVersionId )) == null ? '' : __t) +
'" class="tab-item selectedTab" targetRel="' +
((__t = ( data.artefact_version_id )) == null ? '' : __t) +
'">\r\n     <div class= "fileTab">\r\n        <svg><use xlink:href="#file-tab"></use></svg>\r\n    </div>\r\n</a>\r\n<div class="tab-artefact-info bar">\r\n    <div>\r\n      <div class="close-tab-icon">\r\n        <svg class="close-tab">\r\n          <use xlink:href="#tab-close"></use>\r\n        </svg>\r\n      </div>\r\n      <a href="#projectpage/' +
((__t = ( data.project_id )) == null ? '' : __t) +
'">' +
((__t = ( data.project_name  )) == null ? '' : __t) +
' >  </a>' +
((__t = ( data.artefact_name  )) == null ? '' : __t) +
'\r\n    </div>\r\n</div>\r\n</div>\r\n';

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
__p += '<div class="each-tab">\r\n<a href="#documentview/' +
((__t = ( maskedVersionId )) == null ? '' : __t) +
'" class="tab-item selectedTab" targetRel="' +
((__t = ( data.artefact_version_id )) == null ? '' : __t) +
'">\r\n    <div class= "imageTab">\r\n        <svg><use xlink:href="#img-tab"></use></svg>\r\n    </div>\r\n</a>\r\n<div class="tab-artefact-info bar">\r\n    <div>\r\n      <div class="close-tab-icon">\r\n        <svg class="close-tab">\r\n          <use xlink:href="#tab-close"></use>\r\n        </svg>\r\n      </div>\r\n      <a href="#projectpage/' +
((__t = ( data.project_id )) == null ? '' : __t) +
'">' +
((__t = ( data.project_name  )) == null ? '' : __t) +
' > </a>' +
((__t = ( data.artefact_name  )) == null ? '' : __t) +
'\r\n    </div>\r\n</div>\r\n</div>\r\n';

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
(window['templates'] = window['templates'] || {})['timeline'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 for(var v in data.timeline){ ;
__p += '\r\n    ';
if(data.timeline[v].length){;
__p += '\r\n        <div class="time-frame-holder mg-holder">\r\n            <div class="time-frame-item mg-item">\r\n                <div class="time-frame">\r\n                    <div class="time-frame-wrapper top-viewer">\r\n                        ';
_.each(data.timeline[v], function(item) {;
__p += '\r\n                                ';
 if(item.type === "links") {;
__p += '\r\n                                     <div class="file-type "></div>\r\n                                ';
 } else if(item.type === "shared") {;
__p += '\r\n                                    <div class="user-type ">\r\n                                        <svg fill="#9A9EA5"><use xlink:href="#share-artefact"></use></svg>\r\n                                        <div class="user-type-viewer top-hover-viewer">\r\n                                            <div class="user-type-content">\r\n                                                <div class="tf-images">\r\n                                                    ';
 if(item.profile_pic_url !== "ui/assets/imgs/avatar.svg"){ ;
__p += '\r\n                                                        <img src=' +
((__t = ( item.profile_pic_url )) == null ? '' : __t) +
' />\r\n                                                    ';
 } else { ;
__p += '\r\n                                                        <svg class="profile-image-black"><use xlink:href="#avatar"></use></svg>\r\n                                                    ';
 } ;
__p += '\r\n                                                </div>\r\n                                                <div class="tf-more-people">' +
((__t = ( sb.timeFormat(item.created_date,true,true))) == null ? '' : __t) +
' @' +
((__t = ( sb.getTime(item.created_date) )) == null ? '' : __t) +
'</div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                ';
 } else if(item.type === "versions") {;
__p += '\r\n                                    <div class="version-type ">v' +
((__t = ( item.version_no )) == null ? '' : __t) +
'</div>\r\n                                ';
 } else if(item.type === "meetings") {;
__p += '\r\n                                    ';
console.dir("meetings");
__p += '\r\n                                    ';
console.dir(item);
__p += '\r\n                                    <div class="meeting-type">\r\n                                        <svg fill="#00AEEF"><use xlink:href="#calendar"></use></svg>\r\n                                        <div class="top-hover-viewer">\r\n                                            <div class="meeting-type-content">\r\n                                                <svg fill="#00AEEF"><use xlink:href="#calendar"></use></svg>\r\n                                                <div class="meeting-content">' +
((__t = (item.meeting_title)) == null ? '' : __t) +
'\r\n                                                    <div>' +
((__t = (sb.timeFormat(item.meeting_time,true,true))) == null ? '' : __t) +
' @' +
((__t = ( sb.getTime(item.meeting_time))) == null ? '' : __t) +
'</div>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                ';
 } else if(item.type === "references") {;
__p += '\r\n                                     <div class="file-type "></div>\r\n                                ';
 } else if(item.type === "replaced") {;
__p += '\r\n                                    <div class="file-type ">\r\n                                        <svg fill="#9A9EA5"><use xlink:href="#replace"></use></svg>\r\n                                        <div class="top-hover-viewer">\r\n                                            <div class="type-content">\r\n                                                <svg class="timeline-updated" fill="#efeff0"><use xlink:href="#replace"></use></svg>\r\n                                                <div class="timeline-updated-content">Replaced\r\n                                                    <div>' +
((__t = (sb.timeFormat(item.created_time,true,true))) == null ? '' : __t) +
' @' +
((__t = ( sb.getTime(item.created_time))) == null ? '' : __t) +
'</div>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                ';
 } else if(item.type === "updated") {;
__p += '\r\n                                     <div class="file-type ">\r\n                                         <svg fill="#00AEEF"><use xlink:href="#file_1"></use></svg>\r\n                                         <div class="top-hover-viewer">\r\n                                             <div class="type-content">\r\n                                                 <svg class="timeline-updated" fill="#efeff0"><use xlink:href="#edit"></use></svg>\r\n                                                 <div class="timeline-updated-content">Updated\r\n                                                     <div>' +
((__t = (sb.timeFormat(item.created_time,true,true))) == null ? '' : __t) +
' @' +
((__t = ( sb.getTime(item.created_time))) == null ? '' : __t) +
'</div>\r\n                                                 </div>\r\n                                             </div>\r\n                                         </div>\r\n                                     </div>\r\n                                ';
 } else if(item.type === "usersAdded") {;
__p += '\r\n                                     <div class="user-type ">\r\n                                         <svg><use href="#add-people"></use></svg>\r\n                                         <div class="top-hover-viewer">\r\n                                             <div class="type-content">\r\n                                                 ';
if(item.addedUsers.length < 2){;
__p += '\r\n                                                     ';
 _.each(item.addedUsers, function(user){ ;
__p += '\r\n                                                         <div class="tf-images">\r\n                                                             <img src="' +
((__t = (user.profile_pic_url)) == null ? '' : __t) +
'" alt="pic">\r\n                                                         </div>\r\n                                                         <div class="time">\r\n                                                             <div>' +
((__t = (sb.timeFormat(user.created_date,true,true))) == null ? '' : __t) +
'</div>\r\n                                                             <div>@' +
((__t = ( sb.getTime(user.created_date))) == null ? '' : __t) +
'</div>\r\n                                                         </div>\r\n                                                      ';
});
__p += '\r\n                                                  ';
}else{;
__p += '\r\n                                                      ';
var count = 0;
__p += '\r\n                                                      ';
 _.each(item.addedUsers, function(user){ ;
__p += '\r\n                                                          ';
count++;
__p += '\r\n                                                          ';
if(count <= 1){;
__p += '\r\n                                                              <div class="tf-images">\r\n                                                                  <img src="' +
((__t = (user.profile_pic_url)) == null ? '' : __t) +
'" alt="pic">\r\n                                                              </div>\r\n                                                          ';
}else{;
__p += '\r\n                                                              ';
return false;
__p += '\r\n                                                          ';
};
__p += '\r\n                                                      ';
});
__p += '\r\n                                                      ';
if(item.addedUsers.length > 1){;
__p += '\r\n                                                          <div class="time"> + ' +
((__t = (item.addedUsers.length - 1)) == null ? '' : __t) +
' more</div>\r\n                                                      ';
};
__p += '\r\n                                                  ';
};
__p += '\r\n                                             </div>\r\n                                         </div>\r\n                                     </div>\r\n                                ';
 } else if(item.type === "userRemoved") {;
__p += '\r\n                                     <div class="user-type ">\r\n                                         <svg><use xlink:href="#user-removed"></use></svg>\r\n                                         <div class="top-hover-viewer">\r\n                                             <div class="type-content">\r\n                                                 <img src="' +
((__t = (item.profile_pic_url)) == null ? '' : __t) +
'" alt="pic">\r\n                                                 <div class="time">\r\n                                                     <div>' +
((__t = (sb.timeFormat(item.created_date,true,true))) == null ? '' : __t) +
'</div>\r\n                                                     <div>@' +
((__t = ( sb.getTime(item.created_date))) == null ? '' : __t) +
'</div>\r\n                                                 </div>\r\n                                             </div>\r\n                                         </div>\r\n                                     </div>\r\n                                ';
 } else if(item.type === "comments") {;
__p += '\r\n                                <div class="comment-type ">\r\n                                    <div class="rr-comment">\r\n                                        <svg><use xlink:href="#baloon"></use></svg>\r\n                                        <div class="rr-comment-count">1</div>\r\n                                    </div>\r\n                                    <div class="top-hover-viewer">\r\n                                        <div class="type-content">\r\n                                            <img src="' +
((__t = (item.profile_pic_url)) == null ? '' : __t) +
'" alt="pic">\r\n                                            <div class="time">\r\n                                                <div>' +
((__t = (sb.timeFormat(item.created_date,true,true))) == null ? '' : __t) +
'</div>\r\n                                                <div>@' +
((__t = ( sb.getTime(item.created_date))) == null ? '' : __t) +
'</div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                ';
 };
__p += '\r\n                            ';
 }) ;
__p += '</%>\r\n                        <!-- ';
_.each(data.timeline[v], function(item) {;
__p += '\r\n                            </div>\r\n                        ';
 }) ;
__p += '</%> -->\r\n                        <div class="time-frame-date">' +
((__t = ( sb.timeFormat(v+" 00:00:00", true, true))) == null ? '' : __t) +
'</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    ';
 } ;
__p += '\r\n';
 } ;
__p += '\r\n';

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
(window['templates'] = window['templates'] || {})['version'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="summary-version-item">\r\n    <label class="checkbox">\r\n        <input type="checkbox"></input>\r\n        <span>\r\n            <span class="version-type">v' +
((__t = (data.version_no )) == null ? '' : __t) +
'</span>\r\n            <div class="doc-type" title="' +
((__t = ( data.artefact_name )) == null ? '' : __t) +
'">' +
((__t = ( data.artefact_name )) == null ? '' : __t) +
'</div>\r\n        </span>\r\n    </label>\r\n    <div class="summary-version-date">\r\n        <span>' +
((__t = ( sb.timeFormat(data.created_date, true))) == null ? '' : __t) +
'</span>\r\n        <a class="page-click" href="#documentview/' +
((__t = ( data['masked_artefact_version_id'] )) == null ? '' : __t) +
'">Open</a>\r\n    </div>\r\n</div>\r\n';

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

 if(data.picture !== "ui/assets/imgs/avatar.svg"){ ;
__p += '\r\n\t<img width="50" height="50" src="' +
((__t = ( data.picture )) == null ? '' : __t) +
'"/>\r\n';
 } else { ;
__p += '\r\n\t<svg width="50" height="50"><use xlink:href="#avatar"></use></svg>\r\n';
 } ;
__p += '\r\n<div class="sub-menu-holder right-nav bottom-nav">\r\n    <div class="sub-menu-item hide">Profile</div>\r\n    <div class="sub-menu-item hide">Settings</div>\r\n    <div class="separator  hide"></div>\r\n    <a href="?logout" class="sub-menu-item">Log Out</a>\r\n</div>\r\n';

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
(window['templates'] = window['templates'] || {})['search-result'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<a href="' +
((__t = ( Kenseo.controllers.Search.getSuggestionItemPaths(data) )) == null ? '' : __t) +
'">\r\n    <div class="result-icon">\r\n        <svg>\r\n            <use xlink:href="#search-' +
((__t = ( data.type )) == null ? '' : __t) +
'"></use>\r\n        </svg>\r\n    </div>\r\n    <div class="search-title">\r\n       ' +
((__t = ( data.name )) == null ? '' : __t) +
' \r\n    </div>\r\n</a>\r\n\r\n';

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
__p += '\r\n';

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
__p += '<div class="search-section">\r\n    ' +
((__t = ( sb.setTemplate('popup-header', { title:'Search', close: true }) )) == null ? '' : __t) +
'\r\n    <form class="input-field">\r\n    \t<svg class="search-svg-icon"><use xlink:href="#search"></use></svg>\r\n        <input class="custom-search-field" placeholder="Search all" type="text"></input>\r\n    </form>\r\n    <div class="search-results">\r\n    </div>\r\n</div>\r\n';

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
(window['templates'] = window['templates'] || {})['activity'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


	var svgicons = {
		"add-user": "#add-people",
		"share-artefact": "#add-people",
		"approve-artefact": "#file12",
		"add-artefact": "#addfile",
		"comment-artefact": "#icon15",
		"add-meeting": "#icon4",
		"remove-user": "#user-removed"
	}
;
__p += '\r\n';
 var activityTypeX = data['notification_type'].toLowerCase() + "-" + data['notification_on'].toLowerCase() ;
__p += '\r\n<div class="activity-left">\r\n    <div class="activity-icon">\r\n        <svg><use xlink:href="' +
((__t = ( svgicons[activityTypeX] )) == null ? '' : __t) +
'"></use></svg>\r\n    </div>\r\n</div>\r\n<div class="activity-right">\r\n    <div class="activity-title ellipsis" title="' +
((__t = ( data['notification_name'] )) == null ? '' : __t) +
'">';
 if(data['notification_on'].toLowerCase() === "removed" && data['notification_name'].toLowerCase() === "user"){ ;
__p += '\r\n            ' +
((__t = ( data['notification_on'] )) == null ? '' : __t) +
' ' +
((__t = ( data['notification_name'] )) == null ? '' : __t) +
'\r\n        ';
 } else { ;
__p += '\r\n            ' +
((__t = ( data['notification_name'] )) == null ? '' : __t) +
'\r\n        ';
 } ;
__p += '\r\n    </div>\r\n    <div class="activity-details ellipsis" title="' +
((__t = ( data['notifier_name'] )) == null ? '' : __t) +
'">\r\n        <div class="activity-time">' +
((__t = ( sb.timeFormat(sb.addTimeZoneToDate(data.time)) )) == null ? '' : __t) +
'</div>\r\n        <div class="activity-sender"> by ' +
((__t = ( data['notifier_name'] )) == null ? '' : __t) +
'</div>\r\n    </div>\r\n</div>\r\n';

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
__p += '\r\n<div data-pass="';
 (function () {
            if (dataComparer == data.linkedId) {
                dataComparer = data.linkedId;
                return 1;
            } else {
                dataComparer = data.linkedId;
                return 0;
            }
        })() ;
__p += '">\r\n\t<div class="rr-left">\r\n\t\t<div class="rr-status rr-status-' +
((__t = ( data['artefact_version_state'] )) == null ? '' : __t) +
'">\r\n\t\t\t<span class="rr-doc-type">';
 if(data['artefact_type']){  ;
__p +=
((__t = ( Kenseo.settings.docTypeShort[data['artefact_type']] )) == null ? '' : __t);
 } ;
__p += '</span>\r\n\t\t\t<!-- based on the type of document svg changes accrodingly.. -->\r\n\t\t\t<svg><use xlink:href="#' +
((__t = (data['artefact_type'])) == null ? '' : __t) +
'"></use></svg>\r\n\t\t</div>\r\n        ';
 if(data['user_image'] !== "ui/assets/imgs/avatar.svg"){ ;
__p += '\r\n            <img class="rr-owner-image" title="' +
((__t = ( data['user_name'] )) == null ? '' : __t) +
'" src="' +
((__t = ( data['user_image'] )) == null ? '' : __t) +
'"/>\r\n        ';
 } else { ;
__p += '\r\n            <svg class="rr-owner-image" title="' +
((__t = ( data['user_name'] )) == null ? '' : __t) +
'"><use xlink:href="#avatar"></use></svg>\r\n        ';
 } ;
__p += '\r\n\t</div>\r\n\t<div class="rr-right">\r\n\t\t<a ';
 if(isSupportedFile){ ;
__p += 'href="#documentview/' +
((__t = ( data.masked_artefact_version_id )) == null ? '' : __t) +
'"';
 } else{ ;
__p += ' style="cursor:default;" ';
 } ;
__p += '>\r\n\t\t<div class="rr-title ellipsis" title="' +
((__t = ( data['artefact_name'] )) == null ? '' : __t);
 if(!isSupportedFile){ ;
__p += ' - Unsupported format';
 } ;
__p += '" data-id= "' +
((__t = (data['artefact_id'])) == null ? '' : __t) +
'">' +
((__t = ( data['artefact_name'] )) == null ? '' : __t) +
'</div>\r\n        ';
 if(!data['is_project_page']){ ;
__p += '\r\n        <div class="rr-project-name ellipsis">' +
((__t = ( data['project_name'] )) == null ? '' : __t) +
'</div>\r\n        ';
 } ;
__p += '\r\n        ';
 var time = sb.timeFormat(sb.addTimeZoneToDate(data['artefact_activity_date'])) ;
__p += '\r\n\t\t<div class="rr-details ellipsis" title="' +
((__t = ( time )) == null ? '' : __t) +
' by ' +
((__t = ( data['user_name'] )) == null ? '' : __t) +
'">' +
((__t = ( time )) == null ? '' : __t) +
' by ' +
((__t = ( data['user_name'] )) == null ? '' : __t) +
'</div>\r\n\t\t</a>\r\n\t\t<div class="rr-state-details">\r\n\t\t\t<div class="rr-state">\r\n\t\t\t\t<div class="artefact-cur-version html-click" data-url="version-summary">v' +
((__t = ( data.version )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t';
if(data.version>1) { ;
__p += '\r\n\t\t\t\t\t<div class="rr-other-versions">\r\n\t\t\t\t\t\t<div class="version-summary-section">\r\n\t\t\t\t\t\t\t';
 for(var i = data.versionSummary.length-2, count = 0; i>=0; i--){ ;
__p += '\r\n\t\t\t\t\t\t\t\t';
 if(count === 0) { ;
__p += '\r\n\t\t\t\t\t\t\t\t\t<span class="version-summary">\r\n\t\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t\t\t\t';
var currentDate = sb.timeFormat(sb.addTimeZoneToDate(new Date()),true,true);;
__p += '\r\n\t\t\t\t\t\t\t\t\t';
var createdDate = sb.timeFormat(sb.addTimeZoneToDate(data.versionSummary[i].createdDate),true,true);;
__p += '\r\n\t\t\t\t\t\t\t\t\t';
if(currentDate === createdDate){;
__p += '\r\n\t\t\t\t\t\t\t\t\t';
	var dispalyDate = sb.timeFormat(sb.addTimeZoneToDate(data.versionSummary[i].createdDate),true,false);;
__p += '\r\n\t\t\t\t\t\t\t\t\t';
} else {;
__p += '\r\n\t\t\t\t\t\t\t\t\t';
	var dispalyDate = createdDate;;
__p += '\r\n\t\t\t\t\t\t\t\t\t';
};
__p += '\r\n\t\t\t\t\t\t\t\t\t<a ';
 if(isSupportedFile){ ;
__p += 'href="#documentview/' +
((__t = ( data.versionSummary[i].masked_artefact_version_id )) == null ? '' : __t) +
'"';
 } else{ ;
__p += ' style="cursor:default;" ';
 } ;
__p += '>\r\n\t\t\t\t\t\t\t\t\t<span data-date="' +
((__t = ( dispalyDate )) == null ? '' : __t) +
'">v' +
((__t = (data.versionSummary[i].versionNo )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t\t\t\t';
 count++; ;
__p += '\r\n\t\t\t\t\t\t\t\t';
 if(count === 3 || i === 0) {;
__p += '\r\n\t\t\t\t\t\t\t\t\t';
count=0;;
__p += '\r\n\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t';
};
__p += '\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t<div class="rr-comment">\r\n\t\t\t\t\t<svg><use xlink:href="#baloon"></use></svg>\r\n\t\t\t\t\t<div class="rr-comment-count">' +
((__t = ( data.comment_count )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="requests-dropdown html-click prevent-default" data-html-class="active">\r\n\t\t<div class="requests-dropdown-icon">\r\n\t\t\t<svg><use xlink:href="#dropdown"></use></svg>\r\n\t\t</div>\r\n\t\t<div class="requests-dropdown-items sub-menu-holder small">\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="archive-artefact">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#archive1"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Archive</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="replace-artefact">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg fill="#DBDCE0"><use xlink:href="#replace"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div  class="sub-menu-item-text">Replace</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="add-version">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#addversion"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Add Version</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="share-artefact" data-index="2">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#share"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Share</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="submit-artefact?artefactVersionId=' +
((__t = ( data.artefact_version_id )) == null ? '' : __t) +
'">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg fill="#DBDCE0"><use xlink:href="#submit-review"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Submit Review Comments</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="private-message">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg fill="#DBDCE0"><use xlink:href="#meeting"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Send Private Message</div>\r\n\t\t\t</div>\r\n            <div class="sub-menu-item popup-click" data-url="create-meeting" data-others="populate">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg fill="#DBDCE0"><use xlink:href="#meeting"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Create a Meeting</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="edit-artefact-info">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg><use xlink:href="#editartifact"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Edit Info</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="rename-artefact">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg fill="#DBDCE0"><use xlink:href="#renameartifact"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Rename</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="download-artefact">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg fill="#DBDCE0"><use xlink:href="#renameartifact"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text"> <a class="stop-propagate" href="' +
((__t = (sb.getRelativePath('download.php?command=downloadArtefact&artefact_id='+data['artefact_id']))) == null ? '' : __t) +
'" target="_blank" > Download </a> </div>\r\n\t\t\t</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="delete-artefact">\r\n\t\t\t\t<div class="item-icon">\r\n\t\t\t\t\t<svg fill="#DBDCE0"><use xlink:href="#delete"></use></svg>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item-text">Delete </div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n';

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
(window['templates'] = window['templates'] || {})['db-notification'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var mime = data.MIME_type || "" ;
__p += '\r\n';
 var isSupportedFile = (mime.indexOf('pdf') > -1 || mime.indexOf('image') > -1) ;
__p += '\r\n<a ';
 if(data['notification_on'] == "meeting"){ ;
__p += 'href="#meetingnotes/' +
((__t = ( data.notification_ref_id )) == null ? '' : __t) +
'" data-url="meeting-notes"';
 } else if(!isSupportedFile){ ;
__p += 'style="cursor: default;"';
} else { ;
__p += 'href="#documentview/' +
((__t = ( data.masked_artefact_version_id )) == null ? '' : __t) +
'"';
 } ;
__p += ' class="notification-item">\r\n    ';
 if(data['notification_on'] == "meeting"){ ;
__p += '\r\n        <div class="notification-meeting-icon">\r\n            <svg><use xlink:href="#calendar"></use></svg>\r\n        </div>\r\n    ';
 } else if(data['notification_on'] == "comment") { ;
__p += '\r\n        <div class="notification-comment-icon">\r\n            <svg><use xlink:href="#baloon1"></use></svg>\r\n        </div>\r\n    ';
 } else if(data['notification_on'] == "artefact"){ ;
__p += '\r\n        <div class="notification-file-icon">\r\n            <svg><use xlink:href="#file"></use></svg>\r\n        </div>\r\n    ';
 } ;
__p += '\r\n    <div class="notification-title" title="' +
((__t = ( data.notification_name )) == null ? '' : __t);
 if(!isSupportedFile && !(data['notification_on'] == "meeting")){ ;
__p += ' - Unsupported format';
 } ;
__p += '">\r\n        ' +
((__t = ( data.notification_name )) == null ? '' : __t) +
'\r\n    </div>\r\n    <div class="notification-time">\r\n        ' +
((__t = ( sb.timeFormat(sb.addTimeZoneToDate(data.time)) )) == null ? '' : __t) +
' by ' +
((__t = ( data.notifier_name )) == null ? '' : __t) +
'\r\n    </div>\r\n    ';
 if(data.meetingDetails){ ;
__p += '\r\n        ';
 if(data.fromMenu){ ;
__p += '\r\n            <div class="meeting-notify-section">\r\n                <div class="mn-left">\r\n                    <div>' +
((__t = ( sb.timeFormat(data.meetingDetails.time) + ", " +sb.getTime(data.meetingDetails.time) )) == null ? '' : __t) +
'</div>\r\n                    <div class="meeting-notify-icon"></div>\r\n                    <div class="clock-icon" title = "' +
((__t = ( sb.timeFormat(data.meetingDetails.time) + ", " +sb.getTime(data.meetingDetails.time) )) == null ? '' : __t) +
'"><svg><use xlink:href="#clock"></use></svg></div>\r\n                </div>\r\n            </div>\r\n        ';
 } else {;
__p += '\r\n            <div class="meeting-notify-section">\r\n                <div class="mn-left">\r\n                    <div>Meeting @ Conference 2</div>\r\n                    <div class="mn-left-title">' +
((__t = ( data.meetingDetails.title )) == null ? '' : __t) +
'</div>\r\n                    <div class="meeting-notify-icon"></div>\r\n                    <div class="clock-icon" title = "' +
((__t = ( sb.timeFormat(data.meetingDetails.time) + ", " +sb.getTime(data.meetingDetails.time) )) == null ? '' : __t) +
'"><svg><use xlink:href="#clock"></use></svg></div>\r\n                </div>\r\n                <div class="mn-right">\r\n                    <div>' +
((__t = ( sb.timeFormat(data.meetingDetails.time) )) == null ? '' : __t) +
'</div>\r\n                    <div>' +
((__t = ( sb.getTime(data.meetingDetails.time) )) == null ? '' : __t) +
'</div>\r\n                </div>\r\n            </div>\r\n        ';
 } ;
__p += '\r\n    ';
 } ;
__p += '\r\n</a>\r\n';

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
(window['templates'] = window['templates'] || {})['no-documentview'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p> Can\'t view unsupported format</p>\r\n\r\n<div class="sub-menu-item-text"> \r\n    <a class="main-btn stop-propagate" href="' +
((__t = (sb.getRelativePath('download.php?command=downloadArtefact&artefact_id='+data.artefactId))) == null ? '' : __t) +
'" target="_blank" > Download </a> \r\n</div>';

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
((__t = ( sb.timeFormat(sb.addTimeZoneToDate(n.time)) )) == null ? '' : __t) +
' by ' +
((__t = ( n.notifier )) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t\t';
 if(n.meetingDetails){ ;
__p += '\r\n\t\t\t<div class="meeting-notify-section">\r\n\t\t\t\t<div class="mn-left">\r\n\t\t\t\t\t<div>Meeting @ Conference 2</div>\r\n\t\t\t\t\t<div class="mn-left-title">' +
((__t = ( n.meetingDetails.title )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t<div class="meeting-notify-icon"></div>\r\n\t\t\t\t\t<div class="clock-icon"><svg><use xlink:href="#clock"></use></svg></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="mn-right">\r\n\t\t\t\t\t';
 var newDate = sb.addTimeZoneToDate(n.meetingDetails.time) ;
__p += '\r\n\t\t\t\t\t<div>' +
((__t = ( sb.timeFormat(newDate) )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t\t<div>' +
((__t = ( sb.getTime(newDate) )) == null ? '' : __t) +
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
 if(data.picture !== "ui/assets/imgs/avatar.svg"){ ;
__p += '\r\n\t\t<img class="people-icon" src="' +
((__t = ( data.picture )) == null ? '' : __t) +
'" />\r\n\t';
 } else { ;
__p += '\r\n\t\t<svg class="people-icon"><use xlink:href="#avatar"></use></svg>\r\n\t';
 } ;
__p += '\r\n</div>\r\n<div class="people-item-right">\r\n\t<div class="people-name-section data-holder" data-k-project_id="' +
((__t = ( data['proj_id'] )) == null ? '' : __t) +
'" data-key="people" data-id="' +
((__t = ( data.id )) == null ? '' : __t) +
'">\r\n\t\t<div class="people-name inlineBlockTop">' +
((__t = ( data.name )) == null ? '' : __t) +
'</div>\r\n\t\t<div class="people-request-holder html-click sub-menu-nav inlineBlockTop">\r\n\t\t\t<div class="requests-dropdown-icon">\r\n\t\t\t\t<svg><use xlink:href="#dropdown"></use></svg>\r\n\t\t\t</div>\r\n\t\t\t';
 var key;
			   for (var k in Kenseo.settings.accesstype) {
				    if (Kenseo.settings.accesstype[k] == data.access_type) {
	                    key = k;
	                }
	            }
            var permission = key.split(""); ;
__p += '\r\n\r\n\t\t\t<div class="sub-menu-holder left-nav bottom-nav">\r\n\t\t\t\t<div class="sub-menu-item">\r\n\t\t\t\t\t<div class="sub-menu-item-text">Share</div>\r\n\t\t\t\t\t<div class="checkbox-holder sub-menu-checkbox">\r\n\t\t\t\t\t\t<label class="toggle-checkbox" >\r\n\t\t\t\t\t\t\t<input type="checkbox" class="global-permissions" person-permissions="share-permissions" trigger-chk=".add-comments-chk" data-subtype="comments" ';
 if(permission[1] == 1){;
__p += ' checked ';
};
__p += ' ></input><span></span>\r\n\t\t\t\t\t\t</label>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="sub-menu-item">\r\n\t\t\t\t\t<div class="sub-menu-item-text">Comment</div>\r\n\t\t\t\t\t<div class="checkbox-holder sub-menu-checkbox">\r\n\t\t\t\t\t\t<label class="toggle-checkbox" >\r\n\t\t\t\t\t\t\t<input type="checkbox" class="global-permissions" person-permissions="comment-permissions" trigger-chk=".others-chk" data-subtype="share" ';
 if(permission[0] == 1){;
__p += ' checked ';
};
__p += ' ></input><span></span>\r\n\t\t\t\t\t\t</label>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t';
 if(data['is_owner'] != "1") {;
__p += '\r\n\t\t\t\t<div class="sub-menu-item" data-url="removePeople" data-id="' +
((__t = ( data.id )) == null ? '' : __t) +
'" >\r\n\t\t\t\t\t<div class="sub-menu-item-text">Remove</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t';
};
__p += '\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="people-access-text">';
 if(data['access_type']=="X"){;
__p += '\r\n\tCan Edit &amp; Share ';
} else if(data['access_type']=='S'){;
__p += '\r\n\tCan Share ';
} else {;
__p += ' Can Edit';
};
__p += '</div>\r\n</div>\r\n';

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
__p += '\r\n';
 var metaInfo = sb.getPopupMetaInfo(dump) ;
__p += '\r\n';
 if(data.project){ ;
__p += '\r\n\t<div class="meta-item">\t\r\n\t\t<div class="meta-heading">Under</div>\r\n\t\t<div class="meta-text popup-meta-project-name-txt title-txt" title="' +
((__t = ( metaInfo.getProjectName() )) == null ? '' : __t) +
'"></div>\r\n\t</div>\r\n';
 } ;
__p += '\r\n';
 if(data.file){ ;
__p += '\r\n\t<div class="meta-item">\t\r\n\t\t<div class="meta-heading">File</div>\t\r\n\t\t<div class="meta-text popup-meta-file-name title-txt" title="' +
((__t = ( metaInfo.getFileName() )) == null ? '' : __t) +
'">\r\n\t\t</div>\r\n\t</div>\r\n';
 } ;
__p += '\r\n';
 if(data.type){ ;
__p += '\r\n\t<div class="meta-item">\r\n\t\t<div class="meta-heading">Type</div>\r\n\t\t';
 if(dump.doctype || dump.document_type){ ;
__p += '\t\t\t\r\n\t\t<div class="meta-text popup-meta-type title-txt" title="' +
((__t = ( metaInfo.getType() )) == null ? '' : __t) +
'"></div>\r\n\t\t';
 } ;
__p += '\r\n\t</div>\r\n';
 } ;
__p += '\r\n';
 if(data.references){ ;
__p += '\r\n\t<div class="meta-item">\t\r\n\t\t<div class="meta-heading">References</div>\t\r\n\t\t';
 if(dump.references){ ;
__p += '\t\t\r\n\t\t<div class="meta-text title-txt popup-meta-references" title="' +
((__t = ( metaInfo.getReferences() )) == null ? '' : __t) +
'"></div>\t\r\n\t\t';
 } ;
__p += '\r\n\t</div>\r\n';
 } ;
__p += '\r\n';
 if(data.tags){ ;
__p += '\r\n\t<div class="meta-item">\t\r\n\t\t<div class="meta-heading">Tags</div>\t\r\n\t\t';
 if(dump.tags){ ;
__p += '\t\t\t\r\n\t\t<div class="meta-text popup-meta-tags title-txt" title="' +
((__t = ( metaInfo.getTags() )) == null ? '' : __t) +
'"></div>\r\n\t\t';
 } ;
__p += '\t\r\n\t</div>\r\n';
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
(window['templates'] = window['templates'] || {})['share-file'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="to-share-file" data-k-id ="' +
((__t = ( data.artefact_id )) == null ? '' : __t) +
'" data-k-versionid ="' +
((__t = ( data.artefact_version_id )) == null ? '' : __t) +
'" data-k-artafactname ="' +
((__t = ( data.artefact_name )) == null ? '' : __t) +
'" data-html-outside-click="false">\r\n\t<div class="to-share-filetype" >';
if(data.artefact_type == 'U'){;
__p += ' UID ';
} else if(data.artefact_type == 'I') {;
__p += ' IXD ';
} else if(data.artefact_type == 'P') {;
__p += ' P ';
} else if(data.artefact_type == 'IA') {;
__p += ' IA ';
};
__p += ' </div>\r\n\t<div class="to-share-filename">' +
((__t = ( data.artefact_name )) == null ? '' : __t) +
'</div>\r\n\t<div class="to-share-fileversion version-num">v' +
((__t = ( data.version_no)) == null ? '' : __t) +
'</div>\r\n\t<div><input type="checkbox" class="is-shared"></div>\r\n</div>\r\n';

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
'">\r\n\t<div class="share-artefacts-img-holder">\r\n\t\t';
 if(data.picture !== "ui/assets/imgs/avatar.svg"){ ;
__p += '\r\n\t\t\t<img class="share-artefacts-img" src=' +
((__t = ( data.picture)) == null ? '' : __t) +
' />\r\n\t\t';
 } else { ;
__p += '\r\n\t\t\t<svg class="share-artefacts-img"><use xlink:href="#avatar"></use></svg>\r\n\t\t';
 } ;
__p += '\r\n\t</div>\r\n\t<span class="share-artefacts-text" title="' +
((__t = ( data.name )) == null ? '' : __t) +
'">' +
((__t = ( data.name )) == null ? '' : __t) +
'</span>\r\n\t';
 if(data['is_owner'] != "1"){ ;
__p += '\r\n\t\t<div class="share-artefact-people-item-section">\r\n\t\t\t<div class="share-artefact-right-panel">\r\n\t\t\t\t' +
((__t = (
					sb.toolbox.checkbox({
						class: "add-comments-chk",
						toggle: true,
						dataName: "sharedTo",
						checked: !!+accessType[0],
						"data-array": "1"
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t\t<div class="sarp-text">Comment</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="share-artefact-right-panel">\r\n\t\t\t\t' +
((__t = (
					sb.toolbox.checkbox({
						class: "others-chk",
						toggle: true,
						dataName: "sharedTo",
						checked: !!+accessType[1],
						"data-array": "1"
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t\t<div class="sarp-text">Share</div>\r\n\t\t\t</div>\r\n\r\n\t\t</div>\r\n\t\t<div class="close-people-icon">\r\n\t\t\t<svg>\r\n\t\t\t\t<use xlink:href="#close"></use>\r\n\t\t\t</svg>\r\n\t\t</div>\r\n\t';
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
(window['templates'] = window['templates'] || {})['meetingnotes'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 Kenseo.populate.meeting = data ;
__p += '\r\n<div class="meeting-section">\r\n    <div class="project-heading">\r\n        <div class="projects-heading-icon">\r\n            <svg><use xlink:href="#projects"></use></svg>\r\n        </div>\r\n        <a href="#projects" class="heading-text-project">Projects &gt; </a>\r\n        <a href="#projectpage/' +
((__t = ( data.project_id )) == null ? '' : __t) +
'" class="heading-text-project-name">' +
((__t = ( data.project_name )) == null ? '' : __t) +
'</a>\r\n        <span class="heading-date">(' +
((__t = ( sb.timeFormat(data.startTime, true, true ,true) )) == null ? '' : __t) +
')</span>\r\n        <div class="meeting-update-btn-holder">\r\n            <div class="popup-click meeting-update-button" data-url="update-meeting" data-others="populate">Update</div>\r\n        </div>\r\n    </div>\r\n    <div class="meeting-wrapper">\r\n        <div class="meeting-left-section">\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Under</div>\r\n                <div class="meta-text">' +
((__t = ( data.project_name )) == null ? '' : __t) +
'</div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Artefact</div>\r\n                <div class="meta-text">' +
((__t = ( data.artefact_name )) == null ? '' : __t) +
'</div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Sender</div>\r\n                <div class="meta-text">' +
((__t = ( data.created_by )) == null ? '' : __t) +
'</div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Agenda</div>\r\n                <div class="meta-text">' +
((__t = ( data.agenda )) == null ? '' : __t) +
'</div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Scheduled On</div>\r\n                <div class="meta-text">\r\n                    <div>' +
((__t = ( sb.timeFormat(data.meeting_date, true, true, true) )) == null ? '' : __t) +
'</div>\r\n                    <div>' +
((__t = ( sb.convertToAMPM(data.meeting_date_from_time) )) == null ? '' : __t) +
' to ' +
((__t = ( sb.convertToAMPM(data.meeting_date_to_time) )) == null ? '' : __t) +
'</div>\r\n                </div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Venue</div>\r\n                <div class="meta-text">' +
((__t = ( data.venue )) == null ? '' : __t) +
'</div>\r\n            </div>\r\n            <div class="meta-item">\r\n                <div class="meta-heading">Recipients</div>\r\n                ';
 _.each(data.participants, function(p){ ;
__p += '\r\n                <div class="meta-text">' +
((__t = ( p.participentName )) == null ? '' : __t) +
'</div>\r\n\t\t\t\t';
 }); ;
__p += '\r\n            </div>\r\n        </div>\r\n        <div class="meeting-right-section">\r\n            <div class="meeting-people-section">\r\n                <div class="meeting-people-active">\r\n                \t<div class=\'currentPersonNotes acitiveNotesPartcipant\' data-user="' +
((__t = ( data.participant_id )) == null ? '' : __t) +
'">\r\n\t                    <div class="people-img-wrapper">\r\n\t                        <img src="' +
((__t = (data.participant_pic)) == null ? '' : __t) +
'" />\r\n\t                    </div>\r\n\t                    <span class="meeting-people-name">\r\n\t                        ' +
((__t = (data.participant_name)) == null ? '' : __t) +
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
((__t = (data.participant_id)) == null ? '' : __t) +
'>\r\n                        <img src="' +
((__t = (data.participant_pic)) == null ? '' : __t) +
'" />\r\n                    </div>\r\n                    <div class="v-separator"></div>\r\n                    ';
 _.each(data.notes, function(p){ ;
__p += '\r\n                    <div class="people-img-wrapper participant" data-user=' +
((__t = (p.userId)) == null ? '' : __t) +
'>\r\n                        <img src="' +
((__t = (p.profilePic)) == null ? '' : __t) +
'" />\r\n                    </div>\r\n                    ';
 }); ;
__p += '\r\n                </div>\r\n            </div>\r\n            <div class="text-editor-section">\r\n                <div class="text-actions-section">\r\n                    <button name="text-b" text-name="bold">Bold</button>\r\n                    <button name="text-i" text-name="italic">Italic</button>\r\n                    <button name="text-u" text-name="underline">Underline</button>\r\n                </div>\r\n                <div class="text-editor view-notes selectedNotes" contenteditable=true data-user="' +
((__t = ( data.participant_id )) == null ? '' : __t) +
'">\r\n                \t' +
((__t = (data.user_notes)) == null ? '' : __t) +
'\r\n                </div>\r\n                ';
 _.each(data.notes, function(p){ ;
__p += '\r\n            \t\t<div class="view-notes" data-user="' +
((__t = ( p.userId )) == null ? '' : __t) +
'" >\r\n            \t\t\t' +
((__t = ( p.notes)) == null ? '' : __t) +
'\r\n        \t\t\t</div>\r\n            \t';
 }); ;
__p += '\r\n\r\n            </div>\r\n            <label class="checkbox">\r\n                <input class="existing-files-chk" type="checkbox">\r\n                <span>Let others see my notes</span>\r\n            </label>\r\n            <button class="add-meeting-notes main-btn done-btn">Add notes</button>\r\n        </div>\r\n    </div>\r\n</div>';

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
 if(data.picture !== "ui/assets/imgs/avatar.svg"){ ;
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
((__t = ( p.project_id )) == null ? '' : __t) +
'" class="projects-img-dv">\r\n    ';
 var dummyImage = "http://placeimg.com/280/200/arch" ;
__p += '\r\n    <img src="' +
((__t = ( p.intro_image_url || dummyImage )) == null ? '' : __t) +
'" class="menu-project-img" />\r\n    <span class="projects-img-dv-txt">' +
((__t = ( p.project_name )) == null ? '' : __t) +
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
__p += '\r\n<div class="menu-recent-people-cnt" title="' +
((__t = (p.name)) == null ? '' : __t) +
'">\r\n\t';
 if(p.picture == "ui/assets/imgs/avatar.svg"){ ;
__p += '\r\n\t\t<svg class="menu-people-img"><use xlink:href="#avatar" class="menu-people-img"></use></svg>\r\n    ';
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
__p += '\r\n<!-- Menu Header -->\r\n<div class="menu-header">\r\n\r\n</div>\r\n\r\n<!-- Menu Projects Container -->\r\n<div class="menu-projects-container">\r\n   <p class="projects-hd"><a style="color: inherit;font-size: 0.8em;text-decoration: none;" href="#projects">Projects</a></p>\r\n   <div class="menu-projects-section">\r\n\r\n   </div>\r\n</div>\r\n\r\n<!-- Menu Recent -->\r\n<div class="menu-recent">\r\n\r\n    <div class="menu-recent-activity">\r\n \t\t<p class="recent-hd">Recent Artefacts</p>\r\n \t\t<div class="menu-recent-activity-section">\r\n\r\n \t\t</div>\r\n    </div>\r\n    <div class="menu-recent-requests">\r\n        <p class="recent-hd">Shared Artefacts</p>\r\n        <div class="menu-recent-requests-section">\r\n\r\n        </div>\r\n    </div>\r\n    <div class="menu-recent-notifications">\r\n    \t<p class="notifications-hd">Notifications</p>\r\n    \t<div class="menu-recent-notifications-section">\r\n\r\n    \t</div>\r\n    </div>\r\n    <div class="menu-recent-people">\r\n   \t\t<p class="people-hd">People</p>\r\n   \t\t<div class="menu-recent-people-section">\r\n\r\n   \t\t</div>\r\n    </div>\r\n</div>\r\n\r\n<!-- Menu End -->\r\n';

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
__p += '<div class="toolbar-slider summary-section-overlay view">\r\n    <div class="summary-section-header">\r\n        <div class="summary-header-left">\r\n            <div class="review-request-item" >\r\n                <div class="rr-left">\r\n                    ';
var categories = Kenseo.settings.docTypeShort ;
__p += '\r\n                    <div class="rr-status ellipsis status-' +
((__t = ( data.basicDetails.status )) == null ? '' : __t) +
'">' +
((__t = (categories[data.basicDetails.artefact_type])) == null ? '' : __t) +
'</div>\r\n                    <img class="rr-owner-image" title="' +
((__t = (data.basicDetails.authorName )) == null ? '' : __t) +
'" src="' +
((__t = ( data.basicDetails.authorImage )) == null ? '' : __t) +
'"/>\r\n                </div>\r\n                <div class="rr-right">\r\n                    <div class="rr-title ellipsis" title="' +
((__t = ( data.basicDetails.artefact_title )) == null ? '' : __t) +
'">' +
((__t = ( data.basicDetails.artefact_title )) == null ? '' : __t) +
'</div>\r\n                    <div class="rr-details ellipsis" title="Version ' +
((__t = (data.basicDetails.versionNo)) == null ? '' : __t) +
'.0">Version ' +
((__t = (data.basicDetails.versionNo)) == null ? '' : __t) +
'.0</div>\r\n                    <div class="rr-state-details">\r\n                        <div class="rr-state-x">\r\n                            <div class="rr-comment">\r\n                                <svg><use xlink:href="#baloon"></use></svg>\r\n                                <div class="rr-comment-count">' +
((__t = ( data.basicDetails['comment_count'] )) == null ? '' : __t) +
'</div>\r\n                            </div>\r\n                            <div class="status-c secondary-status-rr"></div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="summary-header-right">\r\n            <div class="summary-header-actions">\r\n                <div class="summary-header-action-item submit-action-icon popup-click" data-url="share-artefact" data-index="2" ';
 if(data.basicDetails['permission'] === 'R'){ ;
__p += ' title = \'can_not_share\'  disabled = \'disabled\' ';
 } ;
__p += ' >\r\n                    <svg class="summary-header-icon"><use xlink:href="#share-artefact"></use></svg>\r\n                    Share\r\n                </div>\r\n                <div class="summary-header-action-item delete-action-icon" data-url="delete-artefact">\r\n                    <svg fill="#6A6F82" class="summary-header-icon"><use xlink:href="#renameartifact"></use></svg>\r\n                    <div> <a class="stop-propagate" href="' +
((__t = (sb.getRelativePath('download.php?command=downloadArtefact&artefact_id='+data.basicDetails.artefact_id))) == null ? '' : __t) +
'" target="_blank" > Download </a> </div>\r\n                </div>\r\n                <div class="summary-header-action-item archive-action-icon html popup-click" data-url="archive-artefact">\r\n                    <svg class="summary-header-icon" fill="#6A6F82"><use xlink:href="#archive-icn"></use></svg>\r\n                    Archive\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="summary-section-body unselectable">\r\n        <div class="close-icon"><svg><use xlink:href="#close"></use></svg></div>\r\n        <div class="time-frame-section">\r\n            <div class="time-frame-extended mg-parent">\r\n                ' +
((__t = (sb.setTemplate('timeline',{data: data}))) == null ? '' : __t) +
'\r\n            </div>\r\n            <div class="time-frame-selector mg-parent">\r\n                ';
 _.each(data.versions, function(v){ ;
__p += '\r\n                <div class="time-frame-holder mg-holder">\r\n                    <div class="time-selector-item mg-item">\r\n                        <div class="time-frame">\r\n                            <div class="version-type top-viewer">v' +
((__t = ( v.version_no )) == null ? '' : __t) +
'</div>\r\n                            <div class="time-frame-date">' +
((__t = ( sb.timeFormat(v.created_date, true, true))) == null ? '' : __t) +
'</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                ';
 }); ;
__p += '\r\n                <div class="time-frame-holder mg-holder">\r\n                    <div class="time-selector-item mg-item">\r\n                        <div class="time-frame">\r\n                            <div class="current-type top-viewer">\r\n                                <svg><use xlink:href="#currentdate"></use></svg>\r\n                            </div>\r\n                            <div class="time-frame-date">' +
((__t = ( sb.timeFormat(new Date(), true, true))) == null ? '' : __t) +
'</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="slider-component">\r\n                <div class="slider-left"></div>\r\n                <div class="slider-right"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="summary-section-footer">\r\n        <div class="summary-footer-item selected-tab">Summary</div>\r\n        <div class="summary-footer-item">Notes</div>\r\n    </div>\r\n\r\n\r\n    <div class="summary-and-notes-section">\r\n        <div class="summary-section-below-content  data-holder" data-url= "Summary">\r\n            <div class="summary-people-section">\r\n                <div class="sub-heading-section">\r\n                    <div class="artifacts-heading sub-heading">\r\n                        <div class="sub-heading-label">Shared with</div>\r\n                        ';
 if(data.basicDetails['permission'] === 'R'){ ;
__p += '\r\n                            <div class="sub-heading-add-wrapper">\r\n                                <div class="sub-heading-add-icon popup-click" data-url="share-artefact" data-index="2">\r\n                                    <svg><use xlink:href="#add"></use></svg>\r\n                                </div>\r\n                            </div>\r\n                        ';
 } ;
__p += '\r\n                    </div>\r\n                </div>\r\n                <div class="sub-section-content">\r\n                     ';
 _.each(data.sharedTo, function(d){ ;
__p += '\r\n    \t                 <div class="summary-people-item">\r\n    \t                    <div class="sp-left">\r\n                                ';
 if(d.userImage !== "ui/assets/imgs/avatar.svg"){ ;
__p += '\r\n                                    <img title="' +
((__t = ( d.name)) == null ? '' : __t) +
'" src="' +
((__t = ( d.userImage )) == null ? '' : __t) +
'" />\r\n                        \t\t';
 } else { ;
__p += '\r\n                        \t\t\t<svg><use xlink:href="#avatar"></use></svg>\r\n                        \t\t';
 } ;
__p += '\r\n    \t                    </div>\r\n    \t                    <div class="sp-right">\r\n    \t                        <div class="sp-name ellipsis" title"' +
((__t = ( d.name)) == null ? '' : __t) +
'">' +
((__t = ( d.name)) == null ? '' : __t) +
'</div>\r\n    \t                        <div class="sp-below-section">\r\n    \t                            <div class="rr-comment">\r\n                                        <svg><use xlink:href="#baloon"></use></svg>\r\n                                        <div class="rr-comment-count">' +
((__t = ( d['comment_count'] )) == null ? '' : __t) +
'</div>\r\n                                    </div>\r\n    \t                            <div class="status-c secondary-status-rr"></div>\r\n    \t                        </div>\r\n    \t                    </div>\r\n    \t                </div>\r\n                    ';
 }); ;
__p += '\r\n                </div>\r\n            </div>\r\n            <div class="summary-versions-section">\r\n                <div class="sub-heading-section">\r\n                    <div class="sub-heading">\r\n                        <div class="sub-heading-label">Versions</div>\r\n                        ';
 if(data.basicDetails['permission'] === 'R'){ ;
__p += '\r\n                            <div class="sub-heading-add-wrapper">\r\n                                <div class="sub-heading-add-icon popup-click" data-url="add-version">\r\n                                    <svg><use xlink:href="#add"></use></svg>\r\n                                </div>\r\n                            </div>\r\n                        ';
 } ;
__p += '\r\n                    </div>\r\n                </div>\r\n                <div class="sub-section-content versions-content">\r\n                    <a class="summary-compare-btn" href="">Compare selected</a>\r\n\r\n                    <!-- ';
 _.each(data.versions, function(d){ ;
__p += '\r\n                        ';
 if(d.artefact_ver_id !== data.basicDetails.versionId){ ;
__p += '\r\n    \t                <div class="summary-version-item">\r\n    \t                    <label class="checkbox">\r\n    \t                        <input type="checkbox"></input>\r\n    \t                        <span>\r\n    \t                            <span class="version-type">v' +
((__t = (d.version_no )) == null ? '' : __t) +
'</span>\r\n    \t                            <div class="doc-type" title="' +
((__t = ( data.basicDetails.title )) == null ? '' : __t) +
'">' +
((__t = ( data.basicDetails.title )) == null ? '' : __t) +
'</div>\r\n    \t                        </span>\r\n    \t                    </label>\r\n    \t                    <div class="summary-version-date">\r\n                                <span>' +
((__t = ( sb.timeFormat(d.created_date, true))) == null ? '' : __t) +
'</span>\r\n                                <a class="page-click" href="#documentview/' +
((__t = ( d['masked_artefact_version_id'] )) == null ? '' : __t) +
'">Open</a>\r\n                            </div>\r\n    \t                </div>\r\n                        ';
 } ;
__p += '\r\n             \t\t';
 }); ;
__p += ' -->\r\n                </div>\r\n            </div>\r\n            <div class="summary-references-section">\r\n                <div class="sub-heading-section">\r\n                    <div class="sub-heading">\r\n                        <div class="sub-heading-label">References</div>\r\n                        <div class="sub-heading-add-wrapper">\r\n                            <div class="sub-heading-add-icon popup-click" data-url="edit-artefact-info">\r\n                                <svg><use xlink:href="#add"></use></svg>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class="sub-section-content">\r\n                \t';
 _.each(data.references, function(d){ ;
__p += '\r\n    \t                <div class="summary-reference-item ellipsis" title="' +
((__t = ( d.title )) == null ? '' : __t) +
'">\r\n                            <svg class="ref-item-icon"><use xlink:href="#refFile"></use></svg>\r\n    \t                    ' +
((__t = ( d.title )) == null ? '' : __t) +
'\r\n    \t                </div>\r\n                    ';
 }); ;
__p += '\r\n                </div>\r\n                <div class="summary-linked-artefacts-section">\r\n                    <div class="sub-heading-section">\r\n                        <div class="sub-heading">\r\n                            <div class="sub-heading-label">Linked Artefacts</div>\r\n                            <div class="sub-heading-add-wrapper">\r\n                                <div class="sub-heading-add-icon popup-click" data-url="edit-artefact-info">\r\n                                    <svg><use xlink:href="#add"></use></svg>\r\n                                </div>\r\n                            </div>\r\n                            <div class="sub-section-content">\r\n                                ';
 _.each(data.links, function(d){ ;
__p += '\r\n        \t\t\t                <div class="linked-item" title="' +
((__t = ( d.artefact_title )) == null ? '' : __t) +
'">\r\n                                        <svg class="linked-item-icon"><use xlink:href="#linkIcon"></use></svg>\r\n        \t\t\t                    ' +
((__t = ( d.artefact_title )) == null ? '' : __t) +
'\r\n        \t\t\t                </div>\r\n        \t\t                ';
 }); ;
__p += '\r\n        \t                </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="summary-tags-section">\r\n                <div class="sub-heading-section">\r\n                    <div class="sub-heading">\r\n                        <div class="sub-heading-label">Tags</div>\r\n                        <div class="sub-heading-add-wrapper">\r\n                            <div class="sub-heading-add-icon popup-click" data-url="edit-artefact-info">\r\n                                <svg><use xlink:href="#add"></use></svg>\r\n                            </div>\r\n                        </div>\r\n                        <div class="sub-section-content tags-content">\r\n                            <!-- ';
 _.each(data.tags, function(d){ ;
__p += '\r\n                                <div class="tag-item" title="' +
((__t = ( d.tag_name )) == null ? '' : __t) +
'" tag-id="' +
((__t = ( d.tag_id )) == null ? '' : __t) +
'">\r\n                                    ' +
((__t = ( d.tag_name )) == null ? '' : __t) +
'\r\n                                    <div class="close-tag-icon">\r\n                            \t\t\t<svg>\r\n                            \t\t\t\t<use xlink:href="#close"></use>\r\n                            \t\t\t</svg>\r\n                            \t\t</div>\r\n                                </div>\r\n                            ';
 }); ;
__p += ' -->\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="Notes" data-url="Notes">\r\n            No notes to show\r\n        </div>\r\n    </div>\r\n</div>\r\n';

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
__p += '<div class="popup popup-large k-form">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body k-field" data-k-project_id="';
if(Kenseo.popup.data.id){;
__p +=
((__t = ( Kenseo.popup.data.id )) == null ? '' : __t);
} else {;
__p +=
((__t = ( Kenseo.page.id )) == null ? '' : __t);
};
__p += '" data-xtype="get-project-id" data-xtype-key="project-id">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t<!--<div class="add-people-text-project">\r\n\t\t\t\tAdd People\r\n\t\t\t</div>-->\r\n\t\t\t<!--' +
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
'-->\r\n\t\t\t<!--' +
((__t = ( sb.setTemplate('select', {
				data: {
					required: true,
					inputClass: "add-people-to-project k-field people-combobox",
					selectAttr: {
						multiple: "",
						"data-xtype": "text",
						"data-xtype-key": "users",
						"data-validate-this": "empty"
					}
				}
			})	)) == null ? '' : __t) +
'-->\r\n\t\t\t';

			var fields = {
				shareCombo: sb.toolbox.comboBox({
					"label": "Add People",
					"class": "xm people-combobox",
					"dataName": "otherMembers",
					"placeholder": "Add People"
				})
			}
			;
__p += '\r\n\t\t\t' +
((__t = ( fields.shareCombo )) == null ? '' : __t) +
'\r\n\r\n\t\t\t<div class="existing-users-section">\r\n\t\t\t\t';
 _.each(data.existingUsers, function(u){ ;
__p += '\r\n\t\t\t\t\t,&nbsp;' +
((__t = ( u.mailId )) == null ? '' : __t) +
'\r\n\t\t\t\t';
 }) ;
__p += '\r\n\t\t\t</div>\r\n\t\t\t<div class="permissions-section">\r\n\t\t\t\t<div class="sarp-checkbox-holder">\r\n\t\t\t' +
((__t = (
				sb.toolbox.checkbox({
					class: "apply-to-all",
					inputClass: "permissions",
					text: "Enable group level permission",
					ignore: 1
				})
			)) == null ? '' : __t) +
'\r\n\t\t</div>\r\n\t\t\t\t<div class="people-permissions-section">\r\n\t\t\t\t\t<div class="permissions-wrapper k-field" data-xtype="access_type">\r\n\t\t\t\t\t\t<div class="permission-item">\r\n\t\t\t\t\t\t\t<div class="checkbox-holder">\r\n\t\t\t\t\t\t\t\t<label class="toggle-checkbox" >\r\n\t\t\t\t\t\t\t\t\t<input type="checkbox" class="global-permissions" trigger-chk=".add-comments-chk" data-subtype="comments" ></input><span></span>\r\n\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class="permission-item-text">comment</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="permission-item">\r\n\t\t\t\t\t\t\t<div class="checkbox-holder">\r\n\t\t\t\t\t\t\t\t<label class="toggle-checkbox" >\r\n\t\t\t\t\t\t\t\t\t<input type="checkbox" class="global-permissions" trigger-chk=".others-chk" data-subtype="share" ></input><span></span>\r\n\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class="permission-item-text">Share</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="share-artefact-people">\r\n\t\t\t<div class="share-artefact-people-wrapper k-field" data-xtype="share-permissions" data-xtype-key="users">\r\n\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
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
(window['templates'] = window['templates'] || {})['add-project'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popup popup-large k-form">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t' +
((__t = (
				sb.toolbox.textBox({
					"label": "Project",
					placeholder: "Enter project name",
					inputClass: "project-input required k-field blur-field float-none",
					dataName : "projectName",
					required: true,
					attr: {
						'data-validate-this': 'empty',
						'data-v-label': 'Project',
						'data-xtype': 'text',
						'data-xtype-key': 'project_name'
					},
					"fieldSectionErrorMessages": {
							'empty': ' Please enter project name',
					}
				})
			)) == null ? '' : __t) +
'\r\n\t\t\t' +
((__t = (
				sb.toolbox.textBox({
					"label": "Description",
					placeholder: "Enter project description",
					textArea: true,
					dataName: "project_description",
					"inputClass": "input-project-textarea project-input k-field",
					'attr': {
						'data-validate-this': 'empty'
					}
				})
			)) == null ? '' : __t) +
'\r\n\t\t\t<div class="checkbox-section">\r\n\t\t\t\t<label class="checkbox">\r\n\t\t\t\t\t<input type="checkbox" class="project-page-existing-files-chk"></input>\r\n\t\t\t\t\t<span>Do you like to add an artefact.</span>\r\n\t\t\t\t</label>\r\n\t\t </div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
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
(window['templates'] = window['templates'] || {})['artefact-five'] = function(obj) {
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
					'dump': sb.getPopupData()
				},
			})
		)) == null ? '' : __t) +
'\r\n\t</div>\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper popup-right-section padding-zero">\r\n\t\t\t<div class="share-artefact-container">\r\n\t\t\t\t\t';
 if(data.chooseExistingFile){ ;
__p += '\r\n\t\t\t\t\t\t<div class="share-artefact-header heading">Artefact</div>\r\n\t\t\t\t\t\t<div class="share-artefact-header search-files"><input type="text" class="searchable">\r\n\t\t\t\t\t\t\t<div class="filter-version-type html-click" data-html-class="enable-version-list" data-html-toggle="add">\r\n\t\t\t\t\t\t\t\t<svg class="filter-list-dropdown">\r\n\t\t\t\t\t\t\t\t\t<use xlink:href="#filter"></use>\r\n\t\t\t\t\t\t\t\t</svg>\r\n\t\t\t\t\t\t\t\t<div class="version-filter-list" >\r\n\t\t\t\t\t\t\t\t\t<div class="version-filter-data">\r\n\t\t\t\t\t\t\t\t\t\t<label class="checkbox">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" file-type="ALL"class ="apply-all-types">\r\n\t\t\t\t\t\t\t\t\t\t\t<span>Apply To All</span>\r\n\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class="version-filter-data">\r\n\t\t\t\t\t\t\t\t\t\t<label class="checkbox">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" file-type="IXD">\r\n\t\t\t\t\t\t\t\t\t\t\t<span>IXD</span>\r\n\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class="version-filter-data">\r\n\t\t\t\t\t\t\t\t\t\t<label class="checkbox">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" file-type="UID">\r\n\t\t\t\t\t\t\t\t\t\t\t<span>UID</span>\r\n\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class="version-filter-data">\r\n\t\t\t\t\t\t\t\t\t\t<label class="checkbox">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" file-type="P">\r\n\t\t\t\t\t\t\t\t\t\t\t<span>PS</span>\r\n\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class="version-filter-data">\r\n\t\t\t\t\t\t\t\t\t\t<label class="checkbox">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" file-type="IA">\r\n\t\t\t\t\t\t\t\t\t\t\t<span>IA</span>\r\n\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div><button class="apply-button">Apply</button></div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class="search-file-icon">\r\n\t\t\t\t\t\t\t\t<svg>\r\n\t\t\t\t\t\t\t\t\t<use xlink:href="#search"></use>\r\n\t\t\t\t\t\t\t\t</svg>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<!--' +
((__t = (
							sb.toolbox.comboBox({
								"class": "xm choose-file-combobox",
								"dataName": "choose-existing-file"
							})
						)) == null ? '' : __t) +
'-->\r\n\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t<div class="choose-existing-file-holder k-field" data-xtype="shareMultipleArtefacts,shareartefacts" data-xtype-key="ids,artefactName"></div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
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
(window['templates'] = window['templates'] || {})['artefact-four'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 var dump = sb.getPopupData() ;
__p += '\r\n\t<div class="popup popup-large k-form">\r\n\t\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t\t\t<div class="popup-left-section">\r\n\t\t\t\t' +
((__t = (
					sb.setTemplate('popup-meta-content', {
						'data': {
							project: true,
							file: true,
							type: true,
							references: true,
							tags: true,
							'dump': dump
						},
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t\t\t<div class="popup-body">\r\n\t\t\t\t<div class="popup-body-wrapper popup-right-section">\r\n\t\t\t\t\t<div class="your-team-section">\r\n\t\t\t\t\t\t<div class="your-team-heading html-click" data-type="insider">Your Team</div>\r\n\t\t\t\t\t\t<div class="vertical-bar"></div>\r\n\t\t\t\t\t\t<div class="your-team-heading html-click" data-type="outsider">Others</div>\r\n\t\t\t\t\t\t<form class="your-team-body">\r\n\r\n\t\t\t\t\t\t\t<div class="field-section your-team-field" data-name="new-people">\r\n\t\t\t\t\t\t\t\t<form>\r\n\t\t\t\t\t\t\t\t\t';

							var fields = {
								shareCombo: sb.toolbox.comboBox({
									"label": "Add People",
									"class": "xm people-combobox",
									"dataName": "otherMembers",
									"placeholder": "Add People"
								})
							}
							;
__p += '\r\n\t\t\t\t\t\t\t\t\t\t' +
((__t = ( fields.shareCombo )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t\t\t</form>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class="field-section others-field" data-name="new-people">\r\n\t\t\t\t\t\t\t\t<form class="others-body">\r\n\t\t\t\t\t\t\t\t\t<div class="others">\r\n\t\t\t\t\t\t\t\t\t\t<div class="input-label" style="font-family: \'OpenSansBold\';" >Add People</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class="input-wrapper">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type="text" class="input-text " placeholder="Type mail ID or username and press enter" data-input="mail_id"></input>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class="invalid-mail-id"></div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</form>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="permissions-section">\r\n\t\t\t\t\t\t\t\t<div class="sarp-checkbox-holder hide">\r\n\t\t\t\t\t\t\t\t\t' +
((__t = (
										sb.toolbox.checkbox({
											class: "apply-to-all",
											inputClass: "permissions",
											text: "Enable group level permission",
											ignore: 1
										})
									)) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class="people-permissions-section ">\r\n\t\t\t\t\t\t\t\t\t<div class="permissions-wrapper k-field" data-xtype="access_type">\r\n\t\t\t\t\t\t\t\t\t\t<div class="permission-item">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class="checkbox-holder">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label class="toggle-checkbox">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" class="global-permissions" trigger-chk=".add-comments-chk" data-subtype="comments"></input>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class="permission-item-text">comment</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class="permission-item">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class="checkbox-holder">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label class="toggle-checkbox">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" class="global-permissions" trigger-chk=".others-chk" data-subtype="share"></input>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span></span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class="permission-item-text">Share</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class="share-artefact-people">\r\n\t\t\t\t\t\t\t\t<div class="share-artefact-people-wrapper k-field" data-xtype="share-permissions" data-xtype-key="shared_members">\r\n\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</form>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="buttons-section">\r\n\t\t\t\t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t\t\t</div>\r\n\t</div>';

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
__p += '<div class="popup popup-large">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="projects-selection-section-wrapper">\r\n\t\t\t<div class="projects-selection-section">\r\n\t\t\t\t<div class="projects-selection-heading">\r\n\t\t\t\t\t<div class="projects-selection-heading-text">Projects</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
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
(window['templates'] = window['templates'] || {})['artefact-six'] = function(obj) {
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
					type: true,
					references: true,
					tags: true,
					show_coming_soon: true,
					'dump': sb.getPopupData()
				},
			})
		)) == null ? '' : __t) +
'\r\n\t</div>\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper popup-right-section">\r\n\t\t\t<div class="files-section" id="drop-zone">\r\n\t\t\t\t<label class="upload-file-section">\r\n\t\t\t\t\t<input type="file" class="upload-files-input" ';
 if(!data.single_file_selector){ ;
__p += 'multiple=""';
 } ;
__p += '></input>\r\n\t\t\t\t\t<div class="file-heading">\r\n\t\t\t\t\t\tUpload a new file\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="uploader-section">\r\n\t\t\t\t\t\t<div class="uploader-section-img uploader-img-limited">\r\n\t\t\t\t\t\t\t<svg><use xlink:href="#pdfnpng"></use></svg>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</label>\r\n\t\t\t\t<span class="or-btn">Or</span>\r\n\t\t\t\t<div class="create-file-section">\r\n\t\t\t\t\t';
 if(data.chooseExistingFile){ ;
__p += '\r\n\t\t\t\t\t\t<div class="file-heading">\r\n\t\t\t\t\t\t\tChoose an existing file\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.comboBox({
								"class": "choose-file-combobox",
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
__p += '\r\n\t\t\t\t\t<div class="choose-existing-file-holder">\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="uploaded-file-display">\r\n\t\t\t\t<div class="files-list" style="display: none">\r\n\t\t\t\t\t<div class="create-file-item">\r\n\t\t\t\t\t\t<div class="notification-item S-type ">\r\n\t\t\t\t\t\t\t<svg class="notification-s-type-icon"><use xlink:href="#file"></use></svg>\r\n\t\t\t\t\t\t\t<div class="notification-title">\r\n\t\t\t\t\t\t\t\tBalfour: Image Share\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class="notification-time">\r\n\t\t\t\t\t\t\t\t@ 11:20 AM by Rakesh\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="create-file-close-icon">\r\n\t\t\t\t\t\t\t<svg><use xlink:href="#close"></use></svg>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t';
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
					file: true,
					type: true,
					references: true,
					tags: true,
					'dump': sb.getPopupData()
				},
			})
		)) == null ? '' : __t) +
'\r\n\t</div>\r\n\t<div class="popup-body overflowx-hidden">\r\n\t\t<div class="popup-body-wrapper popup-right-section padding-zero">\r\n\t\t\t<div class="add-artefact-section">\r\n      \t<span>This artefact will be share with the people in this project</span>\r\n      </div>\r\n\t\t\t<div class="files-section" id="drop-zone">\r\n\t\t\t\t<label class="upload-file-section">\r\n\t\t\t\t\t<input type="file" class="upload-files-input" ';
 if(!data.single_file_selector){ ;
__p += 'multiple=""';
 } ;
__p += '></input>\r\n\t\t\t\t\t<div class="uploader-section">\r\n\t\t\t\t\t\t<div class="uploader-section-img">\r\n\t\t\t\t\t\t\t<svg><use xlink:href="#pdfnpng"></use></svg>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="uploader-section-file">\r\n\t\t\t\t\t\t\t<span>Drag & Drop your artefacts here</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</label>\r\n\t\t\t</div>\r\n\t\t\t<div class="uploaded-file-display">\r\n\t\t\t\t<div class="files-list display-none">\r\n\t\t\t\t\t<div class="create-file-item">\r\n\t\t\t\t\t\t<div class="notification-item S-type">\r\n\t\t\t\t\t\t\t<svg class="notification-s-type-icon"><use xlink:href="#file"></use></svg>\r\n\t\t\t\t\t\t\t<div class="notification-title">\r\n\t\t\t\t\t\t\t\tBalfour: Image Share\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class="notification-time">\r\n\t\t\t\t\t\t\t\t@ 11:20 AM by Rakesh\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="create-file-close-icon">\r\n\t\t\t\t\t\t\t<svg><use xlink:href="#close"></use></svg>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t';
 if(data.allow_artefact_selection){ ;
__p += '\r\n\t\t\t\t\t<label class="checkbox display-none">\r\n\t\t\t\t\t\t<input type="checkbox" disabled="true" class="existing-files-chk"></input>\r\n\t\t\t\t\t\t<span>This is a new version of an existing file</span>\r\n\t\t\t\t\t</label>\r\n\t\t\t\t\t<div class="artefact-combobox display-none">\r\n\t\t\t\t\t\t' +
((__t = (
							sb.toolbox.comboBox({
								"class": "xm existing-files-combobox",
								"dataName": "choose-file"
							})
						)) == null ? '' : __t) +
'\r\n\t\t\t\t\t</div>\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
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
(window['templates'] = window['templates'] || {})['cover-image'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popup popup-large k-form">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t<div class="image-cover-section" id="drop-zone">\r\n\t\t\t\t<label class="upload-file-section">\r\n\t\t\t\t\t<input type="file" class="upload-files-input" accept="image/*"></input>\r\n\t\t\t\t\t<div class="file-heading">\r\n\t\t\t\t\t\tupload file\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="uploader-section">\r\n\t\t\t\t\t\t<div class="uploader-section-img">\r\n\t\t\t\t\t\t\t<svg><use xlink:href="#pdfnpng"></use></svg>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</label>\r\n\t\t\t</div>\r\n\t\t\t<div class="cover-image-viewer k-field" data-xtype="coverImage" data-xtype-key="dimensions">\r\n\t\t\t\t<div class="use-full-img"><input type="checkbox">Use full image</div>\r\n\t\t\t    <div class="img-wrapper">\r\n\t\t\t\t    <img class="img-content"  src="" />\r\n\t\t\t\t    <img class="pan-img" src="ui/assets/imgs/blank.png" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="buttons-section">\r\n\t\t' +
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
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t<form class="meeting-invite-form">\r\n\t\t\t\t';
 var isUpdateMeetingForm = data.populateType === "update-meeting" ;
__p += '\r\n\t\t\t\t';
 if(isUpdateMeetingForm){ ;
__p += '\r\n\t\t\t\t\t<input class="k-field" type="hidden" data-xtype="text" data-xtype-key="meeting_id" value="' +
((__t = ( sb.getPopulateValue(data.populateType, 'meeting_id') )) == null ? '' : __t) +
'"></input>\r\n\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t' +
((__t = (
					toolbox.comboBox({
						"label": "Project",
						required: true,
						"class": "xm project-combobox blur-field",
						"inputClass": "k-field",
						"placeholder": "Choose Project",
						"inputAttr": _.assign({
							"value": sb.getPopulateValue(data.populateType, 'project_name'),
							"data-xtype": "id,text",
							"data-xtype-key": "project_id,project_name"
							}, function(){
								return isUpdateMeetingForm? {disabled: true}: {}
							}()
						),
						"fieldSectionErrorMessages": {
							'empty': 'Please select project name',
						}
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t\t' +
((__t = (
					toolbox.comboBox({
						"label": "Artefact",
						required: true,
						fieldClass: "artefact-field-section",
						"class": "xm artefact-combobox blur-field",
						"inputClass": "k-field",
						"placeholder": "Choose Artefact",
						"inputAttr": _.assign({
							"value": sb.getPopulateValue(data.populateType, 'artefact_name'),
							"data-xtype": "id,text",
							"data-xtype-key": "artefact_id,artefact_name"},
							function(){
								return isUpdateMeetingForm? {disabled: true}: {}
							}()
						),
						"fieldSectionErrorMessages": {
							'empty': 'Please select project name',
						}
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t\t' +
((__t = (
					toolbox.textBox({
						"label": "Agenda",
						required: true,
						textArea: true,
						"inputClass": "input-meeting-textarea meeting-agenda blur-field k-field",
						'attr': {
							'data-validate-this': 'empty',
							"data-xtype": "text",
							"data-xtype-key": "agenda"
						},
						'value': sb.getPopulateValue(data.populateType, 'agenda'),
						"fieldSectionErrorMessages": {
							'empty': ' Please provide meeting agenda',
						}
					})
				)) == null ? '' : __t) +
'\r\n\t\t\t\t<div style="clear: both; padding-top: 20px;">\r\n\t\t\t\t\t<div class="field-section in-line">\r\n\t\t\t\t\t\t';

							var dateValue = sb.getPopulateValue(data.populateType, 'meeting_date');
							if(dateValue){
								dateValueTokens = new Date(dateValue).toDateString().split(" ");
								dateValue = dateValueTokens[2] + " " + dateValueTokens[1] + " " + dateValueTokens[3];
							}
							else{
								dateValue = "";
							}
						;
__p += '\r\n\t\t\t\t\t\t<div class="input-label required">Scheduled on</div>\r\n\t\t\t\t\t\t<div class="input-wrapper float-left mini-datepicker">\r\n\t\t\t\t\t\t\t<input type="text" value="' +
((__t = ( dateValue || sb.timeFormat(dateValue, true, true, true, {twoDigitDay: true}) )) == null ? '' : __t) +
'" class="input-meeting-date float-left k-field" data-xtype="text" data-xtype-key="meeting_date"></input>\r\n\t\t\t\t\t\t\t<div class="datepicker-icon-holder float-left">\r\n\t\t\t\t\t\t\t\t<div class="datepicker-icon">\r\n\t\t\t\t\t\t\t\t\t<svg><use xlink:href="#calendar"></use></svg>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t';

						var timeValues = [
											"00:00 AM","00:30 AM","01:00 AM","01:30 AM","02:00 AM","02:30 AM","03:00 AM",
											"03:30 AM","04:00 AM","04:30 AM","05:00 AM","05:30 AM","06:00 AM",
											"06:30 AM","07:00 AM","07:30 AM","08:00 AM","08:30 AM","09:00 AM",
											"09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM",
											"12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","03:00 PM",
											"03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM","06:00 PM",
											"06:30 PM","07:00 PM","07:30 PM","08:00 PM","08:30 PM","09:00 PM",
											"09:30 PM","10:00 PM","10:30 PM","11:00 PM","11:30 PM","11:30 PM"
										]
					;
__p += '\r\n\t\t\t\t\t<div class="field-section in-line">\r\n\t\t\t\t\t\t<div class="input-wrapper float-left">\r\n\t\t\t\t\t\t\t<div class="time-label">From</div>\r\n\t\t\t\t\t\t\t<select class="projects-dropdown dropdown mini-dropdown no-margin fromTime k-field" data-xtype="text-date" data-xtype-key="meeting_date_from_time">\r\n\t\t\t\t\t\t\t\t';
 var fromTime = sb.getPopulateValue(data.populateType, 'meeting_date_from_time') ;
__p += '\r\n\t\t\t\t\t\t\t\t';
 var fromTimeSelectIndex = 0 ;
__p += '\r\n\t\t\t\t\t\t\t\t';

									if(fromTime){
										fromTimeSelectIndex = timeValues.indexOf(sb.convertToAMPM(fromTime, {twoDigitHour: true})) + 1;
									}
									else{
										var newSelectValue = new Date();
										newSelectValue.setMinutes(Math.ceil(newSelectValue.getMinutes() / 30) * 30);
										var diffSelectValue = new Date();
										diffSelectValue.setHours(0);
										diffSelectValue.setMinutes(0);
										diffSelectValue.setSeconds(0);
										fromTimeSelectIndex = Math.floor((newSelectValue.getTime() - diffSelectValue.getTime()) / (30 * 60 * 1000));
									}
								;
__p += '\r\n\t\t\t\t\t\t\t\t';
 _.each(timeValues, function(time, i){ ;
__p += '\r\n\t\t\t\t\t\t\t\t\t<option ';
 if(i === - 1){ ;
__p += 'selected';
 } ;
__p += ' value="' +
((__t = ( sb.getHHTime(time) )) == null ? '' : __t) +
'">' +
((__t = ( time )) == null ? '' : __t) +
'</option>\r\n\t\t\t\t\t\t\t\t';
 }) ;
__p += '\r\n\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="field-section in-line">\r\n\t\t\t\t\t\t<div class="input-wrapper float-left">\r\n\t\t\t\t\t\t\t<div class="time-label">To</div>\r\n\t\t\t\t\t\t\t<select class="projects-dropdown dropdown no-margin mini-dropdown toTime k-field" data-xtype="text-date,timezone-offset" data-xtype-key="meeting_date_to_time,timezone">\r\n\t\t\t\t\t\t\t\t';
 var toTime = sb.getPopulateValue(data.populateType, 'meeting_date_to_time') ;
__p += '\r\n\t\t\t\t\t\t\t\t';
 var toTimeSelectIndex = 0 ;
__p += '\r\n\t\t\t\t\t\t\t\t';

									if(toTime){
										toTimeSelectIndex = timeValues.indexOf(sb.convertToAMPM(toTime, {twoDigitHour: true})) + 1;
									}
								;
__p += '\r\n\t\t\t\t\t\t\t\t';
 _.each(timeValues, function(time, i){ ;
__p += '\r\n\t\t\t\t\t\t\t\t\t<option ';
 if(i === toTimeSelectIndex - 1){ ;
__p += 'selected';
 } ;
__p += ' value="' +
((__t = ( sb.getHHTime(time) )) == null ? '' : __t) +
'">' +
((__t = ( time )) == null ? '' : __t) +
'</option>\r\n\t\t\t\t\t\t\t\t';
 }) ;
__p += '\r\n\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t' +
((__t = (
					toolbox.textBox({
						"label": "Venue",
						inputClass: "meeting-location k-field",
						'attr': {
							'data-validate-this': 'empty',
							'value': sb.getPopulateValue(data.populateType, 'venue'),
							'data-xtype': 'text',
							'data-xtype-key': 'venue'
						}
					})
				)) == null ? '' : __t) +
'\r\n\r\n\t\t\t\t' +
((__t = (
					sb.setTemplate('select', {
						data: {
							"label": "Recipients List",
							required: true,
							fieldClass: "field-section--recipients",
							inputClass: "recipients-meeting blur-field k-field",
							"selectAttr": {
								"multiple": "",
								"data-xtype": "get-participants",
								"data-xtype-key": "participants"
							},
							"fieldSectionErrorMessages": {
								'empty': ' Please select at least one recipient',
							}
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
(window['templates'] = window['templates'] || {})['private-message'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="popup popup-small">\r\n\t' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n\t<div class="popup-body">\r\n\t\t<div class="popup-body-wrapper">\r\n\t\t\t' +
((__t = ( sb.setTemplate('textbox', {
                data: {
                    fieldClass: "field-section--stretch",
                    attr: {
                        "data-xtype": "getData",
                        "data-xtype-key": "message"
                    },
                    textArea: true
                }
            }) )) == null ? '' : __t) +
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
(window['templates'] = window['templates'] || {})['project-section-popup'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="projects-selection-section-content">\r\n  ';
 if(data){ ;
__p += '\r\n    ';
 _.each(data.data, function(p){ ;
__p += '\r\n      <label class="toggle-project-radio">\r\n        <input type="radio" name="projectSection"></input>\r\n        <div class="project-selection-block">\r\n          <img src="http://placeimg.com/280/200/arch">\r\n          <div class="project-selection-block-overlay">\r\n            <div class="project-selection-block-overlay-wrapper">\r\n              <div class="project-selection-block-title k-field" data-k-project_id="' +
((__t = ( p.project_id )) == null ? '' : __t) +
'" data-xtype="project-selection" data-xtype-key="selected_project">\r\n                ' +
((__t = ( p.project_name )) == null ? '' : __t) +
'\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </label>\r\n    ';
 }); ;
__p += '\r\n  ';
 } else{ ;
__p += '\r\n    <div class="no-items">No projects to show</div>\r\n  ';
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
(window['templates'] = window['templates'] || {})['rename-artefact'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="popup popup-small k-form">\r\n    ' +
((__t = ( sb.setTemplate('popup-header', { title: data.title, close: true }) )) == null ? '' : __t) +
'\r\n    <div class="popup-body">\r\n        <div class="popup-body-wrapper">\r\n            ';
 var title = Kenseo.popup.data.artefact_name;
                title = _.initial(title.split('.')).join('.');
            ;
__p += '\r\n            ' +
((__t = (
                sb.toolbox.textBox({
                    inputClass: "project-input required k-field blur-field",
                    dataName : "artefactName",
                    required: true,
                    attr: {
                        'data-validate-this': 'empty',
                        'data-v-label': 'Artefact',
                        'data-xtype': 'text',
                        'data-xtype-key': 'artefact_new_name',
                         value: title
                    },
                    "fieldSectionErrorMessages": {
                        'empty': ' Please enter artefact name',
                    }
                })
            )) == null ? '' : __t) +
'\r\n        </div>\r\n    </div>\r\n    <div class="buttons-section">\r\n    \t' +
((__t = ( sb.toolbox.buttons({"data": data}) )) == null ? '' : __t) +
'\r\n\t</div>\r\n</div>\r\n\r\n\r\n';

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
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="sub-heading-section">\r\n\t<div class="sub-heading">\r\n\t\t<div class="sub-heading-label">Activity</div>\r\n\t</div>\r\n</div>\r\n<div class="activity-section-content sub-section-content">\r\n\r\n</div>\r\n';

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
__p += '<div class="sub-heading-section">\r\n\t<div class="sub-heading">\r\n\t\t<div class="sub-heading-label">People</div>\r\n\t\t<div class="sub-heading-add-wrapper">\r\n\t\t\t<div class="sub-heading-add-icon" data-url="add-people">\r\n\t\t\t\t<svg><use xlink:href="#add"></use></svg>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class="people-section-content sub-section-content">\r\n\r\n</div>';

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
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="project-heading data-holder" data-key="projects" data-id="' +
((__t = ( Kenseo.page.id )) == null ? '' : __t) +
'">\r\n\t<div class="projects-heading-icon">\r\n\t\t<svg><use xlink:href="#projects"></use></svg>\r\n\t</div>\r\n\t<a href="#projects" class="heading-text-project">Projects > </a>\r\n\t<span class="heading-text-project-name">' +
((__t = ( project_name )) == null ? '' : __t) +
'</span>\r\n\t<div class="main-section-project-icon-holder html-click sub-menu-nav inlineBlockTop" data-html-class="active">\r\n\t\t<div class="sub-heading-more-icon">\r\n\t\t\t<svg><use xlink:href="#more"></use></svg>\r\n\t\t</div>\r\n\t\t<div class="sub-menu-holder right-nav bottom-nav">\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="add-artefact" data-index="1">Add an Artefact</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="add-people">Add People</div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="create-meeting" data-others="populate">Create a Meeting</div>\r\n\t\t\t';
if(state == 'A'){;
__p += '\r\n\t\t\t\t<div class="sub-menu-item popup-click" data-url="archive-project">Archive a Project</div>\r\n\t\t\t';
}else{;
__p += '\r\n\t\t\t\t<div class="sub-menu-item popup-click" data-url="unarchive-project">Unarchive a Project</div>\r\n\t\t\t';
};
__p += '\r\n\t\t\t<div class="sub-menu-item popup-click hide">Delete a Project</div>\r\n\t\t\t<div class="sub-menu-item"><a class="stop-propagate" href="' +
((__t = (sb.getRelativePath('zip.php?command=downloadProject&project_id='+Kenseo.page.id))) == null ? '' : __t) +
'" target="_blank" download> Download</a> </div>\r\n\t\t\t<div class="sub-menu-item popup-click" data-url="cover-image">Add Cover Image</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<div class="project-description"> ' +
((__t = ( description )) == null ? '' : __t) +
' </div>\r\n<div class="project-section-content">\r\n\t<div class="artifacts-section review-requests-content sub-section">\r\n\r\n\t</div>\r\n\r\n\t<div class="activity-section sub-section">\r\n\r\n\t</div>\r\n\t<div class="people-section sub-section">\r\n\r\n\t</div>\r\n\r\n</div>\r\n';

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
__p += '\r\n\t\tdisabled="true" autocomplete="off"\r\n\t';
 } ;
__p += '\r\n\t\tclass="' +
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
((__t = ( sb.setTemplate('attributes', {data: data.attr}) )) == null ? '' : __t) +
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
 _.each(buttons, function(b){ ;
__p += '\r\n\t';
 if(!isNaN(Number(data.index))){ ;
__p += '\r\n\t\t';
 _.extend(b, { index: data.index }) ;
__p += '\r\n\t';
 } ;
__p += '\r\n\t' +
((__t = ( sb.toolbox.button({data: b}) )) == null ? '' : __t) +
'\r\n';
 }) ;
__p += '\r\n';

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
'">\r\n\t\t<input type="checkbox" class="' +
((__t = ( data.inputClass)) == null ? '' : __t) +
'"\r\n\t\t\t';
 if(data.checked == true){ ;
__p += '\r\n\t\t\t\tchecked\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t' +
((__t = ( sb.setTemplate('attributes', {data: data.attr}) )) == null ? '' : __t) +
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
__p += '>\r\n\t\t<div class="combobox-wrapper field-section-wrapper">\r\n\t\t\t<input class="';
 if(data.required){ ;
__p += 'k-required';
 } ;
__p += ' ' +
((__t = ( data.inputClass )) == null ? '' : __t) +
'" ' +
((__t = ( sb.setTemplate('attributes', {data: data.inputAttr}) )) == null ? '' : __t) +
' type="text" placeholder="' +
((__t = ( data.placeholder )) == null ? '' : __t) +
'" ';
 if(data.required){ ;
__p += 'data-validate-this="empty"';
 } ;
__p += '>\r\n\t\t</div>\r\n\t\t<div class="field-section-error-messages">\r\n\t\t\t';
 for(var key in data.fieldSectionErrorMessages) { ;
__p += '\r\n\t\t\t\t<div class="hide message-display" trigger="' +
((__t = (key)) == null ? '' : __t) +
'">' +
((__t = ( data.fieldSectionErrorMessages[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n';

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
(window['templates'] = window['templates'] || {})['option'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<option ' +
((__t = ( sb.setTemplate('attributes', {data: option.attr}) )) == null ? '' : __t) +
'>' +
((__t = ( option.text )) == null ? '' : __t) +
'</option>\r\n';

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
(window['templates'] = window['templates'] || {})['select'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="field-section ' +
((__t = ( data.fieldClass )) == null ? '' : __t) +
'" ';
 if(data.dataName){ ;
__p += ' data-name="' +
((__t = ( data.dataName )) == null ? '' : __t) +
'" ';
 } ;
__p += '>\r\n\t';
 if(data.label){ ;
__p += '\r\n        <div class="input-label ';
 if(data.labelClass){ ;
__p +=
((__t = ( data.labelClass )) == null ? '' : __t);
 } ;
__p += ' ';
 if(data.required){ ;
__p += ' required';
 } ;
__p += '">\r\n            ' +
((__t = ( data.label )) == null ? '' : __t) +
'\r\n        </div>\r\n    ';
 } ;
__p += '\r\n\t<div class="input-wrapper">\r\n        <select class="' +
((__t = ( data.inputClass )) == null ? '' : __t);
 if(data.required){ ;
__p += ' k-required';
 } ;
__p += '" ' +
((__t = ( sb.setTemplate('attributes', {data: data.selectAttr}) )) == null ? '' : __t) +
' >\r\n            ';
 _.each(data.options, function(option){ ;
__p += '\r\n\t\t\t\tconsole.log("in option");\r\n\t\t\t\tconsole.dir(option);\r\n                ' +
((__t = ( sb.setTemplate('option', {data: option}) )) == null ? '' : __t) +
'\r\n            ';
 }) ;
__p += '\r\n        </select>\r\n\t</div>\r\n\t<div class="field-section-error-messages">\r\n\t\t';
 for(var key in data.fieldSectionErrorMessages) { ;
__p += '\r\n\t\t\t<div class="hide message-display" trigger="' +
((__t = (key)) == null ? '' : __t) +
'">' +
((__t = ( data.fieldSectionErrorMessages[key] )) == null ? '' : __t) +
'</div>\r\n\t\t';
 } ;
__p += '\r\n\t</div>\r\n</div>\r\n';

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
__p += '<div class="field-section ' +
((__t = ( data.fieldClass )) == null ? '' : __t) +
'" ';
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
__p += '\r\n\t\t<input\r\n\t\t\ttype="text"\r\n\t\t\tclass="field-section-wrapper input-text ';
 if(data.inputClass) { ;
__p +=
((__t = ( data.inputClass )) == null ? '' : __t) +
' ';
 } ;

 if(data.required){ ;
__p += ' k-required';
 } ;
__p += '"\r\n\t\t\t';
 if(data.placeholder){ ;
__p += '\r\n\t\t\tplaceholder="' +
((__t = ( data.placeholder )) == null ? '' : __t) +
'"\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t' +
((__t = ( sb.setTemplate('attributes', {data: data.attr}) )) == null ? '' : __t) +
'\r\n\t\t></input>\r\n\t\t';
 } else { ;
__p += '\r\n\t\t<textarea class="field-section-wrapper ';
 if(data.inputClass) { ;
__p +=
((__t = ( data.inputClass )) == null ? '' : __t) +
' ';
 } ;

 if(data.required){ ;
__p += ' k-required';
 } ;
__p += '"\r\n\t\t\t';
 if(data.placeholder){ ;
__p += '\r\n\t\t\tplaceholder="' +
((__t = ( data.placeholder )) == null ? '' : __t) +
'"\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t' +
((__t = ( sb.setTemplate('attributes', {data: data.attr}) )) == null ? '' : __t) +
'\r\n\t\t >' +
((__t = ( data.value )) == null ? '' : __t) +
'</textarea>\r\n\t\t';
 } ;
__p += '\r\n\t\t<div class="field-section-error-messages">\r\n\t\t\t';
 for(var key in data.fieldSectionErrorMessages) { ;
__p += '\r\n\t\t\t\t<div class="hide message-display" trigger="' +
((__t = (key)) == null ? '' : __t) +
'">' +
((__t = ( data.fieldSectionErrorMessages[key] )) == null ? '' : __t) +
'</div>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</div>\r\n\t</div>\r\n\t';
 if(data.enableSuggestions){ ;
__p += '\r\n\t<div class="field-suggestions"></div>\r\n\t<div class="field-suggestions-viewer"></div>\r\n\t';
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
(window['templates'] = window['templates'] || {})['attributes'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(data && typeof data == "object"){
	var attributes = data;
	for(var key in attributes){ ;
__p += '\r\n\t\t' +
((__t = ( key )) == null ? '' : __t) +
' = "' +
((__t = ( attributes[key] )) == null ? '' : __t) +
'"\r\n';
	}
 } ;


}
return __p
}})();