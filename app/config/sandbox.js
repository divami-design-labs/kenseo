var sb = (function(){
	function log(msg){
		console.log(msg);
	}
	return {
		log: log,
		bind: function(element, event, callbackFunc, context){
			if(context){
				element.on(event, callbackFunc.bind(context));
			}
			else{
				element.on(event, callbackFunc);	
			}
		},
		unbind: function(element, event, callbackFunc){
			if(!callbackFunc){callbackFunc = null;}
			element.off(event, callbackFunc);
		},
		loadFiles: function(payload, callbackFunc){
            var head = document.head || document.getElementsByTagName("head")[0];
            if(payload.js){
                var js = payload.js;
                for(var i = 0; i < js.length; i++){
                    var file = this.getPath("files", js[i]);
                    if(!file.loaded){
                        var fileref=document.createElement('script');
                        fileref.setAttribute("type","text/javascript");
                        fileref.setAttribute("src", file.path);
                        fileref.onreadystatechange = callbackFunc;
                        fileref.onload = callbackFunc;
                        head.appendChild(fileref);
                        file.loaded = true;
                    }
                }
            }
            if(payload.css){
                var css = payload.css;
                for(var i = 0; i < css.length; i++){
                    var file = this.getPath("files", css[i]);
                    if(!file.loaded){
                        var fileref=document.createElement('link');
                        fileref.setAttribute("rel","stylesheet");
                        fileref.setAttribute("type","text/css");
                        fileref.setAttribute("href", file.path);
                        head.appendChild(fileref);
                        file.loaded = true;
                    }
                }
            }
        },
        getPath: function(type, fileName){
			var o = i18n[type];
			if(!o){
				sb.log("getPath: getPath type is invalid");
			}
			var k = o[fileName];
			if(!k){
				sb.log("getPath: fileName is invalid");
			}
			return k;
		},
		viewPortSwitch : function(){
	        var ua = navigator.userAgent || navigator.vendor || window.opera;
	        var production = false;
	        // Mobile/Tablet Logic
	        if((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua)) {
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
	                'js': ['router']
	            };
	        }
	        return filesToLoad;
	    }
	};
})();