var app =angular.module('main', ['ngCookies'])
	.run(function($rootScope){ 
		$rootScope.direc ="http://192.168.0.11:8000";
			});

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

app.controller('entrenadorController',
	['$scope','$http','$cookies','$window',function($scope,$http,$cookies,$window){
		$scope.equipos=[];
		$scope.id_equipo="";
		var config = {
			method:'GET',
			url:$scope.direc+"/api/auth/equipos-user",
			dataType: "json",
			headers:{
				'Authorization':'Bearer ' + $cookies.get('remember') ,
			}
		};
		$http(config).then(
			function(data){
				$scope.equipos = data.data ;
				console.log($scope.equipos);
			},
			function(data){console.log(data);});



		var config = {
				method:'GET',
				url:$scope.direc+"/api/auth/equipo/" +$cookies.get('id'),
				dataType: "json",
				headers:{
					'Authorization':'Bearer ' + $cookies.get('remember') ,
				}
			};
			if($cookies.get('id')){
				$http(config).then(function(data){
				$scope.equipo=data.data.name_Equipo;
				$scope.nombreDeporte=data.data.name_deporte;

				console.log(data.data.name_Equipo);

			},function(data){
				console.log(data);
			});}



		if($scope.id_equipo!==""){
			var config = {
				method:'GET',
				url:$scope.direc+"/api/auth/equipo/" +$scope.id_equipo,
				dataType: "json",
				headers:{
					'Authorization':'Bearer ' + $cookies.get('remember') ,
				}
			};
			$http(config).then(function(data){
				console.log(data);

			},function(data){
				console.log(data);
			});

		}

		$scope.nuevo=function(){
			var config = {
				method:'POST',
				url:$scope.direc+"/api/auth/equipo",
				dataType: "json",
				headers:{
					'Authorization':'Bearer ' + $cookies.get('remember') ,
				},
				data:{
					'nombre':$scope.nequipo,
					'deporte':$scope.nnombreDeporte
				}
			};
			$http(config).then(function(data){
				console.log(data);
				$scope.equipo="";
				$scope.nombreDeporte="";
				$window.open("entrenador.html","_self");

			},function(data){
				console.log(data);
			});

		};



		$scope.editar=function(a){
			$cookies.put("id",a);
			$window.open("editar_equipo.html","_self");
		}



		$scope.edit=function(){
			var config = {
				method:'PUT',
				url:$scope.direc+"/api/auth/equipo/" +$cookies.get('id'),
				dataType: "json",
				headers:{
					'Authorization':'Bearer ' + $cookies.get('remember') ,
				},
				data:{
					'nombre':$scope.equipo,
					'deporte':$scope.nombreDeporte
				}
			};
			$http(config).then(function(data){
				$cookies.remove('id');
				console.log(data);
				$window.open("entrenador.html","_self");

			},function(data){
				console.log(data);
			});

		}

		$scope.vaciar=function(){
			$cookies.remove('id');
			$window.open("entrenador.html","_self");

		}

		$scope.eliminar=function(a,equipo){
			var config = {
				method:'DELETE',
				url:$scope.direc+"/api/auth/equipo/"+a,
				dataType: "json",
				headers:{
					'Authorization':'Bearer ' + $cookies.get('remember') ,
				}
			};
			$http(config).then(
				function(data){
					$window.alert("Se elimino equipo");
					var pos =$scope.equipos.indexOf(equipo);
					$scope.equipos.splice(pos);
				},
				function(data){console.log(data);});
		}

		$scope.verNo=function(id){
			$cookies.put("id",id);
			$window.open("noticias.html","_self");


		}

	}
]);

app.controller("noticiaController",[['$scope','$http','$cookies','$window',function($scope,$http,$cookies,$window){
	
}]);