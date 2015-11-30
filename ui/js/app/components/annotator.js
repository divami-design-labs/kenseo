var annotator = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2JhYmVsLWFwcC9jb21wb25lbnRzL2Fubm90YXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFNBQVMsR0FBRyxZQUFVO0FBQ3pCLEtBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNsRSxnQkFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUMsRUFBQztBQUNwRCxNQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFCLE1BQ0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUNsQyxPQUFPLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxJQUM1QyxPQUFPLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQ3pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLEVBQ2xEOztBQUVELFVBQU87R0FDUDtBQUNELE1BQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDN0IsTUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzFELE1BQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDakQsb0JBQWtCLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDakQsV0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1QixvQkFBa0IsQ0FBQyxHQUFHLENBQUM7QUFDdEIsT0FBSSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJO0FBQ3BELE1BQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUs7R0FDdkMsQ0FBQyxDQUFDO0FBQ0gsb0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUNqRSxvQkFBa0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckMsS0FBRyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0VBQy9CLENBQUMsQ0FBQztDQUNILENBQUE7O0FBRUQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsVUFBUyxDQUFDLEVBQUM7QUFDbkUsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNoQyxFQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDbEUsQ0FBQyxDQUFBIiwiZmlsZSI6ImFubm90YXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhbm5vdGF0b3IgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBhbm5vdGF0ZVdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5ub3RhdGUtd3JhcHBlcicpO1xyXG5cdGFubm90YXRlV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyICR0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGlmKFxyXG5cdFx0XHQkdGFyZ2V0Lmhhc0NsYXNzKCdjb21tZW50LWNvbnRhaW5lcicpIFxyXG5cdFx0XHR8fCAkdGFyZ2V0LnBhcmVudHMoJy5jb21tZW50LWNvbnRhaW5lcicpLmxlbmd0aFxyXG5cdFx0XHR8fCAkdGFyZ2V0Lmhhc0NsYXNzKCdjdXJyZW50LWFydGVmYWN0LWluZm8nKVxyXG5cdFx0XHR8fCAkdGFyZ2V0LnBhcmVudHMoJy5jdXJyZW50LWFydGVmYWN0LWluZm8nKS5sZW5ndGhcclxuXHRcdFx0KXtcclxuXHRcdFx0Ly8gYnJpbmdUb0Zyb250KCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciAkZWwgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcblx0XHR2YXIgJG5ld1NoYXBlQ29udGFpbmVyID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XHJcblx0XHR2YXIgJG5ld1NoYXBlID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XHJcblx0XHQkbmV3U2hhcGVDb250YWluZXIuYWRkQ2xhc3MoJ2NvbW1lbnQtY29udGFpbmVyJyk7XHJcblx0XHQkbmV3U2hhcGUuYWRkQ2xhc3MoXCJzaGFwZVwiKTtcclxuXHRcdCRuZXdTaGFwZUNvbnRhaW5lci5jc3Moe1xyXG5cdFx0XHRsZWZ0OiAkZWwuc2Nyb2xsTGVmdCgpICsgZS5wYWdlWCAtICRlbC5vZmZzZXQoKS5sZWZ0LFxyXG5cdFx0XHR0b3A6ICRlbC5wYXJlbnQoKS5zY3JvbGxUb3AoKSArIGUucGFnZVlcclxuXHRcdH0pO1xyXG5cdFx0JG5ld1NoYXBlQ29udGFpbmVyLmFwcGVuZChzYi5zZXRUZW1wbGF0ZSgnY29tbWVudCcsIHtkYXRhOiB7fX0pKTtcclxuXHRcdCRuZXdTaGFwZUNvbnRhaW5lci5hcHBlbmQoJG5ld1NoYXBlKTtcclxuXHRcdCRlbC5hcHBlbmQoJG5ld1NoYXBlQ29udGFpbmVyKTtcclxuXHR9KTtcclxufVxyXG5cclxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5yZWQtc2V2ZXJpdHksIC5ibHVlLXNldmVyaXR5JywgZnVuY3Rpb24oZSl7XHJcblx0JCh0aGlzKS50b2dnbGVDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHQkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2RpdicpLm5vdCgkKHRoaXMpKS50b2dnbGVDbGFzcygnc2VsZWN0ZWQnKTtcclxufSkiXX0=