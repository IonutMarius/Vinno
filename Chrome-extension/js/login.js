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
                setSessionStorage();
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
                $(".login-message").html("<p style='color:red'>"+response.message+"</p>");
                setTimeout(
                    function() 
                    {  
                        window.location.replace("../pages/login.html");
                    }, 1500);
            }
            else{
                $(".login-message").html("<p style='color:red'>"+response.message+"</p>");
            }
        }
    });
});
$(document).ready(function() {
    checkIfLogged();
});
function setSessionStorage(){
    chrome.runtime.sendMessage({action: "setSessionStorage"}, function(response) {
        if(response != undefined){
            console.log(response);
            if(response === "Success"){
                window.location.replace("../pages/vinno.html");
            }
        }
    });
};
function checkIfLogged(){
    console.log("Check if logged");
    chrome.runtime.sendMessage({action: "checkIfLogged"}, function(response) {
        if(response != undefined){
            console.log(response);
            if(response === "Success"){
                window.location.replace("../pages/vinno.html");
            }
        }
    });
};