var app = require('./app');
var ukCities = require('./uk-cities');

var map = app.initMap();

var geocoder = L.mapbox.geocoder('tutorwire.map-rbl1tiup');

$('#subject').typeahead({
	name: 'subjects',
	local: require('./subjects')
});

var place = $('#place');

place.typeahead({
	name: 'city-names',
	local: ukCities.getCityNames()}
).on('change typeahead:selected', function () {

	var name = $(this).val();
	var coords = ukCities.cities[name];

	console.log('Place changed', name, coords);

	if (!coords){
		console.log('Geocoding', name);
		
		geocoder.query(name, function(err, response){
			if (err) { return console.error(err) }
			
			console.log('Geocoded', name, response);
			
			var latlng = response.latlng;
			showPlace(name, {lat: latlng[0], lng: latlng[1]});
		});

	} else {
		showPlace(name, coords); // coords is an object
	}
});

$('.tt-hint').addClass('form-control');

var placeMarker;

function showPlace (name, coords) {
	console.log('Showing', name, coords);
	
	if (placeMarker){
		map.removeLayer(placeMarker);
	}
	
	placeMarker = L.marker(coords)
	placeMarker.addTo(map);
	
	map.setView(coords, 8);
	
	app.location = {
		name: name,
		coords: app.normalizeCoords(coords)
	}
}

map.on('locationfound', function (event) {
	if (placeMarker){
		map.removeLayer(placeMarker);
	}
	
	placeMarker = L.marker(event.latlng);
	placeMarker.addTo(map);
	
	map.setView(event.latlng, 8);
	
	geocoder.reverseQuery(event.latlng, function (err, response){
		if (err) { return console.error(err) }
		
		// response looks like: {"query":[-0.0801,51.4657],"results":[[{"bounds":[-0.523222999999989,51.27866,0.336112,51.72023],"lat":51.5040006418191,"lon":-0.109467698133307,"name":"London","score":900001728809196.6,"type":"place","id":"mapbox-places.219827"},{"bounds":[-0.107894862857551,51.4191873235362,-0.0231455141541109,51.51158478481],"lat":51.4653860541731,"lon":-0.0636831061709452,"name":"Southwark","score":30926433.0294826,"type":"province","id":"province.2903"},{"bounds":[-13.6913559567794,49.9096161909876,1.77170536308596,60.8475532028857],"lat":54.3177967325959,"lon":-1.91064039912679,"name":"United Kingdom","population":61113205,"type":"country","id":"country.152"}]],"attribution":{"mapbox-places":"<a href='http://mapbox.com/about/maps' target='_blank'>Terms & Feedback</a>"}}
		var city = response.results[0][0].name;
		place.typeahead('setQuery', city);
		
		app.location = {
			name: city,
			coords: app.normalizeCoords(event.latlng)
		}
	})
})

map.locate();


$('form').submit(addTutor);

addPhotoDropTarget();

function addPhotoDropTarget(){
	filepicker.setKey('AeYGxADbBSoe2uvUCJHBWz');
	filepicker.makeDropPane($('#photoDropTarget')[0], {
		multiple: true,
		dragEnter: function() {
				$("#photoDropTarget").html("Drop to upload")
		},
		dragLeave: function() {
				$("#photoDropTarget").html("Drop files here")
		},
		onSuccess: function(fpfiles) {
				$("#photoDropTarget").empty();
				console.log(fpfiles);
				app.photo = fpfiles[0];
				var img = $('<img>').attr('src', app.photo.url);
				$("#photoDropTarget").append(img);
		},
		onError: function(type, message) {
				$("#localDropResult").text('('+type+') '+ message);
		},
		onProgress: function(percentage) {
				$("#photoDropTarget").text("Uploading ("+percentage+"%)");
		}
	});
}

function addTutor(event){

	event.preventDefault();

	var reqData = {
		photo: app.photo,
		name: $('#name').val(),
		email: $('#email').val(),
		subject: $('#subject').val(),
		location: app.location
	}

	$.ajax({
		type: 'POST',
		url: app.api + '/tutor',
		data: JSON.stringify(reqData),
		dataType: 'json',
		contentType: 'application/json',
		success: function(data){
			window.location = '/tutor/' + data.puid
		},
		failure: console.error
	});

	return false;
}