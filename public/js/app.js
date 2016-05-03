(function(){
	angular.module("app", ["states", "layout", "fnc", "messenger"])
	.controller("appController", ["$scope", "layout", "fnc", "message", function( $scope, layout, fnc, message ){
		fnc.api.message = message;
		fnc.api.get("/api/session", function( data ){
			$scope.__usuario = data;
		});
	}]);
})();