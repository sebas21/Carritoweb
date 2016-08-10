var salesModel = require('../model/Sale');

//sale var that have all methods' manager DB
var sale = {

	findAllSales: function(callback){
		salesModel.find(callback);
	},
	saveSale: function(sale,callback){
		if(sale instanceof salesModel){
			sale.save(callback);
			return;
		}
		callback();
	},
	calculateTotal: function(callback){
		salesModel.find(callback);
	}
}

module.exports = sale;