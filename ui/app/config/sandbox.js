var sb = (function() {
    var labels = {
        popupContainer: '.popup-container'
    };
    var scripts = {
        'views': {},
        'models': {},
        'collections': {},
        'files': {}
    }

    function getModulePath(moduleType, moduleName) {
        return 'app/modules/' + moduleType + '/' + moduleName + _.capitalize(moduleType).substring(0, moduleType.length - 1) + '.js';
    }
    return {
        log: function(msg) {
            console.log(msg);
        },
        getDump: function(p) {
            var n = {};
            for (var k in p) {
                n[k] = p[k].split(" ").join("\r");
            }
            return JSON.stringify(n);
        },
        loadFiles: function(payload, fn) {
            var allFiles = [];
            var types = ['files', 'views', 'models', 'collections'];
            for (var k = 0; k < types.length; k++) {
                var type = types[k];
                if (payload[type]) {
                    var files = payload[type];
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];

                        // Checking the file whether it is already loaded or not.
                        if (!scripts[type][file]) {
                            var src = type === "files" ? file : getModulePath(type, file);
                            // Setting the loaded flag to true to avoid loading a same file again.
                            scripts[type][file] = true;
                            allFiles.push($.getScript(src));
                        } 
                    }
                }
            }

            allFiles.push($.Deferred(function( deferred ){
                $( deferred.resolve );
            }));
            $.when.apply($, allFiles).done(function(){

                //place your code here, the scripts are all loaded
                fn();

            });
        },
        getPath: function(type, fileName) {
            var o = i18n[type];
            if (!o) {
                sb.log("getPath: getPath type is invalid");
            }
            var k = o[fileName];
            if (!k) {
                sb.log("getPath: fileName is invalid");
            }
            return k;
        },
        viewPortSwitch: function(callBackFunc) {
            var ua = navigator.userAgent || navigator.vendor || window.opera;
            var production = false;
            // Mobile/Tablet Logic
            if ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua)) {
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
        saveData: function(payload) {
            var popupData = sb.getPopupData();
            for (key in popupData) {
                data.append(key, popupData[key]);
            }
            payload.data = popupData;
            ajaxCall(payload);
        },
        getUrl: function(p) {
            var relativePath = "../";
            if (p.collection) {
                return relativePath + p.collection.url;
            } else if (p.model) {
                return relativePath + p.model.urlRoot;
            } else if (p.url) {
                return p.url;
            }
            return false;
        },
        ajaxCall: function(payload) {
            $.ajaxSetup({
                cache: false
            });
            // var url = payload.url || collection.urlRoot || collection.url;
            var url = sb.getUrl(payload);
            $.ajax({
                url: url,
                data: {
                    "data": payload.data,
                    'client': {
                        sid: Kenseo.cookie.sessionid()
                    }
                },
                type: payload.type || "GET",
                success: function(response) {
                    var data = JSON.parse(response);
                    if (data.status == 'success') {
                        if (!payload.excludeDump) {
                            sb.setDump(data);
                        }
                        payload.success(data);
                    } else {
                        window.location.assign("http://kenseo.divami.com");
                    }
                }
            });
        },
        setDump: function(obj) {
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
            }
        },
        getRelativePath: function(str) {
            return '../' + str;
        },
        getStandardData: function(p) {
            p = p || {};
            var data = _.cloneDeep(p.data);
            if (p.data) {
                p.data = {
                    client: {
                        sid: Kenseo.cookie.sessionid()
                    },
                    data: data
                }
            }

            return p;
        },
        renderXTemplate: function(_this, p) {
            // debugger;
            p = p || {};
            var colStr = _this.colStr;
            var data = _this.data;
            if (colStr) {
                var collection = new Kenseo.collections[colStr]();
                sb.fetch(collection, data, function(response) {
                    // _.each(x.data, _this.renderArtefact);
                    if (_this.preLoader) {
                        _this.preLoader(response);
                    }


                    var data = response.data;
                    var el = $(_this.el);
                    if (!el || !el.length) {
                        el = $(_this.$el);
                    }

                    if (data.length > 0) {
                        var c = new Kenseo.collections[colStr](data);
                        c.each(function(item) {
                            var artefact = _this.itemView({
                                model: item
                            });
                            el.append(artefact.render().$el);
                        });
                    } else {
                        var html = _this.noItemsTemplate({
                            data: p.noData
                        });
                        el.html(html);
                    }
                });
            }
        },
        renderTemplate: function(p) {
            var template = templates[p.templateName];
            // Setting the view's template property using the Underscore template method
            // Backbone will automatically include Underscore plugin in it.
            var compiler = _.template(template);
            var url = sb.getUrl(p);
            if (url) {
                sb.ajaxCall({
                    "url": url,
                    "data": p.data,
                    "success": function(obj) {
                        // if (response) {
                        //     var obj = JSON.parse(response);
                        // } else {
                        //     var obj = {};
                        // }
                        // console.dir(obj);
                        if (p.templateHolder) {
                            p.templateHolder.html(compiler(obj));
                        }
                        if (p.callbackfunc) {
                            p.callbackfunc();
                        }
                    }
                });
            } else {
                p.templateHolder.html(compiler(p.data));
                if (p.callbackfunc) {
                    p.callbackfunc();
                }
            }
        },
        timeFormat: function(time, OnlyTime, OnlyDays) {
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
            if (currentYear !== year) {
                text = OnlyTime ? "" : "On ";
                resultDateFormat = text + day + " " + months[month] + " " + year;
            } else if (month === currentMonth && day === currentDay) {
                text = OnlyTime ? "" : "@ ";
                if (OnlyDays) {
                    resultDateFormat = text + day + " " + months[month];
                } else {
                    resultDateFormat = text + sb.getTime(time);
                }
            } else {
                text = OnlyTime ? "" : "On ";
                resultDateFormat = text + day + " " + months[month];
            }
            return resultDateFormat;
        },
        getTime: function(time) {
            var fullDate = new Date(time);
            var hours = fullDate.getHours();
            var minutes = fullDate.getMinutes();
            if (hours > 11) {
                hours = ("0" + (hours - 12)).slice(-2);
                return hours + ": " + minutes + " PM";
            } else {
                return hours + ": " + minutes + " AM";
            }
        },
        getDayTime: function(time) {

        },
        getDayWiseData: function(data) {
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
        getPopupsInfo: function(info) {
            return Kenseo.popups.getPopupsInfo(info);
        },
        getDynamicData: function(str, id) {
            var key = Kenseo.data[str];
            if (key) {
                return key[id];
            } else {
                sb.log("provide valid key id pair");
            }
        },
        setPageData: function(val) {
            Kenseo.page.data = val;
        },
        getPopupData: function(key) {
            if (key) {
                return Kenseo.popup.data[key];
            } else {
                return Kenseo.popup.data;
            }
        },
        setPopupData: function(value, key) {
            if (key) {
                Kenseo.popup.data[key] = value;
            } else {
                Kenseo.popup.data = value;
            }
        },
        navigate: function(str, el) {
            var $self = $(el);
            // var key = $self.data("key");
            // var id = $self.data("id");
            // if(key){
            // 	// Storing the current dump data in popup's data
            //     Kenseo[str].data = Kenseo.data[key][id];
            // }
            if (str == "popup") {
                var index = $self.data('index') || 0;
                $('.popup-container').show();
                // Important: this should be called after dump object is stored in the Kenseo.popup.data
                Kenseo.popup.info = sb.getPopupsInfo($self.data('url'));
                if (index > 0) {
                    Kenseo.popup.info = Kenseo.popup.info.slice(index);
                    index = 0;
                }
                sb.callPopup(index);
            }
        },
        callPopup: function(index) {
            var info = Kenseo.popup.info[index];
            sb.renderTemplate({
                "templateName": info.page_name,
                "templateHolder": $('.popup-container'),
                "data": {
                    "data": info,
                    "index": index
                }
            });
            if (info.callbackfunc) {
                info.callbackfunc();
            }
        },
        toolbox: {
            textBox: function(data) {
                return _.template(templates['textbox'])({
                    data: data
                });
            },
            buttons: function(data, index) {
                return _.template(templates['buttons'])({
                    "data": data,
                    "index": index
                });
            },
            comboBox: function(data) {
                return _.template(templates['combobox'])({
                    "data": data
                });
            },
            applyComboBox: function(data) {
                var combobox = new comboBox(data.elem, data.data, data.settings);
                combobox.onchange = data.onchange;
                combobox.insertAfter = data.insertAfter;
                return combobox;
            }
        },
        page: {

        },
        overlay: {

        },
        fetch: function(collection, data, func) {
            collection.fetch(sb.getStandardData({
                data: data
            })).then(func);
        },
        registerData: function(){
            var $fieldSection = $('.popup').find('.field-section');
            if($fieldSection.length){
                $fieldSection.each(function(){
                    var $self = $(this);
                    if($self.data('ignore') !== "1"){
                        var property = $self.data('name');
                        var $combobox = $self.find('.combobox');
                        var $text = $self.find('input[type="text"]');
                        var $checkbox = $self.find('input[type="checkbox"]');
                        var asArray = $self.data('array') === 1;
                        if($combobox.length){
                            var arrValue = [];
                            var arrayIds = [];
                            $combobox.find('.sv-name').each(function(){
                                var obj = {};
                                var attrs = this.attributes;
                                for(var i=0; i<attrs.length; i++){
                                    var attr = attrs[i];
                                    obj[attr.name] = attr.value;
                                }
                                obj.name = $(this).html();
                                arrValue.push(obj);
                                //TODO: Remove arrayIds concept
                                arrayIds.push($(this).data('id'));
                            });
                            // settings
                            if(property){
                                sb.setPopupData(arrValue, property);
                                sb.setPopupData(arrayIds, property+'Ids');
                            }
                        }
                        else if($text.length){
                            var arrValue = [];
                            var arrayIds = [];
                            sb.setPopupData($text.val(), property);

                            // settings
                            if(property){
                                sb.setPopupData(arrValue, property);
                                sb.setPopupData(arrayIds, property+'Ids');
                            }
                        }
                        else if($checkbox.length){
                            var arrValue = [];
                            var arrayIds = [];
                            $checkbox.each(function(){
                                if(this.checked){
                                    var obj = {};
                                    var attrs = this.attributes;
                                    for(var i=0; i<attrs.length; i++){
                                        var attr = attrs[i];
                                        obj[attr.name] = attr.value;
                                    }
                                    // obj.name = $(this).html();
                                    // arrValue.push(obj);
                                    if(asArray){
                                        var dump = sb.getPopupData(property);
                                        if(!dump){
                                            dump = [];
                                        }
                                        dump.push(obj);
                                        sb.setPopupData(dump, property);
                                    }
                                    else{
                                        arrValue.push(obj);
                                    }
                                }
                            });

                            // settings
                            if(!asArray && property){
                                sb.setPopupData(arrValue, property);
                            }
                        }
                    }

                });
            }
        }
    };
})();