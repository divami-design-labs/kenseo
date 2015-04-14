$(function(){
	var popupContainer = ".popup-container",
		closePopupIcon = '.popup-close-icon';


	function popupCloser($el){
		$el.hide();
		$el.find('.popup').remove();
	}
	$(document).on('click', closePopupIcon, function(){
		popupCloser($(this).parents(popupContainer));
	})
	.on('keyup', function(e){
		var keycode = e.which || e.keyCode;
		if(keycode == 27){
			popupCloser($(closePopupIcon).parents(popupContainer));
		}
	})
	.on('click', popupContainer + " .lnk-btn", function(e){
		e.preventDefault();
		popupCloser($(this).parents(popupContainer));
	});

	$(document).on('click', '.main-btn', function(e){
        e.preventDefault();
        sb.renderTemplateOff($(this).data('url'), $('.popup-container'), Kenseo.popup);
    });
});