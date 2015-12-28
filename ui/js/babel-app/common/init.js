var Kenseo = {
    views: {},
    models: {},
    collections: {},
    currentModel: {},
    dropdown: {},
    data: {},
    popup: { "info": {}, "data": {}, "replace": {} },
    populate: {},
    overlays: { "info": {}, "data": {} },
    page: { "info": {}, "data": {} },
    current: {
        page: "",
        popup: ""
    },
    settings: {},
    document: {},
    cookie: {
        sessionid: function sessionid() {
            return Cookie.getCookie("DivamiKenseoSID");
        }
    },
    init: function init() {
        sb.ajaxCall({
            'url': 'settings.json',
            excludeDump: true,
            'success': function(response){
                Kenseo.settings = response.settings;
                sb.viewPortSwitch(function () {
                    var router = new Router();
                });                
            }
        })
    }
};

$(function () {
    Kenseo.init();
});