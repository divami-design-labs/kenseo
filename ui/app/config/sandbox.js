var sb = (function(){
	var labels = {
		popupContainer: '.popup-container'
	};
	function log(msg){
		console.log(msg);
	}
	return {
		log: log,
		loadFiles: function(payload, fn){
   			var counter = 0;
   			var head = document.head || document.getElementsByTagName("head")[0];
   			var totalLength = 	(payload.files  && payload.files.length  || 0) +
   								(payload.collections  && payload.collections.length  || 0) +
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
		    if(payload.collections){
		    	var collections = payload.collections;
				for (var i = 0; i < collections.length; i++) {
					if(i18n.collections[collections[i]]){
						counter++;
	                	if(counter === totalLength){
	                		fn();
	                	}
					}
					else{
	                var fileref = document.createElement('script');
		                fileref.setAttribute("type", "text/javascript");
		                fileref.setAttribute("src", 'app/modules/collections/' + collections[i] + 'Collection.js');
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
	    renderTemplate: function(templateString, $el, model, callBackFunc, data){
            var template = templates[templateString];
            // Setting the view's template property using the Underscore template method
            // Backbone will automatically include Underscore plugin in it.
            var compiler = _.template(template);
            $.ajaxSetup({ cache: false });
            if(model){
				var url = model.urlRoot? model.urlRoot: model.url;
	
				$.ajax({
					url: "http://localhost/kenseo/server/" + url,
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
        closePopup: function(el){
        	function popupCloser($el){
        		$el.hide();
        		$el.find('.popup').remove();
        	}
        	$(document).on('click', el, function(){
        		popupCloser($(this).parents(labels.popupContainer));
        	})
        	.on('keyup', function(e){
        		var keycode = e.which || e.keyCode;
        		if(keycode == 27){
        			popupCloser($(el).parents(labels.popupContainer));
        		}
        	})
        	.on('click', labels.popupContainer + " .lnk-btn", function(e){
        		e.preventDefault();
        		popupCloser($(this).parents(labels.popupContainer));
        	});
        }
	};
})();