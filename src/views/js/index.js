const socket = io();

const send = document.getElementById("send");
const disconnect = document.getElementById("disconnect");
const reconnect = document.getElementById("reconnect");


send.addEventListener("click", ()=>{
    if(socket.connected){
        socket.emit("is_connected", "Esta conectado!");
    }
});

disconnect.addEventListener("click", ()=>{
    socket.disconnect();
});
reconnect.addEventListener("click", ()=>{
    socket.connect();
});