'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Work1 = mongoose.model('Work1'),
	_ = require('lodash');

/**
 * Create a Work1
 */
exports.create = function(req, res) {
	var work1 = new Work1(req.body);
	work1.user = req.user;

	work1.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(work1);
		}
	});
};

/**
 * Show the current Work1
 */
exports.read = function(req, res) {
	res.jsonp(req.work1);
};

/**
 * Update a Work1
 */
exports.update = function(req, res) {
	var work1 = req.work1 ;

	work1 = _.extend(work1 , req.body);

	work1.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(work1);
		}
	});
};

/**
 * Delete an Work1
 */
exports.delete = function(req, res) {
	var work1 = req.work1 ;

	work1.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(work1);
		}
	});
};

/**
 * List of Work1s
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 5;
	var page = req.query.page || 1;


	var filter = {
		filters : {
			mandatory : {
				contains: req.query.filter
			}
		}
	};

	var pagination = {
		start: (page - 1) * count,
		count: count
	};

	if (req.query.sorting) {
		var sortKey = Object.keys(req.query.sorting)[0];
		var sortValue = req.query.sorting[sortKey];
		sortObject[sortValue] = sortKey;
	}
	else {
		sortObject.desc = '_id';
	}

	sort = {
		sort: sortObject
	};


	Work1
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, work1s){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(work1s);
			}
		});

};

/**
 * Work1 middleware
 */
exports.work1ByID = function(req, res, next, id) {
	Work1.findById(id).populate('user', 'displayName').exec(function(err, work1) {
		if (err) return next(err);
		if (! work1) return next(new Error('Failed to load Work1 ' + id));
		req.work1 = work1 ;
		next();
	});
};

/**
 * Work1 authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.work1.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
