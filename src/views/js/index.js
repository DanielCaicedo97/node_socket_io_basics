const socket = io();

// Seleccionar los botones para poderse conectar a la salas
const connectRoom1 = document.getElementById("connectRoom1");
const connectRoom2 = document.getElementById("connectRoom2");
const connectRoom3 = document.getElementById("connectRoom3");

// Eventos para que al hacer click se conecte a las salas
connectRoom1.addEventListener("click", ()=>{
    socket.emit("connect_room","room1");

});

connectRoom2.addEventListener("click", ()=>{
    socket.emit("connect_room","room2");

});

connectRoom3.addEventListener("click", ()=>{
    socket.emit("connect_room","room3");
});



// Enviar Mensaje
const sendMessageButton = document.getElementById('sendMessage');

sendMessageButton.addEventListener("click", ()=>{
    const message = prompt("Escriba su mensaje");
    socket.emit("message", message);
});


// recibir evento del mensaje

socket.on("send_message",data => {
    const {room} = data;
    const {message} = data;
    const li = document.createElement("li");
    li.textContent = message;
    document.getElementById(`${room}`).append(li);
});