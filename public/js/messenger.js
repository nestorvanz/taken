(function(){
	angular.module('messenger', [])
	.factory('message', function( $rootScope, $timeout ){
		$rootScope.__confirm = {};
		return {
			confirm: {
				close: function(){
					$('.ui.confirm.modal')
						.modal('hide');
				},
				description: function( description ){
					$rootScope.__confirm.description = description;
					return this;
				},
				icon: function( icon ){
					$rootScope.__confirm.icon = icon;
					return this;
				},
				next: function( next ){
					$rootScope.__confirm.next = next;
					return this;
				},
				open: function( icon, title, description, next ){
					this.icon(icon);
					this.title(title);
					this.description(description);
					this.next(next);
					this.show();
				},
				show: function(){
					$rootScope.__confirm.close = this.close;
					var config = {
						closable: false
					};

					$timeout(function(){
						$('.ui.confirm.modal')
							.modal(config)
							.modal('show');
					}, 1);
				},
				title: function( title ){
					$rootScope.__confirm.title = title;
					return this;
				}
			},
			error: function( title, message ){
				if( !message ){
					message = title;
					title = 'Error :(!';
				}
				this.push( 'error', title, message );
			},
			push: function( type, title, message ){
				var time = message.length *100,
					message = {
						type: type,
						title: title,
						message: message
					};
				$timeout.cancel($rootScope.__messageTimer);
				
				$rootScope.__message = message;
				$rootScope.__messageTimer = $timeout(function(){
					$('message .message').transition('fade up');
				}, time);

				if( !$('message .message').is(':visible') ){
					$('message .message').transition('fade up');
				}
			},
			success: function( title, message ){
				if( !message ){
					message = title;
					title = 'Success :D!';
				}
				this.push( 'success', title, message );
			},
			warning: function( title, message ){
				if( !message ){
					message = title;
					title = 'Warning >.<!';
				}
				this.push('warning', title, message);
			}
		};
	}).directive('messages', function( $rootScope, $timeout ){
		return {
			restrict: 'E',
			template:
				'<style>message #message{ max-width: 350px; padding: 0 10px; position: fixed; bottom: 10px; right: 10px; width: 100%; z-index: 1001; }</style>'+
				'<div id="message">'+
					'<div class="ui message {{__message.type}} hidden">'+
						'<i class="close icon" ng-click="close()"></i>'+
						'<div class="header">{{__message.title}}</div>'+
						'<p>{{__message.message}}</p>'+
					'</div>'+
				'</div>'+
				'<div class="ui basic confirm modal">'+
					'<div class="ui icon header">'+
						'<i class="{{__confirm.icon}} icon"></i>'+
						'{{__confirm.title}}'+
					'</div>'+
					'<div class="content" align="center">'+
						'<p>{{__confirm.description}}</p>'+
					'</div>'+
					'<div class="actions">'+
						'<div ng-click="__confirm.close()" class="ui red inverted button">'+
							'<i class="remove icon"></i> No'+
						'</div>'+
						'<div ng-click="__confirm.next()" class="ui green inverted button">'+
							'<i class="checkmark icon"></i>Yes'+
						'</div>'+
					'</div>'+
				'</div>',
			link: function( $scope, elem, attr, controller ){
				$scope.close = function(){
					$timeout.cancel($rootScope.__messageTimer);
					$(elem).find('.message').transition('fade up');
				};
			}
		};
	});
})();