var mongoose = require('mongoose');

var schema = mongoose.Schema({
	// link: { type: mongoose.Schema.Types.ObjectId, ref: "modelo" }
	nombre: String,
	apellido: String,
	correo: String,
	contrasena: String,
	foto: String,
	descriction: String
}, { collection: 'usuarios' });

module.exports = mongoose.model('usuario', schema);