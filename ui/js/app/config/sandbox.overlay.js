sb.overlay = {
	summaryOverlay : function() {
		sb.loadFiles({
			"files": ['js/app/components/sliderComponent.js']
		}, function(){
			//first the document version ID from URL
			var verId = +window.location.hash.split('/')[1];
			
			//make the call,get the data and render template
			sb.renderTemplate({
	            url: sb.getRelativePath('getDocumentSummary'),
	            data: {
	                versionId: verId
	            },
	            templateName: 'summary',
	            templateHolder: $('.popup-container'),
	            callbackfunc: function(){
	            	//attach events 

					new slider();

			        var x = document.querySelector('.summary-section-body');
			        x.onclick = function(){
			            x.parentElement.classList.toggle('view');
			        }
	            }
	        });
			
		});
	}
}