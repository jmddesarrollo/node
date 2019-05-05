const fs = require('fs');

const colors = require('colors');

let listarTabla = (base, limite = 10) => {
    console.log(`=====================`.green);
    console.log(`Tabla del ${base}:`.red)
    console.log(`=====================`.green);

    for (let i = 0; i <= limite; i++) {
        console.log(`${base} * ${i} = ${base * i }`);
    }
    console.log(`---------------------`.green);
}

let crearArchivo = (base, limite = 10) => {
    return new Promise((resolve, reject) => {
        if (!Number(base)) {
            reject(`El valor "${base}" no es un número.`);
            return false;
        }

        let data = '';

        for (let i = 0; i <= limite; i++) {
            data += `${base} * ${i} = ${base * i }\n`;
        }

        // const data = new Uint8Array(Buffer.from('Hello Node.js'));
        /**
         * WriteFile de FS
         *  - Dirección y archivo donde almacenar información
         *  - Variable con el contenido a almacenar
         *  - Callback: En cuyo interior se gestiona la resolución de la Promesa 'crearArchivo'.
         */
        fs.writeFile(`./tablas/tabla-${base}.txt`, data, (err) => {
            if (err) reject(err)
            else resolve(data);
        });
    });
}


const cargarDB = () => {
    try {
        // Leer un archivo. al estar en lenguaje servidor con un 'require' es suficiente, al detectar
        // que es un json, directamente lo serializa y lo convierte en un objeto javascript.
        mostrarData = require('../tablas/data.json');
        // console.log(mostrarData);
        return mostrarData;
    } catch {
        mostrarData = [];
        // console.log(mostrarData);
        return mostrarData;
    }
}

// Module es una variable de entorno que posee una propiedad objeto exports.
module.exports = {
    crearArchivo,
    listarTabla,
    cargarDB
}