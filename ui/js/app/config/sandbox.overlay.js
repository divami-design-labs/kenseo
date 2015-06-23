sb.overlay = {
	summaryOverlay : function() {
		//first the document version ID from URL
		var verId = +window.location.hash.split('/')[1];
		
		//make the call,get the data and render template
		sb.renderTemplate({
            url: sb.getRelativePath('getDocumentSummary'),
            data: {
                versionId: verId
            },
            templateName: 'summary',
            templateHolder: $('.popup-container'),
        });
		//attach events 
	}
}