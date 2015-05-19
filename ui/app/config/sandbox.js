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
	    	var popupData = sb.getPopupData();
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
			if(obj.data.length){
				for(var i=0; i<obj.data.length; i++){
					var data = obj.data[i];
					if(!dump){
						dump = {};
					} 
					dump[data.id] = data;
				}
				Kenseo.data[key] = dump;
			}
	    },
	    getRelativePath: function(str){
	    	return '../server/' + str;
	    },
	    getStandardData: function(p){
	    	p = p || {};
	    	var data = _.cloneDeep(p.data);
	    	if(p.data){
		    	p.data = {
	    			client: {
	    				sid: Kenseo.cookie.sessionid()
	    			},
	    			data: data
		    	}
		    }

	    	return p;
	    },
	    renderXTemplate: function(_this, p){
			// debugger;
			p = p || {};
			var colStr = _this.colStr;
			var data = _this.data;
			if(colStr){
				var collection = new Kenseo.collections[colStr]();
				sb.fetch(collection, data, function(response){
					// _.each(x.data, _this.renderArtefact);
					if(_this.preLoader){
						_this.preLoader(response);
					}


					var data = response.data;
					var el = $(_this.el);
					if(!el || !el.length){
						el = $(_this.$el);
					}

					if(data.length > 0){
						var c = new Kenseo.collections[colStr](data);
						c.each(function(item){
							var artefact = _this.itemView({model: item});
							el.append(artefact.render().$el);
						});
					}
					else{
						var html = _this.noItemsTemplate({data: p.noData});
						el.html(html);
					}
				});
			}
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
						if(p.templateHolder) {
			                p.templateHolder.html(compiler(obj));  
						}
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
        getDynamicData: function(str, id){
        	var key = Kenseo.data[str];
        	if(key){
        		return key[id];
        	}
        	else{
        		sb.log("provide valid key id pair");
        	}
        },
        setPageData: function(val){
        	Kenseo.page.data = val;
        },
        getPopupData: function(key){
        	if(key){
        		return Kenseo.popup.data[key];
        	}
        	else{
	        	return Kenseo.popup.data;
	        }
        },
        setPopupData: function(value, key){
        	if(key){
        		Kenseo.popup.data[key] = value;
        	}
        	else{
        		Kenseo.popup.data = value;
        	}
        },
        navigate: function(str, el){
	        var $self = $(el);
			// var key = $self.data("key");
			// var id = $self.data("id");
			// if(key){
			// 	// Storing the current dump data in popup's data
			//     Kenseo[str].data = Kenseo.data[key][id];
			// }
		    if(str == "popup"){
	        	var index = $self.data('index') || 0;
	        	$('.popup-container').show();
		        // Important: this should be called after dump object is stored in the Kenseo.popup.data
		        Kenseo.popup.info = sb.getPopupsInfo($self.data('url'));
		        if(index > 0) {
		        	Kenseo.popup.info = Kenseo.popup.info.slice(index);
			        index = 0;
		        }
		        sb.callPopup(index);
		    }
        },
        callPopup: function(index){
        	var info = Kenseo.popup.info[index];
        	sb.renderTemplate({"templateName": info.page_name, "templateHolder": $('.popup-container'), 
	        	"data": { 
	        		"data": info,
	        		"index": index
	        	}
	    	});
	    	if(info.callbackfunc){
	    		info.callbackfunc();
	    	}
        },
        toolbox: {
        	textBox: function(data){
        		return _.template(templates['textbox'])({data: data});
        	},
        	buttons: function(data, index){
        		return _.template(templates['buttons'])({"data": data, "index": index});
        	},
        	comboBox: function(data){
        		return _.template(templates['combobox'])({"data": data});
        	},
    //     	applyComboBox: function(data){
				// sb.fetch(data.collection, data.data, function(response){
				// 	if(data.callbackfunc){
				// 		data.callbackfunc();
				// 	}
				// 	var combobox = new comboBox(data.elem, response.data, {
				// 		"placeholder": data.placeholder,
				// 		"disabled": data.disabled
				// 	});
				// 	combobox.onchange = data.onchange;
				// 	if(data.postLoader){
				// 		data.postLoader(combobox);
				// 	}
				// });
    //     	},
        	applyComboBox: function(data){
				var combobox = new comboBox(data.elem, data.data, data.settings);
				combobox.onchange = data.onchange;
				return combobox;
        	}
        },
        page: {
        	
        },
        overlay: {

        },
    	fetch: function(collection, data, func){
    		collection.fetch(sb.getStandardData({data: data})).then(func);
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
					sb.ajaxCall({
						collection: new Kenseo.collections.Projects(),
						data: {userProjects: true},
						success: function(response){
							var data = JSON.parse(response);
							var container = document.querySelector('.combobox');
							sb.toolbox.applyComboBox({
								elem: container,
								data: data.data,
								settings: {
									placeholder: "Choose Project"
								},
								onchange: function($input, $selectedEl, bln){
									if(bln){
										sb.setPopupData($selectedEl.html(), 'project_name');
										sb.setPopupData($selectedEl.data('id'), 'project_id');
						                $('.main-btn').prop('disabled', false);
						            }
						            else{
						            	$('.main-btn').prop('disabled', true);
						            }
								}
							});
							var popupData = sb.getPopupData();
							if(popupData && popupData['project_name']){
								$(container).find('input').val(popupData['project_name']);
								$('.main-btn').prop('disabled', false);
							}
						}
					})

				});
			},
			createFilePopup: function(){
            	if(sb.getPopupData('fileName')){
            		$('.create-file-item .notification-title').html(sb.getPopupData('fileName'));
            		$('.create-file-item').css({'visibility': 'visible'});
            		$('.main-btn').prop('disabled', false);
            	}
        		$('.upload-files-input').change(function(){
        			$('.create-file-item').css({'visibility': 'visible'});
        			$('.create-file-item .notification-title').html(this.value);
					
					sb.setPopupData(this.files[0], 'file');
					sb.setPopupData(this.value, 'fileName');
					sb.setPopupData(this.value, 'description');
					sb.setPopupData(this.files[0], 'MIMEtype');
					sb.setPopupData(this.files[0].size, 'size');
					sb.setPopupData('addArtefact', 'actionType');
        			
        			$('.main-btn').prop('disabled', false);
        		});

        		sb.loadFiles({
        			'collections': ['Artefacts'],
        			'models': ['Artefacts']
        		},function(){
					sb.ajaxCall({
						collection: new Kenseo.collections.Artefacts(),
						data: { 
        					projectid:sb.getPopupData('project_id'), 
        					references: true,
        					ignore: 0
        				},
        				success: function(response){
        					var data = JSON.parse(response);
        					var container = document.querySelector('.existing-files-combobox');
							var existingCombobox = sb.toolbox.applyComboBox({
								elem: container,
								data: data.data,
								settings: {
									placeholder: "Choose Files"
								},
								onchange: function($input, $selectedEl, bln){
									if(bln){
						                $('.main-btn').prop('disabled', false);
			                        	sb.setPopupData($selectedEl.data('id'), 'artefact_id');
						            }
						            else{
						            	$('.main-btn').prop('disabled', true);
						            }
								}
							});

							$('.existing-files-chk').change(function(){
								var $elem = existingCombobox.$elem;
								var $input = $elem.find('input');
								var $selectables = $elem.find('.selectable');
								if($selectables.length){
				                	$input.prop('disabled', !this.checked);
				                	if(!this.checked){
				                		$input.val("");
				                	}
				                }
			                });




			                var chooseFileCombobox = sb.toolbox.applyComboBox({
								elem: document.querySelector('.choose-file-combobox'),
								data: data.data,
								settings: {
									placeholder: "Choose Files",
									multiSelect: true
								},
								onchange: function($input, $selectedEl, bln){
									if(bln){
						                $('.main-btn').prop('disabled', false);
			                        	sb.setPopupData($selectedEl.data('id'), 'artefact_id');
						            }
						            else{
						            	$('.main-btn').prop('disabled', true);
						            }
								}
							});

							$('.existing-files-chk').change(function(){
								var $elem = chooseFileCombobox.$elem;
								var $input = $elem.find('input');
								var $selectables = $elem.find('.selectable');
								if($selectables.length){
				                	$input.prop('disabled', !this.checked);
				                	if(!this.checked){
				                		$input.val("");
				                	}
				                }
			                });
        				}
					});
	                

	                $('.create-file-close-icon').click(function(){
	                	$('.create-file-item').css({'visibility': 'hidden'});
	                	$('.main-btn').prop('disabled', true);
	                	sb.setPopupData(null, 'fileName');
	                });
        		});
            },
            teamPopup: function(){
            	sb.setPopupData('addArtefact', 'command');
            	sb.setPopupData(false, 'share');
            	sb.loadFiles({
            		'collections': ['Artefacts', 'Tags'],
            		'models': ['Artefacts']
            	}, function(){
					// Tags listing
					sb.ajaxCall(
						{ 
							'collection': new Kenseo.collections.Artefacts(),
							'data': {references: true, ignore: 0, projectid: sb.getPopupData('project_id')},
							success: function(response){
	        					var data = JSON.parse(response);
	        					var container = document.querySelector('.reference-combobox');
								var combobox = sb.toolbox.applyComboBox({
									elem: container,
									data: data.data,
									settings: {
										multiSelect: true
									}
								});

	        					var links = document.querySelector('.links-combobox');
								var linksCombobox = new sb.toolbox.applyComboBox({
									elem: links,
									data: data.data,
									settings: {
										multiSelect: true
									}
								});
							}
						}
					);

					sb.ajaxCall(
						{ 
							'collection': new Kenseo.collections.Tags(),
							'data': {},
							success: function(response){
	        					var data = JSON.parse(response);
	        					var container = document.querySelector('.tags-combobox');
								var combobox = sb.toolbox.applyComboBox({
									elem: container,
									data: data.data,
									settings: {
										multiSelect: true
									}
								});
							}
						}
					);
            	});
            },
            shareWithPeoplePopup: function(){
				sb.setPopupData(true, 'share');
				//now you need 2 sets of people, people those who are arleady in the project and all the remaining people
				
				sb.loadFiles({
            		'collections': ['People'],
            		'models': ['People']
            	}, function(){
					sb.ajaxCall({
						collection: new Kenseo.collections.People(),
						data : {
							"all" : true,
							"projectId" : sb.getPopupData('project_id'),
						},
						success: function(resp) {
							resp = JSON.parse(resp);
							//reder all the others in a COMBO
							var data = resp.data.otherMembers;
							var container = document.querySelector('.people-combobox');
							sb.toolbox.applyComboBox({
								elem: container,
								data: data,
								settings: {
									placeholder: "Type mail ID or username and press enter ",
									multiSelect: true
								},
								onchange: function($input, $selectedEl, bln){
									// if(bln){
									// 	console.log("test");
									// }
									// else {
									// 	console.log("tester");
									// }
						   			if(bln){
						   				var obj = {};
						   				var attrs = $selectedEl[0].attributes;
						   				for(var i=0; i< attrs.length; i++){
						   					var attr = attrs[i];
						   					if(attr.name.indexOf('data-') > -1){
						   						obj[attr.name.substr(5)] = attr.value;
						   					}
						   				}
						   				obj.name = $selectedEl.html();
						   				$('.share-artefact-people-wrapper').append(_.template(templates['share-people'])({data: obj}));
						   			}
								}
							});
							
							//render all the team members
							for(var i=0 ; i<resp.data.teamMembers.length; i++) {
								$('.share-artefact-people-wrapper').append(_.template(templates['share-people'])({data: resp.data.teamMembers[i]}));
							}
						}
					})
				})
				
            },
            replaceArtefact:function() {
            	sb.setPopupData('replaceArtefact', 'actionType');
				sb.setPopupData('replaceArtefact', 'command');
				
            	if(sb.getPopupData('fileName')){
            		$('.create-file-item .notification-title').html(sb.getPopupData('fileName'));
            		$('.create-file-item').css({'visibility': 'visible'});
            		$('.main-btn').prop('disabled', false);
            	}
        		$('.upload-files-input').change(function(){
        			$('.create-file-item').css({'visibility': 'visible'});
        			$('.create-file-item .notification-title').html(this.value);
					
					sb.setPopupData(this.files[0], 'file');
					sb.setPopupData(this.value, 'fileName');
					sb.setPopupData(this.value, 'description');
					sb.setPopupData(this.files[0], 'MIMEtype');
					sb.setPopupData(this.files[0].size, 'size');
        			
        			$('.main-btn').prop('disabled', false);
        		});
        		
        		$('.create-file-close-icon').click(function(){
                	$('.create-file-item').css({'visibility': 'hidden'});
                	$('.main-btn').prop('disabled', true);
                	sb.setPopupData(null, 'fileName');
                	sb.setPopupData(null, 'file');
				});
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
		        		 	sb.setPopupData(date, 'date');
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
						// 		location : sb.getPopupData('venue'),
						// 		projectId: sb.getPopupData('projectId'),
						// 		projectName: sb.getPopupData('projectName'),
						// 		fromTime : "2015-03-06T10:00:00.000-07:00",
						// 		toTime : "2015-03-06T10:25:00.000-07:00",
						// 		attendees: sb.getPopupData('selectedUsers')
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
				    	  		location : sb.getPopupData('venue'),
								projectId: sb.getPopupData('projectId'),
								projectName: sb.getPopupData('projectName'),
								fromTime : sb.getPopupData('date') + "T10:00:00.000-07:00",
								toTime : sb.getPopupData('date') + "T10:25:00.000-07:00",
								attendees: sb.getPopupData('selectedUsers')
				    	  	},
							type: 'POST',
							success : function(response){
								popupCloser($self.parents(popupContainer));
							}
				    	});
				    	connect.send();
					});
					sb.ajaxCall({ 
						'collection': new Kenseo.collections.Projects(),
						'data': {"userProjects" : true},
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
		            				sb.setPopupData(projectId,'projectId');
		            				sb.setPopupData(this.innerText,'projectName');
		            				
		            				$(this).parent().hide();
		            				sb.setPopupData(new Array(),'selectedUsers');
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