//Parse related keys
var PARSE_APP = "AVK6janhsjZihCK9sXfVEizaFb0rp6VSPnVmE1HM";
var PARSE_JS = "bN7mdLEBI01jaYdvNk72zoMcM6zQNDTiTO5lCJar";

$(document).ready(function() {
    // Parse initialization
    Parse.initialize(PARSE_APP, PARSE_JS);

    // Login
    $('#form-login').on('submit', function(e) {

        // Prevent Default Submit Event
        e.preventDefault();

        // Get data from the form and put them into variables
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;

        // Call Parse Login function with those variables
        Parse.User.logIn(username, password, {
            // If the username and password matches
            success: function(user) {
                window.location.href = "index.html";
            },
            // If there is an error
            error: function(user, error) {
                alert("Anmeldung fehlgeschlagen!\nBenutzername und/oder Passwort falsch.");
            }
        });

    });

});