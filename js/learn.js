if (!$('body.learn').length) {
	return;
}

var app = require('./app');
var ukCities = require('./uk-cities');

var map = app.initMap();

var place = $('#place');

place.typeahead({ source: ukCities.getCityNames });

var placeMarker;

place.on('change', function () {
	var cityName = $(this).val();
	var cityData = ukCities.cities[cityName];
	
	console.log("Selected:", cityName, cityData);
	
	if (placeMarker){
		map.removeLayer(placeMarker);
	}
	
	placeMarker = L.marker(cityData)
	placeMarker.addTo(map);
	
	map.setView(cityData, 8);
});