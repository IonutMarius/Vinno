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
            console.log("xxx");
            console.log(chrome.tabs);
            var url = document.URL;
            var match = url.match(/[?&]v=([^&]+)/);
            videoId = match[1];
            sendResponse({id: videoId});
            break;
    }
});
