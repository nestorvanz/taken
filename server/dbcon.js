var mongoose = require("mongoose");

module.exports = {
	connect: function( database ){
		var connection;
		switch( database.provider ){
			case "MongoDB":
				var connectionString = "mongodb://" +database.server +"/" +database.name;
				connection = mongoose.createConnection(connectionString);
				connection.on('error', function( error ){
					console.log(error.message);
				});
				connection.on('open', function( error ){
					console.log('Connected to database: ' +database.name +'@' +database.server);
				});
				break;
		}
		return connection;
	}
};