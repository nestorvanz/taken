(function(){
	angular.module("signIn", [])
	.controller("signInController", ["$scope", "$http", function( $scope, $http ){
		setTimeout(function(){
			document.getElementsByName("correo")[0].focus();
		}, 1);
		
		$scope.signIn = function(){
			var usuario = $scope.usuario;
			if( usuario && usuario.correo && usuario.contrasena  ){
				$http
					.post("api/session/web", usuario)
					.success(function( data ){
						localStorage.setItem("token", data);
						sessionStorage.setItem("token", data);
						location.href = "/";
					}).error(function( data ){
						console.log(data);
						$scope.error = data;
					});
			}
		};
	}]);
})();