const mongoose = require('mongoose');

const taskCommentSchema = new mongoose.Schema(
  {
    taskComment: {
      type: String,
      required: [true, 'comment can not be empty!']
    },
    createTime: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      require: ['true', 'user must exist']
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'task',
      require: ['true', 'comment must belong to a post.']
    }
  },{
    versionKey: false,
    collection: "taskcomment"
    }
);
taskCommentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });

  next();
});
const taskComment = mongoose.model('Comment', taskCommentSchema);

module.exports = taskComment;