var app = {
	
	api: 'http://localhost:9000',
	
	initMap: function (id) {
		id = id || 'map';

		var map = app.map = L.mapbox.map(id, 'tutorwire.map-rbl1tiup',{
			attributionControl: false
		});

		map.setView([55,-10], 6);

		return map;
	},

	markers: [],

	showTutorsOnMap: function (tutors) {
		
		app.clearMarkers();

		console.log('Showing tutors on map', tutors);
		for (var i = 0; i < tutors.length; i++) {
			
			var tutor = tutors[i];
			
			var icon = new L.Icon.Default;
			
			// if (tutor.photo.url){
			// 	icon = L.icon({
			// 		iconUrl: tutor.photo.url,
			// 		iconSize: [50, 50]
			// 	})
			// }
			
			var marker = L.marker(tutor.location.coords, {
				title: tutor.name,
				icon: icon
			});

			marker.addTo(app.map);

			app.markers.push(marker)
		}
	},

	clearMarkers: function(){
		console.log('Clearing markers', app.markers);
		var length = app.markers.length
		for (var i = 0; i < length; i++) {
			app.map.removeLayer(app.markers.pop());
		}
	},

	getTutorsBySubject: function (subject, cb) {
		console.log('Getting tutors for', subject);
		$.getJSON(this.api + '/tutors/for/' + subject, function (resp) {
			console.log('Got tutors for', subject, resp);
			cb(null, resp);
		});
	},

	getTutor: function (puid, cb) {
		console.log('Getting', puid);
		$.getJSON(this.api + '/tutor/' + puid, function (resp){
			cb(null, resp);
		})
	},

	normalizeCoords: function (coords) {
		return {
			lat: app.trimTo(coords.lat, 6),
			lng: app.trimTo(coords.lng, 6)
		};
	},

	trimTo: function (number, decimalPlaces) {		
		return parseFloat(number.toFixed(decimalPlaces));
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