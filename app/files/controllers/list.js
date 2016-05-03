(function(){
	angular.module('list', ['angularValidator'])
	.controller('listController', ['$scope', 'fnc', "layout", "message", function( $scope, fnc, layout, message ){
		$scope.current = {};
		var api = "/api/files";
		if( $scope.params.id ){
			api += "?parent=" + $scope.params.id;

			fnc.api.get("/api/files/" + $scope.params.id, function( data ){
				$scope.current = data;
				if( data.parent ){
					fnc.api.get("/api/files/" + data.parent, function( data ){
						$scope.current.parent = data;
					});
				}
			});
		}

		fnc.api.get(api, function( data ){
			$scope.files = data;
		});


		$scope.abrirAgregarArchivo = function(){
			layout.modal.open("#file");
		};

		$scope.cerrarAgregarArchivo = function(){
			layout.modal.close("#file");
		};

		$scope.liberarArchivo = function( file ){
			message.confirm.open("unlock", file.name, "¿Está seguro que desea liberar el archivo?", function(){
				file.takenBy = $scope.__usuario._id;
				fnc.api.put("/api/files/release", file, function( data ){
					file.takenBy = null;
					message.confirm.close();
				});
			});
		};

		$scope.submit = function(){
			$scope.file.parent = $scope.params.id;

			fnc.api.post("/api/files", $scope.file, function( data ){
				$scope.file._id = data._id;
				$scope.files.push( fnc.clone({}, $scope.file));
				$scope.fileForm.reset();
				$scope.file = {};
				layout.modal.close("#file");
			});
		};

		$scope.tomarArchivo = function( file ){
			message.confirm.open("lock", file.name, "¿Está seguro que desea tomar el archivo?", function(){
				file.takenBy = $scope.__usuario;
				fnc.api.put("/api/files/take", file, function( data ){
					message.confirm.close();
				});
			});
		};
	}]);
})();