'use strict';

(function() {
	// Work1s Controller Spec
	describe('Work1s Controller Tests', function() {
		// Initialize global variables
		var Work1sController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Work1s controller.
			Work1sController = $controller('Work1sController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Work1 object fetched from XHR', inject(function(Work1s) {
			// Create sample Work1 using the Work1s service
			var sampleWork1 = new Work1s({
				name: 'New Work1'
			});

			// Create a sample Work1s array that includes the new Work1
			var sampleWork1s = [sampleWork1];

			// Set GET response
			$httpBackend.expectGET('work1s').respond(sampleWork1s);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.work1s).toEqualData(sampleWork1s);
		}));

		it('$scope.findOne() should create an array with one Work1 object fetched from XHR using a work1Id URL parameter', inject(function(Work1s) {
			// Define a sample Work1 object
			var sampleWork1 = new Work1s({
				name: 'New Work1'
			});

			// Set the URL parameter
			$stateParams.work1Id = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/work1s\/([0-9a-fA-F]{24})$/).respond(sampleWork1);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.work1).toEqualData(sampleWork1);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Work1s) {
			// Create a sample Work1 object
			var sampleWork1PostData = new Work1s({
				name: 'New Work1'
			});

			// Create a sample Work1 response
			var sampleWork1Response = new Work1s({
				_id: '525cf20451979dea2c000001',
				name: 'New Work1'
			});

			// Fixture mock form input values
			scope.name = 'New Work1';

			// Set POST response
			$httpBackend.expectPOST('work1s', sampleWork1PostData).respond(sampleWork1Response);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Work1 was created
			expect($location.path()).toBe('/work1s/' + sampleWork1Response._id);
		}));

		it('$scope.update() should update a valid Work1', inject(function(Work1s) {
			// Define a sample Work1 put data
			var sampleWork1PutData = new Work1s({
				_id: '525cf20451979dea2c000001',
				name: 'New Work1'
			});

			// Mock Work1 in scope
			scope.work1 = sampleWork1PutData;

			// Set PUT response
			$httpBackend.expectPUT(/work1s\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/work1s/' + sampleWork1PutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid work1Id and remove the Work1 from the scope', inject(function(Work1s) {
			// Create new Work1 object
			var sampleWork1 = new Work1s({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Work1s array and include the Work1
			scope.work1s = [sampleWork1];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/work1s\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleWork1);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.work1s.length).toBe(0);
		}));
	});
}());