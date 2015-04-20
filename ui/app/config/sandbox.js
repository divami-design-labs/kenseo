var sb = (function(){
	var labels = {
		popupContainer: '.popup-container'
	};
	var scripts = {
		'views': {},
		'models': {},
		'collections': {},
		'files': {}
	}
	function log(msg){
		console.log(msg);
	}
	function getModulePath(moduleType, moduleName){
		return 'app/modules/' + moduleType + '/' + moduleName + _.capitalize(moduleType).substring(0, moduleType.length - 1) + '.js';
	}
	return {
		log: log,
		loadFiles: function(payload, fn){
   			var counter = 0;
   			var blnCallbackCalled = false;
   			var head = document.head || document.getElementsByTagName("head")[0];
   			var totalLength = 	(payload.files  && payload.files.length  || 0) +
   								(payload.collections  && payload.collections.length  || 0) +
   								(payload.views  && payload.views.length  || 0) +
   								(payload.models && payload.models.length || 0);

   			var types = ['files', 'views', 'models', 'collections'];
   			for(var k = 0;k<types.length; k++){
   				var type = types[k];
	   			if(payload[type]){
	   				var files = payload[type];
					for (var i = 0; i < files.length; i++) {
						var file = files[i];

						// Checking the file whether it is already loaded or not.
						if(!scripts[type][file]){

							// Creating a new script tag.
			                var fileref = document.createElement('script');
			                fileref.setAttribute("type", "text/javascript");

		                	var src = type === "files"? file: getModulePath(type, file);

			                fileref.setAttribute("src", src);

			                // Setting the loaded flag to true to avoid loading a same file again.
			                scripts[type][file] = true;

			                // Used to call a callback function
			                fileref.onload = function(){
			                	// Incrementing counter to track number files loaded
			                	counter++;

			                	// Calling a global callback function provided by user.
			                	if(counter === totalLength){
			                		blnCallbackCalled = true;
			                		fn();
			                	}
			                }

			                // Appending the script tag to the head tag.
			                head.appendChild(fileref);
			            }
			            else{
			            	// Only incrementing the counter value if the file is already has been loaded.
			            	counter++;
			            }
			        }
			    }
   			}

   			// In case when all files were already loaded or there are no files to load,
   			// the callback function will not get called
   			// To cover that case, the following check is done.
	        if(totalLength === 0 || (totalLength === counter && !blnCallbackCalled)){
	        	fn();
	        }
        },
        getPath: function(type, fileName){
			var o = i18n[type];
			if(!o){
				sb.log("getPath: getPath type is invalid");
			}
			var k = o[fileName];
			if(!k){
				sb.log("getPath: fileName is invalid");
			}
			return k;
		},
		viewPortSwitch : function(callBackFunc){
	        var ua = navigator.userAgent || navigator.vendor || window.opera;
	        var production = false;
	        // Mobile/Tablet Logic
	        if((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua)) {
	            // Mobile/Tablet CSS and JavaScript files to load
	            filesToLoad = {
	                'js': [],
	                'css': []
	            };
	        }
	        // Desktop Logic
	        else {
	            // Desktop CSS and JavaScript files to load
	            filesToLoad = {
	                'js': []
	            };
	        }
	        sb.loadFiles(filesToLoad.js, callBackFunc);
	    },
	    renderTemplate: function(templateString, $el, model, callBackFunc, data){
            var template = templates[templateString];
            // Setting the view's template property using the Underscore template method
            // Backbone will automatically include Underscore plugin in it.
            var compiler = _.template(template);
            $.ajaxSetup({ cache: false });
            if(model){
				var url = model.urlRoot? model.urlRoot: model.url;
	
				$.ajax({
					url: "../server/" + url,
					data: {
						"data": data,
						'client' : {
							sid : Cookie.getCookie('DivamiKenseoSID')	
						}
					},
					success: function(response){
						if(response){
							var obj = JSON.parse(response);
						}
						else{
							var obj = {};
						}
						// console.dir(obj);
		                $el.html(compiler(obj));  
		                if(callBackFunc){
		                	callBackFunc();
		                }
					}
				});
            }
            else{
            	$el.html(compiler());
            	if(callBackFunc){
                	callBackFunc();
                }
            }
        },
        renderTemplateOff: function(templateString, $el, obj){
        	var template = templates[templateString];
            var compiler = _.template(template);
            $el.html(compiler(obj));
        },
        // handle: function(response) {

        // }
        timeFormat: function(time){
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		    var theDate = new Date(time);
		    var currentDate = new Date();
		    
		    var year = theDate.getFullYear();
		    var month = theDate.getMonth();
		    var day = theDate.getDate();
		    
		    var currentYear = currentDate.getFullYear();
		    var currentMonth = currentDate.getMonth();
		    var currentDay = currentDate.getDate();
		    
		    var resultDateFormat = "";
		    if(currentYear !== year){
		        resultDateFormat = day + " " + months[month] + " " + year;
		    }
		    else if(month == currentMonth && day === currentDay - 1){
		        resultDateFormat = "yesterday";
		    }
		    else if(month === currentMonth && day === currentDay){
		        resultDateFormat = "today";
		    }
		    else{
		        resultDateFormat = day + " " + months[month];
		    }
		    return resultDateFormat;
        },
        getTime: function(time){
        	var fullDate = new Date(time);
        	var hours = fullDate.getHours();
        	var minutes = fullDate.getMinutes();
        	if(hours > 11){
        		hours = ("0" + (hours - 12)).slice(-2);
        		return hours + ": " + minutes + " PM";
        	}
        	else{
        		return hours + ": " + minutes + " AM";	
        	}
        },
        getPopupsInfo: function(info){
        	return Kenseo.popups.getPopupsInfo(info);
        },
        callPopup: function(key){
        	sb.renderTemplateOff(Kenseo.popup[key].page_name, $('.popup-container'), 
	        	{ 
	        		"data": Kenseo.popup,
	        		"key": key
	        	}
	    	);
	    	if(Kenseo.popup[key].callbackfunc){
	    		Kenseo.popup[key].callbackfunc();
	    	}
        }
	};
})();