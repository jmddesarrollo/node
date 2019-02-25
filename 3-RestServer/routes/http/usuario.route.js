'use strict'

var express = require('express');
var UsuarioController = require('../../controllers/usuario.controller');
var api = express.Router();

// Crear rutas por GET/POST/PUT/DELETE con express
api.get('/usuarios', UsuarioController.getUsuarios);
api.get('/usuario/:id', UsuarioController.getUsuario);
api.post('/usuario', UsuarioController.addUsuario);
api.put('/usuario/:id', UsuarioController.updUsuario);
api.delete('/usuario/:id', UsuarioController.delUsuario);

module.exports = api;