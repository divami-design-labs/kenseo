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
                // var $selectedElement = $currentPopup.find('.project-selection-block-title');
                $('input[type=radio][name=projectSection]').change(function() {
                    var $selectedElement = $(this).next().find('.project-selection-block-title');
                    sb.setPopupData($selectedElement.html(), "project_name");
                    sb.setPopupData($selectedElement.attr('data-k-project_id'), "project_id");
                    $currentPopup.find(".main-btn").prop("disabled", false);
                });
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
    shareArtefactPopup: function shareArtefactPopup() {
        var projectId = sb.getPopupData("project_id");
        var $currentPopup = Kenseo.current.popup;
        var container = $currentPopup.find(".choose-existing-file-holder");
        container.html("");
        //get the artefacts related to project
        sb.ajaxCall({
            collection: new Kenseo.collections.Artefacts(),
            container: $('.popup'),
            data: {
                project_id: projectId,
                references: true,
                withVersions: true,
                ignore: 0
            },
            success: function success(response) {
                Kenseo.globalArtefacts = response.data;
                Kenseo.globalArtefacts.forEach(function (item){
                    container.append(sb.setTemplate("share-file", {
                        data: item
                    }));
                });


            }
        });
        $('.version-filter-list input').prop('checked','true');
        //setting default values
        var searchStr = "";
        var selectedtypes = [];
        $('.filter-list-dropdown').click(function(){
            $('.apply-all-types').change(function(){
                $('.version-filter-list input').prop('checked',this.checked);
            });
            $('.version-filter-list input').not('.apply-all-types').change(function(){
                var checkboxs = $('.version-filter-list input').not('.apply-all-types').length
                var checkedCheckboxs = $('.version-filter-list input:checked').not('.apply-all-types').length;
                //if individual checkbox is unchecked, make apply-to-all unchecked
                if(checkedCheckboxs == checkboxs){
                    $('.apply-all-types').prop('checked',true);
                }else {
                    $('.apply-all-types').prop('checked',false);
                }
            });
            //if options are not applied then reset to previous applied options
            if(selectedtypes.length){
                $('.version-filter-list input').prop('checked',false);
            }
            $checkedElements = $('.version-filter-list input').filter(function(item){
                var $currentElement = $(this);
                return Array.prototype.some.call(selectedtypes,function(selectedtype){
                    return $currentElement.attr('file-type') == selectedtype;
                });
            });
            $checkedElements.prop('checked',true);
        });
        $("input").keyup(function(){
            var matchedElements = $(".choose-existing-file-holder").find(".to-share-filename");
            searchStr = $(this).val();
            filterFiles();
        });
        //set all chekboxes checked/unchecked when applied to all is selected
        $('.version-filter-list button').click(function(e){
            e.stopPropagation();
            $('.filter-version-type').removeClass("enable-version-list");
            selectedtypes = $('.version-filter-list input:checked').map(function(){
                return $(this).attr('file-type');
            });
            filterFiles();
        });
        //filter the files depending on file-type and search
        var filterFiles = function(){
            var allNonActiveElements = $(".choose-existing-file-holder").find(".to-share-file").not(".active");
            var allElements = allNonActiveElements.find(".to-share-filename");
            searchableStr = new RegExp('^' + searchStr);
            if(!selectedtypes.length){
                selectedtypes = ["IXD","UID","P","IA","ALL"];
            }
            var matchedElements = allElements.filter(function(item){
                //retrieving the searched files
                return searchableStr.test($(this).html()) ;
            }).filter(function(item){
                var match = $(this).prev('.to-share-filetype').html();
                //matching files by selected file type
                return Array.prototype.slice.call(selectedtypes).indexOf(match.trim()) > -1;
            });
            matchedElements.parents('.to-share-file').show();
            matchedElements.parents('.to-share-file').prependTo($('.choose-existing-file-holder'));
            var notMatchedElements = allElements.not(matchedElements);
            notMatchedElements.parents('.to-share-file').hide();
        }

    },
    renameArtefact: function renameArtefact() {
        var $currentPopup = Kenseo.current.popup;
        var artefact = Kenseo.popup.data;
        $atrefactTitle = $currentPopup.find("input").val();
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
            var projectId;
            projectId = sb.getPopupData("project_id");
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

                //@TODO:Commented the below code temporarily,don't know the use of it.
                //sb.setPopupData("replaceArtefactFile", "actionType");
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
            projectId = sb.getPopupData("project_id") || sb.getPopupData("projId");
            var artefact_id = sb.getPopupData("artefact_id");
            var projects = false;
        } else {
            projectId = sb.getPopupData("project_id");
            var projects = true;
        }
        sb.ajaxCall({
            collection: new Kenseo.collections.Artefacts(),
            container: $('.popup'),
            data: {
                project_id: projectId,
                artefact_id: artefact_id,
                projects: projects,
                references: true,
                withVersions: true,
                ignore: 0
            },
            success: function success(response) {
                var $currentPopup = Kenseo.current.popup;
                var container = $currentPopup.find(".existing-files-combobox")[0];
                Kenseo.globalArtefacts = response.data;
                Kenseo.globalArtefacts.forEach(function(item){
                    item.id = item.artefact_id;
                    item.name = item.artefact_name;
                });
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
                    },
                    insertAfter: function insertAfter($input, $selectedEl, bln) {
                        if (bln) {
                            sb.setPopupData($selectedEl.data("id"), "existing_artefact_id");
                            sb.setPopupData($selectedEl.html(), "existing_artefact_name");
                            sb.setPopupData($selectedEl.data('artefact_version_id'), 'existing_artefact_version_id');

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
                        $input.val("");
                    }
                });
            }
        });
    },
    successCallback : function successCallback() {
        var $currentPopup = Kenseo.current.popup;
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
    },
    setreferences: function setreferences(data) {
        var container = document.querySelector(".reference-combobox");
        Kenseo.combobox.referenceCombobox = sb.toolbox.applyComboBox({
            elem: container,
            // data: data.data,
            data: data,
            settings: {
                multiSelect: true,
                filterData: {
                    'version_id': Kenseo.popup.data.artefact_version_id || Kenseo.popup.data.artefact_ver_id
                }
            }
        });
    },
    setlinks: function setlinks(data) {
        var links = document.querySelector(".links-combobox");
        Kenseo.combobox.linksCombobox = new sb.toolbox.applyComboBox({
            elem: links,
            // data: data.data,
            data: data,
            settings: {
                multiSelect: true,
                filterData: {
                    'version_id': Kenseo.popup.data.artefact_version_id || Kenseo.popup.data.artefact_ver_id
                }
            }
        });

    },
    editArtefactPopup: function editArtefactPopup() {
        sb.setPopupData("editArtefact", "actionType");
        sb.setPopupData("editArtefact", "command");
        sb.setPopupData(false, "share");
        var $currentPopup = Kenseo.current.popup;
        // Keep the .main-btn class button disabled by default
        // (Enable this button when user selects the document type)
        $currentPopup.find('.main-btn').attr('disabled', 'true');
        //Setting flag to get existing files
        Kenseo.popup.info.existingFileSelected = true;
        sb.ajaxCall({
            collection: new Kenseo.collections.Artefacts(),
            container: $('.popup'),
            data: {
                "projects": true,
                "versionId": sb.getPopupData("artefact_version_id"),
                "project_id": sb.getPopupData("project_id") || sb.getPopupData("projId")
            },
            success: function success(res) {
                res.data.map(function(item){
                    item.name = item.artefact_name;
                    item.id = item.artefact_id;
                    return item;
                });
                Kenseo.artefacts = res.data.filter(function(item){
                    return item.artefact_version_id != sb.getPopupData("artefact_version_id");
                });
                sb.popup.successCallback();
                sb.popup.setreferences(Kenseo.artefacts);
                sb.popup.setlinks(Kenseo.artefacts)
            }
        });
        sb.ajaxCall({
            collection: new Kenseo.collections.Artefacts(),
            container: $('.popup'),
            data: {
                "tags": true,
                "artefact_id": sb.getPopupData("artefact_id"),
                "project_id": sb.getPopupData("project_id") || sb.getPopupData("projId")
            },
            success: function success(res) {
                console.log(res, "actual response");
                var data = res.data[0].tag_name;
                for(var i=1; i<res.data.length; i++) {
                    data = data + ',' + res.data[i].tag_name.trim();
                }
                console.log(data, "here");
                $('.tags-input-txt').val(data);
            }
        });



        // populating the fields if an existing artefact is selected
        if(Kenseo.popup.info.existingFileSelected){
            sb.popup.populateExistingFileSelectedData();
        }
    },
    teamPopup: function teamPopup() {
        sb.setPopupData("addArtefact", "actionType");
        sb.setPopupData("addArtefact", "command");
        sb.setPopupData(false, "share");
        var $currentPopup = Kenseo.current.popup;
        // Keep the .main-btn class button disabled by default
        // (Enable this button when user selects the document type)
        $currentPopup.find('.main-btn').attr('disabled', 'true');
        if(!Kenseo.globalArtefacts) {
            sb.ajaxCall({
                collection: new Kenseo.collections.Artefacts(),
                container: $('.popup'),
                data: {
                    "all": true,
                    "artefact_version_id": sb.getPopupData("artefact_version_id") || sb.getPopupData("version_id"),
                    "project_id": sb.getPopupData("project_id") || sb.getPopupData("id")
                },
                success: function success(resp) {
                    Kenseo.globalArtefacts = resp.data.artefacts;
                    sb.popup.successCallback();
                    sb.popup.setreferences(Kenseo.globalArtefacts);
                    sb.popup.setlinks(Kenseo.globalArtefacts);
                    Kenseo.combobox.typeCombobox.selectValues(["IXD"]);

                }
            });
        } else {
            sb.popup.successCallback();
            sb.popup.setreferences(Kenseo.globalArtefacts);
            sb.popup.setlinks(Kenseo.globalArtefacts);
        }

        // populating the fields if an existing artefact is selected
        if(Kenseo.popup.info.existingFileSelected){
            sb.popup.populateExistingFileSelectedData();
        }
    },

    shareWithPeoplePopup: function shareWithPeoplePopup() {
        sb.setPopupData(true, "share");
        //now you need 2 sets of people, people those who are arleady in the project and all the remaining people
        $('.popup').find('.main-btn').attr('disabled', 'false');
        $('.popup').find('.sarp-checkbox-holder').addClass('hide');
        sb.ajaxCall({
            collection: new Kenseo.collections.People(),
            container: $('.popup'),
            data: {
                "all": true,
                "versionId": sb.getPopupData("artefact_version_id") || sb.getPopupData("version_id"),
                "projectId": sb.getPopupData("project_id") || sb.getPopupData("Kenseo.page.id")
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
                var currentPopup = $('.popup');
                Kenseo.combobox.sharePeople = sb.toolbox.applyComboBox({
                    elem: container,
                    data: otherMembers,
                    settings: {
                        placeholder: "Type mail ID or username and press enter ",
                        multiSelect: true
                    },
                    onchange: function onchange($input, $selectedEl, bln) {
                        if (bln) {
                            currentPopup.find('.main-btn').removeAttr('disabled');
                            currentPopup.find('.sarp-checkbox-holder').removeClass('hide');
                            var obj = {};
                            var attrs = $selectedEl[0].attributes;
                            Array.prototype.forEach.call(attrs, function(attr){
                                if (attr.name.indexOf("data-") > -1) {
                                    obj[attr.name.substr(5)] = attr.value;
                                }
                            });
                            obj.name = $selectedEl.html();
                            sb.popup.renderSharePopupPeople(obj, true);
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
            $currentPopup.find('.global-permissions').trigger('change');
        } else {
            $currentPopup.find(".people-permissions-section").css({
             "display" : "none"
            });
            $currentPopup.find(".add-comments-chk input, .others-chk input").removeAttr("disabled");
        }
         $currentPopup.find(".global-permissions").off('change').on('change', function (e){
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
                container: $('.field-section--recipients.field-section'),
                "data": {
                    all: true
                }
            }
        ], function(projectResponse, peopleResponse){
            var kebabActionType = _.kebabCase(sb.getPopupData('actionType'));

            var container = document.querySelector(".project-combobox");
            var combobox = sb.toolbox.applyComboBox({
                elem: container,
                data: projectResponse.data,
                params: {
                    id: "project_id",
                    name: "project_name"
                },
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

                    sb.setPopupData(projectId, "project_id");
                    sb.setPopupData(this.innerText, "project_name");

                    $(this).parent().hide();
                    sb.setPopupData([], "selectedUsers");
                    // now set the project people

                    refreshArtefactCombobox(projectId);
                }
            });


            var existingParticipantsIds = [];
            // if the actionType is create-meeting and the popup is triggered from project page's option
            if(kebabActionType === 'create-meeting'){
                // refresh the artefact section with new list according to the passed project name
                var projectName = sb.getPopulateValue(kebabActionType, 'project_name');
                var projectId = sb.getPopulateValue(kebabActionType, 'project_id');
                // if project name is present, then the call is for create meeting invitation from project page
                if(projectName){
                    combobox.selectValues([projectName]);  // automatically refreshes the artefacts (triggers change event)
                }
                var artefactName = sb.getPopulateValue(kebabActionType, 'artefact_name');
                // refresh the artefact section with new list according to the passed project id
                if(projectId){
                    refreshArtefactCombobox(projectId, function(){
                        if(artefactName){ // this is true when the form is triggered from artefact card
                            // adding the value again to the artefact combobox's input
                            artefactCombobox.selectValues([artefactName]);
                        }
                    });
                }

                // resetting the populate object
                sb.resetPopulate(kebabActionType);
            }

            if(kebabActionType === 'update-meeting'){
                combobox.selectValues([sb.getPopulateValue(kebabActionType, 'project_name')]);
                // get existing participant ids
                existingParticipantsIds = sb.getPopulateValue(kebabActionType, 'participants_user_ids');
                // get the value in artefact combobox's input field
                var $artefactComboboxInput = $currentPopup.find('.artefact-combobox input');
                var value = $artefactComboboxInput.val();
                // refresh the artefact section with new list according to the passed project id
                refreshArtefactCombobox(sb.getPopulateValue(kebabActionType, 'project_id'), function(){
                    // adding the value again to the artefact combobox's input
                    // $artefactComboboxInput.val(value);
                    artefactCombobox.selectValues([value]);
                });

                // resetting the populate object
                sb.resetPopulate(kebabActionType);
            }

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
                        value: item.id
                    };
                    // add selected attribute if the id of the participant is already present
                    // This is true for update meeting invitation
                    if(existingParticipantsIds.indexOf(item.id) > -1){
                        obj.attr.selected = "";
                    }
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
                params: {
                    id: "artefact_id",
                    name: "artefact_name"
                },
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
                    container: $('.artefact-field-section.field-section'),
                    "data": {
                        // maskedArtefactVersionId: maskedId,
                        projects: true,
                        project_id: projectId,
                        sortBy: "name",
                        $sharePermission: "true",
                        withVersions: "true"
                    },
                    "success": function success(response) {
                        artefactCombobox.refresh({
                            newSuggestions: response.data.map(function(item){
                                item.name = item.artefact_name;
                                item.id = item.artefact_id;
                                return item;
                            })
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
                var index = this.selectedIndex;
                // removing selected attribute
                Array.prototype.forEach.call(options, function(el){
                    el.removeAttribute('selected');
                });

                // re-assign the selected Index
                this.selectedIndex = index;
                // var index = options.selectedIndex;

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
        $('#drop-zone').dropZone();

        if($coverImageInput.length){
            $coverImageInput.on('change', function(){
                // console.dir(this);
                // Link: http://stackoverflow.com/a/3814285/1577396
                var files = this.files;

                // FileReader support
                if (FileReader && files && files.length) {
                    var fr = new FileReader();
                    sb.setPopupData(files[0], "files");
                    fr.onload = function () {
                        // document.getElementById(outImage).src = fr.result;
                        $('.cover-image-viewer .img-content').attr("src", fr.result);
                        $('.cover-image-viewer').show();
                        $('.uploader-section').hide();
                        var dimensions = setPanningDimensions();
                        $('.use-full-img input').change(function(){

                            if(this.checked){
                                $('.pan-img').css({
                                    "left" : "0",
                                    "top" : "0",
                                    "max-width" : "",
                                    "max-height" : ""

                                });
                                $('.resize').remove();
                            }
                        });

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
                        withVersions: true,
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
                            'version_id': Kenseo.popup.data.artefact_version_id
                        }
                    }
                });
                Kenseo.combobox.linksCombobox.refresh({
                    selectedData: artefactMetaInfo.links,
                    newSettings: {
                        filterData: {
                            'version_id': Kenseo.popup.data.artefact_version_id
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

        function decideVisibilityOfGroupLevelCheckbox(){
            var $currentPopup = Kenseo.current.popup;
            var $groupLevelCheckbox = $('.sarp-checkbox-holder');
            var $doneBtn = $currentPopup.find('.done-btn');
            var peopleLength = $shareArtefactWrapper.find('.share-artefact-people-item').length;
            $doneBtn.prop({'disabled': peopleLength === 0});
            // show group level permissions only when the added people are more than one user
            if(peopleLength > 1){
                // show group level permissions
                $groupLevelCheckbox.show();
            }
            else{
                // hide group level permissions
                $groupLevelCheckbox.hide();
            }
        }
        decideVisibilityOfGroupLevelCheckbox();

        sb.attach($('.close-people-icon'), 'click', function(){  
            var userId = $(this).parent(".share-artefact-people-item").attr("data-k-user_id");
            $(this).parent(".share-artefact-people-item").remove();
            var $elm = $('.sv-name').filter(function(){ return this.getAttribute('data-id') == userId });
            $elm.parent(".sv-item").remove();

            decideVisibilityOfGroupLevelCheckbox();
        });
        sb.popup.attachEvents();
    }
};
