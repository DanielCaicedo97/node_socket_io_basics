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

// Middleware para determinar si esta autenticado
io.use((socket,next)=>{
    const token = socket.handshake.auth.token;
    if(token === 'token'){
        next();
    } else {
        const err = new Error("No puedes acceder");
        err.data = {
            details: "No se lograste ser autenticado"
        }
        
        next(err);
    }
});

io.on("connection", socket => {
    console.log(socket.id);

});

httpServer.listen(PORT, ()=>{
    console.log(`Server listen in port: http://localhost:${PORT} ...`)
});