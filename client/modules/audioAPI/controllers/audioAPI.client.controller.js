'use strict';

(function(){
angular.module('audioAPI').controller('AudioAPIController', AudioAPIController);

	AudioAPIController.$inject = ['$scope'];

function AudioAPIController($scope) {
	var self = this;
	self.resolution = 200;
	self.emitResolution = emitResolution;

	function emitResolution(){
		$scope.$broadcast('resolution', self.resolution)
	}

}
}).call();