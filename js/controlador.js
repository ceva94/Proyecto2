var app =angular.module('practica', ['LocalStorageModule']);
app.controller("controladorPractica",function($scope){
	$scope.nombre = "carlos";
	$scope.nuevoComentario={};
	$scope.comentarios=[
	{
		comentario : "buen trabajo",
		username : " charlie"
	},
	{
		comentario:"lo se",
		username : "henry"
	}
	];
	$scope.agregarComentario=function(){
		$scope.comentarios.push($scope.nuevoComentario);
		$scope.nuevoComentario ={};
	}
});

app.controller("requerimiento", function($scope,$http){
	$scope.posts=[];
	$scope.newPost={};
	$http.get("https://jsonplaceholder.typicode.com/posts")
	.then(function(data){
		console.log(data);
		$scope.posts=data.data;
	},function(error){

	});	
	$scope.addPost=function(){
		data={
			title:$scope.newPost.title,
			body:$scope.newPost.body,
			userId:1
		}
		$http.post("https://jsonplaceholder.typicode.com/posts",data)
		.then(function(response){
			console.log(response);
			$scope.posts.push(response.data);
			$scope.newPost={};
		})
	}
});


app.controller("controladorStorage",function($scope,localStorageService){
	if(localStorageService.get("mirar")){
		$scope.todo=localStorageService.get("mirar");
	}
	else{
		$scope.todo=[];
	}

	$scope.$watchCollection("todo",
	function(newValue,oldValue)
	{
		localStorageService.set("mirar",$scope.todo);
	})


	$scope.addActv=function(){
		$scope.todo.push($scope.newActv);
		$scope.newActv={};
	}
});


app.filter("filtro",function(){
	return function(texto){
		return String(texto).replace(/<[^>]+>/gm,'') 
	}
}).controller('filtroController', function($scope){
	$scope.mi_html= "<p>Hola mundo </p>"
})