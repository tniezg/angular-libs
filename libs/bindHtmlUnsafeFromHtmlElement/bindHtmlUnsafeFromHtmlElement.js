define(['jquery','angular'], function ($, angular) {
	var bindHtmlUnsafeFromHtmlElement = [
		'$parse', '$compile',
		function ($parse, $compile) {
			return {
				replace:true,
				restrict: "A",
				compile: function compile(tElement, tAttrs, transclude) {
					return function postLink(scope, iElement, iAttrs){
						scope.$watch(
							function(scope) {
								return scope.$eval(iAttrs.bindHtmlUnsafeFromHtmlElement);
			        		},function(value){
					        	iElement.html(value);

					        	$compile(iElement.contents())(scope);
							}
						);
					}
				}
			}
		}];

	return bindHtmlUnsafeFromHtmlElement;
});