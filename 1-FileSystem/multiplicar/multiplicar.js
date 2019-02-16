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
            reject(`El valor "${base}" no es un número`);
            return false;
        }

        let data = '';

        for (let i = 0; i <= limite; i++) {
            data += `${base} * ${i} = ${base * i }\n`;
        }

        // const data = new Uint8Array(Buffer.from('Hello Node.js'));
        fs.writeFile(`./tablas/tabla-${base}.txt`, data, (err) => {
            if (err) reject(err)
            else resolve(data);
        });
    });
}

module.exports = {
    crearArchivo,
    listarTabla
}