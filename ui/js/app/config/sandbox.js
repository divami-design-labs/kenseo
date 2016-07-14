var sb = (function () {
    var labels = {
        popupContainer: '.popup-container'
    };
    var scripts = {
        'modules': {},
        'files': {},

        // @TODO: remove the below code
        'views': {},
        'models': {},
        'collections': {}
    };

    function getModulePath(moduleType, moduleName) {
        // return 'js/app/modules/' + moduleType + '/' + moduleName + _.capitalize(moduleType).substring(0, moduleType.length - 1) + '.js';
        return 'js/app/modules/' + moduleName + '.js';
    }
    return {
        log: function log(msg) {
            console.log(msg);
        },
        // Function to load files in sequence (useful to consider dependency).
        // TO DO: Sometimes, this function is loading files not in dependency sequence
        loadFiles: function loadFiles(payload, fn) {
            var files = [];
            var types = ['files', 'modules', 'views', 'models', 'collections'];
            for (var k = 0; k < types.length; k++) {
                var type = types[k];
                if (payload[type]) {
                    var items = payload[type];
                    for (var i = 0; i < items.length; i++) {
                        var file = items[i];

                        // Checking the file whether it is already loaded or not.
                        if (!scripts[type][file]) {
                            var src = type === 'files' ? file : getModulePath(type, file);
                            // Setting the loaded flag to true to avoid loading a same file again.
                            scripts[type][file] = true;
                            files.push(src);
                        }
                    }
                }
            }
            // files.push(fn);

            var head = document.head || document.getElementsByTagName('head')[0];
            function loadFile(index) {
                if (files.length > index) {
                    var fileref = document.createElement('script');
                    fileref.setAttribute('type', 'text/javascript');
                    fileref.setAttribute('src', files[index]);
                    head.appendChild(fileref);
                    index = index + 1;
                    // Used to call a callback function
                    fileref.onload = function () {
                        loadFile(index);
                    };
                } else {
                    fn();
                }
            }
            loadFile(0);
        },
        loadCalls: function(arrayOfAjaxCalls, callbackfunction){
            var filterArrayOfAjaxCalls = arrayOfAjaxCalls.filter(function(item){
                return !item.exprCondition;
            }).map(function(x){
                return x.ajax;
            });
            $.when.apply(filterArrayOfAjaxCalls).then(callbackfunction);
        },
        attach: function($element, eventName, func){
            $element.off(eventName, func)
                .on(eventName, func);
        },
        attachIn: function(eventName, selector, func, $inElement){
            if(!$inElement) $inElement = $(document.body);

            // @TODO: off is not unbinding the events
            $inElement.off(eventName, selector, func);
            $inElement.on(eventName, selector, func);
        },
        redirectTo: function(value){
            var a = document.createElement('a');
            a.href = value;
            window.location.href = a.href;
        },
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
                        'files': ['js/app/config/sandbox.postcall.js']
                    }
                };
            }
            sb.loadFiles(filesToLoad.js, callBackFunc);
        },
        loadCss: function(url){
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        },
        svgLoader: function(svgs){
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
            Kenseo.alreadyLoadedSVGs = _.union(Kenseo.alreadyLoadedSVGs, svgs);
        },
        saveData: function saveData(payload) {
            var popupData = sb.getPopupData();
            for (key in popupData) {
                data.append(key, popupData[key]);
            }
            payload.data = popupData;
            ajaxCall(payload);
        },
        getUrl: function getUrl(p) {
            if (p.collection) {
                return p.collection.url;
            } else if (p.model) {
                return p.model.urlRoot;
            } else if (p.url) {
                return p.url;
            }
            return false;
        },
        ajaxCall: function ajaxCall(payload) {
            $.ajaxSetup({
                cache: false
            });
            sb.throbber(payload.container);
            // var url = payload.url || collection.urlRoot || collection.url;
            var url = sb.getUrl(payload);
            // If plainData is true, don't add session Id. This assumes the session id has already been added.
            if (payload.plainData) {
                var data = payload.data;
            } else {
                var data = sb.getStandardData({
                    'data': payload.data
                }).data;
            }
            // Setting default values to the ajax properties
            var contentType = payload.contentType;// || 'application/x-www-form-urlencoded; charset=UTF-8';
            var processData = payload.processData;
            if (contentType === undefined || contentType === null) {
                contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
            }
            if (processData === undefined || processData === null) {
                processData = true;
            }
            var timeBeforeAjaxCall = Date.now();
            // Ajax call

            // returning the ajax is necessary for jquery promises, if any.
            return $.ajax({
                url: url,
                data: data,
                type: payload.type || 'GET',
                contentType: contentType,
                processData: processData,
                success: function success(response) {
                    // try {
                        var response = JSON.parse(response);
                        sb.throbberTimeOut(timeBeforeAjaxCall, function() {
                          if (response.status == 'success') {
                              if (!payload.excludeDump) {
                                  sb.setDump(response);
                              }
                              payload.success(response);
                          } else {
                              // window.location.assign(DOMAIN_ROOT_URL);
                          }
                        });

                    // }
                    // catch(ex){
                    //     // Catching the exception
                    //     sb.log("Below error is in ajax request");
                    //     console.error(ex);
                    //     // Redirecting to the Dashboard

                    // }
                }
            });
        },
        throbberTimeOut: function(timeBeforeAjaxCall,responseFunction) {
          var timeAfterAjaxCall = Date.now();
          var responseTime = timeAfterAjaxCall - timeBeforeAjaxCall;
          var fixedTime = 1000;
          var timeForThrobber = fixedTime - responseTime;
          setTimeout(function() {
            responseFunction();
            $('div').removeClass('throbber');
          }, timeForThrobber < 0 ? 0 : timeForThrobber);
        },
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
        setDump: function setDump(obj) {
            var key = obj.command.slice(3).toLowerCase(); // removing "get" prefix
            var dump = Kenseo.data[key];
            if (obj.data.length) {
                for (var i = 0; i < obj.data.length; i++) {
                    var data = obj.data[i];
                    if (!dump) {
                        dump = {};
                    }
                    dump[data.id] = data;
                }
                Kenseo.data[key] = dump;
            } else if(obj.data) {
                Kenseo.data[key] = obj.data;
            }
        },
        getRelativePath: function getRelativePath(str) {
            return DOMAIN_ROOT_URL + str;
        },
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
        getStandardData: function getStandardData(p) {
            p = p || {};
            var data = _.cloneDeep(p.data);
            if (p.data) {
                p.data = {
                    client: {
                        sid: Kenseo.cookie.sessionid()
                    },
                    data: Kenseo.params.getParams(data)
                };
            }

            return p;
        },
        renderXTemplate: function renderXTemplate(_this, payload) {
            // debugger;
            payload = payload || {};
            var colStr = _this.colStr;
            var data = _this.data;
            if (colStr) {
                var collection = new Kenseo.collections[colStr]();
                sb.fetch(collection, data, function (collection, response, options) {
                    // _.each(x.data, _this.renderArtefact);
                    if (!payload.excludeDump) {
                        sb.setDump(response);
                    }
                    if (_this.preLoader) {
                        _this.preLoader(response);
                    }
                    if(_this.stopRenderX){
                        return;
                    }

                    var data = response.data;
                    var el = $(_this.el);
                    if (!el || !el.length) {
                        el = $(_this.$el);
                    }

                    if (data.length > 0) {
                        var c = new Kenseo.collections[colStr](data);
                        c.each(function (item) {
                            var artefact = _this.itemView({
                                model: item
                            });
                            el.append(artefact.render().$el);
                        });
                    } else {
                        el.html(sb.noItemsTemplate(payload));
                    }
                });
            }
        },
        noItemsTemplate: function noItemsTemplate(p) {
            return sb.setTemplate('no-items', {
                data: p.noData || {}
            });
        },
        getCommentThreadDumpObject: function($el){
            var els = $el.find('*');
            els.push($el.get(0));
            var obj = {};
            for (var i = 0; i < els.length; i++) {
                var el = els[i];
                var attributes = el.attributes;
                for (var k = 0; k < attributes.length; k++) {
                    var attr = attributes[k];
                    var nodeName = attr.nodeName;
                    if(nodeName.indexOf("data-k-") > -1){
                        obj[attr.nodeName.substr(7)] = attr.nodeValue;
                    }
                }
            }
            var $text = $el.find('.write-comment');
            obj.description = $text.val();
            return obj;
        },
        renderTemplate: function renderTemplate(p) {
            var template = templates[p.templateName];
            // Setting the view's template property using the Underscore template method
            // Backbone will automatically include Underscore plugin in it.
            // var compiler = sb.setTemplate(p.templateName);
            var url = sb.getUrl(p);
            if (url) {
                sb.ajaxCall({
                    'url': url,
                    'data': p.data,
                    'success': function success(obj) {
                        if (p.templateHolder) {
                            if(p.append){
                                p.templateHolder.append(sb.setTemplate(p.templateName, obj));
                            }
                            else{
                                p.templateHolder.html(sb.setTemplate(p.templateName, obj));
                            }
                        }
                        if (p.callbackfunc) {
                            p.callbackfunc();
                        }
                    }
                });
            } else {
                if(p.append){
                    p.templateHolder.append(sb.setTemplate(p.templateName, p.data));
                }
                else{
                    p.templateHolder.html(sb.setTemplate(p.templateName, p.data));
                }
                if (p.callbackfunc) {
                    p.callbackfunc();
                }
            }
        },
        setTemplate: function(str, data){
            data = data || {};
            return _.template(templates[str](data))();
        },
        getDate: function getDate(time) {
            // Refer: http://stackoverflow.com/a/10589791/1577396
            // Refer: http://stackoverflow.com/a/1353711/1577396
            if(time){
                var dateTime = new Date(time);
            }
            else{
                var dateTime = new Date();
            }
            // var dateTime = new Date(time || null);
            // Valid date
            if(Object.prototype.toString.call(dateTime) === "[object Date]" && !isNaN(dateTime.getTime())){
                return dateTime;
            }
            // Invalid date
            else{
                // Refer: http://stackoverflow.com/a/3075893/1577396
                var t = time.split(/[- :]/);
                return new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
            }
        },
        timeFormat: function timeFormat(time, OnlyTime, OnlyDays, withYear) {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var theDate = sb.getDate(time);
            var currentDate = sb.getDate();

            var year = theDate.getFullYear();
            var month = theDate.getMonth();
            var day = theDate.getDate();

            var currentYear = currentDate.getFullYear();
            var currentMonth = currentDate.getMonth();
            var currentDay = currentDate.getDate();
            var resultDateFormat = '';
            var text = '';
            if (currentYear !== year) {
                text = OnlyTime ? '' : 'On ';
                resultDateFormat = text + day + ' ' + months[month] + ' ' + year;
            } else if (month === currentMonth && day === currentDay) {
                text = OnlyTime ? '' : '@ ';
                if (OnlyDays) {
                    resultDateFormat = text + day + ' ' + months[month];
                } else {
                    resultDateFormat = text + sb.getTime(time);
                }
                if(withYear){
                    resultDateFormat += ' ' + year;
                }
            } else {
                text = OnlyTime ? '' : 'On ';
                resultDateFormat = text + day + ' ' + months[month];

                if(withYear){
                    resultDateFormat += ' ' + year;
                }
            }
            return resultDateFormat;
        },
        getHours: function(time){
            var hh = ("0" + sb.getTime(time).replace(": ", ":")).slice(-8);
            var hhValue = hh.slice(0, -3);
            var value = +hhValue.split(":")[0];
            if(/pm/i.test(hh)){
                value = value + 11;
            }
            else{
                value = value - 1;
            }
            return hhValue.replace(/^\d\d/, ("0" + value).slice(-2));
        },
        getTime: function getTime(time) {
            var fullDate = sb.getDate(time);
            var hours = fullDate.getHours();
            var minutes = ('0' + fullDate.getMinutes()).slice(-2);
            if (hours > 11) {
                hours = ('0' + (hours - 12)).slice(-2);
                return hours + ': ' + minutes + ' PM';
            } else {
                return hours + ': ' + minutes + ' AM';
            }
        },
        getTimeZone: function getTimeZone() {
            var offset = sb.getDate().getTimezoneOffset();
            var operation = offset < 0 ? 'floor' : 'ceil';
            var sign = offset < 0 ? '+' : '-';
            return sign + ('00' + Math[operation](Math.abs(offset / 60))).slice(-2) + ':' + ('00' + Math.abs(offset % 60)).slice(-2);
        },
        getDayTime: function getDayTime(time) {},
        getDayWiseData: function getDayWiseData(data) {
            if (data.length) {
                var newData = {};
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    var time = sb.timeFormat(d.time, true, true);
                    if (!newData[time]) {
                        newData[time] = [];
                        newData[time].push(d);
                    } else {
                        newData[time].push(d);
                    }
                }
                return newData;
            } else {
                return false;
            }
        },
        getPopupsInfo: function getPopupsInfo(info) {
            return Kenseo.popups.getPopupsInfo(info);
        },
        getOverlaysInfo: function getOverlaysInfo(info) {
            return Kenseo.overlays.getOverlaysInfo(info);
        },
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
        setPageData: function setPageData(value, key) {
            if (key) {
                Kenseo.page.data[key] = value;
            } else {
                Kenseo.page.data = value;
            }
        },
        getPageData: function getPageData(key) {
            if (key) {
                return Kenseo.page.data[key];
            } else {
                return Kenseo.page.data;
            }
        },
        getPopupData: function getPopupData(key) {
            if (key) {
                return Kenseo.popup.data[key];
            } else {
                return Kenseo.popup.data;
            }
        },
        setPopupData: function setPopupData(value, key) {
            if (key) {
                Kenseo.popup.data[key] = value;
            } else {
                Kenseo.popup.data = value;
            }
        },
        getVersionIdFromMaskedId: function(maskedId){
            if(!Kenseo.data.ma){
                Kenseo.data.ma = {};
            }
            return Kenseo.data.ma[maskedId];
        },
        setVersionIdForMaskedId: function(maskedId, versionId){
            if(!Kenseo.data.ma){
                Kenseo.data.ma = {};
            }
            Kenseo.data.ma[maskedId] = versionId;
        },
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
        navigate: function navigate(str, el) {
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
                sb.callPopup(index);
            }
        },
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
        callPopup: function callPopup(index, currentIndex) {// or previousIndex?
            this.svgLoader(['popups']);

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
            if(payload.beforeRender){
                payload.beforeRender();
            }
            // Kenseo.popup.info.projectComboboxValueChanged = false;
            var info = Kenseo.popup.info[index];
            _.extend(info, {'index': index});

            var $templateHolder = $('.popup-container');

            //
            sb.setPopupData(_this.model.toJSON());
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
        },
        toolbox: {
            textBox: function textBox(data) {
                return sb.setTemplate('textbox', {
                    data: data
                });
            },
            buttons: function buttons(data) {
                return sb.setTemplate('buttons', data);
            },
            button: function button(data){
                return sb.setTemplate('button', data);
            },
            comboBox: function comboBox(data) {
                return sb.setTemplate('combobox', {
                    'data': data
                });
            },
            applyComboBox: function applyComboBox(data) {
                var combobox = new comboBox(data.elem, data.data, data.settings);
                combobox.onchange = data.onchange;
                combobox.insertAfter = data.insertAfter;
                return combobox;
            },
            checkbox: function checkbox(data){
                return sb.setTemplate('checkbox', {data: data || {}});
            }
        },
        getCurrentDocumentData: function(id){
            return Kenseo.document[id];
        },
        setCurrentDocumentData: function(id, data){
            Kenseo.document[id] = data;
        },
        getCurrentThreadData: function(versionId, threadId){
            return Kenseo.document[versionId][threadId];
        },
        setCurrentThreadData: function(versionId, threadId, data){
            Kenseo.document[versionId][threadId] = data;
        },
        page: {},
        overlay: {},
        fetch: function fetch(collection, data, func) {
            collection.fetch(sb.getStandardData({
                data: data,
                success: func
            }));
        },
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
                                    for (var i = 0; i < attrs.length; i++) {
                                        var attr = attrs[i];
                                        obj[attr.name] = attr.value;
                                    }
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
                                for (var i = 0; i < attrs.length; i++) {
                                    var attr = attrs[i];
                                    obj[attr.name] = attr.value;
                                }
                                obj.name = $text.val();
                                arrValue.push(obj);
                                // settings
                                if (property) {
                                    sb.setPopupData(arrValue, property);
                                    sb.setPopupData(arrayIds, property + 'Ids');
                                }
                            }
                        } else if ($text.length) {
                            var text = $text[0];
                            var obj = {};
                            var attrs = text.attributes;
                            for (var i = 0; i < attrs.length; i++) {
                                var attr = attrs[i];
                                obj[attr.name] = attr.value;
                            }
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
                                    for (var i = 0; i < attrs.length; i++) {
                                        var attr = attrs[i];
                                        obj[attr.name] = attr.value;
                                    }
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
                            for (var i = 0; i < attrs.length; i++) {
                                var attr = attrs[i];
                                obj[attr.name] = attr.value;
                            }
                            obj.value = textarea.value;
                            // settings
                            if (property) {
                                sb.setPopupData(obj, property);
                            }
                        } else if ($dropdown.length) {

                            var dropdown = $dropdown[0];
                            var obj = {};
                            var attrs = dropdown.attributes;
                            for (var i = 0; i < attrs.length; i++) {
                                var attr = attrs[i];
                                obj[attr.name] = attr.value;
                            }
                            if (property === 'toTime' || property === 'fromTime') {
                                obj.value = 'T' + dropdown.value + ':00.000' + sb.getTimeZone();
                            } else {
                                obj.value = dropdown.value;
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
        showGlobalMessages: function(validationSection,messages,flag){
          var div = document.createElement('div');
    			//added class to show success message.
          if(flag){
    			  $(div).addClass('messages-wrapper success-messages-wrapper');
          }
          else{
            $(div).addClass('messages-wrapper error-messages-wrapper');
          }
          var span = document.createElement('span');
    			var img = document.createElement('img');
    			span.innerHTML = messages;
    			div.appendChild(img);
    			div.appendChild(span);
    			span.className = 'messages';
    			$(img).addClass("error-or-success-img");
    			$(img).attr("src","");
    			validationSection.prepend($(div).css({
    				'top': validationSection.scrollTop() + "px"
    			}));

    			validationSection.on('scroll', function(){
    				$(div).css({
    					'top': $(this).scrollTop() + "px"
    				})
    			});
    			setTimeout(function(){
    				this.addClass('show-messages');
    			}.bind($(div)), 10);

    			setTimeout(function(){
    				this.removeClass('show-messages');
    			}.bind($('div.messages-wrapper')), 3010);
        },
        throbber: function(ele){
          var div = document.createElement('div');
          $(div).addClass('throbber');
          var loaderdiv = document.createElement('div');
          $(loaderdiv).addClass('loader');
          div.appendChild(loaderdiv);
          if(!ele){
            $('body').prepend($(div));
          }
          else{
            var element = ele.get();
            var position = getComputedStyle(element[0]).getPropertyValue("position");
            if(position == "static"){
              $(div).css({'position' : 'relative'});
            }
            ele.prepend($(div));
          }
        }
    };
})();
