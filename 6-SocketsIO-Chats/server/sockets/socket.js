const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utilidades');

const usuarios = new Usuarios();

// Control de conexiones de clientes
io.on('connection', (client) => {
    client.on('entrarChat', (data, callback) => {
        console.log(data);

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y la sala son obligatorios.'
            })
        }

        // Conectar al cliente a una sala.
        client.join(data.sala);

        // El id de conexión (client.id) es único e identificativo.
        let personas = usuarios.agregarPersonas(client.id, data.nombre, data.sala);

        // Manda mensaje a todos los usuarios conectados al chat
        // client.broadcast.emit('listaPersonas', usuarios.getPersonas());
        // Manda mensaje a los usuarios conectados a mismo chat.
        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));

        callback(usuarios.getPersonasPorSala(data.sala));
    });

    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        // Manda mensaje a todos los usuarios conectados al chat
        client.broadcast.emit('crearMensaje', mensaje);
        // Manda mensaje a los usuarios conectados a mismo chat.
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        // Manda mensaje a todos los usuarios conectados al chat
        client.broadcast.to(data.para).emit('mensajePrivado', mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        // Manda mensaje a todos los usuarios conectados al chat
        // client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandonó el chat.`));
        // client.broadcast.emit('listaPersonas', usuarios.getPersonas());
        // Manda mensaje a los usuarios conectados a mismo chat.
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandonó el chat.`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    });
});