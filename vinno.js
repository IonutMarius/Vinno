function pressButton (tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        var match = activeTab.url.match(/[?&]v=([^&]+)/);
        alert(match[1]);

    });
};
chrome.browserAction.onClicked.addListener(pressButton);