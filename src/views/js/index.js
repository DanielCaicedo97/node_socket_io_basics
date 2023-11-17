const socket = io();

// recibiendo el evento llamado en el server "cualquier_nombre"
socket.on("cualquier_nombre", data =>{
    console.log(data);
    const text = document.getElementById("text"); // esto se puede eliminar
    text.textContent = data;
})

socket.on("a_todos",data =>{
    console.log(data)
});


//Emitir un evento al servidor
const emitToServer = document.getElementById("emit-to-server");

emitToServer.addEventListener("click",()=>{
    socket.emit("server", "hola servidor")
});