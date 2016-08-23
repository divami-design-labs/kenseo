Kenseo.sliders = (function () {
    var sliders = {
        "document-summary": [{
            "page_name": "",
            "callbackfunc": sb.sliders.documentSummary,
            "url": "local/packages/summary.json"
        }],
        "comment-summary": [{
            "page_name": "",
            "callbackfunc": sb.sliders.commentSummary,
            "url": "local/packages/summary.json"
        }]
    };
    return {
        getSlidersInfo: function getSlidersInfo(val) {
            return _.cloneDeep(sliders[val]);
        }
    };
})();
