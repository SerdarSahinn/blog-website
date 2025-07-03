const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema); 