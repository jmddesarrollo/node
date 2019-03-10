var socket = io();

// Escuchar información. Conexión al servidor
socket.on('connect', () => {
    console.log('Conectado al servidor');
});

// Escuchar información. Desconexión con el servidor
socket.on('disconnect', () => {
    console.log('Desconexión con el servidor');
});

// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'JMD',
    mensaje: 'Hola!'
}, (data) => {
    console.log('Se disparó el callback');
    console.log('Respuesta del servidor: ', data.respuesta);
});

socket.on('enviarMensaje', (data) => {
    console.log('Servidor: ', data);
});