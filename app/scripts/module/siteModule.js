define([
	'angular',
	'controller/baseController',
	'angular_libs'
], function(
	angular,
	baseController,
	angular_libs
) {
	var module = angular.module('siteModule', [
		'tn.extensions'
	]);

	// controllers
	module.controller('baseController', baseController);

	return module;
});