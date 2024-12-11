const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String },
    location: { type: String },
    date: { type: String },
    link: { type: String, required: true },
});

// 기존에 정의된 모델이 있는지 확인하고, 없으면 정의
module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);
