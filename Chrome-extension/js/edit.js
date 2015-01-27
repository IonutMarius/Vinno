$(document).ready(function() {
    $(document).on("click", ".save-btn", function(){
        var annotationValue = $(this).siblings("input").val();
        var type = $(this).parent().data("type");
        var annotation = {};
        
        annotation.userId = 21;
        annotation.videoId = 13;
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
});
function modifyEditValues(){
    $(".editThumbnail").attr("src",sessionStorage["thumbnailUrl"]);
    $(".editTitle").html(sessionStorage["title"]);
    $(".editUsername").html(sessionStorage["username"]);
}