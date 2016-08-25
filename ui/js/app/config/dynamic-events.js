$(function () {
	var popupContainer = '.popup-container',
	    closePopupIcon = '.popup-close-icon';
  //close the current popup and store the data
	function popupCloser($el) {
		$el.hide();
		$el.children().remove();
		sb.popup.resetPopupData();
	}

	// Events

	$(document)
	// .on('click', function (e) {
	// 	var $el = $(e.target);
	// 	var bln = $el.hasClass('.toggle-click') || $el.parents('.toggle-click').length;
		// var bln = 	$el.hasClass('popup-click')
		// 			|| $el.hasClass('page-click')
		// 			|| $el.hasClass('toggle-click')
		// 			|| $el.parents('.popup-click').length
		// 			|| $el.parents('page-click').length
		// 			|| $el.parents('.toggle-click').length;
		// if (!bln) {
		// 	$('.toggle-click').removeClass('active');
		// }
	// })
	.on('click', '.prevent-default', function(e){
		//stops default action of click event
		e.preventDefault();
	})
	.on('click', '.stop-propagate', function(e){
		//stops bubbling and capturing
		e.stopPropagation();
	})
	.on('click', closePopupIcon, function () {
		//close current popup
		popupCloser($(this).parents(popupContainer));
	}).on('keyup', function (e) {
		var keycode = e.which || e.keyCode;
		if (keycode == 27) {
			popupCloser($(popupContainer));
		}
	}).on('click', popupContainer, function (e) {
		if ($(e.target) === $(popupContainer)) {
			$(popupContainer)[0].removeChild($(popupContainer).children()[0]);
		}
	}).on('click', popupContainer + ' .cancel-btn', function (e) {
		//removing default action of click
		e.preventDefault();
		popupCloser($(this).parents(popupContainer));
	}).on('click', '.nav-btn', function (e) {
		e.preventDefault();
		var currentIndex = $(this).parents('.popup').index();
		// sb.registerData();
		sb.postcall.getPostObj($(this));
		var nextIndex = $(this).data('index');
		if (nextIndex >= 0) {
			if(!validation.doFormValidate($(this))){
	    	// stop further processing
	    	return false;
	    }
			sb.callPopup(nextIndex, currentIndex);
		}
	})
	// .on('click', '.toggle-click', function (e) {
	// 	// e.stopPropagation();
	// 	e.preventDefault();
	// 	if ($(e.target).hasClass('active') || $(e.target).parents('.active').length) {
	// 		if ($(e.target).hasClass('anti-toggle-click') || $(e.target).parents('.anti-toggle-click').length) {
	// 			return false;
	// 		}
	// 	}
	// 	var $this = $(this);
	// 	$('.active').not($this).removeClass('active');
	// 	$this.toggleClass('active');
	// })
	.on('click', '.popup-click', function () {
		var $self = $(this);
		var $dataHolder = $self.closest('.data-holder');
		if($dataHolder.length){
			sb.insertPopupData($dataHolder);
		}
		else if($self.hasClass('data-holder')){
			sb.insertPopupData($self);
		}
		else{
			sb.log("Didn't provide data-holder class to the element or its parent");
		}

		// var key = $(this).data('key');
		// var id = $(this).data('id');
		// if(key && id){
		// 	Kenseo.popup.data = Kenseo.data[key][id];
		// }


		sb.navigate('popup', this);
	}).on('click', '.overlay-click', function () {
		sb.navigate('overlay', this);
	}).on('click', '.slider-click', function (e){
		var sliderContainer = $('.slider-container').find('.sliders');
		if(sliderContainer.length){
			$('.sliders').css({
				'display' : 'none'
			});
			var slider = document.querySelector('.slider-container');
			slider.style.marginLeft = null;
		}
		sb.navigate('slider', this);
		$(e.currentTarget).removeClass('slider-click');
		$('.toggle-click.opened').removeClass('opened');
		$(e.currentTarget).addClass('toggle-click opened');
	}).on('click', '.toggle-click', function (e) {

		var target = e.currentTarget;
		//set the state of slider
		$(target).toggleClass('opened');
		var actionType = _.camelCase($(target).attr('data-url'));
		var currentSlider = $('.sliders[data-url = "'+actionType+'"]');
		var width = currentSlider.outerWidth();

		var slider = document.querySelector('.slider-container');
  		slider.style.marginLeft = slider.style.marginLeft?"":-slider.offsetWidth + "px";

		var openedSliders = $('.toggle-click.opened').not($(target));
			if(openedSliders.length){
				//close previously opened sliders
				setTimeout(function() {
					$('.slider-container').css({
						'min-width' : width
					});
					$('.sliders').hide();
					$('.sliders[data-url = "'+actionType+'"]').show();
					$(openedSliders).removeClass('opened');
					slider.style.marginLeft = slider.style.marginLeft?"":-slider.offsetWidth + "px";
					$(target).addClass('opened');
				},1000);
			}else{
				$('.slider-container').css({
					'min-width' : width
				});
				$('.sliders').hide();
				$('.sliders[data-url = "'+actionType+'"]').show();
			}
	}).on('click', '.page-click', function (e) {
		// To avoid default behaviour of the anchor element
		e.preventDefault();
		// Don't call other functions attached to the same event.
		e.stopPropagation();
		// Default application operations
		sb.navigate('page', this);

		// if the link is in a sub menu section, hide that section
		// $(this).parents('.toggle-click').removeClass('active');

		// if the link is in a popup, close that popup
		popupCloser($(popupContainer));

		// if the link is an anchor element, redirect it.
		// Refer: http://stackoverflow.com/a/31177540/1577396
		if(this.tagName.toLowerCase() === "a"){
			window.location.href = DOMAIN_UI_URL + $(this).attr('href');
		}
	}).on('click', '.share-btn', function () {
		var container = document.querySelectorAll('.share-artefact-people-item');
		var sharedDetails = [];
		container.forEach(function(singleContainer){
			var $elem = $(singleContainer);
			var userId = $elem.attr('data-id');
			var permissions = $elem.find('.user-permission');
			permissions.each(function(i, permission){
				var $permission = $(permission);
				if (permission.checked == true) {
					var permissionType = $permission.attr('data-elem') == 'comment' ? 'c' : 's';
					sharedDetails.push({
						'userId': userId,
						'permission': permissionType
					});
				}
			});
		});
		// sb.setPopupData(JSON.stringify(sharedDetails), 'sharedTo')
		console.log('parsing is completed');
	}).on('click', '.done-btn', function () {
		sb.registerData();
		var $self = $(this);
		var actionType = sb.getPopupData('actionType');
		var data = null;
		var files = sb.getPopupData('files');
		var plainData = false,
		    contentType = null,
		    processData = null;
	    var type = '';
	    var url = '';
	    // Validate the information
	    if(!validation.doFormValidate($(this))){
	    	// stop further processing
	    	return false;
	    }
		sb.postcall.getPostObj($self); // temporary fix
	    // Submit the information
		if (files) {
			var data = new FormData();

			for (var x in Kenseo.popup.data) {
				var dump = sb.getPopupData(x);
				if (typeof dump === 'object' && x !== 'files') {
					dump = JSON.stringify(dump);
				}
				data.append(x, dump);
			}

			for (var x = 0, xLen = files.length; x < xLen; x++) {
				data.append("filesToUpload[]", files[x]);
			}
			// TODO: Remove hardcoded document type i.e IxD
			data.append('type', 'I');
			data.append('sid', Kenseo.cookie.sessionid());
			type = 'POST';
			url = sb.getRelativePath('extUpload.php');
			plainData = true;
			contentType = false;
			processData = false;
		} else {
			data = sb.getPopupData();
			// data = _.extend(sb.getPopupData(), sb.postcall.getPostObj($self));
			url = sb.getRelativePath(actionType);
			type = 'GET';
		}

		sb.ajaxCall({
			url: url,
			data: data,
			type: type,
			plainData: plainData,
			contentType: contentType,
			processData: processData,
			container: $('.popup'),

			success: function success(response) {
				/*var response = {
					data :{
						message: "request successfull",
				    icon: "success",
				  	type: "success"
					}
				}*/
				//close the current popup
				popupCloser($self.parents(popupContainer));
				sb.refresh.type(actionType, response);
				if(response.data.messages) {
					sb.showGlobalMessages(response);
				}
			}
		});
	}).on('click', '.sort-item', function (e) {
		// var $self = $(e.currentTarget),
		//     id = sb.getPageData('project').id;
		// new Kenseo.views.Artefacts({
		// 	el: '.artifacts-content',
		// 	id: id,
		// 	colStr: 'Artefacts',
		// 	data: { projects: true, project_id: id, sharePermission: false, sortBy: $self.data('stype') },
		// 	stopRenderX: true,
		// 	preLoader: function preLoader(response) {
		// 		$('.artifacts-section').html(sb.setTemplate('artefacts', response));
		// 	}
		// });
	})
	// This is not required because people removing is handling in confirmation popup.
	// .on('click', '.people-remove-icon', function (e) {
	// 	var $self = $(e.currentTarget);
	// 	var userId = $self.attr('data-id');
	// 	var projectId = Kenseo.page.data.project.id;

	// 	sb.renderTemplate({
	// 		url: sb.getRelativePath('removePeople'),
	// 		data: {
	// 			projectId: projectId,
	// 			peopleId: userId
	// 		},
	// 		type: 'GET',
	// 		contentType: false,
	// 		processData: false,
	// 		'callbackfunc': function callbackfunc() {
	// 			popupCloser($self.parents(popupContainer));
	// 		}
	// 	});
	// })
	// .on('click', '.dvt-item.comment-summary-icon', function(e){
	// 	$('.comments-view-holder').toggleClass('active');
	// })
	.on('change', '.filter-checkboxes input[data-all="true"]', function(e){
		var $self = $(this);
		$self.parents('.filter-checkboxes-content').find('input[type="checkbox"]').not($self).prop('checked', $self.prop('checked'));
	})
	.on('change', '.filter-checkboxes input[type="checkbox"]:not([data-all="true"])', function(e){
		var $self = $(this);
		var $allchkBox = $self.parents('.filter-checkboxes-content').find('input[type="checkbox"][data-all="true"]');
		if(!$self.prop('checked')){
			$allchkBox.prop('checked', false);
		}
		else{
			var $uncheckedBoxes = $self.parents('.filter-checkboxes-content').find('input[type="checkbox"]:not([data-all="true"])').filter(function(){
				return !$(this).prop('checked');
			});
			if(!$uncheckedBoxes.length){
				$allchkBox.prop('checked', true);
			}
		}
	})
	.on('click', '[data-href]', function(e){
		var el = e.currentTarget;
		var href = el.getAttribute('data-href');

		// if any popup is open then close it
		popupCloser($(popupContainer));

		sb.redirectTo(href);
	})
	.on('blur', '.blur-field', function(e){
		//validating the fields when focus is lost
		validation.doFieldValidate($(this));
	})
});

// $(document).on('scroll', '.viewerContainer', function(e){
// 	var $self = $(this);
// 	var $bar = $self.find('.bar');
// 	$bar.css({
// 		'bottom': -this.scrollTop + "px",
// 		'left': this.scrollLeft + "px"
// 	});
// })

$(document).on('click', '.tab-item', function (e) {
    var rel = this.getAttribute('targetrel');
    $('.tab-item').removeClass('selectedTab');
    $(this).addClass('selectedTab');

	// get the selected tab at first of all tabs
	this.parentElement.insertBefore(this, this.parentElement.firstChild);

    $('.outerContainer.inView[rel!="pdf_' + rel + '"]').removeClass('inView');
    $('.outerContainer[rel="pdf_' + rel + '"]').addClass('inView');
})
//close the tab items
.on('click', '.close-tab-icon', function (e) {
	 var close = new Kenseo.views.DocumentView({});
	 close.closeTab($(this));
})
.on('click', '.active-close-icon', function (e) {
  var $parent = $(this).parents('.pdfs-container');
	//  var $el = $(this).parents('.outerContainer');
	 var $el = $('.selectedTab');
	 var close = new Kenseo.views.DocumentView({});
	 close.closeTab($el);
	 //get the first element of tab-items
	 var rel = $('.each-tab').children('.tab-item').eq(0).addClass('selectedTab').attr('targetRel');
	 //find the relevent container of tab-item
	 $parent.children('.outerContainer[rel="pdf_' + rel +'"]').addClass('inView');
	


})
.on('click', '.to-share-file', function (e) {
	$(this).toggleClass('active');
	if($('.to-share-file.active').length){
		$('.main-btn').prop("disabled",false);
	}else{
		$('.main-btn').prop("disabled",true);
	}
	//filterFiles();
});
