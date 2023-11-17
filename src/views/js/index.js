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

//Emitir un evento al servidor
const emitToLast = document.getElementById("emit-to-last");

emitToLast.addEventListener("click",()=>{
    socket.emit("last", "hola al último")
});


socket.on("salute", data =>{
    console.log(data);
});


// on, once, off

socket.on("on", ()=>{
    console.log("se emite varias veces");
});
socket.once("once", ()=>{
    console.log("se emite una sola vez");
});

const listener = () => {
    console.log("El evento se apaga");
};

socket.on("off", listener);

setTimeout(()=> {
    socket.off("off", listener)
}, 2000);