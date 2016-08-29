Kenseo.sliders = (function () {
    var sliders = {
        "document-summary": [{
            "page_name": "",
            "callbackfunc": sb.sliders.documentSummary
        }],
        "comment-summary": [{
            "page_name": "",
            "callbackfunc": sb.sliders.commentSummary
        }]
    };
    return {
        getSlidersInfo: function getSlidersInfo(val) {
            return _.cloneDeep(sliders[val]);
        }
    };
})();
