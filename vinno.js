function getTitle () {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getTitle"}, function(response) {
            //console.log(response.title);
            $("#title").html("<p id='title'>Title is "+response.title+"</p>");
        });
    });
};
function getVideoID(){
    var videoId;
    chrome.tabs.getCurrent(function(tab){
        console.log(tab.url);
    });

    return videoId;
};

$(document).ready(function() {
    getTitle();
    $("#testButton").on("click", function(){
        console.log(getVideoID());
    });

});