sb.sliders = {

	documentSummary : function(actionType) {
		//fetch the document version ID from URL
		var maskedVerId = window.location.hash.split('/')[1];
		var sliderElement = document.createElement('div');
		$(sliderElement).addClass('sliders slider-large').appendTo($('.outerContainer.inView').find('.slider-container')).attr("data-url",actionType);
		// var width = $('.slider-large').css('min-width');
		// sb.sliders.setSliderDimensions(width);
		// $('.sliders').css({
		// 	'transform' :'translate(0,0)'
		// });
		//make the call,get the data and render template
		sb.renderTemplate({
            url: sb.getRelativePath('getDocumentSummary'),
            data: {
                maskedVerId: maskedVerId
            },
            templateName: 'summary',
            templateHolder: $('.outerContainer.inView').find('.slider-large'),
			container: $('.slider-container'),
			callbackfunc: function(response){
				// Initializing slider component
				 Kenseo.sliders.data = _.cloneDeep(response.data);
				 new sliderComponent();

				// Attaching events
				var $summarSectionBody = $('.summary-section-body'),
					$close = $summarSectionBody.find('.close-icon');
				$summarSectionBody.click(function(e){
					var $overlay = $(this).parent();
					if($overlay.hasClass('view')){
				        $overlay.removeClass('view');
				    }
				});
				// Close icon
				$close.click(function(e) {
					e.stopPropagation();
					$(this).parents('.toolbar-slider').addClass('view');
				});
				$(".summary-footer-item").click(function(){
					$(".summary-footer-item").removeClass('selected-tab');
					$(this).addClass('selected-tab');
					var selectedTab = $(this).html();
					$('.summary-and-notes-section > div').hide();
					$('.summary-and-notes-section [data-url="'+ selectedTab +'"]').show();
				});
			}
        });

	},
	commentSummary : function(actionType) {
		var maskedVerId = window.location.hash.split('/')[1];
		var sliderElement = document.createElement('div');
		$(sliderElement).addClass('sliders slider-medium').appendTo($('.outerContainer.inView').find('.slider-container')).attr("data-url",actionType);
		// var width = $('.slider-medium').css('min-width');
		// sb.sliders.setSliderDimensions(width);
		// $('.sliders').css({
		// 	'transform' :'translate(0,0)'
		// });
		sb.renderTemplate({
            url: sb.getRelativePath('getCommentSummary'),
            data: {
                maskedVerId: maskedVerId
            },
            templateName: 'comments-viewer',
            templateHolder: $('.outerContainer.inView').find('.slider-medium'),
			container: $('.slider-container'),
			callbackfunc: sb.sliders.setUsers
        });

	},
	setUsers : function(response){
		var data = response.data;
		var checkThreadsLength = function(){
			var threads = Array.prototype.slice.call($('.comments-view-holder').find('.comment-container'));
			threads.forEach(function(item){
				var comments = $(item).find('.cv-comments-item');
				if(comments.length > 1){
					$(comments).hide();
					$(comments[0]).show();
					if($(item).find('.more-comments').length){
						$('.more-comments').show();
					}else{
						$(comments[0]).find('.cv-person-right').append('<div class="more-comments">+ '+ (comments.length - 1) +' more</div>')
					}
					var hider = $(item).find('.hide-comments');
					if(!hider.length){
						$(item).find('.comment-sec-wrapper').append('<button class="hide-comments">Hide</button>');
					}
				}
			});
		};
		var renderThreads = function(threads){
			var threadViews = new Kenseo.views.Threads(_.assignIn({
				collection: 		new Kenseo.collections.Threads(threads),
				isCommentViewers: 	true,
				templateName: 'comments-description',
			}, Kenseo._globalData_));
			// render threads in view
			threadViews.render();
			checkThreadsLength();

			$('.more-comments').click(function(e){
				$(this).parents('.comment-container').find('.cv-comments-item').show();
				$(this).hide();
				var threadSection = $(this).parents('.comment-sec-wrapper');
					$(threadSection).find('.hide-comments').show();
			});
			$('.hide-comments').click(function(e){
				checkThreadsLength();
				$(this).hide();
			});
		};
		var users = response.data.commentMembers;
		var $peopleSelect = $(".comment-members");
		// reset
		$peopleSelect.html('');
		// looping through each item
		users.forEach(function(item){
			var obj = {};
			obj.text = item.name;
			$peopleSelect.append(sb.setTemplate('option', {
				option: obj
			}));
		});
		// Applying chosen library
		$peopleSelect.chosen({display_selected_options: false});
		var $inputCommentsDate = $(".input-comments-date");
		$inputCommentsDate.dateRangePicker({
		     datepickerOptions : {
		         numberOfMonths : 2
		     },
			 format: 'DD MMM YYYY'
		 });
		if(!$inputCommentsDate.val()){
			// Apply the current date
			var yesterdayDate =new Date();
			yesterdayDate.setDate(yesterdayDate.getDate() - 1);
			$inputCommentsDate.val(sb.timeFormat(yesterdayDate, true, true, true) + ' to ' + sb.timeFormat(new Date(), true, true, true));
		}
		var commentsData = _.cloneDeep(response.data.threads);
		commentsData.forEach(function(item){
			item.category = Kenseo.settings.categories[item.category];
			item.severity = Kenseo.settings.severities[item.severity];
			item.state = Kenseo.settings.states[item.state];
		});
		renderThreads(commentsData);
		var filter = new doFilter(commentsData);
		var selectedOptions = [];
		$('.comments-view-filter-section').click(function(e){
			e.stopPropagation();
		});
		$('.filter-commentList-dropdown').click(function(){
			$('comments-view-filter-section').find('input:checked').prop('checked',false);
			PreviousCheckedElements = $('comments-view-filter-section').find('input:checked').filter(function(item){
				var $currentElement = $(this);
				return Array.prototype.some.call(selectedOptions,function(selectedOption){
					return $currentElement.attr('name') == selectedOption;
				});
			});
			PreviousCheckedElements.prop('checked',true);
		});
		$('.apply-filter-btn button').click(function(e){
			e.stopPropagation();
			selectedOptions = $('comments-view-filter-section').find('input:checked').map(function(){
				return $(this).attr('name');
			});
			$('.filter-icon').removeClass('enable-filter-list');
			var getCheckedOptions = function($el){
				var options = $el.find('input:checked').map(function(){
					return $(this).attr('name');
				});
				var regExp = getRegularExpression(options);
				return regExp;
			};
			var getRegularExpression = function(options) {
				return new RegExp(Array.prototype.slice.call(options).join("|"))
			};

			var checkUsers = function(currentElement){
				var users = $('.comment-members-list').find('span').map(function(){
					 return $(this).html();
	            });
				var userFilter = new doFilter(currentElement.comments);
				currentElement.comments = userFilter.refresh(
					{
					 	user : getRegularExpression(users)
					}
				);
				return currentElement;
			};
			var filteredElements = filter.refresh(
				{
					severity : getCheckedOptions($('.severity')),
					category : getCheckedOptions($('.category')),
					state : getCheckedOptions($('.status')),
					checkUsers : checkUsers,
					checkDateRange : sb.sliders.checkDateRange
				}
			);
			$('.comments-view-section').find('.cv-comments-section').html('');
			renderThreads(filteredElements);
		});

	},
	checkDateRange : function(currentElement){
		var Dates = ($(".input-comments-date").val()).split(" to ");
		var startDate = (new Date(Dates[0])).getTime();
		var endDate = (new Date(Dates[1] + ' 23:59:59')).getTime();
		currentElement.comments = currentElement.comments.filter(function(item){
			var commentDate = (new Date(item.time )).getTime();
			if(startDate <= commentDate && commentDate <=endDate){
				return true;
			}else{
				return false;
			}
		});
		return currentElement;
	},
	setSliderDimensions : function(width) {
		// $('.slider-container').css({
		// 	'min-width' : width
		// });
	}
}
