let empleados = [
    { id: 1, nombre: "Javier"},
    { id: 2, nombre: "Olivia"},
    { id: 3, nombre: "Sagrario"},
];

let salarios = [
    { id: 1, salario: 1500},
    { id: 2, salario: 1320}
]

let getEmpleado = (id, callback) => {
    // Si no encuentra regresa 'undefined'
    let empleadoDB = empleados.find(empleado => {
        return empleado.id === id;
    });

    if (!empleadoDB) {
        callback(null, `No existe empleado con id: ${id}`);
    } else {
        callback(empleadoDB);
    }    
}

let getSalario = (empleado, callback) => {
    let salarioDB = salarios.find(salario => {
        return salario.id === empleado.id;
    });

    if (salarioDB) {
        let respuesta = {id: empleado.id, nombre: empleado.nombre, salario: salarioDB.salario};
        callback(respuesta);
    } else {
        callback(null, `No se ha encontrado el salario del usuario: ${empleado.nombre}`)
    }
}

getEmpleado(1, (empleado, error) => {
    if (error) {
        return console.log(error);
    }
    getSalario(empleado, (respuesta, errorSal) => {
        if (errorSal) {
            return console.log(errorSal);
        }
        console.log(respuesta); 
        console.log(`El salario de ${respuesta.nombre} es de ${respuesta.salario}€.`)       
    });    
});

