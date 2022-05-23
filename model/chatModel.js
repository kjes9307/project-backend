const mongoose = require('mongoose');
const chatSchema = mongoose.Schema({
    from:{type:String,required:true},
    to:{type:String,required:true},
    chat_id:{type:String,required:true},
    content:{type:String,required:true},
    read:{type:Boolean,required:true},
    create_time : {
        type: Date,
        default: Date.now,
        select: false
      }
})

const Chat = mongoose.model('chat',chatSchema);
module.exports = Chat;