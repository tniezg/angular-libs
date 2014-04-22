angular.module('tn.extensions.localStorage', [])
	.factory('tnLocalStorage', [

		function() {
			var localRef = window.localStorage;

			function put(key, value) {
				localRef[key] = value;
			}

			function get(key) {
				return localRef[key];
			}

			function remove(key) {
				var value = undefined;

				value = localRef[key];
				localRef.removeItem(key);

				return value;
			}

			return {
				put: put,
				get: get,
				remove: remove
			};
		}
	]);