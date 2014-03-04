define([
	'timeline/Supervisor',
	'timeline/StateInstantiator'
], function(Supervisor, StateInstantiator) {
	var factory = ['$rootScope', 'resourceTaker',
		function($rootScope, resourceTaker) {

			var DigestSupervisor = Supervisor.extend({
				scope: null,
				init: function(_taker, _instantiator, $rootScope) {
					this.scope = $rootScope;
					this._super(_taker, _instantiator);
				},
				notify: function( /*args*/ ) {
					var args = arguments;

					if (this.scope.$$phase != "$apply" && this.scope.$$phase != "$digest") {
						this.scope.$apply(function() {
							this._super.apply(this, args);
						}.bind(this));
					} else {
						this._super.apply(this, args);
					}
				}
			});

			return new DigestSupervisor(resourceTaker, new StateInstantiator(),
				$rootScope);
		}
	];

	return factory;
});