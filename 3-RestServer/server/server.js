const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// En el archivo config se definen variables globales (variables de entorno) que se usan en la app.
require('../config/config');

// Cargar rutas
var login_routes = require('../routes/http/login.route');
var usuario_routes = require('../routes/http/usuario.route');

// Middleware: Antes de recibir http se lanza lo que le indiquemos aquí.
// Método que se ejecuta antes de que llegue a un controlador. 
// Recibe datos por método HTTP.
// Convierte datos recibidos en petición a objeto JSON, a un objeto javascript listo para usar.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//

// Al crear nuestro cliente (Frontend) que tire del API puede dar problemas con el CORS, cruzado de dominios, ...
// Middleware propio para solucionar este problema.
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// Rutas
app.use('/api', login_routes);
app.use('/api', usuario_routes);

module.exports = app;