// angular.module('tn.extensions.actionPopup', [])
// 	.directive('tnActionPopup', [
// 		function() {
// 			'use strict';

// 			return {
// 				replace: true,
// 				transclude: true,
// 				templateUrl: 'template/actionPopup/actionPopupTemplate.html',
// 				scope: {
// 					visible: '=tnActionPopup'
// 				},
// 				controller: ['$scope', '$element', '$attrs', function($scope, $element,
// 					$attrs) {
// 					var elementObj = $element;
// 					var elementContent = angular.element('.action-popup-window-content');

// 					function onClick(event) {
// 						$scope.$apply(function() {

// 							if ($(event.target).is(elementObj)) {
// 								$scope.cancel();
// 							}
// 						});
// 					}

// 					$scope.cancel = function() {
// 						$scope.visible = false;
// 					};

// 					elementObj.on('click', onClick);

// 					$scope.$watch('visible', function(newValue) {

// 						if (newValue) {
// 							elementObj.addClass('popup-visible');
// 						} else {
// 							elementObj.removeClass('popup-visible');
// 						}
// 					});

// 					$scope.$on('$destroy', function() {
// 						elementObj.off('click', onClick);
// 					});
// 				}]
// 			}
// 		}
// 	]);



angular.module('tn.extensions.actionPopup', [])
	.factory('tnActionPopup', ['$rootScope', '$templateCache', '$templateRequest',
		'$compile',
		function($rootScope, $templateCache, $templateRequest, $compile) {
			'use strict';


			return {
				open: function(customOptions) {
					var defaults = {
						windowTemplate: 'template/tn/actionPopup/actionPopupTemplate.html',
						contentTemplate: null,
						scope: null,
						closeFunctionName: 'close'
					};
					var options = angular.element.extend({}, defaults, customOptions);
					var windowTemplateString = null;
					var contentTemplateString = null;
					var $windowReference = null;
					var $window;
					var windowScope;

					function close() {

						if ($window) {
							$window.remove();
						}

						if (windowScope) {
							windowScope.$destroy();
						}
					}

					if (options.contentTemplate) {
						$templateRequest(options.windowTemplate, true)
							.then(function(data) {
								windowTemplateString = data;
								return $templateRequest(options.contentTemplate, true);
							}, function() {
								windowTemplateString = '';
							})
							.then(function(data) {
								contentTemplateString = data;
							}, function() {
								contentTemplateString = '';
							})
							.then(function() {
								$window = angular.element(windowTemplateString);

								// create new scope for whole popup, inheriting from 
								// provided or $rootScope
								if (options.scope === null) {
									windowScope = $rootScope.$new(true);
								} else {
									windowScope = options.scope.$new();
								}

								windowScope[options.closeFunctionName] = function() {
									close();
								};

								windowScope.$on('$destroy', function() {
									$window.remove();
								});


								angular.element('body').append($window);

								$compile($window)(
									windowScope,
									null, {
										parentBoundTranscludeFn: function(scope, callback) {
											var $transcluded = angular.element(contentTemplateString);
											var transludedScope = windowScope.$new();

											$compile($transcluded)(transludedScope);

											callback($transcluded, transludedScope);
										}
									}
								);
							});
						return {
							close: close
						};
					}
				}
			};
		}
	]);