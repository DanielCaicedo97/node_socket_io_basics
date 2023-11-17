import path from "path";
import express from "express";
import http from "http";
import {fileURLToPath} from "url"
import {Server as serverSocket} from "socket.io"


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = http.createServer(app);
const io = new serverSocket(httpServer);
const socketsOnline = [];


app.use(express.static(path.join(__dirname,"views")));

const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", socket=>{

    socketsOnline.push(socket.id);

    //Emision básica
    socket.emit("cualquier_nombre", "ahora estas conectado");

    //Escuchando un evento del cliente
    socket.on("server", data =>(
        console.log(data)
    ));

    //Emision a  todos
    io.emit("a_todos", socket.id + "Se ha conectado");

    //Emision a uno solo 
    socket.on("last", data => {
        const lastSocket = socketsOnline.pop();
        io.to(lastSocket).emit("salute", data);
    });

    //Utilizando on, once, off
    // socket.emit("on", "Emitiendo varias veces");
    // socket.emit("on", "Emitiendo varias veces");

    // socket.emit("once", "emitiendo una vez");
    // socket.emit("once", "emitiendo una vez");


    // off para apagar un evento
    socket.emit("off", "emitiendo off");
    
    setTimeout(()=>{
        socket.emit("off", "emitiendo off");
    },3000)
    


});

httpServer.listen(PORT, ()=>{
    console.log(`Server listen in port: http://localhost:${PORT} ...`)
});