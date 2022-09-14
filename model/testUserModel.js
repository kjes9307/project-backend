const mongoose = require('mongoose');

const projSchema = new mongoose.Schema({
    id: {
      type: Number,
      cast: true
    },
    name: {
        type: String,
        cast: false
    },
    personId: {
        type: String,
        cast: true
    },
    organization:{
        type:String,
        cast:false
    },
    pin:{
      type:Boolean
    }
    
  },{
    versionKey: false,
});
// User
const Proj = mongoose.model('testUser', projSchema);

module.exports = Proj;