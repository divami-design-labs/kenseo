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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2JhYmVsLWFwcC9jb25maWcvdmFsaWRhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFVBQVUsR0FBRyxTQUFTLFVBQVUsQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7QUFPbkQsS0FBSSxDQUFDLGFBQWEsRUFBRTtBQUNuQixJQUFFLENBQUMsR0FBRyxDQUFDLHFFQUFxRSxDQUFDLENBQUM7QUFDOUUsU0FBTztFQUNQOztBQUFBLEFBRUQsS0FBSSxHQUFHLEdBQUc7QUFDVCxjQUFZLEVBQUUsd0JBQXdCO0VBQ3RDO0tBQ0csUUFBUSxHQUFHLElBQUk7S0FDZixJQUFJLEdBQUcsU0FBUyxJQUFJLEdBQUc7QUFDMUIsTUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqRCxNQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNqRSxNQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JELE1BQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUNuQixhQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDcEI7O0FBRUQsTUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7QUFDN0Isa0JBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0dBQ25DOztBQUVELE1BQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtBQUN2QixlQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7R0FDMUI7QUFDRCxTQUFPLFFBQVEsQ0FBQztFQUNoQjtLQUNHLFVBQVUsR0FBRyxTQUFTLFVBQVUsQ0FBQyxPQUFPLEVBQUU7QUFDN0MsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDeEMsT0FBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLGFBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUNsQjtFQUNEO0tBQ0csZUFBZSxHQUFHLFNBQVMsZUFBZSxDQUFDLE9BQU8sRUFBRSxFQUFFO0tBQ3RELFlBQVksR0FBRyxTQUFTLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRTtLQUNoRCxVQUFVLEdBQUcsU0FBUyxVQUFVLENBQUMsS0FBSyxFQUFFO0FBQzNDLE1BQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEMsTUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLE1BQUksQ0FBQyxHQUFHLEVBQUU7QUFDVCxVQUFPO0dBQ1A7QUFDRCxNQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7QUFDbEIsT0FBSSxRQUFRLEVBQUU7QUFDYixpQkFBYSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNuQztHQUNELE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFO0FBQzFCLE9BQUksUUFBUSxFQUFFO0FBQ2IsaUJBQWEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDcEMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDNUMsaUJBQWEsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdEM7R0FDRDtFQUNEO0tBQ0csYUFBYSxHQUFHLFNBQVMsYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7QUFDdEQsVUFBUSxHQUFHLEtBQUs7OztBQUFDLEVBR2pCO0tBQ0csYUFBYSxHQUFHLFNBQVMsYUFBYSxDQUFDLFlBQVksRUFBRTtBQUN4RCxNQUFJLE1BQU0sR0FBRyxzR0FBc0csQ0FBQztBQUNwSCxTQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7RUFDakMsQ0FBQzs7QUFFRixLQUFJLEVBQUUsQ0FBQztDQUNQLENBQUMiLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBWYWxpZGF0aW9uID0gZnVuY3Rpb24gVmFsaWRhdGlvbihmb3JtQ29udGFpbmVyKSB7XG5cdC8vIFRoZSB2YXJpYWJsZSBmb3JtQ29udGFpbmVyIGNhbiBiZSBhIEZvcm0gZWxlbWVudCBvciBhIGRpdiBlbGVtZW50LlxuXHQvL1xuXHQvLyB2ci1maWVsZCA9PiByZXF1aXJlZCBmaWVsZFxuXHQvLyB2dC1maWVsZCA9PiB0aW1lIGhvbGRpbmcgZmllbGRcblx0Ly9cblx0Ly8gY2hlY2sgd2hldGhlciB0aGUgY29udGFpbmVyIGlzIHBhc3NlZCBvciBub3Rcblx0aWYgKCFmb3JtQ29udGFpbmVyKSB7XG5cdFx0c2IubG9nKFwiVGhlIGFyZ3VtZW50IHBhc3NlZCB0byB2YWxpZGF0aW9ucyBmdW5jdGlvbiBpcyBlbXB0eS9udWxsL3VuZGVmaW5lZFwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0Ly8gQWxsIGVycm9yIG1lc3NhZ2VzIGFyZSBzdG9yZWQgaGVyZSBpbiBrZXkgdmFsdWUgcGFpci5cblx0dmFyIG1zZyA9IHtcblx0XHRcImVtcHR5X25hbWVcIjogXCJQbGVhc2UgZW50ZXIgYW55IGZpZWxkXCJcblx0fSxcblx0ICAgIG5vRXJyb3JzID0gdHJ1ZSxcblx0ICAgIGluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuXHRcdHZhciAkZmllbGRzID0gJChmb3JtQ29udGFpbmVyKS5maW5kKFwiLnZyLWZpZWxkXCIpO1xuXHRcdHZhciAkZGVwZW5kYWJsZUZpZWxkcyA9ICQoZm9ybUNvbnRhaW5lcikuZmluZChcIltkZXBlbmRhYmxlLW9uXVwiKTtcblx0XHR2YXIgJGRhdGVGaWVsZHMgPSAkKGZvcm1Db250YWluZXIpLmZpbmQoXCIudnQtZmllbGRcIik7XG5cdFx0aWYgKCRmaWVsZHMubGVuZ3RoKSB7XG5cdFx0XHRkb1ZhbGlkYXRlKCRmaWVsZHMpO1xuXHRcdH1cblxuXHRcdGlmICgkZGVwZW5kYWJsZUZpZWxkcy5sZW5ndGgpIHtcblx0XHRcdHNldERlcGVuZGVuY2llcygkZGVwZW5kYWJsZUZpZWxkcyk7XG5cdFx0fVxuXG5cdFx0aWYgKCRkYXRlRmllbGRzLmxlbmd0aCkge1xuXHRcdFx0dHJpZ2dlckRhdGVzKCRkYXRlRmllbGRzKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5vRXJyb3JzO1xuXHR9LFxuXHQgICAgZG9WYWxpZGF0ZSA9IGZ1bmN0aW9uIGRvVmFsaWRhdGUoJGZpZWxkcykge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgJGZpZWxkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGZpZWxkID0gJGZpZWxkc1tpXTtcblx0XHRcdGNoZWNrRmllbGQoZmllbGQpO1xuXHRcdH1cblx0fSxcblx0ICAgIHNldERlcGVuZGVuY2llcyA9IGZ1bmN0aW9uIHNldERlcGVuZGVuY2llcygkZmllbGRzKSB7fSxcblx0ICAgIHRyaWdnZXJEYXRlcyA9IGZ1bmN0aW9uIHRyaWdnZXJEYXRlcygkZmllbGRzKSB7fSxcblx0ICAgIGNoZWNrRmllbGQgPSBmdW5jdGlvbiBjaGVja0ZpZWxkKGZpZWxkKSB7XG5cdFx0dmFyIGtleSA9IGZpZWxkLmdldEF0dHJpYnV0ZShcInYtZmllbGRcIik7XG5cdFx0dmFyIGJsbkVtcHR5ID0gZmllbGQudmFsdWUubGVuZ3RoID09IDA7XG5cdFx0aWYgKCFrZXkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGtleSA9PSBcIm5hbWVcIikge1xuXHRcdFx0aWYgKGJsbkVtcHR5KSB7XG5cdFx0XHRcdHNldEVycm9yRmllbGQoZmllbGQsIFwiZW1wdHlfbmFtZVwiKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGtleSA9PSBcImVtYWlsXCIpIHtcblx0XHRcdGlmIChibG5FbXB0eSkge1xuXHRcdFx0XHRzZXRFcnJvckZpZWxkKGZpZWxkLCBcImVtcHR5X2VtYWlsXCIpO1xuXHRcdFx0fSBlbHNlIGlmICghdGhpcy52YWxpZGF0ZUVtYWlsKGZpZWxkLnZhbHVlKSkge1xuXHRcdFx0XHRzZXRFcnJvckZpZWxkKGZpZWxkLCBcImludmFsaWRfZW1haWxcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHQgICAgc2V0RXJyb3JGaWVsZCA9IGZ1bmN0aW9uIHNldEVycm9yRmllbGQoZmllbGQsIG1zZykge1xuXHRcdG5vRXJyb3JzID0gZmFsc2U7XG5cblx0XHQvLyBzZXQgZXJyb3IgZmllbGQgdG8gdGhlIGZpZWxkLlxuXHR9LFxuXHQgICAgdmFsaWRhdGVFbWFpbCA9IGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWxBZGRyZXNzKSB7XG5cdFx0dmFyIGZpbHRlciA9IC9eKFtcXHctXFwuXSspQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuKXwoKFtcXHctXStcXC4pKykpKFthLXpBLVpdezIsNH18WzAtOV17MSwzfSkoXFxdPykkLztcblx0XHRyZXR1cm4gZmlsdGVyLnRlc3QoZW1haWxBZGRyZXNzKTtcblx0fTtcblxuXHRpbml0KCk7XG59OyJdfQ==