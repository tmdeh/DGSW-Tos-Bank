module.exports.init=(io)=>{ 
    console.log("소켓 시작");
    io.on('connection', (socket) => {
        console.log("연결 성공" + socket.request);

        socket.on('test', (index) => {
            console.log(index);
        })
    })
}