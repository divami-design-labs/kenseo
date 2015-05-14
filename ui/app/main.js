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
    	var $self = $(this);
    	var actionType = Kenseo.popup.data.actionType;
    	var data = null;
    	switch(actionType) {
    		case 'art-archive' :
    			data = {
    				"artefactId": Kenseo.popup.data.id
    			};
    			url = "../server/archiveArtefact";
    			type= 'GET';
    			break;
    		case 'art-replace' :
    			data = {
					projectId : Kenseo.popup.replace.projectId,
					replaceArtefactId: Kenseo.popup.replace.replaceArt,
					newArtefactid : Kenseo.popup.replace.replacedWith
				};
				url = "../server/replaceArtefact";
				type= 'GET';
    			break;
    		case 'art-add-version' :
    			data = "";
    			url = "";
    			break;
    		case 'art-delete' :
    			data = {
    				"artefactId": Kenseo.popup.data.id
    			};
    			url = "../server/deleteArtefact";
    			type= 'GET';
    			break;
    		default :
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
	.on('click', '.archive-btn', function() {
		var $self = $(this);
		var artId = Kenseo.popup.data.id;
		sb.renderTemplate({
			"url": '../server/archiveArtefact', 
			"data": {
				"artefactId": artId
			}, 
			type: 'GET',
			"callbackfunc" : function() {
				popupCloser($self.parents(popupContainer));
			}
		});
	})
	.on('click', '.delete-btn', function() {
		var $self = $(this);
		var artId = Kenseo.popup.data.id;
		sb.renderTemplate({
			"url": '../server/deleteArtefact', 
			"data": {
				"artefactId": artId
			}, 
			type: 'GET',
			"callbackfunc" : function() {
				popupCloser($self.parents(popupContainer));
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

		var useData = Kenseo.popup.data[type + "ObjResponse"];
		var $suggestionHolder = $(this).parent().next('.field-suggestions');
		
		var self = this;
		var filteredData = _.filter(useData.data, function(item){
			if(self.value.length){
				$suggestionHolder.show();
				var index = item.name.toLowerCase().indexOf(self.value.toLowerCase());
				return (index != -1);
			}
			else{
				return false;
			}
		});
		
		sb.renderTemplate({"templateName": 'reference-items', "templateHolder": $suggestionHolder, "data": {data: filteredData}});
   })
   
   .on('click','.suggestion-item',function() {
   	var $parent = $(this).parent();
		var $holder = $parent.next();
		var html = $holder.html();
		var $input = $parent.parent().find('.suggestion-text-input');
		var type = $input.attr('data-elem')
		var appendText = "<div class='" + type + "' name='"  + this.getAttribute('name') + "'>" + this.innerHTML + "<div class='" + type + "-close'></div</div>";
		$holder.html(html + appendText);
		$parent.hide();
		$input.val('');
   })
   
   .on('click', '.references-close', function(){
		$(this).parent().remove();
	})
	
   .on('click', '.tag-close', function(){
		$(this).parent().remove();
	});
	
});