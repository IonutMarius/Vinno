	function pressButton (tab) {
 	 alert('The browser action was clicked! Yay!');
	}
	chrome.browserAction.onClicked.addListener(pressButton);