const mongoose = require('mongoose');
const creditSchema = new mongoose.Schema({
    credit: Number,
});
exports.Credit = mongoose.model('Credit', creditSchema);
