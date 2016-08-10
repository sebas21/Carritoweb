var express = require('express');
var router = express.Router();
var salesController = require('../controllers/Sales');

router.get('/',function findSales(req,res) {
	salesController.findAllSales(function find(err,sales){
		if(!err){
			return res.status(200).jsonp(sales);
		}
		res.status(500).send(err.message);
	});
});

router.post('/saveSale',function saveSale(req,res){
	var salesModel = require('../model/Sale');
	var newSale = new salesModel({
		Total: req.body.Total
	});
	salesController.saveSale(newSale,function save(err){
		if(!err){
			return res.status(200);
		}
		res.status(500).send(err.message);
	});
});

router.get('/salesTotal',function total(req,res){
	salesController.calculateTotal(function calculate(err,sales){
		if(!err){
			var total = 0;
			for (var i =0; i < sales.length; i++) {
				total += sales[i].Total;
			}
			return res.status(200).jsonp(total);
		}
		res.status(500).send(err.message);
	});
});

module.exports = router;