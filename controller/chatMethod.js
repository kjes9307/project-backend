const User = require("../model/userModel.js")
const Chat = require("../model/chatModel.js")
const {responseHandler} = require("../util/tool")

let chatAPI = {
    getMsg : async()=>{
        let UserList = await User.find();
        let users = {}
        UserList.forEach(x=>{
            users[x._id] = {username:x.name,header:x.photo}
        })
        let msg = await Chat.find({'$or':[{from: userid},{to: userid}]},filter).select("- password")
    },
    readMsg : async()=>{
        const to='' // 取得token id
        // const from = req.body.from;
        // await Chat.findByIdAndUpdate({});//標示已讀

    },
    sendMsg: async({req,res,next}) =>{
        console.log(req.user._id);
        let chat_id = [req.user._id,req.body.to].sort().join("_")
        let data ={
            from: req.user._id,
            to : req.body.to,
            content : req.body.content,
            read : req.body.read,
            chat_id
        }
        let resData = await Chat.create(data)
        responseHandler(res,resData,200)
    }
}


module.exports= chatAPI;