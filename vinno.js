function getTitle () {

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getTitle"}, function(response) {
            console.log(response.title);
            $("#title").html("<p id='title'>Title is "+response.title+"</p>");
        });
    });
};

function getVideoID(){
    var videoId;
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        var match = activeTab.url.match(/[?&]v=([^&]+)/);
        videoId = match[1];
    });

    return videoId;
};

$(document).ready(function() {
    $("#testButton").on("click", function(){
         console.log(getVideoID());
    });

});

getTitle();
