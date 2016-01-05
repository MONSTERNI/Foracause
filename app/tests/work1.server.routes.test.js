'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Work1 = mongoose.model('Work1'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, work1;

/**
 * Work1 routes tests
 */
describe('Work1 CRUD tests', function() {
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

		// Save a user to the test db and create new Work1
		user.save(function() {
			work1 = {
				name: 'Work1 Name'
			};

			done();
		});
	});

	it('should be able to save Work1 instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Work1
				agent.post('/work1s')
					.send(work1)
					.expect(200)
					.end(function(work1SaveErr, work1SaveRes) {
						// Handle Work1 save error
						if (work1SaveErr) done(work1SaveErr);

						// Get a list of Work1s
						agent.get('/work1s')
							.end(function(work1sGetErr, work1sGetRes) {
								// Handle Work1 save error
								if (work1sGetErr) done(work1sGetErr);

								// Get Work1s list
								var work1s = work1sGetRes.body;

								// Set assertions
								(work1s[0].user._id).should.equal(userId);
								(work1s[0].name).should.match('Work1 Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Work1 instance if not logged in', function(done) {
		agent.post('/work1s')
			.send(work1)
			.expect(401)
			.end(function(work1SaveErr, work1SaveRes) {
				// Call the assertion callback
				done(work1SaveErr);
			});
	});

	it('should not be able to save Work1 instance if no name is provided', function(done) {
		// Invalidate name field
		work1.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Work1
				agent.post('/work1s')
					.send(work1)
					.expect(400)
					.end(function(work1SaveErr, work1SaveRes) {
						// Set message assertion
						(work1SaveRes.body.message).should.match('Please fill Work1 name');
						
						// Handle Work1 save error
						done(work1SaveErr);
					});
			});
	});

	it('should be able to update Work1 instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Work1
				agent.post('/work1s')
					.send(work1)
					.expect(200)
					.end(function(work1SaveErr, work1SaveRes) {
						// Handle Work1 save error
						if (work1SaveErr) done(work1SaveErr);

						// Update Work1 name
						work1.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Work1
						agent.put('/work1s/' + work1SaveRes.body._id)
							.send(work1)
							.expect(200)
							.end(function(work1UpdateErr, work1UpdateRes) {
								// Handle Work1 update error
								if (work1UpdateErr) done(work1UpdateErr);

								// Set assertions
								(work1UpdateRes.body._id).should.equal(work1SaveRes.body._id);
								(work1UpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Work1s if not signed in', function(done) {
		// Create new Work1 model instance
		var work1Obj = new Work1(work1);

		// Save the Work1
		work1Obj.save(function() {
			// Request Work1s
			request(app).get('/work1s')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Work1 if not signed in', function(done) {
		// Create new Work1 model instance
		var work1Obj = new Work1(work1);

		// Save the Work1
		work1Obj.save(function() {
			request(app).get('/work1s/' + work1Obj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', work1.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Work1 instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Work1
				agent.post('/work1s')
					.send(work1)
					.expect(200)
					.end(function(work1SaveErr, work1SaveRes) {
						// Handle Work1 save error
						if (work1SaveErr) done(work1SaveErr);

						// Delete existing Work1
						agent.delete('/work1s/' + work1SaveRes.body._id)
							.send(work1)
							.expect(200)
							.end(function(work1DeleteErr, work1DeleteRes) {
								// Handle Work1 error error
								if (work1DeleteErr) done(work1DeleteErr);

								// Set assertions
								(work1DeleteRes.body._id).should.equal(work1SaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Work1 instance if not signed in', function(done) {
		// Set Work1 user 
		work1.user = user;

		// Create new Work1 model instance
		var work1Obj = new Work1(work1);

		// Save the Work1
		work1Obj.save(function() {
			// Try deleting Work1
			request(app).delete('/work1s/' + work1Obj._id)
			.expect(401)
			.end(function(work1DeleteErr, work1DeleteRes) {
				// Set message assertion
				(work1DeleteRes.body.message).should.match('User is not logged in');

				// Handle Work1 error error
				done(work1DeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Work1.remove().exec(function(){
				done();
			});	
		});
	});
});
