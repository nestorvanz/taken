var config = require("./server/config"),
	express = require("express");

var app = express();

app.use(require("./server/router-api")); // API's
app.use(require("./server/router-web")); // Web pages

var port = process.env.PORT || config.port;

var server = app.listen(port, function(){
	console.log("App stared on port " + port);
});