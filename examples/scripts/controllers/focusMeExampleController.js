(function(angular) {
	'use strict';

	angular.module('app').controller(
		'focusMeExampleController', [
			'$scope',
			function($scope) {
				$scope.focused = false;
			}
		]
	);
})(window.angular);