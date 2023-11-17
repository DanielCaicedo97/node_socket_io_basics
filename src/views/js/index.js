const user = prompt("Escribe tu usuario");
const profes = ["Daniel","Alejandro","Caicedo"] // lista de usuarios de profesores

let socketNameSpace, group;

const chat = document.getElementById("chat");
const namespace = document.getElementById("namespace");

if(profes.includes(user)){
    socketNameSpace = io("/teachers");
    group = "teachers";
    
} else {
    socketNameSpace = io("/students");
    group = "students";
}

socketNameSpace.on("connect", ()=>{
    namespace.textContent = group;
});

// Progrmando la logica de envio de mensajes 

const sendMessage = document.getElementById("sendMessage");

sendMessage.addEventListener("click", ()=>{
    const message = prompt("Escribe tu mensaje");
    socketNameSpace.emit("send_message", {
        message,
        user
    });
});


socketNameSpace.on("message", data => {
    const {message} = data; 
    const {user} = data;

    const li = document.createElement("li");
    li.textContent = `${user}: ${message}`;
    chat.append(li)
});