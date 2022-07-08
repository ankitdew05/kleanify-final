const mongoose = require('mongoose');
const sheduleSchema = new mongoose.Schema({
    id: String,
    isRunning: Boolean
});
exports.Shedular = mongoose.model('Shedular', sheduleSchema);
