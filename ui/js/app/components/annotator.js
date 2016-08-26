// Things to consider:
// - PDFJS renders the pdf page wise. It doesn't render whole pdf at once. It renders only the pages which are nearer to view.
var annotator = (function(){
	var $previousCommentSection = null;
	return {
		getDocContainer: function(id){
			var elemString = "[rel='pdf_" + id + "']";
			return $(elemString);
		},
		getCurrentVersionId: function($el){
			var rel = $el.parents('.outerContainer').attr('rel');
			// removing prefix "pdf_" from found rel attribute
			return rel.substr(4);
		},
		bringCommentToFront: function($currentCommentContainer){
			$('.comment-container').css({'z-index': ''});
			$currentCommentContainer.css({'z-index': '2'});
		},
		commentValidations: function($el){
			var $commentSection = $el.parents('.comment-container');
			var $postBtn = $commentSection.find('.main-btn');
			var $textBox = $commentSection.find('.write-comment');

			var artefactVersionId = $commentSection.attr('data-k-artefact_ver_id');
			var threadId = $commentSection.attr('data-k-comment_thread_id');

			var originalData = Kenseo.document[artefactVersionId][threadId];
			var gatheredData = sb.getCommentThreadDumpObject($commentSection);

			if(annotator.commentSectionIsChanged(originalData, gatheredData) || $.trim($textBox.val()).length){
				$postBtn.removeAttr('disabled');
			}
			else{
				$postBtn.attr('disabled', 'true');	
			}
		},
		commentSectionIsChanged: function(originalData, gatheredData){
			var checkers = ['severity', 'category', 'state', 'is_private'];
			for(var i = 0, len = checkers.length; i < len; i++){
				if(originalData[checkers[i]] !== gatheredData[checkers[i]]){
					return true;
				}
			}
			return false;
		},
		init: function(){
			// write comment event attachment
			// - Temporary fix: The main aim of this function is to run validation on whether to enable the post button or not
			// - Currently, there is already a function which does this i.e commentValidations
			// - In future, when edit and delete functionality is included, improve this function or try to make it similar to other change events.
			$(document).on('keyup', '.write-comment', function(){
				var $self = $(this);
				var value = this.value;
				var $currentCommentSection = $self.parents('.comment-container');
 				var $postBtn = $currentCommentSection.find('.main-btn');
				
				if($.trim(value).length){
					$postBtn.removeAttr('disabled');
				}
				else{
					commentValidations($self);
				}
			});
	
		},
		annotate: function(e){
			var $target = $(e.target);
			if(sb.hasInheritClass($target, ['comment-container', 'current-artefact-info'])){
				// bringToFront();
				var $currentCommentContainer = $target.hasClass('comment-container')? $target: $target.parents('.comment-container');
				annotator.bringCommentToFront($currentCommentContainer);
				return;
			}
			var $el = $(e.currentTarget);
			var threadView = new Kenseo.views.Thread({
				"e": e,
				"isNewComment": true,
				"version_id": annotator.getCurrentVersionId($el)
			});

			threadView.render();
		},
		paintExistingAnnotations: function(currentContainerVersionID){
			// Removing all the already painted comment sections
			$('.comment-container.isStoredLocally').remove();
			// Get the current container
			// -- For now, assume the current container as "158"
			// var currentContainerVersionID = 3;
			var currentVersionIdData = sb.getCurrentDocumentData(currentContainerVersionID);
			if(currentVersionIdData && currentVersionIdData.noChangesDetected){
				// if data is present and not changed, don't call for ajax.. use the existing data
				// insertCommentWrapper(currentContainerVersionID, currentVersionIdData);
				var threadsView = new Kenseo.views.Threads({
					currentArtefactId: currentContainerVersionID,
					model: new Kenseo.models.Threads(currentVersionIdData)
				});

				threadsView.render();
			}
			else{
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
					success: function(response){
						var data = response.data;
						// Store the current artefact version related data in a global variable
                        var threads = data.threads;
                        // flag
                        threads.noChangesDetected = true;
                        sb.setCurrentDocumentData(data.artefactId, threads);


						insertCommentWrapper(currentArtefactId, data);
					}
				});
				// -- end of ajax call
			}
		}
	}
})();