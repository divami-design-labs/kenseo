var slider = (function(){
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
				$self = $(this);
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
					// Movement relative to the slider
					var relativeBitMovement = sliderComponentWidth + bitMovement;

					if ($target.hasClass('slider-right')) {
						if(parentStartPoint + parentWidth >= e.pageX){
							$self.width(movement);
						}
					} else if ($target.hasClass('slider-left')) {
						if(parentStartPoint <= e.pageX){
							$self.css({
								'left': relativeMovement + 'px'
							});
							$self.width(relativeBitMovement);
						}
					} else {
						var sliderStartPoint = $self.offset().left;
						var sliderEndPoint = sliderStartPoint + sliderComponentWidth;

						console.log("=================");
						console.log(sliderStartPoint, parentStartPoint);
						console.log(sliderEndPoint, parentEndPoint);

						if(sliderStartPoint >= parentStartPoint && sliderEndPoint <= parentEndPoint){
							$self.css({
								'left': relativeMovement + 'px'
							});
						}
						else{
							var left = parseInt($self.css('left'));
							if(sliderStartPoint <= parentStartPoint){
								var left = left + 1;
							}
							else if(sliderEndPoint >= parentEndPoint){
								var left = left - 1;
							}
							$self.css({
								'left': left + "px"
							});	
						}
					}
					// storing the new start point
					moveStartPoint = e.pageX;
				});
				$(window).on('mouseup', function(){
					$(window).off('mouseup');
					$(window).off('mousemove');
				})
			});

			window.onresize = init;
		};

	init();
});