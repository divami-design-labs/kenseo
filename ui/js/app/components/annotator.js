'use strict';

var annotator = function annotator() {
	var annotateWrapper = document.querySelector('.annotate-wrapper');
	annotateWrapper.addEventListener('click', function (e) {
		var $target = $(e.target);
		if ($target.hasClass('comment-container') || $target.parents('.comment-container').length || $target.hasClass('current-artefact-info') || $target.parents('.current-artefact-info').length) {
			// bringToFront();
			return;
		}
		var $el = $(e.currentTarget);
		var $newShapeContainer = $(document.createElement('div'));
		var $newShape = $(document.createElement('div'));
		$newShapeContainer.addClass('comment-container');
		$newShape.addClass("shape");
		$newShapeContainer.css({
			left: $el.scrollLeft() + e.pageX - $el.offset().left,
			top: $el.parent().scrollTop() + e.pageY
		});
		$newShapeContainer.append(sb.setTemplate('comment', { data: {} }));
		$newShapeContainer.append($newShape);
		$el.append($newShapeContainer);
	});
};

$(document).on('click', '.red-severity, .blue-severity', function (e) {
	$(this).toggleClass('selected');
	$(this).parent().find('div').not($(this)).toggleClass('selected');
});