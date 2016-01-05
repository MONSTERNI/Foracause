'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Please = mongoose.model('Please'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, please;

/**
 * Please routes tests
 */
describe('Please CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Please
		user.save(function() {
			please = {
				name: 'Please Name'
			};

			done();
		});
	});

	it('should be able to save Please instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Please
				agent.post('/pleases')
					.send(please)
					.expect(200)
					.end(function(pleaseSaveErr, pleaseSaveRes) {
						// Handle Please save error
						if (pleaseSaveErr) done(pleaseSaveErr);

						// Get a list of Pleases
						agent.get('/pleases')
							.end(function(pleasesGetErr, pleasesGetRes) {
								// Handle Please save error
								if (pleasesGetErr) done(pleasesGetErr);

								// Get Pleases list
								var pleases = pleasesGetRes.body;

								// Set assertions
								(pleases[0].user._id).should.equal(userId);
								(pleases[0].name).should.match('Please Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Please instance if not logged in', function(done) {
		agent.post('/pleases')
			.send(please)
			.expect(401)
			.end(function(pleaseSaveErr, pleaseSaveRes) {
				// Call the assertion callback
				done(pleaseSaveErr);
			});
	});

	it('should not be able to save Please instance if no name is provided', function(done) {
		// Invalidate name field
		please.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Please
				agent.post('/pleases')
					.send(please)
					.expect(400)
					.end(function(pleaseSaveErr, pleaseSaveRes) {
						// Set message assertion
						(pleaseSaveRes.body.message).should.match('Please fill Please name');
						
						// Handle Please save error
						done(pleaseSaveErr);
					});
			});
	});

	it('should be able to update Please instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Please
				agent.post('/pleases')
					.send(please)
					.expect(200)
					.end(function(pleaseSaveErr, pleaseSaveRes) {
						// Handle Please save error
						if (pleaseSaveErr) done(pleaseSaveErr);

						// Update Please name
						please.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Please
						agent.put('/pleases/' + pleaseSaveRes.body._id)
							.send(please)
							.expect(200)
							.end(function(pleaseUpdateErr, pleaseUpdateRes) {
								// Handle Please update error
								if (pleaseUpdateErr) done(pleaseUpdateErr);

								// Set assertions
								(pleaseUpdateRes.body._id).should.equal(pleaseSaveRes.body._id);
								(pleaseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Pleases if not signed in', function(done) {
		// Create new Please model instance
		var pleaseObj = new Please(please);

		// Save the Please
		pleaseObj.save(function() {
			// Request Pleases
			request(app).get('/pleases')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Please if not signed in', function(done) {
		// Create new Please model instance
		var pleaseObj = new Please(please);

		// Save the Please
		pleaseObj.save(function() {
			request(app).get('/pleases/' + pleaseObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', please.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Please instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Please
				agent.post('/pleases')
					.send(please)
					.expect(200)
					.end(function(pleaseSaveErr, pleaseSaveRes) {
						// Handle Please save error
						if (pleaseSaveErr) done(pleaseSaveErr);

						// Delete existing Please
						agent.delete('/pleases/' + pleaseSaveRes.body._id)
							.send(please)
							.expect(200)
							.end(function(pleaseDeleteErr, pleaseDeleteRes) {
								// Handle Please error error
								if (pleaseDeleteErr) done(pleaseDeleteErr);

								// Set assertions
								(pleaseDeleteRes.body._id).should.equal(pleaseSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Please instance if not signed in', function(done) {
		// Set Please user 
		please.user = user;

		// Create new Please model instance
		var pleaseObj = new Please(please);

		// Save the Please
		pleaseObj.save(function() {
			// Try deleting Please
			request(app).delete('/pleases/' + pleaseObj._id)
			.expect(401)
			.end(function(pleaseDeleteErr, pleaseDeleteRes) {
				// Set message assertion
				(pleaseDeleteRes.body.message).should.match('User is not logged in');

				// Handle Please error error
				done(pleaseDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Please.remove().exec();
		done();
	});
});