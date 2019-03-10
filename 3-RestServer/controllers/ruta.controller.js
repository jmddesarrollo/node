'use strict'
var Sequelize = require('../models/index').sequelize;

// Servicios
var RutaService = require('../services/ruta.service');

var ControlException = require('../utils/ControlException');

/*
 * Consultar todos las rutas.
 */
async function getRutas(req, res) {
    try {
        let rutas = await RutaService.getRutas(req);

        res.status(200).send({ status: 'success', data: rutas });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Consultar todos las rutas a partir de hoy.
 */
async function getRutasFromToday(req, res) {
    try {
        let rutas = await RutaService.getRutasFromToday(req);

        res.status(200).send({ status: 'success', data: rutas });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Consultar datos de una ruta
 */
async function getRuta(req, res) {
    const id = req.params.id;

    try {
        let ruta = await RutaService.getRuta(id, req);

        res.status(200).send({ status: 'success', data: ruta });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Añadir una nueva ruta
 */
async function addRuta(req, res) {
    const body = req.body;

    const nuevaRuta = {
        id: null,
        titulo: body.titulo,
    };

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        let ruta = await RutaService.addRuta(nuevaRuta, t);
        await t.commit();

        res.status(200).send({ status: 'success', data: ruta });
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
 * Editar una ruta
 */
async function updRuta(req, res) {
    const id = req.params.id;
    const body = req.body;

    const editRuta = {
        id: id,
        titulo: body.titulo
    };

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        let ruta = await RutaService.updRuta(editRuta, t);
        await t.commit();

        res.status(200).send({ status: 'success', data: ruta });
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
 * Eliminar una ruta
 */
async function delRuta(req, res) {
    const id = req.params.id;

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        let ruta = await RutaService.delRuta(id, t);
        await t.commit();

        res.status(200).send({ status: 'success', data: ruta });
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
    getRutas,
    getRutasFromToday,
    getRuta,
    addRuta,
    updRuta,
    delRuta
}