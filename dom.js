chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    switch (request.action){
        case "getTitle":
            var title = document.getElementById("eow-title").getAttribute("title");
            sendResponse({title: title});
            break;
        case "getVideoId":
            var videoId;
            console.log("xxx");
            console.log(chrome.tabs);
            chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
                var activeTab = arrayOfTabs[0];
                var match = activeTab.url.match(/[?&]v=([^&]+)/);
                videoId = match[1];
            });

            sendResponse({id: videoId});
            break;
    }
});
