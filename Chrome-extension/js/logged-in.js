(function checkIfLogged(){
    console.log("Check if logged");
    chrome.runtime.sendMessage({action: "checkIfLogged"}, function(response) {
        if(response != undefined){
            console.log(response);
            if(response === "Success"){
                window.location.replace("../pages/vinno.html");
            }
        }
    });
})();
