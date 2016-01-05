'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var jellos = require('../../app/controllers/jellos.server.controller');

	// Jellos Routes
	app.route('/jellos')
		.get(jellos.list)
		.post(users.requiresLogin, jellos.create);

	app.route('/jellos/:jelloId')
		.get(jellos.read)
		.put(users.requiresLogin, jellos.hasAuthorization, jellos.update)
		.delete(users.requiresLogin, jellos.hasAuthorization, jellos.delete);

	// Finish by binding the Jello middleware
	app.param('jelloId', jellos.jelloByID);
};
