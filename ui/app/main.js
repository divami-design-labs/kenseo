$(function(){
	var popupContainer = ".popup-container",
		closePopupIcon = '.popup-close-icon';


	function popupCloser($el){
		$el.hide();
		$el.children().remove();
		sb.popup.resetPopupData();
	}

	// Events

	$(document)
	.on('click', function(e){
		var $el = $(e.target);
		var bln = $el.hasClass('.toggle-click') || $el.parents('.toggle-click').length;
		if(!bln){
			$('.toggle-click').removeClass('active');
		}
	})
	.on('click', closePopupIcon, function(){
		popupCloser($(this).parents(popupContainer));
	})
	.on('keyup', function(e){
		var keycode = e.which || e.keyCode;
		if(keycode == 27){
			popupCloser($(popupContainer));
		}
	})
	.on('click', popupContainer, function(e){
		if($(e.target) === $(popupContainer)){
			$(popupContainer)[0].removeChild($(popupContainer).children()[0]);
		}
	})
	.on('click', popupContainer + " .cancel-btn", function(e){
		e.preventDefault();
		popupCloser($(this).parents(popupContainer));
	})
	.on('click', '.nav-btn', function(e){
        e.preventDefault();
        var $dataUrl = $(this).data('url');
        sb.callPopup($dataUrl);
    })
    .on('click', '.toggle-click', function(){
    	var $this = $(this);
    	$('.active').not($this).removeClass('active');
    	$this.toggleClass('active');
    })
    .on('click', '.popup-click', function(){
    	$('.popup-container').show();
        var $self = $(this);
        var index = 0;
        Kenseo.popup.info = sb.getPopupsInfo($self.data('url'));
        var dump = $self.data('dump');
        if(dump){
        	Kenseo.popup.data = dump;
        	index = dump.index;
        }
        sb.callPopup(index);
    });
});