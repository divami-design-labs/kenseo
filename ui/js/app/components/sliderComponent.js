var sliderComponent = function sliderComponent(data){
	var $sliderComponent = function(){
			return $('.outerContainer.inView').find('.slider-component');
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

			$('.outerContainer.inView .slider-component').on('mousedown', function(e){
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
							if((movement) > parentWidth){
								movement = parentWidth;
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
				$(window).on('mouseup', function(e){
					$(window).off('mouseup');
					$(window).off('mousemove');
					var $target = $(e.target);
					var parentWidth = $('.outerContainer.inView .time-frame-section').width();
					var width = $sliderComponent().width();
					var left = parseInt($sliderComponent().css("left"));
					if((width + left) > parentWidth){
						$sliderComponent().width(parentWidth - left);
					}
					var timelineData = _.cloneDeep(data);
					var sliderLeft = $('.outerContainer.inView').find('.slider-left');
					var sliderRight = $('.outerContainer.inView').find('.slider-right');
					var setPosition = function(ele, pointer){
						var width = $(ele).width();
						var left = $(ele).offset().left;
						var pointerLeft = pointer.offset().left;
						var sliderWidth = pointer.parents('.slider-component').width();
						var setWidth = function(width){
							pointer.parents('.slider-component').css({
								'width' : width
							});
						};
						var setLeftPosition = function(left){
							pointer.parents('.slider-component').offset({
								left : left
							});
						};
						if($target.hasClass('slider-left')){
							if(pointerLeft - left <= width / 2){
								setLeftPosition(left);
								setWidth(sliderWidth + pointerLeft - left);
							}else{
								sliderWidth = sliderWidth - (left + width -pointerLeft);
								setLeftPosition(left + width);
								setWidth(sliderWidth);
							}
						}else if($target.hasClass('slider-right')){
							if(pointerLeft - left <= width / 2){
								setWidth(sliderWidth - (pointerLeft - left));
							}else{
								sliderWidth = sliderWidth + left + width -pointerLeft;
								setWidth(sliderWidth);
							}
						}else{
							if(pointerLeft - left <= width / 2){
								setLeftPosition(left);
								setWidth(sliderWidth);
							}else{
								setLeftPosition(left + width);
								setWidth(sliderWidth);
							}
						}

					};
					var selectedLeftElem = document.elementFromPoint(sliderLeft.offset().left, sliderLeft.offset().top);
					var selectedRightElem = document.elementFromPoint(sliderRight.offset().left, sliderRight.offset().top);
					if($target.hasClass('slider-left')){
						setPosition(selectedLeftElem, sliderLeft);
					}else if($target.hasClass('slider-right')){
						setPosition(selectedRightElem, sliderRight);
					}else{
						setPosition(selectedLeftElem, sliderLeft);
					}
					selectedLeftElem = document.elementFromPoint(sliderLeft.offset().left, sliderLeft.offset().top);
					selectedRightElem = document.elementFromPoint(sliderRight.offset().left, sliderRight.offset().top);
					var currentYear = new Date().getFullYear();
					var startDate = (new Date($(selectedLeftElem).find('.time-frame-date').html() + currentYear)).getTime();
					var endDate = (new Date($(selectedRightElem).find('.time-frame-date').html() + currentYear + ' 23:59:59')).getTime();
					for(var key in timelineData.timeline){
						var timelineFilter = new doFilter(data.timeline[key]);
						var checkDates = function(currentElement){
							//@TODO :Temporarily hardcoded, need to get data
							//var startDate = (new Date("03 AUG 2016")).getTime();
							//var endDate = (new Date('16 AUG 2016' + ' 23:59:59')).getTime();
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
					$('.outerContainer.inView').find('.time-frame-extended').html('');
					$('.outerContainer.inView').find('.time-frame-extended').append(sb.setTemplate('timeline',{data: timelineData}));
				})
			});

			window.addEventListener('resize', init);
		};

	init();
}
