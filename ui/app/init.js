var Kenseo = {
    views: {},
    models: {},
    collections: {},
    init: function(){
		sb.viewPortSwitch(function(){
			var router = new Router();
		});
    }
};

$(function(){
	Kenseo.init();
});
