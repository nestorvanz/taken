(function(){
	angular.module("card", [])
	.controller("cardController", ["$scope", "fnc", function( $scope, fnc ){
		console.log($scope.__usuario);
		fnc.api.get("/api/usuarios/" + $scope.__usuario._id, function( data ){
			$scope.usuario = data;
		});

		$scope.salir = function(){
			fnc.api.delete("/api/session/web", function(){
				localStorage.setItem("token", null);
				sessionStorage.setItem("token", null);
				location.href = "/";
			});
		};
	}]);
})()