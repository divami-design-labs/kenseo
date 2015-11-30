/**
 * @author VK
 */
Kenseo.overlays = (function () {
    var overlays = {
        "summary": [{
            "page_name": "",
            "callbackfunc": sb.overlay.summaryOverlay,
            "url": "app/packages/summary.json"
        }]
    };
    return {
        getOverlaysInfo: function getOverlaysInfo(val) {
            return _.cloneDeep(overlays[val]);
        }
    };
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2JhYmVsLWFwcC9jb25maWcvb3ZlcmxheXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLFlBQVk7QUFDM0IsUUFBSSxRQUFRLEdBQUc7QUFDWCxpQkFBUyxFQUFFLENBQUM7QUFDUix1QkFBVyxFQUFFLEVBQUU7QUFDZiwwQkFBYyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYztBQUN6QyxpQkFBSyxFQUFFLDJCQUEyQjtTQUNyQyxDQUFDO0tBQ0wsQ0FBQztBQUNGLFdBQU87QUFDSCx1QkFBZSxFQUFFLFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRTtBQUMzQyxtQkFBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3JDO0tBQ0osQ0FBQztDQUNMLENBQUEsRUFBRyxDQUFDIiwiZmlsZSI6Im92ZXJsYXlzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBhdXRob3IgVktcclxuICovXHJcbktlbnNlby5vdmVybGF5cyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgb3ZlcmxheXMgPSB7XHJcbiAgICAgICAgXCJzdW1tYXJ5XCI6IFt7XHJcbiAgICAgICAgICAgIFwicGFnZV9uYW1lXCI6IFwiXCIsXHJcbiAgICAgICAgICAgIFwiY2FsbGJhY2tmdW5jXCI6IHNiLm92ZXJsYXkuc3VtbWFyeU92ZXJsYXksXHJcbiAgICAgICAgICAgIFwidXJsXCI6IFwiYXBwL3BhY2thZ2VzL3N1bW1hcnkuanNvblwiXHJcbiAgICAgICAgfV1cclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldE92ZXJsYXlzSW5mbzogZnVuY3Rpb24gZ2V0T3ZlcmxheXNJbmZvKHZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXy5jbG9uZURlZXAob3ZlcmxheXNbdmFsXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSkoKTsiXX0=