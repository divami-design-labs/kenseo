Kenseo.overlays = (function () {
    var overlays = {
        "summary": [{
            "page_name": "",
            "callbackfunc": sb.overlay.summaryOverlay,
            "url": "local/packages/summary.json"
        }]
    };
    return {
        getOverlaysInfo: function getOverlaysInfo(val) {
            return _.cloneDeep(overlays[val]);
        }
    };
})();
