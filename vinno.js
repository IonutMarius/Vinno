function getVideoID(){
    var videoId;
    chrome.tabs.getCurrent(function(tab){
        console.log(tab.url);
    });

    return videoId;
};

$(document).ready(function() {

    $("#testButton").on("click", function(){
        console.log(getVideoID());
    });

});
chrome.extension.onMessage.addListener(function (message, sender, callback) {
    console.log("Message called");
    if(message == "tabChange"){
        getPlayerId();
    }
    
});
