const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'project id必填'],
    },
    receiver :{
        type: mongoose.Schema.ObjectId,
        required: [true, '邀請人必填'],
    },
    status :{
        type:String,
        required: [true,'狀態必填']
    }
    
  },{
    versionKey: false,
    collection: 'invitation',
});

const Invite = mongoose.model('invitation', inviteSchema);

module.exports = Invite;