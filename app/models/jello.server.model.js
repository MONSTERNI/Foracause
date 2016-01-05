'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Jello Schema
 */
var JelloSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Jello name',
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

mongoose.model('Jello', JelloSchema);