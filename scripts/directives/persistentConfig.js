'use strict';

angular.module('tn.extensions.persistentConfig', [])
	.factory('tnPersistentConfig', [
		'$rootScope', 'tnLocalStorage',
		function($rootScope, tnLocalStorage) {
			var LOCAL_STORAGE_ID = "globalSettings",
				configString = tnLocalStorage.get(LOCAL_STORAGE_ID);

			var config = configString ? JSON.parse(configString) : {};

			$rootScope.$watch(function() {
				return config;
			}, function() {
				tnLocalStorage.put(LOCAL_STORAGE_ID, JSON.stringify(config));
			}, true);

			return config;
		}
	]);