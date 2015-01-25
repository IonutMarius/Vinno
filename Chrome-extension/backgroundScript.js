chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    getPlayerId();
});

chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {  
    getPlayerId();
});
chrome.tabs.onActivated.addListener(function(activeInfo) {
    getPlayerId();
});
function getPlayerId(){
    chrome.tabs.getSelected(null,function(tab){
        chrome.tabs.sendRequest(tab.id,{action:"getIdPlayer"}, function(response){
            if(response != undefined){
                chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
                chrome.browserAction.setBadgeText({text: 'Play'});
            }
            else{
                chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
                chrome.browserAction.setBadgeText({text: ''})
            }
        });
    });
};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("In getCredential with request: "+request);
    if (request.action === "getCredentials"){
        getCredentialsAJAXCall(request, sender, sendResponse);
        return true;
    }
});
function getCredentialsAJAXCall(request, sender, sendResponse){  
    $.ajax({
        url: 'http://25.156.172.66:8080/vinno/services/login',
        type: 'POST',
        contentType: "application/json",
        data: request.data,
        success: function(response){
            console.log(response);
            sendResponse(response);
        },
        error: function(e){
            sendResponse(e.statusText);   
        }
    });

};
