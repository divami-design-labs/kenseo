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
    fixPosition();
    return false;
}

function endPanning(e) {
    $(window).off('mousemove', startPanning);
    $(window).off('mouseup', endPanning);
    var dimensions = setPanningDimensions();
}
function beginResizing(e){
    initialPageX = e.pageX;
    initialPageY = e.pageY;
    panWidth = $('.pan-img').width();
    panHeight = $('.pan-img').height();
    $(window).on('mousemove', startResizing);
    $(window).on('mouseup', endResizing);
    if (!window.customPanning) {
        customPanning = {};
    }
    var $resizeArea = $('.resize'),
        scrollContainer = $resizeArea[0];
    var resizePosition = $resizeArea.position();
}

function startResizing(e) {
    var $resizeArea = $('.resize');
    var imgWidth = $('.img-content').width();
    var imgHeight = $('.img-content').height();
    if(imgWidth > imgHeight){
        resizedHeight = e.pageY - initialPageY + panHeight;
        if(resizedHeight > imgHeight){
            $('.pan-img').css({
                'max-width': '',
                'max-height': imgHeight
            });
        }else{
            $('.pan-img').css({
                'max-width': '',
                'max-height': resizedHeight
            });
        }

    }else{
        resizedWidth = e.pageX - initialPageX + panWidth;
        if(resizedWidth > imgWidth){
            $('.pan-img').css({
                'max-width': imgWidth,
                'max-height': ''
            });
        }else{
            $('.pan-img').css({
                'max-width': resizedWidth,
                'max-height': ''
            });
        }

    }
    fixPosition();
    return false;
}


function endResizing(e) {
    fixPosition();
    $(window).off('mousemove', startResizing);
    $(window).off('mouseup', endResizing);
    var dimensions = setPanningDimensions();
}

function fixPosition(){
    var panOffset = $('.pan-img').position();
    var panTop = panOffset.top;
    var panLeft = panOffset.left;
    var panWidth = $('.pan-img').width();
    var panHeight = $('.pan-img').height();
    var width = panLeft + panWidth - 10;
    var height = panTop + panHeight - 10
    $('.resize').removeClass('animate').css({
        "top" : height,
        "left" : width
    });
}
function setPanningDimensions() {
    var $img = $('.img-content');
    var $panImg = $('.pan-img');
    var $imgWrapper = $('.img-wrapper');


    var imgOffset = $img.offset();
    if(!imgOffset){
        return false;
    }
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
        $('.resize').addClass('animate').css({
            "left" : thresholdLeft + panWidth - 10
        });

    } else if (currentLeft + panWidth > imgWidth) {
        $panImg.addClass('animate');
        $panImg.css({
            'left': thresholdLeft + Math.abs(imgWidth - panWidth)
        });
        $('.resize').addClass('animate').css({
            "left" : thresholdLeft + Math.abs(imgWidth - panWidth) + panWidth - 10
        });
    }
    if (currentTop < 0) {
        $panImg.addClass('animate');
        $panImg.css({
            'top': thresholdTop
        });
        $('.resize').addClass('animate').css({
            "top" : thresholdTop + panHeight - 10
        });
    } else if (currentTop + panHeight > imgHeight) {
        $panImg.addClass('animate');
        $panImg.css({
            'top': thresholdTop + Math.abs(imgHeight - panHeight)
        });
        $('.resize').addClass('animate').css({
            "top" : thresholdTop + Math.abs(imgHeight - panHeight) + panHeight - 10
        });
    }
    var dimensions = {
        x : (currentLeft / imgWidth) * 100 ,
        y : (currentTop / imgHeight) * 100,
        width : (panWidth / imgWidth) * 100,
        height : (panHeight / imgHeight) * 100
    }
    return dimensions;
}
$(document).on('mousedown', '.pan-img', beginPanning);
$(document).on('mouseenter','.pan-img', function(e){
    var el = $('.resize');
    var checkbox = $('.use-full-img input');
    if(!checkbox[0].checked){
        if(el.length){
            el.show();
            fixPosition();
        }else{
            var el = document.createElement('div');
            $(el).addClass('resize').appendTo($('.img-wrapper'));
            fixPosition();
        }
    }
});

$(document).on('mousedown','.resize', beginResizing);

window.addEventListener('resize', setPanningDimensions, true);
