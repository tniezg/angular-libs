(function(BulkImageLoader) {
	'use strict';

	angular.module('tn.extensions.bulkImageLoader', [])
		.factory('tnBulkImageLoader', [
			'$rootScope',
			function($rootScope) {

				function BulkLoaderService() {
					this._bulkImageLoader = new BulkImageLoader();
					this._callbackMapping = [];
				}

				BulkLoaderService.prototype.on = function(eventName, callback) {
					var replacementCallback;

					if (!this._bulkImageLoader.isAlreadyAttached(eventName, callback)) {
						replacementCallback = this._generateMapping(eventName, callback);
						this._bulkImageLoader.on(eventName, replacementCallback);
					}
				};

				BulkLoaderService.prototype.one = function(eventName, callback) {
					var replacementCallback;

					if (!this._bulkImageLoader.isAlreadyAttached(eventName, callback)) {
						replacementCallback = this._generateMapping(eventName, callback);
						this._bulkImageLoader.one(eventName, replacementCallback);
					}
				};

				BulkLoaderService.prototype._generateMapping = function(eventName,
					callback) {

					var localCallbackReplacement = function() {
						var responseArguments = arguments;

						$rootScope.$apply(function() {
							callback.apply(null, responseArguments);
						});
					};

					this._callbackMapping.push({
						replacement: localCallbackReplacement,
						eventName: eventName,
						original: callback
					});

					return localCallbackReplacement;
				};

				BulkLoaderService.prototype.load = function(imageUrl) {
					this._bulkImageLoader.load(imageUrl);
				};

				BulkLoaderService.prototype.off = function(eventName, callback) {
					var mappingIndex = 0;
					var foundMapping = false;

					while (mappingIndex < this._callbackMapping.length && !foundMapping) {

						if (this._callbackMapping[mappingIndex].original === callback &&
							eventName === this._callbackMapping[mappingIndex].eventName) {

							this._bulkImageLoader.off(eventName, this._callbackMapping[
								mappingIndex].replacement);
							this._callbackMapping.splice(mappingIndex, 1);
							foundMapping = true;
						} else {
							mappingIndex++;
						}
					}
				};

				return new BulkLoaderService();
			}
		]);
})(window.com.gottocode.BulkImageLoader);