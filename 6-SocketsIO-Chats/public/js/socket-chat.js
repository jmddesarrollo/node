var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

// Escuchar información. Conexión al servidor
socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, (data) => {
        console.log('Usuarios conectados', data);
        renderUsuarios(data);
        renderSmallChat();
    });
});

// Escuchar información. Desconexión con el servidor
socket.on('disconnect', () => {
    console.log('Desconexión con el servidor');
});

socket.on('crearMensaje', (data) => {
    console.log('Servidor: ', data);
    renderMensajes(data, false);
    scrollBottom();
});

// Escuchar conexiones de usuarios al chat
socket.on('listaPersonas', (data) => {
    console.log(data);
    renderUsuarios(data);
});

// Mensajes privados
socket.on('mensajePrivado', (mensaje) => {
    console.log(mensaje);
});