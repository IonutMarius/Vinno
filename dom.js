chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    switch (request.action){
        case "getDOM":
            sendResponse({dom: "The dom that you want to get"});
            break;
        case "getVideoId":
            var videoId;
            chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
                var activeTab = arrayOfTabs[0];
                var match = activeTab.url.match(/[?&]v=([^&]+)/);
                videoId = match[1];
            });
            
            sendResponse({id: videoId});
            break;
    }
});
