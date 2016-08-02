/*
 * Popup containers related functionality is present here
 * Functionalities of all popup containers invoked at different stages of different pages are present here
 */
sb.popup = {
    resetPopupData: function resetPopupData() {
        Kenseo.popup = {
            "info": {},
            "data": {}
        };

        // the data which comes with call "artefactmetainfo" is stored in Kenseo.data.artefactmetainfo
        // This data must be cleared when a popup is closed.
        // TODO: the data must be cleared if the "artefactmetainfo" call is called through popup but not through page
        // Currently, this call is happening under "shareartefact" popup when existing file is chosen.
        Kenseo.data.artefactmetainfo = null;
    },
    getProjectsPopup: function getProjectsPopup() {
        sb.ajaxCall({
            collection: new Kenseo.collections.Projects(),
            container: $('.popup'),
            data: {
                userProjects: true
            },
            success: function success(data) {
                var $currentPopup = Kenseo.current.popup;
                var container = Kenseo.current.popup.find(".projects-selection-section");
                $(container).append(sb.setTemplate("project-section-popup",{data:data}));
                var $selectedElement = $currentPopup.find('.project-selection-block-title');
                $('input[type=radio][name=projectSection]').change(function() {
                  sb.setPopupData($selectedElement.html(), "name");
                  sb.setPopupData($selectedElement.attr('data-k-project_id'), "id");
                  $currentPopup.find(".main-btn").prop("disabled", false);
                });
                // sb.toolbox.applyComboBox({
                //     elem: container,
                //     data: data.data,
                //     settings: {
                //         placeholder: "Choose Project"
                //     },
                //     onchange: function onchange($input, $selectedEl, bln) {
                //         if (bln) {
                //             sb.setPopupData($selectedEl.html(), "name");
                //             sb.setPopupData($selectedEl.data("id"), "id");
                //             $currentPopup.find(".main-btn").prop("disabled", false);
                //
                //         } else {
                //             $currentPopup.find(".main-btn").prop("disabled", true);
                //         }
                //         // set a global variable that the project dropdown value has changed
                //         Kenseo.popup.info.projectComboboxValueChanged = bln;
                //     }
                // });
                // var popupData = sb.getPopupData();
                // if (popupData && popupData["project_name"]) {
                //     $(container).find("input").val(popupData["project_name"]);
                //     $currentPopup.find(".main-btn").prop("disabled", false);
                // }
            }
        });
    },
    addNewProject: function addNewProject() {
      var $currentPopup = Kenseo.current.popup;
      $currentPopup.find(".project-page-existing-files-chk").change(function (e) {
          // Disable (or) Enable Proceed button when this checkbix is checked.
          if(this.checked) {
            $(".done-btn").css({"display": "none"});
            $(".nav-btn").css({"display": "inline-block"});
          } else {
            $(".done-btn").css({"display": "inline-block"});
            $(".nav-btn").css({"display": "none"});
          }
      });
    },
    createFilePopup: function createFilePopup() {
        var $currentPopup = Kenseo.current.popup;

        var toggleStateMainBtn = function(state) {
            return $currentPopup.find(".main-btn").prop("disabled", state);
        };

        var toggleStateChooseFileCombo = function(state) {
            return $currentPopup.find(".choose-file-combobox input").prop("disabled", state);
        };

        $('#drop-zone').dropZone();

        var toggleStateExistingFileCheck = function(state, title) {
            var $existingCheckBox = $currentPopup.find(".existing-files-chk");
            if(state){
                $existingCheckBox.parent().attr('title', title);
            }
            else if(title && title.length){
                $existingCheckBox.parent().attr('title', '');
            }
            return $existingCheckBox.prop("disabled", state);
        };

        var toggleStateUploadNewFile = function(state) {
            return $currentPopup.find(".upload-files-input").prop("disabled", state);
        };

        var clearExistingFilesCombo = function() {
            var $existingFilesCombobox = $currentPopup.find(".existing-files-combobox");

            $existingFilesCombobox.find(".suggestionsContainer").hide();
            $existingFilesCombobox.find('input').val('').prop("disabled", true);
        };


        $(".upload-files-input").change(function () {
            var files = this.files;

            // If user clicks cancel.
            if(!files) {
                // Clear selected file path from input box
                $(".create-file-close-icon").click();
                return;
            }
            var $currentPopup = Kenseo.current.popup;

            $currentPopup.find(".files-list").css({
                "display": "block"
            });
            $currentPopup.find(".checkbox").css({
                "display": "block"
            });
            $currentPopup.find(".artefact-combobox").css({
                "display": "block"
            });
            // Setting the flag to true
            Kenseo.popup.info.newFileSelected = true;
            if(this.files.length === 1){
                // removing fakepath from string (Chrome)
                var value = this.value.replace("C:\\fakepath\\", "");
                $currentPopup.find(".create-file-item .notification-title").html(value).attr('title', value);
                toggleStateExistingFileCheck(false);
            }
            else if(this.files.length > 1){
                // if multiple files selected
                $currentPopup.find(".create-file-item .notification-title").html("multiple files added");
                // Hide the "existing artefact version selecting checkbox"
                toggleStateExistingFileCheck(true, "you can't select a version for selected multiple files");
            }
            else{
                // when no file is selected
            }
            var info = "@ " + sb.getTimeFormat() + " by " + Kenseo.data.header.screen_name;
            $currentPopup.find(".create-file-item .notification-time").html(info);

            sb.setPopupData(files, "files");
            // sb.setPopupData(value, "fileName");
            sb.setPopupData(value, "description");
            // sb.setPopupData(file, "MIMEtype");
            // sb.setPopupData(file.size, "size");
            //if this is an add artefact in the next popup call back it will be set taccordingly
            //for replace this is the only place we can decide wheteher it is a replace call or not
            if (sb.getPopupData("actionType") == "replaceArtefact") {
                sb.setPopupData("replaceArtefact", "command");
                sb.setPopupData("replaceArtefactFile", "actionType");
            } else if (sb.getPopupData("actionType") == "addArtefactVersion") {
                sb.setPopupData("addArtefactVersion", "command");
                sb.setPopupData("addArtefactVersionFile", "actionType");
            } else if(sb.getPopupData("actionType") == "addVersion") {
                sb.setPopupData("addVersion", "command");
                sb.setPopupData("addVersion", "actionType");
            }

            toggleStateMainBtn(false);

            toggleStateChooseFileCombo(true);
        });
        $(".create-file-close-icon").click(function () {
            var $currentPopup = Kenseo.current.popup;
            $currentPopup.find(".create-file-item").css({
                "visibility": "hidden"
            });
            toggleStateChooseFileCombo(false);
            toggleStateMainBtn(true);
            sb.setPopupData(null, "fileName");
            sb.setPopupData(null, "file");
            sb.setPopupData(null, "MIMEType");
            sb.setPopupData(null, "size");
            sb.setPopupData(null, "description");

            toggleStateExistingFileCheck(true).prop("checked", false);

            clearExistingFilesCombo();

            // Clear selected file path from input box
            $currentPopup.find(".upload-files-input").val('');
            Kenseo.popup.info.newFileSelected = false;
        });

        var projectId;
        if(Kenseo.popup.data.actionType === "addVersion" || Kenseo.popup.data.actionType === "replaceArtefact") {
            projectId = sb.getPopupData("project_id");
        } else {
            projectId = sb.getPopupData("id");
        }
        sb.ajaxCall({
            collection: new Kenseo.collections.Artefacts(),
            container: $('.popup'),
            data: {
                projectid: projectId,
                references: true,
                ignore: 0
            },
            success: function success(response) {
                var $currentPopup = Kenseo.current.popup;
                var container = $currentPopup.find(".existing-files-combobox")[0];
                Kenseo.globalArtefacts = response.data;
                Kenseo.combobox.existingCombobox = sb.toolbox.applyComboBox({
                    elem: container,
                    data: Kenseo.globalArtefacts,
                    settings: {
                        placeholder: "Choose Files",
                        disabled: true
                    },
                    onchange: function onchange($input, $selectedEl, bln) {
                        if (bln) {
                            toggleStateMainBtn(false);
                            sb.setPopupData($selectedEl.data("id"), "artefact_id");
                        } else {
                            toggleStateMainBtn(true);
                        }
                    }
                });
                $currentPopup.find(".existing-files-chk").change(function (e) {
                    // e.stopPropagation();
                    var $elem = Kenseo.combobox.existingCombobox.$elem;
                    var $input = $elem.find("input");
                    $elem.find(".suggestionsContainer").hide();
                    var $selectables = $elem.find(".selectable");

                    // Disable (or) Enable Proceed button when this checkbix is checked.
                    if(this.checked) {
                        toggleStateMainBtn(true);
                    } else {
                        toggleStateMainBtn(false);
                    }

                    if ($selectables.length) {
                        $input.prop("disabled", !this.checked);
                        if (!this.checked) {
                            $input.val("");
                        }
                    }
                });

                Kenseo.combobox.chooseFileCombobox = sb.toolbox.applyComboBox({
                    elem: $currentPopup.find(".choose-file-combobox")[0],
                    data: response.data,
                    settings: {
                        placeholder: "Choose Files"
                    },
                    onchange: function onchange($input, $selectedEl, bln) {
                        if (bln) {
                            sb.setPopupData($selectedEl.data("id"), "artefact_id");
                            sb.setPopupData($selectedEl.html(), "artefactName");
                            sb.setPopupData($selectedEl.data('version_id'), 'version_id');

                            // A flag to determine that an existing file is selected
                            Kenseo.popup.info.existingFileSelected = true;

                            var obj = {};
                            var attrs = $selectedEl[0].attributes;

			    // converting nodelist map to an array
                            Array.prototype.forEach.call(attrs, function(attr){
                                // var attr = attrs[i];
                                if (attr.name.indexOf("data-") > -1) {
                                    obj[attr.name.substr(5)] = attr.value;
                                }
                            });
                            obj.name = $selectedEl.html();

                            $currentPopup.find(".choose-existing-file-holder").html(sb.setTemplate("new-file", {
                                data: obj
                            }));

                            $currentPopup.find(".choose-existing-file-holder .close-icon").click(function () {
                                $currentPopup.find(".choose-existing-file-holder").html("");
                                //
                                toggleStateUploadNewFile(false);
                                toggleStateExistingFileCheck(true);
                                toggleStateMainBtn(true);
                                toggleStateExistingFileCheck(true).prop("checked", false);
                                clearExistingFilesCombo();

                                $currentPopup.find('.upload-file-section').css('cursor', 'pointer');

                                // Making the existing file selected flag as false when user clicks on close icon
                                Kenseo.popup.info.existingFileSelected = false;

                                // Also clear the Kenseo.popup.data
                            });
                            $input.val("");

                            // Disable upload new file section
                            toggleStateUploadNewFile(true);
                            toggleStateExistingFileCheck(false);
                            toggleStateMainBtn(false);
                            $currentPopup.find('.upload-file-section').css('cursor', 'default');
                        } else {
                            toggleStateMainBtn(true);
                        }
                    },
                    insertAfter: function insertAfter($input, $selectedEl, bln) {
                        $input.val("");
                    }
                });
            }
        });
    },
    teamPopup: function teamPopup() {
        sb.setPopupData("addArtefact", "actionType");
        sb.setPopupData("addArtefact", "command");
        sb.setPopupData(false, "share");
        var $currentPopup = Kenseo.current.popup;
        // Keep the .main-btn class button disabled by default
        // (Enable this button when user selects the document type)
        $currentPopup.find('.main-btn').attr('disabled', 'true');
        var container = document.querySelector(".reference-combobox");
        Kenseo.combobox.referenceCombobox = sb.toolbox.applyComboBox({
            elem: container,
            // data: data.data,
            data: Kenseo.globalArtefacts,
            settings: {
                multiSelect: true,
                filterData: {
                    'version_id': Kenseo.popup.data.version_id
                }
            }
        });

        var links = document.querySelector(".links-combobox");
        Kenseo.combobox.linksCombobox = new sb.toolbox.applyComboBox({
            elem: links,
            // data: data.data,
            data: Kenseo.globalArtefacts,
            settings: {
                multiSelect: true,
                filterData: {
                    'version_id': Kenseo.popup.data.version_id
                }
            }
        });

        var documentType = document.querySelector(".doctype-combobox");
        Kenseo.combobox.typeCombobox = new sb.toolbox.applyComboBox({
            elem: documentType,
            // data: data.data,
            data: Kenseo.settings.doctype,
            onchange: function($elem, value, bln){
                if(bln){
                    $currentPopup.find('.main-btn').removeAttr('disabled');
                }
                else{
                    $currentPopup.find('.main-btn').attr('disabled', 'true');
                }
            }
        });

        // populating the fields if an existing artefact is selected
        if(Kenseo.popup.info.existingFileSelected){
            sb.popup.populateExistingFileSelectedData();
        }
    },
    shareWithPeoplePopup: function shareWithPeoplePopup() {
        sb.setPopupData(true, "share");
        //now you need 2 sets of people, people those who are arleady in the project and all the remaining people

        sb.ajaxCall({
            collection: new Kenseo.collections.People(),
            container: $('.popup'),
            data: {
                "all": true,
                "versionId": sb.getPopupData("artefact_ver_id") || sb.getPopupData("version_id"),
                "projectId": sb.getPopupData("project_id") || sb.getPopupData("id")
            },
            success: function success(resp) {
                //render all the others in a COMBO
                var otherMembers = [];
                var projectMembers = [];
                resp.data.forEach(function(el){
                    if(el['in_project'] === "1"){
                        projectMembers.push(el);
                    }
                    else{
                        otherMembers.push(el);
                    }
                })
                var container = document.querySelector(".people-combobox");
                Kenseo.combobox.sharePeople = sb.toolbox.applyComboBox({
                    elem: container,
                    data: otherMembers,
                    settings: {
                        placeholder: "Type mail ID or username and press enter ",
                        multiSelect: true
                    },
                    onchange: function onchange($input, $selectedEl, bln) {
                        if (bln) {
                            var obj = {};
                            var attrs = $selectedEl[0].attributes;
                            Array.prototype.forEach.call(attrs, function(attr){
                                if (attr.name.indexOf("data-") > -1) {
                                    obj[attr.name.substr(5)] = attr.value;
                                }
                            });
                            obj.name = $selectedEl.html();
                            sb.popup.renderSharePopupPeople(obj, true);
                            // setting the default values
                            // var $all = $(".apply-to-all input").eq(0);
                            // var $comment = $(".add-comments-chk input").eq(0);
                            // var $others = $(".others-chk input").eq(0);
                            // if (sb.popup.getChecked($all)) {
                            //     var $grandParent = $(".share-artefact-people-wrapper");
                            //     var states = {
                            //         comment: sb.popup.getChecked($comment),
                            //         others: sb.popup.getChecked($others),
                            //         all: sb.popup.getChecked($all)
                            //     };
                            //
                            //     $grandParent.find(".add-comments-chk").each(function () {
                            //         sb.popup.setChecked($(this).find("input"), states.comment);
                            //     });
                            //
                            //     $grandParent.find(".others-chk").each(function () {
                            //         sb.popup.setChecked($(this).find("input"), states.others);
                            //     });
                            //
                            //     $grandParent.find(".apply-to-all").each(function () {
                            //         sb.popup.setChecked($(this).find("input"), states.all);
                            //     });
                            // }
                        }
                    },
                    insertAfter: function($text, $el, bln, selectedObject){
                        if(!Kenseo.combobox.sharePeople.filterData){
                            Kenseo.combobox.sharePeople.filterData = [];
                        }
                        Kenseo.combobox.sharePeople.filterData.push(selectedObject);
                    }
                });

                //render all the team members
                // sb.popup.renderSharePopupPeople(projectMembers);
                sb.popup.addPeopleAndPermissions();
            }
        });
    },
    replaceArtefact: function replaceArtefact() {
        sb.setPopupData("replaceArtefact", "actionType");
        sb.setPopupData("replaceArtefact", "command");

        if (sb.getPopupData("fileName")) {
            $(".create-file-item .notification-title").html(sb.getPopupData("fileName"));
            $(".create-file-item").css({
                "visibility": "visible"
            });
            $(".main-btn").prop("disabled", false);
        }
        $(".upload-files-input").change(function () {
            $(".create-file-item").css({
                "visibility": "visible"
            });
            $(".create-file-item .notification-title").html(this.value);

            sb.setPopupData(this.files[0], "file");
            sb.setPopupData(this.value, "fileName");
            sb.setPopupData(this.value, "description");
            sb.setPopupData(this.files[0], "MIMEtype");
            sb.setPopupData(this.files[0].size, "size");

            $(".main-btn").prop("disabled", false);
        });

        $(".create-file-close-icon").click(function () {
            $(".create-file-item").css({
                "visibility": "hidden"
            });
            $(".main-btn").prop("disabled", true);
            sb.setPopupData(null, "fileName");
            sb.setPopupData(null, "file");
        });
    },
    addPeopleAndPermissions: function addPeopleAndPermissions() {
      var $currentPopup = Kenseo.current.popup;
      $currentPopup.find(".permissions").change(function (){
        if(this.checked) {
            $currentPopup.find(".people-permissions-section").css({
              "display" : "inline-block"
            });
            $currentPopup.find(".add-comments-chk input, .others-chk input").attr("disabled","disabled");
            //trigger chenge event when global-permissionsare cheked
            $('.global-permissions').trigger('change');
        } else {
            $currentPopup.find(".people-permissions-section").css({
             "display" : "none"
            });
            $currentPopup.find(".add-comments-chk input, .others-chk input").removeAttr("disabled");
        }
        $(".global-permissions").change(function (e){
          $(this.getAttribute('trigger-chk')).find('input').prop("checked",this.checked);
        });
      });

    },
    meetingIvite: function meetingIvite() {
        var $currentPopup = Kenseo.current.popup;
        sb.ajaxCalls([
            {
                "collection": new Kenseo.collections.Projects(),
                container: $currentPopup,
                "data": {
                    userProjects: true
                }
            },
            {
                "collection": new Kenseo.collections.People(),
                container: $('[data-name="attendees"].field-section'),
                "data": {
                    all: true
                }
            }
        ], function(projectResponse, peopleResponse){
            // projects related calculations
            // checking whether project_id info is present in populating object
            if(sb.getPopulateValue('create-meeting', 'project_id')){
                // refresh the artefact section with new list according to the passed project id
                refreshArtefactCombobox(sb.getPopulateValue('create-meeting', 'project_id'));
            }

            if(sb.getPopulateValue('update-meeting', 'project_id')){
                // get the value in artefact combobox's input field
                var $artefactComboboxInput = $currentPopup.find('.artefact-combobox input');
                var value = $artefactComboboxInput.val();
                // refresh the artefact section with new list according to the passed project id
                refreshArtefactCombobox(sb.getPopulateValue('update-meeting', 'project_id'), function(){
                    // adding the value again to the artefact combobox's input
                    $artefactComboboxInput.val(value);
                });
            }

            var container = document.querySelector(".project-combobox");
            var combobox = sb.toolbox.applyComboBox({
                elem: container,
                data: projectResponse.data,
                settings: {
                    placeholder: "Choose Project",
                    // value: Kenseo.page.data.project && Kenseo.page.data.project.name || ""
                },
                insertAfter: function insertAfter($input, $selectedEl, bln) {
                    // console.log("project name changed");

                    // if the field-section has blur event registered,
                    // then trigger the blur event
                    var $blurField = $input.parents('.blur-field');
                    if($blurField.length){
                        $blurField.trigger('blur');
                    }


                    var projectId = $selectedEl.attr("data-id");
                    var projectName = $selectedEl.html();

                    sb.setPopupData(projectId, "projectId");
                    sb.setPopupData(this.innerText, "projectName");

                    $(this).parent().hide();
                    sb.setPopupData([], "selectedUsers");
                    // now set the project people

                    refreshArtefactCombobox(projectId);
                }
            });



            // people related calculations
            // integrate chosen library
            var $peopleSelect = $currentPopup.find(".recipients-meeting");
            // reset
            $peopleSelect.html('');
            // looping through each item
            peopleResponse.data.forEach(function(item){
                // don't show in list if the user is the one who is creating the meeting
                if(item['is_owner'] !== "1"){
                    // preparing object to pass to option template
                    var obj = {};
                    obj.text = item.email;
                    obj.attr = {
                        // selected: ""
                    };
                    obj.attr.value = item.id;
                    // Adding rendered option template to the select element
                    $peopleSelect.append(sb.setTemplate('option', {
                        option: obj
                    }));
                }
            });

            // Applying chosen library
            $peopleSelect.chosen({display_selected_options: false});


            var artefactComboboxContainer = document.querySelector(".artefact-combobox");
            var artefactCombobox = sb.toolbox.applyComboBox({
                elem: artefactComboboxContainer,
                data: [],
                settings: {
                    placeholder: "Choose Artefact",
                    value: Kenseo.page.data.artefact && Kenseo.page.data.artefact.name || ""
                },
                insertAfter: function($input, $selectedEl, bln) {
                    // if the field-section has blur event registered,
                    // then trigger the blur event
                    var $blurField = $input.parents('.blur-field');
                    if($blurField.length){
                        $blurField.trigger('blur');
                    }
                }
            });

            function refreshArtefactCombobox(projectId, callbackfunc){
                return sb.ajaxCall({
                    "collection": new Kenseo.collections.Artefacts(),
                    container: $('[data-name="meetingArtefact"].field-section'),
                    "data": {
                        projects: true,
                        project_id: projectId,
                        sortBy: "name",
                        $sharePermission: "true"
                    },
                    "success": function success(response) {
                        artefactCombobox.refresh({
                            newSuggestions: response.data
                        });

                        if(callbackfunc){
                            callbackfunc();
                        }
                    }
                });
            }


            var $inputMeetingDate = $(".input-meeting-date");
            $inputMeetingDate.Zebra_DatePicker({
                default_position: "below",
                format: "d M Y",
                direction: true,
                onSelect: function onSelect(display, date) {
                    console.log("changed something");
                    sb.setPopupData(date, "date");
                }

            });
            // When the input meeting date is not already present
            if(!$inputMeetingDate.val()){
                // Apply the current date
                $inputMeetingDate.val(sb.timeFormat(new Date(), true, true, true));
            }
            $(document).on("click", ".datepicker-icon-holder", function (e) {
                // prevent default action on button (if any)
                e.preventDefault();

                // get reference to the plugin
                var plugin = $(".input-meeting-date").data("Zebra_DatePicker");

                // if the datepicker is not already visible
                if (!$(this).data("dp_visible")) {

                    // set a flag that the datepicker is visible
                    $(this).data("dp_visible", true);

                    // show the datepicker
                    plugin.show();

                    // if datepicker is already visisble
                } else {

                    // set a flag that the datepicker is not visible
                    $(this).data("dp_visible", false);

                    // hide the datepicker
                    plugin.hide();
                }
            });

            function fromTimeDropdownChange(){
                var options = this.options;
                var index = options.selectedIndex;

                // resetting html of toTime field
                var toTimeField = document.querySelector('.projects-dropdown.toTime');
                toTimeField.innerHTML = "";

                for(var i = index + 1; i < options.length; i++){
                    toTimeField.innerHTML = toTimeField.innerHTML + options[i].outerHTML;
                }
            }
            //onchange event to fromtime dropdown
            $('.projects-dropdown.fromTime').on('change', fromTimeDropdownChange);

            fromTimeDropdownChange.call($('.projects-dropdown.fromTime').get(0));
        })
    },
    coverImage: function(){
        var $coverImageInput = $('.image-cover-section .upload-files-input');
        if($coverImageInput.length){
            $coverImageInput.on('change', function(){
                console.dir(this);
                // Link: http://stackoverflow.com/a/3814285/1577396
                var files = this.files;

                // FileReader support
                if (FileReader && files && files.length) {
                    var fr = new FileReader();
                    fr.onload = function () {
                        // document.getElementById(outImage).src = fr.result;
                        $('.cover-image-viewer .img-content').attr("src", fr.result);
                        $('.cover-image-viewer').show();
                        $('.image-cover-section').hide();
                        setPanningDimensions();
                    }
                    fr.readAsDataURL(files[0]);
                }

                // Not supported
                else {
                    // fallback -- perhaps submit the input to an iframe and temporarily store
                    // them on the server until the user's session ends.
                }
            });
        }
    },
    // This function holds all the manipulations which holds the states inside array of popups
    popupsStateMaintainer: function(payload) {
        var index = payload.index;
        var allPopups = payload.allPopups;
        var $popup = allPopups.eq(index);
        var currentActionType = payload.currentActionType;
        var currentIndex = payload.currentIndex;
        // if the popup was already rendered, show it instead of rendering again
        allPopups.addClass('hide');
        $popup.removeClass('hide');

        // Change the meta states of popup


        // Storing current popup root element
        Kenseo.current.popup = $popup;
        // TODO: The following code runs on all popups instead of running only on add artefact and share artefact popups
        // -- Start
        if(currentActionType === "shareArtefact" || currentActionType === "addArtefact"){
            var metaInfo = sb.getPopupMetaInfo(sb.getPopupData());

            var $projectText = $popup.find('.popup-meta-project-name-txt');
            var $fileName = $popup.find('.popup-meta-file-name');
            var $type = $popup.find('.popup-meta-type');
            var $references = $popup.find('.popup-meta-references');
            var $tags = $popup.find('.popup-meta-tags');
            // if the popup is already generated and the project name is changed in previous project, change the project name
            if($projectText.length){
                $projectText.attr('title', metaInfo.getProjectName());
            }
            // change the file name
            if($fileName.length){
                $fileName.attr('title', metaInfo.getFileName());
            }
            if($type.length){
                $type.attr('title', metaInfo.getType());
            }
            if($references.length){
                $references.attr('title', metaInfo.getReferences());
            }
            if($tags.length){
                $tags.attr('title', metaInfo.getTags());
            }

            // refresh the list of combobox based on project id
            if(index === 1 && currentIndex === 0 && Kenseo.popup.info.projectComboboxValueChanged/*&& currentActionType === "shareArtefact"*/){ // need to make this "shareArtefact" specific
                // clearing the previous selection manually
                var $chooseExistingFileHolder = $popup.find(".choose-existing-file-holder");
                if($chooseExistingFileHolder.length){
                    // if the existing file is chosen
                    // reset the contents and disable the "proceed" button
                    $chooseExistingFileHolder.children().remove();
                    $popup.find('.main-btn').prop('disabled', 'true');

                    // enable the file uploader section
                    var $uploadFileSection = $popup.find('.upload-file-section');
                    $uploadFileSection.css('cursor', 'pointer');
                    $uploadFileSection.prop('disabled', false);
                    // Also clear the Kenseo.popup.data contents
                }

                $('.existing-files-chk').prop('checked', false);

                sb.ajaxCall({
                    collection: new Kenseo.collections.Artefacts(),
                    container: $('.popup'),
                    data: {
                        projectid: sb.getPopupData('id'),
                        references: true,
                        ignore: 0
                    },
                    success: function(response){
                        if(Kenseo.combobox.chooseFileCombobox){
                            Kenseo.combobox.chooseFileCombobox.refresh({
                                newSuggestions: response.data
                            });
                        }
                        if(Kenseo.combobox.existingCombobox){
                            Kenseo.combobox.existingCombobox.refresh({
                                newSuggestions: response.data
                            });
                        }
                    }
                });
            }

            if(index === 2 && currentIndex === 1){
                if(Kenseo.popup.info.existingFileSelected){
                    // when existing file is selected
                    sb.popup.populateExistingFileSelectedData();
                }
                else if(Kenseo.popup.info.newFileSelected){
                    // reset the fields

                    // references
                    Kenseo.combobox.referenceCombobox.refresh({
                        callback: function($el){// represents to clear the data
                            $el.find('.suggestions-viewer').empty();
                        }
                    });

                    // Document type
                    Kenseo.combobox.typeCombobox.refresh({
                        // When existing file is selected, the document type dropdown should be kept disabled
                        callback: function($el){
                            $el.find('input').val('').prop('disabled', false);
                        }
                    });

                    // Links
                    Kenseo.combobox.linksCombobox.refresh({
                        newSettings: {
                            filterData: {
                                'version_id': Kenseo.popup.data.version_id
                            }
                        }
                    });

                    // Tags

                }
            }
            if(index === 3){
                sb.popup.renderSharePopupPeople();
            }
        }
        // -- End
    },
    populateExistingFileSelectedData: function(){
        // populating field code
        sb.ajaxCall({
            url: sb.getRelativePath('getArtefactMetaInfo'),
            container: $('.popup'),
            data: {
                id: sb.getPopupData('artefact_id')
            },
            success: function(response){
                // pre-populating the dropdowns if existing artefact is selected in the previous popup
                var artefactMetaInfo = response.data;
                // references
                Kenseo.combobox.referenceCombobox.refresh({
                    selectedData: artefactMetaInfo.referenceDocs, //[{name: "venkateshwar"}],//
                    newSettings: {
                        filterData: {
                            'version_id': Kenseo.popup.data.version_id
                        }
                    }
                });

                // Document type
                Kenseo.combobox.typeCombobox.refresh({
                    selectedData: Kenseo.settings.doctype[artefactMetaInfo.docType],
                    // When existing file is selected, the document type dropdown should be kept disabled
                    callback: function($el){
                        $el.find('input').prop('disabled', 'true');
                    }
                });
                // Assuming the IXD value is inserted successfully, in the above typeCombobox
                Kenseo.current.popup.find('.main-btn').prop('disabled', false);

                // Links

                // Tags
            }
        });

        // resetting the flag so that the ajax call will not trigger again
        // Kenseo.popup.info.existingFileSelected = false;
    },
    getChecked: function($el) {
        return $el.attr("checked") === "checked";
    },
    setChecked: function ($el, bln) {
        $el.attr("checked", bln);
        $el[0].checked = bln;
    },
    attachEvents: function () {
        $(".apply-to-all").off("change");
        $(".add-comments-chk input").off("click");
        $(".others-chk input input").off("click");
        $(".apply-to-all").on("change", function () {
            var $self = $(this);
            var $parent = $self.parents(".share-artefact-people-item-section");
            var $grandParent = $self.parents(".share-artefact-people-wrapper");
            var states = {
                comment: sb.popup.getChecked($parent.find(".add-comments-chk input")),
                others: sb.popup.getChecked($parent.find(".others-chk input")),
                all: !sb.popup.getChecked($self.find("input"))
            };

            $grandParent.find(".add-comments-chk").each(function () {
                sb.popup.setChecked($(this).find("input"), states.comment);
            });

            $grandParent.find(".others-chk").each(function () {
                sb.popup.setChecked($(this).find("input"), states.others);
            });

            $grandParent.find(".apply-to-all").each(function () {
                sb.popup.setChecked($(this).find("input"), states.all);
            });
        });
        $(".add-comments-chk input").on("click", function () {
            var $self = $(this);
            var $parent = $self.parents(".share-artefact-people-item-section");
            var $grandParent = $self.parents(".share-artefact-people-wrapper");
            var thisChk = !sb.popup.getChecked($self);
            var allChk = sb.popup.getChecked($parent.find(".apply-to-all input"));
            if (allChk) {
                $grandParent.find(".add-comments-chk").each(function () {
                    sb.popup.setChecked($(this).find("input"), thisChk);
                });
            } else {
                sb.popup.setChecked($(this), thisChk);
            }
        });

        $(".others-chk input").on("click", function () {
            var $self = $(this);
            var $parent = $self.parents(".share-artefact-people-item-section");
            var $grandParent = $self.parents(".share-artefact-people-wrapper");
            var thisChk = !sb.popup.getChecked($self);
            var allChk = sb.popup.getChecked($parent.find(".apply-to-all input"));
            if (allChk) {
                $grandParent.find(".others-chk").each(function () {
                    sb.popup.setChecked($(this).find("input"), thisChk);
                });
            } else {
                sb.popup.setChecked($(this), thisChk);
            }
        });
    },
    renderSharePopupPeople: function(obj, isSingle){

        var $shareArtefactWrapper = $(".share-artefact-people-wrapper");
        if(isSingle){
            $shareArtefactWrapper.append(sb.setTemplate("share-people", { data: obj }));
            $('.permissions').trigger('change');
        }
        else{
            var teamMembers = Kenseo.data.teamMembers || obj || [];
            // if teammembers are present in aretefactmetainfo variable, take it. or else pass an empty array
            // var specialTeamMembers = Kenseo.data.artefactmetainfo && Kenseo.data.artefactmetainfo.teamMembers || [];
            if(Kenseo.popup.info.existingFileSelected || Kenseo.popup.info.newFileSelected){
                // clear the already present data
                $shareArtefactWrapper.empty();
            }

            teamMembers.forEach(function(teamMember){
                $shareArtefactWrapper.append(sb.setTemplate("share-people", { data: teamMember }));
            });
        }
        $('.close-people-icon').click(function(){
          var userId = $(this).parent(".share-artefact-people-item").attr("data-k-user_id");
          $(this).parent(".share-artefact-people-item").remove();
          var $elm = $('.sv-name').filter(function(){ return this.getAttribute('data-id') == userId });
          $elm.parent(".sv-item").remove();
        });
        sb.popup.attachEvents();
    }
};
