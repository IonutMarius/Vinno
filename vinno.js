function getTitle () {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getTitle"}, function(response) {
            //console.log(response.title);
            var videoId;
            if(response != undefined){
                videoId = getVideoID();
                $("#title").html("<img src='http://i1.ytimg.com/"+videoId+"/0.jpg' /> <p id='title'>Title is "+response.title+"</p>");
            }
            
        });
    });
};
function getVideoID(){
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getVideoId"}, function(response) {
            return response.id;
        });
    });
    return undefined;
};

$(document).ready(function() {
    getTitle();
    $("#testButton").on("click", function(){
        console.log(getVideoID());
    });
});