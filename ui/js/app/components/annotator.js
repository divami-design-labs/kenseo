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
		}
	}
})();