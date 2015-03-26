var Kenseo = {
    View: {},
    Model: {},
    init: function(){
		sb.viewPortSwitch(function(){
			var router = new Router();
		});
    }
};

$(function(){
	Kenseo.init();
});
