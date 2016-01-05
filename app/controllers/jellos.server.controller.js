'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Jello = mongoose.model('Jello'),
	_ = require('lodash');

/**
 * Create a Jello
 */
exports.create = function(req, res) {
	var jello = new Jello(req.body);
	jello.user = req.user;

	jello.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jello);
		}
	});
};

/**
 * Show the current Jello
 */
exports.read = function(req, res) {
	res.jsonp(req.jello);
};

/**
 * Update a Jello
 */
exports.update = function(req, res) {
	var jello = req.jello ;

	jello = _.extend(jello , req.body);

	jello.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jello);
		}
	});
};

/**
 * Delete an Jello
 */
exports.delete = function(req, res) {
	var jello = req.jello ;

	jello.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jello);
		}
	});
};

/**
 * List of Jellos
 */
exports.list = function(req, res) { 
	Jello.find().sort('-created').populate('user', 'displayName').exec(function(err, jellos) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jellos);
		}
	});
};

/**
 * Jello middleware
 */
exports.jelloByID = function(req, res, next, id) { 
	Jello.findById(id).populate('user', 'displayName').exec(function(err, jello) {
		if (err) return next(err);
		if (! jello) return next(new Error('Failed to load Jello ' + id));
		req.jello = jello ;
		next();
	});
};

/**
 * Jello authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.jello.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
