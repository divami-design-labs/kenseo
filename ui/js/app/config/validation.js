var Validation = function Validation(formContainer) {
	// The variable formContainer can be a Form element or a div element.
	//
	// vr-field => required field
	// vt-field => time holding field
	//
	// check whether the container is passed or not
	if (!formContainer) {
		sb.log("The argument passed to validations function is empty/null/undefined");
		return;
	}
	// All error messages are stored here in key value pair.
	var msg = {
		"empty_name": "Please enter any field"
	},
	    noErrors = true,
	    init = function init() {
		var $fields = $(formContainer).find(".vr-field");
		var $dependableFields = $(formContainer).find("[dependable-on]");
		var $dateFields = $(formContainer).find(".vt-field");
		if ($fields.length) {
			doValidate($fields);
		}

		if ($dependableFields.length) {
			setDependencies($dependableFields);
		}

		if ($dateFields.length) {
			triggerDates($dateFields);
		}
		return noErrors;
	},
	    doValidate = function doValidate($fields) {
		for (var i = 0; i < $fields.length; i++) {
			var field = $fields[i];
			checkField(field);
		}
	},
	    setDependencies = function setDependencies($fields) {},
	    triggerDates = function triggerDates($fields) {},
	    checkField = function checkField(field) {
		var key = field.getAttribute("v-field");
		var blnEmpty = field.value.length == 0;
		if (!key) {
			return;
		}
		if (key == "name") {
			if (blnEmpty) {
				setErrorField(field, "empty_name");
			}
		} else if (key == "email") {
			if (blnEmpty) {
				setErrorField(field, "empty_email");
			} else if (!this.validateEmail(field.value)) {
				setErrorField(field, "invalid_email");
			}
		}
	},
	    setErrorField = function setErrorField(field, msg) {
		noErrors = false;

		// set error field to the field.
	},
	    validateEmail = function validateEmail(emailAddress) {
		var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		return filter.test(emailAddress);
	};

	init();
};