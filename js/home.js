var app = require('./app');
var ukCities = require('./uk-cities');

app.initMap();

$('#subject').on('change', search);

$('#searchForm').submit(search);

$('#search').click(search);

$('#find').click(search).hide();

$('#findme').click(function () {
	app.locateUser(function(location){
		app.showUserMarker(location);
		$('#place').val(location.name);
	});
})

$('.hide').removeClass('hide');

var magicSearch = 'Maths';

setTimeout(function () {
	type(magicSearch, 
		function (chars) { $('#subject').attr('placeholder', chars) }, 
		function (word)  { 
			type('UK', 
				function (chars) { $('#place').attr('placeholder', chars) },
				function (word)  { 
					// app.getTutorsBySubject(magicSearch, function (err, tutors) {
					// 	app.showTutorsOnMap(tutors);
					// })
					$('#subject').focus();
				}
			)	
		}
	)
}, 500);

// sync map with the place
var place = $('#place');

place.typeahead({ source: ukCities.getCityNames });

place.on('change', function () {

	var name = $(this).val();
	var coords = ukCities.cities[name];

	console.log('Place changed', name, coords);

	if (!coords){
		console.log('Geocoding', name);
		
		app.geocoder().query(name, function(err, response){
			if (err) { return console.error(err) }
			console.log('Geocoded', name, response);
			var latlng = response.latlng
			showPlace(name, {lat: latlng[0], lng: latlng[1]}); // latlng is an array
		});

	} else {

		showPlace(name, coords) // coords is an object
	}
});

function showPlace (name, coords) {
	console.log('Showing', name, coords);
	app.location = {
		name: name,
		coords: app.normalizeCoords(coords)
	}
	app.showUserMarker(app.location);
}

function search (event){
	event.preventDefault();
	var subject = $('#subject');
	
	if (!subject.val()) {
		return subject.focus()
	}
	
	app.getTutorsBySubject(subject.val(), function (err, tutors) {
		app.showTutorsOnMap(tutors);

		// Show results
	});
}

function type (word, cb, done) {
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
}