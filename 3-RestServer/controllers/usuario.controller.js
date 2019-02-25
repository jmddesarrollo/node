'use strict'
var Sequelize = require('../models/index').sequelize;

// Servicios
var UsuarioService = require('../services/usuario.service');

var ControlException = require('../utils/ControlException');

/*
 * Consultar todos los usuarios.
 */
async function getUsuarios(req, res) {
    try {
        let usuarios = await UsuarioService.getUsuarios();

        res.status(200).send({ status: 'success', data: usuarios });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Consultar datos de un usuario
 */
async function getUsuario(req, res) {
    const id = req.params.id;

    try {
        let usuario = await UsuarioService.getUsuario(id);

        res.status(200).send({ status: 'success', data: usuario });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Añadir un nuevo usuario
 */
async function addUsuario(req, res) {
    const body = req.body;

    const nuevoUsuario = {
        id: null,
        email: body.email,
        nombre: body.nombre,
        apellidos: body.apellidos,
        rol: body.rol,
        password: body.password
    };

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        let usuario = await UsuarioService.addUsuario(nuevoUsuario, t);
        await t.commit();

        res.status(200).send({ status: 'success', data: usuario });
    } catch (error) {
        await t.rollback();

        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Editar un usuario
 */
async function updUsuario(req, res) {
    const id = req.params.id;
    const body = req.body;

    const editUsuario = {
        id: id,
        email: body.email,
        nombre: body.nombre,
        apellidos: body.apellidos,
        rol: body.rol,
        password: body.password,
        enabled: body.enabled
    };

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        let usuario = await UsuarioService.updUsuario(editUsuario, t);
        await t.commit();

        res.status(200).send({ status: 'success', data: usuario });
    } catch (error) {
        await t.rollback();

        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Editar un usuario
 */
async function delUsuario(req, res) {
    const id = req.params.id;

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        let usuario = await UsuarioService.delUsuario(id, t);
        await t.commit();

        res.status(200).send({ status: 'success', data: usuario });
    } catch (error) {
        await t.rollback();

        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updUsuario,
    delUsuario
}