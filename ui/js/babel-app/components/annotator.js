var annotator = (function(){
	var insertComment = function(payload){
		var $el = payload.$el || $(payload.e.currentTarget);
		var data = payload.data;
        var $newShapeContainer = $(document.createElement('div'));
        var $newShape = $(document.createElement('div'));
        $newShapeContainer.addClass('comment-container');
        $newShape.addClass("shape");
        if(payload.isNewComment){
        	var e = payload.e;
        	$newShapeContainer.css({
				left: ($el.scrollLeft() + e.pageX - $el.offset().left)/($el.outerWidth())  * 100 + "%",
				top:  ($el.scrollTop()  + e.pageY - $el.offset().top )/($el.outerHeight()) * 100 + "%"
			});
        }
        else{
	        $newShapeContainer.css({
	            left: data.posX + "%",
	            top:  data.posY + "%"
	        });
	    }
        $newShapeContainer.append(sb.setTemplate('comment', {data: {}}));
        $newShapeContainer.append($newShape);
        $el.append($newShapeContainer);
    }
	return {
		init: function(){
			$(document).on('click', '.new-textlayer', this.annotate);
		},
		annotate: function(e){
			var $target = $(e.target);
			if(
				$target.hasClass('comment-container') 
				|| $target.parents('.comment-container').length
				|| $target.hasClass('current-artefact-info')
				|| $target.parents('.current-artefact-info').length
				){
				// bringToFront();
				return;
			}
			var $el = $(e.currentTarget);
			insertComment({
				"e": e,
				"isNewComment": true
			});
		},
		paintExistingAnnotations: function(){
			// Get the current container

	        // get the calling url from paintPdf function

	        // Dummy JSON test
	        var existingAnnotations = {
	            "158": [{
	                "comment_id": "1",
	                "posX": "33.3",
	                "posY": "20",
	                "severity": "1",
	                "category": "2",
	                "is_private": "1",
	                "status": "open",
	                "page_no": "1",
	                "threads": [{
	                    "id": "1",
	                    "user": "venkateshwar@divami.com",
	                    "time": "12-6-2015",
	                    "description": "Hello"
	                },
	                {
	                    "id": "2",
	                    "user": "sivakumar@divami.com",
	                    "time": "13-6-2015"
	                }]
	            },
	            {
	                "comment_id": "1",
	                "posX": "33.3",
	                "posY": "20",
	                "severity": "1",
	                "category": "2",
	                "is_private": "1",
	                "status": "open",
	                "page_no": "10",
	                "threads": [{
	                    "id": "1",
	                    "user": "venkateshwar@divami.com",
	                    "time": "12-6-2015",
	                    "description": "Hello"
	                },
	                {
	                    "id": "2",
	                    "user": "sivakumar@divami.com",
	                    "time": "13-6-2015"
	                }]
	            }]
	        };

	        var currentArtefactId = Kenseo.data.artefact.id;
	        var data = existingAnnotations[currentArtefactId];
	        var elemString = "[rel='pdf_" + currentArtefactId + "'";
	        var $pdfDocContainer = $(elemString);
	        if(!$pdfDocContainer.length){
	        	return;
	        }
            var $textLayers = $pdfDocContainer.find('.page');
            if(!$textLayers.length){
            	return;
        	}
            for(var i = 0, len = data.length; i < len; i++){
                var d = data[i];
                var $el = $textLayers.eq(d.page_no).find('.new-textlayer');
                if($el.length){
                    insertComment({
                    	"$el": $el, 
                    	"data": d
                    });
                }
            }
		}
	}
})();

$(document).on('click', '.red-severity, .blue-severity', function(e){
	$(this).toggleClass('selected');
	$(this).parent().find('div').not($(this)).toggleClass('selected');
})