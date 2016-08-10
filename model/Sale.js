var db = require('../model/Connection');
var Schema = db.Schema;

//creating sale schema
var saleSchema = new Schema({
	Total: {
		type: Number, 
		required: true,
		min: 1
	}
});

//get and export collection 'registro' in DB
module.exports = db.model('registro',saleSchema);;