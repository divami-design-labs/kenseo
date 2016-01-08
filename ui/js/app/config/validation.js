// Some rules to do validation
// - The clicked button to trigger validation must have "data-target-validating-section" attribute, this attribute value's element is the wrapper of all the fields
// - The "data-target-validating-section" value element must have overflow: hidden and non-static value position
// - The field should be wrapped in a ".field-section" element
// - The field should have ".required" class
// - The field should have "data-validate-this" attribute with all necessary validations as comma separated values
'use strict';

var validation = (function () {
	// This counter will be incremented if any field has error
	var validatingCounter = 0;
	var $validationSection = null;
	var allErrorMessages = [];
	var allValidations = {
		'empty': {
			'msg': 'Field is empty',
			'check': function check(value) {
				return !!$.trim(value).length;
			}
		},
		'email': {
			'msg': 'Email is invalid',
			'check': function check(value) {
				var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				return filter.test(value);
			}
		}
	};
	var checkField = function checkField(validatingType, value) {
		var validate = allValidations[validatingType];
		if (!validate.check(value)) {
			allErrorMessages.push(validate.msg);
			return true;
		} else {
			return false;
		}
	};
	var addErrorSkinning = function addErrorSkinning($field) {
		$field.addClass('error-field');
	};
	var removeErrorSkinning = function removeErrorSkinning($field) {
		$field.removeClass('error-field');
	};
	var validateThisField = function validateThisField($field, validatingTokens) {
		var value = $field.val();
		for (var i = 0; i < validatingTokens.length; i++) {
			if (checkField(validatingTokens[i], value)) {
				validatingCounter++;
				// Add skinning
				addErrorSkinning($field);
				// push the message
				// errorMessages().addNewMsg(validatingTokens[i]);
				// break to avoid further validations on the same field
				break;
			}
		}
	};
	var getValidatingField = function getValidatingField(el) {
		return $(el).find('input, textarea, select');
	};
	var isValidate = function isValidate($clickedBtn) {
		var validationSectionStr = $clickedBtn.attr('data-target-validating-section');
		if (validationSectionStr) {
			$validationSection = $(validationSectionStr);
			var $fieldSections = $validationSection.find('.field-section');
			// remove all before present error messages container
			$('.error-messages-wrapper').remove();
			// initializing counter
			validatingCounter = 0;
			// initializing error messages
			allErrorMessages = [];
			// Reset previous error fields
			$fieldSections.each(function () {
				var $field = getValidatingField(this);
				removeErrorSkinning($field);
			});
			// Do validation
			for (var j = 0, jLen = $fieldSections.length; j < jLen; j++) {
				var $field = getValidatingField($fieldSections[j]);
				var $fieldSection = $($fieldSections[j]);
				if ($field.hasClass('required')) {
					var validatingStr = $field.attr('data-validate-this');
					if (validatingStr) {
						var validatingTokens = validatingStr.split(",");
						//
						validateThisField($field, validatingTokens);
					} else {
						// 'data-validate-this' attribute is not provided
					}
				} else {
						// leave it
					}
			}
			return validatingCounter == 0;
		}
		// the validationSectionStr is not present
		// So we can safely assume that the validation is true
		return true;
	};
	var doValidate = function doValidate($clickedBtn) {
		if (isValidate($clickedBtn)) {
			return true;
		} else {
			// functionality to show the global validation messages
			var div = document.createElement('div');
			div.className = "error-messages-wrapper";
			var ul = document.createElement('ul');
			for (var k = 0; k < allErrorMessages.length; k++) {
				var li = document.createElement('li');
				li.innerHTML = allErrorMessages[k];
				ul.appendChild(li);
			}
			div.appendChild(ul);
			$validationSection.prepend($(div));
			//
			// Add error class to show all the error messages
			ul.className = 'error-messages';
			// set focus on first error-field
			$validationSection.find('.error-field').first().focus();
			// Hide above added error messages by removing the above added class after some time
			// $(div).addClass('show-errors').delay(2000).removeClass('show-errors');
			setTimeout((function () {
				this.addClass('show-errors');
			}).bind($(div)), 10);

			setTimeout((function () {
				this.removeClass('show-errors');
			}).bind($(div)), 3010);

			// return false to acknowledge
			return false;
		}
	};
	return {
		doValidate: doValidate
	};
})();