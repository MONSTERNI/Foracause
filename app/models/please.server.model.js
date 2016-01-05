'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Please Schema
 */
var PleaseSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Please name',
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

mongoose.model('Please', PleaseSchema);