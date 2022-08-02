const mongoose = require('mongoose');

const projSchema = new mongoose.Schema({
    id: {
      type: Number,
      cast: true
    },
    name: {
        type: String,
        cast: false
    }
    
  },{
    versionKey: false,
});
// User
const Project = mongoose.model('project', projSchema);

module.exports = Project;