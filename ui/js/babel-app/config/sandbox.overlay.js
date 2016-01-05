sb.overlay = {
	summaryOverlay : function() {
		sb.loadFiles({
			"files": ['js/app/components/sliderComponent.js']
		}, function(){
			//first the document version ID from URL
			var verId = window.location.hash.split('/')[1];
			
			//make the call,get the data and render template
			sb.renderTemplate({
	            url: sb.getRelativePath('getDocumentSummary'),
	            data: {
	                maskedVerId: verId
	            },
	            templateName: 'summary',
	            templateHolder: $('.popup-container'),
	            callbackfunc: function(){
	            	// Initializing slider component
					new slider();

					// Attaching events
			        var $summarSectionBody = $('.summary-section-body'),
			        	$close = $summarSectionBody.find('.close-icon');
			        $summarSectionBody.click(function(e){
			        	var $overlay = $(this).parent();
			        	if($overlay.hasClass('view')){
				            $overlay.removeClass('view');
				        }
			        });
			        // Close icon
			        $close.click(function(e) {
			        	e.stopPropagation();
			        	$(this).parents('.overlay').addClass('view');
			        });
	            }
	        });
			
		});
	}
}