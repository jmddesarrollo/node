const express = require('express');
const app = express();

// Configuración de Socket IO
const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
//

const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// Configuración de SocketIO. Comunicación del Backend
// const io = socketIO(server);
module.exports.io = socketIO(server);

// Control de conexiones de clientes
require('./sockets/socket');

server.listen(port, (err) => {
    // app.listen(port, (err) => {
    //

    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});