'use strict';

// Jellos controller
angular.module('jellos').controller('JellosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jellos',
	function($scope, $stateParams, $location, Authentication, Jellos) {
		$scope.authentication = Authentication;

		// Create new Jello
		$scope.create = function() {
			// Create new Jello object
			var jello = new Jellos ({
				name: this.name
			});

			// Redirect after save
			jello.$save(function(response) {
				$location.path('jellos/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Jello
		$scope.remove = function(jello) {
			if ( jello ) { 
				jello.$remove();

				for (var i in $scope.jellos) {
					if ($scope.jellos [i] === jello) {
						$scope.jellos.splice(i, 1);
					}
				}
			} else {
				$scope.jello.$remove(function() {
					$location.path('jellos');
				});
			}
		};

		// Update existing Jello
		$scope.update = function() {
			var jello = $scope.jello;

			jello.$update(function() {
				$location.path('jellos/' + jello._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Jellos
		$scope.find = function() {
			$scope.jellos = Jellos.query();
		};

		// Find existing Jello
		$scope.findOne = function() {
			$scope.jello = Jellos.get({ 
				jelloId: $stateParams.jelloId
			});
		};
	}
]);