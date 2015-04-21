var Kenseo = {
    views: {},
    models: {},
    collections: {},
    popup: {},
    cookie: {
        userid: function(){
            return Cookie.getCookie('DivamiKenseoUserID');
        } ,
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
