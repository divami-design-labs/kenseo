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

        var $fieldSection = $('.popup').find('.field-section');
        if($fieldSection.length){
        	$fieldSection.each(function(){
        		var $self = $(this);
        		var property = $self.data('name');
        		var $combobox = $self.find('.combobox');
        		var $text = $self.find('input');
        		if($combobox.length){
        			var arrValue = [];
        			var arrayIds = [];
        			$combobox.find('.sv-name').each(function(){
        				arrValue.push({name: $(this).html(), id: $(this).data('id')});
        				arrayIds.push($(this).data('id'));
        			});
        			sb.setPopupData(arrValue, property);
        			Kenseo.popup.data[property] = arrValue;
        			Kenseo.popup.data[property+'Ids'] = arrayIds;
        		}
        		else{
        			sb.setPopupData($text.val(), property);
        		}

        	});
        }
        var $dataUrl = $(this).data('index');
        if($dataUrl) {
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
    .on('click', '.done-btn', function() {
    	var $self = $(this);
    	var actionType = sb.getPopupData('actionType');
    	var data = null;
    	switch(actionType) {
    		case 'archiveArtefact' :
    		case 'deleteArtefact' :
    			data = Kenseo.popup.data,
    			url = "../server/" + actionType;
    			type= 'GET';
    			break;
    		case 'replaceArtefact' :
    			data = Kenseo.popup.replace;
				url = "../server/" + actionType;
				type= 'GET';
    			break;
    		case 'art-add-version' :
    			data = "";
    			url = "";
    			break;
    		case 'art-delete' :
    			data = {
    				"artefactId": sb.getPopupData('id')
    			};
    			url = "../server/deleteArtefact";
    			type= 'GET';
    			break;
    			
    		default :
				var data = new FormData();
				
				for(x in Kenseo.popup.data) {
					data.append(x,Kenseo.popup.data[x]);
				}
				
				data.append("type", 'I');
				data.append("sid", Kenseo.cookie.sessionid());
				data.append("file", dump['file']);
				data.append("tags", [1,3,4,5]);
				data.append("linkIds", [1,2,3]);
				data.append("refs", [1]);
				data.append("artefact_id", dump['artefact_id']);
				data.append("share", dump['share']);
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
		var artId = sb.getPopupData('id');
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
		var artId = sb.getPopupData('id');
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

		var useData = sb.getPopupData(type + "ObjResponse");
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
   
 //   .on('click','.suggestion-item',function() {
 //   	var $parent = $(this).parent();
	// 	var $holder = $parent.next();
	// 	var html = $holder.html();
	// 	var $input = $parent.parent().find('.suggestion-text-input');
	// 	var type = $input.attr('data-elem')
	// 	var appendText = "<div class='" + type + "' name='"  + this.getAttribute('name') + "'>" + this.innerHTML + "<div class='" + type + "-close'></div</div>";
	// 	$holder.html(html + appendText);
	// 	$parent.hide();
	// 	$input.val('');
 //   })
   
 //   .on('click', '.references-close', function(){
	// 	$(this).parent().remove();
	// })
	
 //   .on('click', '.tag-close', function(){
	// 	$(this).parent().remove();
	// });
});