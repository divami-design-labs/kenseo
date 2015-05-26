sb.documentview = {
	imageSlider: function(){
		var left = document.querySelector('.left-slider'), 
			right = document.querySelector('.right-slider'),
			main = document.querySelector('.dv-tb-people'),
			h = 44;

		var threshold = 3 * h - main.offsetWidth;

		function setCalculation(bln, el, val, currentLeft){
			if(bln){
				if(val){
					main.style.left = val + currentLeft + "px";
				}
				$(el).addClass('active');
			}
			else{
				$(el).removeClass('active');
			}
		}
		function calculate(leftVal, rightVal){
			if(leftVal){
				var currentLeft = (parseInt(main.style.left, 10) || 0);

				// Calculate left
				setCalculation((currentLeft < 0 && currentLeft >= threshold), left, leftVal, currentLeft);
			}

			var currentLeft = (parseInt(main.style.left, 10) || 0);
			// Calculate right
			setCalculation((currentLeft <= 0 && currentLeft > threshold), right, rightVal, currentLeft);

			if(!leftVal){
				var currentLeft = (parseInt(main.style.left, 10) || 0);

				// Calculate left
				setCalculation((currentLeft < 0 && currentLeft >= threshold), left, leftVal, currentLeft);
			}
		}
		calculate(0);

		left.onclick = function(){
			calculate(h, null);
			calculate(0);
		}
		right.onclick = function(){
			calculate(null, 0 - h);
			calculate(0);
		}
	},
	pagination: function(){
		$(document).on('keypress', '.range', function (e) {
		    curValue = this.value + String.fromCharCode(e.which || e.keyCode);
		    if (/^\d+$/.test(curValue)) {
		        if ($(this).data('min') > curValue || $(this).data('max') < curValue) {
		            return false
		        }
		        return true
		    } else {
		        return false;
		    }
		});

		$(document).on('click', '.next-page', function (e) {
		    var curPage = $(".range").val();
		    curPage++;
		    if(curPage <= $(".range").data('max') && curPage > $(".range").data('min')) 
		        $(".range").val(curPage)
		});


		$(document).on('click', '.previous-page', function (e) {
		    var curPage = $(".range").val();
		    curPage--;
		    if(curPage < $(".range").data('max') && curPage >= $(".range").data('min')) 
		        $(".range").val(curPage)
		});
	},
	zoomSlider: function(){
		function moveIt($el, e) {
		    var remaining = e.pageX - $el.offset().left,
		        width = $el.width();

		    var thumbWidth = $('.thumb').width()
		    if (remaining < 0) {
		        remaining = 0;
		    } else if (remaining > width - thumbWidth) {
		        remaining = width - thumbWidth
		    }
		    remaining = remaining / width * 100;
		    $('.thumb').css({
		        'left': remaining + "%"
		    }).attr('range-value', remaining);
		}
		$('.thumb').on('mousedown', function () {
		    $(window).on('mousemove', function (e) {
		        moveIt($('.slider'), e);
		    });

		    $(window).on('mouseup', function () {
		        $(window).off('mousemove');
		    });
		});


		$('.slider').on('click', function (e) {
		    moveIt($(this), e);
		});
	}
}