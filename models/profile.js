const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  key: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
},
  array:{
    type: Array,
    Object:{
      type: Object,
      email: String,
      timestamp: String
    }
    
  }
  
});
exports.Profile = mongoose.model("Profile", profileSchema);
