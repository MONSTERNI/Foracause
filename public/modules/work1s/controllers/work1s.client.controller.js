'use strict';

// Work1s controller
angular.module('work1s').controller('Work1sController', ['$scope', '$stateParams', '$location', 'Authentication', 'Work1s', 'TableSettings', 'Work1sForm',
	function($scope, $stateParams, $location, Authentication, Work1s, TableSettings, Work1sForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Work1s);
		$scope.work1 = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = Work1sForm.getFormFields(disabled);
		};


		// Create new Work1
		$scope.create = function() {
			var work1 = new Work1s($scope.work1);

			// Redirect after save
			work1.$save(function(response) {
				$location.path('work1s/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Work1
		$scope.remove = function(work1) {

			if ( work1 ) {
				work1 = Work1s.get({work1Id:work1._id}, function() {
					work1.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.work1.$remove(function() {
					$location.path('work1s');
				});
			}

		};

		// Update existing Work1
		$scope.update = function() {
			var work1 = $scope.work1;

			work1.$update(function() {
				$location.path('work1s/' + work1._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewWork1 = function() {
			$scope.work1 = Work1s.get( {work1Id: $stateParams.work1Id} );
			$scope.setFormFields(true);
		};

		$scope.toEditWork1 = function() {
			$scope.work1 = Work1s.get( {work1Id: $stateParams.work1Id} );
			$scope.setFormFields(false);
		};

	}

]);
