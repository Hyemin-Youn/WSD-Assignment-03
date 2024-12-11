const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  company: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  link: { type: String, required: true },
});

module.exports = mongoose.model('Job', JobSchema);
