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
const Proj = mongoose.model('testUser', projSchema);

module.exports = Proj;