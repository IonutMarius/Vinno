$('#loginForm').submit(function(event ) {
    event.preventDefault();
    var $inputs = $('#loginForm :input');

    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    var cryptedPass = CryptoJS.MD5(values["password"]);
    values["password"] = cryptedPass.toString();
    console.log("Sending message with "+JSON.stringify(values));
    chrome.runtime.sendMessage({action: "getCredentials",data:JSON.stringify(values)}, function(response) {
        if(response != undefined){
            console.log(response);
            console.log(response.message);
            if(response.message === "Success"){
                setSessionStorage(response.data);
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
    var cryptedPass = CryptoJS.MD5(values["password"]);
    values["password"] = cryptedPass.toString();
    cryptedPass = CryptoJS.MD5(values["passwordConf"]);
    values["passwordConf"] = cryptedPass.toString();
    console.log("Sending message with "+JSON.stringify(values));
    chrome.runtime.sendMessage({action: "registerCredentials",data:JSON.stringify(values)}, function(response) {
        if(response != undefined){
            console.log(response);
            console.log(response.message);
            if(response.data != undefined){
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
function setSessionStorage(userid){
    var username = getUsername();
    chrome.runtime.sendMessage({action: "setSessionStorage",userid:userid,username:username}, function(response) {
        if(response != undefined){
            console.log(response);
            if(response === "Success"){
                window.location.replace("../pages/vinno.html");
            }
        }
    });
};
function getUsername(){
    var $inputs = $('#loginForm :input');

    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    return values["username"];
}
