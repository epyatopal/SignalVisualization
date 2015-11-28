'use strict';

(function(){
// Setting up route
angular.module('audioAPI').config(config);

config.$inject=['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
	// Redirect to home view when route not found
	$urlRouterProvider.otherwise('/');

	// Home state routing
	$stateProvider.
	state('core.audio', {
		url: '/',
		views:{
			'main':{
				controller: "AudioAPIController",
				controllerAs: "audioAPI",
				templateUrl: "client/modules/audioAPI/views/audioAPI.client.view.html"
			}
		}
	});
}
}).call();