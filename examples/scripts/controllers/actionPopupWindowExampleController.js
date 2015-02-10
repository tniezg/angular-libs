(function(angular) {
	'use strict';

	angular.module('app').controller(
		'actionPopupWindowExampleController', [
			'$scope',
			function($scope) {
				$scope.values = ['tom', 'tommy', 'thomas'];
			}
		]
	);
})(window.angular);