$('#loginForm').submit(function(event ) {
    event.preventDefault();
    // get all the inputs into an array.
    var $inputs = $('#loginForm :input');

    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    chrome.runtime.sendMessage({action: "getCredentials",data:JSON.stringify(values)}, function(response) {
       if(response != undefined){
            console.log(response.message);
        }
    });
});