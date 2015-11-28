'use strict';
(function(){
// Setting up route
angular.module('core').config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
	// Redirect to home view when route not found
	$urlRouterProvider.otherwise('/');

	// Home state routing
	$stateProvider.
		state('core', {
				//controller: "CoreController",
				//controllerAs: "core",
				abstract: true,
				templateUrl: "client/modules/core/views/core.client.view.html"
		});
}
}).call();