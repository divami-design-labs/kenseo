"use strict";

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
    document: {},
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
//# sourceMappingURL=init.js.map
