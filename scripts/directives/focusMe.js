angular.module('tn.extensions.focusMe', [])
	.directive('tnFocusMe', ['$timeout', '$parse',
		function($timeout, $parse) {
			'use strict';

			return {
				// optionally create a child scope that inherits from parent scope
				//scope: true,
				link: function(scope, element, attrs) {
					var model = $parse(attrs.tnFocusMe);

					scope.$watch(model, function(value) {

						if (value === true) {
							$timeout(function() {
								element[0].focus();
							});
						}
					});

					element.bind('blur', function() {
						scope.$apply(model.assign(scope, false));
					});
				}
			};
		}
	]);