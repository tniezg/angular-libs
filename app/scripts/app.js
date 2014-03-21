requirejs.config({
	baseUrl: './scripts',
	urlArgs: "bust=" + Math.random(),
	paths: {
		'jquery': '../bower_components/jquery/dist/jquery',
		'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
		'angular_libs': '../../build/tn-extensions-templates',
		'angular': '../bower_components/angular/angular',
		// plugin
		'text': '../bower_components/requirejs-text/text'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-ui-router': {
			deps: ['angular'],
			exports: 'angular'
		},
		'angular_libs': {
			deps: ['angular'],
			exports: 'angular'
		}
	}
});

requirejs(
	[
		'jquery',
		'module/siteModule',
		'angular'
	],
	function($, siteModule, angular) {
		$(function() {
			var htmlElement,
				inj;

			htmlElement = document.getElementsByTagName("html")[0];
			inj = angular.bootstrap(htmlElement, [siteModule.name]);
		});
	}
);