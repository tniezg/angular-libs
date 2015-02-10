angular.module('tn.extensions.directClick', [])
	.directive('tnDirectClick', [
		'$parse',
		function($parse) {
			'use strict';

			return {
				controller: ['$scope', '$element', '$attrs', function($scope, $element,
					$attrs) {

					$element.on('click', function(event) {
						$scope.$apply(function() {

							if (event.currentTarget === event.target) {
								$parse($attrs.tnDirectClick)($scope);
							}
						});
					});
				}]
			};
		}
	]);