var config = require('config');
var http = require('http');
var router = require('routes')();
var request = require('request');
var filed = require('filed');

// Proxy to api server
router.addRoute('/api*', function (req, res, route) {
	if (req.method === 'POST') {
		console.log('POST')
		var proxyReq = request.post(config.app.api + route.splats[0]);
		req.pipe(proxyReq);
		proxyReq.pipe(res);
	} else {
		request(config.app.api + route.splats[0]).pipe(res);
	}
});

// All tutors get the tutor page regardless of id
router.addRoute('/tutor/:id', function (req, res, route) {
	filed(config.app.root + '/tutor/index.html').pipe(res);
});

// Serve the static files
router.addRoute('*', function (req, res, route) {
	filed(config.app.root + route.splats[0]).pipe(res);
});

function server (req, res) {
	var route = router.match(req.url);

	if (!route) {
		console.log('No route matched', req.url);
	}

	try {
		route.fn(req, res, route);
	} catch (e) {
		res.statusCode = 500;
		res.end()

	}
	console.log(res.statusCode + ' ' + req.url, route.splats);
}

http.createServer(server).listen(config.app.port);

console.log('tutorwire-www listening on :' + config.app.port);
