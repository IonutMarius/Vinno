
function getTitle () {
    chrome.tabs.getSelected(null, function(tab) {
        // Send a request to the content script.
        chrome.tabs.sendRequest(tab.id, {action: "getDOM"}, function(response) {
            console.log(response);
        });
    });
}

function getVideoID(){
    var videId;
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        var match = activeTab.url.match(/[?&]v=([^&]+)/);
        videoId = match[1];
    });

    alert(videoId);
};
getTitle();
