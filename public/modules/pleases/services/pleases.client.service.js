'use strict';

//Pleases service used to communicate Pleases REST endpoints
angular.module('pleases').factory('Pleases', ['$resource',
	function($resource) {
		return $resource('pleases/:pleaseId', { pleaseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);