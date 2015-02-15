angular.module('tn.extensions.measureOnResize', [])
	.directive('tnMeasureOnResize', ['$parse',
		function($parse) {
			'use strict';

			return {
				link: function(scope, $element, attributes) {
					var $window = angular.element(window);

					function getSize() {
						var documentTop = $element.offset().top;
						var documentLeft = $element.offset().left;
						var resizeInformation = {
							width: $element.outerWidth(),
							height: $element.outerHeight(),
							top: documentTop,
							left: documentLeft,
							relativeTop: documentTop - $window.scrollTop(),
							relativeLeft: documentLeft - $window.scrollLeft()
						};

						return resizeInformation;
					}

					function notifyChange() {
						scope.$apply(function() {
							$parse(attributes.tnMeasureOnResize)(scope, getSize());
						});
					}

					function onScroll() {
						notifyChange();
					}

					function onResize() {
						notifyChange();
					}

					$window.on('resize', onResize);
					$window.on('scroll', onScroll);

					scope.$on('$destroy', function() {
						$window.off('resize', onResize);
						$window.off('scroll', onScroll);
					});

					setTimeout(function() {
						$parse(attributes.tnMeasureOnResizeInit)(scope, getSize());
					});
				}
			};
		}
	]);