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
        var $dataUrl = $(this).data('index');
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
		
	})
	.on('click', '.replace-btn', function() {
		var $self = $(this);
		sb.renderTemplate({
			"url": '../server/replaceArtefact', 
			"data": {
				projectId : Kenseo.popup.replace.projectId,
				replaceArtefactId: Kenseo.popup.replace.replaceArt,
				newArtefactid : Kenseo.popup.replace.replacedWith
			}, 
			type: 'GET',
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
   
   .on('keyup', '.suggestion-text-input', function(e) {
		var type = this.getAttribute('data-elem');
		if( type == 'references') {
			var useData = Kenseo.popup.data.refObjResponse;
			var suggestionHolder = $(this).parent().next('.ref-suggestions');
		} else if(type == 'tags') {
			var useData = Kenseo.popup.data.tagObjResponse;
			var suggestionHolder = $(this).parent().next('.tags-suggestions');
		} else if(type == 'links') {
			var useData = Kenseo.popup.data.refObjResponse;
			var suggestionHolder = $(this).parent().next('.link-suggestions');
		}
		
		var self = this;
		var filteredData = _.filter(useData.data, function(item){
			if(self.value.length){
				suggestionHolder.show();
				var index = item.name.toLowerCase().indexOf(self.value.toLowerCase());
				return (index != -1) ? true : false;
			}
			else{
				return false;
			}
		});
		
		sb.renderTemplate({"templateName": 'reference-items', "templateHolder": suggestionHolder, "data": {data: filteredData}});
   })
   
   .on('click','.reference-suggestion-item',function() {
		var $holder = $(this).parent().next();
		var html = $holder.html();
		var type = $(this).parent().parent().find('.suggestion-text-input').attr('data-elem')
		if(type == 'tags') {
			var appendText = "<div class='tag' name='"  + this.getAttribute('name') + "'>" + this.innerHTML + "<div class='tag-close'></div</div>";
		} else if (type == "references" || type == "links") {
			var appendText = '<div class="reference-item" name="' + this.getAttribute('name') + '">' + this.innerHTML + '<div class="reference-item-close-icon"></div></div>';
		}
		$holder.html(html + appendText);
		$(this).parent().hide();
		$(this).parent().parent().find('.suggestion-text-input')[0].value = "";
   })
   
   .on('click', '.reference-item-close-icon', function(){
		$(this).parent().remove();
	})
	
   .on('click', '.tag-close', function(){
		$(this).parent().remove();
	});
	
});