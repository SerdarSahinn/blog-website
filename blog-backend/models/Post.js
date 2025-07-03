const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: String, default: 'Admin' },
  date: { type: Date, default: Date.now },
  category: { type: String },
  viewCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema); 