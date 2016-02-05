function getIframeContentDoc(iframe) {
	var doc;
	try {
		if (iframe.contentWindow) {
			doc = iframe.contentWindow.document;
		} else if (iframe.contentDocument.document) {
			doc = iframe.contentDocument.document;
		} else {
			doc = iframe.contentDocument;
		}
	} catch (e) {
		utils.logError('Error getting iframe document: ' + e);
	}
	return doc;
}

function getIframePageContent(ibUrl){

	var content = 	'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><head>' +
	'<meta http-equiv="content-type" content="text/html; charset=UTF-8">' +
	'<base target="_top" /><scr' +
	'ipt>inDapIF=true;' +
	'</scr' + 'ipt></head>' +
	'<body>' +
	'<SCRIPT SRC="'+ibUrl+'" TYPE="text/javascript"></SCRIPT>'+
	'</body></html>';

	return content;

}

function loadIframe(iframe, currentTag) {
	var contents = '';
	//normalizeDomain(iframe);
	var iframeDoc = getIframeContentDoc(iframe);

	contents = getIframePageContent(currentTag);

	iframeDoc.open('text/html', 'replace');
	iframeDoc.write(contents);
	iframeDoc.close();

}

function createAstIframeMock(target, adUrl, width, height){
	var container = document.getElementById(target);
	var iframe = document.createElement('iframe');

	iframe.setAttribute('height', height);
	iframe.setAttribute('width', width);
	iframe.style.width = width + 'px';
	iframe.style.height = height + 'px';
	iframe.border = '0';
	iframe.hspace = '0';
	iframe.vspace = '0';
	iframe.marginWidth = '0';
	iframe.marginHeight = '0';
	iframe.style.border = '0';
	iframe.scrolling = 'no';
	iframe.frameBorder = '0';
	container.appendChild(iframe);
	loadIframe(iframe, adUrl)

}
