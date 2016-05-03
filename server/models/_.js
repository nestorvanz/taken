var mongoose = require('mongoose');

var schema = mongoose.Schema({
	// link: { type: mongoose.Schema.Types.ObjectId, ref: "modelo" }
	name: String
}, { collection: 'collection_name' });

module.exports = mongoose.model('modelName', schema);