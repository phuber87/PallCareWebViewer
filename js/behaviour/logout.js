//Parse related keys
var PARSE_APP = "AVK6janhsjZihCK9sXfVEizaFb0rp6VSPnVmE1HM";
var PARSE_JS = "bN7mdLEBI01jaYdvNk72zoMcM6zQNDTiTO5lCJar";

$(document).ready(function() {
    // Parse initialization
    Parse.initialize(PARSE_APP, PARSE_JS);

    $("a.logout").click(function() {
        Parse.User.logOut();
        window.location.href = "login.html";
    });

});