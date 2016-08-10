var express = require('express');
var router = express.Router();
var productsController = require('../controllers/Products');

router.get('/',function findProducts(req,res){
	productsController.findAllProducts(function find(err,products){
		if(!err){
			return res.status(200).jsonp(products);
		}
		res.status(500);
	});
});

router.put('/updatePerceptionProduct/:rule',function updatePerception(req,res){
	var name = req.body.Nombre;
	var value = req.body.Value;
	var rule = req.params.rule;
	productsController.perceptionProductUpdate(name,rule,value,function updatePerceptionByName(err,product){
		//if the product exist
		if(!product){
			//if the error not exist
			if(!err){
				return res.status(200);
			}else{
				res.status(500);
			}
		}else{
			res.status(500);
		}
	});
});

router.post('/updateProductQuantity',function updateQuantity(req,res){
	var name = req.body.Nombre;
	var value = req.body.Cantidad;
	productsController.quantityProductUpdate(name,value,function updateQuantityByName(err,product){
		console.log(err);
		//if the product exist
		if(product !== null){
			//if the error not exist
			if(!err){
				return res.status(200);
			}else{
				res.status(500);
			}
		}else{
			res.status(500);
		}
	});
});

module.exports = router;