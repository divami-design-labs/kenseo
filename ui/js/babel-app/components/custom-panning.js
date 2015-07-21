// Link: http://jsfiddle.net/venkateshwar/t368uyxg/

function beginPanning(e) {
    $(window).on('mousemove', startPanning);
    $(window).on('mouseup', endPanning);

    if (!window.customPanning) {
        customPanning = {};
    }
    var $panArea = $('.pan-img'),
        scrollContainer = $panArea[0];
    var panPosition = $panArea.position();
    $panArea.removeClass('animate');
    customPanning.firstX = e.pageX + scrollContainer.scrollLeft;
    customPanning.dragX = panPosition.left;
    customPanning.firstY = e.pageY + scrollContainer.scrollTop;
    customPanning.dragY = panPosition.top;
}

function startPanning(e) {
    var $panArea = $('.pan-img');
    var scrollContainer = $panArea.parents('.container')[0];
    var $img = $('.img-content');

    var left = e.pageX - customPanning.firstX + customPanning.dragX,
        top = e.pageY - customPanning.firstY + customPanning.dragY;

    $panArea.css({
        'left': left,
            'top': top
    });
    return false;
}

function endPanning(e) {
    $(window).off('mousemove', startPanning);
    $(window).off('mouseup', endPanning);

    setPanningDimensions();
}
$(document).on('mousedown', '.pan-img', beginPanning);

function setPanningDimensions() {
    var $img = $('.img-content');
    var $panImg = $('.pan-img');
    var $imgWrapper = $('.img-wrapper');

    $('.pan-img').css({
        'max-width': $('.img-content').width(),
            'max-height': $('.img-content').height()
    });

    var imgOffset = $img.offset();
    var imgWrapperOffset = $imgWrapper.offset();
    var panOffset = $panImg.offset();

    var imgLeft = imgOffset.left;
    var imgTop = imgOffset.top;
    var imgWidth = $img.width();
    var imgHeight = $img.height();

    var imgWrapperLeft = imgWrapperOffset.left;
    var imgWrapperTop = imgWrapperOffset.top;
    var imgWrapperWidth = $imgWrapper.width();
    var imgWrapperHeight = $imgWrapper.height();

    var panLeft = panOffset.left;
    var panTop = panOffset.top;
    var panWidth = $panImg.width();
    var panHeight = $panImg.height();

    var thresholdLeft = imgLeft - imgWrapperLeft;
    var thresholdTop = imgTop - imgWrapperTop;
    var currentLeft = panLeft - imgLeft;
    var currentTop = panTop - imgTop;

    if (currentLeft < 0) {
        $panImg.addClass('animate');
        $panImg.css({
            'left': thresholdLeft
        });
    } else if (currentLeft + panWidth > imgWidth) {
        $panImg.addClass('animate');
        $panImg.css({
            'left': thresholdLeft + Math.abs(imgWidth - panWidth)
        });
    }
    if (currentTop < 0) {
        $panImg.addClass('animate');
        $panImg.css({
            'top': thresholdTop
        });
    } else if (currentTop + panHeight > imgHeight) {
        $panImg.addClass('animate');
        $panImg.css({
            'top': thresholdTop + Math.abs(imgHeight - panHeight)
        });
    }
}
// setPanningDimensions();
window.addEventListener('resize', setPanningDimensions, true);