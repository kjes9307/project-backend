const mongoose = require('mongoose');

const testUserSchema = new mongoose.Schema({
    id: {
      type: Number,
      cast: true
    },
    name: {
        type: String,
        cast: false
    },
    personId: {
        type: Number,
        cast: true
    },
    organization:{
        type:String,
        cast:false
    }
    
  },{
    versionKey: false,
});
// User
const testUser = mongoose.model('testUser', testUserSchema);

module.exports = testUser;