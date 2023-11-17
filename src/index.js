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
    // console.log("Clientes conectados:,", io.engine.clientsCount);
    // console.log("Id del socket conectados:",socket.id);
    
    //eventos en la capa io verificando la capa de transporte
    socket.conn.once("upgrade",()=>{
        console.log("hemos pasado de HTTP Long-Polling a: ", socket.conn.transport.name)
    });

    //eventos de desconexion 
    socket.on("disconnect", ()=>{
        console.log("El  socket ", socket.id, "se ha desconectado");
    })
});

httpServer.listen(PORT, ()=>{
    console.log(`Server listen in port: http://localhost:${PORT} ...`)
});