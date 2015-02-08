(function(angular, console) {
	'use strict';

	angular.module('app').controller(
		'localStorageExampleController', [
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
		]
	);
})(window.angular, window.console);