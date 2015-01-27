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
                //chrome.browserAction.setIcon({path: '../img/icon3.png'});
            }
            else{
                                chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
                                chrome.browserAction.setBadgeText({text: ''})
                //chrome.browserAction.setIcon({path: '../img/icon2.png'});

            }
        });
    });
};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("In getCredential with request: "+request);
    switch (request.action){
        case "getCredentials":
            console.log(request.data);
            getCredentialsAJAXCall(request, sender, sendResponse);
            return true;
            break;
        case "registerCredentials":
            console.log(request.data);
            registerCredentialsAJAXCall(request, sender, sendResponse);
            return true;
            break;
        case "setSessionStorage":
            sendResponse(setSessionStorage(request));
            return true;
            break;
        case "checkIfLogged":
            sendResponse(checkIfLogged());
            return true;
            break;
        case "logout":
            logout(request, sender, sendResponse);
            return true;
            break;
        case "getUserId":
            getUserId(request, sender, sendResponse);
            return true;
            break;
        case "addVideo":
            addVideo(request, sender, sendResponse);
            return true;
            break;
        case "getUsername":
            getUsername(request,sender,sendResponse);
            return true;
            break;
        case "getVideos":
            getVideos(request,sender,sendResponse);
            return true;
            break;
        case "getLocalVideos":
            getLocalVideos(request,sender,sendResponse);
            return true;
            break;
        case "updateVideos":
            updateLocalVideos(request,sender,sendResponse);
            return true;
            break;
    }
});
function getCredentialsAJAXCall(request, sender, sendResponse){  
    $.ajax({
        url: 'http://25.156.172.66:8080/vinno/users/login',
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
function getVideos(request, sender, sendResponse){  
    $.ajax({
        url: 'http://25.156.172.66:8080/vinno/videos/get/'+request.data,
        type: 'GET',
        success: function(response){
            console.log(response);
            saveVideosToSessionStorage(response);
            sendResponse(response);
        },
        error: function(e){
            sendResponse(e.statusText);   
        }
    });
};
function registerCredentialsAJAXCall(request, sender, sendResponse){  
    $.ajax({
        url: 'http://25.156.172.66:8080/vinno/users/register',
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
function addVideo(request, sender, sendResponse){
  $.ajax({
        url: 'http://25.156.172.66:8080/vinno/videos/add',
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
}
function setSessionStorage(request){
    sessionStorage["login"] = true;
    sessionStorage["userid"] = request.userid;
    sessionStorage["username"] = request.username;
    if(sessionStorage["login"] != undefined){
        return "Success";
    }
    return "Fail";

}
function getUserId(request, sender, sendResponse){
    sendResponse(sessionStorage["userid"]);
}
function getUsername(request, sender, sendResponse){
    sendResponse(sessionStorage["username"]);
}
function checkIfLogged(){
    console.log("session storage is "+sessionStorage["login"]);
    if(sessionStorage["login"] === "true"){
        return "Success";
    }
    return "Fail";
}
function saveVideosToSessionStorage(videos){
    sessionStorage["videos"] = videos;
}
function  getLocalVideos(request,sender,sendResponse){
    sendResponse(sessionStorage["videos"]);
}
function updateVideos(request,sender,sendResponse){
    sessionStorage["videos"] = request.data;
}
function logout(request, sender, sendResponse){
    sessionStorage["login"] = undefined;
    sessionStorage["userid"] = undefined;
    sessionStorage["username"] = undefined;
    sessionStorage["videos"] = undefined;
    $.ajax({
        url: 'http://25.156.172.66:8080/vinno/users/logout',
        type: 'POST',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            sendResponse(response);
        },
        error: function(e){
            sendResponse(e.statusText);   
        }
    });
}
