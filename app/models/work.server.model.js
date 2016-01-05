'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Work Schema
 */
var WorkSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Work name',
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

mongoose.model('Work', WorkSchema);