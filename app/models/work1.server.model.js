'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Work1 Schema
 */
var Work1Schema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Work1 name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Work1', Work1Schema);