'use strict'

var db = require("../models");
var Rutas = db.rutas;

var moment = require('moment');

// Operandos
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

var ControlException = require('../utils/ControlException');

/*
 * Consultar todas las rutas.
 */
function getRutas(req) {
    let arrPublic = [];
    arrPublic.push(1);

    // Los usuarios dados de alta pueden ver rutas públicas como privadas
    if (req.usuario && req.usuario.enabled) {
        arrPublic.push(0);
    }

    let rutas = Rutas.findAll({
            where: {
                publica: {
                    [Op.in]: arrPublic
                }
            }
        }, {
            order: [
                ['fecha', 'DESC']
            ]
        })
        .catch(error => {
            console.log(error);
            throw new ControlException('Ha ocurrido un error al consultar las rutas.', 500);
        });

    return rutas;
}

/*
 * Consultar todas las rutas.
 */
function getRutasFromToday(req) {
    let arrPublic = [];
    arrPublic.push(1);

    // Los usuarios dados de alta pueden ver rutas públicas como privadas
    if (req.usuario && req.usuario.enabled) {
        arrPublic.push(0);
    }

    let rutas = Rutas.findAll({
            where: {
                publica: {
                    [Op.in]: arrPublic
                },
                fecha: {
                    [Op.gte]: moment().format('YYYY-MM-DD')
                }
            }
        }, {
            order: [
                ['fecha', 'DESC']
            ]
        })
        .catch(error => {
            console.log(error);
            throw new ControlException('Ha ocurrido un error al consultar las rutas.', 500);
        });

    return rutas;
}

/**
 * Recoger datos de una ruta
 */
async function getRuta(id, req) {
    let arrPublic = [];
    arrPublic.push(1);

    // Los usuarios dados de alta pueden ver rutas públicas como privadas
    if (req.usuario && req.usuario.enabled) {
        arrPublic.push(0);
    }

    let ruta = await Rutas.findOne({
            where: {
                publica: {
                    [Op.in]: arrPublic
                },
                id: id
            }
        })
        .catch(error => {
            console.log(error);
            throw new ControlException('Ha ocurrido un error al consultar la ruta solicitada.', 500);
        });

    if (ruta) {
        return ruta;
    } else {
        throw new ControlException('La ruta solicitada no ha sido encontrado.', 500);
    }
}

/*
 * Añadir nueva ruta
 */
async function addRuta(nuevaRuta, t) {
    const rutaCreate = await Rutas.create({
            titulo: nuevaRuta.titulo,
            lugar: nuevaRuta.lugar,
            fecha: nuevaRuta.fecha,
            distancia: nuevaRuta.distancia,
            duracion: nuevaRuta.duracion,
            altitud_max: nuevaRuta.altitud_max,
            altitud_min: nuevaRuta.altitud_min,
            desnivel_subida: nuevaRuta.desnivel_subida,
            desnivel_bajada: nuevaRuta.desnivel_bajada,
            senalizacion: nuevaRuta.senalizacion,
            ibp: nuevaRuta.ibp,
            descripcion: nuevaRuta.descripcion,
            opcional: nuevaRuta.opcional,
            enlace_tiempo: nuevaRuta.enlace_tiempo,
            enlace_ruta: nuevaRuta.enlace_ruta,
            enlace_apuntarse: nuevaRuta.enlace_apuntarse,
            precio_no_socio: nuevaRuta.precio_no_socio,
            precio_socio: nuevaRuta.precio_socio,
            telefono_contacto: nuevaRuta.telefono_contacto,
            ultimo_dia_apuntarse: nuevaRuta.ultimo_dia_apuntarse,
            publica: nuevaRuta.publica,
            recorrido_id: nuevaRuta.recorrido_id,
            dificultad_id: nuevaRuta.dificultad_id
        }, { transaction: t })
        .catch(error => {
            console.log(error);
            throw new ControlException('Revisar datos introduciods. Se ha producido un error al añadir nueva ruta.', 500);
        });

    return rutaCreate;
}

/*
 * Editar una ruta
 */
async function updRuta(editRuta, t) {
    let ruta = await Rutas.findOne({ where: { id: editRuta.id } })
        .catch(error => {
            console.log(error);
            throw new ControlException('Ha ocurrido un error al consultar la ruta.', 500);
        });

    if (!ruta) {
        throw new ControlException('La ruta no ha sido encontrada.', 500);
    }

    ruta.titulo = editRuta.titulo;
    // ....


    const rutaEdit = await ruta.save({ transaction: t })
        .catch(error => {
            console.log(error);
            throw new ControlException('Revisar datos introduciods. Se ha producido un error al editar la ruta.', 500);
        });

    return rutaEdit;
}

/*
 * Borrado de una ruta
 */
async function delRuta(id, t) {
    const ruta = await getRuta(id);
    if (!ruta) {
        throw new ControlException('La ruta no ha sido encontrada.', 500);
    }

    let rutaErase = Rutas.destroy({ where: { id: id } }, { transaction: t })
        .catch(function(error) { throw new ControlException('Error al eliminar la ruta.', 500); });

    return rutaErase;
}

module.exports = {
    getRutas,
    getRutasFromToday,
    getRuta,
    addRuta,
    updRuta,
    delRuta
}