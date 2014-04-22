define([], function() {
	var controller = [
		'tnLocalStorage', '$scope',
		function(tnLocalStorage, $scope) {
			$scope.localStorageRetrieve = null;

			$scope.put = function() {
				console.log('put');
				tnLocalStorage.put('name', 'Foo');
			};

			$scope.remove = function() {
				console.log('remove');
				tnLocalStorage.remove('name');
			};

			$scope.get = function() {
				console.log('get');
				$scope.localStorageRetrieve = tnLocalStorage.get('name');
			};
		}
	];

	return controller;
});