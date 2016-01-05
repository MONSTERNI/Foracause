'use strict';

//Setting up route
angular.module('jellos').config(['$stateProvider',
	function($stateProvider) {
		// Jellos state routing
		$stateProvider.
		state('listJellos', {
			url: '/jellos',
			templateUrl: 'modules/jellos/views/list-jellos.client.view.html'
		}).
		state('createJello', {
			url: '/jellos/create',
			templateUrl: 'modules/jellos/views/create-jello.client.view.html'
		}).
		state('viewJello', {
			url: '/jellos/:jelloId',
			templateUrl: 'modules/jellos/views/view-jello.client.view.html'
		}).
		state('editJello', {
			url: '/jellos/:jelloId/edit',
			templateUrl: 'modules/jellos/views/edit-jello.client.view.html'
		});
	}
]);