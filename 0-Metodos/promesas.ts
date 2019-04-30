let empleadosP = [
    { id: 1, nombre: "Javier"},
    { id: 2, nombre: "Olivia"},
    { id: 3, nombre: "Sagrario"},
];

let salariosP = [
    { id: 1, salario: 1500},
    { id: 2, salario: 1320}
]

let getEmpleadoP = (id) => {
    return new Promise((resolve, reject) => {
        // Si no encuentra regresa 'undefined'
        let empleadoDB = empleadosP.find(empleado => empleado.id === id );
    
        if (!empleadoDB) {
            reject(`No existe empleado con id: ${id}`);
        } else {
            resolve(empleadoDB);
        }            
    });
}

let getSalarioP = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salariosP.find(salario => {
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

getEmpleadoP(1).then((empleado)=>{
    getSalarioP(empleado).then( respuesta => {
        console.log(respuesta); 
        console.log(`El salario de ${respuesta.nombre} es de ${respuesta.salario}€.`);   
    }, error => {
        console.log(error);
    });

}).catch((error)=> {
    console.log(error);
})