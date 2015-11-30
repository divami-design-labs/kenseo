var annotation = (function () {
    var g = {
        fixed: 30
    },
        paintPdf = function paintPdf(data) {
        function loadPDFJS() {
            PDFJS.workerSrc = 'libs/pdfjs/pdf.worker.js';
            var currentPage = 1;
            var pages = [];
            var globalPdf = null;
            var container = g.$container.children('.document-viewer')[0];
            function renderPage(page) {
                //
                // Prepare canvas using PDF page dimensions
                //
                // var canvas = document.getElementById('main');
                var canvas = document.createElement('canvas');
                // Link: http://stackoverflow.com/a/13039183/1577396
                // Canvas width should be set to the window's width for appropriate
                // scaling factor of the document with respect to the canvas width
                var viewport = page.getViewport(window.screen.width / page.getViewport(1).width);
                canvas.className = 'pdf-page ' + page.pageIndex;
                // append the created canvas to the container
                var anchor = document.createElement('a');
                anchor.href = page.pageIndex + 1;

                container.appendChild(anchor);
                container.appendChild(canvas);
                // Get context of the canvas
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                //
                // Render PDF page into canvas context
                //
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext).then(function () {
                    var currentPageIndex = page.pageIndex + 1;
                    $('.range').attr('data-max', currentPageIndex).next().html(' of ' + currentPageIndex);
                    if (currentPage < globalPdf.numPages) {
                        pages[currentPage] = canvas;
                        currentPage++;
                        globalPdf.getPage(currentPage).then(renderPage);
                    } else {
                        // other callback functions
                        resetValues();
                        if (data) {
                            loadAnnotations(data);
                        }
                        systemCallBacks();
                        if (g.afterLoadCallBack) {
                            g.afterLoadCallBack(globalPdf, page);
                        }
                    }
                });
            }
            PDFJS.getDocument(g.fileName).then(function (pdf) {
                if (!globalPdf) {
                    globalPdf = pdf;
                }
                pdf.getPage(currentPage).then(renderPage);
            });
        }
        loadPDFJS();
    },
        loadAnnotations = function loadAnnotations(p) {
        p = p || {};
        var annotations = p.annotations;
        if (annotations) {
            for (var i = 0; i < annotations.length; i++) {
                var annotate = annotations[i];

                buildElement({
                    'left': annotate.left,
                    'top': annotate.top,
                    'shape': annotate.shape
                });
                drawElement({
                    'width': annotate.width,
                    'height': annotate.height
                });
                setElement();
            }
        }
    },
        systemCallBacks = function systemCallBacks() {
        g.$container.scroll(function () {
            g.scrollTop = $(this).scrollTop();
        });
        $('.pdf-page').on('mousedown', beginDraw);
        $('.toolbar div').on('click', function () {
            $(this).parent().children().removeClass('select');
            $(this).addClass('select');
        });
        $(document).on('click', '.shape', bringCommentSectionFront);
        $(document).on('click', '.severity-item', function () {
            $(this).parent().children().removeClass('tick');
            $(this).addClass('tick');
        });
        $(window).resize(resetValues);
        g.scrollTop = g.$container.scrollTop();
    },
        setElement = function setElement(dimensions) {
        var $clone = $('.comment-section-hide > .comment-section').clone(false, false);
        $clone.appendTo(g.$selectedArea);
        g.$selectedArea.addClass('shape-min');
        setLayout($clone);
    },
        setLayout = function setLayout($commentSection) {
        if ($commentSection.length) {
            // reset all classes
            $commentSection.removeClass('comment-section-left').removeClass('comment-section-right').removeClass('stick-to-top').removeClass('stick-to-bottom');

            // Don't change the below repeating code in to reusable variables.
            // Reason: The css classes which are being added are changing the properties.
            // Horizontal alignment
            if ($commentSection.offset().left + $commentSection.width() + $commentSection.parent().width() + 45 > $('.document-viewer').width()) {
                $commentSection.addClass('comment-section-left');
            } else {
                $commentSection.addClass('comment-section-right');
            }
            // Vertical alignment
            if ($commentSection.parents('.shape').position().top + g.scrollTop < 50) {
                $commentSection.addClass('stick-to-top');
            }
            //  Math.abs($commentSection.position().top)
            else if ($commentSection.offset().top + g.scrollTop + $commentSection.height() + 20 > $('.document-viewer').height()) {
                    $commentSection.addClass('stick-to-bottom');
                }
        }
    },
        getOffsetLeft = function getOffsetLeft(e) {
        // return e.offsetX==undefined?e.originalEvent.layerX:e.offsetX;
        return e.clientX;
    },
        getOffsetTop = function getOffsetTop(e) {
        return e.clientY;
        // return e.offsetY==undefined?e.originalEvent.layerY:e.offsetY;// + $('.document-viewer')[0].scrollTop;
    },
        beginDraw = function beginDraw(e) {
        if (e.which === 1) {
            var shape = $('.dvt-item.add-comment-icon').data('value');
            // Check whether the shape is other than cursor
            // So that the annotation can happen
            if (shape !== 'cursor') {
                g.firstX = e.clientX - g.contentOffset.left; //getOffsetLeft(e);
                g.firstY = e.clientY + g.scrollTop - g.contentOffset.top; //getOffsetTop(e) + e.currentTarget.offsetTop;
                g.$selectedArea = $(document.createElement('div'));
                g.$selectedArea[0].className = 'shape rectangle';
                beginDraw.offset = {
                    'left': g.firstX,
                    'top': g.firstY
                };
                $(g.$selectedArea).css(beginDraw.offset);
                $(g.$selectedArea).appendTo(g.$container);
                $('.page').on('mousemove', moveDraw);
                $(window).on('mouseup', endDraw);
                buildElement({
                    'left': g.firstX,
                    'top': g.firstY,
                    'shape': shape
                });
            }
        }
    },
        moveDraw = function moveDraw(e) {
        // var $self = beginDraw.div;
        drawElement({
            'width': e.clientX - g.contentOffset.left - beginDraw.offset.left,
            // 'height': getOffsetTop(e) + e.currentTarget.offsetTop - beginDraw.offset.top
            'height': e.clientY + g.scrollTop - beginDraw.offset.top - g.contentOffset.top
        });
    },
        endDraw = function endDraw(e) {
        setElement();
        // Making the selectedArea variable null to be ready for next iteration.
        g.$selectedArea = null;
        $('.page').off('mousemove');
        $(window).off('mouseup', endDraw);
    },
        buildElement = function buildElement(p) {
        g.$selectedArea = g.$selectedArea || $(document.createElement('div'));

        $resizerClone = $('.resizer-section > div').clone(false, false);
        $(g.$selectedArea).append($resizerClone);

        g.$selectedArea[0].className = 'shape ' + p.shape;
        $(g.$selectedArea).css({
            'left': getPercentageValue(p.left, true),
            'top': getPercentageValue(p.top, false)
        })
        // .addClass(p.shape)
        // .append($resizerClone)
        .appendTo(g.$container.children('.document-viewer'));
        $resizerClone.on('mousedown', repositionStart);
        $resizerClone.find('[data-resize]').on('mousedown', resizeStart);
    },
        drawElement = function drawElement(p) {
        $(g.$selectedArea).css({
            'width': getPercentageValue(p.width, true),
            'height': getPercentageValue(p.height, false)
        });
    },
        getPercentageValue = function getPercentageValue(value, isWidth) {
        var total = isWidth ? g.containerWidth : g.wrapperHeight;
        return Math.abs(value / total * 100) + '%';
        // return value;
        // return Math.abs(value);
    },
        bringCommentSectionFront = function bringCommentSectionFront(e) {
        var self = $(this);
        if (bringCommentSectionFront.prev) {
            bringCommentSectionFront.prev.css({ 'zIndex': '' });
        }
        self.css({ 'zIndex': '4' });
        bringCommentSectionFront.prev = self;
    },

    // Start of reposition functions
    repositionStart = function repositionStart(e) {
        if (e.target.getAttribute('data-resize')) {
            // e.stopPropagation();
            return false;
        }
        $self = $(this).parent();
        $(window).on('mousemove', repositionShape);
        $(window).on('mouseup', repositionEnd);
        repositionStart.commentSection = $self.find('.comment-section');
        repositionStart.blnShow = repositionStart.commentSection.is(':visible');
        repositionStart.self = $self;
        // repositionStart.offset = {
        //     left: e.clientX - $self.position().left,
        //     top : e.clientY - $self.position().top
        // };
        repositionStart.offset = {
            left: e.clientX - $self.position().left,
            top: e.clientY + g.scrollTop - $self.position().top //- g.contentOffset.top
        };
    },
        repositionShape = function repositionShape(e) {
        $self = repositionStart.self;
        $commentSection = repositionStart.commentSection;
        $self.css({
            'left': getPercentageValue(e.clientX - repositionStart.offset.left, true),
            'top': getPercentageValue(e.clientY + g.scrollTop - repositionStart.offset.top, false)
        });
        setLayout($commentSection);
        //
        if (typeof repositionStart.mouseMoved === 'undefined') {
            repositionStart.mouseMoved = true;
            $commentSection.hide();
        }
    },
        repositionEnd = function repositionEnd(e) {
        $(window).off('mousemove');
        $(window).off('mouseup');
        var $commentSection = repositionStart.commentSection;
        if (repositionStart.mouseMoved) {
            if (repositionStart.blnShow) {
                $commentSection.show();
            } else {
                $commentSection.hide();
            }
        } else {
            $commentSection.toggle();
        }
        setLayout($commentSection);
        repositionStart.self = null;
        repositionStart.mouseMoved = undefined;
    },

    // End of reposition functions

    // Start of resizing functions
    resizeStart = function resizeStart(e) {
        resizeStart.self = $(this);
        $(window).on('mousemove', resizeShape);
        $(window).on('mouseup', resizeEnd);
    },
        resizeShape = function resizeShape(e) {
        var $resizer = resizeStart.self;
        var $shape = $resizer.parents('.shape');
        var op = $resizer.data('resize');

        var offset = $shape.offset();
        var position = $shape.position();
        var pOffset = g.$container.offset();

        var shape = {
            width: $shape.width(),
            height: $shape.height(),
            oTop: offset.top,
            oLeft: offset.left,
            pTop: position.top,
            pLeft: position.left
        };

        var offsetLeft = e.pageX;
        var offsetTop = e.pageY;

        var xUp = g.scrollTop + offsetTop - pOffset.top - shape.pTop;
        // var xDown      = (offsetLeft - pOffset.left) - shape.pLeft;
        var xDown = offsetLeft - pOffset.left - shape.pLeft;

        var width = offsetLeft - shape.oLeft;
        var height = offsetTop - offset.top;

        var xHeight = shape.height - xUp;
        var xWidth = shape.width - xDown;

        var xTop = shape.height === g.fixed ? shape.pTop : g.scrollTop + offsetTop - pOffset.top;
        var xLeft = shape.width === g.fixed ? shape.pLeft : shape.pLeft + xDown;

        if (op === 'br') {
            $shape.css({
                'width': width,
                'height': height
            });
        } else if (op === 'tr') {
            $shape.css({
                'height': xHeight,
                'top': xTop,
                'width': width
            });
        } else if (op === 'tl') {
            $shape.css({
                'height': xHeight,
                'top': xTop,
                'width': xWidth,
                'left': xLeft
            });
        } else if (op === 'bl') {
            $shape.css({
                'width': xWidth,
                'left': xLeft,
                'height': height
            });
        }
        setLayout($shape.find('.comment-section'));
    },
        resizeEnd = function resizeEnd(e) {
        $(window).off('mousemove');
        $(window).off('mouseup');
        //make values in to percentage
        var $shape = resizeStart.self.parents('.shape');
        $shape.css({
            'left': getPercentageValue($shape.position().left, true),
            'top': getPercentageValue($shape.position().top, false),
            'width': getPercentageValue($shape.width(), true),
            'height': getPercentageValue($shape.height(), false)
        });
        resizeStart.self = null;
    },

    //End of resizing functions
    resetValues = function resetValues() {
        g.contentOffset = g.$container.offset();
        g.containerWidth = g.$container.width();
        g.containerHeight = g.$container.height();
        g.wrapperHeight = g.$container[0].scrollHeight;
    },
        init = function init(payload) {
        if (payload && typeof payload === 'object') {
            for (p in payload) {
                g[p] = payload[p];
            }
        }
        g.$container = $('#pdf-container'); //document.getElementById('pdf-container');
        paintPdf(g.data);
    };
    return {
        init: init
    };
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2JhYmVsLWFwcC9jb21wb25lbnRzL29sZC1hbm5vdGF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxVQUFVLEdBQUcsQ0FBQyxZQUFZO0FBQzFCLFFBQUksQ0FBQyxHQUFHO0FBQ0osYUFBSyxFQUFFLEVBQUU7S0FDWjtRQUNHLFFBQVEsR0FBRyxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDbkMsaUJBQVMsU0FBUyxHQUFHO0FBQ2pCLGlCQUFLLENBQUMsU0FBUyxHQUFHLDBCQUEwQixDQUFDO0FBQzdDLGdCQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDcEIsZ0JBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNmLGdCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDckIsZ0JBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0QscUJBQVMsVUFBVSxDQUFDLElBQUksRUFBRTs7Ozs7QUFLdEIsb0JBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDOzs7O0FBQUMsQUFJOUMsb0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqRixzQkFBTSxDQUFDLFNBQVMsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVM7O0FBQUMsQUFFaEQsb0JBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekMsc0JBQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7O0FBRWpDLHlCQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLHlCQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQzs7QUFBQyxBQUU5QixvQkFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxzQkFBTSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2hDLHNCQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLOzs7O0FBQUMsQUFJOUIsb0JBQUksYUFBYSxHQUFHO0FBQ2hCLGlDQUFhLEVBQUUsT0FBTztBQUN0Qiw0QkFBUSxFQUFFLFFBQVE7aUJBQ3JCLENBQUM7QUFDRixvQkFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWTtBQUN4Qyx3QkFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUMxQyxxQkFBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLENBQUM7QUFDdEYsd0JBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUU7QUFDbEMsNkJBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDNUIsbUNBQVcsRUFBRSxDQUFDO0FBQ2QsaUNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUNuRCxNQUFNOztBQUVILG1DQUFXLEVBQUUsQ0FBQztBQUNkLDRCQUFJLElBQUksRUFBRTtBQUNOLDJDQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ3pCO0FBQ0QsdUNBQWUsRUFBRSxDQUFDO0FBQ2xCLDRCQUFJLENBQUMsQ0FBQyxpQkFBaUIsRUFBRTtBQUNyQiw2QkFBQyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDeEM7cUJBQ0o7aUJBQ0osQ0FBQyxDQUFDO2FBQ047QUFDRCxpQkFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQzlDLG9CQUFJLENBQUMsU0FBUyxFQUFFO0FBQ1osNkJBQVMsR0FBRyxHQUFHLENBQUM7aUJBQ25CO0FBQ0QsbUJBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzdDLENBQUMsQ0FBQztTQUNOO0FBQ0QsaUJBQVMsRUFBRSxDQUFDO0tBQ2Y7UUFDRyxlQUFlLEdBQUcsU0FBUyxlQUFlLENBQUMsQ0FBQyxFQUFFO0FBQzlDLFNBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1osWUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQztBQUNoQyxZQUFJLFdBQVcsRUFBRTtBQUNiLGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6QyxvQkFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUU5Qiw0QkFBWSxDQUFDO0FBQ1QsMEJBQU0sRUFBRSxRQUFRLENBQUMsSUFBSTtBQUNyQix5QkFBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHO0FBQ25CLDJCQUFPLEVBQUUsUUFBUSxDQUFDLEtBQUs7aUJBQzFCLENBQUMsQ0FBQztBQUNILDJCQUFXLENBQUM7QUFDUiwyQkFBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLO0FBQ3ZCLDRCQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU07aUJBQzVCLENBQUMsQ0FBQztBQUNILDBCQUFVLEVBQUUsQ0FBQzthQUNoQjtTQUNKO0tBQ0o7UUFDRyxlQUFlLEdBQUcsU0FBUyxlQUFlLEdBQUc7QUFDN0MsU0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsWUFBWTtBQUM1QixhQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNyQyxDQUFDLENBQUM7QUFDSCxTQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxQyxTQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO0FBQ3RDLGFBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEQsYUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QixDQUFDLENBQUM7QUFDSCxTQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztBQUM1RCxTQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZO0FBQ2xELGFBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEQsYUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QixDQUFDLENBQUM7QUFDSCxTQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzlCLFNBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUMxQztRQUNHLFVBQVUsR0FBRyxTQUFTLFVBQVUsQ0FBQyxVQUFVLEVBQUU7QUFDN0MsWUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLDBDQUEwQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMvRSxjQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNqQyxTQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0QyxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JCO1FBQ0csU0FBUyxHQUFHLFNBQVMsU0FBUyxDQUFDLGVBQWUsRUFBRTtBQUNoRCxZQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUU7O0FBRXhCLDJCQUFlLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQzs7Ozs7QUFBQyxBQUtwSixnQkFBSSxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO0FBQ2pJLCtCQUFlLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDcEQsTUFBTTtBQUNILCtCQUFlLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUM7YUFDckQ7O0FBQUEsQUFFRCxnQkFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsRUFBRTtBQUNyRSwrQkFBZSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7O0FBQzVDLGlCQUVJLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7QUFDbEgsbUNBQWUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQkFDL0M7U0FDSjtLQUNKO1FBQ0csYUFBYSxHQUFHLFNBQVMsYUFBYSxDQUFDLENBQUMsRUFBRTs7QUFFMUMsZUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDO0tBQ3BCO1FBQ0csWUFBWSxHQUFHLFNBQVMsWUFBWSxDQUFDLENBQUMsRUFBRTtBQUN4QyxlQUFPLENBQUMsQ0FBQyxPQUFPOztBQUFDLEtBRXBCO1FBQ0csU0FBUyxHQUFHLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRTtBQUNsQyxZQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQ2YsZ0JBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7OztBQUFDLEFBRzFELGdCQUFJLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDcEIsaUJBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUk7QUFBQyxBQUM1QyxpQkFBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHO0FBQUMsQUFDekQsaUJBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNuRCxpQkFBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFDakQseUJBQVMsQ0FBQyxNQUFNLEdBQUc7QUFDZiwwQkFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNO0FBQ2hCLHlCQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU07aUJBQ2xCLENBQUM7QUFDRixpQkFBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLGlCQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDMUMsaUJBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLGlCQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqQyw0QkFBWSxDQUFDO0FBQ1QsMEJBQU0sRUFBRSxDQUFDLENBQUMsTUFBTTtBQUNoQix5QkFBSyxFQUFFLENBQUMsQ0FBQyxNQUFNO0FBQ2YsMkJBQU8sRUFBRSxLQUFLO2lCQUNqQixDQUFDLENBQUM7YUFDTjtTQUNKO0tBQ0o7UUFDRyxRQUFRLEdBQUcsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFOztBQUVoQyxtQkFBVyxDQUFDO0FBQ1IsbUJBQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSTs7QUFFakUsb0JBQVEsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHO1NBQ2pGLENBQUMsQ0FBQztLQUNOO1FBQ0csT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFDLENBQUMsRUFBRTtBQUM5QixrQkFBVSxFQUFFOztBQUFDLEFBRWIsU0FBQyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDdkIsU0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM1QixTQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNyQztRQUNHLFlBQVksR0FBRyxTQUFTLFlBQVksQ0FBQyxDQUFDLEVBQUU7QUFDeEMsU0FBQyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O0FBRXRFLHFCQUFhLEdBQUcsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNoRSxTQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFekMsU0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDbEQsU0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDbkIsa0JBQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztBQUN4QyxpQkFBSyxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO1NBQzFDOzs7QUFBQyxTQUdELFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDckQscUJBQWEsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQy9DLHFCQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDcEU7UUFDRyxXQUFXLEdBQUcsU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFO0FBQ3RDLFNBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ25CLG1CQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7QUFDMUMsb0JBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztTQUNoRCxDQUFDLENBQUM7S0FDTjtRQUNHLGtCQUFrQixHQUFHLFNBQVMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRTtBQUNqRSxZQUFJLEtBQUssR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO0FBQ3pELGVBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUc7OztBQUFDLEtBRzlDO1FBQ0csd0JBQXdCLEdBQUcsU0FBUyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUU7QUFDaEUsWUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25CLFlBQUksd0JBQXdCLENBQUMsSUFBSSxFQUFFO0FBQy9CLG9DQUF3QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN2RDtBQUNELFlBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM1QixnQ0FBd0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ3hDOzs7QUFHRCxtQkFBZSxHQUFHLFNBQVMsZUFBZSxDQUFDLENBQUMsRUFBRTtBQUMxQyxZQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFOztBQUV0QyxtQkFBTyxLQUFLLENBQUM7U0FDaEI7QUFDRCxhQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3pCLFNBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQzNDLFNBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3ZDLHVCQUFlLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNoRSx1QkFBZSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN4RSx1QkFBZSxDQUFDLElBQUksR0FBRyxLQUFLOzs7OztBQUFDLEFBSzdCLHVCQUFlLENBQUMsTUFBTSxHQUFHO0FBQ3JCLGdCQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSTtBQUN2QyxlQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHO0FBQUEsU0FDdEQsQ0FBQztLQUNMO1FBQ0csZUFBZSxHQUFHLFNBQVMsZUFBZSxDQUFDLENBQUMsRUFBRTtBQUM5QyxhQUFLLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztBQUM3Qix1QkFBZSxHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUM7QUFDakQsYUFBSyxDQUFDLEdBQUcsQ0FBQztBQUNOLGtCQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7QUFDekUsaUJBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO1NBQ3pGLENBQUMsQ0FBQztBQUNILGlCQUFTLENBQUMsZUFBZSxDQUFDOztBQUFDLEFBRTNCLFlBQUksT0FBTyxlQUFlLENBQUMsVUFBVSxLQUFLLFdBQVcsRUFBRTtBQUNuRCwyQkFBZSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEMsMkJBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxQjtLQUNKO1FBQ0csYUFBYSxHQUFHLFNBQVMsYUFBYSxDQUFDLENBQUMsRUFBRTtBQUMxQyxTQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzNCLFNBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekIsWUFBSSxlQUFlLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQztBQUNyRCxZQUFJLGVBQWUsQ0FBQyxVQUFVLEVBQUU7QUFDNUIsZ0JBQUksZUFBZSxDQUFDLE9BQU8sRUFBRTtBQUN6QiwrQkFBZSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzFCLE1BQU07QUFDSCwrQkFBZSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzFCO1NBQ0osTUFBTTtBQUNILDJCQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDNUI7QUFDRCxpQkFBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzNCLHVCQUFlLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUM1Qix1QkFBZSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7S0FDMUM7Ozs7O0FBS0QsZUFBVyxHQUFHLFNBQVMsV0FBVyxDQUFDLENBQUMsRUFBRTtBQUNsQyxtQkFBVyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0IsU0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDdkMsU0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDdEM7UUFDRyxXQUFXLEdBQUcsU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFO0FBQ3RDLFlBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFDaEMsWUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QyxZQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVqQyxZQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDN0IsWUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2pDLFlBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7O0FBRXBDLFlBQUksS0FBSyxHQUFHO0FBQ1IsaUJBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFO0FBQ3JCLGtCQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRTtBQUN2QixnQkFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHO0FBQ2hCLGlCQUFLLEVBQUUsTUFBTSxDQUFDLElBQUk7QUFDbEIsZ0JBQUksRUFBRSxRQUFRLENBQUMsR0FBRztBQUNsQixpQkFBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJO1NBQ3ZCLENBQUM7O0FBRUYsWUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUN6QixZQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDOztBQUV4QixZQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJOztBQUFDLEFBRTdELFlBQUksS0FBSyxHQUFHLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7O0FBRXBELFlBQUksS0FBSyxHQUFHLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQ3JDLFlBQUksTUFBTSxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDOztBQUVwQyxZQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNqQyxZQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7QUFFakMsWUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUN6RixZQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7QUFFeEUsWUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO0FBQ2Isa0JBQU0sQ0FBQyxHQUFHLENBQUM7QUFDUCx1QkFBTyxFQUFFLEtBQUs7QUFDZCx3QkFBUSxFQUFFLE1BQU07YUFDbkIsQ0FBQyxDQUFDO1NBQ04sTUFBTSxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7QUFDcEIsa0JBQU0sQ0FBQyxHQUFHLENBQUM7QUFDUCx3QkFBUSxFQUFFLE9BQU87QUFDakIscUJBQUssRUFBRSxJQUFJO0FBQ1gsdUJBQU8sRUFBRSxLQUFLO2FBQ2pCLENBQUMsQ0FBQztTQUNOLE1BQU0sSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO0FBQ3BCLGtCQUFNLENBQUMsR0FBRyxDQUFDO0FBQ1Asd0JBQVEsRUFBRSxPQUFPO0FBQ2pCLHFCQUFLLEVBQUUsSUFBSTtBQUNYLHVCQUFPLEVBQUUsTUFBTTtBQUNmLHNCQUFNLEVBQUUsS0FBSzthQUNoQixDQUFDLENBQUM7U0FDTixNQUFNLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtBQUNwQixrQkFBTSxDQUFDLEdBQUcsQ0FBQztBQUNQLHVCQUFPLEVBQUUsTUFBTTtBQUNmLHNCQUFNLEVBQUUsS0FBSztBQUNiLHdCQUFRLEVBQUUsTUFBTTthQUNuQixDQUFDLENBQUM7U0FDTjtBQUNELGlCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7S0FDOUM7UUFDRyxTQUFTLEdBQUcsU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFO0FBQ2xDLFNBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0IsU0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7O0FBQUMsQUFFekIsWUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEQsY0FBTSxDQUFDLEdBQUcsQ0FBQztBQUNQLGtCQUFNLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7QUFDeEQsaUJBQUssRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztBQUN2RCxtQkFBTyxFQUFFLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUM7QUFDakQsb0JBQVEsRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxDQUFDO1NBQ3ZELENBQUMsQ0FBQztBQUNILG1CQUFXLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUMzQjs7O0FBR0QsZUFBVyxHQUFHLFNBQVMsV0FBVyxHQUFHO0FBQ2pDLFNBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN4QyxTQUFDLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEMsU0FBQyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzFDLFNBQUMsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7S0FDbEQ7UUFDRyxJQUFJLEdBQUcsU0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQzlCLFlBQUksT0FBTyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUN4QyxpQkFBSyxDQUFDLElBQUksT0FBTyxFQUFFO0FBQ2YsaUJBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckI7U0FDSjtBQUNELFNBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0FBQUMsQUFDbkMsZ0JBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEIsQ0FBQztBQUNGLFdBQU87QUFDSCxZQUFJLEVBQUUsSUFBSTtLQUNiLENBQUM7Q0FDTCxDQUFBLEVBQUcsQ0FBQyIsImZpbGUiOiJvbGQtYW5ub3RhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFubm90YXRpb24gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGcgPSB7XHJcbiAgICAgICAgZml4ZWQ6IDMwXHJcbiAgICB9LFxyXG4gICAgICAgIHBhaW50UGRmID0gZnVuY3Rpb24gcGFpbnRQZGYoZGF0YSkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRQREZKUygpIHtcclxuICAgICAgICAgICAgUERGSlMud29ya2VyU3JjID0gJ2xpYnMvcGRmanMvcGRmLndvcmtlci5qcyc7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHZhciBwYWdlcyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgZ2xvYmFsUGRmID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGcuJGNvbnRhaW5lci5jaGlsZHJlbignLmRvY3VtZW50LXZpZXdlcicpWzBdO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiByZW5kZXJQYWdlKHBhZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyBQcmVwYXJlIGNhbnZhcyB1c2luZyBQREYgcGFnZSBkaW1lbnNpb25zXHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBMaW5rOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMzAzOTE4My8xNTc3Mzk2XHJcbiAgICAgICAgICAgICAgICAvLyBDYW52YXMgd2lkdGggc2hvdWxkIGJlIHNldCB0byB0aGUgd2luZG93J3Mgd2lkdGggZm9yIGFwcHJvcHJpYXRlXHJcbiAgICAgICAgICAgICAgICAvLyBzY2FsaW5nIGZhY3RvciBvZiB0aGUgZG9jdW1lbnQgd2l0aCByZXNwZWN0IHRvIHRoZSBjYW52YXMgd2lkdGhcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3cG9ydCA9IHBhZ2UuZ2V0Vmlld3BvcnQod2luZG93LnNjcmVlbi53aWR0aCAvIHBhZ2UuZ2V0Vmlld3BvcnQoMSkud2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgY2FudmFzLmNsYXNzTmFtZSA9ICdwZGYtcGFnZSAnICsgcGFnZS5wYWdlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgdGhlIGNyZWF0ZWQgY2FudmFzIHRvIHRoZSBjb250YWluZXJcclxuICAgICAgICAgICAgICAgIHZhciBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgICAgICBhbmNob3IuaHJlZiA9IHBhZ2UucGFnZUluZGV4ICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYW5jaG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGNvbnRleHQgb2YgdGhlIGNhbnZhc1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSB2aWV3cG9ydC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSB2aWV3cG9ydC53aWR0aDtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyBSZW5kZXIgUERGIHBhZ2UgaW50byBjYW52YXMgY29udGV4dFxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIHZhciByZW5kZXJDb250ZXh0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhc0NvbnRleHQ6IGNvbnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlld3BvcnQ6IHZpZXdwb3J0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcGFnZS5yZW5kZXIocmVuZGVyQ29udGV4dCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRQYWdlSW5kZXggPSBwYWdlLnBhZ2VJbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnJhbmdlJykuYXR0cignZGF0YS1tYXgnLCBjdXJyZW50UGFnZUluZGV4KS5uZXh0KCkuaHRtbCgnIG9mICcgKyBjdXJyZW50UGFnZUluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBhZ2UgPCBnbG9iYWxQZGYubnVtUGFnZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZXNbY3VycmVudFBhZ2VdID0gY2FudmFzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGFnZSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxQZGYuZ2V0UGFnZShjdXJyZW50UGFnZSkudGhlbihyZW5kZXJQYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvdGhlciBjYWxsYmFjayBmdW5jdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRWYWx1ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRBbm5vdGF0aW9ucyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXN0ZW1DYWxsQmFja3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGcuYWZ0ZXJMb2FkQ2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcuYWZ0ZXJMb2FkQ2FsbEJhY2soZ2xvYmFsUGRmLCBwYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFBERkpTLmdldERvY3VtZW50KGcuZmlsZU5hbWUpLnRoZW4oZnVuY3Rpb24gKHBkZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFnbG9iYWxQZGYpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbG9iYWxQZGYgPSBwZGY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwZGYuZ2V0UGFnZShjdXJyZW50UGFnZSkudGhlbihyZW5kZXJQYWdlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxvYWRQREZKUygpO1xyXG4gICAgfSxcclxuICAgICAgICBsb2FkQW5ub3RhdGlvbnMgPSBmdW5jdGlvbiBsb2FkQW5ub3RhdGlvbnMocCkge1xyXG4gICAgICAgIHAgPSBwIHx8IHt9O1xyXG4gICAgICAgIHZhciBhbm5vdGF0aW9ucyA9IHAuYW5ub3RhdGlvbnM7XHJcbiAgICAgICAgaWYgKGFubm90YXRpb25zKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYW5ub3RhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbm5vdGF0ZSA9IGFubm90YXRpb25zW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGJ1aWxkRWxlbWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBhbm5vdGF0ZS5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiBhbm5vdGF0ZS50b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3NoYXBlJzogYW5ub3RhdGUuc2hhcGVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZHJhd0VsZW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgICd3aWR0aCc6IGFubm90YXRlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICdoZWlnaHQnOiBhbm5vdGF0ZS5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2V0RWxlbWVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgICAgICBzeXN0ZW1DYWxsQmFja3MgPSBmdW5jdGlvbiBzeXN0ZW1DYWxsQmFja3MoKSB7XHJcbiAgICAgICAgZy4kY29udGFpbmVyLnNjcm9sbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGcuc2Nyb2xsVG9wID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcucGRmLXBhZ2UnKS5vbignbW91c2Vkb3duJywgYmVnaW5EcmF3KTtcclxuICAgICAgICAkKCcudG9vbGJhciBkaXYnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcygnc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuc2hhcGUnLCBicmluZ0NvbW1lbnRTZWN0aW9uRnJvbnQpO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuc2V2ZXJpdHktaXRlbScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCd0aWNrJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3RpY2snKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHdpbmRvdykucmVzaXplKHJlc2V0VmFsdWVzKTtcclxuICAgICAgICBnLnNjcm9sbFRvcCA9IGcuJGNvbnRhaW5lci5zY3JvbGxUb3AoKTtcclxuICAgIH0sXHJcbiAgICAgICAgc2V0RWxlbWVudCA9IGZ1bmN0aW9uIHNldEVsZW1lbnQoZGltZW5zaW9ucykge1xyXG4gICAgICAgIHZhciAkY2xvbmUgPSAkKCcuY29tbWVudC1zZWN0aW9uLWhpZGUgPiAuY29tbWVudC1zZWN0aW9uJykuY2xvbmUoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAkY2xvbmUuYXBwZW5kVG8oZy4kc2VsZWN0ZWRBcmVhKTtcclxuICAgICAgICBnLiRzZWxlY3RlZEFyZWEuYWRkQ2xhc3MoJ3NoYXBlLW1pbicpO1xyXG4gICAgICAgIHNldExheW91dCgkY2xvbmUpO1xyXG4gICAgfSxcclxuICAgICAgICBzZXRMYXlvdXQgPSBmdW5jdGlvbiBzZXRMYXlvdXQoJGNvbW1lbnRTZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCRjb21tZW50U2VjdGlvbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy8gcmVzZXQgYWxsIGNsYXNzZXNcclxuICAgICAgICAgICAgJGNvbW1lbnRTZWN0aW9uLnJlbW92ZUNsYXNzKCdjb21tZW50LXNlY3Rpb24tbGVmdCcpLnJlbW92ZUNsYXNzKCdjb21tZW50LXNlY3Rpb24tcmlnaHQnKS5yZW1vdmVDbGFzcygnc3RpY2stdG8tdG9wJykucmVtb3ZlQ2xhc3MoJ3N0aWNrLXRvLWJvdHRvbScpO1xyXG5cclxuICAgICAgICAgICAgLy8gRG9uJ3QgY2hhbmdlIHRoZSBiZWxvdyByZXBlYXRpbmcgY29kZSBpbiB0byByZXVzYWJsZSB2YXJpYWJsZXMuXHJcbiAgICAgICAgICAgIC8vIFJlYXNvbjogVGhlIGNzcyBjbGFzc2VzIHdoaWNoIGFyZSBiZWluZyBhZGRlZCBhcmUgY2hhbmdpbmcgdGhlIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICAgIC8vIEhvcml6b250YWwgYWxpZ25tZW50XHJcbiAgICAgICAgICAgIGlmICgkY29tbWVudFNlY3Rpb24ub2Zmc2V0KCkubGVmdCArICRjb21tZW50U2VjdGlvbi53aWR0aCgpICsgJGNvbW1lbnRTZWN0aW9uLnBhcmVudCgpLndpZHRoKCkgKyA0NSA+ICQoJy5kb2N1bWVudC12aWV3ZXInKS53aWR0aCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkY29tbWVudFNlY3Rpb24uYWRkQ2xhc3MoJ2NvbW1lbnQtc2VjdGlvbi1sZWZ0Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkY29tbWVudFNlY3Rpb24uYWRkQ2xhc3MoJ2NvbW1lbnQtc2VjdGlvbi1yaWdodCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFZlcnRpY2FsIGFsaWdubWVudFxyXG4gICAgICAgICAgICBpZiAoJGNvbW1lbnRTZWN0aW9uLnBhcmVudHMoJy5zaGFwZScpLnBvc2l0aW9uKCkudG9wICsgZy5zY3JvbGxUb3AgPCA1MCkge1xyXG4gICAgICAgICAgICAgICAgJGNvbW1lbnRTZWN0aW9uLmFkZENsYXNzKCdzdGljay10by10b3AnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgTWF0aC5hYnMoJGNvbW1lbnRTZWN0aW9uLnBvc2l0aW9uKCkudG9wKVxyXG4gICAgICAgICAgICBlbHNlIGlmICgkY29tbWVudFNlY3Rpb24ub2Zmc2V0KCkudG9wICsgZy5zY3JvbGxUb3AgKyAkY29tbWVudFNlY3Rpb24uaGVpZ2h0KCkgKyAyMCA+ICQoJy5kb2N1bWVudC12aWV3ZXInKS5oZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgJGNvbW1lbnRTZWN0aW9uLmFkZENsYXNzKCdzdGljay10by1ib3R0b20nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAgICAgZ2V0T2Zmc2V0TGVmdCA9IGZ1bmN0aW9uIGdldE9mZnNldExlZnQoZSkge1xyXG4gICAgICAgIC8vIHJldHVybiBlLm9mZnNldFg9PXVuZGVmaW5lZD9lLm9yaWdpbmFsRXZlbnQubGF5ZXJYOmUub2Zmc2V0WDtcclxuICAgICAgICByZXR1cm4gZS5jbGllbnRYO1xyXG4gICAgfSxcclxuICAgICAgICBnZXRPZmZzZXRUb3AgPSBmdW5jdGlvbiBnZXRPZmZzZXRUb3AoZSkge1xyXG4gICAgICAgIHJldHVybiBlLmNsaWVudFk7XHJcbiAgICAgICAgLy8gcmV0dXJuIGUub2Zmc2V0WT09dW5kZWZpbmVkP2Uub3JpZ2luYWxFdmVudC5sYXllclk6ZS5vZmZzZXRZOy8vICsgJCgnLmRvY3VtZW50LXZpZXdlcicpWzBdLnNjcm9sbFRvcDtcclxuICAgIH0sXHJcbiAgICAgICAgYmVnaW5EcmF3ID0gZnVuY3Rpb24gYmVnaW5EcmF3KGUpIHtcclxuICAgICAgICBpZiAoZS53aGljaCA9PT0gMSkge1xyXG4gICAgICAgICAgICB2YXIgc2hhcGUgPSAkKCcuZHZ0LWl0ZW0uYWRkLWNvbW1lbnQtaWNvbicpLmRhdGEoJ3ZhbHVlJyk7XHJcbiAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIHNoYXBlIGlzIG90aGVyIHRoYW4gY3Vyc29yXHJcbiAgICAgICAgICAgIC8vIFNvIHRoYXQgdGhlIGFubm90YXRpb24gY2FuIGhhcHBlblxyXG4gICAgICAgICAgICBpZiAoc2hhcGUgIT09ICdjdXJzb3InKSB7XHJcbiAgICAgICAgICAgICAgICBnLmZpcnN0WCA9IGUuY2xpZW50WCAtIGcuY29udGVudE9mZnNldC5sZWZ0OyAvL2dldE9mZnNldExlZnQoZSk7XHJcbiAgICAgICAgICAgICAgICBnLmZpcnN0WSA9IGUuY2xpZW50WSArIGcuc2Nyb2xsVG9wIC0gZy5jb250ZW50T2Zmc2V0LnRvcDsgLy9nZXRPZmZzZXRUb3AoZSkgKyBlLmN1cnJlbnRUYXJnZXQub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICAgICAgZy4kc2VsZWN0ZWRBcmVhID0gJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XHJcbiAgICAgICAgICAgICAgICBnLiRzZWxlY3RlZEFyZWFbMF0uY2xhc3NOYW1lID0gJ3NoYXBlIHJlY3RhbmdsZSc7XHJcbiAgICAgICAgICAgICAgICBiZWdpbkRyYXcub2Zmc2V0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogZy5maXJzdFgsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IGcuZmlyc3RZXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgJChnLiRzZWxlY3RlZEFyZWEpLmNzcyhiZWdpbkRyYXcub2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICQoZy4kc2VsZWN0ZWRBcmVhKS5hcHBlbmRUbyhnLiRjb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnBhZ2UnKS5vbignbW91c2Vtb3ZlJywgbW92ZURyYXcpO1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdtb3VzZXVwJywgZW5kRHJhdyk7XHJcbiAgICAgICAgICAgICAgICBidWlsZEVsZW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogZy5maXJzdFgsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IGcuZmlyc3RZLFxyXG4gICAgICAgICAgICAgICAgICAgICdzaGFwZSc6IHNoYXBlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAgICAgbW92ZURyYXcgPSBmdW5jdGlvbiBtb3ZlRHJhdyhlKSB7XHJcbiAgICAgICAgLy8gdmFyICRzZWxmID0gYmVnaW5EcmF3LmRpdjtcclxuICAgICAgICBkcmF3RWxlbWVudCh7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IGUuY2xpZW50WCAtIGcuY29udGVudE9mZnNldC5sZWZ0IC0gYmVnaW5EcmF3Lm9mZnNldC5sZWZ0LFxyXG4gICAgICAgICAgICAvLyAnaGVpZ2h0JzogZ2V0T2Zmc2V0VG9wKGUpICsgZS5jdXJyZW50VGFyZ2V0Lm9mZnNldFRvcCAtIGJlZ2luRHJhdy5vZmZzZXQudG9wXHJcbiAgICAgICAgICAgICdoZWlnaHQnOiBlLmNsaWVudFkgKyBnLnNjcm9sbFRvcCAtIGJlZ2luRHJhdy5vZmZzZXQudG9wIC0gZy5jb250ZW50T2Zmc2V0LnRvcFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgICAgICBlbmREcmF3ID0gZnVuY3Rpb24gZW5kRHJhdyhlKSB7XHJcbiAgICAgICAgc2V0RWxlbWVudCgpO1xyXG4gICAgICAgIC8vIE1ha2luZyB0aGUgc2VsZWN0ZWRBcmVhIHZhcmlhYmxlIG51bGwgdG8gYmUgcmVhZHkgZm9yIG5leHQgaXRlcmF0aW9uLlxyXG4gICAgICAgIGcuJHNlbGVjdGVkQXJlYSA9IG51bGw7XHJcbiAgICAgICAgJCgnLnBhZ2UnKS5vZmYoJ21vdXNlbW92ZScpO1xyXG4gICAgICAgICQod2luZG93KS5vZmYoJ21vdXNldXAnLCBlbmREcmF3KTtcclxuICAgIH0sXHJcbiAgICAgICAgYnVpbGRFbGVtZW50ID0gZnVuY3Rpb24gYnVpbGRFbGVtZW50KHApIHtcclxuICAgICAgICBnLiRzZWxlY3RlZEFyZWEgPSBnLiRzZWxlY3RlZEFyZWEgfHwgJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XHJcblxyXG4gICAgICAgICRyZXNpemVyQ2xvbmUgPSAkKCcucmVzaXplci1zZWN0aW9uID4gZGl2JykuY2xvbmUoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAkKGcuJHNlbGVjdGVkQXJlYSkuYXBwZW5kKCRyZXNpemVyQ2xvbmUpO1xyXG5cclxuICAgICAgICBnLiRzZWxlY3RlZEFyZWFbMF0uY2xhc3NOYW1lID0gJ3NoYXBlICcgKyBwLnNoYXBlO1xyXG4gICAgICAgICQoZy4kc2VsZWN0ZWRBcmVhKS5jc3Moe1xyXG4gICAgICAgICAgICAnbGVmdCc6IGdldFBlcmNlbnRhZ2VWYWx1ZShwLmxlZnQsIHRydWUpLFxyXG4gICAgICAgICAgICAndG9wJzogZ2V0UGVyY2VudGFnZVZhbHVlKHAudG9wLCBmYWxzZSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIC5hZGRDbGFzcyhwLnNoYXBlKVxyXG4gICAgICAgIC8vIC5hcHBlbmQoJHJlc2l6ZXJDbG9uZSlcclxuICAgICAgICAuYXBwZW5kVG8oZy4kY29udGFpbmVyLmNoaWxkcmVuKCcuZG9jdW1lbnQtdmlld2VyJykpO1xyXG4gICAgICAgICRyZXNpemVyQ2xvbmUub24oJ21vdXNlZG93bicsIHJlcG9zaXRpb25TdGFydCk7XHJcbiAgICAgICAgJHJlc2l6ZXJDbG9uZS5maW5kKCdbZGF0YS1yZXNpemVdJykub24oJ21vdXNlZG93bicsIHJlc2l6ZVN0YXJ0KTtcclxuICAgIH0sXHJcbiAgICAgICAgZHJhd0VsZW1lbnQgPSBmdW5jdGlvbiBkcmF3RWxlbWVudChwKSB7XHJcbiAgICAgICAgJChnLiRzZWxlY3RlZEFyZWEpLmNzcyh7XHJcbiAgICAgICAgICAgICd3aWR0aCc6IGdldFBlcmNlbnRhZ2VWYWx1ZShwLndpZHRoLCB0cnVlKSxcclxuICAgICAgICAgICAgJ2hlaWdodCc6IGdldFBlcmNlbnRhZ2VWYWx1ZShwLmhlaWdodCwgZmFsc2UpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgICAgIGdldFBlcmNlbnRhZ2VWYWx1ZSA9IGZ1bmN0aW9uIGdldFBlcmNlbnRhZ2VWYWx1ZSh2YWx1ZSwgaXNXaWR0aCkge1xyXG4gICAgICAgIHZhciB0b3RhbCA9IGlzV2lkdGggPyBnLmNvbnRhaW5lcldpZHRoIDogZy53cmFwcGVySGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyh2YWx1ZSAvIHRvdGFsICogMTAwKSArICclJztcclxuICAgICAgICAvLyByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgLy8gcmV0dXJuIE1hdGguYWJzKHZhbHVlKTtcclxuICAgIH0sXHJcbiAgICAgICAgYnJpbmdDb21tZW50U2VjdGlvbkZyb250ID0gZnVuY3Rpb24gYnJpbmdDb21tZW50U2VjdGlvbkZyb250KGUpIHtcclxuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XHJcbiAgICAgICAgaWYgKGJyaW5nQ29tbWVudFNlY3Rpb25Gcm9udC5wcmV2KSB7XHJcbiAgICAgICAgICAgIGJyaW5nQ29tbWVudFNlY3Rpb25Gcm9udC5wcmV2LmNzcyh7ICd6SW5kZXgnOiAnJyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5jc3MoeyAnekluZGV4JzogJzQnIH0pO1xyXG4gICAgICAgIGJyaW5nQ29tbWVudFNlY3Rpb25Gcm9udC5wcmV2ID0gc2VsZjtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gU3RhcnQgb2YgcmVwb3NpdGlvbiBmdW5jdGlvbnNcclxuICAgIHJlcG9zaXRpb25TdGFydCA9IGZ1bmN0aW9uIHJlcG9zaXRpb25TdGFydChlKSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZXNpemUnKSkge1xyXG4gICAgICAgICAgICAvLyBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzZWxmID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsIHJlcG9zaXRpb25TaGFwZSk7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdtb3VzZXVwJywgcmVwb3NpdGlvbkVuZCk7XHJcbiAgICAgICAgcmVwb3NpdGlvblN0YXJ0LmNvbW1lbnRTZWN0aW9uID0gJHNlbGYuZmluZCgnLmNvbW1lbnQtc2VjdGlvbicpO1xyXG4gICAgICAgIHJlcG9zaXRpb25TdGFydC5ibG5TaG93ID0gcmVwb3NpdGlvblN0YXJ0LmNvbW1lbnRTZWN0aW9uLmlzKCc6dmlzaWJsZScpO1xyXG4gICAgICAgIHJlcG9zaXRpb25TdGFydC5zZWxmID0gJHNlbGY7XHJcbiAgICAgICAgLy8gcmVwb3NpdGlvblN0YXJ0Lm9mZnNldCA9IHtcclxuICAgICAgICAvLyAgICAgbGVmdDogZS5jbGllbnRYIC0gJHNlbGYucG9zaXRpb24oKS5sZWZ0LFxyXG4gICAgICAgIC8vICAgICB0b3AgOiBlLmNsaWVudFkgLSAkc2VsZi5wb3NpdGlvbigpLnRvcFxyXG4gICAgICAgIC8vIH07XHJcbiAgICAgICAgcmVwb3NpdGlvblN0YXJ0Lm9mZnNldCA9IHtcclxuICAgICAgICAgICAgbGVmdDogZS5jbGllbnRYIC0gJHNlbGYucG9zaXRpb24oKS5sZWZ0LFxyXG4gICAgICAgICAgICB0b3A6IGUuY2xpZW50WSArIGcuc2Nyb2xsVG9wIC0gJHNlbGYucG9zaXRpb24oKS50b3AgLy8tIGcuY29udGVudE9mZnNldC50b3BcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgICAgICByZXBvc2l0aW9uU2hhcGUgPSBmdW5jdGlvbiByZXBvc2l0aW9uU2hhcGUoZSkge1xyXG4gICAgICAgICRzZWxmID0gcmVwb3NpdGlvblN0YXJ0LnNlbGY7XHJcbiAgICAgICAgJGNvbW1lbnRTZWN0aW9uID0gcmVwb3NpdGlvblN0YXJ0LmNvbW1lbnRTZWN0aW9uO1xyXG4gICAgICAgICRzZWxmLmNzcyh7XHJcbiAgICAgICAgICAgICdsZWZ0JzogZ2V0UGVyY2VudGFnZVZhbHVlKGUuY2xpZW50WCAtIHJlcG9zaXRpb25TdGFydC5vZmZzZXQubGVmdCwgdHJ1ZSksXHJcbiAgICAgICAgICAgICd0b3AnOiBnZXRQZXJjZW50YWdlVmFsdWUoZS5jbGllbnRZICsgZy5zY3JvbGxUb3AgLSByZXBvc2l0aW9uU3RhcnQub2Zmc2V0LnRvcCwgZmFsc2UpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0TGF5b3V0KCRjb21tZW50U2VjdGlvbik7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBpZiAodHlwZW9mIHJlcG9zaXRpb25TdGFydC5tb3VzZU1vdmVkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXBvc2l0aW9uU3RhcnQubW91c2VNb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICRjb21tZW50U2VjdGlvbi5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgICAgICByZXBvc2l0aW9uRW5kID0gZnVuY3Rpb24gcmVwb3NpdGlvbkVuZChlKSB7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9mZignbW91c2Vtb3ZlJyk7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9mZignbW91c2V1cCcpO1xyXG4gICAgICAgIHZhciAkY29tbWVudFNlY3Rpb24gPSByZXBvc2l0aW9uU3RhcnQuY29tbWVudFNlY3Rpb247XHJcbiAgICAgICAgaWYgKHJlcG9zaXRpb25TdGFydC5tb3VzZU1vdmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXBvc2l0aW9uU3RhcnQuYmxuU2hvdykge1xyXG4gICAgICAgICAgICAgICAgJGNvbW1lbnRTZWN0aW9uLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRjb21tZW50U2VjdGlvbi5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkY29tbWVudFNlY3Rpb24udG9nZ2xlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldExheW91dCgkY29tbWVudFNlY3Rpb24pO1xyXG4gICAgICAgIHJlcG9zaXRpb25TdGFydC5zZWxmID0gbnVsbDtcclxuICAgICAgICByZXBvc2l0aW9uU3RhcnQubW91c2VNb3ZlZCA9IHVuZGVmaW5lZDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gRW5kIG9mIHJlcG9zaXRpb24gZnVuY3Rpb25zXHJcblxyXG4gICAgLy8gU3RhcnQgb2YgcmVzaXppbmcgZnVuY3Rpb25zXHJcbiAgICByZXNpemVTdGFydCA9IGZ1bmN0aW9uIHJlc2l6ZVN0YXJ0KGUpIHtcclxuICAgICAgICByZXNpemVTdGFydC5zZWxmID0gJCh0aGlzKTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsIHJlc2l6ZVNoYXBlKTtcclxuICAgICAgICAkKHdpbmRvdykub24oJ21vdXNldXAnLCByZXNpemVFbmQpO1xyXG4gICAgfSxcclxuICAgICAgICByZXNpemVTaGFwZSA9IGZ1bmN0aW9uIHJlc2l6ZVNoYXBlKGUpIHtcclxuICAgICAgICB2YXIgJHJlc2l6ZXIgPSByZXNpemVTdGFydC5zZWxmO1xyXG4gICAgICAgIHZhciAkc2hhcGUgPSAkcmVzaXplci5wYXJlbnRzKCcuc2hhcGUnKTtcclxuICAgICAgICB2YXIgb3AgPSAkcmVzaXplci5kYXRhKCdyZXNpemUnKTtcclxuXHJcbiAgICAgICAgdmFyIG9mZnNldCA9ICRzaGFwZS5vZmZzZXQoKTtcclxuICAgICAgICB2YXIgcG9zaXRpb24gPSAkc2hhcGUucG9zaXRpb24oKTtcclxuICAgICAgICB2YXIgcE9mZnNldCA9IGcuJGNvbnRhaW5lci5vZmZzZXQoKTtcclxuXHJcbiAgICAgICAgdmFyIHNoYXBlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogJHNoYXBlLndpZHRoKCksXHJcbiAgICAgICAgICAgIGhlaWdodDogJHNoYXBlLmhlaWdodCgpLFxyXG4gICAgICAgICAgICBvVG9wOiBvZmZzZXQudG9wLFxyXG4gICAgICAgICAgICBvTGVmdDogb2Zmc2V0LmxlZnQsXHJcbiAgICAgICAgICAgIHBUb3A6IHBvc2l0aW9uLnRvcCxcclxuICAgICAgICAgICAgcExlZnQ6IHBvc2l0aW9uLmxlZnRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgb2Zmc2V0TGVmdCA9IGUucGFnZVg7XHJcbiAgICAgICAgdmFyIG9mZnNldFRvcCA9IGUucGFnZVk7XHJcblxyXG4gICAgICAgIHZhciB4VXAgPSBnLnNjcm9sbFRvcCArIG9mZnNldFRvcCAtIHBPZmZzZXQudG9wIC0gc2hhcGUucFRvcDtcclxuICAgICAgICAvLyB2YXIgeERvd24gICAgICA9IChvZmZzZXRMZWZ0IC0gcE9mZnNldC5sZWZ0KSAtIHNoYXBlLnBMZWZ0O1xyXG4gICAgICAgIHZhciB4RG93biA9IG9mZnNldExlZnQgLSBwT2Zmc2V0LmxlZnQgLSBzaGFwZS5wTGVmdDtcclxuXHJcbiAgICAgICAgdmFyIHdpZHRoID0gb2Zmc2V0TGVmdCAtIHNoYXBlLm9MZWZ0O1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBvZmZzZXRUb3AgLSBvZmZzZXQudG9wO1xyXG5cclxuICAgICAgICB2YXIgeEhlaWdodCA9IHNoYXBlLmhlaWdodCAtIHhVcDtcclxuICAgICAgICB2YXIgeFdpZHRoID0gc2hhcGUud2lkdGggLSB4RG93bjtcclxuXHJcbiAgICAgICAgdmFyIHhUb3AgPSBzaGFwZS5oZWlnaHQgPT09IGcuZml4ZWQgPyBzaGFwZS5wVG9wIDogZy5zY3JvbGxUb3AgKyBvZmZzZXRUb3AgLSBwT2Zmc2V0LnRvcDtcclxuICAgICAgICB2YXIgeExlZnQgPSBzaGFwZS53aWR0aCA9PT0gZy5maXhlZCA/IHNoYXBlLnBMZWZ0IDogc2hhcGUucExlZnQgKyB4RG93bjtcclxuXHJcbiAgICAgICAgaWYgKG9wID09PSAnYnInKSB7XHJcbiAgICAgICAgICAgICRzaGFwZS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogd2lkdGgsXHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3AgPT09ICd0cicpIHtcclxuICAgICAgICAgICAgJHNoYXBlLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogeEhlaWdodCxcclxuICAgICAgICAgICAgICAgICd0b3AnOiB4VG9wLFxyXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogd2lkdGhcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvcCA9PT0gJ3RsJykge1xyXG4gICAgICAgICAgICAkc2hhcGUuY3NzKHtcclxuICAgICAgICAgICAgICAgICdoZWlnaHQnOiB4SGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgJ3RvcCc6IHhUb3AsXHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiB4V2lkdGgsXHJcbiAgICAgICAgICAgICAgICAnbGVmdCc6IHhMZWZ0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob3AgPT09ICdibCcpIHtcclxuICAgICAgICAgICAgJHNoYXBlLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiB4V2lkdGgsXHJcbiAgICAgICAgICAgICAgICAnbGVmdCc6IHhMZWZ0LFxyXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IGhlaWdodFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0TGF5b3V0KCRzaGFwZS5maW5kKCcuY29tbWVudC1zZWN0aW9uJykpO1xyXG4gICAgfSxcclxuICAgICAgICByZXNpemVFbmQgPSBmdW5jdGlvbiByZXNpemVFbmQoZSkge1xyXG4gICAgICAgICQod2luZG93KS5vZmYoJ21vdXNlbW92ZScpO1xyXG4gICAgICAgICQod2luZG93KS5vZmYoJ21vdXNldXAnKTtcclxuICAgICAgICAvL21ha2UgdmFsdWVzIGluIHRvIHBlcmNlbnRhZ2VcclxuICAgICAgICB2YXIgJHNoYXBlID0gcmVzaXplU3RhcnQuc2VsZi5wYXJlbnRzKCcuc2hhcGUnKTtcclxuICAgICAgICAkc2hhcGUuY3NzKHtcclxuICAgICAgICAgICAgJ2xlZnQnOiBnZXRQZXJjZW50YWdlVmFsdWUoJHNoYXBlLnBvc2l0aW9uKCkubGVmdCwgdHJ1ZSksXHJcbiAgICAgICAgICAgICd0b3AnOiBnZXRQZXJjZW50YWdlVmFsdWUoJHNoYXBlLnBvc2l0aW9uKCkudG9wLCBmYWxzZSksXHJcbiAgICAgICAgICAgICd3aWR0aCc6IGdldFBlcmNlbnRhZ2VWYWx1ZSgkc2hhcGUud2lkdGgoKSwgdHJ1ZSksXHJcbiAgICAgICAgICAgICdoZWlnaHQnOiBnZXRQZXJjZW50YWdlVmFsdWUoJHNoYXBlLmhlaWdodCgpLCBmYWxzZSlcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXNpemVTdGFydC5zZWxmID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLy9FbmQgb2YgcmVzaXppbmcgZnVuY3Rpb25zXHJcbiAgICByZXNldFZhbHVlcyA9IGZ1bmN0aW9uIHJlc2V0VmFsdWVzKCkge1xyXG4gICAgICAgIGcuY29udGVudE9mZnNldCA9IGcuJGNvbnRhaW5lci5vZmZzZXQoKTtcclxuICAgICAgICBnLmNvbnRhaW5lcldpZHRoID0gZy4kY29udGFpbmVyLndpZHRoKCk7XHJcbiAgICAgICAgZy5jb250YWluZXJIZWlnaHQgPSBnLiRjb250YWluZXIuaGVpZ2h0KCk7XHJcbiAgICAgICAgZy53cmFwcGVySGVpZ2h0ID0gZy4kY29udGFpbmVyWzBdLnNjcm9sbEhlaWdodDtcclxuICAgIH0sXHJcbiAgICAgICAgaW5pdCA9IGZ1bmN0aW9uIGluaXQocGF5bG9hZCkge1xyXG4gICAgICAgIGlmIChwYXlsb2FkICYmIHR5cGVvZiBwYXlsb2FkID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBmb3IgKHAgaW4gcGF5bG9hZCkge1xyXG4gICAgICAgICAgICAgICAgZ1twXSA9IHBheWxvYWRbcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZy4kY29udGFpbmVyID0gJCgnI3BkZi1jb250YWluZXInKTsgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGRmLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIHBhaW50UGRmKGcuZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBpbml0XHJcbiAgICB9O1xyXG59KSgpOyJdfQ==