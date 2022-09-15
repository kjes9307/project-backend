const mongoose = require('mongoose');

const kanbanSchema = new mongoose.Schema({
    projectId: {
        type: String,
        cast: false
    },
    alltask: [
      {
        ref:"task",
        type: mongoose.Schema.ObjectId
      }
    ],
    createdAt :{
      type: Date,
      default: Date.now,
      select: false
    }
  },{
    versionKey: false,
    collection: 'kanban',
    // timestamps:true
});
const Kanban = mongoose.model('kanban', kanbanSchema);

module.exports = Kanban;