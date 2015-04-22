var Kenseo = {
    views: {},
    models: {},
    collections: {},
    popup: {"info":{},"data":{}},
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
