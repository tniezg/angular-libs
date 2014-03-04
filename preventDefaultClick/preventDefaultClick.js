define([],function(){
	var preventDefaultClick=[function(){
		return {
			restrict: 'A',
			link:function(scope, element, attributes){
				var handleClick=function(event){
					if (!event.ctrlKey && !event.metaKey){
						event.preventDefault();
						if(attributes.preventDefaultClick){
							scope.$apply(function() {
								scope.$eval(attributes.preventDefaultClick);
							});
							
						}
					}
				};

				element.bind('click',handleClick);

				scope.$on('$destroy',function(){
					element.unbind('click', handleClick);
				});	
			}
		};
	}];

	return preventDefaultClick;
});