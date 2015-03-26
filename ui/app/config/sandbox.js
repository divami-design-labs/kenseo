var sb = (function(){
	function log(msg){
		console.log(msg);
	}
	return {
		log: log,
		loadFiles: function(payload, fn){
   			var counter = 0;
   			var head = document.head || document.getElementsByTagName("head")[0];
   			var totalLength = 	(payload.files  && payload.files.length  || 0) +
   								(payload.views  && payload.views.length  || 0) +
   								(payload.models && payload.models.length || 0);
   			if(payload.files){
   				var files = payload.files;
				for (var i = 0; i < files.length; i++) {
	                var fileref = document.createElement('script');
	                fileref.setAttribute("type", "text/javascript");
	                fileref.setAttribute("src", files[i]);
	                fileref.onload = function(){
	                	counter++;
	                	if(counter === totalLength){
	                		fn();
	                	}
	                }
	                head.appendChild(fileref);
		        }
		    }

		    if(payload.views){
		    	var views = payload.views;
				for (var i = 0; i < views.length; i++) {
					if(i18n.views[views[i]]){
						counter++;
	                	if(counter === totalLength){
	                		fn();
	                	}
					}
					else{
	                var fileref = document.createElement('script');
		                fileref.setAttribute("type", "text/javascript");
		                fileref.setAttribute("src", 'app/modules/views/' + views[i] + 'View.js');
		                fileref.onload = function(){
		                	counter++;
		                	if(counter === totalLength){
		                		fn();
		                	}
		                }
		                head.appendChild(fileref);
		            }
		        }
		    }
		    if(payload.models){
		    	var models = payload.models;
				for (var i = 0; i < models.length; i++) {
					if(i18n.models[models[i]]){
						counter++;
	                	if(counter === totalLength){
	                		fn();
	                	}
					}
					else{
		                var fileref = document.createElement('script');
		                fileref.setAttribute("type", "text/javascript");
		                fileref.setAttribute("src", 'app/modules/models/' + models[i] + 'Model.js');
		                fileref.onload = function(){
		                	counter++;
		                	if(counter === totalLength){
		                		fn();
		                	}
		                }
		                head.appendChild(fileref);
		            }
		        }
		    }
	        if(totalLength === 0){
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
	    renderTemplate: function(templateString, $el, model){
            var template = templates[templateString];
            // Setting the view's template property using the Underscore template method
            // Backbone will automatically include Underscore plugin in it.
            var compiler = _.template(template);
            if(model){
	            model.fetch().then(function(x){
	                // Dynamically updates the UI with the view's template
	                $el.html(compiler(x));            
	            });
            }
            else{
            	$el.html(compiler());
            }
        },
        timeFormat: function(time){
        	return time;
        }
	};
})();