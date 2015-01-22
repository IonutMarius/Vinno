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
