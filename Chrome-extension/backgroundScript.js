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
        console.log(request.data);
        getCredentialsAJAXCall(request, sender, sendResponse);
        return true;
    }
    if(request.action === "registerCredentials"){
        console.log(request.data);
        registerCredentialsAJAXCall(request, sender, sendResponse);
        return true;
    }
    if(request.action === "setSessionStorage"){
        sendResponse(setSessionStorage(request));
    }
    if(request.action === "checkIfLogged"){
        sendResponse(checkIfLogged());
    }
    if(request.action === "logout"){
        sendResponse(logout());
    }
});
function getCredentialsAJAXCall(request, sender, sendResponse){  
    $.ajax({
        url: 'http://25.156.172.66:8080/vinno/user/login',
        type: 'POST',
        contentType: 'application/json',
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

function registerCredentialsAJAXCall(request, sender, sendResponse){  
    $.ajax({
        url: 'http://25.156.172.66:8080/vinno/user/register',
        type: 'POST',
        contentType: 'application/json',
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
function setSessionStorage(){
    sessionStorage["login"] = true;
    if(sessionStorage["login"] != undefined){
        return "Success";
    }
    return "Fail";
    
}
function checkIfLogged(){
    console.log("session storage is "+sessionStorage["login"]);
    if(sessionStorage["login"] === "true"){
        return "Success";
    }
    return "Fail";
}
function logout(){
    sessionStorage["login"] = undefined;
    if(sessionStorage["login"] === "true"){
        return "Fail";
    }
    return "Success";
}
