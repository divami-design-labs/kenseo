var sliderComponent = function sliderComponent(){
	var $sliderComponent = function(){
			return $('.slider-component');
		},
		$mgParent = function(){
			return $sliderComponent().prev('.mg-parent');
		},
		$mgHolder = function(){
			return $mgParent().children('.mg-holder');
		},
		$mgItems = function(){
			return $mgParent().find('.mg-item');
		},
		init= function(resize){
			var width = $mgHolder().width() + $mgItems().width();
			$sliderComponent().width(width);

			$('.slider-component').on('mousedown', function(e){
				var $self = $(this);
				var $parentContainer = $self.parents('.time-frame-section');
				var parentStartPoint = $parentContainer.offset().left;
				var parentWidth = $parentContainer.width();
				var parentEndPoint = parentStartPoint + parentWidth;
				var $target = $(e.target);
				var sliderComponentDragPoint = $self.offset().left;
				var moveStartPoint = e.pageX;
				var remaining = moveStartPoint  - sliderComponentDragPoint - $self.position().left;
				$(window).on('mousemove', function (e) {
					var sliderComponentWidth = $self.width();
					// Movement from mousedown to till now
					var movement = e.pageX - sliderComponentDragPoint;
					// Movement from previous mousemove to till now
					var bitMovement = moveStartPoint - e.pageX;
					// Movement relative to the slider
					var relativeMovement = movement - remaining;
					// if(relativeMovement < 0) relativeMovement = 0;
					// Movement relative to the slider
					var relativeBitMovement = sliderComponentWidth + bitMovement;

					if ($target.hasClass('slider-right')) {
						if(parentStartPoint + parentWidth >= e.pageX){
							if((movement + parentStartPoint) > parentWidth){
								movement = parentWidth - parentStartPoint;
							}
							$self.width(movement);
						}
					} else if ($target.hasClass('slider-left')) {
						if(parentStartPoint <= e.pageX){
							if(relativeMovement < 0){
								relativeMovement = 0;
							}else if(relativeMovement > parentWidth){
								relativeMovement = parentWidth;
							}
							$self.css({
								'left': relativeMovement + 'px'
							});
							if((relativeBitMovement + relativeMovement) > parentWidth ){
								relativeBitMovement = parentWidth - relativeMovement;
							}
							$self.width(relativeBitMovement);
						}
					} else {
						var sliderStartPoint = $self.offset().left;
						var sliderEndPoint = sliderStartPoint + sliderComponentWidth;

						// console.log("=================");
						// console.log(sliderStartPoint, parentStartPoint);
						// console.log(sliderEndPoint, parentEndPoint);

						if(sliderStartPoint > parentStartPoint && sliderEndPoint <= parentEndPoint){
							// console.log(relativeMovement,  parentStartPoint - sliderStartPoint, parentEndPoint - sliderEndPoint);
							// if(parentEndPoint - sliderEndPoint < 3){
							// 	relativeMovement = relativeMovement - 1;
							// }
							if(relativeMovement < 0){
								relativeMovement = 0
							}else if(relativeMovement > parentWidth){
								relativeMovement = parentWidth;
							}
							$self.css({
								'left': relativeMovement + 'px'
							});
							// console.log("if", sliderStartPoint > parentStartPoint && sliderEndPoint < parentEndPoint);
						 }
						 else{
							 if(sliderEndPoint -  parentEndPoint < 2){
								 $self.css({
 									'left': relativeMovement + 'px'
 								});
 							}
							// console.log("else", relativeMovement,  parentStartPoint - sliderStartPoint, parentEndPoint - sliderEndPoint);
							// var left = parseInt($self.css('left'));
							// if(sliderStartPoint <= parentStartPoint){
							// 	var left = 0;
							// }
							// else if(sliderEndPoint >= parentEndPoint){
							// 	var left = $parentContainer.width() - $self.width() - 1;
							// }
							// $self.css({
							// 	'left': left + "px"
							// });
						 }
					}
					// storing the new start point
					moveStartPoint = e.pageX;
				});
				$(window).on('mouseup', function(){
					$(window).off('mouseup');
					$(window).off('mousemove');
					var parentWidth = $('.time-frame-section').width();
					var width = $('.slider-component').width();
					var left = parseInt($('.slider-component').css("left"));
					if((width + left) > parentWidth){
						$('.slider-component').width(parentWidth - left);
					}
					var timelineData = _.cloneDeep(Kenseo.sliders.data);
					for(var key in timelineData.timeline){
						var timelineFilter = new doFilter($('.summary-section-body'),'summary',Kenseo.sliders.data.timeline[key]);
						var checkDates = function(currentElement){
							var startDate = (new Date("04 AUG 2016")).getTime();
							var endDate = (new Date('16 AUG 2016' + ' 23:59:59')).getTime();
							var createdDate = (new Date(currentElement.created_date )).getTime();
							if(startDate <= createdDate && createdDate <= endDate){
								return true;
							}else{
								return false;
							}
						};
						timelineData.timeline[key] = timelineFilter.refresh({
							callBackFunc: checkDates
						});
					};
					$('.time-frame-extended').html('');
					$('.time-frame-extended').append(sb.setTemplate('timeline',{data: timelineData}));
				})
			});

			window.addEventListener('resize', init);
		};

	init();
}
