define(['jquery','angular'], function ($, angular) {
	var getResizeHeight = ['$parse',function ($parse) {
			return {
				restrict: 'A',
				link:function(scope, element, attributes){
					var handleResize=function(){
						if(!attributes.getResizeHeight)
							return;

						var getter=$parse(attributes.getResizeHeight);
						if(!getter.assign)
							console.log('non-assignable expression');
						else{
							getter.assign(scope,$(element).height());
						}
					};

					scope.$watch('getResizeHeight',function(value){
		        handleResize();
		      });

					angular.element(window).bind('resize',function(){
						scope.$apply(function(){
							handleResize();
						});
					});

					scope.$on('$destroy',function(){
						angular.element(window).unbind('resize', handleResize);
					});
				}
			}
		}];

	return getResizeHeight;
});