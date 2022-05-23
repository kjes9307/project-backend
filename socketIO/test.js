const Chat = require("../model/chatModel.js")
const history = {msg: "i want eat"}
module.exports = (server) =>{
    
    const io = require('socket.io')(server,{
        cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => { 
        console.log("socket服務已經開啟")
        // 接收數據
        socket.on('clientMsg',(data)=>{
            console.log("msg from clients",data)
            socket.emit('serverMsg',data+"123")
        })
        socket.emit("history",history.msg)
    })

}
