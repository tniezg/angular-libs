define(['jquery'], function ($) {
	var directive = ['$parse', '$timeout',function ($parse, $timeout) {
			return {
				require:'^verticalAccordion',
				transclude:true,
				template:'<div class="vertical-accordion-header">'+
						'{{getHeaderTitle()}}'+
					'</div>'+
					'<div class="vertical-accordion-content" ng-transclude></div>',
				link:function postLink($scope, element, attributes, 
						verticalAccordionController){

					var elementObj=$(element),
						contentElement=elementObj.
							find('.vertical-accordion-content'),
						title;

					$scope.open=function(delay){
						elementObj.addClass('vertical-accordion-active');
						contentElement.slideDown(delay);
					};

					$scope.close=function(delay){
						elementObj.removeClass('vertical-accordion-active');
						contentElement.slideUp(delay);
					};

					attributes.$observe('verticalAccordionNodeTitle', function(newValue){
						title=newValue;
					});

					$scope.getHeaderTitle=function(){
						return title;
					};

					verticalAccordionController.addNode($scope);
				}
			};
		}];

	return directive;
});