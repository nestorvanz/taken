(function(){
	angular.module("form", ["angularValidator", "upload"])
	.controller("formController", ["$scope", "fnc", "message", function( $scope, fnc, message ){
		fnc.api.get("/api/usuarios/" + $scope.__usuario._id, function( data ){
			$scope.usuario = data;
		});

		$scope.submit = function(){
			fnc.api.put("/api/usuarios", $scope.usuario, function(){
				message.success("Datos actualizados", "Los datos del usuario han sido actualizados correctamente");
				location.href = "#/";
			});
		};
	}]);
})()