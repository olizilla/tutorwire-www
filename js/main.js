var app = {
	api: 'http://localhost:9000',
	
	getTutor: function(puid, cb){
		console.log('Getting', puid);
		$.getJSON(this.api + '/tutor/' + puid, function(resp){

			cb(null, resp);
		})
	},

	initMap: function(id){
		id = id || 'map';

		var map = app.map = L.mapbox.map(id, 'tutorwire.map-rbl1tiup',{
			attributionControl: false
		});

		map.setView([55,-10], 6);

		return map;
	}
};

// Dump all ajax errors to console
$(document).ajaxError(function(){
	console.error('Bad Ajax! ',arguments);
});

// DO IT
$(document).ready(function(){
	console.log("Let's Go!");
});