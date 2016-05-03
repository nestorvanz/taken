module.exports = function( database ){
	require('../models/modelFile');

	var ModelClass = database.model('modelName');

	return {
		actualizar: function( req, res ){
			var match = { _id: req.body._id },
				set = {
					$set: {
						name: req.body.name
					}
				};

			ModelClass.update(match, set, function( error ){
				if( error ) res.status(500).send(error.message);
				else res.send();
			});
		},
		agregar: function( req, res ){
			var modelInstance = new ModelClass(req.body);
			modelInstance.save(function( error ){
				if( error ) res.status(500).send(error.message);
				else res.json(modelInstance);
			});
		},
		eliminar: function( req, res ){
			var match = { _id: req.params.id };

			ModelClass.remove(match, function( error ){
				if( error ) res.status(500).send(error.message);
				else res.send();
			});
		},
		porID: function( req, res ){
			var match = { _id: req.params.id };

			ModelClass.findOne(match, function( error, data ){
				if( error ) res.status(500).send(error.message);
				else res.json(data);
			});
		},
		todos: function( req, res ){
			ModelClass.find(function( error, data ){
				if( error ) res.status(500).send(error.message);
				else res.json(data);
			});
		}
	};
};