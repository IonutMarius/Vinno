$(document).ready(function() {
    $(document).on("click", ".save-btn", function(){
        var annotationValue = $(this).siblings("input").val();
        var type = $(this).parent().data("type");
        var annotation = {};

        annotation.userId = sessionStorage["userId"];
        annotation.videoId = sessionStorage["videoId"];
        annotation.type = type;
        annotation.data = annotationValue;

        console.log(JSON.stringify(annotation));

        chrome.runtime.sendMessage({action: "addAnnotation", data: JSON.stringify(annotation)}, function(response){
            if(response != undefined){
                console.log(response.data);
                console.log(response.message);

            }
        });
    });
    modifyEditValues();
    loadAnnotations();
});
function modifyEditValues(){
    $(".editThumbnail").attr("src",sessionStorage["thumbnailUrl"]);
    $(".editTitle").html(sessionStorage["title"]);
    $(".editUsername").html(sessionStorage["username"]);
}
function loadAnnotations(){
    var userid = sessionStorage["userId"];
    var videoid = sessionStorage["videoId"];
    chrome.runtime.sendMessage({action: "getAnnotations",userId:userid,videoId:videoid}, function(response) {
        if(response != undefined){
            console.log(response.message);
            if(response.data != undefined){
                for(var i = 0;i<response.data.length;i++){
                    switch(response.data[i].type){
                        case "tag":
                            console.log(response.data[i].type);
                            break;
                        case "comment":
                            console.log(response.data[i].type);
                            break;
                        case "related-video":
                            console.log(response.data[i].type);
                            break;
                        case "person":
                            console.log(response.data[i].type);
                            break;
                    }
                }
//                var html = "<h5>My videos</h5>";
//                for(var i = 0;i<response.data.length;i++){
//                    html += "<div class='video' data-id='"+response.data[i].id+"' data-thumbnail='"+response.data[i].thumbnailUrl+"' data-title='"+response.data[i].title+"'><div class='details clearfix'><img class='thumbnail' src='"+response.data[i].thumbnailUrl+"'><p class='video-title'>"+response.data[i].title+"</p><div class=\"button-container clearfix\"><button class='btn btn-info btn-xs editBtn'><span class='glyphicon glyphicon-pencil'></span></button><button class='btn btn-danger btn-xs deleteBtn'><span class='glyphicon glyphicon-remove'></span></button></div></div></div></div>";
//                }
//                $("#loadedVideos").html(html);
//                $(".deleteBtn").on("click",function(){
//                    var videoId = $(this).closest(".video").data("id");
//                    deleteVideo(videoId);
//                });
//                $(".editBtn").on("click",function(){
//                    var videoId = $(this).closest(".video").data("id");
//                    var thumbnailUrl = $(this).closest(".video").data("thumbnail");
//                    var title = $(this).closest(".video").data("title");
//                    var videoId = $(this).closest(".video").data("id");
//                    var username = window.username;
//                    addValuesForEditInSS(thumbnailUrl,title,username,videoId);
//                    window.location.replace("../pages/edit.html");
//                });
            }
        }
    });
}