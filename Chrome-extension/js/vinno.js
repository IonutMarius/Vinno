function getVideoInfo (videoId) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getVideoInfo"}, function(response) {
            //console.log(response.title);
            if(response != undefined){
                var imageUrl = "http://i1.ytimg.com/vi/"+videoId+"/0.jpg";
                console.log(imageUrl);
                var html = "<h5>Currently playing: </h5><img src='"+imageUrl+"' width='320px' height='200px'/> <p id='content' data-value='"+response.title+"' data-turl='"+imageUrl+"'data-url='"+response.url+"' >"+response.title+" </p>";
                console.log(html);
                $("#currentlyPlaying").removeClass("hidden");
                $(".separator").removeClass("hidden");
                $("#addVideoBtn").before(html);
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
            console.log(response.message);
            if(response.data != undefined){
                var html = "<h5>My videos</h5>";
                for(var i = 0;i<response.data.length;i++){
                    html += "<div class='video' data-id='"+response.data[i].id+"'><div class='details clearfix'><img class='thumbnail' src='"+response.data[i].thumbnailUrl+"'><p class='video-title'>"+response.data[i].title+"</p><div class=\"button-container clearfix\"><button class='btn btn-info btn-xs editBtn'><span class='glyphicon glyphicon-pencil'></span></button><button class='btn btn-danger btn-xs deleteBtn'><span class='glyphicon glyphicon-remove'></span></button></div></div></div></div>";
                }
                $("#loadedVideos").html(html);
                $(".deleteBtn").on("click",function(){
                    var videoId = $(this).closest(".video").data("id");
                    deleteVideo(videoId);
                });
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
        $(".username").html(response);
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
function deleteVideo(videoId){
    chrome.runtime.sendMessage({action: "deleteVideo",data:videoId}, function(response) {
        if(response != undefined){
            console.log(response);
            if(response.message === "Success"){
                window.location.replace("../pages/vinno.html");
            }
        }
    });
}
$(document).ready(function() {
    getUserId();
    getUsername();
    getVideoID();
    $("#addVideoBtn").on("click", function(){
        addVideo();
    });
    $("#logoutBtn").on("click", function(){
        logout();
    });
});