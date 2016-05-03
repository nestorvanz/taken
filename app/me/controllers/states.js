(function(){
	angular.module('states', ['ui.router', 'oc.lazyLoad'])
	.config(function( $urlRouterProvider, $stateProvider ){
		var states = [
			{ name: '/', dir: '/me', file: 'card' },
			{ name: '/edit', dir: '/me', file: 'form' }
		];

		$urlRouterProvider.otherwise("/");

		states.forEach(function( state, index, array ){
			$stateProvider.state(state.name, {
				url: state.name,
				templateUrl: state.dir + '/views/' + state.file + '.html?hash' + (new Date).getTime(),
				controller: function( $scope, $stateParams ){
					// Catch params from state
					$scope.id = $stateParams.id;
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