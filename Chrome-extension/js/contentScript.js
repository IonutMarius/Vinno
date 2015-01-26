chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    switch (request.action){
        case "getVideoInfo":
            var title = document.getElementById("eow-title").getAttribute("title");
            var url = document.URL;
            sendResponse({title: title,url:url});
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
