$(document).ready(function() {
    $(document).on("click", ".save-btn", function(){
        var annotationValue = $(this).siblings("input").val();
        var type = $(this).parent().data("type");
        var annotation = {};

        annotation.userId = sessionStorage["userId"];
        annotation.videoId = sessionStorage["videoId"];
        annotation.type = type;
        annotation.data = annotationValue;
        if(annotationValue != ""){
            console.log(JSON.stringify(annotation));

            chrome.runtime.sendMessage({action: "addAnnotation", data: JSON.stringify(annotation)}, function(response){
                if(response != undefined){
                    console.log(response.data);
                    console.log(response.message);
                    window.location.replace("../pages/edit.html");
                }
            }); 
        }

    });
    $(document).on("click",".closeBtn",function(){
        window.location.replace("../pages/vinno.html");
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
                var classVariable = "";
                var annotationClass = "";
                for(var i = 0;i<response.data.length;i++){
                    switch(response.data[i].type){
                        case "tag":
                            classVariable = $(".tags");
                            annotationClass = "annotation-tags ann-tag";
                            break;
                        case "comment":
                            classVariable = $(".comments");
                            annotationClass = "annotation-comments";
                            break;
                        case "related-video":
                            classVariable = $(".related-videos");
                            annotationClass = "annotation-related-videos";
                            break;
                        case "person":
                            classVariable = $(".people");
                            annotationClass = "annotation-people";
                            break;
                        case "image":
                            classVariable = $(".images");
                            annotationClass = "annotation-images";
                            break;
                        case "place":
                            classVariable = $(".places");
                            annotationClass = "annotation-places";
                            break;
                    }
                    if(response.data[i].type === "related-video"){
                        var videoId = getVideoIdFromUrl(response.data[i].data);
                        var thumbnailUrl = "http://i1.ytimg.com/vi/"+videoId+"/0.jpg";
                        classVariable.append("<div class='"+annotationClass+"' data-annotation='"+response.data[i].id+"'><img src='"+thumbnailUrl+"' class ='thumbnail' /><a href='"+response.data[i].data+"' class='video-title'>"+response.data[i].data+"</a><span class='glyphicon glyphicon-remove deleteAnnotationBtn'></span></div>");      
                    }
                    else if(response.data[i].type === "image"){
                        classVariable.append("<div class='"+annotationClass+"' data-annotation='"+response.data[i].id+"'>" + "<a href='"+response.data[i].data+"'</a><img src='" + response.data[i].data +"' class='ann-img'></a>" + "<span class='glyphicon glyphicon-remove deleteAnnotationBtn'></span></div>");
                    }
                    else{
                        classVariable.append("<div class='"+annotationClass+"' data-annotation='"+response.data[i].id+"'>"+response.data[i].data+"<span class='glyphicon glyphicon-remove deleteAnnotationBtn'></span></div>");
                    }

                    $(".deleteAnnotationBtn").on("click", function(){
                        var annotationId = $(this).closest("div").data("annotation");
                        deleteAnnotation(annotationId);
                    });
                }
            }
        }
    });
}
function deleteAnnotation(annotationId){
    chrome.runtime.sendMessage({action: "deleteAnnotation",data:annotationId}, function(response) {
        if(response != undefined){
            console.log(response);
            if(response.message === "Success"){
                window.location.replace("../pages/edit.html");
            }
        }
    });
}
function getVideoIdFromUrl(url){
    var match = url.match(/[?&]v=([^&]+)/);
    videoId = match[1];
    return videoId;
}