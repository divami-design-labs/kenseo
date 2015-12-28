/*
 * Main aim of this library is to send all the necessary data to server
 */
sb.postcall = (function(){
	var accessType = Kenseo.settings.accessType;
	var fieldTypes = {
		'text-with-comma': function($el){
			return $el.val().split(',');
		},
		'access_type': function($el){
			var $checkboxes = $el.find('input[type="checkbox"]');
			var str = "";
			for(var i = 0, len = $checkboxes.length; i < len; i++){
				var checkbox = $checkboxes[i];
				// Converting boolean to 0 and 1
				str += checkbox.checked * 1;
			}
			return accessType[str];
		},
		'text': function($el){
			return $el.val();
		}
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
				var func = fieldTypes[type];
				if(func){ // if k-xtype field's functionality is present in fieldTypes variable above
					// data[typeKey] = func($field);
					Kenseo.popup.data[typeKey] = func($field); // temporary fix
				}

				// Checking for "data-k-" prefix attributes in k-field element
				sb.loopAttributes($field.get(0), 'data-k-', function(key, value){
					// Store in the data variable
					// data[key.substr(7)] = value;
					Kenseo.popup.data[key.substr(7)] = value; // temporary fix
				});
			}


			// return the filled data
			return data;
		}
	}
})()