var http = require('http');
var express = require('express');

var config = {
	port: 7001,
	root: '_dist'
};

var app = express();
// app.use(express.logger());
app.use(express.compress());

// Return index.html regardless of specific tutor id
app.get('/tutor/:id', function(req, res, next){
	console.log(req.url);
	req.url = '/tutor/';
	next();
});

app.use(express.static(config.root));

app.listen(config.port);

console.log('Listening on :' + config.port);
