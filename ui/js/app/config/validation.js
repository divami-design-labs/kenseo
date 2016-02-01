// Some rules to do validation 
// - The clicked button to trigger validation must have "data-target-validating-section" attribute, this attribute value's element is the wrapper of all the fields
// - The "data-target-validating-section" value element must have overflow: hidden and non-static value position
// - The field should be wrapped in a ".field-section" element
// - The field should have ".required" class
// - The field should have "data-validate-this" attribute with all necessary validations as comma separated values
var validation = (function(){ 
	// This counter will be incremented if any field has error
	var validatingCounter = 0;
	var $validationSection = null;
	var allErrorMessages = [];
	// var fieldTypes = {
	// 	'text': 'input[type="text"]',
	// 	'textarea': 'textarea',
	// 	'select': 'select'
	// }
	var allValidations = {
		'empty': {
			'msg': 'Field is empty',
			'check': function(value, $field){
				return !!$.trim(value).length;
			}
		},
		'email': {
			'msg': 'Email is invalid',
			'check': function(value, $field){
				var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				return filter.test(value);
			}
		},
		'valid-list-item': {
			'msg': 'invalid list item',
			'check': function(value, $field){
				// Check whether the value is inside the input box or the suggestions viewer
				var $suggestionsViewer = $field.parents('.combobox').find('.suggestions-viewer');
				var $svNames = $suggestionsViewer.find('.sv-name');
				var $suggestionsContainer = $field.next();
				if($svNames.length){ // the value is inside suggestions viewer
					// the obtained "value" parameter is useless in this condition
					// generate new value (array) from the suggestion viewers
					var newValues = $svNames.map(function(){
						return this.innerHTML;
					});
					var listItems = $suggestionsContainer.find('.selectable').map(function(){
						return this.innerHTML.toLowerCase();
					}).filter(function(i, str){ 
						for(var i = 0, len = newValues.length; i < len; i++){
							if(newValues[i].toLowerCase() === str.toLowerCase()){
								return true;
							}
						}
						return false;
					});
				}
				else{ // the values is inside the textbox
					var listItems = $suggestionsContainer.find('.selectable').map(function(){
						return this.innerHTML.toLowerCase();
					}).filter(function(i, str){ return str.toLowerCase() === value.toLowerCase() });
				}
				return listItems.length > 0;
			}
		}
	}
	var checkField = function(validatingType, $field, value){
		var validate = allValidations[validatingType];
		if(!validate.check(value, $field)){
			allErrorMessages.push(validate.msg);
			return true;
		}
		else{
			return false;
		}
	}
	var addErrorSkinning = function($field){
		// if the field is inside the combobox, apply the styling to combobox instead of field
		var $combobox = $field.parents('.combobox');
		if($combobox.length){
			$combobox.addClass('error-field');
			$combobox.children('.combobox').css({
				'border': 'none'
			});
		}
		else{
			$field.addClass('error-field');
		}
	}
	var removeErrorSkinning = function($field){
		var $combobox = $field.parents('.combobox');
		if($combobox.length){
			$combobox.removeClass('error-field');
			$combobox.children('.combobox').css({
				'border': ''
			});
		}
		else{
			$field.removeClass('error-field');
		}
	}
	var validateThisField = function($field, validatingTokens){
		var value = $field.val();
		for(var i = 0; i < validatingTokens.length; i++){
			if(checkField(validatingTokens[i], $field, value)){
				validatingCounter++;
				// Add skinning
				addErrorSkinning($field);
				// push the message
				// errorMessages().addNewMsg(validatingTokens[i]);
				// break to avoid further validations on the same field
				break;
			}
		}
	}
	var getValidatingField = function(el){
		// getting the field type in the field section, keep the default value as "text"
		// var thisFieldType = el.getAttribute('data-field-type') || 'text';
		// return $(el).find(fieldTypes[thisFieldType]);
		return $(el).find('.k-required');
	}
	var isValidate = function($clickedBtn){
		var validationSectionStr = $clickedBtn.attr('data-target-validating-section');
		if(validationSectionStr){
			$validationSection = $(validationSectionStr);
			var $fieldSections = $validationSection.find('.field-section');
			// remove all before present error messages container
			$('.error-messages-wrapper').remove();
			// initializing counter
			validatingCounter = 0;
			// initializing error messages
			allErrorMessages = [];
			// Reset previous error fields
			$fieldSections.each(function(){
				var $field = getValidatingField(this);
				removeErrorSkinning($field);
			});
			// Do validation
			for(var j = 0, jLen = $fieldSections.length; j < jLen; j++){
				var $field = getValidatingField($fieldSections[j]);
				var $fieldSection = $($fieldSections[j]);
				if($field.hasClass('k-required')){
					var validatingStr = $field.attr('data-validate-this');
					if(validatingStr){
						var validatingTokens = validatingStr.split(",");
						//
						validateThisField($field, validatingTokens);
					}
					else{
						// 'data-validate-this' attribute is not provided
					}
				}
				else{
					// leave it
				}
			}
			return validatingCounter == 0;
		}
		// the validationSectionStr is not present
		// So we can safely assume that the validation is true
		return true;
	}
	var doValidate = function($clickedBtn){
		if(isValidate($clickedBtn)){
			return true;
		}
		else{
			// functionality to show the global validation messages
			var div = document.createElement('div');
			div.className = "error-messages-wrapper";
			var ul = document.createElement('ul');
			for(var k = 0; k < allErrorMessages.length; k++){
				var li = document.createElement('li');
				li.innerHTML = allErrorMessages[k];
				ul.appendChild(li);
			}
			div.appendChild(ul);
			$validationSection.prepend($(div).css({
				'top': $validationSection.scrollTop() + "px"
			}));

			$validationSection.on('scroll', function(){
				$(div).css({
					'top': $(this).scrollTop() + "px"
				})
			})
			//
			// Add error class to show all the error messages
			ul.className = 'error-messages';
			// set focus on first error-field
			$validationSection.find('.error-field').first().focus();
			// Hide above added error messages by removing the above added class after some time
			// $(div).addClass('show-errors').delay(2000).removeClass('show-errors');
			setTimeout(function(){
				this.addClass('show-errors');
			}.bind($(div)), 10);

			setTimeout(function(){
				this.removeClass('show-errors');
			}.bind($(div)), 3010);

			// return false to acknowledge
			return false;
		}
	}
	return {
		doValidate: doValidate
	}
})();