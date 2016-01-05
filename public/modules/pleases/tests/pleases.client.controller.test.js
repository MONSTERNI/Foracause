'use strict';

(function() {
	// Pleases Controller Spec
	describe('Pleases Controller Tests', function() {
		// Initialize global variables
		var PleasesController,
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

			// Initialize the Pleases controller.
			PleasesController = $controller('PleasesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Please object fetched from XHR', inject(function(Pleases) {
			// Create sample Please using the Pleases service
			var samplePlease = new Pleases({
				name: 'New Please'
			});

			// Create a sample Pleases array that includes the new Please
			var samplePleases = [samplePlease];

			// Set GET response
			$httpBackend.expectGET('pleases').respond(samplePleases);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pleases).toEqualData(samplePleases);
		}));

		it('$scope.findOne() should create an array with one Please object fetched from XHR using a pleaseId URL parameter', inject(function(Pleases) {
			// Define a sample Please object
			var samplePlease = new Pleases({
				name: 'New Please'
			});

			// Set the URL parameter
			$stateParams.pleaseId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pleases\/([0-9a-fA-F]{24})$/).respond(samplePlease);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.please).toEqualData(samplePlease);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pleases) {
			// Create a sample Please object
			var samplePleasePostData = new Pleases({
				name: 'New Please'
			});

			// Create a sample Please response
			var samplePleaseResponse = new Pleases({
				_id: '525cf20451979dea2c000001',
				name: 'New Please'
			});

			// Fixture mock form input values
			scope.name = 'New Please';

			// Set POST response
			$httpBackend.expectPOST('pleases', samplePleasePostData).respond(samplePleaseResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Please was created
			expect($location.path()).toBe('/pleases/' + samplePleaseResponse._id);
		}));

		it('$scope.update() should update a valid Please', inject(function(Pleases) {
			// Define a sample Please put data
			var samplePleasePutData = new Pleases({
				_id: '525cf20451979dea2c000001',
				name: 'New Please'
			});

			// Mock Please in scope
			scope.please = samplePleasePutData;

			// Set PUT response
			$httpBackend.expectPUT(/pleases\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pleases/' + samplePleasePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pleaseId and remove the Please from the scope', inject(function(Pleases) {
			// Create new Please object
			var samplePlease = new Pleases({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pleases array and include the Please
			scope.pleases = [samplePlease];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pleases\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePlease);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pleases.length).toBe(0);
		}));
	});
}());