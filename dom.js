chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action === "getDOM"){
        var title = $("#watch-headline-title").children().attr("title");
        sendResponse({dom: title ,dom2:"ceva"});
    }
    else
        sendResponse({}); // Send nothing..
});