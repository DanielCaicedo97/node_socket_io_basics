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

io.on("connection", socket=>{
    //Emision básica
    socket.emit("cualquier_nombre", "ahora estas conectado");

    //Escuchando un evento del cliente
    socket.on("server", data =>(
        console.log(data)
    ));

    //Emision a  todos
    io.emit("a_todos", socket.id + "Se ha conectado");
});

httpServer.listen(PORT, ()=>{
    console.log(`Server listen in port: http://localhost:${PORT} ...`)
});