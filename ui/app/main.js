$(function(){
	var popupContainer = ".popup-container",
		closePopupIcon = '.popup-close-icon';


	function popupCloser($el){
		$el.hide();
		$el.find('.popup').remove();
	}

	// Events

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
	})
	.on('click', '.main-btn', function(e){
        e.preventDefault();
        var $dataUrl = $(this).data('url');
        sb.renderTemplateOff($dataUrl, $('.popup-container'), Kenseo.popup[$dataUrl]);
    })
    .on('click', '.toggle-click', function(){
    	var $this = $(this);
    	$('.active').not($this).removeClass('active');
    	$this.toggleClass('active');
    });
});