import path from "path";
import express from "express";
import http from "http";
import {fileURLToPath} from "url"
import {Server as serverSocket} from "socket.io"


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = http.createServer(app);
const io = new serverSocket(httpServer);


app.use(express.static(path.join(__dirname,"views")));

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", socket => {
    socket.connectedRoom = "" ; // se crea la propiedad automaticamente

    //Cambiando de sala
    socket.on("connect_room", room => {
        socket.leave(socket.connectedRoom);
        
        switch (room) {
            case "room1":
                socket.join("room1");
                socket.connectedRoom = "room1"
                break;
            case "room2":
                socket.join("room2");
                socket.connectedRoom = "room2"
                break;
            case "room3":
                socket.join("room3");
                socket.connectedRoom = "room3"
                break;
        }
    });

    socket.on("message", message => {
        const room = socket.connectedRoom;
        io.to(room).emit("send_message", {
            message,
            room
        });
    });

});

httpServer.listen(PORT, ()=>{
    console.log(`Server listen in port: http://localhost:${PORT} ...`)
});