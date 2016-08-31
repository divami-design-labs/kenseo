sb.sliders = {

	documentSummary : function(actionType) {
		//fetch the document version ID from URL
		var maskedVerId = window.location.hash.split('/')[1];
		var slider = document.createElement('div');
		$(slider).addClass('sliders slider-large').appendTo($('.slider-container')).attr("data-url",actionType);
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
            templateHolder: $('.slider-large'),
			container: $('.sliders'),
        });

	},
	commentSummary : function(actionType) {
		var maskedVerId = window.location.hash.split('/')[1];
		var slider = document.createElement('div');
		$(slider).addClass('sliders slider-medium').appendTo($('.slider-container')).attr("data-url",actionType);
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
            templateHolder: $('.slider-medium'),
			callbackfunc: sb.sliders.setUsers
        });
		
	},
	setUsers : function(response){
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
		var commentsData = _.cloneDeep(response.data.commentDetails);
		commentsData.forEach(function(item){
			item.category = Kenseo.settings.categories[item.category];
			item.severity = Kenseo.settings.severities[item.severity];
			item.commentState = Kenseo.settings.states[item.commentState];
		});
		var filter = new doFilter($('.cv-comments-section'),'comment-item',commentsData);
		$('.apply-filter-btn button').click(function(e){
			e.stopPropagation();
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
			var users = $('.comment-members-list').find('span').map(function(){
				 return $(this).html();
            });
			filter.refresh(
				{
					severity : getCheckedOptions($('.severity')),
					category : getCheckedOptions($('.category')),
					commentState : getCheckedOptions($('.status')),
					user : getRegularExpression(users),
					callbackfunc : sb.sliders.checkDateRange
				}
			);
		});

	},
	checkDateRange : function(currentElement){
		var Dates = ($(".input-comments-date").val()).split(" to ");
		var startDate = (new Date(Dates[0])).getTime();
		var endDate = (new Date(Dates[1] + ' 23:59:59')).getTime();
		var commentDate = (new Date(currentElement.time )).getTime();
		if(startDate <= commentDate && commentDate <=endDate){
			return true;
		}else{
			return false;
		}
	},
	setSliderDimensions : function(width) {
		// $('.slider-container').css({
		// 	'min-width' : width
		// });
	}
}
