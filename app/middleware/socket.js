module.exports.init=(io)=>{ 
    console.log("소켓 시작");
    io.on('connect', (socket) => {
        console.log("연결 성공" + socket.request);
        socket.emit("conneted", "연결성공");
    })
}