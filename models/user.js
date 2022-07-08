const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate")
const userSchema = new mongoose.Schema({
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
    googleId: {
        type: String
    },
    token: {
        type: String
    }

});
userSchema.plugin(findOrCreate);

exports.User = mongoose.model('User', userSchema);
