'use strict'

var express = require('express');
var UploadController = require('../../controllers/upload.controller');
var api = express.Router();

var mdwAutentificacion = require('../../server/middlewares/autenticacion');

// Crear rutas por GET/POST/PUT/DELETE con express
api.get('/archivo', UploadController.getArchivo);
api.put('/upload', [mdwAutentificacion.verificarToken], UploadController.putUpload);
api.put('/imagenusuario/:id', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdminOrEqualUsuario], UploadController.editImagenUsuario);

module.exports = api;