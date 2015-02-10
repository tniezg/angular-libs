(function(angular) {
	'use strict';

	angular.module('app').controller(
		'actionPopupExampleController', [
			'$scope', 'tnActionPopup',
			function($scope, tnActionPopup) {
				var popup = null;
				$scope.openPopup = function() {
					$scope.onClose = function() {
						console.log('#onClose');
					};

					popup = tnActionPopup.open({
						contentTemplate: 'views/actionPopupExampleContent.html',
						scope: $scope,
						onCloseExpression: 'onClose()'
					});
				};
			}
		]
	);
})(window.angular);