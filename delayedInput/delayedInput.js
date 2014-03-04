define([], function () {
	var delayedInput = [
		'$parse', '$sniffer', '$timeout',
		function($parse, $sniffer, $timeout) {
			return {
				restrict: "A",
				require:'?ngModel',
				link:function(scope, element, attributes, ngModel) {
					var currentTimeout, delayedRead, read, getter;

					if(!ngModel) return;

					if ($sniffer.hasEvent('input')) {
	        	element.bind('input', function() {
	        		delayedRead();
		        });	
	        }else{
		        element.bind('keydown change', function() {
		          delayedRead();
		        });
		      }

		      delayedRead=function(){
		      	if(currentTimeout)
		      		$timeout.cancel(currentTimeout);
		      	currentTimeout=$timeout(read,attributes.propagationDelay || 1000);
		      };

		      read = function(){
		      	getter=$parse(attributes.delayedInput);
		      	if(getter){
		      		getter.assign(scope,element.val());
		      	}
		      };
				}
			}
		}];

	return delayedInput;
});