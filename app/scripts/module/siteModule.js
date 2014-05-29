define([
	'angular',
	'controller/baseController',
	'angular_libs',
	'controller/directClickExampleController',
	'controller/localStorageExampleController',
	'controller/persistentConfigExampleController',
	'controller/focusMeController'
], function(
	angular,
	baseController,
	angular_libs,
	directClickExampleController,
	localStorageExampleController,
	persistentConfigExampleController
) {
	var module = angular.module('siteModule', ['tn.extensions']);

	// controllers
	module.controller('baseController', baseController);
	module.controller('directClickExampleController',
		directClickExampleController);
	module.controller('localStorageExampleController',
		localStorageExampleController);
	module.controller('persistentConfigExampleController',
		persistentConfigExampleController);

	return module;
});