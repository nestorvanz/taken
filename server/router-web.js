var auth = require("./auth"),
	express = require("express"),
	fs = require("fs"),
	path = require("path");

var repository = path.join(__dirname, "www"),
	router = express.Router();

// Use cookie for all requests that are not an API
router.use(/^(?!\/api\/).*/i, auth.cookie());

// Make public the "public" folder
router.use('/public', express.static('./public'));

fs.readdirSync(repository).forEach(function( file ){
	if( file.indexOf('_.') == -1 ){ // Ignore files that ends with "_"
		var page = require("./www/" +file);

		if( !page.public && auth ){ // Apply authentication
			router.get(page.url, auth.web, function(req, res){
				res.sendFile(path.join(__dirname, '../app' + page.dir + '/index.html'));
			});

			// Angular controllers
			router.use(page.url + '/controllers', auth.web, function(req, res){
				res.sendFile(path.join(__dirname, '../app' + page.dir + '/controllers' + req.url));
			});

			// Angular views
			router.use(page.url + '/views', auth.web, function(req, res){
				res.sendFile(path.join(__dirname, '../app' + page.dir + '/views' + req.url.split('?')[0]));
			});
		} else {
			router.get(page.url, function(req, res){
				res.sendFile(path.join(__dirname, '../app' + page.dir + '/index.html'));
			});

			// Angular controllers
			router.use(page.url + '/controllers', function(req, res){
				res.sendFile(path.join(__dirname, '../app' + page.dir + '/controllers' + req.url));
			});

			// Angular views
			router.use(page.url + '/views', function(req, res){
				res.sendFile(path.join(__dirname, '../app' + page.dir + '/views' + req.url.split('?')[0]));
			});
		}
	}
});

// 404 Not found handler
router.use(function( req, res ){
	res.status(404).send("404 Page was not found");
	// res.sendFile(path.join(__dirname, '.../app/404/index.html')); // Apply this when you had an 404 page
});

module.exports = router;