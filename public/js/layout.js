(function(){
	angular.module('layout', [])
	.factory('layout', ['$rootScope', '$timeout', function( $rootScope, $timeout ){
		$rootScope.layout = {
			apps: 'public/templates/apps.html',
			header: 'public/templates/header.html',
			menu: 'public/templates/menu.html',
			showApps: function(){
				$('header button.apps').transition('fade');
				$('.layout.apps').transition('fade');
				$('.layout.apps .cont').transition('fade left');
			},
			showMenu: function(){
				$('header button.menu').transition('fade');
				$('.layout.menu').transition('fade');
				$('.layout.menu .cont').transition('fade right');
			}
		}

		return {
			dropdown: {
				reset: function( selector ){
					$timeout(function(){
						$(selector)
							.dropdown('destroy')
							.dropdown({
								action: "activate"
							});
					}, 1);
				},
				search: function( selector, noResutls ){
					var elem = $(selector);
					elem.addClass("ui");
					elem.addClass("search");
					elem.addClass("dropdown");

					$timeout(function(){
						elem.dropdown({
							match: "text",
							fullTextSearch: true,
							message: {
								noResults: noResutls
							}
						});
					}, 1);
					return elem;
				}
			},
			modal: {
				close: function( selector, next ){
					var config = {};
					if( next ) config.onHidden = next;
					$('.ui.modal' +selector)
						.modal(config)
						.modal("hide");
				},
				open: function( selector, next ){
					var config = {
						observeChanges: true
					};
					if( next ) config.onVisible = function (){
						setTimeout(function(){
							next();
						}, 0);
					};
					$timeout(function(){
						$('.ui.modal' +selector)
							.modal(config)
							.modal("show");
					}, 1);
				},
				remove: function( selector ){
					$('body > .modals > .ui.modal' +selector).remove();
				}
			}
		};
	}])

	.directive('searchDropdown', ['$timeout', function( $timeout ){
		return {
			restrict: 'A',
			scope: { noResults: "@" },
			link: function( $scope, elem, attrs ){
				elem.addClass("ui");
				elem.addClass("search");
				elem.addClass("dropdown");

				$timeout(function(){
					elem.dropdown({
						match: "text",
						fullTextSearch: true,
						message: {
							noResults: $scope.noResults
						}
					});
				}, 1);
			}
		};
	}])

	.directive('popup', function(){
		return {
			scope: { on: '@', transition: '@' },
			restrict: 'A',
			link: function($scope, elem, attr, controller) {
				$(elem).popup({
					on: $scope.on,
					transition: $scope.transition
				});
			}
		};
	});
})();