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
	    ajaxCall: function(payload){
	    	$.ajaxSetup({ cache: false });
	    	var collection = payload.collection;
			var url = collection.urlRoot? collection.urlRoot: collection.url;
			$.ajax({
				url: "../server/" + url,
				data: {
					"data": payload.data,
					'client' : {
						sid : Kenseo.cookie.sessionid()	
					}
				},
				success: payload.success
			});
	    },
	    renderTemplate: function(templateString, $el, model, callBackFunc, data){
            var template = templates[templateString];
            // Setting the view's template property using the Underscore template method
            // Backbone will automatically include Underscore plugin in it.
            var compiler = _.template(template);
            if(model){
				
				sb.ajaxCall({
					"collection": model, 
					"data": data, 
					"success": function(response){
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
        	sb.renderTemplateOff(Kenseo.popup.info[key].page_name, $('.popup-container'), 
	        	{ 
	        		"data": Kenseo.popup,
	        		"key": key
	        	}
	    	);
	    	if(Kenseo.popup.info[key].callbackfunc){
	    		Kenseo.popup.info[key].callbackfunc();
	    	}
        },
        popup: {
        	resetPopupData: function(){
        		Kenseo.popup = {
        			"info": {},
        			"data": {}
        		}
        	},
        	firstLoader: function(){
				sb.loadFiles({
		            'models': ['Projects'],
		            'collections': ['Projects']
		        }, function(){
					
			    	sb.renderTemplate('dropdown', $('.dropdown'), new Kenseo.collections.Projects(), function(){
			            if(Kenseo.popup.data['project_name']){
			            	$('.dropdown').val(Kenseo.popup.data['project_name']);
			            	$('.main-btn').prop('disabled', false);	
			            } 
			        });
			        
			        $('.dropdown').on('change', function(){
			            if(this.selectedIndex){
			                Kenseo.popup.data['project_name'] = this.value;
			                Kenseo.popup.data['project_id'] = this.selectedOptions[0].getAttribute('name');                     
			                $('.main-btn').prop('disabled', false);
			            }
			            else{
			                $('.main-btn').prop('disabled', true);
			            }
			        });
				});
			},
			secondLoader: function(){
            	if(Kenseo.popup.data.fileName){
            		$('.create-file-item .notification-title').html(Kenseo.popup.data.fileName);
            		$('.create-file-item').show();
            		$('.main-btn').prop('disabled', false);
            	}
        		$('.upload-files-input').change(function(){
        			$('.create-file-item').show();
        			$('.create-file-item .notification-title').html(this.value);

        			Kenseo.popup.data.fileName = this.value;
        			$('.main-btn').prop('disabled', false);
        		});

        		sb.loadFiles({
        			'collections': ['Artefacts'],
        			'models': ['Artefacts']
        		},function(){
        			sb.renderTemplate('dropdown', $('.existing-files-dropdown'), new Kenseo.collections.Artefacts(), null, { projectid:Kenseo.popup.data['project_id'], sharepermission: true});
        			$('.dropdown').on('change', function(){
	                    if(this.selectedIndex){
	                        $('.main-btn').prop('disabled', false);
	                    }
	                    else{
	                        $('.main-btn').prop('disabled', true);
	                    }
	                });

	                $('.existing-files-chk').change(function(){
	                	$('.existing-files-dropdown').prop('disabled', !this.checked);
	                });

	                $('.create-file-close-icon').click(function(){
	                	$('.create-file-item').hide();
	                	$('.main-btn').prop('disabled', true);
	                	Kenseo.popup.data.fileName = null;
	                });
        		});
            },
            thirdLoader: function(){
            	sb.loadFiles({
            		'collections': ['References', 'Tags'],
            		'models': ['Artefacts']
            	}, function(){
            		sb.ajaxCall(
						{ 
							'collection': new Kenseo.collections.References(),
							'data': {ignore: 0, projectid: Kenseo.popup.data.project_id},
							'success': function(response){
								var objResponse = JSON.parse(response);
			            		$('.reference-files-text').on('keyup', function(){
			            			var self = this;
			            			var filteredData = _.filter(objResponse.data, function(item){
			            				if(self.value.length){
			            					$(self).parent().next('.reference-files-suggestions').show();
				            				var re = new RegExp("^" + self.value, "i");
				            				return re.test(item.name);
				            			}
				            			else{
				            				return false;
				            			}
			            			});
			            			sb.renderTemplateOff('reference-items', $(this).parent().next('.reference-files-suggestions'), {data: filteredData});
			            			$('.reference-suggestion-item').click(function(){
			            				var $holder = $(this).parent().next();
			            				var html = $holder.html();
			            				$holder.html(html + '<div class="reference-item" name="' + this.getAttribute('name') + '">' + this.innerHTML + '<div class="reference-item-close-icon"></div></div>');
			            				$(this).parent().hide();
			            				self.value = "";
			            			});
			            		});
							}
						}
					);


					// Tags listing
					
            	});
            },
            fourthLoader: function(){

            }
		}
	};
})();