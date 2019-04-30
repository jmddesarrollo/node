let empleadosAA = [
    { id: 1, nombre: "Javier"},
    { id: 2, nombre: "Olivia"},
    { id: 3, nombre: "Sagrario"},
];

let salariosAA = [
    { id: 1, salario: 1500},
    { id: 2, salario: 1320}
]

let getEmpleadoAA = (id) => {
    return new Promise((resolve, reject) => {
        // Si no encuentra regresa 'undefined'
        let empleadoDB = empleadosAA.find(empleado => empleado.id === id );
    
        if (!empleadoDB) {
            reject(`No existe empleado con id: ${id}`);
        } else {
            resolve(empleadoDB);
        }            
    });
}

let getSalarioAA = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salariosAA.find(salario => {
            return salario.id === empleado.id;
        });
    
        if (salarioDB) {
            let respuesta = {id: empleado.id, nombre: empleado.nombre, salario: salarioDB.salario};
            resolve(respuesta);
            console.log('Esto se escribe después de la respuesta');
        } else {
            reject(`No se ha encontrado el salario del usuario: ${empleado.nombre}`);
            console.log('Esto se escribe después del rechazo');
        }
    });
}

let getInformacion = async(id) => {
    let empleado = await getEmpleadoAA(id);
    let respuesta = await getSalarioAA(empleado);

    return `El salario de ${respuesta.nombre} es de ${respuesta.salario}€.`;
}

getInformacion(1).then(respuesta => {
    console.log(respuesta);
}).catch(error => {
    console.log(error);
});