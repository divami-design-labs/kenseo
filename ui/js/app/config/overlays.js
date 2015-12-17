/**
 * @author VK
 */
"use strict";

Kenseo.overlays = (function () {
    var overlays = {
        "summary": [{
            "page_name": "summary",
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