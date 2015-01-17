function pressButton (tab) {

    function pressButton (tab) {
        // But for now, let's just make sure what we have so
        // far is working as expected.
        alert('The browser action was clicked! Yay!');
    }
}
chrome.browserAction.onClicked.addListener(pressButton);

function getVideoID(){
    var videId;
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        var match = activeTab.url.match(/[?&]v=([^&]+)/);
        videoId = match[1];
    });

    return videId;
}

alert(getVideoID());