$(function () {
	var popupContainer = '.popup-container',
	    closePopupIcon = '.popup-close-icon';
  //close the current popup and store the data
	function popupCloser($el) {
		sb.popupCloser($el);
	}

	// Events

	$(document)
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

		sb.navigate('popup', this);
	}).on('click', '.overlay-click', function () {
		sb.navigate('overlay', this);
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

	    var params = sb.getPreparedParams(actionType);
        var info = {};
        params.forEach(function(el){
			if(Kenseo.popup.data[el] !== undefined){
	            info[el] = Kenseo.popup.data[el];
			}
        });


		if (files) {
			var data = new FormData();

			for (var x in info) {
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
			data = info;
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
				if($(popupContainer).find('.popup-large').length || $(popupContainer).find('.popup-meeting').length){
					$(popupContainer).find('button').attr('disabled', 'false');
					setTimeout(function(){
						popupCloser($self.parents(popupContainer));
					},2010);
					if(response.data.messages) {
						sb.showGlobalMessages(response,popupContainer);
					}
				}else{
					popupCloser($self.parents(popupContainer));
					if(response.data.messages) {
						sb.showGlobalMessages(response);
					}
				}
				sb.refresh.type(actionType, response);
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
	.on('click', '.your-team-heading', (e) => {
		var people =e.target.attributes['data-type'].nodeValue;
        sb.popup.togglePeople(people);
	})
	.on('keyup input', '[data-input="mail_id"]', (e) => {
		if(e.target.value.length === 0){
			$(".invalid-mail-id").html('');
			return false;
		}
		else if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)))
		{
			$(".invalid-mail-id").html('');
		 	$(".invalid-mail-id").append("Invalid mail-id , please Enter correct mail-id");
		}
		else{
			$(".invalid-mail-id").html('');
			if(e.keyCode === 13){
				var obj = {'data-email'	:	e.target.value,
					'data-excludeparent':	"false",
					'data-id'			:	"NaN",
					'data-in_project'	:	"0",
					'data-picture'		:	"",
					'name'              :	e.target.value,
				};
				// comboBox.setSuggestionViewerItem(obj);
				sb.popup.renderSharePopupPeople(obj, true);
				e.currentTarget.value = '';
			}
		
		}
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
	 if($('.each-tab').children('.tab-item').eq(0).length === 0)	{
		window.location.href = DOMAIN_UI_URL+"#";
		return false;
	 }
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
