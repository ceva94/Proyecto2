var app =angular.module('main', ['ngCookies'])
	.run(function($rootScope){ $rootScope.direc ="http://192.168.0.11:8000"; });

app.controller('loginController',
	["$scope","$cookies","$http",function($scope,$cookies,$http){
	$scope.datos={};
	$scope.login= function(){
		var config = {
			method:'POST',
			url: $scope.direc+"/api/auth/login",
			dataType: "json",
			data:{
                 "email":$scope.datos.email ,
                 "password":$scope.datos.contra,
                 "remember_me": true
               }
		};
		$http(config).then(
			function(data){
				console.log(data.data.access_token);
				$cookies.put("remember",data.data.access_token);
			},
			function(data){console.log(data);});

	};
}]);

app.controller('registroController',
	["$scope","$cookies","$http","$window",function($scope,$cookies,$http,$window){
	$scope.info={};
	$scope.op1 = false;
	$scope.op2 = false;
	$scope.registrar= function(){
		tipo = "";
		if($scope.op1 ==true & $scope.op2==false ){
			tipo ="entrenador" ;
		}
		else{
			tipo = "general";
		}
		var config = {
			method:'POST',
			url:$scope.direc+"/api/auth/signup",
			dataType: "json",
			data:{
                 "name" :$scope.info.nombre ,
                 "email":$scope.info.email ,
                 "password":$scope.info.contra,
                 "password_confirmation":$scope.info.confircontra,
                 "tipo":tipo
               }
		};
		$http(config).then(
			function(data){
				console.log(data);
				$window.open("login.html","_self");
			},
			function(data){console.log(data);});
	};

	$scope.cambio = function(numero){
		if (numero ==1 ){
			$scope.op2=false;
			valor1=true;
			valor2=false;
		}
		else{
			$scope.op1=false;
			valor2=true;
			valor1=false;
		}
	}
}]);

app.controller('entrenador',
	['$scope','$http',function($scope,$http){
	


}]);