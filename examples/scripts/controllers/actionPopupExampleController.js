(function(angular) {
	'use strict';

	angular.module('app').controller(
		'actionPopupExampleController', [
			'$scope', 'tnActionPopup',
			function($scope, tnActionPopup) {
				var popup = null;

				$scope.popupOptions = {
					tooltip: {
						width: null,
						height: null,
						top: null,
						left: null
					}
				};

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

				$scope.openTooltip = function() {
					popup = tnActionPopup.open({
						windowTemplate: 'template/tn/actionPopup/actionTooltipTemplate.html',
						contentTemplate: 'views/actionPopupExampleContent.html',
						scope: $scope
					});
				};

				$scope.onButtonResize = function(width, height, relativeTop, relativeLeft) {
					$scope.popupOptions.tooltip.width = width;
					$scope.popupOptions.tooltip.height = height;
					$scope.popupOptions.tooltip.top = relativeTop;
					$scope.popupOptions.tooltip.left = relativeLeft;
				};
			}
		]
	);
})(window.angular);