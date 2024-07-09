const mongoose = require('mongoose');

const LecturerSchema = new mongoose.Schema({
    name: String,
    degree: String,
    position: String,
    experience: Number,
});

module.exports = mongoose.model('Lecturer', LecturerSchema);