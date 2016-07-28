/*
 * This library holds the methods which are commonly used in many functionalities
 */
var sb = _.extend(sb, (function () {
    return {
        log: function log(msg) {
            console.log(msg);
        },
        //unused function
        loadCalls: function(arrayOfAjaxCalls, callbackfunction){
            var filterArrayOfAjaxCalls = arrayOfAjaxCalls.filter(function(item){
                return !item.exprCondition;
            }).map(function(x){
                return x.ajax;
            });
            $.when.apply(filterArrayOfAjaxCalls).then(callbackfunction);
        },
        attach: function($element, eventName, func){
            //@TODO: off is not unbinding the events
            $element.off(eventName, func)
                .on(eventName, func);
        },
        attachIn: function(eventName, selector, func, $inElement){
            if(!$inElement) $inElement = $(document.body);

            // @TODO: off is not unbinding the events
            $inElement.off(eventName, selector, func);
            $inElement.on(eventName, selector, func);
        },
        subscribe: function(element, eventType, callbackFunc){
            // reset / remove the event if it is from before
            element.off(eventType);

            // register the event
            element.on(eventType, callbackFunc);
        },
        trigger: function(triggerElement, triggerEventType, targetEventObject){
            // sb.attach(element, eventType, function(e){
                triggerElement.trigger(triggerEventType, targetEventObject);
            // });
        },
        redirectTo: function(value){
            var a = document.createElement('a');
            a.href = value;
            window.location.href = a.href;
        },
        //unused function
        getPath: function getPath(type, fileName) {
            var o = i18n[type];
            if (!o) {
                sb.log('getPath: getPath type is invalid');
            }
            var k = o[fileName];
            if (!k) {
                sb.log('getPath: fileName is invalid');
            }
            return k;
        },
        //@TODO: To be implemented
        viewPortSwitch: function viewPortSwitch(callBackFunc) {
            var ua = navigator.userAgent || navigator.vendor || window.opera;
            var production = false;
            var filesToLoad;
            // Mobile/Tablet Logic
            if (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/.test(ua)) {
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
                    'js': {
                        // 'files': ['js/app/config/sandbox.postcall.js']
                    }
                };
            }
            //loading the files depending on viewport
            sb.loadFiles(filesToLoad.js, callBackFunc);
        },
        //loading the svg files
        svgLoader: function(svgs){
            //setting the unloaded svgs
            svgs = _.difference(svgs, Kenseo.alreadyLoadedSVGs);
            for(var i = 0; i < svgs.length; i++){
        		var scripts = document.getElementsByTagName('script')
        		var script = scripts[scripts.length - 1]
        		var xhr = new XMLHttpRequest()
        		xhr.onload = function (response) {
        			// If success
        			// srcElement is for chrome and IE
        			// originalTarget is for Firefox
        			var target = response.srcElement || response.originalTarget;
        			var statusText = target.statusText.toLowerCase();
        			// If success
        			// statusText will not be "ok" but empty string in ios safari.
        			if(statusText == "ok" || statusText == "" ){
             			var div = document.createElement('div')
             			div.innerHTML = this.responseText
             			div.style.display = 'none'
             			script.parentNode.insertBefore(div, script)
        			}
           		}
           		xhr.open('get', 'assets/imgs/'+ svgs[i] +'.svg', true)
           		xhr.send()
        	}
            //storing the loaded svgs
            Kenseo.alreadyLoadedSVGs = _.union(Kenseo.alreadyLoadedSVGs, svgs);
        },
        //checking for attributes in provided element
        loopAttributes: function(el, filter, callback){
            var attributes = el.attributes;
            if(!filter) filter = "";
            for(var j = 0, jlen = attributes.length; j < jlen; j++){
                var attribute = attributes[j];
                var attributeKey = attribute.name;
                var attributeValue = attribute.value;
                if(attributeKey.indexOf(filter) > -1){
                    callback(attributeKey.substr(filter.length), attributeValue);
                }
            }
        },
        //check whether class is available in currentelement or in child elements
        //@TODO:change name of function
        hasInheritClass: function($target, classes){
            for(var i = 0, len = classes.length; i < len; i++){
                var currentClass = classes[i];
                if($target.hasClass(currentClass)){
                    // A match is found
                    return true;
                }
                if($target.parents('.' + currentClass).length){
                    // A match is found
                    return true;
                }
            }
            // No match found
            return false;
        },
        //unused funtion
        // renderXTemplate: function renderXTemplate(_this, payload) {
        //     // debugger;
        //     payload = payload || {};
        //     var colStr = _this.colStr;
        //     var data = _this.data;
        //     if (colStr) {
        //         var collection = new Kenseo.collections[colStr]();
        //         sb.fetch(collection, data, function (collection, response, options) {
        //             // _.each(x.data, _this.renderArtefact);
        //             if (!payload.excludeDump) {
        //                 sb.setDump(response);
        //             }
        //             if (_this.preLoader) {
        //                 _this.preLoader(response);
        //             }
        //             if(_this.stopRenderX){
        //                 return;
        //             }
        //
        //             var data = response.data;
        //             var el = $(_this.el);
        //             if (!el || !el.length) {
        //                 el = $(_this.$el);
        //             }
        //
        //             if (data.length > 0) {
        //                 var c = new Kenseo.collections[colStr](data);
        //                 c.each(function (item) {
        //                     var artefact = _this.itemView({
        //                         model: item
        //                     });
        //                     el.append(artefact.render().$el);
        //                 });
        //             } else {
        //                 el.html(sb.noItemsTemplate(payload));
        //             }
        //         });
        //     }
        // },

        //unused funtion
        noItemsTemplate: function noItemsTemplate(p) {
            return sb.setTemplate('no-items', {
                data: p.noData || {}
            });
        },
        getCommentThreadDumpObject: function($el){
            var els = $el.find('*');
            els.push($el.get(0));
            var obj = {};
            Array.prototype.forEach.call(els, function(el){
                var attributes = el.attributes;
                Array.prototype.forEach.call(attributes, function(attr){
                    var nodeName = attr.nodeName;
                    if(nodeName.indexOf("data-k-") > -1){
                        obj[attr.nodeName.substr(7)] = attr.nodeValue;
                    }
                });
            });
            var $text = $el.find('.write-comment');
            obj.description = $text.val();
            return obj;
        },
        //returning the template required
        setTemplate: function(str, data){
            data = data || {};
            return _.template(templates[str](data))();
        },
        //returns the popups data
        getPopupsInfo: function getPopupsInfo(info) {
            return Kenseo.popups.getPopupsInfo(info);
        },
        //returns the overlays data
        getOverlaysInfo: function getOverlaysInfo(info) {
            return Kenseo.overlays.getOverlaysInfo(info);
        },
        //unused function
        getDynamicData: function getDynamicData(str, id) {
            var key = Kenseo.data[str];
            if (key) {
                return key[id];
            } else {
                sb.log('provide valid key id pair');
            }
        },
        setTitle: function(str){
            var $title = $('title');
            $title.html('Kenseo - ' + str);
        },
        //storing the page data
        setPageData: function setPageData(value, key) {
            if (key) {
                Kenseo.page.data[key] = value;
            } else {
                Kenseo.page.data = value;
            }
        },
        //retrieving the page information
        getPageData: function getPageData(key) {
            if (key) {
                return Kenseo.page.data[key];
            } else {
                return Kenseo.page.data;
            }
        },
        //retrieving the popup data
        getPopupData: function getPopupData(key) {
            if (key) {
                return Kenseo.popup.data[key];
            } else {
                return Kenseo.popup.data;
            }
        },
        //storing popup information
        setPopupData: function setPopupData(value, key) {
            if (key) {
                Kenseo.popup.data[key] = value;
            } else {
                Kenseo.popup.data = value;
            }
        },
        //retrieving the id of artefact
        getVersionIdFromMaskedId: function(maskedId){
            if(!Kenseo.data.ma){
                Kenseo.data.ma = {};
            }
            return Kenseo.data.ma[maskedId];
        },
        //storing the id of artefact
        setVersionIdForMaskedId: function(maskedId, versionId){
            if(!Kenseo.data.ma){
                Kenseo.data.ma = {};
            }
            Kenseo.data.ma[maskedId] = versionId;
        },
        //retrieving the accesstype
        getAccessType: function(value){
            var accessType = Kenseo.settings.accesstype;
            for(var key in accessType){
                if(accessType[key] == value){
                    return key;
                }
            }
            return false;
        },
        insertPopupData: function($elem) {
            var key = $elem.data('key');
            var id = $elem.data('id');
            // If id is undefined, Get other data attributes which are ending with "id"

            if(key && id){
                Kenseo.popup.data = _.cloneDeep(Kenseo.data[key][id]);
            } else{
                sb.log("data-holder class is provided but not its dependent attributes: data-key and data-id");
            }

            sb.loopAttributes($elem.get(0), "data-k-", function(a, b) {
                Kenseo.popup.data[a] = b;
            })
        },
        //navigating to popup or overlay
        navigate: function navigate(str, el) {
            // load necessary svgs for popups and overlays
            this.svgLoader(['popups']);

            var $self = $(el);
            // var key = $self.data("key");
            // var id = $self.data("id");
            // if(key){
            // 	// Storing the current dump data in popup's data
            //     Kenseo[str].data = Kenseo.data[key][id];
            // }
            if (str == 'popup') {
                var index = $self.data('index') || 0;
                $('.popup-container').show();
                var actionType = $self.data('url');
                // Important: this should be called after dump object is stored in the Kenseo.popup.data
                Kenseo.popup.info = sb.getPopupsInfo(actionType);
                sb.setPopupData(_.camelCase(actionType), 'actionType');
                if (index > 0) {
                    Kenseo.popup.info = Kenseo.popup.info.slice(index);
                    index = 0;
                }
                sb.callPopup(index);
            }
            else if (str == 'overlay') {
                var index = $self.data('index') || 0;
                $('.popup-container').show();
                var actionType = $self.data('url');
                // Important: this should be called after dump object is stored in the Kenseo.popup.data
                Kenseo.popup.info = sb.getOverlaysInfo(actionType);
                sb.setPopupData(_.camelCase(actionType), 'actionType');
                if (index > 0) {
                    Kenseo.popup.info = Kenseo.popup.info.slice(index);
                    index = 0;
                }
                sb.callOverlay(index);
            }
        },
        //providing the data regarding passed object
        getPopupMetaInfo: function(dump){
            return {
                getProjectName: function(){
                    try{
                        if(dump.project_name){
                            return dump.project_name;
                        } else if(dump.name){
                            return dump.name
                        }else{
                            return Kenseo.page.data.project.name;
                        }
                    }
                    catch(ex){
                        sb.log(ex);
                    }
                },
                getFileName: function(){
                    try{
                        if(dump.files && dump.files.length == 1){
                            return dump.files[0].name;
                        }
                        else if(dump.files && dump.files.length > 1){
                            return "Multiple files";
                        }
                        else if(dump.artefactName){
                            return dump.artefactName;
                        }
                        else{
                            return dump.title;
                        }
                    }
                    catch(ex){
                        sb.log(ex);
                    }
                },
                getType: function(){
                    return Kenseo.settings.doctype[dump.doctype[0]['data-name']];
                },
                getReferences: function(){
                    return dump.references.map(function(e){return e.name}).join(", ");
                },
                getTags: function(){
                    return dump.tags.value;
                }
            }
        },
        //displaying the current popup and storing it's data
        callPopup: function callPopup(index, currentIndex) {// or previousIndex?
            var allPopups = $('.popup');
            var $popup = allPopups.eq(index);
            var currentActionType = Kenseo.popup.data.actionType;
            if($popup.length){
                // when the popup is already existing, show the popup and refresh the meta information if necessary
                sb.popup.popupsStateMaintainer({
                    index: index,
                    currentIndex: currentIndex,
                    allPopups: allPopups,
                    currentActionType: currentActionType
                });
            }
            else{
                // resetting the previous flags
                // the below if condition works if the popup is shareArtefact or addArtefact and the current popup is second in list of popups navigated from the first popup
                if((currentActionType === "shareArtefact" || currentActionType === "addArtefact") && index === 1 && currentIndex == 0){
                    Kenseo.popup.info.projectComboboxValueChanged = false;
                }
                $('.popup').addClass('hide');
                var info = Kenseo.popup.info[index];
                _.extend(info, {'index': index});

                var $templateHolder = $('.popup-container');

                sb.renderTemplate({
                    'templateName': info.page_name,
                    'templateHolder': $templateHolder,
                    'append': true,
                    'data': {
                        'data': info
                    }
                });

                // Storing current popup root element
                Kenseo.current.popup = $templateHolder.find('.popup').last();

                if (info.callbackfunc) {
                    info.callbackfunc();
                }
            }
        },
        newCallPopup: function(payload){
            if(!payload.beforeRender){
                // Initializing beforeRender
                payload.beforeRender = function(){};
            }

            //
            $.when(payload.beforeRender()).then(function(){

                // Callback to before render
                console.log("newCallPopup");
                this.svgLoader(['popups']);

                var _this = payload.scope;
                var el = payload.el;
                var index = el.getAttribute('data-index') || 0;
                var actionType = el.getAttribute('data-url');
                Kenseo.popup.info = Kenseo.popups.getPopupsInfo(actionType);
                if (index > 0) {
                    Kenseo.popup.info = Kenseo.popup.info.slice(index);
                    index = 0;
                }
                // Kenseo.popup.info.projectComboboxValueChanged = false;
                var info = Kenseo.popup.info[index];
                _.extend(info, {'index': index});

                var $templateHolder = $('.popup-container');

                //
                if(_this.model){
                    sb.setPopupData(_this.model.toJSON());
                }
                sb.setPopupData(_.camelCase(actionType), 'actionType');

                sb.renderTemplate({
                    'templateName': info.page_name,
                    'templateHolder': $templateHolder,
                    'append': true,
                    'data': {
                        'data': info
                    }
                });

                $templateHolder.show();
                // Storing current popup root element
                Kenseo.current.popup = $templateHolder.find('.popup').last();

                // @INFO: Compatible with new changes
                if(payload.afterRender){
                    payload.afterRender($templateHolder, _this);
                }

                if (info.callbackfunc) {
                    info.callbackfunc();
                }
            }.bind(this))
        },
        callOverlay: function callPopup(index) {
            var allPopups = $('.overlay');
            var $popup = allPopups.eq(index);
            if($popup.length){
                allPopups.addClass('hide');
                $popup.removeClass('hide');

                // Storing current popup root element
                Kenseo.current.popup = $popup;
            }
            else{
                $('.overlay').addClass('hide');
                var info = Kenseo.popup.info[index];
                _.extend(info, {'index': index});

                var $templateHolder = $('.popup-container');

                sb.renderTemplate({
                    'templateName': info.page_name,
                    'url': info.url,
                    'templateHolder': $templateHolder,
                    'append': true,
                    'data': {
                        'data': info
                    }
                });

                // Storing current popup root element
                Kenseo.current.popup = $templateHolder.find('.overlay').last();

                if (info.callbackfunc) {
                    info.callbackfunc();
                }
            }
        },
        toolbox: {
            //common functionality for rendering textbox
            textBox: function textBox(data) {
                return sb.setTemplate('textbox', {
                    data: data
                });
            },
            //common functionality for rendering mutiple buttons
            buttons: function buttons(data) {
                return sb.setTemplate('buttons', data);
            },
            //common functionality for rendering button
            button: function button(data){
                return sb.setTemplate('button', data);
            },
            //common functionality for rendering select list
            comboBox: function comboBox(data) {
                return sb.setTemplate('combobox', {
                    'data': data
                });
            },
            //
            applyComboBox: function applyComboBox(data) {
                var combobox = new comboBox(data.elem, data.data, data.settings);
                combobox.onchange = data.onchange;
                combobox.insertAfter = data.insertAfter;
                return combobox;
            },
            //common functionality for rendering checkbox
            checkbox: function checkbox(data){
                return sb.setTemplate('checkbox', {data: data || {}});
            }
        },
        //retrieves document data of given versionid
        getCurrentDocumentData: function(id){
            return Kenseo.document[id];
        },
        //sets the document data of given versionid
        setCurrentDocumentData: function(id, data){
            Kenseo.document[id] = data;
        },
        //unused funtion
        getCurrentThreadData: function(versionId, threadId){
            return Kenseo.document[versionId][threadId];
        },
        setCurrentThreadData: function(versionId, threadId, data){
            Kenseo.document[versionId][threadId] = data;
        },
        page: {},
        overlay: {},
        //unused function
        fetch: function fetch(collection, data, func) {
            collection.fetch(sb.getStandardData({
                data: data,
                success: func
            }));
        },
        //storing popup data
        registerData: function registerData() {
            var $fieldSection = $('.popup').find('.field-section');
            if ($fieldSection.length) {
                $fieldSection.each(function () {
                    var $self = $(this);
                    // "data-ignore" attribute if applied to the field section,
                    // The fields value will not be saved in POST request
                    if ($self.data('ignore') !== 1) {
                        // 'property' variable specifies the
                        var property = $self.data('name');
                        var $combobox = $self.find('.combobox');
                        var $text = $self.find('input[type="text"]');
                        var $checkbox = $self.find('input[type="checkbox"]');
                        var $textArea = $self.find('textarea');
                        var $dropdown = $self.find('select');

                        var asArray = $self.data('array') === 1;
                        if ($combobox.length) {
                            var arrValue = [];
                            var arrayIds = [];

                            var $svName = $combobox.find('.sv-name');
                            if ($svName.length) {
                                $svName.each(function () {
                                    var obj = {};
                                    var attrs = this.attributes;
                                    Array.prototype.forEach.call(attrs, function(attr){
                                        obj[attr.name] = attr.value;
                                    });
                                    obj.name = $(this).html();
                                    arrValue.push(obj);
                                    //TODO: Remove arrayIds concept
                                    arrayIds.push($(this).data('id'));
                                });
                                // settings
                                if (property) {
                                    sb.setPopupData(arrValue, property);
                                    sb.setPopupData(arrayIds, property + 'Ids');
                                }
                            } else if ($text.length) {

                                var obj = {};
                                var attrs = $text[0].attributes;
	                        Array.prototype.forEach.call(attrs, function(attr){
                                    obj[attr.name] = attr.value;
                                });
                                obj.name = $text.val();
                                arrValue.push(obj);
                                // settings
                                if (property) {
                                    sb.setPopupData(arrValue, property);
                                    sb.setPopupData(arrayIds, property + 'Ids');
                                }
                            }
                        } else if ($text.length && !$dropdown.length) { // it is a textbox, but not dropdown textbox
                            var text = $text[0];
                            var obj = {};
                            var attrs = text.attributes;
                            Array.prototype.forEach.call(attrs, function(attr){
                                obj[attr.name] = attr.value;
                            });
                            obj.value = text.value;
                            // settings
                            if (property) {
                                sb.setPopupData(obj, property);
                            }
                        } else if ($checkbox.length) {
                            var arrValue = [];
                            var arrayIds = [];
                            $checkbox.each(function () {
                                if (this.checked) {
                                    var obj = {};
                                    var attrs = this.attributes;
                                    Array.prototype.forEach.call(attrs, function(attr){
                                        obj[attr.name] = attr.value;
                                    });
                                    // obj.name = $(this).html();
                                    // arrValue.push(obj);
                                    if (asArray) {
                                        var dump = sb.getPopupData(property);
                                        if (!dump) {
                                            dump = [];
                                        }
                                        dump.push(obj);
                                        sb.setPopupData(dump, property);
                                    } else {
                                        arrValue.push(obj);
                                    }
                                }
                            });

                            // settings
                            if (!asArray && property) {
                                sb.setPopupData(arrValue, property);
                            }
                        } else if ($textArea.length) {
                            var textarea = $textArea[0];
                            var obj = {};
                            var attrs = textarea.attributes;
                            Array.prototype.forEach.call(attrs, function(attr){
                                obj[attr.name] = attr.value;
                            });
                            obj.value = textarea.value;
                            // settings
                            if (property) {
                                sb.setPopupData(obj, property);
                            }
                        } else if ($dropdown.length) {

                            var dropdown = $dropdown[0];
                            var obj = {};
                            var attrs = dropdown.attributes;
                            Array.prototype.forEach.call(attrs, function(attr){
                                obj[attr.name] = attr.value;
                            });
                            if (property === 'toTime' || property === 'fromTime') {
                                obj.value = 'T' + dropdown.value + ':00.000' + sb.getTimeZone();
                            } else {
                                obj.value = Array.prototype.map.call(dropdown.selectedOptions, function(e) { return e.value; });
                            }
                            // settings
                            if (property) {
                                sb.setPopupData(obj, property);
                            }
                        }
                    }
                });
            }
        },
        //messages to dispaly whether action is success or failure
        showGlobalMessages: function(response){
            var messages = response.data.messages;
            var message = messages.message;
            var icon = messages.icon;
            var type = messages.type;
            $('body').prepend(sb.setTemplate('show-global-messages',{type,message, icon}));

        	setTimeout(function(){
        		$('div.messages-wrapper').addClass('show-messages');
        	}.bind($('div.messages-wrapper')), 10);

        	setTimeout(function(){
        		$('div.messages-wrapper').removeClass('show-messages');
                $('.messages-wrapper').remove();
        	}.bind($('div.messages-wrapper')), 3010);
        },
    };
})());
