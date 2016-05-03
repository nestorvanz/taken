var auth = require("./auth"),
	bodyParser = require("body-parser"),
	dbcon = require("./dbcon"),
	express = require("express"),
	fs = require("fs"),
	path = require("path");

var repository = path.join(__dirname, "api"), // Absolute path for API's repository
	router = express.Router(); // Express router for API's

router.use(bodyParser.json()); // Use body parser for JSON format into XHR requests

// Databases connection
var databases = {
	taken: dbcon.connect( require("./databases/taken.json") )
};

fs.readdirSync(repository).forEach(function( file ){ // Read each file into repository
	if( file.indexOf("_.") == -1 ){ // Discar files with "_" at end of name
		var apis = require("./api/" +file)( auth, databases ); // Require the file with the API's
		router.use("/api", apis); // Use API's into router
	}
});

router.use("/api/*", function( req, res ){ // 404 Not found handler
	res.status(404).send("404 API not found"); // Send not found
});

module.exports = router;