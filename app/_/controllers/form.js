(function(){
	angular.module('form', ['angularValidator'])
	.controller('formController', ['$scope', 'fnc', function( $scope, fnc ){
		// if( $scope.id ){
		// 	fnc.api.get('/api/elemento/' +$scope.id, function( data ){
		// 		$scope.elemento = data;
		// 	});
		// }

		// $scope.delete = function(){
		// 	fnc.api.delete('/api/elemento/' +$scope.elemento._id, function( data ){
		// 		location.href = '#/';
		// 	});
		// };
	
		// $scope.submit = function(){
		// 	if( !$scope.id ){ // Agregar
		// 		fnc.api.post('/api/elemento/', $scope.elemento, function( data ){
		// 			location.href = '#/';
		// 		});
		// 	} else { // Editar
		// 		fnc.api.put('/api/elemento', $scope.elemento, function( data ){
		// 			location.href = '#/';
		// 		});
		// 	}
		// };

	}]);
})()