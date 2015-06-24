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
				var $target = $(e.target);
				var pLeft = $self.offset().left;
				var remaining = e.pageX  - pLeft - $self.position().left;
				$(window).on('mousemove', function(e){
					var width = $self.width();
					var movement = e.pageX - pLeft;
					if($target.hasClass('slider-right')){
						$self.width(movement);
					}
					else if($target.hasClass('slider-left')){
						// $self.width(width - (movement));
						$self.css({
							'left': movement - remaining + "px",
							// 'width': width - movement + "px"
						});
					}
					else{
						$self.css({
							'left': movement - remaining + "px"
						});	
					}
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