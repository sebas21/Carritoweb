var productsModel = require('../model/Product');
//productManager var that have all methods' manager DB
var ProductManager = {
		//find all products in DB
		findAllProducts: function(callback){
			productsModel.find({},callback);
		},
		//update a product's perception by name 
		perceptionProductUpdate: function(name,rule,value,callback){
			if(rule === "like"){
				productsModel.findOneAndUpdate({Nombre: name},{Like: value},{ runValidators: true },callback);
				return;	
			}
			productsModel.findOneAndUpdate({Nombre: name},{Dislike: value},{ runValidators: true },callback);
		},
		//update a product's quantity by name
		quantityProductUpdate: function(name,value,callback){
			//runValidators: true, enable the mongoose schema validators
			productsModel.findOneAndUpdate({Nombre: name},{Cantidad: value},{ runValidators: true },callback);
		}
};

module.exports = ProductManager;


