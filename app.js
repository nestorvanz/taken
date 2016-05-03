var config = require("./config"),
	express = require("express");

var app = express();

app.get("/", function( req, res ){
	res.send("My first application...");
});

var port = process.env.PORT || config.port;

var server = app.listen(port, function(){
	console.log("App stared on port " + port);
});