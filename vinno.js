function getTitle (videoId) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getTitle"}, function(response) {
            //console.log(response.title);
            if(response != undefined){
                console.log("i from title is "+ videoId);
                var imageUrl = "http://i1.ytimg.com/vi/"+videoId+"/0.jpg";
                console.log(imageUrl);
                $("#title").html("<img src='"+imageUrl+"' /> <p id='title'>Title is "+response.title+"</p>");
            }
            
        });
    });
};
function getVideoID(){
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getVideoId"}, function(response) {
            console.log("video id in function is "+response.id);
            while(response == undefined){};
            getVideoIdFromRequest(response.id);
        });
    });
};
function getVideoIdFromRequest(videoId){
    getTitle(videoId);
}
$(document).ready(function() {
    getVideoID();
    $("#testButton").on("click", function(){
        console.log(getVideoID());
    });
});