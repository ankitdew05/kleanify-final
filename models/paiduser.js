const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate")
const paiduserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    // url : {
    //     type: String
    // },
    // apiKey: {
    //     type: String
    // },
    // credit :{
    //     type: Number,
    //     default: 50
    // },
    // status : {
    //     type: Boolean,
      
    //     default: true
    // },
    displayName:{
        type: String
    },
    password:{
        type: String
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
    },
    paidStatus: {
        type: Boolean,
        default: false

    }

});
paiduserSchema.plugin(findOrCreate);

exports.PaidUser = mongoose.model('PaidUser', paiduserSchema);
