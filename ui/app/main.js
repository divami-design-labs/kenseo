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
    .on('click', '.toggle-click', function(e){
    	if($(e.target).hasClass('anti-toggle-click') || $(e.target).parents('.anti-toggle-click').length){
    		return false;
    	}
    	var $this = $(this);
    	$('.active').not($this).removeClass('active');
    	$this.toggleClass('active');
    })
    .on('click', '.popup-click', function(){
    	$('.popup-container').show();
        var $self = $(this);
        var index = $(this).data('index') || 0;
        // var dump = $self.data('dump');
        // if(dump){
        // 	if(typeof dump === "string"){
        // 		dump = JSON.parse(dump);
        // 	}
        // 	Kenseo.popup.data = dump;
        // }
        if($self.data("key")){
	        Kenseo.popup.data = Kenseo.data[$self.data("key")][$self.data("id")];
	    }

        // Important: this should be called after dump object is stored in the Kenseo.popup.data
        Kenseo.popup.info = sb.getPopupsInfo($self.data('url'));
        sb.callPopup(index);
     })
    .on('click', '.page-click', function(e){
    	var $self = $(this);
    	// Kenseo.page.data = $(this).data('dump');

    	var key = $self.data('key');
    	var id = $self.data('id');
    	if(key){
	    	Kenseo.page.data = Kenseo.data[key][id];
	    }
    })
    .on('click', '.sort-item', function(){
        sb.renderTemplate({
            "templateName": 'artefacts',
            "templateHolder": $('.artifacts-section'), 
            "collection": new Kenseo.collections.Artefacts(), 
            "data": {
                projects: true, 
                project_id: Kenseo.page.data.project_id, 
                sharePermission: false, 
                sortBy: $(this).data('stype')
            }
        });
    })
    .on('click', '.done-btn', function() {
		var data = new FormData();
		
		data.append("name", Kenseo.popup.data.fileName);
		data.append("command", 'addArtefact');
		data.append("description" , "hfvjdhdfjdjf");
		data.append("project" , Kenseo.popup.data['project_id']);
		data.append("MIMEtype", Kenseo.popup.data.file);
		data.append("size", Kenseo.popup.data.file.size);
		data.append("type", 'I');
		data.append("sid", '9hal4k29ath2hu3oivuqetn967');
		data.append("file",Kenseo.popup.data.file);
		data.append("tags", [1,3,4,5]);
		data.append("linkIds", [1,2,3]);
		data.append("refs", [1]);
		data.append("artefact_id", Kenseo.popup.data['artefact_id']);
		data.append("share", Kenseo.popup.data.share);
		data.append("sharedTo", [{
			"userId" : 2,
			"permission" : 'S'
		},{
			"userId" : 3,
			"permission" : 'W'
		}]);
		
		
		$.ajax({
			url : "../server/extUpload.php",
			data: data,
			type: 'POST',
			contentType: false,
			processData: false,
			success : function(response){
				alert ("success");
			}
		});
   });
});