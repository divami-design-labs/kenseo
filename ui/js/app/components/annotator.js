'use strict';

var annotator = (function () {
	var $previousCommentSection = null;
	var insertComment = function insertComment(payload) {

		// Deleting the previous comment section which wasn't saved
		if ($previousCommentSection) {
			// If the previous comment section isn't saved then remove it
			if (!$previousCommentSection.hasClass('isSaved')) {
				$previousCommentSection.remove();
			}
		}

		// Sometimes the current wrapper's jquery element is provided or we need to extract from passed event variable 'e'
		var $el = payload.$el || $(payload.e.currentTarget);
		var data = payload.data;
		var $commentContainer = $(document.createElement('div'));
		$commentContainer.addClass('comment-container');
		// Adding the comment section template (should be done before applying styles to move the section)
		$commentContainer.append(sb.setTemplate('comment', { data: data || {} }));
		if (payload.isNewComment) {
			var e = payload.e;
			var posx = ($el.scrollLeft() + e.pageX - $el.offset().left) / $el.outerWidth() * 100;
			var posy = ($el.scrollTop() + e.pageY - $el.offset().top) / $el.outerHeight() * 100;
			$commentContainer.css({
				left: posx + "%",
				top: posy + "%"
			});
			// Bring the new comment to front
			bringCommentToFront($commentContainer);
			// Adding a dummy comment id to newly added comment for further manipulations
			$commentContainer.attr('data-thread-id', "x");

			// get current page number
			var $currentPage = $el.parents('.page');
			var currentPageIndex = $currentPage.index() + 1;
			// Add this new comments data inside the stored data
			var currentVersionId = getCurrentVersionId($el);
			var data = sb.getCurrentDocumentData(currentVersionId);
			data['x'] = {
				posx: posx,
				posy: posy,
				page_no: currentPageIndex,
				// making flag dontHide as true. So that when page is rendered, the comment section should not hide surprisingly
				dontHide: true
			};
			// sb.setCurrentDocumentData(currentVersionId, data);
			// Kenseo.document[]
		} else {
				// Existing comment manipulations
				$commentContainer.attr('data-thread-id', payload['thread_id']);
				$commentContainer.css({
					left: data.posx + "%",
					top: data.posy + "%"
				});
				// Keeping the comment section hidden if the flag "dontHide" is false
				if (!data.dontHide) {
					$commentContainer.children('.shape').addClass('hide-comment-section');
				}

				// Add "isSaved" class as a flag to the comment section
				// This flag will be used to identify whether the comment section is saved or not
				$commentContainer.addClass('isSaved');

				// Flags
				// set the flag as true for further manipulations (change this flag to false when changes are detected)
				data.noChangesDetected = true;
				// the "dontHide" flag is used to know whether the comment section should be hidden or not
				// Default value "false" suggest to hide the comment section
				data.dontHide = false;

				// Kenseo.document[]
			}
		// $commentContainer.append($shape);
		$el.append($commentContainer);

		// After inserting the comment on the document, the current comment section will become previous comment section
		$previousCommentSection = $commentContainer;
	};
	var insertCommentWrapper = function insertCommentWrapper(currentArtefactId, data) {
		var elemString = "[rel='pdf_" + currentArtefactId + "']";
		var $pdfDocContainer = $(elemString);
		if (!$pdfDocContainer.length) {
			sb.log("pdfDocContainer is missing");
			return;
		}
		var $textLayers = $pdfDocContainer.find('.page');
		if (!$textLayers.length) {
			sb.log("textLayers are missing");
			return;
		}
		if (!data) {
			// Artefact has no data
			sb.log("artefact has no data");
			return;
		}
		// for(var i = 0, len = data.length; i < len; i++){
		//     var d = data[i];
		//     var $el = $textLayers.eq(+d.page_no-1).find('.new-textlayer');
		//     if($el.length){
		//         insertComment({
		//         	"$el": $el,
		//         	"data": d
		//         });
		//     }
		// }
		for (var key in data) {
			var d = data[key];
			var $el = $textLayers.eq(+d.page_no - 1).find('.new-textlayer');
			if ($el.length) {
				insertComment({
					"$el": $el,
					"data": d,
					"thread_id": key
				});
			}
		}
	};
	var getCurrentVersionId = function getCurrentVersionId($el) {
		var rel = $el.parents('.outerContainer').attr('rel');
		// removing prefix "pdf_" from found rel attribute
		return rel.substr(4);
	};
	var bringCommentToFront = function bringCommentToFront($currentCommentContainer) {
		$('.comment-container').css({ 'z-index': '' });
		$currentCommentContainer.css({ 'z-index': '2' });
	};
	return {
		init: function init() {
			$(document).on('click', '.new-textlayer', this.annotate);
			$(document).on('click', '.drpdwn-item', function () {
				var $self = $(this);
				var $selectedText = $self.parents('.drpdwn').find('.drpdwn-selected-text');
				if ($selectedText.length) {
					// normal dropdown functionality
					$selectedText.html($self.text());
				} else {
					// severity check dropdown functionality
					var colorCode = $self.data('value');
					var $shape = $self.parents('.comment-container').find('.shape');
					$shape.attr('data-color', colorCode);
				}
			});
			$(document).on('click', '.comment-section .cancel-btn', function () {
				var $commentContainer = $(this).parents('.comment-container');
				if ($commentContainer.hasClass('isSaved')) {
					// if the comment is already saved, then just hide it
					$commentContainer.children('.shape').addClass('hide-comment-section');
				} else {
					// Remove the comment container completely if the comment is not yet saved
					$commentContainer.remove();
					// Remove also from local object
				}
			});
		},
		annotate: function annotate(e) {
			var $target = $(e.target);
			if (sb.hasInheritClass($target, ['comment-container', 'current-artefact-info'])) {
				// bringToFront();
				var $currentCommentContainer = $target.hasClass('comment-container') ? $target : $target.parents('.comment-container');
				bringCommentToFront($currentCommentContainer);
				return;
			}
			var $el = $(e.currentTarget);
			insertComment({
				"e": e,
				"isNewComment": true
			});
		},
		paintExistingAnnotations: function paintExistingAnnotations() {
			// Removing all the already painted comment sections
			$('.comment-container.isSaved').remove();
			// Get the current container
			// -- For now, assume the current container as "158"
			var currentContainerVersionID = 158;
			var currentVersionIdData = sb.getCurrentDocumentData(currentContainerVersionID);
			if (currentVersionIdData && currentVersionIdData.noChangesDetected) {
				// if data is present and not changed, don't call for ajax.. use the existing data
				insertCommentWrapper(currentContainerVersionID, currentVersionIdData);
			} else {
				// get the calling url from paintPdf function
				sb.ajaxCall({
					url: "local/packages/comments.json",
					// flag to say not to store the response data in Kenseo.data global variable
					excludeDump: true,
					success: function success(existingAnnotations) {
						// var currentArtefactId = Kenseo.data.artefact.id;
						var currentArtefactId = Object.keys(existingAnnotations)[0];
						var data = existingAnnotations[currentArtefactId];
						// Store the gathered server data in local's object
						sb.setCurrentDocumentData(currentArtefactId, data);

						insertCommentWrapper(currentArtefactId, data);
					}
				});
				// -- end of ajax call
			}
		}
	};
})();