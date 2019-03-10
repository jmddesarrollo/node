'use strict'

var express = require('express');
var RutaController = require('../../controllers/ruta.controller');
var api = express.Router();

var mdwAutentificacion = require('../../server/middlewares/autenticacion');

// Crear rutas por GET/POST/PUT/DELETE con express
api.get('/rutas', [mdwAutentificacion.infoToken], RutaController.getRutas);
api.get('/rutasfromtoday', [mdwAutentificacion.infoToken], RutaController.getRutasFromToday);
api.get('/ruta/:id', [mdwAutentificacion.infoToken], RutaController.getRuta);
api.post('/ruta', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdmin], RutaController.addRuta);
api.put('/ruta/:id', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdmin], RutaController.updRuta);
api.delete('/ruta/:id', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdmin], RutaController.delRuta);

module.exports = api;