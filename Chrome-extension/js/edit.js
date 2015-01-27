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
                window.location.replace("../pages/edit.html");
            }
        });
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
                            annotationClass = "annotation-tags";
                            break;
                        case "comment":
                            classVariable = $(".comments");
                            annotationClass = "comments-tags";
                            break;
                        case "related-video":
                            classVariable = $(".related-videos");
                            annotationClass = "related-videos-tags";
                            break;
                        case "person":
                            classVariable = $(".people");
                            annotationClass = "people-tags";
                            break;
                    }
                    classVariable.append("<div class='"+annotationClass+"'>"+response.data[i].data+"</div>");
                }
            }
        }
    });
}