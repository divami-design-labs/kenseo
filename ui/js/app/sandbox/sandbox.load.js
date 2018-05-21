/*
 * This sandbox module has functions which are useful to load js, svg and css files with loader functionality
 */
var sb = {
    getModulePath: function(moduleType, moduleName) {
        // return 'js/app/modules/' + moduleType + '/' + moduleName + _.capitalize(moduleType).substring(0, moduleType.length - 1) + '.js';
        return 'ui/js/app/modules/' + moduleName + '.js';
    },
    // Function to load files in sequence (useful to consider dependency).
    // TO DO: Sometimes, this function is loading files not in dependency sequence
    loadFiles: function loadFiles(payload, fn, hasSplash) {
        var scripts = {
            'modules': {},
            'files': {},
            'svgs': {},
            'css' : {}
        };
        hasSplash = true;
        var files = [];
        var types = ['files', 'modules', 'svgs', 'css'];
        types.forEach(function(type){
            if (payload[type]) {
                var items = payload[type];
                items.forEach(function(file){

                    // Checking the file whether it is already loaded or not.
                    if (!scripts[type][file]) {
                        var src = type === 'files' ? file : sb.getModulePath(type, file);
                        // Setting the loaded flag to true to avoid loading a same file again.
                        scripts[type][file] = true;
                        files.push(src);
                    }
                });
            }
        });
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
    },
    //redirecting to the path specified to function
    redirectTo: function(value){
        var a = document.createElement('a');
        a.href = value;
        window.location.href = a.href;
    },
    viewPortSwitch: function viewPortSwitch(callBackFunc) {
        var ua = navigator.userAgent || navigator.vendor || window.opera;
        var production = false;
        var filesToLoad;
        // Mobile/Tablet Logic
        if (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/.test(ua)) {
            // Mobile/Tablet CSS and JavaScript files to load
            filesToLoad = {
                'js': [],
                'css': []
            };
        }
        // Desktop Logic
        else {
            // Desktop CSS and JavaScript files to load
            filesToLoad = {
                'js': {
                    // 'files': ['js/app/config/sandbox.postcall.js']
                }
            };
        }
        sb.loadFiles(filesToLoad.js, callBackFunc);
    },

    svgLoader: function(svgs){
        svgs = _.difference(svgs, Kenseo.alreadyLoadedSVGs);
        svgs.forEach(function(svg){
            var scripts = document.getElementsByTagName('script')
            var script = scripts[scripts.length - 1]
            var xhr = new XMLHttpRequest()
            xhr.onload = function (response) {
                // If success
                // srcElement is for chrome and IE
                // originalTarget is for Firefox
                var target = response.srcElement || response.originalTarget;
                var statusText = target.statusText.toLowerCase();
                // If success
                // statusText will not be "ok" but empty string in ios safari.
                if(statusText == "ok" || statusText == "" ){
                    var div = document.createElement('div')
                    div.innerHTML = this.responseText
                    div.style.display = 'none'
                    script.parentNode.insertBefore(div, script)
                }
            }
            xhr.open('get', 'ui/assets/imgs/'+ svg +'.svg', true)
            xhr.send()
        })
        Kenseo.alreadyLoadedSVGs = _.union(Kenseo.alreadyLoadedSVGs, svgs);
    }
}

//loaading the necessary files

sb.loadFiles({
    svgs: [],
    files: [
        'ui/js/libs/jquery.js',
        'ui/js/libs/lodash.js',
        'ui/js/libs/backbone.js',
        'ui/js/libs/cookie.js',
        'ui/js/libs/zebra_datepicker.src.js',
        'ui/js/libs/moment.js',
        'ui/js/libs/jquery.daterangepicker.js',

        'ui/js/libs/pdfjs/pdf.js',
        'ui/js/libs/pdfjs/pdf.worker.js',
        'ui/js/libs/pdfjs/viewer.js',
        'ui/js/libs/chosen.jquery.min.js',

        'ui/js/libs/html2canvas.js',
        'ui/js/libs/jspdf/jspdf.js',
        'ui/js/libs/jspdf/from_html.js',
        'ui/js/libs/jspdf/add_image.js',
        'ui/js/libs/jspdf/png_support.js',
        'ui/js/libs/jspdf/png_support/png.js',
        'ui/js/libs/jspdf/png_support/zlib.js',
        'ui/js/libs/jspdf/split_text_to_size.js',
        'ui/js/libs/jspdf/standard_fonts_metrics.js',
        'ui/js/libs/jspdf/FileSaver.js',

        'ui/js/app/sandbox/sandbox.utils.js',
        'ui/js/app/sandbox/sandbox.ajax.js',
        'ui/js/app/sandbox/sandbox.time.js',
        'ui/js/app/sandbox/sandbox.popup.js',
        'ui/js/app/sandbox/sandbox.router.js',
        'ui/js/app/sandbox/sandbox.overlay.js',
        'ui/js/app/sandbox/sandbox.slider.js',
        'ui/js/app/sandbox/sandbox.refresh.js',
        'ui/js/app/sandbox/sandbox.postcall.js',
        'ui/js/app/sandbox/sandbox.params.js',
        'ui/js/app/sandbox/sandbox.meeting.js',

        'ui/js/app/config/router.js',
        'ui/js/app/config/init.js',
        'ui/js/app/config/dynamic-events.js',
        // 'ui/js/app/config/params.js',
        'ui/js/app/config/i18n.js',
        'ui/js/app/config/popups.js',
        'ui/js/app/config/slider.js',
        'ui/js/app/config/overlays.js',

        'ui/templates.js',
        'ui/js/app/components/upload.js',
        'ui/js/app/components/validation.js',
        'ui/js/app/components/combobox.js',
        'ui/js/app/components/html.js',
        'ui/js/app/components/texteditor.js',
        'ui/js/app/components/annotator.js',
        'ui/js/app/components/persona-builder.js',
        'ui/js/app/components/sliderComponent.js',
        'ui/js/app/components/filter.js',
        'ui/js/app/components/custom-panning.js'
    ],
    modules: [
        'Header', 'Artefacts', 'Activities',
        'Projects', 'Notifications', 'People',
        'Search', 'Tags', 'DocumentView','ProjectPage',
        'Comments', 'Threads', 'Meetings', 'versions'
    ]
}, function(){
    Kenseo.init();
})
