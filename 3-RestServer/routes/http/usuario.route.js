'use strict'

var express = require('express');
var UsuarioController = require('../../controllers/usuario.controller');
var api = express.Router();

var mdwAutentificacion = require('../../server/middlewares/autenticacion');

// Crear rutas por GET/POST/PUT/DELETE con express
api.get('/usuarios', [mdwAutentificacion.verificarToken], UsuarioController.getUsuarios);
api.get('/usuario/:id', [mdwAutentificacion.verificarToken], UsuarioController.getUsuario);
api.post('/usuario', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdmin], UsuarioController.addUsuario);
api.put('/usuario/:id', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdminOrEqualUsuario], UsuarioController.updUsuario);
api.put('/usuariopassword/:id', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdminOrEqualUsuario], UsuarioController.updPasswordUsuario);
api.delete('/usuario/:id', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdmin], UsuarioController.delUsuario);

module.exports = api;