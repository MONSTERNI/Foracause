'use strict';

//Jellos service used to communicate Jellos REST endpoints
angular.module('jellos').factory('Jellos', ['$resource',
	function($resource) {
		return $resource('jellos/:jelloId', { jelloId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);