sb.popup= {
    resetPopupData: function() {
        Kenseo.popup = {
            "info": {},
            "data": {}
        }
    },
    getProjectsPopup: function() {
        sb.loadFiles({
            'models': ['Projects'],
            'collections': ['Projects']
        }, function() {
            sb.ajaxCall({
                collection: new Kenseo.collections.Projects(),
                data: {
                    userProjects: true
                },
                success: function(data) {
                    var container = document.querySelector('.combobox');
                    sb.toolbox.applyComboBox({
                        elem: container,
                        data: data.data,
                        settings: {
                            placeholder: "Choose Project"
                        },
                        onchange: function($input, $selectedEl, bln) {
                            if (bln) {
                                sb.setPopupData($selectedEl.html(), 'project_name');
                                sb.setPopupData($selectedEl.data('id'), 'project_id');
                                $('.main-btn').prop('disabled', false);
                            } else {
                                $('.main-btn').prop('disabled', true);
                            }
                        }
                    });
                    var popupData = sb.getPopupData();
                    if (popupData && popupData['project_name']) {
                        $(container).find('input').val(popupData['project_name']);
                        $('.main-btn').prop('disabled', false);
                    }
                }
            })

        });
    },
    createFilePopup: function() {
        if (sb.getPopupData('fileName')) {
            $('.create-file-item .notification-title').html(sb.getPopupData('fileName'));
            $('.create-file-item').css({
                'visibility': 'visible'
            });
            $('.main-btn').prop('disabled', false);
        }
        $('.upload-files-input').change(function() {
            $('.create-file-item').css({
                'visibility': 'visible'
            });
            $('.create-file-item .notification-title').html(this.value);

            sb.setPopupData(this.files[0], 'file');
            sb.setPopupData(this.value, 'fileName');
            sb.setPopupData(this.value, 'description');
            sb.setPopupData(this.files[0], 'MIMEtype');
            sb.setPopupData(this.files[0].size, 'size');
            //if this is an add artefact in the next popup call back it will be set taccordingly
            //for replace this is the only place we can decide wheteher it is a replace call or not
            if(sb.getPopupData('actionType') == 'replaceArtefact') {
	            sb.setPopupData('replaceArtefact', 'command');
	            sb.setPopupData('replaceArtefactFile', 'actionType');
            } else if(sb.getPopupData('actionType') == 'addArtefactVersion') {
	            sb.setPopupData('addArtefactVersion', 'command');
	            sb.setPopupData('addArtefactVersionFile', 'actionType');
            }

            $('.main-btn').prop('disabled', false);

            $('.choose-file-combobox input').attr('disabled', true);
            $('.existing-files-chk').attr('disabled', false);
        });
        $('.create-file-close-icon').click(function() {
            $('.create-file-item').css({
                'visibility': 'hidden'
            });
            $('.choose-file-combobox input').attr('disabled', false);
            $('.main-btn').prop('disabled', true);
            sb.setPopupData(null, 'fileName');
            sb.setPopupData(null, 'file');
            sb.setPopupData(null, 'MIMEType');
            sb.setPopupData(null, 'size');
            sb.setPopupData(null, 'description');
            
            $('.existing-files-chk').attr('disabled', true);
        });
        sb.loadFiles({
            'collections': ['Artefacts'],
            'models': ['Artefacts']
        }, function() {
            sb.ajaxCall({
                collection: new Kenseo.collections.Artefacts(),
                data: {
                    projectid: sb.getPopupData('project_id'),
                    references: true,
                    ignore: 0
                },
                success: function(data) {
                    var container = document.querySelector('.existing-files-combobox');
                    var existingCombobox = sb.toolbox.applyComboBox({
                        elem: container,
                        data: data.data,
                        settings: {
                            placeholder: "Choose Files"
                        },
                        onchange: function($input, $selectedEl, bln) {
                            if (bln) {
                                $('.main-btn').prop('disabled', false);
                                sb.setPopupData($selectedEl.data('id'), 'artefact_id');
                            } else {
                                $('.main-btn').prop('disabled', true);
                            }
                        }
                    });

                    $('.existing-files-chk').change(function() {
                        var $elem = existingCombobox.$elem;
                        var $input = $elem.find('input');
                        var $selectables = $elem.find('.selectable');
                        if ($selectables.length) {
                            $input.prop('disabled', !this.checked);
                            if (!this.checked) {
                                $input.val("");
                            }
                        }
                    });




                    var chooseFileCombobox = sb.toolbox.applyComboBox({
                        elem: document.querySelector('.choose-file-combobox'),
                        data: data.data,
                        settings: {
                            placeholder: "Choose Files"
                        },
                        onchange: function($input, $selectedEl, bln) {
                            if (bln) {
                                sb.setPopupData($selectedEl.data('id'), 'artefact_id');


                                var obj = {};
                                var attrs = $selectedEl[0].attributes;
                                for (var i = 0; i < attrs.length; i++) {
                                    var attr = attrs[i];
                                    if (attr.name.indexOf('data-') > -1) {
                                        obj[attr.name.substr(5)] = attr.value;
                                    }
                                }
                                obj.name = $selectedEl.html();

                                $('.choose-existing-file-holder').html(_.template(templates['new-file'])({
                                    data: obj
                                }))

                                $('.choose-existing-file-holder .close-icon').click(function() {
                                    $('.choose-existing-file-holder').html("");
                                    //
                                    $('.upload-files-input').attr('disabled', false);
                                    $('.existing-files-chk').attr('disabled', true);
                                    $('.main-btn').prop('disabled', true);
                                });
                                $input.val("");

                                //
                                $('.upload-files-input').attr('disabled', true);
                                $('.existing-files-chk').attr('disabled', false);
                                $('.main-btn').prop('disabled', false);
                            } else {
                                $('.main-btn').prop('disabled', true);
                            }
                        },
                        insertAfter: function($input, $selectedEl, bln) {
                            $input.val('');
                        }
                    });

                    $('.existing-files-chk').change(function() {
                        var $elem = chooseFileCombobox.$elem;
                        var $input = $elem.find('input');
                        var $selectables = $elem.find('.selectable');
                        if ($selectables.length) {
                            $input.prop('disabled', !this.checked);
                            if (!this.checked) {
                                $input.val("");
                            }
                        }
                    });
                }
            });
        });
    },
    teamPopup: function() {
        sb.setPopupData('addArtefact', 'actionType');
        sb.setPopupData('addArtefact', 'command');
        sb.setPopupData(false, 'share');
        sb.loadFiles({
            'collections': ['Artefacts', 'Tags'],
            'models': ['Artefacts']
        }, function() {
            // Tags listing
            sb.ajaxCall({
                'collection': new Kenseo.collections.Artefacts(),
                'data': {
                    references: true,
                    ignore: 0,
                    projectid: sb.getPopupData('project_id')
                },
                success: function(data) {
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
            });

            sb.ajaxCall({
                'collection': new Kenseo.collections.Tags(),
                'data': {},
                success: function(data) {
                    var container = document.querySelector('.tags-combobox');
                    var combobox = sb.toolbox.applyComboBox({
                        elem: container,
                        data: data.data,
                        settings: {
                            multiSelect: true
                        }
                    });
                }
            });
        });
    },
    shareWithPeoplePopup: function(){
		sb.setPopupData(true, 'share');
		//now you need 2 sets of people, people those who are arleady in the project and all the remaining people
		
		sb.loadFiles({
    		'collections': ['People'],
    		'models': ['People']
    	}, function(){
            function getChecked($el){
                return $el.attr('checked') === "checked";
            }
            function setChecked($el, bln){
                $el.attr('checked', bln);
                $el[0].checked = bln;
            }
            function attachEvents(){
                $('.apply-to-all').off('change');
                $('.add-comments-chk input').off('click');
                $('.others-chk input input').off('click');
                $('.apply-to-all').on('change', function(){
                    var $self = $(this);
                    var $parent = $self.parents('.share-artefact-people-item-section');
                    var $grandParent = $self.parents('.share-artefact-people-wrapper');
                    var states = {
                        comment: getChecked($parent.find('.add-comments-chk input')),
                        others: getChecked($parent.find('.others-chk input')),
                        all: !getChecked($self.find('input'))
                    }
                    
                    $grandParent.find('.add-comments-chk').each(function(){
                        setChecked($(this).find('input'), states.comment);
                    });

                    $grandParent.find('.others-chk').each(function(){
                        setChecked($(this).find('input'), states.others);
                    });

                    $grandParent.find('.apply-to-all').each(function(){
                        setChecked($(this).find('input'), states.all);
                    });
                });
                $('.add-comments-chk input').on('click', function(){
                    var $self = $(this);
                    var $parent = $self.parents('.share-artefact-people-item-section');
                    var $grandParent = $self.parents('.share-artefact-people-wrapper');
                    var thisChk = !getChecked($self);
                    var allChk = getChecked($parent.find('.apply-to-all input'));
                    if(allChk){
                        $grandParent.find('.add-comments-chk').each(function(){
                            setChecked($(this).find('input'), thisChk);
                        });
                    }
                    else{
                        setChecked($(this), thisChk);
                    }
                });


                $('.others-chk input').on('click', function(){
                    var $self = $(this);
                    var $parent = $self.parents('.share-artefact-people-item-section');
                    var $grandParent = $self.parents('.share-artefact-people-wrapper');
                    var thisChk = !getChecked($self);
                    var allChk = getChecked($parent.find('.apply-to-all input'));
                    if(allChk){
                        $grandParent.find('.others-chk').each(function(){
                            setChecked($(this).find('input'), thisChk);
                        });
                    }
                    else{
                        setChecked($(this), thisChk);
                    }
                });
                
            }
			sb.ajaxCall({
				collection: new Kenseo.collections.People(),
				data : {
					"all" : true,
					"projectId" : sb.getPopupData('project_id'),
				},
				success: function(resp) {
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
                                attachEvents();


                                // setting the default values
                                var $all = $('.apply-to-all input').eq(0);
                                var $comment = $('.add-comments-chk input').eq(0);
                                var $others = $('.others-chk input').eq(0);
                                if(getChecked($all)){
                                    var $grandParent = $('.share-artefact-people-wrapper');
                                    var states = {
                                        comment: getChecked($comment),
                                        others: getChecked($others),
                                        all: getChecked($all)
                                    }
                                    
                                    $grandParent.find('.add-comments-chk').each(function(){
                                        setChecked($(this).find('input'), states.comment);
                                    });

                                    $grandParent.find('.others-chk').each(function(){
                                        setChecked($(this).find('input'), states.others);
                                    });

                                    $grandParent.find('.apply-to-all').each(function(){
                                        setChecked($(this).find('input'), states.all);
                                    });

                                }
				   			}
						}
					});
					
					//render all the team members
					for(var i=0 ; i<resp.data.teamMembers.length; i++) {
						$('.share-artefact-people-wrapper').append(_.template(templates['share-people'])({data: resp.data.teamMembers[i]}));
					}
					
                    attachEvents();
					
				}
			})
		})
		
    },
    replaceArtefact: function() {
        sb.setPopupData('replaceArtefact', 'actionType');
        sb.setPopupData('replaceArtefact', 'command');

        if (sb.getPopupData('fileName')) {
            $('.create-file-item .notification-title').html(sb.getPopupData('fileName'));
            $('.create-file-item').css({
                'visibility': 'visible'
            });
            $('.main-btn').prop('disabled', false);
        }
        $('.upload-files-input').change(function() {
            $('.create-file-item').css({
                'visibility': 'visible'
            });
            $('.create-file-item .notification-title').html(this.value);

            sb.setPopupData(this.files[0], 'file');
            sb.setPopupData(this.value, 'fileName');
            sb.setPopupData(this.value, 'description');
            sb.setPopupData(this.files[0], 'MIMEtype');
            sb.setPopupData(this.files[0].size, 'size');

            $('.main-btn').prop('disabled', false);
        });

        $('.create-file-close-icon').click(function() {
            $('.create-file-item').css({
                'visibility': 'hidden'
            });
            $('.main-btn').prop('disabled', true);
            sb.setPopupData(null, 'fileName');
            sb.setPopupData(null, 'file');
        });
    },
    meetingIvite: function() {
        sb.loadFiles({
            'models': ['Projects', 'People'],
            'collections': ['Projects', 'People']
        }, function() {
            $('.input-meeting-date').Zebra_DatePicker({
                default_position: 'below',
                format: 'M d, Y',
                onSelect: function(display, date) {
                    console.log("changed something");
                    sb.setPopupData(date, 'date');
                },

            });

            $('.meeting-venue').on('focusout', function() {
                venue = this.value;
            });

            $('.meeting-agenda').on('focusout', function() {
                agenda = this.value;
            });

            $('.fromTime').on('change', function() {
                console.log('from time changed')
            });
            $('.toTime').on('change', function() {
                console.log("totime changed")
            });

            $('.toTime').on('select', function() {
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
                    command: 'setMeetingInvitaion',
                    data: {
                        location: sb.getPopupData('venue'),
                        projectId: sb.getPopupData('projectId'),
                        projectName: sb.getPopupData('projectName'),
                        fromTime: sb.getPopupData('date') + "T10:00:00.000-07:00",
                        toTime: sb.getPopupData('date') + "T10:25:00.000-07:00",
                        attendees: sb.getPopupData('selectedUsers')
                    },
                    type: 'POST',
                    success: function(response) {
                        popupCloser($self.parents(popupContainer));
                    }
                });
                connect.send();
            });
            sb.ajaxCall({
                'collection': new Kenseo.collections.Projects(),
                'data': {
                    "userProjects": true
                },
                'success': function(objResponse) {
                    $('.meeting-project-name').on('keyup', function() {
                        var self = this;
                        var filteredData = _.filter(objResponse.data, function(item) {
                            if (self.value.length) {
                                $(self).parent().next('.project-suggestions').show();
                                var re = new RegExp("^" + self.value, "i");
                                return re.test(item.name);
                            } else {
                                return false;
                            }
                        });
                        if (filteredData.length > 0) {
                            sb.renderTemplate({
                                "templateName": 'reference-items',
                                "templateHolder": $(this).parent().next('.project-suggestions'),
                                "data": {
                                    data: filteredData
                                }
                            });
                        } else {
                            $('.project-suggestions').hide();
                        }
                        $('.reference-suggestion-item').click(function() {
                            $('.meeting-project-name')[0].value = this.innerText;
                            var projectId = this.getAttribute('name');
                            sb.setPopupData(projectId, 'projectId');
                            sb.setPopupData(this.innerText, 'projectName');

                            $(this).parent().hide();
                            sb.setPopupData(new Array(), 'selectedUsers');
                            // now set the project people
                            sb.ajaxCall({
                                'collection': new Kenseo.collections.People(),
                                'data': {
                                    projectId: projectId
                                },
                                'success': function(objResponse) {
                                    $('.people-name').on('keyup', function() {
                                        var self = this;
                                        var filteredData = _.filter(objResponse.data, function(item) {
                                            if (self.value.length) {
                                                $(self).parent().parent().next('.people-suggestions').show();
                                                var re = new RegExp("^" + self.value, "i");
                                                return re.test(item.name);
                                            } else {
                                                return false;
                                            }
                                        });
                                        if (filteredData.length > 0) {
                                            sb.renderTemplate({
                                                "templateName": 'reference-items',
                                                "templateHolder": $(this).parent().parent().next('.people-suggestions'),
                                                "data": {
                                                    data: filteredData
                                                }
                                            });
                                        } else {
                                            $('.people-suggestions').hide();
                                        }
                                        $('.reference-suggestion-item').click(function() {
                                            $('.people-name')[0].value = this.innerText;
                                            var selectedUser = this.innerText;
                                            Kenseo.popup.data.selectedUsers.push({
                                                id: this.getAttribute('name'),
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
};