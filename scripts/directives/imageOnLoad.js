angular.module('tn.extensions.imageOnLoad', [])
	.directive('tnImageOnLoad', ['$parse',
		function($parse) {
			'use strict';

			return {
				restrict: 'A',
				link: function(scope, element, attrs) {
					scope.$watch(function() {
						return attrs.imageOnLoadSrc;
					}, function(newValue) {
						var newImg;

						if (typeof newValue !== 'undefined') {
							newImg = new Image();

							newImg.onload = function() {
								scope.$apply(function() {
									$parse(attrs.imageOnLoad)(scope);

									element.attr('src', newValue);
								});
							};

							newImg.src = newValue;
						}
					});
				}
			};
		}
	]);