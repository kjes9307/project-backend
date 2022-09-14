const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    projectId: {
        type: String,
        cast: false
    },
    type:{
        type: String,
        cast: false
    },
    taskName:{
        type: String,
        required: [true, 'task Name必填'],
        cast: false
    }
  },{
    versionKey: false,
    collection: 'task'
});
const Task = mongoose.model('task', taskSchema);

module.exports = Task;