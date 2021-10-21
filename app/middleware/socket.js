module.exports.init=(io)=>{ 
    console.log("소켓 시작");

    io.on('connection', (socket) => {
        console.log("연결성공");

        io.emit('test', JSON.stringify({msg:'Hello'}))
    })
}