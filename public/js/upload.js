(function(){
    angular.module("upload", ["ngFileUpload"])
    .directive('file', function( Upload, $timeout, $http ){
		return {
			scope: { callbackObject: '=', file: '=', maxWidth: '@', ngModel: '=', onlyDownload: '=', label: '@', sizeButtons: "@", uri: "@" },
			templateUrl: '/public/templates/file.html',
			link: function($scope, elem, attrs, controller) {
				$scope.$watch("ngModel", function( newValue, oldValue ){
					if( $scope.label && newValue )
						$scope.label = newValue.split("/").pop();
				})
				
				$scope.upload = function( file ){
					if( file ){
						Upload.upload({
							url: $scope.uri,
							data: {
								file: file
							}
						}).progress(function (evt) {
							$scope.isUploading = true;
							$(elem).find('.progress').progress({
								percent: parseInt(100.0 * evt.loaded / evt.total)
							});
						}).success(function (data, status, headers, config) {
							file.serverName = data;
							if( $scope.label ) $scope.label = data.split("/").pop()
							$scope.ngModel = data;
							$timeout(function(){
								$scope.isUploading = false;
								if( $scope.file ){
									$scope.file( $scope.callbackObject );
								}
							}, 1);
						});
					}  else {
						delete $scope.ngModel;
						delete $scope.label;
					}
				};

				$scope.delete = function(){
					delete $scope.ngModel;
					if( $scope.label )
						$scope.label = attrs.label;
				};

				$scope.download = function(){
					window.location.href = '/download'+$scope.ngModel;
				};
			}
		};
	});
})();
