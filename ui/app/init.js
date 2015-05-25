var Kenseo = {
    views: {},
    models: {},
    collections: {},
    currentModel: {},
    dropdown: {},
    data: {},
    popup: {"info":{},"data":{}, "replace": {}},
    overlays: {"info":{},"data":{}},
    page: {"info":{},"data": {}},
    cookie: {
        sessionid: function(){
            return Cookie.getCookie('DivamiKenseoSID')
        }
    },
    init: function(){
		sb.viewPortSwitch(function(){
			var router = new Router();
		});
    }
};

$(function(){
	Kenseo.init();
});
