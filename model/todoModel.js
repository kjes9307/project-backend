const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    type: {
      type: String,
      enum:['idle','done'],
      required: [true, 'list 類型不正確'],
      cast: false
    },
    item:{
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