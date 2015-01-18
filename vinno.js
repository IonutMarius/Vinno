function getTitle (videoId) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getTitle"}, function(response) {
            //console.log(response.title);
            if(response != undefined){
                var imageUrl = "http://i1.ytimg.com/vi/"+videoId+"/0.jpg";
                console.log(imageUrl);
                $("#currentPlaying").html("<h2>Current playing:</h2><img src='"+imageUrl+"' width='320px' height='200px'/> <p id='content' data-value='"+response.title+"' data-url='"+imageUrl+"' >Title is "+response.title+"</p>");
            }

        });
    });
};
function getVideoID(){
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getVideoId"}, function(response) {
            getTitle(response.id);
        });
    });
};

function addVideo(){
    var title = $("#content").attr("data-value");
    var imageUrl = $("#content").attr("data-url");
    var video = {};
    video["title"] = title;
    video["imageUrl"] = imageUrl;
    console.log(JSON.stringify(video));
    localStorage.setItem(Math.random(),JSON.stringify(video));
    console.log(title);
}
function loadVideos(){
    var tempLocalStorage = {};
    var i = 0;
    var sKey;
    for (; sKey = window.localStorage.key(i); i++) {
        tempLocalStorage[sKey] = window.localStorage.getItem(sKey);
    }
    var html = "";
    for(item in tempLocalStorage){
        var video = JSON.parse(tempLocalStorage[item]);
        html += "<h2>Videos</h2><hr><img src='"+video["imageUrl"]+"' width='320px' height='200px' /> <p>"+video["title"]+"</p><hr>";
         
    }
     $("#load").html(html);
}
$(document).ready(function() {
    getVideoID();
    loadVideos();
    $("#testButton").on("click", function(){
        addVideo();
    });
});