sb.sliders = {

	documentSummary : function(actionType) {
		//fetch the document version ID from URL
		var maskedVerId = window.location.hash.split('/')[1];
		var slider = document.createElement('div');
		$(slider).addClass('sliders slider-large').appendTo($('.slider-container')).attr("data-url",actionType);
		var width = $('.slider-large').css('min-width');
		sb.sliders.setSliderDimensions(width);
		$('.sliders').css({
			'transform' :'translate(0,0)'
		});
		//make the call,get the data and render template
		sb.renderTemplate({
            url: sb.getRelativePath('getDocumentSummary'),
            data: {
                maskedVerId: maskedVerId
            },
            templateName: 'summary',
            templateHolder: $('.slider-large'),
			container: $('.sliders'),
        });

	},
	commentSummary : function(actionType) {
		var maskedVerId = window.location.hash.split('/')[1];
		var slider = document.createElement('div');
		$(slider).addClass('sliders slider-medium').appendTo($('.slider-container'));
		var width = $('.slider-medium').css('min-width');
		sb.sliders.setSliderDimensions(width);
		$('.sliders').css({
			'transform' :'translate(0,0)'
		});
		// sb.renderTemplate({
        //     url: sb.getRelativePath('getCommentSummary'),
        //     data: {
        //         maskedVerId: maskedVerId
        //     },
        //     templateName: 'comments-viewer',
        //     templateHolder: $('.slider-container'),
		//
        // });
		$('.slider-medium').append(sb.setTemplate('comments-viewer')).attr("data-url",actionType);
	},
	setSliderDimensions : function(width) {
		$('.slider-container').css({
			'min-width' : width
		});
	}
}
