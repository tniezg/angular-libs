define([], function() {
	var baseController = [
		'$location', '$http', '$scope',
		function($location, $http, $scope) {
			$scope.activePanelIdentifier = '';

			$scope.showPanel = function(identifier) {
				$scope.activePanelIdentifier = identifier;
			};

			$scope.getPanelPath = function(identifier) {
				var viewBasePath = 'view';
				var viewPath;

				switch (identifier) {
					case '':
						viewPath = viewBasePath + '/directClick.html';
						break;
					default:
						viewPath = viewBasePath + '/' + $scope.activePanelIdentifier + '.html';
				}

				return viewPath;
			};

		}
	];

	return baseController;
});