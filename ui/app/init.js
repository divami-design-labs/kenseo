var Kenseo = {
    views: {},
    models: {},
    collections: {},
    popup: {},
    init: function(){
		sb.viewPortSwitch(function(){
			var router = new Router();
		});
    }
};

$(function(){
	Kenseo.init();
});
