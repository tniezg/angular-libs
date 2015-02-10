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
						scope: null
					};
					var options = angular.element.extend({}, defaults, customOptions);
					var windowTemplateString = null;
					var contentTemplateString = null;
					var $windowReference = null;

					if (options.scope === null) {
						options.scope = $rootScope.$new(true);
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
								$compile(windowTemplateString)(
									options.scope,
									function($clone, scope) {
										angular.element('body').append($clone);
									}, {
										parentBoundTranscludeFn: function(scope, callback) {
											callback(angular.element(contentTemplateString), options.scope.$new());
										}
									}
								);
							});
						return {
							close: function() {

							}
						};
					}
				}
			};
		}
	]);