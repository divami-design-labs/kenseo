var sb = {
    getModulePath: function(moduleType, moduleName) {
        // return 'js/app/modules/' + moduleType + '/' + moduleName + _.capitalize(moduleType).substring(0, moduleType.length - 1) + '.js';
        return 'js/app/modules/' + moduleName + '.js';
    },
    // Function to load files in sequence (useful to consider dependency).
    // TO DO: Sometimes, this function is loading files not in dependency sequence
    loadFiles: function loadFiles(payload, fn, hasSplash) {
        var scripts = {
            'modules': {},
            'files': {},

            // @TODO: remove the below code
            'views': {},
            'models': {},
            'collections': {}
        };
        hasSplash = true;
        var files = [];
        var types = ['files', 'modules', 'views', 'models', 'collections'];
        for (var k = 0; k < types.length; k++) {
            var type = types[k];
            if (payload[type]) {
                var items = payload[type];
                for (var i = 0; i < items.length; i++) {
                    var file = items[i];

                    // Checking the file whether it is already loaded or not.
                    if (!scripts[type][file]) {
                        var src = type === 'files' ? file : sb.getModulePath(type, file);
                        // Setting the loaded flag to true to avoid loading a same file again.
                        scripts[type][file] = true;
                        files.push(src);
                    }
                }
            }
        }
        // files.push(fn);

        var head = document.head || document.getElementsByTagName('head')[0];
        function loadFile(index) {
            if (files.length > index) {
                if(hasSplash){
                    // Show splash screen on start of file loadings
                    if(index === 0){
                        sb.showSplashScreen();
                    }
                }
                var percentage = 100 - ((index/files.length) * 100) + "%";
                if(percentage === "100%"){
                    // debugger;
                }
                // console.log("percentage: ", percentage, index, files.length);
                sb.setSplashProgress(percentage);
                var fileref = document.createElement('script');
                fileref.setAttribute('type', 'text/javascript');
                fileref.setAttribute('src', files[index]);
                head.appendChild(fileref);
                index = index + 1;
                // Used to call a callback function
                fileref.onload = function () {
                    loadFile(index);
                };
            } else {
                // hide splash screen
                if(hasSplash){
                    sb.hideSplashScreen();
                }
                if(fn){
                    fn();
                }
            }
        }
        loadFile(0);
    },
    showSplashScreen: function(){
        // document.body.innerHTML = sb.setTemplate('splash-screen') + document.body.innerHTML;
    },
    setSplashProgress: function(value){
        var progressMove = document.getElementById('progressMove');
        progressMove.setAttribute('y', value);
    },
    hideSplashScreen: function(){
        var splashContainer = document.querySelector('.splash-screen-container');

        splashContainer.style.opacity = "0";
        setTimeout(function () {
            splashContainer.style.display = 'none';
        }, 1000);
    },
    loadCss: function(url){
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
}
//loaading the necessary files
sb.loadFiles({
    files: [
        'js/app/config/domain_urls.js',
        'js/libs/jquery.js',
        'js/libs/lodash.js',
        'js/libs/backbone.js',
        'js/libs/cookie.js',
        'js/libs/zebra_datepicker.src.js',
        'js/app/config/sandbox.js',
        'js/app/config/sandbox.popup.js',
        'js/app/config/sandbox.router.js',
        'js/app/config/sandbox.overlay.js',
        'js/app/config/sandbox.refresh.js',
        'js/app/common/router.js',
        'js/app/common/init.js',
        'js/app/config/sandbox.postcall.js',
        'templates.js',
        'js/app/common/dynamic-events.js',
        'js/app/common/params.js',
        'js/app/config/validation.js',
        'js/app/config/i18n.js',
        'js/app/config/popups.js',
        'js/app/config/overlays.js',
        'js/app/components/combobox.js',
        'js/app/components/html.js',
        'js/libs/chosen.jquery.min.js',
        'js/app/components/texteditor.js',
        'js/app/config/sandbox.meeting.js',
        'js/libs/pdfjs/pdf.js',
        'js/libs/pdfjs/pdf.worker.js',
        'js/libs/pdfjs/viewer.js',
        'js/app/components/annotator.js',
        'js/app/components/persona-builder.js',
        'js/app/components/sliderComponent.js'
    ],
    modules: [
        'Header', 'Artefacts', 'Activities', 'Projects', 'Notifications', 'People', 'Search', 'Tags'
    ]
}, function(){
    Kenseo.init();
})
