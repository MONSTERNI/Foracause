'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pleases = require('../../app/controllers/pleases.server.controller');

	// Pleases Routes
	app.route('/pleases')
		.get(pleases.list)
		.post(users.requiresLogin, pleases.create);

	app.route('/pleases/:pleaseId')
		.get(pleases.read)
		.put(users.requiresLogin, pleases.hasAuthorization, pleases.update)
		.delete(users.requiresLogin, pleases.hasAuthorization, pleases.delete);

	// Finish by binding the Please middleware
	app.param('pleaseId', pleases.pleaseByID);
};
