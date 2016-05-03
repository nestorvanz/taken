var mongoose = require('mongoose');

var schema = mongoose.Schema({
	// link: { type: mongoose.Schema.Types.ObjectId, ref: "modelo" }
	parent: { type: mongoose.Schema.Types.ObjectId, ref: "file" },
	takenBy: { type: mongoose.Schema.Types.ObjectId, ref: "usuario" },
	name: String,
	isDirectory: Boolean
}, { collection: 'files' });

module.exports = mongoose.model('file', schema);