'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Please = mongoose.model('Please'),
	_ = require('lodash');

/**
 * Create a Please
 */
exports.create = function(req, res) {
	var please = new Please(req.body);
	please.user = req.user;

	please.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(please);
		}
	});
};

/**
 * Show the current Please
 */
exports.read = function(req, res) {
	res.jsonp(req.please);
};

/**
 * Update a Please
 */
exports.update = function(req, res) {
	var please = req.please ;

	please = _.extend(please , req.body);

	please.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(please);
		}
	});
};

/**
 * Delete an Please
 */
exports.delete = function(req, res) {
	var please = req.please ;

	please.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(please);
		}
	});
};

/**
 * List of Pleases
 */
exports.list = function(req, res) { 
	Please.find().sort('-created').populate('user', 'displayName').exec(function(err, pleases) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pleases);
		}
	});
};

/**
 * Please middleware
 */
exports.pleaseByID = function(req, res, next, id) { 
	Please.findById(id).populate('user', 'displayName').exec(function(err, please) {
		if (err) return next(err);
		if (! please) return next(new Error('Failed to load Please ' + id));
		req.please = please ;
		next();
	});
};

/**
 * Please authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.please.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
