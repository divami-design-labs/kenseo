'use strict';

sb.documentview = {
	imageSlider: function imageSlider() {
		var left = document.querySelector('.left-slider'),
		    right = document.querySelector('.right-slider'),
		    main = document.querySelector('.dv-tb-people'),
		    h = 44;

		var threshold = 3 * h - main.offsetWidth;

		function setCalculation(bln, el, val, currentLeft) {
			if (bln) {
				if (val) {
					main.style.left = val + currentLeft + 'px';
				}
				$(el).addClass('active');
			} else {
				$(el).removeClass('active');
			}
		}
		function calculate(leftVal, rightVal) {
			if (leftVal) {
				var currentLeft = parseInt(main.style.left, 10) || 0;

				// Calculate left
				setCalculation(currentLeft < 0 && currentLeft >= threshold, left, leftVal, currentLeft);
			}

			var currentLeft = parseInt(main.style.left, 10) || 0;
			// Calculate right
			setCalculation(currentLeft <= 0 && currentLeft > threshold, right, rightVal, currentLeft);

			if (!leftVal) {
				var currentLeft = parseInt(main.style.left, 10) || 0;

				// Calculate left
				setCalculation(currentLeft < 0 && currentLeft >= threshold, left, leftVal, currentLeft);
			}
		}
		calculate(0);
		if (left) {
			left.onclick = function () {
				calculate(h, null);
				calculate(0);
			};
		}
		if (right) {
			right.onclick = function () {
				calculate(null, 0 - h);
				calculate(0);
			};
		}
	},
	pagination: function pagination() {
		function gotoPage(value) {
			$pdf = $('#pdf-container'), $a = $('a[href="' + value + '"]');
			$pdf.scrollTop($pdf.scrollTop() + $a.offset().top);
		}
		$('#pdf-container').scroll(function () {
			var $self = $(this),
			    scrollTop = $self.scrollTop(),
			    height = $('.pdf-page').height(),
			    xHeight = $self.height();

			$anchors = $self.find('a');
			selectedAnchor = null;
			for (var i = 0; i < $anchors.length; i++) {
				var a = $anchors[i],
				    top = a.offsetTop;
				if (top <= scrollTop + xHeight / 3) {
					selectedAnchor = a;
				} else {
					break;
				}
			}
			if (selectedAnchor) {
				$('.range').html($(selectedAnchor).attr('href'));
			}
		});
		$(document).on('keypress', '.range', function (e) {
			var sel = document.getSelection();
			var keyCode = e.which || e.keyCode,
			    pressedChar = String.fromCharCode(keyCode),
			    start = sel.extentOffset,
			    end = sel.baseOffset,
			    str = this.innerHTML,
			    re = /^\d+$/,
			    curValue = str.substr(0, start) + pressedChar + str.substr(end);
			min = $(this).data('min'), max = $(this).data('max');

			if (re.test(curValue)) {
				if (min > curValue || max < curValue) {
					return false;
				}
				return true;
			} else if (keyCode == 13) {
				if (re.test(this.innerHTML)) {
					gotoPage(this.innerHTML);
				}
			} else {
				return false;
			}
		});

		$(document).on('click', '.next-page', function (e) {
			var curPage = $('.range').html();
			curPage++;
			if (curPage <= $('.range').data('max') && curPage > $('.range').data('min')) {
				$('.range').html(curPage);
				gotoPage(curPage);
			}
		});

		$(document).on('click', '.previous-page', function (e) {
			var curPage = $('.range').html();
			curPage--;
			if (curPage < $('.range').data('max') && curPage >= $('.range').data('min')) {
				$('.range').html(curPage);
				gotoPage(curPage);
			}
		});
	},
	zoomSlider: function zoomSlider() {
		function moveIt($el, e) {
			var remaining = e.pageX - $el.offset().left,
			    width = $el.width();

			var thumbWidth = $('.thumb').width();
			if (remaining < 0) {
				remaining = 0;
			} else if (remaining > width - thumbWidth) {
				remaining = width - thumbWidth;
			}
			remaining = remaining / width * 100;
			$('.thumb').css({
				'left': remaining + '%'
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
};