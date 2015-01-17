chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
 if (request.action === "getDOM"){
     var title = document.getElementById("eow-title").getAttribute("title");
   sendResponse({title: title});
 }
 else
   sendResponse({}); // Send nothing..
});