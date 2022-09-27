const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    done: {
      type: Boolean,
      required: [true, 'list 類型不正確'],
      cast: true
    },
    name:{
      type: String,
      cast:false,
      required: [true,'List name必填!']
    },
  },{
    versionKey: false,
    collection: 'todo',
    timestamps: true
});
const TodoList = mongoose.model('todo', todoSchema);

module.exports = TodoList;