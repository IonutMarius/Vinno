<<<<<<< HEAD
	function pressButton (tab) {

 	 alert($("#eow-title").attr("title"));
	}
	chrome.browserAction.onClicked.addListener(pressButton);
=======
function pressButton (tab) {

    function pressButton (tab) {
        // But for now, let's just make sure what we have so
        // far is working as expected.
        alert('The browser action was clicked! Yay!');
    }
}
chrome.browserAction.onClicked.addListener(pressButton);
>>>>>>> origin/master
