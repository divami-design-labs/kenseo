// get the clicked element
// if the clicked element is done button get popup body else get the clicked field section
// get all the field sections of popup body
// get k-required fields of all fieldSections
// validate each requied field based on the "data-validate-this" attribute
// for each error field display error message

var validation = (function(){
	var validatingCounter = 0;
	var allValidations = {
		'empty': function(value, $requiredField){
				this.fieldName = $requiredField.parents('.field-section').find('.input-label').html() || $requiredField.data('v-label');
				return !!$.trim(value).length;
		},
		'email': function(value, $requiredField){
				var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
				return filter.test(value);
		},
	}
	// displays border color red if the input is invalid
	var addErrorSkinning = function($requiredField){
		$requiredField.parents('.field-section').find('.field-section-wrapper').addClass('error-field');
	}
	// removes border color of input field if it is valid
	var removeErrorSkinning = function($requiredField){
		$requiredField.parents('.field-section').find('.field-section-wrapper').removeClass('error-field');
	}

	var validateRequiredField = function($requiredField, validatingTokens){
		var value = $requiredField.val();
		validatingTokens.forEach(function(validatingToken){

			var validate = allValidations[validatingToken];
			// validating required field based on validating token
			if(!validate(value, $requiredField)){
				validatingCounter++;
				// highlighting the error field
				addErrorSkinning($requiredField);
				$requiredField.parents(".field-section").find(".field-section-error-messages").children().hide();
				// displaying input field error message
				$requiredField.parents(".field-section").find("[trigger ='"+ validatingTokens[i]+"']").show();
				return true;
			}
		});
	}

	// validate single input field
	var isFieldValidate = function($field) {
		var $fieldSections = $field.parents('.field-section');
		validate($fieldSections);
	}

	// validates entire form
	var isFormValidate = function($clickedBtn){
		var $form = $clickedBtn.parents('.k-form');
		var $fieldSections = $form.find('.field-section');
		validate($fieldSections);
		if(validatingCounter == 0) {
			return true;
		} else {
			return false;
		}
	}

	var validate = function($fieldSections) {
		// finding the validating field
		var $requiredFields = $fieldSections.find('.k-required');
		//removes the error message of single input field
		$requiredFieldSections = $fieldSections.filter(function(i, el){
			return $(el).find('.k-required').length !== 0;
		})
		$requiredFieldSections.each(function(){
			var $field = $(this).find('.field-section-wrapper');
			removeErrorSkinning($field);
			$field.parents(".field-section").find(".field-section-error-messages").children().hide();
		});

		_.each($requiredFields, function($requiredField){
			// gets validating attributes of all required fields
			var validatingString = $requiredFields.attr('data-validate-this');
			if(validatingString){
				var validatingTokens = validatingString.split(",");
				// function to validate all the required fields
				validateRequiredField($($requiredField), validatingTokens);
			}
		})
	}
	// function gets the clicked button element from dynamic-events.js file
	var doFormValidate = function($clickedBtn){
		//initializing counter
		validatingCounter = 0;
		if(isFormValidate($clickedBtn)){
			return true;
		}
	}
	// function gets the clicked input field element from dynamic-events.js file
	var doFieldValidate = function($field){
		if(isFieldValidate($field)){
			return true;
		}
	}
	return {
		doFormValidate: doFormValidate,
		doFieldValidate: doFieldValidate
	}
})();
