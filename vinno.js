
	function pressButton (tab) {

 	 alert($("#eow-title").attr("title"));
	}
	chrome.browserAction.onClicked.addListener(pressButton);

