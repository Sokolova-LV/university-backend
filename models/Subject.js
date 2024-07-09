const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name: String,
    lecture_hours: Number,
    practical_hours: Number,
});

module.exports = mongoose.model('Subject', SubjectSchema);