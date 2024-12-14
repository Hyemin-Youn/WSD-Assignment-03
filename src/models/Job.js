const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  postedAt: { type: String },
});

module.exports = mongoose.model('Job', jobSchema);
