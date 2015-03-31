function ServerConnection() {
	this.ajaxPayload = null;
	this.successHandlesrMethod = null;
	this.failureHandlesrMethod = null;
	
	this.buildAjaxPayload = function(options) {
		//builds the requried paylod to make ajax call
		console.log("insdide send Request Method")
		//get this url from the api calllist based on command/key
		var urlDetails = buildUrl(options.command);
		var url = urlDetails.url;
		var type = urlDetails.type;
		var timeout = urlDetails.timeout;
		var data = {
			'data': options.data,
			'client' : {
				sid : Cookie.getCookie('DivamiKenseoSID')	
			}
		}
		this.ajaxPayload = {
			url: url,
			type: type,
			data : data,
			dataType: "json",
			success: "defaultSuccessHandler",
			error: "defaultFailureHandler",
			contentType: "application/json",
			cache : false,
			timeout: timeout
		};
	}
	
	this.send = function() {
		//AJAX call is made here
		$.ajax(this.ajaxPayload);
	}
	
	this.setSuccessHandler = function(method) {
		//USER DEFINED SUCCESS CALLBACK
		this.successHandlesrMethod = method;
	}
	
	this.setErrorHandler = function(method) {
		//USER DEFINED FAILURE CALLBACK
		this.failureHandlesrMethod = method;
	}
	
	var defaultSuccessHandler = function(response) {
		//handles when we get response from server
		response = JSON.parse(response); 
		if(this.successHandlesrMethod != null) {
			this.successHandlesrMethod(response);
		}
	}
	
	var defaultFailureHandler = function() {
		//handles when the call failed to reach the server like error 500
		if(this.failureHandlesrMethod != null) {
			this.failureHandlesrMethod(response);
		}
	}
	
	var buildUrl= function(key) {
		var serverPath = "http://localhost:8088/git/kenseo/server";
		var call = {
			url : serverPath + '/' + APIList[key][0],
			type: APIList[key][1],
			timeout : APIList[key][1]
		}
		return call
	}
}