_.extend(sb, {
    //unused function
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
        //providing throbber during ajax call
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
                    //removing throbber on succcess of ajax call
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
    //unused function
    ajaxCalls: function(payloads, callback){
        payloads.map(function(payload){
            return sb.ajaxCall(payload);
        });
        $.when.apply($, payloads).then(callback);
    },
    //storing the response data
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
            //storing data in kenseo object
            Kenseo.data[key] = dump;
        } else if(obj.data) {
            //storing data in kenseo object
            Kenseo.data[key] = obj.data;
        }
    },
    getRelativePath: function getRelativePath(str) {
      return DOMAIN_ROOT_URL + str;
    },
    //to validate session user
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
    //setting the template
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
                container: p.container,
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
    //show throbber while loading files
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
    },
    //timeout function for removing throbber
    throbberTimeOut: function(timeBeforeAjaxCall,responseFunction) {
        var timeAfterAjaxCall = Date.now();
        var responseTime = timeAfterAjaxCall - timeBeforeAjaxCall;
        var fixedTime = 1000;
        var timeForThrobber = fixedTime - responseTime;
        setTimeout(function() {
            responseFunction();
            $('.throbber').remove();
        }, timeForThrobber < 0 ? 0 : timeForThrobber);
    }
})
