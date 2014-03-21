define(['jquery'], function ($) {
	var directive = ['$parse', '$timeout',function ($parse, $timeout) {
			return {
				controller:function($scope, $element, $attrs){
					$scope.nodes=[];
					$scope.openNode;

					this.addNode=function(nodeScope){
						var that=this;

						$scope.nodes.push(nodeScope);

						nodeScope.$on('$destroy', function (event) {
							that.removeNode(nodeScope);
				    });

				    $scope.refresh(0);
					};

					$scope.refresh=function(delay){
						var currentNode,
							index=0;

						for(;currentNode=$scope.nodes[index];index++){

							if($scope.openNode===index){
								currentNode.open(delay);
							}else{
								currentNode.close(delay);
							}
						}
					};

					this.removeNode=function(nodeScope){
						var index = $scope.nodes.indexOf(nodeScope);

						if ( index !== -1 ) {
							$scope.nodes.splice($scope.nodes.indexOf(nodeScope), 1);
						}
					};

					$scope.$watch(function(newValue){
						return $parse($attrs.verticalAccordion)($scope);
					}, function(newValue){
						$scope.openNode=parseInt(newValue);
						$scope.refresh();
					});
				}
			};
		}];

	return directive;
});