var app=angular.module("MainApp",["ngRoute","Maincontrollers"]);

app.config(Route);

function Route($routeProvider){
	$routeProvider

	.when('/',{
		controller: "ConfigCtrol",
		templateUrl: '/views/home.html'
	})
	.when('/registrouser',{
		controller: "RegisterUserCtrl",
		templateUrl: '/views/RegistroUser.html'
	})
	.when("/login",{
		controller: "LoginCtrl",
		templateUrl: '/views/login.html'
	})
	.when("/registro",{
        controller: "RegisterVentasCtrl",
		templateUrl:"/views/RegistroVentas.html"
	}).when('/productos',{
		controller: "ProductsController",
		templateUrl:'/views/products.html'
	}).when("/carrito",{
		controller: 'carritoCtrl',
		templateUrl: "/views/carrito.html"
    }).otherwise({
		redirectTo: '/'
	});
};


