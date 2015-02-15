(function(angular) {
	'use strict';

	angular.module('app').controller(
		'bulkImageLoaderExampleController', [
			'tnBulkImageLoader', '$scope',
			function(tnBulkImageLoader, $scope) {
				function onImageLoad(information) {

					if ($scope.imageLoaderOptions.loadedUrls.indexOf(information.url) === -
						1) {
						$scope.imageLoaderOptions.loadedUrls.push(information.url);
					}
				}

				function onImageFail(information) {

				}

				function onAllLoaded() {

				}

				$scope.imageLoaderOptions = {
					imageUrls: [
						'images/bulk-loader-1.jpg',
						'images/bulk-loader-2.jpg'
					],
					loadedUrls: []
				};

				$scope.downloadImages = function() {
					tnBulkImageLoader.load($scope.imageLoaderOptions.imageUrls);

					tnBulkImageLoader.on('imageLoadDone', onImageLoad);
					tnBulkImageLoader.on('imageLoadFail', onImageFail);
					tnBulkImageLoader.on('allImagesLoad', onAllLoaded);
				};
			}
		]
	);
})(window.angular);