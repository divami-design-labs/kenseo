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
		getDump: function(p){
			var n = {};
			for(var k in p){
				n[k] = p[k].split(" ").join("\r");
			}
			return JSON.stringify(n);
		},
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
	    saveData: function(payload){
	    	var popupData = Kenseo.popup.data;
			for(key in popupData){
				data.append(key, popupData[key]);
			}
			payload.data = popupData;
			ajaxCall(payload);
	    },
	    getUrl: function(p){
			var relativePath = "../server/";
			if(p.collection){
				return relativePath + p.collection.url;
			}
			else if(p.model){
				return relativePath + p.model.urlRoot;
			}
			else if(p.url){
				return p.url;
			}
			return false;
	    },
	    ajaxCall: function(payload){
	    	$.ajaxSetup({ cache: false });
			// var url = payload.url || collection.urlRoot || collection.url;
			var url = sb.getUrl(payload);
			$.ajax({
				url: url,
				data: {
					"data": payload.data,
					'client' : {
						sid : Kenseo.cookie.sessionid()	
					}
				},
				type: payload.type || "GET",
				success: function(response) {
					if(JSON.parse(response).status == 'success') {
						if(!payload.excludeDump){
							sb.setDump(response);
						}
						payload.success(response);
					} else {
						 window.location.assign("http://kenseo.divami.com");
					}
				}
			});
	    },
	    setDump: function(response){
	    	var obj = JSON.parse(response);
	    	var key = obj.command.slice(3).toLowerCase(); // removing "get" prefix
			var dump = Kenseo.data[key];
			for(var i=0; i<obj.data.length; i++){
				var data = obj.data[i];
				if(!dump){
					dump = {};
				} 
				dump[data.id] = data;
			}
			Kenseo.data[key] = dump;
	    },
	    renderTemplate: function(p){
            var template = templates[p.templateName];
            // Setting the view's template property using the Underscore template method
            // Backbone will automatically include Underscore plugin in it.
            var compiler = _.template(template);
            var url = sb.getUrl(p);
            if(url){
				sb.ajaxCall({
					"url": url, 
					"data": p.data, 
					"success": function(response){
						if(response){
							var obj = JSON.parse(response);
						}
						else{
							var obj = {};
						}
						// console.dir(obj);
		                p.templateHolder.html(compiler(obj));  
		                if(p.callbackfunc){
		                	p.callbackfunc();
		                }
		            }
				});
            }
            else{
            	p.templateHolder.html(compiler(p.data));
            	if(p.callbackfunc){
                	p.callbackfunc();
                }
            }
        },
        timeFormat: function(time, OnlyTime, OnlyDays){
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
		    var text = "";
		    if(currentYear !== year){
				text = OnlyTime? "": "On ";
		        resultDateFormat = text + day + " " + months[month] + " " + year;
		    }
		    else if(month === currentMonth && day === currentDay){
		    	text = OnlyTime? "": "@ ";
		    	if(OnlyDays){
		    		resultDateFormat = text + day + " " + months[month];	
		    	}
		    	else{
			        resultDateFormat = text + sb.getTime(time);
			    }
		    }
		    else{
		    	text = OnlyTime? "": "On ";
		        resultDateFormat = text + day + " " + months[month];
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
        getDayTime: function(time){

        },
        getDayWiseData: function(data){
        	if(data.length){
	        	var newData = {};
				for(var i=0; i<data.length; i++){
					var d = data[i];
					var time = sb.timeFormat(d.time, true, true);
					if(!newData[time]){
						newData[time] = [];
						newData[time].push(d);
					}
					else{
						newData[time].push(d);
					}
				}
				return newData;
			}
			else{
				return false;
			}
        },
        getPopupsInfo: function(info){
        	return Kenseo.popups.getPopupsInfo(info);
        },
        callPopup: function(key){
        	var info = Kenseo.popup.info[key];
        	sb.renderTemplate({"templateName": info.page_name, "templateHolder": $('.popup-container'), 
	        	"data": { 
	        		"data": info,
	        		"key": key
	        	}
	    	});
	    	if(info.callbackfunc){
	    		info.callbackfunc();
	    	}
        },
        page: {
        	
        },
        popup: {
        	resetPopupData: function(){
        		Kenseo.popup = {
        			"info": {},
        			"data": {}
        		}
        	},
        	getProjectsPopup: function(){
				sb.loadFiles({
		            'models': ['Projects'],
		            'collections': ['Projects']
		        }, function(){
					Kenseo.dropdown.name = "Choose a project..";
			    	sb.renderTemplate({"templateName": 'dropdown', "templateHolder": $('.dropdown'), "collection": new Kenseo.collections.Projects(), "callbackfunc": function(){
			            if(Kenseo.popup.data['project_name']){
			            	$('.dropdown').val(Kenseo.popup.data['project_name']);
			            	$('.main-btn').prop('disabled', false);	
			            } 
			        },"data": {userProjects: true}});
			        
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
			createFilePopup: function(){
				Kenseo.dropdown.name = "Choose an Artefact..";
            	if(Kenseo.popup.data.fileName){
            		$('.create-file-item .notification-title').html(Kenseo.popup.data.fileName);
            		$('.create-file-item').css({'visibility': 'visible'});
            		$('.main-btn').prop('disabled', false);
            	}
        		$('.upload-files-input').change(function(){
        			$('.create-file-item').css({'visibility': 'visible'});
        			$('.create-file-item .notification-title').html(this.value);
					
					Kenseo.popup.data.file = this.files[0];
        			Kenseo.popup.data.fileName = this.value;
        			$('.main-btn').prop('disabled', false);
        		});

        		sb.loadFiles({
        			'collections': ['Artefacts'],
        			'models': ['Artefacts']
        		},function(){
        			sb.renderTemplate({"templateName": 'dropdown', "templateHolder": $('.existing-files-dropdown'), "collection": new Kenseo.collections.Artefacts(), "data": { projectid:Kenseo.popup.data['project_id'], sharepermission: true}});
        			$('.dropdown').on('change', function(){
	                    if(this.selectedIndex){
	                        $('.main-btn').prop('disabled', false);
	                        Kenseo.popup.data['artefact_id'] = this.selectedOptions[0].getAttribute('name');;
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
            teamPopup: function(){
            	Kenseo.popup.data.share = false;
            	sb.loadFiles({
            		'collections': ['Artefacts', 'Tags'],
            		'models': ['Artefacts']
            	}, function(){
            		sb.ajaxCall(
						{ 
							'collection': new Kenseo.collections.Artefacts(),
							'data': {references: true, ignore: 0, projectid: Kenseo.popup.data.project_id},
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
			            			sb.renderTemplate({"templateName": 'reference-items', "templateHolder": $(this).parent().next('.reference-files-suggestions'), "data": {data: filteredData}});
			            			$('.reference-suggestion-item').click(function(){
			            				var $holder = $(this).parent().next();
			            				var html = $holder.html();
			            				$holder.html(html + '<div class="reference-item" name="' + this.getAttribute('name') + '">' + this.innerHTML + '<div class="reference-item-close-icon"></div></div>');
			            				$(this).parent().hide();
			            				self.value = "";
			            			});

			            			$(document).on('click', '.reference-item-close-icon', function(){
			            				$(this).parent().remove();
			            			});
			            		});
							}
						}
					);


					// Tags listing
					sb.ajaxCall(
						{ 
							'collection': new Kenseo.collections.Tags(),
							'data': {},
							'success': function(response){
								var objResponse = JSON.parse(response);
			            		$('.tags-text').on('keyup', function(){
			            			var self = this;
			            			var filteredData = _.filter(objResponse.data, function(item){
			            				if(self.value.length){
			            					$(self).parent().next('.tags-suggestions').show();
				            				var index = item.tag_name.toLowerCase().indexOf(self.value.toLowerCase());
				            				return (index != -1) ? true : false;
				            			}
				            			else{
				            				return false;
				            			}
			            			});
			            			
									sb.renderTemplate({"templateName": 'reference-items', "templateHolder": $(this).parent().next('.reference-files-suggestions'), "data": {data: filteredData}});
			            			$('.reference-suggestion-item').click(function(){
			            				var $holder = $(this).parent().next();
			            				var html = $holder.html();
			            				$holder.html(html + '<div class="reference-item" name="' + this.getAttribute('name') + '">' + this.innerHTML + '<div class="reference-item-close-icon"></div></div>');
			            				$(this).parent().hide();
			            				self.value = "";
			            			});
			            			
			            			$(document).on('click', '.reference-item-close-icon', function(){
			            				$(this).parent().remove();
			            			});
			            		});
							}
						}
					);
					
            	});
            },
            shareWithPeoplePopup: function(){
				Kenseo.popup.data.share = true;
            },
            meetingIvite: function() {
            	sb.loadFiles({
		            'models': ['Projects', 'People'],
		            'collections': ['Projects', 'People']
		        }, function(){
		        	$('.input-meeting-date').Zebra_DatePicker({
		        		default_position: 'below',
		        		format: 'M d, Y',
		        		 onSelect: function(display, date) {
		        		 	console.log("changed something");
		        		 	Kenseo.popup.data.date = date;
		        		 },
		        		 
		        	});
		        	
				    $('.meeting-venue').on ('focusout', function() {
				    	venue = this.value;
				    });
				    
				    $('.meeting-agenda').on ('focusout', function() {
				    	agenda = this.value;
				    });
				    
				    $('.fromTime').on ('change', function() {
				    	console.log('from time changed')
				    });
				    $('.toTime').on ('change', function() {
				    	console.log("totime changed")
				    });
				    
				    $('.toTime').on ('select', function() {
				    	console.log("totime changed")
				    });
				    
				    
				    $('.meeting-btn').on('click', function(e) {
						//     	sb.ajaxCall({
						// 	collection : {
						// 		"url": "setMeetingInvitaion"
						// 	},
						// 	data : {
						// 		location : Kenseo.popup.data.venue,
						// 		projectId: Kenseo.popup.data.projectId,
						// 		projectName: Kenseo.popup.data.projectName,
						// 		fromTime : "2015-03-06T10:00:00.000-07:00",
						// 		toTime : "2015-03-06T10:25:00.000-07:00",
						// 		attendees: Kenseo.popup.data.selectedUsers
						// 	},
						// 	type: 'POST',
						// 	success : function(response){
						// 		alert ("success");
						// 	}
						// });
						connect = new ServerConnection();
						connect.buildAjaxPayload({
				    	  	command : 'setMeetingInvitaion',
				    	  	data : {
				    	  		location : Kenseo.popup.data.venue,
								projectId: Kenseo.popup.data.projectId,
								projectName: Kenseo.popup.data.projectName,
								fromTime : Kenseo.popup.data.date + "T10:00:00.000-07:00",
								toTime : Kenseo.popup.data.date + "T10:25:00.000-07:00",
								attendees: Kenseo.popup.data.selectedUsers
				    	  	},
							type: 'POST',
							success : function(response){
								alert ("success");
							}
				    	});
				    	connect.send();
					});
					sb.ajaxCall({ 
						'collection': new Kenseo.collections.Projects(),
						'data': {},
						'success': function(response){
							var objResponse = JSON.parse(response);
		            		$('.meeting-project-name').on('keyup', function(){
		            			var self = this;
		            			var filteredData = _.filter(objResponse.data, function(item){
		            				if(self.value.length){
		            					$(self).parent().next('.project-suggestions').show();
			            				var re = new RegExp("^" + self.value, "i");
			            				return re.test(item.name);
			            			}
			            			else{
			            				return false;
			            			}
		            			});
		            			if(filteredData.length > 0) {
			            			sb.renderTemplate({"templateName": 'reference-items', "templateHolder": $(this).parent().next('.project-suggestions'), "data": {data: filteredData}});
		            			} else {
		            				$('.project-suggestions').hide();
		            			}
		            			$('.reference-suggestion-item').click(function(){
		            				$('.meeting-project-name')[0].value = this.innerText;
		            				var projectId = this.getAttribute('name');
		            				Kenseo.popup.data.projectId = projectId;
		            				Kenseo.popup.data.projectName = this.innerText;
		            				
		            				$(this).parent().hide();
		            				Kenseo.popup.data.selectedUsers = new Array();
		            				// now set the project people
		            				sb.ajaxCall({ 
										'collection': new Kenseo.collections.People(),
										'data': {
											projectId : projectId
										},
										'success': function(response){
				            				var objResponse = JSON.parse(response);
				            				$('.people-name').on('keyup', function(){
				            					var self = this;
						            			var filteredData = _.filter(objResponse.data, function(item){
						            				if(self.value.length){
						            					$(self).parent().parent().next('.people-suggestions').show();
							            				var re = new RegExp("^" + self.value, "i");
							            				return re.test(item.name);
							            			}
							            			else{
							            				return false;
							            			}
						            			});
						            			if(filteredData.length > 0) {
							            			sb.renderTemplate({"templateName": 'reference-items', "templateHolder": $(this).parent().parent().next('.people-suggestions'), "data": {data: filteredData}});
						            			} else {
						            				$('.people-suggestions').hide();
						            			}
						            			$('.reference-suggestion-item').click(function(){
						            				$('.people-name')[0].value = this.innerText;
						            				var selectedUser = this.innerText;
						            				Kenseo.popup.data.selectedUsers.push({
						            					id : this.getAttribute('name'),
						            					email: this.getAttribute('email')
						            				})
						            				$('.names-holder').append(" <div class='tag'>" + selectedUser + "<div class='tag-close'></div</div>");
						            				
						            				self.value = "";
						            				$(this).parent().hide();
						            			});
				            				});
				            			}
			            			});
		            			});
		            		});
						}
					});
				});
            }
		}
	};
})();