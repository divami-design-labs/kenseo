var sb = (function(){
	function log(msg){
		console.log(msg);
	}
	return {
		log: log,
		loadFiles: function(list, fn){
   			var counter = 0;
   			var head = document.head || document.getElementsByTagName("head")[0];
			for (var i = 0; i < list.length; i++) {
                var fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", list[i]);
                fileref.onload = function(){
                	counter++;
                	if(counter === list.length){
                		fn();
                	}
                }
                head.appendChild(fileref);
	        }
	        if(list.length === 0){
	        	fn();
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
		viewPortSwitch : function(callBackFunc){
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
	                'js': []
	            };
	        }
	        new sb.loadFiles(filesToLoad.js, callBackFunc);
	    },
	    renderTemplate: function(templateString, $el, model){
            var template = templates[templateString];
            // Setting the view's template property using the Underscore template method
            // Backbone will automatically include Underscore plugin in it.
            var compiler = _.template(template);
            model.fetch().then(function(x){
                // Dynamically updates the UI with the view's template
                $el.html(compiler(x));            
            });            
        }
	};
})();