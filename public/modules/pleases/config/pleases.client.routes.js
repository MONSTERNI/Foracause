'use strict';

//Setting up route
angular.module('pleases').config(['$stateProvider',
	function($stateProvider) {
		// Pleases state routing
		$stateProvider.
		state('listPleases', {
			url: '/pleases',
			templateUrl: 'modules/pleases/views/list-pleases.client.view.html'
		}).
		state('createPlease', {
			url: '/pleases/create',
			templateUrl: 'modules/pleases/views/create-please.client.view.html'
		}).
		state('viewPlease', {
			url: '/pleases/:pleaseId',
			templateUrl: 'modules/pleases/views/view-please.client.view.html'
		}).
		state('editPlease', {
			url: '/pleases/:pleaseId/edit',
			templateUrl: 'modules/pleases/views/edit-please.client.view.html'
		});
	}
]);