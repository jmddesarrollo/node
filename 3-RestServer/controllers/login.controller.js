'use strict'
var Sequelize = require('../models/index').sequelize;

// Servicios
var LoginService = require('../services/login.service');

var ControlException = require('../utils/ControlException');

/*
 * Consultar todos los usuarios.
 */
async function loginUser(req, res) {
    try {
        let body = req.body;

        const userLogin = {
            email: body.email,
            password: body.password
        };

        let usuarioLogin = await LoginService.loginUser(userLogin);

        res.status(200).send({ status: 'success', data: usuarioLogin });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Renovación de token
 */
async function renovarToken(req, res) {
    try {
        let token = LoginService.renovarToken(req);

        res.status(200).send({ status: 'success', token });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

module.exports = {
    loginUser,
    renovarToken
}