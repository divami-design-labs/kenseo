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
                    var container = document.querySelector(".combobox");
                    sb.toolbox.applyComboBox({
                        elem: container,
                        data: data.data,
                        settings: {
                            placeholder: "Choose Project"
                        },
                        onchange: function onchange($input, $selectedEl, bln) {
                            if (bln) {
                                sb.setPopupData($selectedEl.html(), "project_name");
                                sb.setPopupData($selectedEl.data("id"), "project_id");
                                $(".main-btn").prop("disabled", false);
                            } else {
                                $(".main-btn").prop("disabled", true);
                            }
                        }
                    });
                    var popupData = sb.getPopupData();
                    if (popupData && popupData["project_name"]) {
                        $(container).find("input").val(popupData["project_name"]);
                        $(".main-btn").prop("disabled", false);
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
            //if this is an add artefact in the next popup call back it will be set taccordingly
            //for replace this is the only place we can decide wheteher it is a replace call or not
            if (sb.getPopupData("actionType") == "replaceArtefact") {
                sb.setPopupData("replaceArtefact", "command");
                sb.setPopupData("replaceArtefactFile", "actionType");
            } else if (sb.getPopupData("actionType") == "addArtefactVersion") {
                sb.setPopupData("addArtefactVersion", "command");
                sb.setPopupData("addArtefactVersionFile", "actionType");
            }

            $(".main-btn").prop("disabled", false);

            $(".choose-file-combobox input").attr("disabled", true);
            $(".existing-files-chk").attr("disabled", false);
        });
        $(".create-file-close-icon").click(function () {
            $(".create-file-item").css({
                "visibility": "hidden"
            });
            $(".choose-file-combobox input").attr("disabled", false);
            $(".main-btn").prop("disabled", true);
            sb.setPopupData(null, "fileName");
            sb.setPopupData(null, "file");
            sb.setPopupData(null, "MIMEType");
            sb.setPopupData(null, "size");
            sb.setPopupData(null, "description");

            $(".existing-files-chk").attr("disabled", true).prop("checked", false);
            $(".existing-files-combobox").find(".suggestionsContainer").hide();
        });
        sb.loadFiles({
            "collections": ["Artefacts"],
            "models": ["Artefacts"]
        }, function () {
            sb.ajaxCall({
                collection: new Kenseo.collections.Artefacts(),
                data: {
                    projectid: sb.getPopupData("project_id"),
                    references: true,
                    ignore: 0
                },
                success: function success(data) {
                    var container = document.querySelector(".existing-files-combobox");
                    var existingCombobox = sb.toolbox.applyComboBox({
                        elem: container,
                        data: data.data,
                        settings: {
                            placeholder: "Choose Files",
                            disabled: true
                        },
                        onchange: function onchange($input, $selectedEl, bln) {
                            if (bln) {
                                $(".main-btn").prop("disabled", false);
                                sb.setPopupData($selectedEl.data("id"), "artefact_id");
                            } else {
                                $(".main-btn").prop("disabled", true);
                            }
                        }
                    });

                    $(".existing-files-chk").change(function (e) {
                        // e.stopPropagation();
                        var $elem = existingCombobox.$elem;
                        var $input = $elem.find("input");
                        $elem.find(".suggestionsContainer").hide();
                        var $selectables = $elem.find(".selectable");
                        if ($selectables.length) {
                            $input.prop("disabled", !this.checked);
                            if (!this.checked) {
                                $input.val("");
                            }
                        }
                    });

                    var chooseFileCombobox = sb.toolbox.applyComboBox({
                        elem: document.querySelector(".choose-file-combobox"),
                        data: data.data,
                        settings: {
                            placeholder: "Choose Files"
                        },
                        onchange: function onchange($input, $selectedEl, bln) {
                            if (bln) {
                                sb.setPopupData($selectedEl.data("id"), "artefact_id");

                                var obj = {};
                                var attrs = $selectedEl[0].attributes;
                                for (var i = 0; i < attrs.length; i++) {
                                    var attr = attrs[i];
                                    if (attr.name.indexOf("data-") > -1) {
                                        obj[attr.name.substr(5)] = attr.value;
                                    }
                                }
                                obj.name = $selectedEl.html();

                                $(".choose-existing-file-holder").html(_.template(templates["new-file"])({
                                    data: obj
                                }));

                                $(".choose-existing-file-holder .close-icon").click(function () {
                                    $(".choose-existing-file-holder").html("");
                                    //
                                    $(".upload-files-input").attr("disabled", false);
                                    $(".existing-files-chk").attr("disabled", true);
                                    $(".main-btn").prop("disabled", true);
                                });
                                $input.val("");

                                //
                                $(".upload-files-input").attr("disabled", true);
                                $(".existing-files-chk").attr("disabled", false);
                                $(".main-btn").prop("disabled", false);
                            } else {
                                $(".main-btn").prop("disabled", true);
                            }
                        },
                        insertAfter: function insertAfter($input, $selectedEl, bln) {
                            $input.val("");
                        }
                    });

                    $(".existing-files-chk").change(function () {
                        var $elem = chooseFileCombobox.$elem;
                        var $input = $elem.find("input");
                        var $selectables = $elem.find(".selectable");
                        if ($selectables.length) {
                            $input.prop("disabled", !this.checked);
                            if (!this.checked) {
                                $input.val("");
                            }
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
            // Tags listing
            sb.ajaxCall({
                "collection": new Kenseo.collections.Artefacts(),
                "data": {
                    references: true,
                    ignore: 0,
                    projectid: sb.getPopupData("project_id")
                },
                success: function success(data) {
                    var container = document.querySelector(".reference-combobox");
                    var combobox = sb.toolbox.applyComboBox({
                        elem: container,
                        data: data.data,
                        settings: {
                            multiSelect: true
                        }
                    });

                    var links = document.querySelector(".links-combobox");
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
                "collection": new Kenseo.collections.Tags(),
                "data": {},
                success: function success(data) {
                    var container = document.querySelector(".tags-combobox");
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
    shareWithPeoplePopup: function shareWithPeoplePopup() {
        sb.setPopupData(true, "share");
        //now you need 2 sets of people, people those who are arleady in the project and all the remaining people

        sb.loadFiles({
            "collections": ["People"],
            "models": ["People"]
        }, function () {
            function getChecked($el) {
                return $el.attr("checked") === "checked";
            }
            function setChecked($el, bln) {
                $el.attr("checked", bln);
                $el[0].checked = bln;
            }
            function attachEvents() {
                $(".apply-to-all").off("change");
                $(".add-comments-chk input").off("click");
                $(".others-chk input input").off("click");
                $(".apply-to-all").on("change", function () {
                    var $self = $(this);
                    var $parent = $self.parents(".share-artefact-people-item-section");
                    var $grandParent = $self.parents(".share-artefact-people-wrapper");
                    var states = {
                        comment: getChecked($parent.find(".add-comments-chk input")),
                        others: getChecked($parent.find(".others-chk input")),
                        all: !getChecked($self.find("input"))
                    };

                    $grandParent.find(".add-comments-chk").each(function () {
                        setChecked($(this).find("input"), states.comment);
                    });

                    $grandParent.find(".others-chk").each(function () {
                        setChecked($(this).find("input"), states.others);
                    });

                    $grandParent.find(".apply-to-all").each(function () {
                        setChecked($(this).find("input"), states.all);
                    });
                });
                $(".add-comments-chk input").on("click", function () {
                    var $self = $(this);
                    var $parent = $self.parents(".share-artefact-people-item-section");
                    var $grandParent = $self.parents(".share-artefact-people-wrapper");
                    var thisChk = !getChecked($self);
                    var allChk = getChecked($parent.find(".apply-to-all input"));
                    if (allChk) {
                        $grandParent.find(".add-comments-chk").each(function () {
                            setChecked($(this).find("input"), thisChk);
                        });
                    } else {
                        setChecked($(this), thisChk);
                    }
                });

                $(".others-chk input").on("click", function () {
                    var $self = $(this);
                    var $parent = $self.parents(".share-artefact-people-item-section");
                    var $grandParent = $self.parents(".share-artefact-people-wrapper");
                    var thisChk = !getChecked($self);
                    var allChk = getChecked($parent.find(".apply-to-all input"));
                    if (allChk) {
                        $grandParent.find(".others-chk").each(function () {
                            setChecked($(this).find("input"), thisChk);
                        });
                    } else {
                        setChecked($(this), thisChk);
                    }
                });
            }
            sb.ajaxCall({
                collection: new Kenseo.collections.People(),
                data: {
                    "all": true,
                    "projectId": sb.getPopupData("project_id")
                },
                success: function success(resp) {
                    //reder all the others in a COMBO
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
                                $(".share-artefact-people-wrapper").append(_.template(templates["share-people"])({ data: obj }));
                                attachEvents();

                                // setting the default values
                                var $all = $(".apply-to-all input").eq(0);
                                var $comment = $(".add-comments-chk input").eq(0);
                                var $others = $(".others-chk input").eq(0);
                                if (getChecked($all)) {
                                    var $grandParent = $(".share-artefact-people-wrapper");
                                    var states = {
                                        comment: getChecked($comment),
                                        others: getChecked($others),
                                        all: getChecked($all)
                                    };

                                    $grandParent.find(".add-comments-chk").each(function () {
                                        setChecked($(this).find("input"), states.comment);
                                    });

                                    $grandParent.find(".others-chk").each(function () {
                                        setChecked($(this).find("input"), states.others);
                                    });

                                    $grandParent.find(".apply-to-all").each(function () {
                                        setChecked($(this).find("input"), states.all);
                                    });
                                }
                            }
                        }
                    });

                    //render all the team members
                    for (var i = 0; i < resp.data.teamMembers.length; i++) {
                        $(".share-artefact-people-wrapper").append(_.template(templates["share-people"])({ data: resp.data.teamMembers[i] }));
                    }

                    attachEvents();
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
                            placeholder: "Choose Project",
                            value: Kenseo.page.data.project && Kenseo.page.data.project.name || ""
                        },
                        insertAfter: function insertAfter($input, $selectedEl, bln) {
                            console.log("project name changed");

                            projectId = $selectedEl.attr("data-id");
                            projectName = $selectedEl.html();

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
                                    // artefactComboboxContainer.innerHTML = "";
                                    artefactCombobox.setSuggestions(response.data);
                                }
                            });
                        }
                    });

                    artefactComboboxContainer = document.querySelector(".artefact-combobox");
                    artefactCombobox = sb.toolbox.applyComboBox({
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

        // pre-populate data
        var data = Kenseo.populate.meeting;
        $('.project-combobox input[type="text"]').val(data.projectName);
        $('.field-section[data-name="meetingArtefact"] input[type="text"]').val(data.artefactName);
        $('.field-section[data-name="agenda"] textarea').val(data.agenda);
        $('.field-section[data-name="date"] .input-meeting-date').val(sb.timeFormat(data.startTime, true));
        $('.field-section[data-name="toTime"] select').val(sb.getHours(data.endTime));
        $('.field-section[data-name="fromTime"] select').val(sb.getHours(data.startTime));
        $('.field-section[data-name="location"] input[type="text"].meeting-location').val(data.venue);
    },
    coverImage: function () {
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
    }
};

// selectedUser = $selectedEl.html()
// Kenseo.popup.data.selectedUsers.push({
//     id: $selectedEl.html(),
//     email: $selectedEl.attr('data-email')
// })
// $('.names-holder').append(" <div class='tag'>" + selectedUser + "<div class='tag-close'></div</div>");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2JhYmVsLWFwcC9jb25maWcvc2FuZGJveC5wb3B1cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxFQUFFLENBQUMsS0FBSyxHQUFHO0FBQ1Asa0JBQWMsRUFBRSxTQUFTLGNBQWMsR0FBRztBQUN0QyxjQUFNLENBQUMsS0FBSyxHQUFHO0FBQ1gsa0JBQU0sRUFBRSxFQUFFO0FBQ1Ysa0JBQU0sRUFBRSxFQUFFO1NBQ2IsQ0FBQztLQUNMO0FBQ0Qsb0JBQWdCLEVBQUUsU0FBUyxnQkFBZ0IsR0FBRztBQUMxQyxVQUFFLENBQUMsU0FBUyxDQUFDO0FBQ1Qsb0JBQVEsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUN0Qix5QkFBYSxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQzlCLEVBQUUsWUFBWTtBQUNYLGNBQUUsQ0FBQyxRQUFRLENBQUM7QUFDUiwwQkFBVSxFQUFFLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7QUFDN0Msb0JBQUksRUFBRTtBQUNGLGdDQUFZLEVBQUUsSUFBSTtpQkFDckI7QUFDRCx1QkFBTyxFQUFFLFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUM1Qix3QkFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwRCxzQkFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7QUFDckIsNEJBQUksRUFBRSxTQUFTO0FBQ2YsNEJBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtBQUNmLGdDQUFRLEVBQUU7QUFDTix1Q0FBVyxFQUFFLGdCQUFnQjt5QkFDaEM7QUFDRCxnQ0FBUSxFQUFFLFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFO0FBQ2xELGdDQUFJLEdBQUcsRUFBRTtBQUNMLGtDQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNwRCxrQ0FBRSxDQUFDLFlBQVksQ0FBQyxX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QUMsQ0FBQyxDQUFDOzs7O0FBQzlCLHlCQUdJOzs7eUJBR0o7aUJBQ0osQ0FBQyxDQUFDO2FBQ047U0FDSixDQUFDLENBQUE7S0FDTDtDQUNKOzs7Ozs7OztBQUFDIiwiZmlsZSI6InNhbmRib3gucG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJzYi5wb3B1cCA9IHtcbiAgICByZXNldFBvcHVwRGF0YTogZnVuY3Rpb24gcmVzZXRQb3B1cERhdGEoKSB7XG4gICAgICAgIEtlbnNlby5wb3B1cCA9IHtcbiAgICAgICAgICAgIFwiaW5mb1wiOiB7fSxcbiAgICAgICAgICAgIFwiZGF0YVwiOiB7fVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0UHJvamVjdHNQb3B1cDogZnVuY3Rpb24gZ2V0UHJvamVjdHNQb3B1cCgpIHtcbiAgICAgICAgc2IubG9hZEZpbGVzKHtcbiAgICAgICAgICAgIFwibW9kZWxzXCI6IFtcIlByb2plY3RzXCJdLFxuICAgICAgICAgICAgXCJjb2xsZWN0aW9uc1wiOiBbXCJQcm9qZWN0c1wiXVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzYi5hamF4Q2FsbCh7XG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbjogbmV3IEtlbnNlby5jb2xsZWN0aW9ucy5Qcm9qZWN0cygpLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlclByb2plY3RzOiB0cnVlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tYm9ib3hcIik7XG4gICAgICAgICAgICAgICAgICAgIHNiLnRvb2xib3guYXBwbHlDb21ib0JveCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtOiBjb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBQcm9qZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmNoYW5nZTogZnVuY3Rpb24gb25jaGFuZ2UoJGlucHV0LCAkc2VsZWN0ZWRFbCwgYmxuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJsbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEoJHNlbGVjdGVkRWwuaHRtbCgpLCBcInByb2plY3RfbmFtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKCRzZWxlY3RlZEVsLmRhdGEoXCJpZFwiKSwgXCJwcm9qZWN0X2lkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLm1haW4tYnRuXCIpLnByb3AoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5tYWluLWJ0blwiKS5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcHVwRGF0YSA9IHNiLmdldFBvcHVwRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9wdXBEYXRhICYmIHBvcHVwRGF0YVtcInByb2plY3RfbmFtZVwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChjb250YWluZXIpLmZpbmQoXCJpbnB1dFwiKS52YWwocG9wdXBEYXRhW1wicHJvamVjdF9uYW1lXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIubWFpbi1idG5cIikucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNyZWF0ZUZpbGVQb3B1cDogZnVuY3Rpb24gY3JlYXRlRmlsZVBvcHVwKCkge1xuICAgICAgICAvLyBpZiAoc2IuZ2V0UG9wdXBEYXRhKFwiZmlsZU5hbWVcIikpIHtcbiAgICAgICAgLy8gICAgICQoXCIuY3JlYXRlLWZpbGUtaXRlbSAubm90aWZpY2F0aW9uLXRpdGxlXCIpLmh0bWwoc2IuZ2V0UG9wdXBEYXRhKFwiZmlsZU5hbWVcIikpO1xuICAgICAgICAvLyAgICAgJChcIi5jcmVhdGUtZmlsZS1pdGVtXCIpLmNzcyh7XG4gICAgICAgIC8vICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwidmlzaWJsZVwiXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gICAgICQoXCIubWFpbi1idG5cIikucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAkKFwiLnVwbG9hZC1maWxlcy1pbnB1dFwiKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJChcIi5jcmVhdGUtZmlsZS1pdGVtXCIpLmNzcyh7XG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwidmlzaWJsZVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIuY3JlYXRlLWZpbGUtaXRlbSAubm90aWZpY2F0aW9uLXRpdGxlXCIpLmh0bWwodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgICAgIHNiLnNldFBvcHVwRGF0YSh0aGlzLmZpbGVzWzBdLCBcImZpbGVcIik7XG4gICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEodGhpcy52YWx1ZSwgXCJmaWxlTmFtZVwiKTtcbiAgICAgICAgICAgIHNiLnNldFBvcHVwRGF0YSh0aGlzLnZhbHVlLCBcImRlc2NyaXB0aW9uXCIpO1xuICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKHRoaXMuZmlsZXNbMF0sIFwiTUlNRXR5cGVcIik7XG4gICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEodGhpcy5maWxlc1swXS5zaXplLCBcInNpemVcIik7XG4gICAgICAgICAgICAvL2lmIHRoaXMgaXMgYW4gYWRkIGFydGVmYWN0IGluIHRoZSBuZXh0IHBvcHVwIGNhbGwgYmFjayBpdCB3aWxsIGJlIHNldCB0YWNjb3JkaW5nbHlcbiAgICAgICAgICAgIC8vZm9yIHJlcGxhY2UgdGhpcyBpcyB0aGUgb25seSBwbGFjZSB3ZSBjYW4gZGVjaWRlIHdoZXRlaGVyIGl0IGlzIGEgcmVwbGFjZSBjYWxsIG9yIG5vdFxuICAgICAgICAgICAgaWYgKHNiLmdldFBvcHVwRGF0YShcImFjdGlvblR5cGVcIikgPT0gXCJyZXBsYWNlQXJ0ZWZhY3RcIikge1xuICAgICAgICAgICAgICAgIHNiLnNldFBvcHVwRGF0YShcInJlcGxhY2VBcnRlZmFjdFwiLCBcImNvbW1hbmRcIik7XG4gICAgICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKFwicmVwbGFjZUFydGVmYWN0RmlsZVwiLCBcImFjdGlvblR5cGVcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNiLmdldFBvcHVwRGF0YShcImFjdGlvblR5cGVcIikgPT0gXCJhZGRBcnRlZmFjdFZlcnNpb25cIikge1xuICAgICAgICAgICAgICAgIHNiLnNldFBvcHVwRGF0YShcImFkZEFydGVmYWN0VmVyc2lvblwiLCBcImNvbW1hbmRcIik7XG4gICAgICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKFwiYWRkQXJ0ZWZhY3RWZXJzaW9uRmlsZVwiLCBcImFjdGlvblR5cGVcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoXCIubWFpbi1idG5cIikucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcblxuICAgICAgICAgICAgJChcIi5jaG9vc2UtZmlsZS1jb21ib2JveCBpbnB1dFwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAkKFwiLmV4aXN0aW5nLWZpbGVzLWNoa1wiKS5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgJChcIi5jcmVhdGUtZmlsZS1jbG9zZS1pY29uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoXCIuY3JlYXRlLWZpbGUtaXRlbVwiKS5jc3Moe1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcImhpZGRlblwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoXCIuY2hvb3NlLWZpbGUtY29tYm9ib3ggaW5wdXRcIikuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICQoXCIubWFpbi1idG5cIikucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKG51bGwsIFwiZmlsZU5hbWVcIik7XG4gICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEobnVsbCwgXCJmaWxlXCIpO1xuICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKG51bGwsIFwiTUlNRVR5cGVcIik7XG4gICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEobnVsbCwgXCJzaXplXCIpO1xuICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKG51bGwsIFwiZGVzY3JpcHRpb25cIik7XG5cbiAgICAgICAgICAgICQoXCIuZXhpc3RpbmctZmlsZXMtY2hrXCIpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAkKFwiLmV4aXN0aW5nLWZpbGVzLWNvbWJvYm94XCIpLmZpbmQoXCIuc3VnZ2VzdGlvbnNDb250YWluZXJcIikuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2IubG9hZEZpbGVzKHtcbiAgICAgICAgICAgIFwiY29sbGVjdGlvbnNcIjogW1wiQXJ0ZWZhY3RzXCJdLFxuICAgICAgICAgICAgXCJtb2RlbHNcIjogW1wiQXJ0ZWZhY3RzXCJdXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNiLmFqYXhDYWxsKHtcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uOiBuZXcgS2Vuc2VvLmNvbGxlY3Rpb25zLkFydGVmYWN0cygpLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdGlkOiBzYi5nZXRQb3B1cERhdGEoXCJwcm9qZWN0X2lkXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpZ25vcmU6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5leGlzdGluZy1maWxlcy1jb21ib2JveFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nQ29tYm9ib3ggPSBzYi50b29sYm94LmFwcGx5Q29tYm9Cb3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbTogY29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgRmlsZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY2hhbmdlOiBmdW5jdGlvbiBvbmNoYW5nZSgkaW5wdXQsICRzZWxlY3RlZEVsLCBibG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmxuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIubWFpbi1idG5cIikucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKCRzZWxlY3RlZEVsLmRhdGEoXCJpZFwiKSwgXCJhcnRlZmFjdF9pZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLm1haW4tYnRuXCIpLnByb3AoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICQoXCIuZXhpc3RpbmctZmlsZXMtY2hrXCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbSA9IGV4aXN0aW5nQ29tYm9ib3guJGVsZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJGVsZW0uZmluZChcImlucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsZW0uZmluZChcIi5zdWdnZXN0aW9uc0NvbnRhaW5lclwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGVzID0gJGVsZW0uZmluZChcIi5zZWxlY3RhYmxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRzZWxlY3RhYmxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucHJvcChcImRpc2FibGVkXCIsICF0aGlzLmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC52YWwoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY2hvb3NlRmlsZUNvbWJvYm94ID0gc2IudG9vbGJveC5hcHBseUNvbWJvQm94KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW06IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hvb3NlLWZpbGUtY29tYm9ib3hcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBcIkNob29zZSBGaWxlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb25jaGFuZ2U6IGZ1bmN0aW9uIG9uY2hhbmdlKCRpbnB1dCwgJHNlbGVjdGVkRWwsIGJsbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChibG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKCRzZWxlY3RlZEVsLmRhdGEoXCJpZFwiKSwgXCJhcnRlZmFjdF9pZFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdHRycyA9ICRzZWxlY3RlZEVsWzBdLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdHRyID0gYXR0cnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ci5uYW1lLmluZGV4T2YoXCJkYXRhLVwiKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2F0dHIubmFtZS5zdWJzdHIoNSldID0gYXR0ci52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubmFtZSA9ICRzZWxlY3RlZEVsLmh0bWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmNob29zZS1leGlzdGluZy1maWxlLWhvbGRlclwiKS5odG1sKF8udGVtcGxhdGUodGVtcGxhdGVzW1wibmV3LWZpbGVcIl0pKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG9ialxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5jaG9vc2UtZXhpc3RpbmctZmlsZS1ob2xkZXIgLmNsb3NlLWljb25cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5jaG9vc2UtZXhpc3RpbmctZmlsZS1ob2xkZXJcIikuaHRtbChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnVwbG9hZC1maWxlcy1pbnB1dFwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5leGlzdGluZy1maWxlcy1jaGtcIikuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5tYWluLWJ0blwiKS5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudmFsKFwiXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIudXBsb2FkLWZpbGVzLWlucHV0XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5leGlzdGluZy1maWxlcy1jaGtcIikuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5tYWluLWJ0blwiKS5wcm9wKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIubWFpbi1idG5cIikucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRBZnRlcjogZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIoJGlucHV0LCAkc2VsZWN0ZWRFbCwgYmxuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJChcIi5leGlzdGluZy1maWxlcy1jaGtcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbSA9IGNob29zZUZpbGVDb21ib2JveC4kZWxlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkZWxlbS5maW5kKFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHNlbGVjdGFibGVzID0gJGVsZW0uZmluZChcIi5zZWxlY3RhYmxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRzZWxlY3RhYmxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucHJvcChcImRpc2FibGVkXCIsICF0aGlzLmNoZWNrZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbnB1dC52YWwoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB0ZWFtUG9wdXA6IGZ1bmN0aW9uIHRlYW1Qb3B1cCgpIHtcbiAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKFwiYWRkQXJ0ZWZhY3RcIiwgXCJhY3Rpb25UeXBlXCIpO1xuICAgICAgICBzYi5zZXRQb3B1cERhdGEoXCJhZGRBcnRlZmFjdFwiLCBcImNvbW1hbmRcIik7XG4gICAgICAgIHNiLnNldFBvcHVwRGF0YShmYWxzZSwgXCJzaGFyZVwiKTtcbiAgICAgICAgc2IubG9hZEZpbGVzKHtcbiAgICAgICAgICAgIFwiY29sbGVjdGlvbnNcIjogW1wiQXJ0ZWZhY3RzXCIsIFwiVGFnc1wiXSxcbiAgICAgICAgICAgIFwibW9kZWxzXCI6IFtcIkFydGVmYWN0c1wiXVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBUYWdzIGxpc3RpbmdcbiAgICAgICAgICAgIHNiLmFqYXhDYWxsKHtcbiAgICAgICAgICAgICAgICBcImNvbGxlY3Rpb25cIjogbmV3IEtlbnNlby5jb2xsZWN0aW9ucy5BcnRlZmFjdHMoKSxcbiAgICAgICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2VzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpZ25vcmU6IDAsXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3RpZDogc2IuZ2V0UG9wdXBEYXRhKFwicHJvamVjdF9pZFwiKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlZmVyZW5jZS1jb21ib2JveFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbWJvYm94ID0gc2IudG9vbGJveC5hcHBseUNvbWJvQm94KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW06IGNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlTZWxlY3Q6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saW5rcy1jb21ib2JveFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmtzQ29tYm9ib3ggPSBuZXcgc2IudG9vbGJveC5hcHBseUNvbWJvQm94KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW06IGxpbmtzLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2IuYWpheENhbGwoe1xuICAgICAgICAgICAgICAgIFwiY29sbGVjdGlvblwiOiBuZXcgS2Vuc2VvLmNvbGxlY3Rpb25zLlRhZ3MoKSxcbiAgICAgICAgICAgICAgICBcImRhdGFcIjoge30sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhZ3MtY29tYm9ib3hcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21ib2JveCA9IHNiLnRvb2xib3guYXBwbHlDb21ib0JveCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtOiBjb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNoYXJlV2l0aFBlb3BsZVBvcHVwOiBmdW5jdGlvbiBzaGFyZVdpdGhQZW9wbGVQb3B1cCgpIHtcbiAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKHRydWUsIFwic2hhcmVcIik7XG4gICAgICAgIC8vbm93IHlvdSBuZWVkIDIgc2V0cyBvZiBwZW9wbGUsIHBlb3BsZSB0aG9zZSB3aG8gYXJlIGFybGVhZHkgaW4gdGhlIHByb2plY3QgYW5kIGFsbCB0aGUgcmVtYWluaW5nIHBlb3BsZVxuXG4gICAgICAgIHNiLmxvYWRGaWxlcyh7XG4gICAgICAgICAgICBcImNvbGxlY3Rpb25zXCI6IFtcIlBlb3BsZVwiXSxcbiAgICAgICAgICAgIFwibW9kZWxzXCI6IFtcIlBlb3BsZVwiXVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRDaGVja2VkKCRlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkZWwuYXR0cihcImNoZWNrZWRcIikgPT09IFwiY2hlY2tlZFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0Q2hlY2tlZCgkZWwsIGJsbikge1xuICAgICAgICAgICAgICAgICRlbC5hdHRyKFwiY2hlY2tlZFwiLCBibG4pO1xuICAgICAgICAgICAgICAgICRlbFswXS5jaGVja2VkID0gYmxuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gYXR0YWNoRXZlbnRzKCkge1xuICAgICAgICAgICAgICAgICQoXCIuYXBwbHktdG8tYWxsXCIpLm9mZihcImNoYW5nZVwiKTtcbiAgICAgICAgICAgICAgICAkKFwiLmFkZC1jb21tZW50cy1jaGsgaW5wdXRcIikub2ZmKFwiY2xpY2tcIik7XG4gICAgICAgICAgICAgICAgJChcIi5vdGhlcnMtY2hrIGlucHV0IGlucHV0XCIpLm9mZihcImNsaWNrXCIpO1xuICAgICAgICAgICAgICAgICQoXCIuYXBwbHktdG8tYWxsXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRwYXJlbnQgPSAkc2VsZi5wYXJlbnRzKFwiLnNoYXJlLWFydGVmYWN0LXBlb3BsZS1pdGVtLXNlY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkZ3JhbmRQYXJlbnQgPSAkc2VsZi5wYXJlbnRzKFwiLnNoYXJlLWFydGVmYWN0LXBlb3BsZS13cmFwcGVyXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGVzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudDogZ2V0Q2hlY2tlZCgkcGFyZW50LmZpbmQoXCIuYWRkLWNvbW1lbnRzLWNoayBpbnB1dFwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnM6IGdldENoZWNrZWQoJHBhcmVudC5maW5kKFwiLm90aGVycy1jaGsgaW5wdXRcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsOiAhZ2V0Q2hlY2tlZCgkc2VsZi5maW5kKFwiaW5wdXRcIikpXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgJGdyYW5kUGFyZW50LmZpbmQoXCIuYWRkLWNvbW1lbnRzLWNoa1wiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENoZWNrZWQoJCh0aGlzKS5maW5kKFwiaW5wdXRcIiksIHN0YXRlcy5jb21tZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGdyYW5kUGFyZW50LmZpbmQoXCIub3RoZXJzLWNoa1wiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENoZWNrZWQoJCh0aGlzKS5maW5kKFwiaW5wdXRcIiksIHN0YXRlcy5vdGhlcnMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkZ3JhbmRQYXJlbnQuZmluZChcIi5hcHBseS10by1hbGxcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDaGVja2VkKCQodGhpcykuZmluZChcImlucHV0XCIpLCBzdGF0ZXMuYWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJChcIi5hZGQtY29tbWVudHMtY2hrIGlucHV0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHBhcmVudCA9ICRzZWxmLnBhcmVudHMoXCIuc2hhcmUtYXJ0ZWZhY3QtcGVvcGxlLWl0ZW0tc2VjdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRncmFuZFBhcmVudCA9ICRzZWxmLnBhcmVudHMoXCIuc2hhcmUtYXJ0ZWZhY3QtcGVvcGxlLXdyYXBwZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzQ2hrID0gIWdldENoZWNrZWQoJHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWxsQ2hrID0gZ2V0Q2hlY2tlZCgkcGFyZW50LmZpbmQoXCIuYXBwbHktdG8tYWxsIGlucHV0XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbENoaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGdyYW5kUGFyZW50LmZpbmQoXCIuYWRkLWNvbW1lbnRzLWNoa1wiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDaGVja2VkKCQodGhpcykuZmluZChcImlucHV0XCIpLCB0aGlzQ2hrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q2hlY2tlZCgkKHRoaXMpLCB0aGlzQ2hrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJChcIi5vdGhlcnMtY2hrIGlucHV0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgJHBhcmVudCA9ICRzZWxmLnBhcmVudHMoXCIuc2hhcmUtYXJ0ZWZhY3QtcGVvcGxlLWl0ZW0tc2VjdGlvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRncmFuZFBhcmVudCA9ICRzZWxmLnBhcmVudHMoXCIuc2hhcmUtYXJ0ZWZhY3QtcGVvcGxlLXdyYXBwZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzQ2hrID0gIWdldENoZWNrZWQoJHNlbGYpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWxsQ2hrID0gZ2V0Q2hlY2tlZCgkcGFyZW50LmZpbmQoXCIuYXBwbHktdG8tYWxsIGlucHV0XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbENoaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGdyYW5kUGFyZW50LmZpbmQoXCIub3RoZXJzLWNoa1wiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDaGVja2VkKCQodGhpcykuZmluZChcImlucHV0XCIpLCB0aGlzQ2hrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q2hlY2tlZCgkKHRoaXMpLCB0aGlzQ2hrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2IuYWpheENhbGwoe1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb246IG5ldyBLZW5zZW8uY29sbGVjdGlvbnMuUGVvcGxlKCksXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBcImFsbFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBcInByb2plY3RJZFwiOiBzYi5nZXRQb3B1cERhdGEoXCJwcm9qZWN0X2lkXCIpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3ApIHtcbiAgICAgICAgICAgICAgICAgICAgLy9yZWRlciBhbGwgdGhlIG90aGVycyBpbiBhIENPTUJPXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcC5kYXRhLm90aGVyTWVtYmVycztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGVvcGxlLWNvbWJvYm94XCIpO1xuICAgICAgICAgICAgICAgICAgICBzYi50b29sYm94LmFwcGx5Q29tYm9Cb3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbTogY29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IFwiVHlwZSBtYWlsIElEIG9yIHVzZXJuYW1lIGFuZCBwcmVzcyBlbnRlciBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY2hhbmdlOiBmdW5jdGlvbiBvbmNoYW5nZSgkaW5wdXQsICRzZWxlY3RlZEVsLCBibG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmxuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHJzID0gJHNlbGVjdGVkRWxbMF0uYXR0cmlidXRlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdHRyLm5hbWUuaW5kZXhPZihcImRhdGEtXCIpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbYXR0ci5uYW1lLnN1YnN0cig1KV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5uYW1lID0gJHNlbGVjdGVkRWwuaHRtbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNoYXJlLWFydGVmYWN0LXBlb3BsZS13cmFwcGVyXCIpLmFwcGVuZChfLnRlbXBsYXRlKHRlbXBsYXRlc1tcInNoYXJlLXBlb3BsZVwiXSkoeyBkYXRhOiBvYmogfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2hFdmVudHMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXR0aW5nIHRoZSBkZWZhdWx0IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGFsbCA9ICQoXCIuYXBwbHktdG8tYWxsIGlucHV0XCIpLmVxKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGNvbW1lbnQgPSAkKFwiLmFkZC1jb21tZW50cy1jaGsgaW5wdXRcIikuZXEoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkb3RoZXJzID0gJChcIi5vdGhlcnMtY2hrIGlucHV0XCIpLmVxKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0Q2hlY2tlZCgkYWxsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRncmFuZFBhcmVudCA9ICQoXCIuc2hhcmUtYXJ0ZWZhY3QtcGVvcGxlLXdyYXBwZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGVzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQ6IGdldENoZWNrZWQoJGNvbW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyczogZ2V0Q2hlY2tlZCgkb3RoZXJzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGw6IGdldENoZWNrZWQoJGFsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRncmFuZFBhcmVudC5maW5kKFwiLmFkZC1jb21tZW50cy1jaGtcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q2hlY2tlZCgkKHRoaXMpLmZpbmQoXCJpbnB1dFwiKSwgc3RhdGVzLmNvbW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRncmFuZFBhcmVudC5maW5kKFwiLm90aGVycy1jaGtcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q2hlY2tlZCgkKHRoaXMpLmZpbmQoXCJpbnB1dFwiKSwgc3RhdGVzLm90aGVycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGdyYW5kUGFyZW50LmZpbmQoXCIuYXBwbHktdG8tYWxsXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENoZWNrZWQoJCh0aGlzKS5maW5kKFwiaW5wdXRcIiksIHN0YXRlcy5hbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vcmVuZGVyIGFsbCB0aGUgdGVhbSBtZW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzcC5kYXRhLnRlYW1NZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnNoYXJlLWFydGVmYWN0LXBlb3BsZS13cmFwcGVyXCIpLmFwcGVuZChfLnRlbXBsYXRlKHRlbXBsYXRlc1tcInNoYXJlLXBlb3BsZVwiXSkoeyBkYXRhOiByZXNwLmRhdGEudGVhbU1lbWJlcnNbaV0gfSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoRXZlbnRzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVwbGFjZUFydGVmYWN0OiBmdW5jdGlvbiByZXBsYWNlQXJ0ZWZhY3QoKSB7XG4gICAgICAgIHNiLnNldFBvcHVwRGF0YShcInJlcGxhY2VBcnRlZmFjdFwiLCBcImFjdGlvblR5cGVcIik7XG4gICAgICAgIHNiLnNldFBvcHVwRGF0YShcInJlcGxhY2VBcnRlZmFjdFwiLCBcImNvbW1hbmRcIik7XG5cbiAgICAgICAgaWYgKHNiLmdldFBvcHVwRGF0YShcImZpbGVOYW1lXCIpKSB7XG4gICAgICAgICAgICAkKFwiLmNyZWF0ZS1maWxlLWl0ZW0gLm5vdGlmaWNhdGlvbi10aXRsZVwiKS5odG1sKHNiLmdldFBvcHVwRGF0YShcImZpbGVOYW1lXCIpKTtcbiAgICAgICAgICAgICQoXCIuY3JlYXRlLWZpbGUtaXRlbVwiKS5jc3Moe1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiLm1haW4tYnRuXCIpLnByb3AoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgJChcIi51cGxvYWQtZmlsZXMtaW5wdXRcIikuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoXCIuY3JlYXRlLWZpbGUtaXRlbVwiKS5jc3Moe1xuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiLmNyZWF0ZS1maWxlLWl0ZW0gLm5vdGlmaWNhdGlvbi10aXRsZVwiKS5odG1sKHRoaXMudmFsdWUpO1xuXG4gICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEodGhpcy5maWxlc1swXSwgXCJmaWxlXCIpO1xuICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKHRoaXMudmFsdWUsIFwiZmlsZU5hbWVcIik7XG4gICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEodGhpcy52YWx1ZSwgXCJkZXNjcmlwdGlvblwiKTtcbiAgICAgICAgICAgIHNiLnNldFBvcHVwRGF0YSh0aGlzLmZpbGVzWzBdLCBcIk1JTUV0eXBlXCIpO1xuICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKHRoaXMuZmlsZXNbMF0uc2l6ZSwgXCJzaXplXCIpO1xuXG4gICAgICAgICAgICAkKFwiLm1haW4tYnRuXCIpLnByb3AoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoXCIuY3JlYXRlLWZpbGUtY2xvc2UtaWNvblwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKFwiLmNyZWF0ZS1maWxlLWl0ZW1cIikuY3NzKHtcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJoaWRkZW5cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKFwiLm1haW4tYnRuXCIpLnByb3AoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgIHNiLnNldFBvcHVwRGF0YShudWxsLCBcImZpbGVOYW1lXCIpO1xuICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKG51bGwsIFwiZmlsZVwiKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBtZWV0aW5nSXZpdGU6IGZ1bmN0aW9uIG1lZXRpbmdJdml0ZSgpIHtcbiAgICAgICAgc2IubG9hZEZpbGVzKHtcbiAgICAgICAgICAgIFwibW9kZWxzXCI6IFtcIlByb2plY3RzXCIsIFwiQXJ0ZWZhY3RzXCIsIFwiUGVvcGxlXCJdLFxuICAgICAgICAgICAgXCJjb2xsZWN0aW9uc1wiOiBbXCJQcm9qZWN0c1wiLCBcIkFydGVmYWN0c1wiLCBcIlBlb3BsZVwiXVxuICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzYi5hamF4Q2FsbCh7XG4gICAgICAgICAgICAgICAgXCJjb2xsZWN0aW9uXCI6IG5ldyBLZW5zZW8uY29sbGVjdGlvbnMuUHJvamVjdHMoKSxcbiAgICAgICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgICAgICB1c2VyUHJvamVjdHM6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWNvbWJvYm94XCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29tYm9ib3ggPSBzYi50b29sYm94LmFwcGx5Q29tYm9Cb3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbTogY29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgUHJvamVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBLZW5zZW8ucGFnZS5kYXRhLnByb2plY3QgJiYgS2Vuc2VvLnBhZ2UuZGF0YS5wcm9qZWN0Lm5hbWUgfHwgXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydEFmdGVyOiBmdW5jdGlvbiBpbnNlcnRBZnRlcigkaW5wdXQsICRzZWxlY3RlZEVsLCBibG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInByb2plY3QgbmFtZSBjaGFuZ2VkXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdElkID0gJHNlbGVjdGVkRWwuYXR0cihcImRhdGEtaWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdE5hbWUgPSAkc2VsZWN0ZWRFbC5odG1sKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEocHJvamVjdElkLCBcInByb2plY3RJZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEodGhpcy5pbm5lclRleHQsIFwicHJvamVjdE5hbWVcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEoW10sIFwic2VsZWN0ZWRVc2Vyc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3cgc2V0IHRoZSBwcm9qZWN0IHBlb3BsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNiLmFqYXhDYWxsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xsZWN0aW9uXCI6IG5ldyBLZW5zZW8uY29sbGVjdGlvbnMuUGVvcGxlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0SWQ6IHByb2plY3RJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1Y2Nlc3NcIjogZnVuY3Rpb24gc3VjY2VzcyhkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGVvcGxlSG9sZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wZW9wbGUtbmFtZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21ib2JveCA9IHNiLnRvb2xib3guYXBwbHlDb21ib0JveCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbTogcGVvcGxlSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlTZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zVmlld2VyQWxpZ246IFwidG9wXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vcGxhY2Vob2xkZXI6IFwiIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRBZnRlcjogZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIoJGlucHV0LCAkc2VsZWN0ZWRFbCwgYmxuKSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5hamF4Q2FsbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sbGVjdGlvblwiOiBuZXcgS2Vuc2VvLmNvbGxlY3Rpb25zLkFydGVmYWN0cygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0X2lkOiBwcm9qZWN0SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0Qnk6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNoYXJlUGVybWlzc2lvbjogXCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWNjZXNzXCI6IGZ1bmN0aW9uIHN1Y2Nlc3MocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFydGVmYWN0Q29tYm9ib3hDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFydGVmYWN0Q29tYm9ib3guc2V0U3VnZ2VzdGlvbnMocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYXJ0ZWZhY3RDb21ib2JveENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXJ0ZWZhY3QtY29tYm9ib3hcIik7XG4gICAgICAgICAgICAgICAgICAgIGFydGVmYWN0Q29tYm9ib3ggPSBzYi50b29sYm94LmFwcGx5Q29tYm9Cb3goe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbTogYXJ0ZWZhY3RDb21ib2JveENvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJDaG9vc2UgQXJ0ZWZhY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogS2Vuc2VvLnBhZ2UuZGF0YS5hcnRlZmFjdCAmJiBLZW5zZW8ucGFnZS5kYXRhLmFydGVmYWN0Lm5hbWUgfHwgXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJChcIi5pbnB1dC1tZWV0aW5nLWRhdGVcIikuWmVicmFfRGF0ZVBpY2tlcih7XG4gICAgICAgICAgICAgICAgZGVmYXVsdF9wb3NpdGlvbjogXCJiZWxvd1wiLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogXCJNIGQsIFlcIixcbiAgICAgICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24gb25TZWxlY3QoZGlzcGxheSwgZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoYW5nZWQgc29tZXRoaW5nXCIpO1xuICAgICAgICAgICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEoZGF0ZSwgXCJkYXRlXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmRhdGVwaWNrZXItaWNvbi1ob2xkZXJcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IGRlZmF1bHQgYWN0aW9uIG9uIGJ1dHRvbiAoaWYgYW55KVxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCByZWZlcmVuY2UgdG8gdGhlIHBsdWdpblxuICAgICAgICAgICAgICAgIHZhciBwbHVnaW4gPSAkKFwiLmlucHV0LW1lZXRpbmctZGF0ZVwiKS5kYXRhKFwiWmVicmFfRGF0ZVBpY2tlclwiKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBkYXRlcGlja2VyIGlzIG5vdCBhbHJlYWR5IHZpc2libGVcbiAgICAgICAgICAgICAgICBpZiAoISQodGhpcykuZGF0YShcImRwX3Zpc2libGVcIikpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgYSBmbGFnIHRoYXQgdGhlIGRhdGVwaWNrZXIgaXMgdmlzaWJsZVxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoXCJkcF92aXNpYmxlXCIsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3cgdGhlIGRhdGVwaWNrZXJcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luLnNob3coKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBkYXRlcGlja2VyIGlzIGFscmVhZHkgdmlzaXNibGVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldCBhIGZsYWcgdGhhdCB0aGUgZGF0ZXBpY2tlciBpcyBub3QgdmlzaWJsZVxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRhdGEoXCJkcF92aXNpYmxlXCIsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBoaWRlIHRoZSBkYXRlcGlja2VyXG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy9vbmNoYW5nZSBldmVudCB0byBmcm9tdGltZSBkcm9wZG93blxuICAgICAgICAkKCcucHJvamVjdHMtZHJvcGRvd24uZnJvbVRpbWUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oeCwgeSwgeil7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgICAgIHZhciBpbmRleCA9IG9wdGlvbnMuc2VsZWN0ZWRJbmRleDtcblxuICAgICAgICAgICAgLy8gcmVzZXR0aW5nIGh0bWwgb2YgdG9UaW1lIGZpZWxkXG4gICAgICAgICAgICB2YXIgdG9UaW1lRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtZHJvcGRvd24udG9UaW1lJyk7XG4gICAgICAgICAgICB0b1RpbWVGaWVsZC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgICAgICBmb3IodmFyIGkgPSBpbmRleCArIDE7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICB0b1RpbWVGaWVsZC5pbm5lckhUTUwgPSB0b1RpbWVGaWVsZC5pbm5lckhUTUwgKyBvcHRpb25zW2ldLm91dGVySFRNTDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcHJlLXBvcHVsYXRlIGRhdGFcbiAgICAgICAgdmFyIGRhdGEgPSBLZW5zZW8ucG9wdWxhdGUubWVldGluZztcbiAgICAgICAgJCgnLnByb2plY3QtY29tYm9ib3ggaW5wdXRbdHlwZT1cInRleHRcIl0nKS52YWwoZGF0YS5wcm9qZWN0TmFtZSk7XG4gICAgICAgICQoJy5maWVsZC1zZWN0aW9uW2RhdGEtbmFtZT1cIm1lZXRpbmdBcnRlZmFjdFwiXSBpbnB1dFt0eXBlPVwidGV4dFwiXScpLnZhbChkYXRhLmFydGVmYWN0TmFtZSk7XG4gICAgICAgICQoJy5maWVsZC1zZWN0aW9uW2RhdGEtbmFtZT1cImFnZW5kYVwiXSB0ZXh0YXJlYScpLnZhbChkYXRhLmFnZW5kYSk7XG4gICAgICAgICQoJy5maWVsZC1zZWN0aW9uW2RhdGEtbmFtZT1cImRhdGVcIl0gLmlucHV0LW1lZXRpbmctZGF0ZScpLnZhbChzYi50aW1lRm9ybWF0KGRhdGEuc3RhcnRUaW1lLHRydWUpKTtcbiAgICAgICAgJCgnLmZpZWxkLXNlY3Rpb25bZGF0YS1uYW1lPVwidG9UaW1lXCJdIHNlbGVjdCcpLnZhbChzYi5nZXRIb3VycyhkYXRhLmVuZFRpbWUpKTtcbiAgICAgICAgJCgnLmZpZWxkLXNlY3Rpb25bZGF0YS1uYW1lPVwiZnJvbVRpbWVcIl0gc2VsZWN0JykudmFsKHNiLmdldEhvdXJzKGRhdGEuc3RhcnRUaW1lKSk7XG4gICAgICAgICQoJy5maWVsZC1zZWN0aW9uW2RhdGEtbmFtZT1cImxvY2F0aW9uXCJdIGlucHV0W3R5cGU9XCJ0ZXh0XCJdLm1lZXRpbmctbG9jYXRpb24nKS52YWwoZGF0YS52ZW51ZSk7XG4gICAgfSxcbiAgICBjb3ZlckltYWdlOiBmdW5jdGlvbigpe1xuICAgICAgICBzYi5sb2FkRmlsZXMoe1xuICAgICAgICAgICAgJ2ZpbGVzJzogWydqcy9hcHAvY29tcG9uZW50cy9jdXN0b20tcGFubmluZy5qcyddXG4gICAgICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgJGNvdmVySW1hZ2VJbnB1dCA9ICQoJy5pbWFnZS1jb3Zlci1zZWN0aW9uIC51cGxvYWQtZmlsZXMtaW5wdXQnKTtcbiAgICAgICAgICAgIGlmKCRjb3ZlckltYWdlSW5wdXQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAkY292ZXJJbWFnZUlucHV0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcih0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gTGluazogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzgxNDI4NS8xNTc3Mzk2XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWxlcyA9IHRoaXMuZmlsZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRmlsZVJlYWRlciBzdXBwb3J0XG4gICAgICAgICAgICAgICAgICAgIGlmIChGaWxlUmVhZGVyICYmIGZpbGVzICYmIGZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvdXRJbWFnZSkuc3JjID0gZnIucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb3Zlci1pbWFnZS12aWV3ZXIgLmltZy1jb250ZW50JykuYXR0cihcInNyY1wiLCBmci5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jb3Zlci1pbWFnZS12aWV3ZXInKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmltYWdlLWNvdmVyLXNlY3Rpb24nKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGFubmluZ0RpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZyLnJlYWRBc0RhdGFVUkwoZmlsZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTm90IHN1cHBvcnRlZFxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhbGxiYWNrIC0tIHBlcmhhcHMgc3VibWl0IHRoZSBpbnB1dCB0byBhbiBpZnJhbWUgYW5kIHRlbXBvcmFyaWx5IHN0b3JlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGVtIG9uIHRoZSBzZXJ2ZXIgdW50aWwgdGhlIHVzZXIncyBzZXNzaW9uIGVuZHMuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59O1xuXG4vLyBzZWxlY3RlZFVzZXIgPSAkc2VsZWN0ZWRFbC5odG1sKClcbi8vIEtlbnNlby5wb3B1cC5kYXRhLnNlbGVjdGVkVXNlcnMucHVzaCh7XG4vLyAgICAgaWQ6ICRzZWxlY3RlZEVsLmh0bWwoKSxcbi8vICAgICBlbWFpbDogJHNlbGVjdGVkRWwuYXR0cignZGF0YS1lbWFpbCcpXG4vLyB9KVxuLy8gJCgnLm5hbWVzLWhvbGRlcicpLmFwcGVuZChcIiA8ZGl2IGNsYXNzPSd0YWcnPlwiICsgc2VsZWN0ZWRVc2VyICsgXCI8ZGl2IGNsYXNzPSd0YWctY2xvc2UnPjwvZGl2PC9kaXY+XCIpOyJdfQ==