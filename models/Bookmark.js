const mongoose = require('mongoose');
const bookmarkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
});
module.exports = mongoose.model('Bookmark', bookmarkSchema);