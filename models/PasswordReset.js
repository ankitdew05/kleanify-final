const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasswordResetSchema= new Schema({
    userId: String,
    resetString: String,
    createdAt: Date,
    expiresAt: Date
});

exports.PasswordReset = mongoose.model('PasswordReset', PasswordResetSchema)