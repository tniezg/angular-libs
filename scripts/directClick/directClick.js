angular.module('tn.extensions.directClick', [])
	.directive('tnDirectClick', [

		function() {
			return {
				controller: function($scope, $element, $attrs) {
					alert('direct click instantiated!');
				}
			}
		}
	]);