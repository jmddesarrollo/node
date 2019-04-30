/**
 * Async - Await
 * Devuelve una promesa
 */
let getMiNombre = async() => {
    // if(true) {
    //     throw new Error('Error provocado!!!');
    // }

    return 'Javier';
} 

/**
 * Async equivale en modo promesa a una función así.
 */
// let getMiNombrePromise = () => {
//     return new Promise((resolve, reject) => {
//         resolve('Javier');
//     });
// }

let saludo = async() => {
    let nombre = await getMiNombre();
    return `Hola ${nombre}`;
}

// console.log(getMiNombre());

saludo().then(respuesta => {
    console.log(respuesta);
}).catch(error => {
    console.log('Error de ASYNC', error);
});
