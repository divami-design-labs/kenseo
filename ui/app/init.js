var Kenseo = {
    views: {},
    models: {},
    collections: {},
    popup: {},
    cookie: {
        userid: Cookie.getCookie('DivamiKenseoUserID')
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
