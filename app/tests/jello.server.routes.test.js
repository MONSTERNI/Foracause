'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Jello = mongoose.model('Jello'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, jello;

/**
 * Jello routes tests
 */
describe('Jello CRUD tests', function() {
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

		// Save a user to the test db and create new Jello
		user.save(function() {
			jello = {
				name: 'Jello Name'
			};

			done();
		});
	});

	it('should be able to save Jello instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Jello
				agent.post('/jellos')
					.send(jello)
					.expect(200)
					.end(function(jelloSaveErr, jelloSaveRes) {
						// Handle Jello save error
						if (jelloSaveErr) done(jelloSaveErr);

						// Get a list of Jellos
						agent.get('/jellos')
							.end(function(jellosGetErr, jellosGetRes) {
								// Handle Jello save error
								if (jellosGetErr) done(jellosGetErr);

								// Get Jellos list
								var jellos = jellosGetRes.body;

								// Set assertions
								(jellos[0].user._id).should.equal(userId);
								(jellos[0].name).should.match('Jello Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Jello instance if not logged in', function(done) {
		agent.post('/jellos')
			.send(jello)
			.expect(401)
			.end(function(jelloSaveErr, jelloSaveRes) {
				// Call the assertion callback
				done(jelloSaveErr);
			});
	});

	it('should not be able to save Jello instance if no name is provided', function(done) {
		// Invalidate name field
		jello.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Jello
				agent.post('/jellos')
					.send(jello)
					.expect(400)
					.end(function(jelloSaveErr, jelloSaveRes) {
						// Set message assertion
						(jelloSaveRes.body.message).should.match('Please fill Jello name');
						
						// Handle Jello save error
						done(jelloSaveErr);
					});
			});
	});

	it('should be able to update Jello instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Jello
				agent.post('/jellos')
					.send(jello)
					.expect(200)
					.end(function(jelloSaveErr, jelloSaveRes) {
						// Handle Jello save error
						if (jelloSaveErr) done(jelloSaveErr);

						// Update Jello name
						jello.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Jello
						agent.put('/jellos/' + jelloSaveRes.body._id)
							.send(jello)
							.expect(200)
							.end(function(jelloUpdateErr, jelloUpdateRes) {
								// Handle Jello update error
								if (jelloUpdateErr) done(jelloUpdateErr);

								// Set assertions
								(jelloUpdateRes.body._id).should.equal(jelloSaveRes.body._id);
								(jelloUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Jellos if not signed in', function(done) {
		// Create new Jello model instance
		var jelloObj = new Jello(jello);

		// Save the Jello
		jelloObj.save(function() {
			// Request Jellos
			request(app).get('/jellos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Jello if not signed in', function(done) {
		// Create new Jello model instance
		var jelloObj = new Jello(jello);

		// Save the Jello
		jelloObj.save(function() {
			request(app).get('/jellos/' + jelloObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', jello.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Jello instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Jello
				agent.post('/jellos')
					.send(jello)
					.expect(200)
					.end(function(jelloSaveErr, jelloSaveRes) {
						// Handle Jello save error
						if (jelloSaveErr) done(jelloSaveErr);

						// Delete existing Jello
						agent.delete('/jellos/' + jelloSaveRes.body._id)
							.send(jello)
							.expect(200)
							.end(function(jelloDeleteErr, jelloDeleteRes) {
								// Handle Jello error error
								if (jelloDeleteErr) done(jelloDeleteErr);

								// Set assertions
								(jelloDeleteRes.body._id).should.equal(jelloSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Jello instance if not signed in', function(done) {
		// Set Jello user 
		jello.user = user;

		// Create new Jello model instance
		var jelloObj = new Jello(jello);

		// Save the Jello
		jelloObj.save(function() {
			// Try deleting Jello
			request(app).delete('/jellos/' + jelloObj._id)
			.expect(401)
			.end(function(jelloDeleteErr, jelloDeleteRes) {
				// Set message assertion
				(jelloDeleteRes.body.message).should.match('User is not logged in');

				// Handle Jello error error
				done(jelloDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Jello.remove().exec();
		done();
	});
});