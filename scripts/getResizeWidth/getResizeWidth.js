define(['jquery','angular'], function ($, angular) {
	var getResizeWidth = ['$parse',function ($parse) {
			return {
				restrict: 'A',
				link:function(scope, element, attributes){
					var handleResize=function(){
						if(!attributes.getResizeWidth)
							return;

						var getter=$parse(attributes.getResizeWidth);
						if(!getter.assign)
							console.log('non-assignable expression');
						else{
							getter.assign(scope,$(element).width());
						}
					};

					scope.$watch('getResizeWidth',function(value){
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

	return getResizeWidth;
});