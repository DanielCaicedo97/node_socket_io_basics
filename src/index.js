// process.env.DEBUG = "*" // Para iniciar el DEBUG
process.env.DEBUG = "engine,socket.io:socket" // Para iniciar el DEBUG con filtro

import path from "path";
import express from "express";
import http from "http";
import {fileURLToPath} from "url"
import {Server as serverSocket} from "socket.io"
import {instrument} from "@socket.io/admin-ui"

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = http.createServer(app);
const io = new serverSocket(httpServer,{
    cors:{
        origin: ["https://admin.socket.io"],
        credentials: true,
    }
});

instrument(io,{
    auth:{
        type: "basic",
        username: "admin",
        password: "$2a$12$t3J6ftZXslA1FefmVn.Fn.p1dLx73.C31s.9ewz9IRFrI9daOH1Nm" // 1234 encriptada con bcrypt
    }
});

app.use(express.static(path.join(__dirname,"views")));

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", socket=>{
    
    socket.on("circle_position", position => {
        socket.broadcast.emit("move_circle", position);
    });


});

httpServer.listen(PORT, ()=>{
    console.log(`Server listen in port: http://localhost:${PORT} ...`)
});
