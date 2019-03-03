'use strict'

var db = require("../models");
var Usuarios = db.usuarios;

// Encriptación de password
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

var ControlException = require('../utils/ControlException');

/*
 * Consultar todos los empleados.
 */
async function loginUser(userLogin) {
    let usuario = await Usuarios.findOne({ where: { email: userLogin.email } })
        .catch(error => {
            console.log(error);
            throw new ControlException('Ha ocurrido un error al consultar el usuario.', 500);
        });

    // Verificar usuario
    if (!usuario) {
        throw new ControlException('El usuario no está registrado', 500);
    }

    // Verificar la contraseña
    if (!bcrypt.compareSync(userLogin.password, usuario.password)) {
        throw new ControlException('Error al confrontar la credencial.', 500);
    }

    // Quitar contraseña de objeto de salida.
    usuario.password = undefined;

    // Crear token: objeto, contraseña secreta general de encriptación, tiempo de expiración en sg. (4h)
    var token = jwt.sign({ usuario: usuario }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    let data = new Object;
    data.usuario = usuario;
    data.token = token;

    return data;
}

// =====================================
// Renovar el token
// =====================================
function renovarToken(req) {

    var token = jwt.sign({ usuario: req.usuario }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    return token;
}

module.exports = {
    loginUser,
    renovarToken
}