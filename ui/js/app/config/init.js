var Kenseo = {
    views: {},
    models: {},
    collections: {},
    controllers: {},
    currentModel: {},
    combobox: {},
    dropdown: {},
    data: {},
    popup: { "info": {}, "data": {}, "replace": {} },
    populate: {},
    alreadyLoadedSVGs: [],
    overlays: { "info": {}, "data": {} },
    sliders: {"data":{}},
    page: { "info": {}, "data": {} },
    current: {
        page: "",
        popup: ""
    },
    settings: {},
    document: {},
    cookie: {
        sessionid: function sessionid() {
            return Cookie.getCookie("DivamiKenseoSID");
        }
    },
    init: function init() {
        // sb.ajaxCall({
        //     'url': 'settings.json',
        //     excludeDump: true,
        //     processData: false,
        //     'success': function(response){
        //         Kenseo.settings = response.settings;
        //         sb.viewPortSwitch(function () {
        //             var router = new Router();
        //         });
        //     }
        // });
        $.ajax({
            "url": "ui/settings.json",
            "type": "GET",
            "success": function success(response) {
                try {
                    if (response.status == 'success') {
                        Kenseo.settings = response.settings;
                        sb.viewPortSwitch(function () {
                            var router = new Router();
                        });
                    } else {
                        //redirecting to root url on failure
                        window.location.assign(DOMAIN_ROOT_URL);
                    }
                } catch (ex) {
                    // Catching the exception
                    sb.log("Below error is in ajax request");
                    console.error(ex);
                }
            }
        });
    }
};
