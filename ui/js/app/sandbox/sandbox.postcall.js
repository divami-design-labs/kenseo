/*
 * Main aim of this library is to gather all necessary data which is supposed to send to server
 */
sb.postcall = (function(){
	var getFieldTypes = {
		'text-with-comma': function($el){
			return $el.val().split(',').map(function(el){
				return $.trim(el);
			});
		},
		'access_type': function($el){
			var accessType = Kenseo.settings.accesstype;
			var $checkboxes = $el.find('input[type="checkbox"]');
			var str = "";
			$checkboxes.each(function(i, checkbox){
				// Converting boolean to 0 and 1
				str += checkbox.checked * 1;
			});
			return accessType[str];
		},
		'data-attributes': function($el){
			var data = $el.data();
			data.name = $el.val();
			return data;
		},
		'text': function($el){
			return $el.val();
		},
		'share-permissions': function($el) {
			var accessType = Kenseo.settings.accesstype;
			var $items = $el.find('.share-artefact-people-item');
			var shared_members = []; // taking an empty object
			for(var i = 0, len = $items.length; i < len; i++){
				var $item = $($items.get(i));
				var $commentChk = $item.find('.add-comments-chk input');
				var $shareChk = $item.find('.others-chk input');
				if($commentChk.length && $shareChk.length){
					var str = $commentChk.get(0).checked * 1 + "" + $shareChk.get(0).checked * 1;
					shared_members.push({
						'user_id': $item.attr('data-k-user_id'),
						'access_type': accessType[str]
					});
				} else {
					shared_members.push({
						'user_id': $item.attr('data-k-user_id'),
						'access_type': $item.attr('data-access_type')
					});
				}
			}
			return shared_members;
		},
		// for Project card selection
		'project-selection' : function($el) {
			var $item = $el.find('.project-selection-block-title');
			var selected_project = {};
			if($item.html()) {
				selected_project = {
					'project_id': $item.attr('data-k-project_id'),
					'project_name': $item.html()
				}
			}
			return selected_project;
		},
		'shareMultipleArtefacts' : function($el) {
			var ids = [];
			$items = $el.find('.to-share-file.active');
			for(var i = 0, len = $items.length; i < len; i++){
				var $item = $($items.get(i));
				ids.push({
					'artefact_id': $item.attr('data-k-id'),
					'artefact_name': $item.attr('data-k-artafactname'),
					'artefact_version_id': $item.attr('data-k-versionid')
				});
			}
			// var ids = $el.find('.to-share-file.active').map(function(){
			// 		return $(this).attr('data-k-id');
			// });
			 return ids;

		},
		"get-project-id": function($el){
			return $el.prop('data-k-project_id');
		},
    'coverImage' : function($el) {
			var dimensions = setPanningDimensions();
			return dimensions;
		},
		'shareartefacts': function($el){
			$items = $el.find('.to-share-file.active').find('.to-share-filename');
			var html = $items.map(function(){
				return $(this).html()
			});
			return Array.prototype.slice.call(html);
		} 
	};

	function getKeys($field, type, typeKey){
		var func = getFieldTypes[type];
		if(func){ // if k-xtype field's functionality is present in fieldTypes variable above
			// data[typeKey] = func($field);
			Kenseo.popup.data[typeKey] = func($field); // temporary fix
		}

		// Checking for "data-k-" prefix attributes in k-field element
		sb.loopAttributes($field.get(0), 'data-k-', function(key, value){
			// Store in the data variable
			// data[key.substr(7)] = value;
			Kenseo.popup.data[key] = value; // temporary fix
		});
	}
	return {
		getPostObj: function($el){
			var $el = $($el); // making sure the passed object is jquery object
			var targetElementString = $el.attr('data-target-k-form'); // getting the target element's selector string
			// Initiating a data object to store the values retrieved from the fields
			var data = {};
			// Get the target element in which the field type values are need to be passed to server
			// The target element must be parent of the provided $el element
			// Default targetElementString is assumed to be  ".k-form"
			var $targetElement = $el.parents(targetElementString || '.k-form');
			// Get all the fields whose values are need to be passed to the server
			var $fields = $targetElement.find('.k-field');
			for(var i = 0, len = $fields.length; i < len; i++){
				var $field = $($fields[i]);
				// Get the type of functionality/implementation to be done to fetch the attached data
				var type = $field.attr('data-xtype');
				var typeKey = $field.attr('data-xtype-key') || type; // Applying provided xtype as key when no key is provided
				if(type){
					var typeTokens = type.split(",");
					var typeKeyTokens = typeKey.split(",");
					for(var j = 0, jlen = typeTokens.length; j < jlen; j++){
						getKeys($field, typeTokens[j], typeKeyTokens[j]);
					}
				}
			}


			// return the filled data
			return data;
		},
		setPostObj: function(){
			// @Expected structure

			// {
			// 	"x-type": [
			// 		{
			// 			"x-type-key-token": "x-type-key-value",
			// 			"x-type-key-token": "x-type-key-value"
			// 		},
			// 		{
			// 			"x-type-key-token": "x-type-key-value",
			// 			"x-type-key-token": "x-type-key-value"
			// 		}
			// 	],
			// 	"x-type": [
			// 		{
			// 			"x-type-key-token": "x-type-key-value",
			// 			"x-type-key-token": "x-type-key-value"
			// 		},
			// 		{
			// 			"x-type-key-token": "x-type-key-value",
			// 			"x-type-key-token": "x-type-key-value"
			// 		}
			// 	]
			// }
		}
	}
})()
