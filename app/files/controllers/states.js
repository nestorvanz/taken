(function(){
	angular.module('states', ['ui.router', 'oc.lazyLoad'])
	.config(function( $urlRouterProvider, $stateProvider ){
		var states = [
			{ name: '/', dir: '', file: 'list' },
			{ name: '/:id', dir: '', file: 'list' }
		];

		$urlRouterProvider.otherwise("/");

		states.forEach(function( state, index, array ){
			$stateProvider.state(state.name, {
				url: state.name,
				templateUrl: state.dir + '/views/' + state.file + '.html?hash' + (new Date).getTime(),
				controller: function( $scope, $stateParams ){
					// Catch params from state
					$scope.params = $stateParams;
				},
				resolve: {
					include: function( $ocLazyLoad ){
						return $ocLazyLoad.load({
							name: state.file,
							files: [ state.dir + '/controllers/' + state.file + '.js' ]
						});
					}
				}
			});
		});
	});
})();