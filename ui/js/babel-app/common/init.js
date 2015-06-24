var Kenseo = {
    views: {},
    models: {},
    collections: {},
    currentModel: {},
    dropdown: {},
    data: {},
    popup: { "info": {}, "data": {}, "replace": {} },
    overlays: { "info": {}, "data": {} },
    page: { "info": {}, "data": {} },
    cookie: {
        sessionid: function sessionid() {
            return Cookie.getCookie("DivamiKenseoSID");
        }
    },
    init: function init() {
        sb.viewPortSwitch(function () {
            var router = new Router();
        });
    }
};

$(function () {
    Kenseo.init();
});