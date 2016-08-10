var userModel = require('../model/userModel');
var db = require('../model/connection');

exports.addUser = function(req,res){
	newUser = new userModel({
		Cedula: req.body.Cedula,
		Nombre: req.body.Nombre,
		Apellido: req.body.Apellido,
		Correo: req.body.Correo
	});
	newUser.save(function(err,user){
		if(err){
			return res.status(500).send(err.message);
		}
		res.status(200).jsonp(user);
	});
};

exports.findAllUsers = function(req,res){
	userModel.find(function(err,users){
		if(err){
			return res.status(500).send(err.message);
		}
		res.status(200).jsonp(users);
	});
};