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
    });
});

// Escuchar información. Desconexión con el servidor
socket.on('disconnect', () => {
    console.log('Desconexión con el servidor');
});

// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'JMD',
//     mensaje: 'Hola!'
// }, (data) => {
//     console.log('Se disparó el callback');
//     console.log('Respuesta del servidor: ', data.respuesta);
// });

socket.on('crearMensaje', (data) => {
    console.log('Servidor: ', data);
});

// Escuchar conexiones de usuarios al chat
socket.on('listaPersonas', (data) => {
    console.log(data);
});

// Mensajes privados
socket.on('mensajePrivado', (mensaje) => {
    console.log(mensaje);
});