define([
	'angular',
	'controller/baseController',
	'angular_libs',
	'controller/directClickExample'
], function(
	angular,
	baseController,
	angular_libs,
	directClickExample
) {
	var module = angular.module('siteModule', ['tn.extensions']);

	// controllers
	module.controller('baseController', baseController);
	module.controller('directClickExample', directClickExample);

	return module;
});