let empleadosPeC = [
    { id: 1, nombre: "Javier"},
    { id: 2, nombre: "Olivia"},
    { id: 3, nombre: "Sagrario"},
];

let salariosPeC = [
    { id: 1, salario: 1500},
    { id: 2, salario: 1320}
]

let getEmpleadoPeC = (id) => {
    return new Promise((resolve, reject) => {
        // Si no encuentra regresa 'undefined'
        let empleadoDB = empleadosPeC.find(empleado => empleado.id === id );
    
        if (!empleadoDB) {
            reject(`No existe empleado con id: ${id}`);
        } else {
            resolve(empleadoDB);
        }            
    });
}

let getSalarioPeC = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salariosPeC.find(salario => {
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

getEmpleadoPeC(1).then((empleado)=>{
    // Devuelve una promesa
    return getSalarioPeC(empleado);
}).then(respuesta => {
    console.log(respuesta); 
    console.log(`El salario de ${respuesta.nombre} es de ${respuesta.salario}€.`);     
}).catch(error => {
    console.log(error);
});