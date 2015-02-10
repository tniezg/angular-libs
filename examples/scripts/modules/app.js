angular.module('app', ['tn.extensions']).config(['tnPersistentConfigProvider',
	function(
		tnPersistentConfig) {

		tnPersistentConfig.setKey('tnPersistentConfigMap');
	}
]);