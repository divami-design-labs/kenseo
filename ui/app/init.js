var Kenseo = {
    Dashboard: {},
    Header: {},
    Requests: {},
    Notifications: {},
    Projects: {},
    init: function(){
		sb.viewPortSwitch(function(){
			new Router();
		});
    }
};

$(function(){
	Kenseo.init();
});
