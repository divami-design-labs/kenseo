var sb = (function () {
    var labels = {
        popupContainer: '.popup-container'
    };
    var scripts = {
        'views': {},
        'models': {},
        'collections': {},
        'files': {}
    };

    function getModulePath(moduleType, moduleName) {
        return 'js/app/modules/' + moduleType + '/' + moduleName + _.capitalize(moduleType).substring(0, moduleType.length - 1) + '.js';
    }
    return {
        log: function log(msg) {
            console.error(msg);
        },
        loadFiles: function loadFiles(payload, fn) {
            var files = [];
            var types = ['files', 'views', 'models', 'collections'];
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
                        'js': []
                    };
                }
            sb.loadFiles(filesToLoad.js, callBackFunc);
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
            var contentType = payload.contentType,
                processData = payload.processData;
            if (contentType === undefined || contentType === null) {
                contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
            }
            if (processData === undefined || processData === null) {
                processData = true;
            }

            // Ajax call
            $.ajax({
                url: url,
                data: data,
                type: payload.type || 'GET',
                contentType: contentType,
                processData: processData,
                success: function success(response) {
                    // try {
                    var response = JSON.parse(response);
                    if (response.status == 'success') {
                        if (!payload.excludeDump) {
                            sb.setDump(response);
                        }
                        payload.success(response);
                    } else {}
                    // window.location.assign(DOMAIN_ROOT_URL);

                    // }
                    // catch(ex){
                    // Catching the exception
                    // sb.log("Below error is in ajax response");
                    // console.error(ex);
                    // console.log(response);
                    // Redirecting to the Dashboard

                    // }
                }
            });
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
            }
        },
        getRelativePath: function getRelativePath(str) {
            return DOMAIN_ROOT_URL + str;
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
            return _.template(templates['no-items'])({
                data: p.noData || {}
            });
        },
        renderTemplate: function renderTemplate(p) {
            var template = templates[p.templateName];
            // Setting the view's template property using the Underscore template method
            // Backbone will automatically include Underscore plugin in it.
            var compiler = _.template(template);
            var url = sb.getUrl(p);
            if (url) {
                sb.ajaxCall({
                    'url': url,
                    'data': p.data,
                    'success': function success(obj) {
                        if (p.templateHolder) {
                            if (p.append) {
                                p.templateHolder.append(compiler(obj));
                            } else {
                                p.templateHolder.html(compiler(obj));
                            }
                        }
                        if (p.callbackfunc) {
                            p.callbackfunc();
                        }
                    }
                });
            } else {
                if (p.append) {
                    p.templateHolder.append(compiler(p.data));
                } else {
                    p.templateHolder.html(compiler(p.data));
                }
                if (p.callbackfunc) {
                    p.callbackfunc();
                }
            }
        },
        setTemplate: function (str, data) {
            data = data || {};
            return _.template(templates[str])(data);
        },
        getDate: function getDate(time) {
            // Refer: http://stackoverflow.com/a/10589791/1577396
            // Refer: http://stackoverflow.com/a/1353711/1577396
            var dateTime = new Date(time || null);
            // Valid date
            if (Object.prototype.toString.call(dateTime) === "[object Date]" && !isNaN(dateTime.getTime())) {
                return dateTime;
            }
            // Invalid date
            else {
                    // Refer: http://stackoverflow.com/a/3075893/1577396
                    var t = time.split(/[- :]/);
                    return new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
                }
        },
        timeFormat: function timeFormat(time, OnlyTime, OnlyDays) {
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
            } else {
                text = OnlyTime ? '' : 'On ';
                resultDateFormat = text + day + ' ' + months[month];
            }
            return resultDateFormat;
        },
        getHours: function (time) {
            var hh = ("0" + sb.getTime(time).replace(": ", ":")).slice(-8);
            var hhValue = hh.slice(0, -3);
            var value = +hhValue.split(":")[0];
            if (/pm/i.test(hh)) {
                value = value + 11;
            } else {
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
        insertPopupData: function ($elem) {
            var key = $elem.data('key');
            var id = $elem.data('id');
            if (key && id) {
                Kenseo.popup.data = Kenseo.data[key][id];
            } else {
                sb.log("data-holder class is provided but not its dependent attributes: data-key and data-id");
            }
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
            } else if (str == 'overlay') {
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
        callPopup: function callPopup(index) {
            var $popup = $('.popup').eq(index);
            if ($popup.length) {
                $('.popup').addClass('hide');
                $popup.removeClass('hide');
            } else {
                $('.popup').addClass('hide');
                var info = Kenseo.popup.info[index];
                _.extend(info, { 'index': index });
                sb.renderTemplate({
                    'templateName': info.page_name,
                    'templateHolder': $('.popup-container'),
                    'append': true,
                    'data': {
                        'data': info
                    }
                });
                if (info.callbackfunc) {
                    info.callbackfunc();
                }
            }
        },
        toolbox: {
            textBox: function textBox(data) {
                return _.template(templates['textbox'])({
                    data: data
                });
            },
            buttons: function buttons(data) {
                return _.template(templates['buttons'])(data);
            },
            button: function button(data) {
                return _.template(templates['button'])(data);
            },
            comboBox: function comboBox(data) {
                return _.template(templates['combobox'])({
                    'data': data
                });
            },
            applyComboBox: function applyComboBox(data) {
                var combobox = new comboBox(data.elem, data.data, data.settings);
                combobox.onchange = data.onchange;
                combobox.insertAfter = data.insertAfter;
                return combobox;
            },
            checkbox: function checkbox(data) {
                return _.template(templates['checkbox'])({ data: data || {} });
            }
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
        }
    };
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2JhYmVsLWFwcC9jb25maWcvc2FuZGJveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVk7QUFDbEIsUUFBSSxNQUFNLEdBQUc7QUFDVCxzQkFBYyxFQUFFLGtCQUFrQjtLQUNyQyxDQUFDO0FBQ0YsUUFBSSxPQUFPLEdBQUc7QUFDVixlQUFPLEVBQUUsRUFBRTtBQUNYLGdCQUFRLEVBQUUsRUFBRTtBQUNaLHFCQUFhLEVBQUUsRUFBRTtBQUNqQixlQUFPLEVBQUUsRUFBRTtLQUNkLENBQUM7O0FBRUYsYUFBUyxhQUFhLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRTtBQUMzQyxlQUFPLGlCQUFpQixHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUNuSTtBQUNELFdBQU87QUFDSCxXQUFHLEVBQUUsU0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFO0FBQ25CLG1CQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO0FBQ0QsaUJBQVMsRUFBRSxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFO0FBQ3ZDLGdCQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixnQkFBSSxLQUFLLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUN4RCxpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsb0JBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixvQkFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7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QUFRLElBQUksUUFBUSxLQUFLLFVBQVUsRUFBRTtBQUNsRCxtQ0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOzZCQUNuRSxNQUFNO0FBQ0gsbUNBQUcsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQzs2QkFDOUI7O0FBQUEsQUFFRCxnQ0FBSSxRQUFRLEVBQUU7QUFDVixrQ0FBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7NkJBQ2xDO3lCQUNKO3FCQUNKO2lCQUNKLENBQUMsQ0FBQzthQUNOO1NBQ0o7S0FDSixDQUFDO0NBQ0wsQ0FBQSxFQUFHLENBQUMiLCJmaWxlIjoic2FuZGJveC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBzYiA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxhYmVscyA9IHtcbiAgICAgICAgcG9wdXBDb250YWluZXI6ICcucG9wdXAtY29udGFpbmVyJ1xuICAgIH07XG4gICAgdmFyIHNjcmlwdHMgPSB7XG4gICAgICAgICd2aWV3cyc6IHt9LFxuICAgICAgICAnbW9kZWxzJzoge30sXG4gICAgICAgICdjb2xsZWN0aW9ucyc6IHt9LFxuICAgICAgICAnZmlsZXMnOiB7fVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRNb2R1bGVQYXRoKG1vZHVsZVR5cGUsIG1vZHVsZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuICdqcy9hcHAvbW9kdWxlcy8nICsgbW9kdWxlVHlwZSArICcvJyArIG1vZHVsZU5hbWUgKyBfLmNhcGl0YWxpemUobW9kdWxlVHlwZSkuc3Vic3RyaW5nKDAsIG1vZHVsZVR5cGUubGVuZ3RoIC0gMSkgKyAnLmpzJztcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9nOiBmdW5jdGlvbiBsb2cobXNnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRGaWxlczogZnVuY3Rpb24gbG9hZEZpbGVzKHBheWxvYWQsIGZuKSB7XG4gICAgICAgICAgICB2YXIgZmlsZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciB0eXBlcyA9IFsnZmlsZXMnLCAndmlld3MnLCAnbW9kZWxzJywgJ2NvbGxlY3Rpb25zJ107XG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHR5cGVzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlc1trXTtcbiAgICAgICAgICAgICAgICBpZiAocGF5bG9hZFt0eXBlXSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSBwYXlsb2FkW3R5cGVdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGl0ZW1zW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVja2luZyB0aGUgZmlsZSB3aGV0aGVyIGl0IGlzIGFscmVhZHkgbG9hZGVkIG9yIG5vdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2NyaXB0c1t0eXBlXVtmaWxlXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcmMgPSB0eXBlID09PSAnZmlsZXMnID8gZmlsZSA6IGdldE1vZHVsZVBhdGgodHlwZSwgZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0dGluZyB0aGUgbG9hZGVkIGZsYWcgdG8gdHJ1ZSB0byBhdm9pZCBsb2FkaW5nIGEgc2FtZSBmaWxlIGFnYWluLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdHNbdHlwZV1bZmlsZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzLnB1c2goc3JjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZpbGVzLnB1c2goZm4pO1xuXG4gICAgICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxvYWRGaWxlKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWxlcmVmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVyZWYuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuICAgICAgICAgICAgICAgICAgICBmaWxlcmVmLnNldEF0dHJpYnV0ZSgnc3JjJywgZmlsZXNbaW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChmaWxlcmVmKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZWQgdG8gY2FsbCBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGZpbGVyZWYub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZEZpbGUoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9hZEZpbGUoMCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFBhdGg6IGZ1bmN0aW9uIGdldFBhdGgodHlwZSwgZmlsZU5hbWUpIHtcbiAgICAgICAgICAgIHZhciBvID0gaTE4blt0eXBlXTtcbiAgICAgICAgICAgIGlmICghbykge1xuICAgICAgICAgICAgICAgIHNiLmxvZygnZ2V0UGF0aDogZ2V0UGF0aCB0eXBlIGlzIGludmFsaWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBrID0gb1tmaWxlTmFtZV07XG4gICAgICAgICAgICBpZiAoIWspIHtcbiAgICAgICAgICAgICAgICBzYi5sb2coJ2dldFBhdGg6IGZpbGVOYW1lIGlzIGludmFsaWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrO1xuICAgICAgICB9LFxuICAgICAgICB2aWV3UG9ydFN3aXRjaDogZnVuY3Rpb24gdmlld1BvcnRTd2l0Y2goY2FsbEJhY2tGdW5jKSB7XG4gICAgICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhO1xuICAgICAgICAgICAgdmFyIHByb2R1Y3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBmaWxlc1RvTG9hZDtcbiAgICAgICAgICAgIC8vIE1vYmlsZS9UYWJsZXQgTG9naWNcbiAgICAgICAgICAgIGlmICgvaVBob25lfGlQb2R8aVBhZHxBbmRyb2lkfEJsYWNrQmVycnl8T3BlcmEgTWluaXxJRU1vYmlsZS8udGVzdCh1YSkpIHtcbiAgICAgICAgICAgICAgICAvLyBNb2JpbGUvVGFibGV0IENTUyBhbmQgSmF2YVNjcmlwdCBmaWxlcyB0byBsb2FkXG4gICAgICAgICAgICAgICAgZmlsZXNUb0xvYWQgPSB7XG4gICAgICAgICAgICAgICAgICAgICdqcyc6IFtdLFxuICAgICAgICAgICAgICAgICAgICAnY3NzJzogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGVza3RvcCBMb2dpY1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRGVza3RvcCBDU1MgYW5kIEphdmFTY3JpcHQgZmlsZXMgdG8gbG9hZFxuICAgICAgICAgICAgICAgIGZpbGVzVG9Mb2FkID0ge1xuICAgICAgICAgICAgICAgICAgICAnanMnOiBbXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzYi5sb2FkRmlsZXMoZmlsZXNUb0xvYWQuanMsIGNhbGxCYWNrRnVuYyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNhdmVEYXRhOiBmdW5jdGlvbiBzYXZlRGF0YShwYXlsb2FkKSB7XG4gICAgICAgICAgICB2YXIgcG9wdXBEYXRhID0gc2IuZ2V0UG9wdXBEYXRhKCk7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBwb3B1cERhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmFwcGVuZChrZXksIHBvcHVwRGF0YVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBheWxvYWQuZGF0YSA9IHBvcHVwRGF0YTtcbiAgICAgICAgICAgIGFqYXhDYWxsKHBheWxvYWQpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRVcmw6IGZ1bmN0aW9uIGdldFVybChwKSB7XG4gICAgICAgICAgICBpZiAocC5jb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAuY29sbGVjdGlvbi51cmw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHAubW9kZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5tb2RlbC51cmxSb290O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwLnVybCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwLnVybDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgYWpheENhbGw6IGZ1bmN0aW9uIGFqYXhDYWxsKHBheWxvYWQpIHtcbiAgICAgICAgICAgICQuYWpheFNldHVwKHtcbiAgICAgICAgICAgICAgICBjYWNoZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gdmFyIHVybCA9IHBheWxvYWQudXJsIHx8IGNvbGxlY3Rpb24udXJsUm9vdCB8fCBjb2xsZWN0aW9uLnVybDtcbiAgICAgICAgICAgIHZhciB1cmwgPSBzYi5nZXRVcmwocGF5bG9hZCk7XG4gICAgICAgICAgICAvLyBJZiBwbGFpbkRhdGEgaXMgdHJ1ZSwgZG9uJ3QgYWRkIHNlc3Npb24gSWQuIFRoaXMgYXNzdW1lcyB0aGUgc2Vzc2lvbiBpZCBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkLlxuICAgICAgICAgICAgaWYgKHBheWxvYWQucGxhaW5EYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBwYXlsb2FkLmRhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gc2IuZ2V0U3RhbmRhcmREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiBwYXlsb2FkLmRhdGFcbiAgICAgICAgICAgICAgICB9KS5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2V0dGluZyBkZWZhdWx0IHZhbHVlcyB0byB0aGUgYWpheCBwcm9wZXJ0aWVzXG4gICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSBwYXlsb2FkLmNvbnRlbnRUeXBlLFxuICAgICAgICAgICAgICAgIHByb2Nlc3NEYXRhID0gcGF5bG9hZC5wcm9jZXNzRGF0YTtcbiAgICAgICAgICAgIGlmIChjb250ZW50VHlwZSA9PT0gdW5kZWZpbmVkIHx8IGNvbnRlbnRUeXBlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29udGVudFR5cGUgPSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9jZXNzRGF0YSA9PT0gdW5kZWZpbmVkIHx8IHByb2Nlc3NEYXRhID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc0RhdGEgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBamF4IGNhbGxcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICB0eXBlOiBwYXlsb2FkLnR5cGUgfHwgJ0dFVCcsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBwcm9jZXNzRGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiBzdWNjZXNzKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXlsb2FkLmV4Y2x1ZGVEdW1wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNiLnNldER1bXAocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLnN1Y2Nlc3MocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24uYXNzaWduKERPTUFJTl9ST09UX1VSTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY2F0Y2goZXgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2F0Y2hpbmcgdGhlIGV4Y2VwdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2IubG9nKFwiQmVsb3cgZXJyb3IgaXMgaW4gYWpheCByZXNwb25zZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJlY3RpbmcgdG8gdGhlIERhc2hib2FyZFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0RHVtcDogZnVuY3Rpb24gc2V0RHVtcChvYmopIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBvYmouY29tbWFuZC5zbGljZSgzKS50b0xvd2VyQ2FzZSgpOyAvLyByZW1vdmluZyBcImdldFwiIHByZWZpeFxuICAgICAgICAgICAgdmFyIGR1bXAgPSBLZW5zZW8uZGF0YVtrZXldO1xuICAgICAgICAgICAgaWYgKG9iai5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBvYmouZGF0YVtpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkdW1wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkdW1wID0ge307XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZHVtcFtkYXRhLmlkXSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIEtlbnNlby5kYXRhW2tleV0gPSBkdW1wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRSZWxhdGl2ZVBhdGg6IGZ1bmN0aW9uIGdldFJlbGF0aXZlUGF0aChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBET01BSU5fUk9PVF9VUkwgKyBzdHI7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFN0YW5kYXJkRGF0YTogZnVuY3Rpb24gZ2V0U3RhbmRhcmREYXRhKHApIHtcbiAgICAgICAgICAgIHAgPSBwIHx8IHt9O1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBfLmNsb25lRGVlcChwLmRhdGEpO1xuICAgICAgICAgICAgaWYgKHAuZGF0YSkge1xuICAgICAgICAgICAgICAgIHAuZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWQ6IEtlbnNlby5jb29raWUuc2Vzc2lvbmlkKClcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogS2Vuc2VvLnBhcmFtcy5nZXRQYXJhbXMoZGF0YSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyWFRlbXBsYXRlOiBmdW5jdGlvbiByZW5kZXJYVGVtcGxhdGUoX3RoaXMsIHBheWxvYWQpIHtcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xuICAgICAgICAgICAgcGF5bG9hZCA9IHBheWxvYWQgfHwge307XG4gICAgICAgICAgICB2YXIgY29sU3RyID0gX3RoaXMuY29sU3RyO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBfdGhpcy5kYXRhO1xuICAgICAgICAgICAgaWYgKGNvbFN0cikge1xuICAgICAgICAgICAgICAgIHZhciBjb2xsZWN0aW9uID0gbmV3IEtlbnNlby5jb2xsZWN0aW9uc1tjb2xTdHJdKCk7XG4gICAgICAgICAgICAgICAgc2IuZmV0Y2goY29sbGVjdGlvbiwgZGF0YSwgZnVuY3Rpb24gKGNvbGxlY3Rpb24sIHJlc3BvbnNlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIF8uZWFjaCh4LmRhdGEsIF90aGlzLnJlbmRlckFydGVmYWN0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXlsb2FkLmV4Y2x1ZGVEdW1wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5zZXREdW1wKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMucHJlTG9hZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5wcmVMb2FkZXIocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSAkKF90aGlzLmVsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbCB8fCAhZWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbCA9ICQoX3RoaXMuJGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjID0gbmV3IEtlbnNlby5jb2xsZWN0aW9uc1tjb2xTdHJdKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5lYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFydGVmYWN0ID0gX3RoaXMuaXRlbVZpZXcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmFwcGVuZChhcnRlZmFjdC5yZW5kZXIoKS4kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5odG1sKHNiLm5vSXRlbXNUZW1wbGF0ZShwYXlsb2FkKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbm9JdGVtc1RlbXBsYXRlOiBmdW5jdGlvbiBub0l0ZW1zVGVtcGxhdGUocCkge1xuICAgICAgICAgICAgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGVzWyduby1pdGVtcyddKSh7XG4gICAgICAgICAgICAgICAgZGF0YTogcC5ub0RhdGEgfHwge31cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXJUZW1wbGF0ZTogZnVuY3Rpb24gcmVuZGVyVGVtcGxhdGUocCkge1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gdGVtcGxhdGVzW3AudGVtcGxhdGVOYW1lXTtcbiAgICAgICAgICAgIC8vIFNldHRpbmcgdGhlIHZpZXcncyB0ZW1wbGF0ZSBwcm9wZXJ0eSB1c2luZyB0aGUgVW5kZXJzY29yZSB0ZW1wbGF0ZSBtZXRob2RcbiAgICAgICAgICAgIC8vIEJhY2tib25lIHdpbGwgYXV0b21hdGljYWxseSBpbmNsdWRlIFVuZGVyc2NvcmUgcGx1Z2luIGluIGl0LlxuICAgICAgICAgICAgdmFyIGNvbXBpbGVyID0gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICB2YXIgdXJsID0gc2IuZ2V0VXJsKHApO1xuICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgIHNiLmFqYXhDYWxsKHtcbiAgICAgICAgICAgICAgICAgICAgJ3VybCc6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiBwLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJzogZnVuY3Rpb24gc3VjY2VzcyhvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwLnRlbXBsYXRlSG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocC5hcHBlbmQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLnRlbXBsYXRlSG9sZGVyLmFwcGVuZChjb21waWxlcihvYmopKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC50ZW1wbGF0ZUhvbGRlci5odG1sKGNvbXBpbGVyKG9iaikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwLmNhbGxiYWNrZnVuYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuY2FsbGJhY2tmdW5jKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYocC5hcHBlbmQpe1xuICAgICAgICAgICAgICAgICAgICBwLnRlbXBsYXRlSG9sZGVyLmFwcGVuZChjb21waWxlcihwLmRhdGEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcC50ZW1wbGF0ZUhvbGRlci5odG1sKGNvbXBpbGVyKHAuZGF0YSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocC5jYWxsYmFja2Z1bmMpIHtcbiAgICAgICAgICAgICAgICAgICAgcC5jYWxsYmFja2Z1bmMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNldFRlbXBsYXRlOiBmdW5jdGlvbihzdHIsIGRhdGEpe1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgICAgICByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZXNbc3RyXSkoZGF0YSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldERhdGU6IGZ1bmN0aW9uIGdldERhdGUodGltZSkge1xuICAgICAgICAgICAgLy8gUmVmZXI6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEwNTg5NzkxLzE1NzczOTZcbiAgICAgICAgICAgIC8vIFJlZmVyOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMzUzNzExLzE1NzczOTZcbiAgICAgICAgICAgIHZhciBkYXRlVGltZSA9IG5ldyBEYXRlKHRpbWUgfHwgbnVsbCk7XG4gICAgICAgICAgICAvLyBWYWxpZCBkYXRlXG4gICAgICAgICAgICBpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0ZVRpbWUpID09PSBcIltvYmplY3QgRGF0ZV1cIiAmJiAhaXNOYU4oZGF0ZVRpbWUuZ2V0VGltZSgpKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGVUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSW52YWxpZCBkYXRlXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8vIFJlZmVyOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zMDc1ODkzLzE1NzczOTZcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRpbWUuc3BsaXQoL1stIDpdLyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHRbMF0sIHRbMV0gLSAxLCB0WzJdLCB0WzNdLCB0WzRdLCB0WzVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGltZUZvcm1hdDogZnVuY3Rpb24gdGltZUZvcm1hdCh0aW1lLCBPbmx5VGltZSwgT25seURheXMpIHtcbiAgICAgICAgICAgIHZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG4gICAgICAgICAgICB2YXIgdGhlRGF0ZSA9IHNiLmdldERhdGUodGltZSk7XG4gICAgICAgICAgICB2YXIgY3VycmVudERhdGUgPSBzYi5nZXREYXRlKCk7XG5cbiAgICAgICAgICAgIHZhciB5ZWFyID0gdGhlRGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgdmFyIG1vbnRoID0gdGhlRGF0ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgdmFyIGRheSA9IHRoZURhdGUuZ2V0RGF0ZSgpO1xuXG4gICAgICAgICAgICB2YXIgY3VycmVudFllYXIgPSBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRNb250aCA9IGN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB2YXIgY3VycmVudERheSA9IGN1cnJlbnREYXRlLmdldERhdGUoKTtcbiAgICAgICAgICAgIHZhciByZXN1bHREYXRlRm9ybWF0ID0gJyc7XG4gICAgICAgICAgICB2YXIgdGV4dCA9ICcnO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRZZWFyICE9PSB5ZWFyKSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IE9ubHlUaW1lID8gJycgOiAnT24gJztcbiAgICAgICAgICAgICAgICByZXN1bHREYXRlRm9ybWF0ID0gdGV4dCArIGRheSArICcgJyArIG1vbnRoc1ttb250aF0gKyAnICcgKyB5ZWFyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtb250aCA9PT0gY3VycmVudE1vbnRoICYmIGRheSA9PT0gY3VycmVudERheSkge1xuICAgICAgICAgICAgICAgIHRleHQgPSBPbmx5VGltZSA/ICcnIDogJ0AgJztcbiAgICAgICAgICAgICAgICBpZiAoT25seURheXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0RGF0ZUZvcm1hdCA9IHRleHQgKyBkYXkgKyAnICcgKyBtb250aHNbbW9udGhdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdERhdGVGb3JtYXQgPSB0ZXh0ICsgc2IuZ2V0VGltZSh0aW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRleHQgPSBPbmx5VGltZSA/ICcnIDogJ09uICc7XG4gICAgICAgICAgICAgICAgcmVzdWx0RGF0ZUZvcm1hdCA9IHRleHQgKyBkYXkgKyAnICcgKyBtb250aHNbbW9udGhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdERhdGVGb3JtYXQ7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEhvdXJzOiBmdW5jdGlvbih0aW1lKXtcbiAgICAgICAgICAgIHZhciBoaCA9IChcIjBcIiArIHNiLmdldFRpbWUodGltZSkucmVwbGFjZShcIjogXCIsIFwiOlwiKSkuc2xpY2UoLTgpO1xuICAgICAgICAgICAgdmFyIGhoVmFsdWUgPSBoaC5zbGljZSgwLCAtMyk7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAraGhWYWx1ZS5zcGxpdChcIjpcIilbMF07XG4gICAgICAgICAgICBpZigvcG0vaS50ZXN0KGhoKSl7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIDExO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoaFZhbHVlLnJlcGxhY2UoL15cXGRcXGQvLCAoXCIwXCIgKyB2YWx1ZSkuc2xpY2UoLTIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGltZTogZnVuY3Rpb24gZ2V0VGltZSh0aW1lKSB7XG4gICAgICAgICAgICB2YXIgZnVsbERhdGUgPSBzYi5nZXREYXRlKHRpbWUpO1xuICAgICAgICAgICAgdmFyIGhvdXJzID0gZnVsbERhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgIHZhciBtaW51dGVzID0gKCcwJyArIGZ1bGxEYXRlLmdldE1pbnV0ZXMoKSkuc2xpY2UoLTIpO1xuICAgICAgICAgICAgaWYgKGhvdXJzID4gMTEpIHtcbiAgICAgICAgICAgICAgICBob3VycyA9ICgnMCcgKyAoaG91cnMgLSAxMikpLnNsaWNlKC0yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG91cnMgKyAnOiAnICsgbWludXRlcyArICcgUE0nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaG91cnMgKyAnOiAnICsgbWludXRlcyArICcgQU0nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRUaW1lWm9uZTogZnVuY3Rpb24gZ2V0VGltZVpvbmUoKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gc2IuZ2V0RGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgICAgICAgICB2YXIgb3BlcmF0aW9uID0gb2Zmc2V0IDwgMCA/ICdmbG9vcicgOiAnY2VpbCc7XG4gICAgICAgICAgICB2YXIgc2lnbiA9IG9mZnNldCA8IDAgPyAnKycgOiAnLSc7XG4gICAgICAgICAgICByZXR1cm4gc2lnbiArICgnMDAnICsgTWF0aFtvcGVyYXRpb25dKE1hdGguYWJzKG9mZnNldCAvIDYwKSkpLnNsaWNlKC0yKSArICc6JyArICgnMDAnICsgTWF0aC5hYnMob2Zmc2V0ICUgNjApKS5zbGljZSgtMik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldERheVRpbWU6IGZ1bmN0aW9uIGdldERheVRpbWUodGltZSkge30sXG4gICAgICAgIGdldERheVdpc2VEYXRhOiBmdW5jdGlvbiBnZXREYXlXaXNlRGF0YShkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3RGF0YSA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IGRhdGFbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aW1lID0gc2IudGltZUZvcm1hdChkLnRpbWUsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW5ld0RhdGFbdGltZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGFbdGltZV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGFbdGltZV0ucHVzaChkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGFbdGltZV0ucHVzaChkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRQb3B1cHNJbmZvOiBmdW5jdGlvbiBnZXRQb3B1cHNJbmZvKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiBLZW5zZW8ucG9wdXBzLmdldFBvcHVwc0luZm8oaW5mbyk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE92ZXJsYXlzSW5mbzogZnVuY3Rpb24gZ2V0T3ZlcmxheXNJbmZvKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiBLZW5zZW8ub3ZlcmxheXMuZ2V0T3ZlcmxheXNJbmZvKGluZm8pO1xuICAgICAgICB9LFxuICAgICAgICBnZXREeW5hbWljRGF0YTogZnVuY3Rpb24gZ2V0RHluYW1pY0RhdGEoc3RyLCBpZCkge1xuICAgICAgICAgICAgdmFyIGtleSA9IEtlbnNlby5kYXRhW3N0cl07XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleVtpZF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNiLmxvZygncHJvdmlkZSB2YWxpZCBrZXkgaWQgcGFpcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZXRQYWdlRGF0YTogZnVuY3Rpb24gc2V0UGFnZURhdGEodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIEtlbnNlby5wYWdlLmRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBLZW5zZW8ucGFnZS5kYXRhID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldFBhZ2VEYXRhOiBmdW5jdGlvbiBnZXRQYWdlRGF0YShrZXkpIHtcbiAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gS2Vuc2VvLnBhZ2UuZGF0YVtrZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gS2Vuc2VvLnBhZ2UuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UG9wdXBEYXRhOiBmdW5jdGlvbiBnZXRQb3B1cERhdGEoa2V5KSB7XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEtlbnNlby5wb3B1cC5kYXRhW2tleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBLZW5zZW8ucG9wdXAuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0UG9wdXBEYXRhOiBmdW5jdGlvbiBzZXRQb3B1cERhdGEodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIEtlbnNlby5wb3B1cC5kYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgS2Vuc2VvLnBvcHVwLmRhdGEgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW5zZXJ0UG9wdXBEYXRhOiBmdW5jdGlvbigkZWxlbSl7XG4gICAgICAgICAgICB2YXIga2V5ID0gJGVsZW0uZGF0YSgna2V5Jyk7XG4gICAgICAgICAgICB2YXIgaWQgPSAkZWxlbS5kYXRhKCdpZCcpO1xuICAgICAgICAgICAgaWYoa2V5ICYmIGlkKXtcbiAgICAgICAgICAgICAgICBLZW5zZW8ucG9wdXAuZGF0YSA9IEtlbnNlby5kYXRhW2tleV1baWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzYi5sb2coXCJkYXRhLWhvbGRlciBjbGFzcyBpcyBwcm92aWRlZCBidXQgbm90IGl0cyBkZXBlbmRlbnQgYXR0cmlidXRlczogZGF0YS1rZXkgYW5kIGRhdGEtaWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG5hdmlnYXRlOiBmdW5jdGlvbiBuYXZpZ2F0ZShzdHIsIGVsKSB7XG4gICAgICAgICAgICB2YXIgJHNlbGYgPSAkKGVsKTtcbiAgICAgICAgICAgIC8vIHZhciBrZXkgPSAkc2VsZi5kYXRhKFwia2V5XCIpO1xuICAgICAgICAgICAgLy8gdmFyIGlkID0gJHNlbGYuZGF0YShcImlkXCIpO1xuICAgICAgICAgICAgLy8gaWYoa2V5KXtcbiAgICAgICAgICAgIC8vIFx0Ly8gU3RvcmluZyB0aGUgY3VycmVudCBkdW1wIGRhdGEgaW4gcG9wdXAncyBkYXRhXG4gICAgICAgICAgICAvLyAgICAgS2Vuc2VvW3N0cl0uZGF0YSA9IEtlbnNlby5kYXRhW2tleV1baWRdO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgaWYgKHN0ciA9PSAncG9wdXAnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNlbGYuZGF0YSgnaW5kZXgnKSB8fCAwO1xuICAgICAgICAgICAgICAgICQoJy5wb3B1cC1jb250YWluZXInKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvblR5cGUgPSAkc2VsZi5kYXRhKCd1cmwnKTtcbiAgICAgICAgICAgICAgICAvLyBJbXBvcnRhbnQ6IHRoaXMgc2hvdWxkIGJlIGNhbGxlZCBhZnRlciBkdW1wIG9iamVjdCBpcyBzdG9yZWQgaW4gdGhlIEtlbnNlby5wb3B1cC5kYXRhXG4gICAgICAgICAgICAgICAgS2Vuc2VvLnBvcHVwLmluZm8gPSBzYi5nZXRQb3B1cHNJbmZvKGFjdGlvblR5cGUpO1xuICAgICAgICAgICAgICAgIHNiLnNldFBvcHVwRGF0YShfLmNhbWVsQ2FzZShhY3Rpb25UeXBlKSwgJ2FjdGlvblR5cGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIEtlbnNlby5wb3B1cC5pbmZvID0gS2Vuc2VvLnBvcHVwLmluZm8uc2xpY2UoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNiLmNhbGxQb3B1cChpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdHIgPT0gJ292ZXJsYXknKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNlbGYuZGF0YSgnaW5kZXgnKSB8fCAwO1xuICAgICAgICAgICAgICAgICQoJy5wb3B1cC1jb250YWluZXInKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvblR5cGUgPSAkc2VsZi5kYXRhKCd1cmwnKTtcbiAgICAgICAgICAgICAgICAvLyBJbXBvcnRhbnQ6IHRoaXMgc2hvdWxkIGJlIGNhbGxlZCBhZnRlciBkdW1wIG9iamVjdCBpcyBzdG9yZWQgaW4gdGhlIEtlbnNlby5wb3B1cC5kYXRhXG4gICAgICAgICAgICAgICAgS2Vuc2VvLnBvcHVwLmluZm8gPSBzYi5nZXRPdmVybGF5c0luZm8oYWN0aW9uVHlwZSk7XG4gICAgICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKF8uY2FtZWxDYXNlKGFjdGlvblR5cGUpLCAnYWN0aW9uVHlwZScpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgS2Vuc2VvLnBvcHVwLmluZm8gPSBLZW5zZW8ucG9wdXAuaW5mby5zbGljZShpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2IuY2FsbFBvcHVwKGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FsbFBvcHVwOiBmdW5jdGlvbiBjYWxsUG9wdXAoaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciAkcG9wdXAgPSAkKCcucG9wdXAnKS5lcShpbmRleCk7XG4gICAgICAgICAgICBpZigkcG9wdXAubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAkKCcucG9wdXAnKS5hZGRDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgICAgICRwb3B1cC5yZW1vdmVDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAkKCcucG9wdXAnKS5hZGRDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgICAgIHZhciBpbmZvID0gS2Vuc2VvLnBvcHVwLmluZm9baW5kZXhdO1xuICAgICAgICAgICAgICAgIF8uZXh0ZW5kKGluZm8sIHsnaW5kZXgnOiBpbmRleH0pO1xuICAgICAgICAgICAgICAgIHNiLnJlbmRlclRlbXBsYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgJ3RlbXBsYXRlTmFtZSc6IGluZm8ucGFnZV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAndGVtcGxhdGVIb2xkZXInOiAkKCcucG9wdXAtY29udGFpbmVyJyksXG4gICAgICAgICAgICAgICAgICAgICdhcHBlbmQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAnZGF0YSc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJzogaW5mb1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8uY2FsbGJhY2tmdW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZm8uY2FsbGJhY2tmdW5jKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0b29sYm94OiB7XG4gICAgICAgICAgICB0ZXh0Qm94OiBmdW5jdGlvbiB0ZXh0Qm94KGRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZXNbJ3RleHRib3gnXSkoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnV0dG9uczogZnVuY3Rpb24gYnV0dG9ucyhkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGVzWydidXR0b25zJ10pKGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJ1dHRvbjogZnVuY3Rpb24gYnV0dG9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlc1snYnV0dG9uJ10pKGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbWJvQm94OiBmdW5jdGlvbiBjb21ib0JveChkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGVzWydjb21ib2JveCddKSh7XG4gICAgICAgICAgICAgICAgICAgICdkYXRhJzogZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFwcGx5Q29tYm9Cb3g6IGZ1bmN0aW9uIGFwcGx5Q29tYm9Cb3goZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBjb21ib2JveCA9IG5ldyBjb21ib0JveChkYXRhLmVsZW0sIGRhdGEuZGF0YSwgZGF0YS5zZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgY29tYm9ib3gub25jaGFuZ2UgPSBkYXRhLm9uY2hhbmdlO1xuICAgICAgICAgICAgICAgIGNvbWJvYm94Lmluc2VydEFmdGVyID0gZGF0YS5pbnNlcnRBZnRlcjtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tYm9ib3g7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hlY2tib3g6IGZ1bmN0aW9uIGNoZWNrYm94KGRhdGEpe1xuICAgICAgICAgICAgICAgIHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlc1snY2hlY2tib3gnXSkoe2RhdGE6IGRhdGEgfHwge319KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcGFnZToge30sXG4gICAgICAgIG92ZXJsYXk6IHt9LFxuICAgICAgICBmZXRjaDogZnVuY3Rpb24gZmV0Y2goY29sbGVjdGlvbiwgZGF0YSwgZnVuYykge1xuICAgICAgICAgICAgY29sbGVjdGlvbi5mZXRjaChzYi5nZXRTdGFuZGFyZERhdGEoe1xuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9LFxuICAgICAgICByZWdpc3RlckRhdGE6IGZ1bmN0aW9uIHJlZ2lzdGVyRGF0YSgpIHtcbiAgICAgICAgICAgIHZhciAkZmllbGRTZWN0aW9uID0gJCgnLnBvcHVwJykuZmluZCgnLmZpZWxkLXNlY3Rpb24nKTtcbiAgICAgICAgICAgIGlmICgkZmllbGRTZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRmaWVsZFNlY3Rpb24uZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFwiZGF0YS1pZ25vcmVcIiBhdHRyaWJ1dGUgaWYgYXBwbGllZCB0byB0aGUgZmllbGQgc2VjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGZpZWxkcyB2YWx1ZSB3aWxsIG5vdCBiZSBzYXZlZCBpbiBQT1NUIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzZWxmLmRhdGEoJ2lnbm9yZScpICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAncHJvcGVydHknIHZhcmlhYmxlIHNwZWNpZmllcyB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9ICRzZWxmLmRhdGEoJ25hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkY29tYm9ib3ggPSAkc2VsZi5maW5kKCcuY29tYm9ib3gnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkdGV4dCA9ICRzZWxmLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGNoZWNrYm94ID0gJHNlbGYuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHRleHRBcmVhID0gJHNlbGYuZmluZCgndGV4dGFyZWEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZHJvcGRvd24gPSAkc2VsZi5maW5kKCdzZWxlY3QnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzQXJyYXkgPSAkc2VsZi5kYXRhKCdhcnJheScpID09PSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRjb21ib2JveC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJyVmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJyYXlJZHMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkc3ZOYW1lID0gJGNvbWJvYm94LmZpbmQoJy5zdi1uYW1lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRzdk5hbWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdk5hbWUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cnMgPSB0aGlzLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbYXR0ci5uYW1lXSA9IGF0dHIudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubmFtZSA9ICQodGhpcykuaHRtbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyVmFsdWUucHVzaChvYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiBSZW1vdmUgYXJyYXlJZHMgY29uY2VwdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlJZHMucHVzaCgkKHRoaXMpLmRhdGEoJ2lkJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0dGluZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEoYXJyVmFsdWUsIHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNiLnNldFBvcHVwRGF0YShhcnJheUlkcywgcHJvcGVydHkgKyAnSWRzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCR0ZXh0Lmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHJzID0gJHRleHRbMF0uYXR0cmlidXRlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ialthdHRyLm5hbWVdID0gYXR0ci52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubmFtZSA9ICR0ZXh0LnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJWYWx1ZS5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldHRpbmdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKGFyclZhbHVlLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEoYXJyYXlJZHMsIHByb3BlcnR5ICsgJ0lkcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICR0ZXh0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cnMgPSB0ZXh0LmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbYXR0ci5uYW1lXSA9IGF0dHIudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai52YWx1ZSA9IHRleHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0dGluZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKG9iaiwgcHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJGNoZWNrYm94Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcnJWYWx1ZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcnJheUlkcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjaGVja2JveC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHJzID0gdGhpcy5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdHRyID0gYXR0cnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JqLm5hbWUgPSAkKHRoaXMpLmh0bWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFyclZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR1bXAgPSBzYi5nZXRQb3B1cERhdGEocHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZHVtcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdW1wID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1bXAucHVzaChvYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNiLnNldFBvcHVwRGF0YShkdW1wLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyclZhbHVlLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0dGluZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFzQXJyYXkgJiYgcHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Iuc2V0UG9wdXBEYXRhKGFyclZhbHVlLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkdGV4dEFyZWEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHRhcmVhID0gJHRleHRBcmVhWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0cnMgPSB0ZXh0YXJlYS5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoudmFsdWUgPSB0ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXR0aW5nc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEob2JqLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkZHJvcGRvd24ubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHJvcGRvd24gPSAkZHJvcGRvd25bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdHRycyA9IGRyb3Bkb3duLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbYXR0ci5uYW1lXSA9IGF0dHIudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gJ3RvVGltZScgfHwgcHJvcGVydHkgPT09ICdmcm9tVGltZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnZhbHVlID0gJ1QnICsgZHJvcGRvd24udmFsdWUgKyAnOjAwLjAwMCcgKyBzYi5nZXRUaW1lWm9uZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai52YWx1ZSA9IGRyb3Bkb3duLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXR0aW5nc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYi5zZXRQb3B1cERhdGEob2JqLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTsiXX0=