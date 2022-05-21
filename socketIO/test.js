module.exports = (server) =>{
    
    const io = require('socket.io')(server,{
        cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => { 
        console.log("socket connected")
        // 接收數據
        socket.on('sendMsg',(data)=>{
            console.log("msg from clients",data)
            // 處理 & 發送
            io.emit('receiveMsg', data.name+"its from server")
            console.log("msg to client")
        })
    })

}
