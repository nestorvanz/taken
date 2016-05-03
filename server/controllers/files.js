module.exports = function( database ){
	require('../models/file');

	var File = database.model('file');

	return {
		// actualizar: function( req, res ){
		// 	var match = { _id: req.body._id },
		// 		set = {
		// 			$set: {
		// 				name: req.body.name
		// 			}
		// 		};

		// 	File.update(match, set, function( error ){
		// 		if( error ) res.status(500).send(error.message);
		// 		else res.send();
		// 	});
		// },
		agregar: function( req, res ){
			var file = new File(req.body);
			file.save(function( error ){
				if( error ) res.status(500).send(error.message);
				else res.json(file);
			});
		},
		// eliminar: function( req, res ){
		// 	var match = { _id: req.params.id };

		// 	File.remove(match, function( error ){
		// 		if( error ) res.status(500).send(error.message);
		// 		else res.send();
		// 	});
		// },
		porID: function( req, res ){
			var match = { _id: req.params.id };

			File.findOne(match, function( error, data ){
				if( error ) res.status(500).send(error.message);
				else res.json(data);
			});
		},
		leer: function( req, res ){
			var match = {
				parent: req.query.parent
			};

			File.find(match)
				.populate("takenBy")
				.exec(function( error, data ){
					if( error ) res.status(500).send(error.message);
					else res.json(data);
				});
		},
		liberar: function( req, res ){
			var match = { _id: req.body._id };
			var set = {
				$set: {
					takenBy: null
				}
			};

			var file = new File(req.body);
			File.update(match, set, function( error, data ){
				if( error ) res.status(500).send(error.message);
				else res.send();
			});
		},
		tomar: function( req, res ){
			var match = { _id: req.body._id };
			var set = {
				$set: {
					takenBy: req.body.takenBy._id
				}
			};

			var file = new File(req.body);
			File.update(match, set, function( error, data ){
				if( error ) res.status(500).send(error.message);
				else res.send();
			});
		}
	};
};