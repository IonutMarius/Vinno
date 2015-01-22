chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    switch (request.action){
        case "getTitle":
            var title = document.getElementById("eow-title").getAttribute("title");
            sendResponse({title: title});
            break;
        case "getIdPlayer":
            var playerId = document.getElementById("player").getAttribute("id");
            sendResponse({player:playerId});
            console.log(playerId);
            break;
        case "getVideoId":
            var videoId;
            var url = document.URL;
            var match = url.match(/[?&]v=([^&]+)/);
            videoId = match[1];
            console.log("Video in content script is "+videoId);
            sendResponse({id: videoId});
            break;
    }
});
