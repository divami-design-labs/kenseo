var annotator = (function(){
	var $previousCommentSection = null;
	var insertComment = function(payload){

		// Deleting the previous comment section which wasn't saved
		if($previousCommentSection){
			// If the previous comment section isn't saved then remove it
			if(!$previousCommentSection.hasClass('isSaved')){
				$previousCommentSection.remove();
			}
		}

		// Sometimes the current wrapper's jquery element is provided or we need to extract from passed event variable 'e'
		var $el = payload.$el || $(payload.e.currentTarget);
		var data = payload.data;
        var $commentContainer = $(document.createElement('div'));
        $commentContainer.addClass('comment-container');
        // Adding the comment section template (should be done before applying styles to move the section)
        $commentContainer.append(sb.setTemplate('comment', {data: data || {}}));
        if(payload.isNewComment){
        	var e = payload.e;
        	$commentContainer.css({
				left: ($el.scrollLeft() + e.pageX - $el.offset().left)/($el.outerWidth())  * 100 + "%",
				top:  ($el.scrollTop()  + e.pageY - $el.offset().top )/($el.outerHeight()) * 100 + "%"
			});
			// Bring the new comment to front
			bringCommentToFront($commentContainer);
			// Adding a dummy comment id to newly added comment for further manipulations
			$commentContainer.attr('data-comment-id', "x");
        }
        else{
        	// Existing comment manipulations
        	$commentContainer.attr('data-comment-id', data['comment_id']);
	        $commentContainer.css({
	            left: data.posX + "%",
	            top:  data.posY + "%",
	        })
            // Keeping the comment section hidden by default
            .children('.shape').addClass('hide-comment-section');

	        // Add "isSaved" class as a flag to the comment section
	        // This flag will be used to identify whether the comment section is saved or not
	        $commentContainer.addClass('isSaved');
	    }
        // $commentContainer.append($shape);
        $el.append($commentContainer);

        // After inserting the comment on the document, the current comment section will become previous comment section
        $previousCommentSection = $commentContainer;
    }
    var bringCommentToFront = function($currentCommentContainer){
    	$('.comment-container').css({'z-index': ''});
		$currentCommentContainer.css({'z-index': '2'});
    }
	return {
		init: function(){
			$(document).on('click', '.new-textlayer', this.annotate);
			$(document).on('click', '.drpdwn-item', function(){
				var $self = $(this);
				var $selectedText = $self.parents('.drpdwn').find('.drpdwn-selected-text');
				if($selectedText.length){
					$selectedText.html($self.text());
				}
				else{
					// severity check
					var colorCode = $self.data('value');
					var $shape = $self.parents('.comment-container').find('.shape');
					$shape.attr('data-color', colorCode);
				}
			});
			$(document).on('click', '.comment-section .cancel-btn', function(){
				var $commentContainer = $(this).parents('.comment-container');
				if($commentContainer.hasClass('isSaved')){
					// if the comment is already saved, then just hide it
					$commentContainer.children('.shape').addClass('hide-comment-section');
				}
				else{
					// Remove the comment container completely if the comment is not yet saved
					$commentContainer.remove();
				}
			});
		},
		annotate: function(e){
			var $target = $(e.target);
			if(sb.hasInheritClass($target, ['comment-container', 'current-artefact-info'])){
				// bringToFront();
				var $currentCommentContainer = $target.hasClass('comment-container')? $target: $target.parents('.comment-container');
				bringCommentToFront($currentCommentContainer);
				return;
			}
			var $el = $(e.currentTarget);
			insertComment({
				"e": e,
				"isNewComment": true
			});
		},
		paintExistingAnnotations: function(){
			// Removing all the already painted comment sections
			$('.comment-container.isSaved').remove();
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
	                "status": "2",
	                "page_no": "1",
	                "threads": [{
	                    "id": "1",
	                    "user": "venkateshwar@divami.com",
	                    "time": "2015-05-21 23:41:54",
	                    "description": "Hello"
	                },
	                {
	                    "id": "2",
	                    "user": "sivakumar@divami.com",
	                    "time": "2015-05-12 23:41:54"
	                }]
	            },
	            {
	                "comment_id": "2",
	                "posX": "33.3",
	                "posY": "20",
	                "severity": "1",
	                "category": "2",
	                "is_private": "1",
	                "status": "1",
	                "page_no": "10",
	                "threads": [{
	                    "id": "1",
	                    "user": "venkateshwar@divami.com",
	                    "time": "2015-05-12 23:41:54",
	                    "description": "Hello"
	                },
	                {
	                    "id": "2",
	                    "user": "sivakumar@divami.com",
	                    "time": "2015-05-10 23:41:54"
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
        	if(!data){
        		// Artefact has no data
        		sb.log("artefact has no data");
        		return;
        	}
            for(var i = 0, len = data.length; i < len; i++){
                var d = data[i];
                var $el = $textLayers.eq(+d.page_no-1).find('.new-textlayer');
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