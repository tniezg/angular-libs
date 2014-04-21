angular.module('tn.extensions.directClick', [])
	.directive('tnDirectClick', [
		'$parse',
		function($parse) {
			return {
				controller: function($scope, $element, $attrs) {
					$element.on('click', function(event) {
						$scope.$apply(function() {

							if (event.currentTarget === event.target) {
								$parse($attrs.tnDirectClick)($scope);
							}
						});
					});
				}
			}
		}
	]);