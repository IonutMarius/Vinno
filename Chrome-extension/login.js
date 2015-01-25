$('#loginForm').submit(function(event ) {
    event.preventDefault();
    var $inputs = $('#loginForm :input');

    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    console.log("Sending message with "+JSON.stringify(values));
    chrome.runtime.sendMessage({action: "getCredentials",data:JSON.stringify(values)}, function(response) {
        if(response != undefined){
            console.log(response);
            console.log(response.message);
            if(response.message === "Success"){
                window.location.replace("vinno.html");
            }
            else{
                $(".login-message").html("<p style='color:red'>"+response.message+"</p>");
            }
        }
    });
});
$('#registerForm').submit(function(event ) {
    event.preventDefault();
    var $inputs = $('#registerForm :input');

    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    console.log("Sending message with "+JSON.stringify(values));
    chrome.runtime.sendMessage({action: "registerCredentials",data:JSON.stringify(values)}, function(response) {
        if(response != undefined){
            console.log(response);
            console.log(response.message);
            if(response.message === "User created"){
                window.location.replace("login.html");
            }
            else{
                $(".login-message").html("<p style='color:red'>"+response.message+"</p>");
            }
        }
    });
});