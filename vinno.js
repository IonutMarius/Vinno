function getVideoID() {
    var videoId;
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        var match = activeTab.url.match(/[?&]v=([^&]+)/);
        videoId = match[1];
    });

    return videoId;
};

$(document).ready(function() {
    $("#testButton").on("click", function(){
         console.log(getVideoID());
    });

});