(function(angular) {
	'use strict';

	angular.module('app').controller(
		'actionPopupExampleController', [
			'$scope', 'tnActionPopup',
			function($scope, tnActionPopup) {
				var popup = null;
				$scope.openPopup = function() {
					popup = tnActionPopup.open({
						contentTemplate: 'views/actionPopupExampleContent.html'
					});
				};
			}
		]
	);
})(window.angular);