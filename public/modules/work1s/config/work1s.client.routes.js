'use strict';

//Setting up route
angular.module('work1s').config(['$stateProvider',
	function($stateProvider) {
		// Work1s state routing
		$stateProvider.
		state('listWork1s', {
			url: '/work1s',
			templateUrl: 'modules/work1s/views/list-work1s.client.view.html'
		}).
		state('createWork1', {
			url: '/work1s/create',
			templateUrl: 'modules/work1s/views/create-work1.client.view.html'
		}).
		state('viewWork1', {
			url: '/work1s/:work1Id',
			templateUrl: 'modules/work1s/views/view-work1.client.view.html'
		}).
		state('editWork1', {
			url: '/work1s/:work1Id/edit',
			templateUrl: 'modules/work1s/views/edit-work1.client.view.html'
		});
	}
]);