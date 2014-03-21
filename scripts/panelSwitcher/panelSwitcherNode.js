define(['jquery'], function($) {
	var directive = [

		function() {
			return {
				require: '^panelSwitcher',
				link: function postLink($scope, element, attributes,
					panelSwitcherController) {

					var elementObj = $(element);

					$scope.moveTo = function(distance, delay) {
						elementObj.stop(true).transition({
							y: distance
						}, delay);
					};

					panelSwitcherController.addNode($scope);
				}
			};
		}
	];

	return directive;
});