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

        sb.registerData();
        var $dataUrl = $(this).data('index');
        if($dataUrl >= 0) {
	        sb.callPopup($dataUrl);
        }
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
    	sb.navigate('popup', this);
     })
    .on('click', '.page-click', function(e){
    	sb.navigate('page', this);
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
    .on('click', '.share-btn', function() {
    	var container = document.querySelectorAll('.share-artefact-people-item');
    	console.log(container);
    	var sharedDetails = [];
    	for(var i =0 ; i<container.length; i++) {
    		var $elem = $(container[i])
    		var userId = $elem.attr("data-id")
    		var permissions = $elem.find(".user-permission");
    		for(var j=0; j<permissions.length; j++) {
    			var $permission = $(permissions[j])
    			if($permission[0].checked == true) {
    				var permissionType = ($($permission[0]).attr("data-elem") == "comment") ? 'c' : 's'
	    			sharedDetails.push({
	    				"userId" : userId,
	    				"permission" : permissionType
	    			})
    			}
    		}
    	}
    	// sb.setPopupData(JSON.stringify(sharedDetails), 'sharedTo')
    	console.log("parsing is completed")
    })
    .on('click', '.done-btn', function() {
    	sb.registerData();
    	var $self = $(this);
    	var actionType = sb.getPopupData('actionType');
    	var data = null;
    	switch(actionType) {
    		case 'archiveArtefact' :
    		case 'deleteArtefact' :
    		case 'replaceArtefact' :
    		case 'addArtefactVersion' :
    		case 'setMeetingInvitation':
    		case 'archiveProject':
    			data = sb.getPopupData(),
    			url = sb.getRelativePath(actionType);
    			type= 'GET';
    			break;
    		default :
				var data = new FormData();
				
				for(x in Kenseo.popup.data) {
					var dump = sb.getPopupData(x);
					if(typeof dump === "object" && x !== "file"){
						dump = JSON.stringify(dump);
					}
					data.append(x, dump);
				}
				
				data.append("type", 'I');
				data.append("sid", Kenseo.cookie.sessionid());
				
				$.ajax({
					url : sb.getRelativePath("extUpload.php"),
					data: data,
					type: 'POST',
					contentType: false,
					processData: false,
					success : function(response){
						popupCloser($self.parents(popupContainer));
					}
				});
				
				return;
			
    	}
		
		sb.renderTemplate({
			url : url,
			data: data,
			type: type,
			contentType: false,
			processData: false,
			"callbackfunc" : function() {
				popupCloser($self.parents(popupContainer));
			}
		});
	})
	
	.on('click', '.overlay-click', function(){
		$('.popup-container').show();
		var $self = $(this);
		var index = $(this).data('key') || 0;
		var dump = $self.data('dump');
		if(dump){
			if(typeof dump === "string"){
				dump = JSON.parse(dump);
			}
			Kenseo.overlays.data = dump;
		}
		// Important: this should be called after dump object is stored in the Kenseo.popup.data
		Kenseo.overlays.info = sb.getOverlaysInfo($self.data('url'));
		sb.callOverlay(index);
	})
	.on('click', '.sort-item', function(e){
		var $self = $(e.currentTarget);
        new Kenseo.views.Artefacts({
            el: '.artifacts-content',
            id: sb.getPageData('project').id, 
            colStr: 'Artefacts', 
            data: {projects: true, project_id: sb.getPageData('project').id, sharePermission: false, sortBy: $self.data('stype')}, 
            preLoader: function(response){
                $('.artifacts-section').html(_.template(templates['artefacts'])(response));
            }
        });
	})
});