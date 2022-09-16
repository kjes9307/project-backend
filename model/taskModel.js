const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    projectId: {
        type: String,
        cast: false,
        required: [true, 'project id必填'],
    },
    type:{
        type: String,
        cast: false
    },
    taskName:{
        type: String,
        required: [true, 'task Name必填'],
        cast: false
    },
    status:{
        type:String,
        required: [true, '狀態必填'],
        enum: ['ongoing', 'idle', 'done'],
        cast: false
    }
  },{
    versionKey: false,
    collection: 'task'
});
const Task = mongoose.model('task', taskSchema);

module.exports = Task;