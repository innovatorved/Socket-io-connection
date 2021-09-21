const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {  
    cors: {    
        origin: "*",     
    }
});

io.on("connection" , (socket) => {
    console.log("this is Socket: " , socket);
    console.log("socket active");

    socket.on("chat" , (payload)=>{
        console.log("this is payload " , payload);
        io.emit("chat" , payload);
    });
});

server.listen(5011 , ()=> {
    console.log("Server Started ......");
});