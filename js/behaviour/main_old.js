//Parse related keys
var PARSE_APP = "AVK6janhsjZihCK9sXfVEizaFb0rp6VSPnVmE1HM";
var PARSE_JS = "bN7mdLEBI01jaYdvNk72zoMcM6zQNDTiTO5lCJar";

$(document).ready(function() {
	// Parse initialization
	Parse.initialize(PARSE_APP, PARSE_JS);

	// Object definitions
	NoteObject = Parse.Object.extend("NoteObject");

	// SignUp methods
	$("#signUpForm").on("touchend", function(e) {
		alert("Button clicked");
		// Prevent Default Submit Event
		e.preventDefault();
		
		// Get data from the form and put them into variables
		var username = $("#username").val();
		var email = $("#email").val();
		var password = $("pass1").val();
		
		var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", email);
		user.signUp(null, {
			success: function(user) {
				console.log("Saved the user!");
				alert('Sie haben sich erfolgreich registriert!');
			},
			error: function(user, error) {
				console.dir(error);
				alert("Error: " + error.code + " " + error.message);
			}
		});
	});

	function getNotes() {
		var query = new Parse.Query(NoteObject);

		query.find({
			success:function(results) {
				console.dir(results);
				var s = "";
				for(var i=0, len=results.length; i<len; i++) {
					var note = results[i];
					s += "<p>";
					s += "<b>"+note.get("title")+"</b><br/>";
					s += "<b>Written "+note.createdAt + "<br/>";
					s += note.get("body");
					s += "</p>";
				}
				$("#notes").html(s);
			},
			error:function(error) {
				alert("Error when getting notes!");
			}
		});
	}

	$("#addNoteBtn").on("touchend", function(e) {
		e.preventDefault();

		//Grab the note details, no real validation for now
		var title = $("#noteTitle").val();
		var body = $("#noteBody").val();

		var note = new NoteObject();
		note.save({title:title, body:body}, {
			success:function(object) {
				console.log("Saved the object!");
				$("#noteTitle").val("");
				$("#noteBody").val("");
				getNotes();
			}, 
			error:function(object,error) {
				console.dir(error);
				alert("Sorry, I couldn't save it.");
			}
		});
	});

	//call getNotes immediately
	getNotes();

});