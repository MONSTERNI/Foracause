'use strict';

// Pleases controller
angular.module('pleases').controller('PleasesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pleases',
	function($scope, $stateParams, $location, Authentication, Pleases) {
		$scope.authentication = Authentication;

		// Create new Please
		$scope.create = function() {
			// Create new Please object
			var please = new Pleases ({
				name: this.name
			});

			// Redirect after save
			please.$save(function(response) {
				$location.path('pleases/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Please
		$scope.remove = function(please) {
			if ( please ) { 
				please.$remove();

				for (var i in $scope.pleases) {
					if ($scope.pleases [i] === please) {
						$scope.pleases.splice(i, 1);
					}
				}
			} else {
				$scope.please.$remove(function() {
					$location.path('pleases');
				});
			}
		};

		// Update existing Please
		$scope.update = function() {
			var please = $scope.please;

			please.$update(function() {
				$location.path('pleases/' + please._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pleases
		$scope.find = function() {
			$scope.pleases = Pleases.query();
		};

		// Find existing Please
		$scope.findOne = function() {
			$scope.please = Pleases.get({ 
				pleaseId: $stateParams.pleaseId
			});
		};
	}
]);