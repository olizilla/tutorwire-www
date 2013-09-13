var app = require('./app');

var map = app.initMap();

var idRegex = /tutor\/(.+)/;

var res = idRegex.exec(window.location);

if (!res || !res[1]){
	console.error('Unknown tutor ID');
} else {
	
	var tutorId = res[1];
	
	app.getTutor(tutorId, function(err, tutor){
		console.log('TUTOR:', tutor);
	
		if(!tutor){
			return;
		}
	
		$('#tutor-name').text(tutor.name);
	
		$('#tutor-subject').text(tutor.subject);
	
		$('#tutor-location-name').text(tutor.location.name);
	
		if (tutor.photo){
			var img = $('<img>').attr('src', tutor.photo.url);
			$('#photoDropTarget').append(img);
		}
	
		var latlng = new L.LatLng(
			(tutor.location.coords.lat.toFixed(5))/1, 
			(tutor.location.coords.lng.toFixed(5))/1
		)
		console.log('coords', latlng);
		
		var marker = new L.marker(latlng, {});
		
		marker.addTo(map);
		map.setView(latlng, 8);
	});
}