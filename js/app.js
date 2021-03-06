var fs = require("fs")

var profileTpl = Handlebars.compile(fs.readFileSync("html/partials/brfs/profile-popup.hbs"))

var app = {
	
	api: '/api',

	geocoder: function () {
		return L.mapbox.geocoder('tutorwire.map-rbl1tiup')
	},
	
	map: null,
	
	initMap: function (id) {
		id = id || 'map';

		var map = app.map = L.mapbox.map(id, 'tutorwire.map-rbl1tiup',{
			attributionControl: false,
			minZoom: 6
		});

		map.zoomControl.setPosition('topright');
		map.setView([55, -6], 6);

		return map;
	},
	
	userMarker: null,

	showUserMarker: function(location) {
		if (app.userMarker){
			app.map.removeLayer(app.userMarker);
		}

		var icon = L.AwesomeMarkers.icon({
			color: 'orange'
		});

		app.userMarker = L.marker(location.coords, {icon: icon, title: 'You are here'});
		
		app.userMarker.addTo(app.map);

		app.map.setView(location.coords, 11);
	},

	locateUser: function (cb){

		cb = cb || function(){};

		app.map.on('locationfound', function (event) {
			
			app.geocoder().reverseQuery(event.latlng, function (err, response){
				if (err) { return console.error(err) }
				
				// response looks like: {"query":[-0.0801,51.4657],"results":[[{"bounds":[-0.523222999999989,51.27866,0.336112,51.72023],"lat":51.5040006418191,"lon":-0.109467698133307,"name":"London","score":900001728809196.6,"type":"place","id":"mapbox-places.219827"},{"bounds":[-0.107894862857551,51.4191873235362,-0.0231455141541109,51.51158478481],"lat":51.4653860541731,"lon":-0.0636831061709452,"name":"Southwark","score":30926433.0294826,"type":"province","id":"province.2903"},{"bounds":[-13.6913559567794,49.9096161909876,1.77170536308596,60.8475532028857],"lat":54.3177967325959,"lon":-1.91064039912679,"name":"United Kingdom","population":61113205,"type":"country","id":"country.152"}]],"attribution":{"mapbox-places":"<a href='http://mapbox.com/about/maps' target='_blank'>Terms & Feedback</a>"}}
				var name = response.results[0][0].name;
				
				app.location = {
					name: name,
					coords: app.normalizeCoords(event.latlng)
				}

				cb(app.location);
			});

		});

		app.map.locate()
	},

	markers: [],

	clearMarkers: function(){
		console.log('Clearing markers', app.markers);
		var length = app.markers.length
		for (var i = 0; i < length; i++) {
			app.map.removeLayer(app.markers.pop());
		}
	},	

	showTutorsOnMap: function (tutors) {
		
		app.clearMarkers();

		console.log('Showing tutors on map', tutors);
		for (var i = 0; i < tutors.length; i++) {
			
			var tutor = tutors[i],
				icon = new L.Icon.Default;
			
			if (tutor.photo && tutor.photo.url) {
				icon = L.icon({
					className: 'photo-icon',
					iconUrl: tutor.photo.url,
					iconSize: [50, 50],
					popupAnchor: [4, -25]
				});
			}
			
			var marker = L.marker(tutor.location.coords, {
				title: tutor.name,
				icon: icon
			});
			
			marker.bindPopup(profileTpl(tutor));

			marker.addTo(app.map);

			app.markers.push(marker)
		}
	},

	getTutorsBySubject: function (subject, cb) {
		console.log('Getting tutors for', subject);
		$.ajax({
			dataType: 'json',
			crossDomain: true,
			url: this.api + '/tutors/for/' + subject,
			success: function (resp) {
				console.log('Got tutors for', subject, resp);
				cb(null, resp);
			}
		});
		// $.getJSON(this.api + '/tutors/for/' + subject, function (resp) {
		// 	console.log('Got tutors for', subject, resp);
		// 	cb(null, resp);
		// });
	},

	getTutor: function (puid, cb) {
		console.log('Getting', puid);
		$.ajax({
			dataType: 'json',
			crossDomain: true,
			url: this.api + '/tutor/' + puid,
			success: function (resp) {
				cb(null, resp);
			}
		});
	},

	normalizeCoords: function (coords) {
		return {
			lat: app.trimTo(coords.lat, 6),
			lng: app.trimTo(coords.lng, 6)
		};
	},

	trimTo: function (number, decimalPlaces) {		
		return parseFloat(number.toFixed(decimalPlaces));
	},
	
	type: function (word, cb, done) {
		var index = 1;
		var interval = setInterval(function () {
			
			cb(word.substring(0, index));
			
			index++;
			
			if (index > word.length) {
				clearInterval(interval)
				if ($.isFunction(done)){
					done(word);
				}
			}
		}, 100);
	},

	mailto: function(opts){
		return 'mailto:' + opts.email + "?subject=" + opts.subject.replace(/ /g, '%20') + '&body=' + opts.body.replace(/ /g, '%20')
	}
};

// Dump all ajax errors to console
$(document).ajaxError(function () {
	console.error('Bad Ajax! ', arguments);
});

// DO IT
$(document).ready(function () {
	console.log("Let's Go!");
});

module.exports = app;