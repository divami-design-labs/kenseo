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

			$('.slider-right, .slider-left').on('mousedown', function(){
				$self = $(this);
				$(window).on('mousemove', function(e){
					var $slider = $self.parent();
					var pLeft = $slider.offset().left;
					$slider.width(e.pageX - pLeft);
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