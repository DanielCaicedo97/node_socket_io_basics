const socket = io({
    auth:{
        token: "token"
    }
});


// En caso de error en el midleware
socket.on("connect_error", err => {
    console.log("Error de conexion");
    console.log(err.message);
    console.log(err.data.details);
});