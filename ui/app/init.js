var Kenseo = {
    Dashboard: {},
    Header: {},
    init: function(){
		sb.viewPortSwitch(function(){
			new Router();
		});
    }
};

$(function(){
	Kenseo.init();
});
