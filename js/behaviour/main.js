//Parse related keys
var PARSE_APP = "AVK6janhsjZihCK9sXfVEizaFb0rp6VSPnVmE1HM";
var PARSE_JS = "bN7mdLEBI01jaYdvNk72zoMcM6zQNDTiTO5lCJar";

$(document).ready(function() {
	// Parse initialization
	Parse.initialize(PARSE_APP, PARSE_JS);

	// Username View
	var UsernameView = Parse.View.extend({
		template: Handlebars.compile($('#username-tpl').html()),
		render: function(){
			var currentUser = Parse.User.current();
			var context = {username: currentUser.get("username")};
			this.$el.html(this.template(context));
		}
	});
	var usernameView = new UsernameView();
	usernameView.render();
	$('#usernameHeader').html(usernameView.el);



	// Temperature Model
	var Temperature = Parse.Object.extend("Temperature");
	var Temperatures = Parse.Collection.extend({
		model: Temperature
	});

	var temperatures = new Temperatures();

	// Temperature View
	var TemperaturesView = Parse.View.extend({
		template: Handlebars.compile($('#temperatures-tpl').html()),
		render: function(){
			var collection = { temperature: this.collection.toJSON() };
			this.$el.html(this.template(collection));
		}
	});

	temperatures.fetch({
		success: function(temperatures) {
			var temperaturesView = new TemperaturesView({ collection: temperatures });
			temperaturesView.render();
			$('.main-container-temp').html(temperaturesView.el);
		},
		error: function(error) {
			console.log(error);
		}
	});

	var query = new Parse.Query(Temperature);
	query.find({
		success: function(results) {
			var jsonArray = JSON.parse(JSON.stringify(results));

			$("#TemperatureDataTable").dataTable({
				"aaData": jsonArray,
				"aoColumns": [
					{ "mData": "DegreeCelsius",
						"sWidth": "10%"
					},
					{ "mData": "createdAt",
						"sType": "date",
						"mRender": function(date, type, full) {
							return new Date(date).toUTCString();
						}
					}
				]
			});
			$('.dataTables_filter input').addClass('form-control').attr('placeholder','Search');
			$('.dataTables_length select').addClass('form-control');
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});

});