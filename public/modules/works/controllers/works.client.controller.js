'use strict';

// Works controller
angular.module('works').controller('WorksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Works', 'TableSettings', 'WorksForm',
	function($scope, $stateParams, $location, Authentication, Works, TableSettings, WorksForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Works);
		$scope.work = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = WorksForm.getFormFields(disabled);
		};


		// Create new Work
		$scope.create = function() {
			var work = new Works($scope.work);

			// Redirect after save
			work.$save(function(response) {
				$location.path('works/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Work
		$scope.remove = function(work) {

			if ( work ) {
				work = Works.get({workId:work._id}, function() {
					work.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.work.$remove(function() {
					$location.path('works');
				});
			}

		};

		// Update existing Work
		$scope.update = function() {
			var work = $scope.work;

			work.$update(function() {
				$location.path('works/' + work._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewWork = function() {
			$scope.work = Works.get( {workId: $stateParams.workId} );
			$scope.setFormFields(true);
		};

		$scope.toEditWork = function() {
			$scope.work = Works.get( {workId: $stateParams.workId} );
			$scope.setFormFields(false);
		};

	}

]);
