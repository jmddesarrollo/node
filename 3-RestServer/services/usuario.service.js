'use strict'

var db = require("../models");
var Usuarios = db.usuarios;

// Encriptación de password
const bcrypt = require('bcrypt');
const saltRounds = 10;

var ControlException = require('../utils/ControlException');

/*
 * Consultar todos los empleados.
 */
function getUsuarios() {
    let usuarios = Usuarios.findAll({ attributes: ['id', 'rol', 'nombre', 'apellidos', 'email', 'imagen', 'enabled'] }, {
            order: [
                ['apellidos', 'ASC'],
                ['nombre', 'ASC']
            ]
        })
        .catch(error => {
            console.log(error);
            throw new ControlException('Ha ocurrido un error al consultar los empleados.', 500);
        });

    return usuarios;
}

/**
 * Recoger datos de un usuario
 */
async function getUsuario(id) {
    let usuario = await Usuarios.findOne({ where: { id: id } })
        .catch(error => {
            console.log(error);
            throw new ControlException('Ha ocurrido un error al consultar el usuario.', 500);
        });

    if (usuario) {
        usuario.password = undefined;
        return usuario;
    } else {
        throw new ControlException('El usuario no ha sido encontrado.', 500);
    }
}

/**
 * Recoger datos de un usuario
 */
async function getUsuarioByEmail(email) {
    let usuario = await Usuarios.findOne({ where: { email: email } })
        .catch(error => {
            console.log(error);
            throw new ControlException('Ha ocurrido un error al consultar el usuario.', 500);
        });

    return usuario;
}

/*
 * Añadir nuevo usuario
 */
async function addUsuario(nuevoUsuario, t) {
    const usuario = await getUsuarioByEmail(nuevoUsuario.email);

    if (usuario.length > 0) {
        throw new ControlException('El email introducido ya se encuentra dado de alta.', 500);
    }

    const usuarioCreate = await Usuarios.create({
            nombre: nuevoUsuario.nombre,
            apellidos: nuevoUsuario.apellidos,
            email: nuevoUsuario.email.toLowerCase(),
            password: bcrypt.hashSync(nuevoUsuario.password, saltRounds),
            rol: nuevoUsuario.rol,
            imagen: null
        }, { transaction: t })
        .catch(error => {
            console.log(error);
            throw new ControlException('Revisar datos introduciods. Se ha producido un error al añadir el usuario.', 500);
        });

    // No mostrar la password en la salida de la petición.
    usuarioCreate.password = undefined;

    return usuarioCreate;
}

/*
 * Editar un usuario
 */
async function updUsuario(editUsuario, t) {
    console.log('Edit usuario');
    let usuario = await Usuarios.findOne({ where: { id: editUsuario.id } })
        .catch(error => {
            console.log(error);
            throw new ControlException('Ha ocurrido un error al consultar el usuario.', 500);
        });

    if (!usuario) {
        throw new ControlException('El usuario no ha sido encontrado.', 500);
    }

    if (usuario.email !== editUsuario.email) {
        const usuarioEmail = await getUsuarioByEmail(editUsuario.email);

        if (usuarioEmail.length > 0) {
            throw new ControlException('El email editado ya se encuentra dado de alta.', 500);
        }
    }

    usuario.nombre = editUsuario.nombre;
    usuario.apellidos = editUsuario.apellidos;
    usuario.rol = editUsuario.rol;
    // usuario.password = bcrypt.hashSync(editUsuario.password, saltRounds);
    usuario.email = editUsuario.email;
    usuario.enabled = editUsuario.enabled;

    console.log(usuario.email);

    const usuarioEdit = await usuario.save({ transaction: t })
        .catch(error => {
            console.log(error);
            throw new ControlException('Revisar datos introduciods. Se ha producido un error al añadir el usuario.', 500);
        });

    // No mostrar la password en la salida de la petición.
    usuarioEdit.password = undefined;

    return usuarioEdit;
}

/*
 * Borrado lógico de un usuario
 */
async function delUsuario(id, t) {
    const usuario = await getUsuario(id);

    usuario.enabled = false;

    const usuarioDel = await usuario.save({ transaction: t })
        .catch(error => {
            console.log(error);
            throw new ControlException('Revisar datos introduciods. Se ha producido un error al añadir el usuario.', 500);
        });

    // No mostrar la password en la salida de la petición.
    usuarioDel.password = undefined;

    return usuarioDel;
}

module.exports = {
    getUsuarios,
    getUsuario,
    getUsuarioByEmail,
    addUsuario,
    updUsuario,
    delUsuario
}