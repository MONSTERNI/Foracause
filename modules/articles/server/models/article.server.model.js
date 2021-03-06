'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  problem: { 
    type:String,
    default:'',
    trim:true,
    required:'Title cannot be blank'
  },
  created: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    default: '',
    trim:true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Article', ArticleSchema);
