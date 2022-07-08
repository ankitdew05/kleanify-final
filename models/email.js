const mongoose = require('mongoose');
const emailSchema = new mongoose.Schema({
    array: Array,
    apiKey: String,
    creditUsed: String
});
exports.Email = mongoose.model('Email', emailSchema);
