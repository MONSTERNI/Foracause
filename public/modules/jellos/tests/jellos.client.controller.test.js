'use strict';

(function() {
	// Jellos Controller Spec
	describe('Jellos Controller Tests', function() {
		// Initialize global variables
		var JellosController,
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

			// Initialize the Jellos controller.
			JellosController = $controller('JellosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Jello object fetched from XHR', inject(function(Jellos) {
			// Create sample Jello using the Jellos service
			var sampleJello = new Jellos({
				name: 'New Jello'
			});

			// Create a sample Jellos array that includes the new Jello
			var sampleJellos = [sampleJello];

			// Set GET response
			$httpBackend.expectGET('jellos').respond(sampleJellos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.jellos).toEqualData(sampleJellos);
		}));

		it('$scope.findOne() should create an array with one Jello object fetched from XHR using a jelloId URL parameter', inject(function(Jellos) {
			// Define a sample Jello object
			var sampleJello = new Jellos({
				name: 'New Jello'
			});

			// Set the URL parameter
			$stateParams.jelloId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/jellos\/([0-9a-fA-F]{24})$/).respond(sampleJello);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.jello).toEqualData(sampleJello);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Jellos) {
			// Create a sample Jello object
			var sampleJelloPostData = new Jellos({
				name: 'New Jello'
			});

			// Create a sample Jello response
			var sampleJelloResponse = new Jellos({
				_id: '525cf20451979dea2c000001',
				name: 'New Jello'
			});

			// Fixture mock form input values
			scope.name = 'New Jello';

			// Set POST response
			$httpBackend.expectPOST('jellos', sampleJelloPostData).respond(sampleJelloResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Jello was created
			expect($location.path()).toBe('/jellos/' + sampleJelloResponse._id);
		}));

		it('$scope.update() should update a valid Jello', inject(function(Jellos) {
			// Define a sample Jello put data
			var sampleJelloPutData = new Jellos({
				_id: '525cf20451979dea2c000001',
				name: 'New Jello'
			});

			// Mock Jello in scope
			scope.jello = sampleJelloPutData;

			// Set PUT response
			$httpBackend.expectPUT(/jellos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/jellos/' + sampleJelloPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid jelloId and remove the Jello from the scope', inject(function(Jellos) {
			// Create new Jello object
			var sampleJello = new Jellos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Jellos array and include the Jello
			scope.jellos = [sampleJello];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/jellos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleJello);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.jellos.length).toBe(0);
		}));
	});
}());