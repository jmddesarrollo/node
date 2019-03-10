const { io } = require('../server');

// Control de conexiones de clientes
io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar al cliente
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);
        client.broadcast.emit('enviarMensaje', data);
        // if (data.usuario) {
        //     callback({ respuesta: 'Mensaje recibido correctamente.' });
        // } else {
        //     callback({ respuesta: 'Mensaje recibido INcorrectamente.' });
        // }        
    });

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a la app.'
    })
});