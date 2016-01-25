"use strict";

sb.popup = {
    resetPopupData: function resetPopupData() {
        Kenseo.popup = {
            "info": {},
            "data": {}
        };
    },
    getProjectsPopup: function getProjectsPopup() {
        sb.loadFiles({
            "models": ["Projects"],
            "collections": ["Projects"]
        }, function () {
            sb.ajaxCall({
                collection: new Kenseo.collections.Projects(),
                data: {
                    userProjects: true
                },
                success: function success(data) {
                    var $currentPopup = Kenseo.current.popup;
                    var container = Kenseo.current.popup.find(".combobox")[0];
                    sb.toolbox.applyComboBox({
                        elem: container,
                        data: data.data,
                        settings: {
                            placeholder: "Choose Project"
                        },
                        onchange: function onchange($input, $selectedEl, bln) {
                            if (bln) {
                                sb.setPopupData($selectedEl.html(), "name");
                                sb.setPopupData($selectedEl.data("id"), "id");
                                $currentPopup.find(".main-btn").prop("disabled", false);
                            } else {
                                $currentPopup.find(".main-btn").prop("disabled", true);
                            }
                            // set a global variable that the project dropdown value has changed
                            Kenseo.popup.info.projectComboboxValueChanged = bln;
                        }
                    });
                    var popupData = sb.getPopupData();
                    if (popupData && popupData["project_name"]) {
                        $(container).find("input").val(popupData["project_name"]);
                        $currentPopup.find(".main-btn").prop("disabled", false);
                    }
                }
            });
        });
    },
    createFilePopup: function createFilePopup() {
        // if (sb.getPopupData("fileName")) {
        //     $(".create-file-item .notification-title").html(sb.getPopupData("fileName"));
        //     $(".create-file-item").css({
        //         "visibility": "visible"
        //     });
        //     $(".main-btn").prop("disabled", false);
        // }

        var $currentPopup = Kenseo.current.popup;

        var toggleStateMainBtn = function toggleStateMainBtn(state) {
            return $currentPopup.find(".main-btn").prop("disabled", state);
        };

        var toggleStateChooseFileCombo = function toggleStateChooseFileCombo(state) {
            return $currentPopup.find(".choose-file-combobox input").prop("disabled", state);
        };

        var toggleStateExistingFileCheck = function toggleStateExistingFileCheck(state, title) {
            var $existingCheckBox = $currentPopup.find(".existing-files-chk");
            if (state) {
                $existingCheckBox.parent().attr('title', title);
            } else if (title && title.length) {
                $existingCheckBox.parent().attr('title', '');
            }
            return $existingCheckBox.prop("disabled", state);
        };

        var toggleStateUploadNewFile = function toggleStateUploadNewFile(state) {
            return $currentPopup.find(".upload-files-input").prop("disabled", state);
        };

        var clearExistingFilesCombo = function clearExistingFilesCombo() {
            var $existingFilesCombobox = $currentPopup.find(".existing-files-combobox");

            $existingFilesCombobox.find(".suggestionsContainer").hide();
            $existingFilesCombobox.find('input').val('').prop("disabled", true);
        };

        $(".upload-files-input").change(function () {
            var files = this.files;

            // If user clicks cancel.
            if (!files) {
                // Clear selected file path from input box
                $(".create-file-close-icon").click();
                return;
            }
            var $currentPopup = Kenseo.current.popup;

            $currentPopup.find(".create-file-item").css({
                "visibility": "visible"
            });
            // Setting the flag to true
            Kenseo.popup.info.newFileSelected = true;
            if (this.files.length === 1) {
                // removing fakepath from string (Chrome)
                var value = this.value.replace("C:\\fakepath\\", "");
                $currentPopup.find(".create-file-item .notification-title").html(value).attr('title', value);
                toggleStateExistingFileCheck(false);
            } else if (this.files.length > 1) {
                // if multiple files selected
                $currentPopup.find(".create-file-item .notification-title").html("multiple files added");
                // Hide the "existing artefact version selecting checkbox"
                toggleStateExistingFileCheck(true, "you can't select a version for selected multiple files");
            } else {
                // when no file is selected
            }
            var info = "@ " + getTimeFormat() + " by " + Kenseo.data.header.screen_name;
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
            } else if (sb.getPopupData("actionType") == "addVersion") {
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
        sb.loadFiles({
            "collections": ["Artefacts"],
            "models": ["Artefacts"]
        }, function () {
            var projectId;
            if (Kenseo.popup.data.actionType == "addVersion") {
                projectId = sb.getPopupData("project_id");
            } else {
                projectId = sb.getPopupData("id");
            }
            sb.ajaxCall({
                collection: new Kenseo.collections.Artefacts(),
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
                        if (this.checked) {
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
                                for (var i = 0; i < attrs.length; i++) {
                                    var attr = attrs[i];
                                    if (attr.name.indexOf("data-") > -1) {
                                        obj[attr.name.substr(5)] = attr.value;
                                    }
                                }
                                obj.name = $selectedEl.html();

                                $currentPopup.find(".choose-existing-file-holder").html(_.template(templates["new-file"])({
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
        });
    },
    teamPopup: function teamPopup() {
        sb.setPopupData("addArtefact", "actionType");
        sb.setPopupData("addArtefact", "command");
        sb.setPopupData(false, "share");
        sb.loadFiles({
            "collections": ["Artefacts", "Tags"],
            "models": ["Artefacts"]
        }, function () {
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
                onchange: function onchange($elem, value, bln) {
                    if (bln) {
                        $currentPopup.find('.main-btn').removeAttr('disabled');
                    } else {
                        $currentPopup.find('.main-btn').attr('disabled', 'true');
                    }
                }
            });

            // populating the fields if an existing artefact is selected
            if (Kenseo.popup.info.existingFileSelected) {
                sb.popup.populateExistingFileSelectedData();
            }
        });
    },
    shareWithPeoplePopup: function shareWithPeoplePopup() {
        sb.setPopupData(true, "share");
        //now you need 2 sets of people, people those who are arleady in the project and all the remaining people

        sb.loadFiles({
            "collections": ["People"],
            "models": ["People"]
        }, function () {
            sb.ajaxCall({
                collection: new Kenseo.collections.People(),
                data: {
                    "all": true,
                    "projectId": sb.getPopupData("id")
                },
                success: function success(resp) {
                    //render all the others in a COMBO
                    var data = resp.data.otherMembers;
                    var container = document.querySelector(".people-combobox");
                    sb.toolbox.applyComboBox({
                        elem: container,
                        data: data,
                        settings: {
                            placeholder: "Type mail ID or username and press enter ",
                            multiSelect: true
                        },
                        onchange: function onchange($input, $selectedEl, bln) {
                            if (bln) {
                                var obj = {};
                                var attrs = $selectedEl[0].attributes;
                                for (var i = 0; i < attrs.length; i++) {
                                    var attr = attrs[i];
                                    if (attr.name.indexOf("data-") > -1) {
                                        obj[attr.name.substr(5)] = attr.value;
                                    }
                                }
                                obj.name = $selectedEl.html();
                                sb.popup.renderSharePopupPeople(obj, true);

                                // setting the default values
                                var $all = $(".apply-to-all input").eq(0);
                                var $comment = $(".add-comments-chk input").eq(0);
                                var $others = $(".others-chk input").eq(0);
                                if (sb.popup.getChecked($all)) {
                                    var $grandParent = $(".share-artefact-people-wrapper");
                                    var states = {
                                        comment: sb.popup.getChecked($comment),
                                        others: sb.popup.getChecked($others),
                                        all: sb.popup.getChecked($all)
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
                                }
                            }
                        }
                    });

                    //render all the team members
                    sb.popup.renderSharePopupPeople(resp.data.teamMembers);
                }
            });
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
    meetingIvite: function meetingIvite() {
        sb.loadFiles({
            "models": ["Projects", "Artefacts", "People"],
            "collections": ["Projects", "Artefacts", "People"]
        }, function () {
            sb.ajaxCall({
                "collection": new Kenseo.collections.Projects(),
                "data": {
                    userProjects: true
                },
                success: function success(data) {
                    var container = document.querySelector(".project-combobox");
                    var combobox = sb.toolbox.applyComboBox({
                        elem: container,
                        data: data.data,
                        settings: {
                            placeholder: "Choose Project"
                        },
                        // value: Kenseo.page.data.project && Kenseo.page.data.project.name || ""
                        insertAfter: function insertAfter($input, $selectedEl, bln) {
                            // console.log("project name changed");

                            var projectId = $selectedEl.attr("data-id");
                            var projectName = $selectedEl.html();

                            sb.setPopupData(projectId, "projectId");
                            sb.setPopupData(this.innerText, "projectName");

                            $(this).parent().hide();
                            sb.setPopupData([], "selectedUsers");
                            // now set the project people
                            sb.ajaxCall({
                                "collection": new Kenseo.collections.People(),
                                "data": {
                                    projectId: projectId
                                },
                                "success": function success(data) {
                                    var peopleHolder = document.querySelector(".people-name");
                                    var combobox = sb.toolbox.applyComboBox({
                                        elem: peopleHolder,
                                        data: data.data,
                                        settings: {
                                            placeholder: "",
                                            multiSelect: true,
                                            suggestionsViewerAlign: "top",
                                            noplaceholder: " "
                                        },
                                        insertAfter: function insertAfter($input, $selectedEl, bln) {}
                                    });
                                }
                            });
                            sb.ajaxCall({
                                "collection": new Kenseo.collections.Artefacts(),
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
                                }
                            });
                        }
                    });

                    var artefactComboboxContainer = document.querySelector(".artefact-combobox");
                    var artefactCombobox = sb.toolbox.applyComboBox({
                        elem: artefactComboboxContainer,
                        data: [],
                        settings: {
                            placeholder: "Choose Artefact",
                            value: Kenseo.page.data.artefact && Kenseo.page.data.artefact.name || ""
                        }
                    });
                }
            });

            $(".input-meeting-date").Zebra_DatePicker({
                default_position: "below",
                format: "M d, Y",
                onSelect: function onSelect(display, date) {
                    console.log("changed something");
                    sb.setPopupData(date, "date");
                }

            });
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
        });

        //onchange event to fromtime dropdown
        $('.projects-dropdown.fromTime').on('change', function (x, y, z) {
            var options = this.options;
            var index = options.selectedIndex;

            // resetting html of toTime field
            var toTimeField = document.querySelector('.projects-dropdown.toTime');
            toTimeField.innerHTML = "";

            for (var i = index + 1; i < options.length; i++) {
                toTimeField.innerHTML = toTimeField.innerHTML + options[i].outerHTML;
            }
        });
        // pre-populate the data if the user is in project page
        if (Kenseo.current.page == "project-page") {
            // var data = Kenseo.populate.meeting;
            var currentProjectPageName = Kenseo.data.projects[Kenseo.page.id].name;
            $('.project-combobox input[type="text"]').val(currentProjectPageName);
            // $('.field-section[data-name="meetingArtefact"] input[type="text"]').val(data.artefactName);
            // $('.field-section[data-name="agenda"] textarea').val(data.agenda);
            // $('.field-section[data-name="date"] .input-meeting-date').val(sb.timeFormat(data.startTime,true));
            // $('.field-section[data-name="toTime"] select').val(sb.getHours(data.endTime));
            // $('.field-section[data-name="fromTime"] select').val(sb.getHours(data.startTime));
            // $('.field-section[data-name="location"] input[type="text"].meeting-location').val(data.venue);
        }
    },
    coverImage: function coverImage() {
        sb.loadFiles({
            'files': ['js/app/components/custom-panning.js']
        }, function () {
            var $coverImageInput = $('.image-cover-section .upload-files-input');
            if ($coverImageInput.length) {
                $coverImageInput.on('change', function () {
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
                        };
                        fr.readAsDataURL(files[0]);
                    }

                    // Not supported
                    else {
                            // fallback -- perhaps submit the input to an iframe and temporarily store
                            // them on the server until the user's session ends.
                        }
                });
            }
        });
    },
    // This function holds all the manipulations which holds the states inside array of popups
    popupsStateMaintainer: function popupsStateMaintainer(payload) {
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
        if (currentActionType === "shareArtefact" || currentActionType === "addArtefact") {
            var metaInfo = sb.getPopupMetaInfo(sb.getPopupData());

            var $projectText = $popup.find('.popup-meta-project-name-txt');
            var $fileName = $popup.find('.popup-meta-file-name');
            var $type = $popup.find('.popup-meta-type');
            var $references = $popup.find('.popup-meta-references');
            var $tags = $popup.find('.popup-meta-tags');
            // if the popup is already generated and the project name is changed in previous project, change the project name
            if ($projectText.length) {
                $projectText.attr('title', metaInfo.getProjectName());
            }
            // change the file name
            if ($fileName.length) {
                $fileName.attr('title', metaInfo.getFileName());
            }
            if ($type.length) {
                $type.attr('title', metaInfo.getType());
            }
            if ($references.length) {
                $references.attr('title', metaInfo.getReferences());
            }
            if ($tags.length) {
                $tags.attr('title', metaInfo.getTags());
            }

            // refresh the list of combobox based on project id
            if (index === 1 && currentIndex === 0 && Kenseo.popup.info.projectComboboxValueChanged /*&& currentActionType === "shareArtefact"*/) {
                    // need to make this "shareArtefact" specific
                    // clearing the previous selection manually
                    var $chooseExistingFileHolder = $popup.find(".choose-existing-file-holder");
                    if ($chooseExistingFileHolder.length) {
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
                        data: {
                            projectid: sb.getPopupData('id'),
                            references: true,
                            ignore: 0
                        },
                        success: function success(response) {
                            if (Kenseo.combobox.chooseFileCombobox) {
                                Kenseo.combobox.chooseFileCombobox.refresh({
                                    newSuggestions: response.data
                                });
                            }
                            if (Kenseo.combobox.existingCombobox) {
                                Kenseo.combobox.existingCombobox.refresh({
                                    newSuggestions: response.data
                                });
                            }
                        }
                    });
                }

            if (index === 2 && currentIndex === 1) {
                if (Kenseo.popup.info.existingFileSelected) {
                    // when existing file is selected
                    sb.popup.populateExistingFileSelectedData();
                } else if (Kenseo.popup.info.newFileSelected) {
                    // reset the fields

                    // references
                    Kenseo.combobox.referenceCombobox.refresh({
                        callback: function callback($el) {
                            // represents to clear the data
                            $el.find('.suggestions-viewer').empty();
                        }
                    });

                    // Document type
                    Kenseo.combobox.typeCombobox.refresh({
                        // When existing file is selected, the document type dropdown should be kept disabled
                        callback: function callback($el) {
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
            if (index === 3) {
                sb.popup.renderSharePopupPeople();
            }
        }
        // -- End
    },
    populateExistingFileSelectedData: function populateExistingFileSelectedData() {
        // populating field code
        sb.ajaxCall({
            url: sb.getRelativePath('getArtefactMetaInfo'),
            data: {
                id: sb.getPopupData('artefact_id')
            },
            success: function success(response) {
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
                    callback: function callback($el) {
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
    getChecked: function getChecked($el) {
        return $el.attr("checked") === "checked";
    },
    setChecked: function setChecked($el, bln) {
        $el.attr("checked", bln);
        $el[0].checked = bln;
    },
    attachEvents: function attachEvents() {
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
    renderSharePopupPeople: function renderSharePopupPeople(obj, isSingle) {

        var $shareArtefactWrapper = $(".share-artefact-people-wrapper");
        if (isSingle) {
            $shareArtefactWrapper.append(_.template(templates["share-people"])({ data: obj }));
        } else {
            var teamMembers = Kenseo.data.teamMembers || obj || [];
            var specialTeamMembers = Kenseo.data.artefactmetainfo.teamMembers;
            if (Kenseo.popup.info.existingFileSelected || Kenseo.popup.info.newFileSelected) {
                // clear the already present data
                $shareArtefactWrapper.empty();
            }
            if (Kenseo.popup.info.existingFileSelected) {
                // merge two objects
                var newObj = _.merge(teamMembers, specialTeamMembers);
            } else {
                var newObj = teamMembers;
            }
            for (var i = 0; i < newObj.length; i++) {
                $shareArtefactWrapper.append(_.template(templates["share-people"])({ data: newObj[i] }));
            }
        }
        sb.popup.attachEvents();
    }
};

// selectedUser = $selectedEl.html()
// Kenseo.popup.data.selectedUsers.push({
//     id: $selectedEl.html(),
//     email: $selectedEl.attr('data-email')
// })
// $('.names-holder').append(" <div class='tag'>" + selectedUser + "<div class='tag-close'></div</div>");