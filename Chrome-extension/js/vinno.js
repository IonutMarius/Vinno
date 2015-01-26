function getVideoInfo (videoId) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getVideoInfo"}, function(response) {
            //console.log(response.title);
            if(response != undefined){
                var imageUrl = "http://i1.ytimg.com/vi/"+videoId+"/0.jpg";
                console.log(imageUrl);
                var html = "<h2>Currently playing: </h2><img src='"+imageUrl+"' width='320px' height='200px'/> <p id='content' data-value='"+response.title+"' data-turl='"+imageUrl+"'data-url='"+response.url+"' >"+response.title+" </p>";
                console.log(html);
                $("#currentPlaying").html(html);
            }

        });
    });
};
function getVideoID(){
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getVideoId"}, function(response) {
            if(response != undefined){
                getVideoInfo(response.id);
            }
        });
    });
};

function addVideo(){
    var title = $("#content").attr("data-value");
    var imageUrl = $("#content").attr("data-turl");
    var url = $("#content").attr("data-url");
    var video = {};
    video["title"] = title;
    video["thumbnailUrl"] = imageUrl;
    video["userId"] = window.userId;
    video["videoURL"] = url;
    console.log("video stringify is "+JSON.stringify(video));
    chrome.runtime.sendMessage({action: "addVideo",data:JSON.stringify(video)}, function(response) {
        if(response != undefined){
            console.log(response);
            console.log(response.message);
            if(response.data != undefined){
                window.location.replace("../pages/vinno.html");
            }
        }
    });

}
function loadVideos(){
    var userid = window.userId;
    chrome.runtime.sendMessage({action: "getVideos",data:userid}, function(response) {
        if(response != undefined){
            console.log(response);
            console.log(response.message);
            if(response.data != undefined){
                var html = "";
                for(var i = 0;i<response.data.length;i++){
                    html += "<div class='video'><div class='details'><img class='thumbnail' src='"+response.data[i].thumbnailUrl+"'><span class='video-title'>"+response.data[i].title+"</span><div class='edit-button'><a href='#' class='btn btn-info btn-mini'><i class='icon-white icon-pencil'></i></a></div><div class='delete-button'><a href='#' class='btn btn-danger btn-mini'><i class='icon-white icon-remove'></i></a></div></div></div>";
                }
                $("#loadedVideos").html(html);
            }
        }
    });
}
function getUserId(){
    chrome.runtime.sendMessage({action: "getUserId"}, function(response) {
        window.userId = response;
        loadVideos();
    });
}
function getUsername(){
    chrome.runtime.sendMessage({action: "getUsername"}, function(response) {
        window.username = response;
    });
}
function logout(){
    chrome.runtime.sendMessage({action: "logout"}, function(response) {
        if(response != undefined){
            console.log(response);
            if(response.message === "Success"){
                window.location.replace("../pages/login.html");
            }
        }
    });
}
$(document).ready(function() {
    getUserId();
    getUsername();
    getVideoID();
    $("#testButton").on("click", function(){
        addVideo();
    });
    $("#logoutBtn").on("click", function(){
        logout();
    });
});