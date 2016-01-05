'use strict';

//Work1s service used to communicate Work1s REST endpoints
angular.module('work1s').factory('Work1s', ['$resource',
	function($resource) {
		return $resource('work1s/:work1Id', { work1Id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);