var Kenseo = {
    views: {},
    models: {},
    collections: {},
    dropdown: {},
    popup: {"info":{},"data":{}},
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
