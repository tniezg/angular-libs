define(['jquery'], function($) {
	var directive = ['$parse',
		function($parse) {
			return {
				controller: ['$scope', '$element', '$attrs',
					function($scope, $element, $attrs) {
						$scope.nodes = [];
						$scope.openNode = 0;

						this.addNode = function(nodeScope) {
							var that = this;

							$scope.nodes.push(nodeScope);

							nodeScope.$on('$destroy', function(event) {
								that.removeNode(nodeScope);
							});

							$scope.refresh(0);
						};

						$scope.refresh = function(delay) {
							var currentNode,
								distance,
								index = 0,
								realDelay = (typeof delay !== 'undefined' ? delay : 200);

							for (; currentNode = $scope.nodes[index]; index++) {

								if ($scope.openNode == index) {
									distance = '0';
								} else if ($scope.openNode > index) {
									distance = '-100%';
								} else {
									distance = '100%';
								}
								currentNode.moveTo(distance, realDelay);
							}
						};

						this.removeNode = function(nodeScope) {
							var index = $scope.nodes.indexOf(nodeScope);

							if (index !== -1) {
								$scope.nodes.splice($scope.nodes.indexOf(nodeScope), 1);
							}
						};

						$scope.$watch(function(newValue) {
							return $parse($attrs.panelSwitcher)($scope);
						}, function(newValue) {
							$scope.openNode = parseInt(newValue);
							$scope.refresh();
						});
					}
				]
			};
		}
	];

	return directive;
});