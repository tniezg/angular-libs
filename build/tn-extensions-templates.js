angular.module('tn.extensions', [
	'tn.extensions.templates',
	'tn.extensions.actionPopup'
]);
angular.module('tn.extensions.actionPopup', [])
	.directive('tnActionPopup', ['$parse',
		function($parse) {
			return {
				replace: true,
				transclude: true,
				templateUrl: 'template/actionPopup/actionPopupTemplate.html',
				scope: {
					visible: '=tnActionPopup'
				},
				controller: function($scope, $element, $attrs) {
					var elementObj = $($element),
						elementContent = $('.action-popup-window-content');

					function onClick(event) {
						$scope.$apply(function() {

							if ($(event.target).is(elementObj)) {
								$scope.cancel();
							}
						});
					}

					$scope.cancel = function() {
						$scope.visible = false;
					};

					elementObj.on('click', onClick);

					$scope.$watch('visible', function(newValue) {

						if (newValue) {
							elementObj.addClass('popup-visible');
						} else {
							elementObj.removeClass('popup-visible');
						}
					});

					$scope.$on('$destroy', function() {
						elementObj.off('click', onClick);
					});
				}
			}
		}
	]);
angular.module('tn.extensions.templates', ['template/actionPopup/actionPopupTemplate.html']);

angular.module("template/actionPopup/actionPopupTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/actionPopup/actionPopupTemplate.html",
    "<div class=\"tn-action-popup-window\">\n" +
    "    <div class=\"tn-action-popup-window-content\" ng-transclude></div>\n" +
    "</div>");
}]);
