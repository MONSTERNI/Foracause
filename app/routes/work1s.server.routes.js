'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var work1s = require('../../app/controllers/work1s.server.controller');

	// Work1s Routes
	app.route('/work1s')
		.get(work1s.list)
		.post(users.requiresLogin, work1s.create);

	app.route('/work1s/:work1Id')
		.get(work1s.read)
		.put(users.requiresLogin, work1s.hasAuthorization, work1s.update)
		.delete(users.requiresLogin, work1s.hasAuthorization, work1s.delete);

	// Finish by binding the Work1 middleware
	app.param('work1Id', work1s.work1ByID);
};
