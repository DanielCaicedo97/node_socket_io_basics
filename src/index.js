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

// io.on("connection", socket => {

// });

// Name personalizados
const teachers = io.of("teachers");
const students = io.of("students");

teachers.on("connection", socket=>{
    console.log(socket.id + " se ha conectado a la sala de profes");
    socket.on("send_message", data =>{
        teachers.emit("message", data);
    });
});
students.on("connection", socket=>{
    console.log(socket.id + " se ha conectado a la sala de estudiantes");
    socket.on("send_message", data =>{
        students.emit("message", data);
    });
});

httpServer.listen(PORT, ()=>{
    console.log(`Server listen in port: http://localhost:${PORT} ...`)
});