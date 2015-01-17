function getVideoID(){
    var videId;
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        var match = activeTab.url.match(/[?&]v=([^&]+)/);
        videoId = match[1];
    });

    alert(videoId);
};
getVideoID();