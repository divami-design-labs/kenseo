var Kenseo = {
    Dashboard: {},
    Header: {},
    init: function(){
        sb.loadFiles(sb.viewPortSwitch(), function() {
            // Instantiates a new Desktop Router instance
            new Kenseo.Router();
        });
    }
};

Kenseo.init();