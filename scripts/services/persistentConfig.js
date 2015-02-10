angular.module('tn.extensions.persistentConfig', [])
	.provider('tnPersistentConfig', function() {
		'use strict';

		var localStorageIdentifier = 'globalSettings';

		this.setKey = function(newKey) {
			localStorageIdentifier = newKey;
		};

		this.$get = ['$rootScope', 'tnLocalStorage', function($rootScope,
			tnLocalStorage) {

			var configString = tnLocalStorage.get(localStorageIdentifier);

			var config = configString ? JSON.parse(configString) : {};

			$rootScope.$watch(function() {
				return config;
			}, function() {
				tnLocalStorage.put(localStorageIdentifier, JSON.stringify(config));
			}, true);

			return config;
		}];
	});