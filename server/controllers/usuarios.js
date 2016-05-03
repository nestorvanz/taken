module.exports = function( database ){
	require('../models/usuario');

	var config = require("../config.json");
	var file = require("../file-manager");

	var Usuario = database.model('usuario'),
		auth = require("../auth");

	return {
		actualizar: function( req, res ){
			var match = { _id: req.user.id },
				fields = {};

			if( req.body.nombre )
				fields.nombre = req.body.nombre;
			if( req.body.correo )
				fields.correo = req.body.correo;
			if( req.body.contrasenaNueva )
				fields.contrasena = auth.hash(req.body.contrasenaNueva);

			fields.foto = req.body.foto || "/public/img/no-picture.png";
			fields.descripcion = req.body.descripcion;

			var set = { "$set": fields };
			
			Usuario.update(match, set, function( error, data ){
				if( error ) res.status(500).send(error.message);
				else res.send();
			});
		},
		autenticarWeb: function( req, res ){
			var match = {
				correo: req.body.correo,
				contrasena: auth.hash(req.body.contrasena)
			};
			
			Usuario.findOne(match, function( error, data ){
				if( error ) res.status(500).send(error.message);
				else if( data ){
					var usuario = {
						id: data._id,
						nombre: data.nombre,
						apellido: data.apellido
					};
					
					var token = auth.token(usuario, 1);
					req.session.token = token;
					res.send(token);
				} else {
					res.status(401).send("Correo o contraseña incorrecta. Verifique su información de usuario y vuelva a intentarlo.");
				}
			});
		},
		autenticado: function( req, res ){
			var match = { _id: req.user.id },
				project = {
					nombre: 1,
					correo: 1
				};

			Usuario.findOne(match, project, function( error, data ){
				if( error ) res.status(500).send(error.message);
				else res.json(data);
			});
		},
		createRoot: function(){
			var match = { correo: config.userRoot.email };

			Usuario.findOne(match, function( error, data ){
				if( error ) console.log("Could not verify '"+ config.userRoot.name +"' user");
				else if( !data ){
					var root = {
						nombre: config.userRoot.name,
						correo: config.userRoot.email,
						contrasena: auth.hash( "123" )
					};
					var usuario = new Usuario(root);
					usuario.save(function( error ){
						if( error ) console.log("Could not create '"+ config.userRoot.name +"' user");
						else console.log("User '"+ config.userRoot.name +"' created as " + config.userRoot.email);
					});
				} else {
					console.log("User '"+ config.userRoot.name +"' as "+ config.userRoot.email +" already exists");
				}
			});
		},
		foto: function( req, res ){
			var dir = "/public/user_" + req.user.id;
			var fileName = "profile-picture";

			file.save( req, res, dir, fileName, function( path ){
				res.send(path);
			});
		},
		porID: function( req, res ){
			var match = { _id: req.params.id };

			Usuario.findOne(match, function( error, data ){
				if( error ) res.status(500).send(error.message);
				else {
					data.contrasena = "";
					res.json(data);
				}
			});
		},
		salir: function( req, res ){
			req.session.reset();
			res.send();
		}
	};
};