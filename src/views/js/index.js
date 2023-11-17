const socket = io();

function checkSocketstatus() {
    console.log("Estado del socket:", socket.connected);
}

///evento de conexion  
socket.on("connect", ()=>{
    console.log("El sokcet se ha conectado: ",socket.id);
    checkSocketstatus();
});

//evento de error de conexion 
socket.on("connect_error", ()=>{
    console.log("No se ha logrado conectar")
});

//evento de desconexion
socket.on("disconnect",()=>{
    console.log("El socket se ha desconectado:", socket.id);
    checkSocketstatus();
});

// Escuchar evento de intento de reconexion
socket.io.on("reconnect_attempt",()=>{
    console.log("Intentando reconectarse");
});

//Escuchar evento de reconexion 
socket.io.on("reconnect",()=>{
    console.log("Se ha realizado la reconexión");
})