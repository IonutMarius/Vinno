function getVideoInfo (videoId) {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {action: "getVideoInfo"}, function(response) {
            //console.log(response.title);
            if(response != undefined){
                var imageUrl = "http://i1.ytimg.com/vi/"+videoId+"/0.jpg";
                console.log(imageUrl);
                var html = "<h5>Currently playing:</h5> <div class='preview clearfix'><div class='preview-left'><img src='"+imageUrl+"'/></div> <div class='preview-right'><p id='content' data-value='"+response.title+"' data-turl='"+imageUrl+"'data-url='"+response.url+"' >"+response.title+" </p><button id='addVideoBtn' class='btn btn-primary btn-lg'>Add video</button></div</div>";
                console.log(html);

                $("#currentlyPlaying").removeClass("hidden");
                $(".separator").removeClass("hidden");
                $("#currentlyPlaying").append(html);
                $("#addVideoBtn").on("click", function(){
                    addVideo();
                });
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
                    html += "<div class='video' data-id='"+response.data[i].id+"' data-thumbnail='"+response.data[i].thumbnailUrl+"' data-title='"+response.data[i].title+"'><div class='details clearfix'><img class='thumbnail' src='"+response.data[i].thumbnailUrl+"'><p class='video-title'>"+response.data[i].title+"</p><div class=\"button-container clearfix\"><button class='btn btn-info btn-xs editBtn'><span class='glyphicon glyphicon-pencil'></span></button><button class='btn btn-danger btn-xs deleteBtn'><span class='glyphicon glyphicon-remove'></span></button></div></div><div class='annotations '><div class='tags'><p>Tags</p></div><div class='comments'><p>Comments</p></div><div class='related-videos clearfix'><p>Related videos</p></div><div class='people'><p>People</p></div></div></div></div>";
                }
                $("#loadedVideos").html(html);
                $(".deleteBtn").on("click",function(){
                    var videoId = $(this).closest(".video").data("id");
                    deleteVideo(videoId);
                });
                $(".editBtn").on("click",function(){
                    var videoId = $(this).closest(".video").data("id");
                    var thumbnailUrl = $(this).closest(".video").data("thumbnail");
                    var title = $(this).closest(".video").data("title");
                    var username = window.username;
                    addValuesForEditInSS(thumbnailUrl,title,username,videoId);
                    window.location.replace("../pages/edit.html");
                });
                $(".video").on("click", function(){                       
                    var videoId = $(this).closest(".video").data("id");
                    var userId = window.userId;

                    var annNode = $(this).find('.annotations');

                    if(annNode.find(".tags").children().length <= 1 && annNode.find(".comments").children().length <= 1 && annNode.find(".related-videos").children().length <= 1 && annNode.find(".people").children().length <= 1)
                        chrome.runtime.sendMessage({action: "getAnnotations",userId:userId,videoId:videoId}, function(response) {
                            if(response != undefined){
                                if(response.data != undefined){

                                    for(var i = 0;i<response.data.length;i++){
                                        switch(response.data[i].type){
                                            case "tag":
                                                annNode.find(".tags").append("<div class='annotation-small ann-tag'>" + response.data[i].data + "</div>");
                                                break;
                                            case "comment":
                                                annNode.find(".comments").append("<div class='annotation-small ann-comment'>" + response.data[i].data + "</div>");
                                                break;
                                            case "related-video":
                                                var videoYTId = getVideoIdFromUrl(response.data[i].data);
                                                var thumbnailUrl = "http://i1.ytimg.com/vi/"+videoYTId+"/0.jpg";
                                                annNode.find(".related-videos").append("<div class='annotation-small ann-video' ><img src='"+thumbnailUrl+"' class ='thumbnail' /><a href='"+response.data[i].data+"' class='video-title'>"+response.data[i].data+"</a></div><br>");
                                                break;
                                            case "person":
                                                annNode.find(".people").append("<div class='annotation-small ann-person'>" + response.data[i].data + "</div>");
                                                break;
                                        }
                                    }

                                }
                            }
                        }
                                                  );

                    annNode.slideToggle(600);
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
function addValuesForEditInSS(thumbnailUrl,title,username,videoId){
    sessionStorage["thumbnailUrl"] = thumbnailUrl;
    sessionStorage["title"] = title;
    sessionStorage["username"] = username;
    sessionStorage["userId"] = window.userId;
    sessionStorage["videoId"] = videoId;

}
$(document).ready(function() {
    getUserId();
    getUsername();
    getVideoID();
    $("#logoutBtn").on("click", function(){
        logout();
    });
});
function getVideoIdFromUrl(url){
    var match = url.match(/[?&]v=([^&]+)/);
    videoId = match[1];
    return videoId;
}