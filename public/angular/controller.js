  var controllers=angular.module("Maincontrollers",["MainServices"]);

  controllers
  .controller("ConfigCtrol",Confighome)
  .controller("ProductsController",operaciones)
  .controller("carritoCtrl",carrito)
  .controller("RegisterVentasCtrl",ConfigVentas)
  .controller("RegisterUserCtrl",ConfigUser)
  .controller("LoginCtrl",ConfigLogin);


  function ConfigLogin($scope,$http){
    $scope.user=[];
    $http.get('/users').success(function(data) {
                  $scope.user = data;
                  
              }).error(function(data) {
                  console.log('Error: ' + data);
              });

   $scope.login=function(date){
    for (var i = 0; i < $scope.user.length; i++) {
           if((date.username===$scope.user[i].Correo)&&(date.password===$scope.user[i].Cedula)){
            alert('Longin EXITOSA!');
           }

   }

  }
}


 function ConfigUser($scope,$http){
   $scope.registro= function(info){
      var user = {
                    Cedula: info.password,
                    Nombre: info.nombre,
                    Apellido: info.apellido,
                    Correo: info.correo
              }
         $http.post('/users/addUser',user).success(function(data) {
                alert('REGISTRO EXITOSA!');
              }).error(function(data) {
                  console.log("Error " + data);
              });

   }

}

 function ConfigUser($scope,$http){
   $scope.registro= function(info){
      var user = {
                    Cedula: info.password,
                    Nombre: info.nombre,
                    Apellido: info.apellido,
                    Correo: info.correo
              }
         $http.post('/users/addUser',user).success(function(data) {
                alert('success');
              }).error(function(data) {
                  console.log("Error " + data);
              });

   }

}


  function Confighome($scope,$http){
  $scope.populares=[];
   $scope.productos=[];
  var refresh = function() {
              $http.get('/products').success(function(data) {
                  $scope.productos = data;
                  for (var i = 0; i < $scope.productos.length; i++) {
                     if($scope.productos[i].Like>20){
                      $scope.populares.push($scope.productos[i]);
                     }
                     }
              }).error(function(data) {
                  console.log('Error: ' + data);
              });
          };
          refresh();

}

  //CONTROLADOR PRODUCTO
  function operaciones($scope, $http, ShopSesion) {
          $scope.productos = [];
          $scope.cantProductosCarrito = ShopSesion.getProducts().length;
          var refresh = function() {
              $http.get('/products').success(function(data) {
                  $scope.productos = data;
              }).error(function(data) {
                  console.log('Error: ' + data);
              });
          };
          refresh();
          this.tab = 0;
          this.setTab = function(newValue) {
              this.tab = newValue;
          };
          this.isSet = function(tabName) {
              return this.tab === tabName;
          };
          $scope.ordenarMayormenor = function(orden) {
              $scope.ordenMayor = orden;
          }
          $scope.add = function(producto) {
              $scope.cantProductosCarrito = ShopSesion.getProducts().length;
              ShopSesion.add(producto);
          } 




          $scope.Likeclicked = [];
          $scope.Dislikeclicked = [];
          $scope.Likes = function(producto) {
              if (!$scope.Likeclicked[producto]) {
                  producto.Like = producto.Like + 1;
                  $scope.Likeclicked[producto] = true;
              }
              if ($scope.Dislikeclicked[producto] == true) {
                  producto.Dislike = producto.Dislike - 1;
                  $scope.Dislikeclicked[producto] = false;
              }
              var data = {
                  Like: producto.Like,
                  Dislike: producto.Dislike
              }
              $http.put('/products/updateQuality/' + producto.Nombre, data).success(function(data) {
                  refresh();
              }).error(function(data) {
                  console.log("Error " + data);
              });
          }
          $scope.Dislikes = function(producto) {
              if (!$scope.Dislikeclicked[producto]) {
                  producto.Dislike = producto.Dislike + 1;
                  $scope.Dislikeclicked[producto] = true;
              }
              if ($scope.Likeclicked[producto] == true) {
                  producto.Like = producto.Like - 1;
                  $scope.Likeclicked[producto] = false;
              }
              var data = {
                  Like: producto.Like,
                  Dislike: producto.Dislike
              }
              $http.put('/products/updateQuality/' + producto.Nombre, data).success(function(data) {
                  refresh();
              }).error(function(data) {
                  console.log("Error " + data);
              });










              
              //METODO QUE GUARDA E BASE DE DATOS ACA!
          }


          $scope.filtrarPor = function(orden) {
              $scope.filtroSeleccionado = orden;
          }
      }
  //CONTROLADOR CARRITO 
  function carrito($scope, ShopSesion, $http) {
          $scope.Confirm = false;
          $scope.compraproducts = [];
          $scope.Visibility = true;
          $scope.newproducts = ShopSesion.getProducts();
          $scope.acumulador = 0;
          $scope.contador = 0;

          var verificar=function(){
          if ($scope.newproducts.length === 0) {
              $scope.empty = "Your shopping cart is empty";
              $scope.Visibility = false;
          }
          }
          verificar();
          $scope.borrar = function(producto, date) {
              if ($scope.contador != 0) {
                  $scope.contador -= 1;
                  $scope.acumulador = $scope.acumulador - date.total;
              }
              if (($scope.newproducts.length === 0) && ($scope.contador === 0)) {
                  $scope.empty = "Your shopping cart is empty";
                  $scope.Visibility = false;
              }
              var i;
              var len = $scope.newproducts.length;
              for (i = 0; i < len; i++) {
                  if ($scope.newproducts[i].Nombre === producto.Nombre) {
                      $scope.newproducts.splice(i, 1);
                      verificar();
                      return;
                  }
              }
          }
          $scope.cantidad = function(date, producto) {
              if (date.nuevaCantidad > producto.Cantidad) {
                  date.msj = "";
                  date.confirm = "";
                  date.total = "";
                  date.err = "INVALID AMOUNT";
                  return;
              }
              date.err = "";
              date.msj = "QUANTITY TO PAY : " + date.nuevaCantidad;
              date.total = date.nuevaCantidad * producto.Precio;
              date.confirm = "TOTAL IS : " ;
              date.nuevaCantidad = "";
              $scope.Confirm = true;
          }
          $scope.confirmar = function(producto, date) {
              var product = {};
              product.Nombre = producto.Nombre;
              product.Cantidad = date.total / producto.Precio;
              product.Precio = date.total;
              $scope.contador += 1;
              $scope.acumulador = $scope.acumulador + date.total;
              var i;
              var len = $scope.newproducts.length;
              for (i = 0; i < len; i++) {
                  if ($scope.newproducts[i].Nombre === product.Nombre) {
                      $scope.newproducts[i].Cantidad -= product.Cantidad;
                  }
              }
              date.confirm = "";
              date.msj = "";
              $scope.compraproducts.push(product);
              $scope.Confirm = false;
          }
          $scope.comprarall = function() {
              var data = {
                  Total: $scope.acumulador
              }
              $http.post('/sales/saveSale', data).success(function(data) {
               
              }).error(function(data) {
                  console.log("Error " + data);
              });
                 alert('COMPRA EXITOSA!');
                  $scope.newproducts =[];
                  verificar();
          }
      }
  //CONTROLADOR VENTAS
  function ConfigVentas($scope, $http) {
      $scope.sales = [];
  
      $scope.total = 0;
      var refresh = function() {
          $http.get('/sales').success(function(data) {
              $scope.sales = data;
          }).error(function(data) {
              console.log('Error: ' + data);
          });
      };
      $http.get('/sales/salesTotal').success(function(data){
        $scope.total = data;
      });
      refresh();
  }