(function(angular) {
	'use strict';

	angular.module('app').controller(
		'measureSizeExampleController', [
			'$scope',
			function($scope) {
				$scope.measureOptions = {
					width: null,
					height: null,
					top: null,
					left: null,
					relativeTop: null,
					relativeLeft: null
				};

				$scope.onButtonResize = function(width, height, top, left, relativeTop,
					relativeLeft) {
					$scope.measureOptions.width = width;
					$scope.measureOptions.height = height;
					$scope.measureOptions.top = top;
					$scope.measureOptions.left = left;
					$scope.measureOptions.relativeTop = relativeTop;
					$scope.measureOptions.relativeLeft = relativeLeft;
				};
			}
		]
	);
})(window.angular);