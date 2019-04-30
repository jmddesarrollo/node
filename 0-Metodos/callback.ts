let getUsuarioById = (id, callback) => {
    let usuario = {
        id,
        nombre: 'Rafael Nadal'
    }

    if (id === 10) {
        callback(null, `Simulación de error por inexistencia de usuario con id: ${id}`);
    } else {
        callback(usuario, null);
    }    
}

getUsuarioById(10, (usuario, error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(usuario);
    }    
})

setTimeout(()=>{
    console.log('Callback sencillo que se ejecuta a los 3sg.');
}, 3000);