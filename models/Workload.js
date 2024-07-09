const mongoose = require('mongoose');

const WorkloadSchema = new mongoose.Schema({
    lecturer_id: mongoose.Schema.Types.ObjectId,
    subject_id: mongoose.Schema.Types.ObjectId,
    group_number: String,
    type: String,
    year: Number,
});

module.exports = mongoose.model('Workload', WorkloadSchema);