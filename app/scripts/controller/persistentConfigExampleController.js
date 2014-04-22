define([], function() {
	var controller = [
		'tnPersistentConfig', '$scope',
		function(configObject, $scope) {
			$scope.options = {
				name: configObject.name,
				surname: configObject.surname,
				configObject: configObject
			};

			$scope.$watch('options.name', function(newValue) {
				configObject.name = newValue;
			});

			$scope.$watch('options.surname', function(newValue) {
				configObject.surname = newValue;
			});
		}
	];

	return controller;
});