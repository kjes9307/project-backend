const mongoose = require('mongoose');

const kanbanSchema = new mongoose.Schema({
    projectId: {
        type: String,
        cast: false
    },
    idle: [
      {
        type: String,
        cast: false
      }
    ],
    ongo: [
      {
        type: String,
        cast: false
      }
    ],
    done: [
      {
        type: String,
        cast: false
      }
    ]
  },{
    versionKey: false,
    collection: 'kanban'
});
const Kanban = mongoose.model('kanban', kanbanSchema);

module.exports = Kanban;