const opciones = {
    base: {
        demand: true,
        alias: 'b',
        desc: 'Recoge la base de la multiplicación.'
    },
    limite: {
        alias: 'l',
        default: 10,
        desc: 'Listar en consola la tabla de la base introducida.'
    },
    completado: {
        default: true,
        alias: 'c',
        desc: 'Cargar un archivo'
    }
}

// Posibilidad con yargs de recoger opciones sin comando
// const argv = require('yargs).options({direccion:{alias: 'd', demand: true, desc: 'Opciones'}}).argv;

const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de multiplicar.', opciones)
    .command('crear', 'Crear archivo con la tabla de multiplicar.', opciones)
    .command('cargar', 'Actualiza el estado completado de una tarea', {
        descripcion: {
            demand: true,
            alias: 'd',
            desc: 'Actaulizar estado completado'
        },
        completado: {
            default: true,
            alias: 'c',
            desc: 'Marcar como completado.'
        }
    })
    .help()
    .argv;

module.exports = {
    argv
}