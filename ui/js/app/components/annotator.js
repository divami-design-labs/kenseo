// Things to consider:
// - PDFJS renders the pdf page wise. It doesn't render whole pdf at once. It renders only the pages which are nearer to view.
'use strict';

var annotator = (function () {
	var $previousCommentSection = null;
	var insertComment = function insertComment(payload) {
		// Sometimes the current wrapper's jquery element is provided or we need to extract from passed event variable 'e'
		var $el = payload.$el || $(payload.e.currentTarget);
		var data = payload.data;
		var $commentContainer = $(document.createElement('div'));
		$commentContainer.addClass('comment-container');
		// Adding the comment section template (should be done before applying styles to move the section)
		$commentContainer.append(sb.setTemplate('comment', { data: data || { 'newComment': true } }));
		if (payload.isNewComment) {
			// Deleting the previous comment section which wasn't saved
			if ($previousCommentSection) {
				// If the previous comment section isn't saved then remove it
				if (!$previousCommentSection.hasClass('isSaved')) {
					$previousCommentSection.remove();
				}
			}
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
			$commentContainer.attr('data-k-comment_thread_id', "-1");

			// get current page number
			var $currentPage = $el.parents('.page');
			var currentPageIndex = $currentPage.index() + 1;
			console.log(currentPageIndex);
			// Add this new comments data inside the stored data
			var currentVersionId = getCurrentVersionId($el);
			var data = sb.getCurrentDocumentData(currentVersionId);
			sb.setCurrentThreadData(currentVersionId, '-1', {
				posx: posx,
				posy: posy,
				page_no: currentPageIndex,
				// making flag dontHide as true. So that when page is rendered, the comment section should not hide surprisingly
				dontHide: true
			});
			// Kenseo.document[]

			// attach page_no
			$commentContainer.attr('data-k-page_no', currentPageIndex);
			$commentContainer.attr('data-k-posx', posx);
			$commentContainer.attr('data-k-posy', posy);
		} else {
			// Existing comment manipulations
			$commentContainer.attr('data-k-comment_thread_id', payload['thread_id']);
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

			// Kenseo.document[]

			// attach page_no
			$commentContainer.attr('data-k-page_no', data.page_no);
			$commentContainer.attr('data-k-posx', data.posx);
			$commentContainer.attr('data-k-posy', data.posy);
		}
		// attach version id
		$commentContainer.attr('data-k-artefact_ver_id', payload['version_id']);
		// set flag to say that the content of this comment
		$commentContainer.addClass('isStoredLocally');
		// $commentContainer.append($shape);
		$el.append($commentContainer);

		// After inserting the comment on the document, the current comment section will become previous comment section
		$previousCommentSection = $commentContainer;
	};
	var insertCommentWrapper = function insertCommentWrapper(currentArtefactId, data) {
		var $pdfDocContainer = getDocContainer(currentArtefactId);
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
		for (var key in data) {
			var d = data[key];
			var $el = $textLayers.eq(+d.page_no - 1).find('.new-textlayer');
			if ($el.length) {
				insertComment({
					"$el": $el,
					"data": d,
					"thread_id": key,
					"version_id": currentArtefactId
				});
			}
		}
	};
	var getDocContainer = function getDocContainer(id) {
		var elemString = "[rel='pdf_" + id + "']";
		return $(elemString);
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
	var commentValidations = function commentValidations($el) {
		var $commentSection = $el.parents('.comment-container');
		var $postBtn = $commentSection.find('.main-btn');
		var $textBox = $commentSection.find('.write-comment');

		var artefactVersionId = $commentSection.attr('data-k-artefact_ver_id');
		var threadId = $commentSection.attr('data-k-comment_thread_id');

		var originalData = Kenseo.document[artefactVersionId][threadId];
		var gatheredData = sb.getCommentThreadDumpObject($commentSection);

		if (commentSectionIsChanged(originalData, gatheredData) || $.trim($textBox.val()).length) {
			$postBtn.removeAttr('disabled');
		} else {
			$postBtn.attr('disabled', 'true');
		}
	};
	var commentSectionIsChanged = function commentSectionIsChanged(originalData, gatheredData) {
		var checkers = ['severity', 'category', 'state', 'is_private'];
		for (var i = 0, len = checkers.length; i < len; i++) {
			if (originalData[checkers[i]] !== gatheredData[checkers[i]]) {
				return true;
			}
		}
		return false;
	};
	return {
		init: function init() {
			$(document).on('click', '.new-textlayer', this.annotate);
			$(document).on('click', '.drpdwn-item', function () {
				var $self = $(this);
				var $selectedText = $self.parents('.drpdwn').find('.drpdwn-selected-text');
				var value = $self.attr('data-value');
				if ($selectedText.length) {
					// normal dropdown functionality
					$selectedText.html($self.text());

					var $dropdown = $self.parents('.drpdwn');
				} else {
					// severity check dropdown functionality
					var colorCode = $self.data('value');
					// var $shape = $self.parents('.comment-container').find('.shape');
					// $shape.attr('data-k-color', colorCode);
					var $dropdown = $self.parents('.drpdwn').prev();
				}
				var dataType = $dropdown.attr('data-type');
				$dropdown.attr('data-k-' + dataType, value);
				commentValidations($self);
			});
			$(document).on('click', '.comment-section .cancel-btn', function () {
				var $commentContainer = $(this).parents('.comment-container');
				if ($commentContainer.hasClass('isSaved')) {
					// if the comment is already saved, then just hide it
					$commentContainer.children('.shape').addClass('hide-comment-section');
				} else {
					var versionId = $commentContainer.attr('data-k-version');;
					var threadId = $commentContainer.attr('data-k-thread');
					// Remove the comment container completely if the comment is not yet saved
					$commentContainer.remove();
					// Remove also from local object
					sb.setCurrentThreadData(versionId, threadId, null);
				}
			});
			$(document).on('click', '.shape', function (e) {
				var $self = $(this);
				var $commentContainer = $self.parents('.comment-container');
				var versionId = $commentContainer.attr('data-k-artefact_ver_id');
				var threadId = $commentContainer.attr('data-k-comment_thread_id');
				var threadData = Kenseo.document[versionId][threadId];
				threadData.dontHide = $self.hasClass('hide-comment-section');
				$self.toggleClass('hide-comment-section');
			});

			// private message checkbox event
			$(document).on('change', '.private-chk', function (e) {
				var $self = $(this);
				if (this.checked) {
					$self.attr('data-k-is_private', '1');
				} else {
					$self.attr('data-k-is_private', '0');
				}
				// Do validations
				commentValidations($self);
			});

			$(document).on('click', '.comment-container .main-btn', function (e) {
				var $self = $(this);
				var $commentSection = $self.parents('.comment-container');
				var versionId = $commentSection.attr('data-k-artefact_ver_id');
				var threadId = $commentSection.attr('data-k-comment_thread_id');

				sb.ajaxCall({
					url: sb.getRelativePath('createComment'),
					data: sb.getCommentThreadDumpObject($commentSection),
					type: 'POST',
					plainData: true,
					//contentType: 'application/json',
					//dataType: 'json',
					success: function success(response) {
						var data = response.data;
						var params = response.params;
						sb.setCurrentThreadData(params.artefact_ver_id, params.comment_thread_id, data[params.comment_thread_id]);

						// re-render the thread section
						var $pdfDocContainer = getDocContainer(params.artefact_ver_id);
						var $commentSection = $('[data-k-comment_thread_id="' + params.comment_thread_id + '"].comment-container');
						$commentSection.remove();

						// Dont hide flag
						data[params.comment_thread_id].dontHide = true;
						insertCommentWrapper(params.artefact_ver_id, data);
					}
				});
			});

			// write comment event attachment
			// - Temporary fix: The main aim of this function is to run validation on whether to enable the post button or not
			// - Currently, there is already a function which does this i.e commentValidations
			// - In future, the below code must be removed and somehow must use commentValidations function when edit and delete implementation is added.
			$(document).on('keyup', '.write-comment', function () {
				var $self = $(this);
				var value = this.value;
				var $currentCommentSection = $self.parents('.comment-container');
				var $postBtn = $currentCommentSection.find('.main-btn');

				if ($.trim(value).length) {
					$postBtn.removeAttr('disabled');
				} else {
					commentValidations($self);
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
				"isNewComment": true,
				"version_id": getCurrentVersionId($el)
			});
		},
		paintExistingAnnotations: function paintExistingAnnotations(currentContainerVersionID) {
			// Removing all the already painted comment sections
			$('.comment-container.isStoredLocally').remove();
			// Get the current container
			// -- For now, assume the current container as "158"
			// var currentContainerVersionID = 3;
			var currentVersionIdData = sb.getCurrentDocumentData(currentContainerVersionID);
			if (currentVersionIdData && currentVersionIdData.noChangesDetected) {
				// if data is present and not changed, don't call for ajax.. use the existing data
				insertCommentWrapper(currentContainerVersionID, currentVersionIdData);
			} else {
				// get the calling url from paintPdf function
				sb.ajaxCall({
					url: sb.getRelativePath('getArtefactDetails'),
					// flag to say not to store the response data in Kenseo.data global variable
					excludeDump: true,
					data: {
						artefactVersionId: Kenseo.data.artefact.id,
						withVersions: true,
						withComments: true
					},
					success: function success(response) {
						var data = response.data;
						// Store the current artefact version related data in a global variable
						var threads = data.threads;
						// flag
						threads.noChangesDetected = true;
						sb.setCurrentDocumentData(data.artefactId, threads);

						// var existingAnnotations = response.data;
						// // var currentArtefactId = Kenseo.data.artefact.id;
						// var currentArtefactId = Object.keys(existingAnnotations)[0];
						// var data = existingAnnotations[currentArtefactId];
						// // Store the gathered server data in local's object
						// // set the flag as true for further manipulations (change this flag to false when changes are detected)
						// data.noChangesDetected = true;
						// sb.setCurrentDocumentData(currentArtefactId, data);

						insertCommentWrapper(currentArtefactId, data);
					}
				});
				// -- end of ajax call
			}
		}
	};
})();