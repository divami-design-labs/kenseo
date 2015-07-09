$(function () {
	var popupContainer = '.popup-container',
	    closePopupIcon = '.popup-close-icon';

	function popupCloser($el) {
		$el.hide();
		$el.children().remove();
		sb.popup.resetPopupData();
	}

	// Events

	$(document).on('click', function (e) {
		var $el = $(e.target);
		var bln = $el.hasClass('.toggle-click') || $el.parents('.toggle-click').length;
		// var bln = 	$el.hasClass('popup-click')
		// 			|| $el.hasClass('page-click')
		// 			|| $el.hasClass('toggle-click')
		// 			|| $el.parents('.popup-click').length
		// 			|| $el.parents('page-click').length
		// 			|| $el.parents('.toggle-click').length;
		if (!bln) {
			$('.toggle-click').removeClass('active');
		}
	}).on('click', closePopupIcon, function () {
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
		e.preventDefault();
		popupCloser($(this).parents(popupContainer));
	}).on('click', '.nav-btn', function (e) {
		e.preventDefault();

		sb.registerData();
		var $dataUrl = $(this).data('index');
		if ($dataUrl >= 0) {
			sb.callPopup($dataUrl);
		}
	}).on('click', '.toggle-click', function (e) {
		// e.stopPropagation();
		e.preventDefault();
		if ($(e.target).hasClass('active') || $(e.target).parents('.active').length) {
			if ($(e.target).hasClass('anti-toggle-click') || $(e.target).parents('.anti-toggle-click').length) {
				return false;
			}
		}
		var $this = $(this);
		$('.active').not($this).removeClass('active');
		$this.toggleClass('active');
	}).on('click', '.popup-click', function () {
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
		$(this).parents('.toggle-click').removeClass('active');

		// if the link is in a popup, close that popup
		popupCloser($(popupContainer));

		// if the link is an anchor element, redirect it.
		// Refer: http://stackoverflow.com/a/31177540/1577396
		if(this.tagName.toLowerCase() === "a"){
			window.location.href = DOMAIN_UI_URL + $(this).attr('href');
		}
	}).on('click', '.share-btn', function () {
		var container = document.querySelectorAll('.share-artefact-people-item');
		console.log(container);
		var sharedDetails = [];
		for (var i = 0; i < container.length; i++) {
			var $elem = $(container[i]);
			var userId = $elem.attr('data-id');
			var permissions = $elem.find('.user-permission');
			for (var j = 0; j < permissions.length; j++) {
				var $permission = $(permissions[j]);
				if ($permission[0].checked == true) {
					var permissionType = $($permission[0]).attr('data-elem') == 'comment' ? 'c' : 's';
					sharedDetails.push({
						'userId': userId,
						'permission': permissionType
					});
				}
			}
		}
		// sb.setPopupData(JSON.stringify(sharedDetails), 'sharedTo')
		console.log('parsing is completed');
	}).on('click', '.done-btn', function () {
		sb.registerData();
		var $self = $(this);
		var actionType = sb.getPopupData('actionType');
		var data = null;
		var file = sb.getPopupData('file');
		var plainData = false,
		    contentType = null,
		    processData = null;

		if (file) {
			var data = new FormData();

			for (x in Kenseo.popup.data) {
				var dump = sb.getPopupData(x);
				if (typeof dump === 'object' && x !== 'file') {
					dump = JSON.stringify(dump);
				}
				data.append(x, dump);
			}

			data.append('type', 'I');
			data.append('sid', Kenseo.cookie.sessionid());
			type = 'POST';
			url = sb.getRelativePath('extUpload.php');
			plainData = true;
			contentType = false;
			processData = false;
		} else {
			data = sb.getPopupData(), url = sb.getRelativePath(actionType);
			type = 'GET';
		}

		sb.ajaxCall({
			url: url,
			data: data,
			type: type,
			plainData: plainData,
			contentType: contentType,
			processData: processData,
			success: function success() {
				popupCloser($self.parents(popupContainer));
				if (Kenseo.currentModel) {
					if (actionType === 'archiveProject') {
						Kenseo.currentModel.collection.remove(Kenseo.currentModel);
					} else if (actionType === 'archiveArtefact') {
						Kenseo.currentModel.collection.remove(Kenseo.currentModel);
					} else if (actionType === 'deleteArtefact') {
						Kenseo.currentModel.collection.remove(Kenseo.currentModel);
					} else if (actionType === 'addProject') {
						// Add the project to the Dashboard section
						var $projectSectionContent = $('.projects-section-content');
						if($projectSectionContent.length){
							var projectView = new Kenseo.views.Project();
							$projectSectionContent.append(projectView.render(
								{ 
									name: data.projectName.value,
									last_updated_date: new Date().toString(),
									id: 'x3'
								}
							).$el);
						}
					}
				}
			}
		});
	}).on('click', '.sort-item', function (e) {
		var $self = $(e.currentTarget),
		    id = sb.getPageData('project').id;
		new Kenseo.views.Artefacts({
			el: '.artifacts-content',
			id: id,
			colStr: 'Artefacts',
			data: { projects: true, project_id: id, sharePermission: false, sortBy: $self.data('stype') },
			preLoader: function preLoader(response) {
				$('.artifacts-section').html(_.template(templates['artefacts'])(response));
			}
		});
	}).on('click', '.people-remove-icon', function (e) {
		var $self = $(e.currentTarget);
		var userId = $self.attr('data-id');
		var projectId = Kenseo.page.data.project.id;

		sb.renderTemplate({
			url: sb.getRelativePath('removePeople'),
			data: {
				projectId: projectId,
				peopleId: userId
			},
			type: 'GET',
			contentType: false,
			processData: false,
			'callbackfunc': function callbackfunc() {
				popupCloser($self.parents(popupContainer));
			}
		});
	}).on('click', '.dvt-item.comment-summary-icon', function(e){
		$('.comments-view-holder').toggleClass('active');
	});
});


var stickToBottom = function (parent) {
    var bar = parent.querySelector('.bar');
    var top = bar.offsetTop;
    parent.addEventListener('scroll', function (e) {
        var el = e.currentTarget;
        bar.style.bottom = -el.scrollTop + "px";
        bar.style.left = el.scrollLeft + "px";
    });
}