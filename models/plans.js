const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    subscriber: Number,
    yearlyPricing: Number,
    monthlyPrice: Number,
    features: Array
});

exports.Plan = mongoose.model('Plan', planSchema);
