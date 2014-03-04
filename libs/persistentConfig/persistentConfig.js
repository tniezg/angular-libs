'use strict';

define([
	
],function(){

	return ['$rootScope', 'localStorage', function($rootScope, localStorage){
		var LOCAL_STORAGE_ID="globalSettings",
			configString=localStorage.get(LOCAL_STORAGE_ID);

		var config=configString ? JSON.parse(configString):{};

		$rootScope.$watch(function(){
			return config;
		}, function(){
			localStorage.put(LOCAL_STORAGE_ID, JSON.stringify(config));
		}, true);

		return config;
	}];
});