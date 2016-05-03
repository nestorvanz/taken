(function(){
	angular.module('list', ['angularValidator'])
	.controller('listController', ['$scope', 'fnc', function( $scope, fnc ){
		// fnc.api.get('/api/elementos/' +$scope.id, function( data ){
		// 	$scope.elementos = data;
		// });
	}]);
})()