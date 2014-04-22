define([
	'angular',
	'controller/baseController',
	'angular_libs',
	'controller/directClickExampleController',
	'controller/localStorageExampleController'
], function(
	angular,
	baseController,
	angular_libs,
	directClickExampleController,
	localStorageExampleController
) {
	var module = angular.module('siteModule', ['tn.extensions']);

	// controllers
	module.controller('baseController', baseController);
	module.controller('directClickExampleController',
		directClickExampleController);
	module.controller('localStorageExampleController',
		localStorageExampleController);

	return module;
});