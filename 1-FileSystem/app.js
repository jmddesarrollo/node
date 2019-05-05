const multiplicar = require('./multiplicar/multiplicar');
const argv = require('./config/yargs').argv;
const colors = require('colors/safe');

// En '_' aparece un arreglo con las acciones.
let comando = argv._[0];

switch (comando) {
    case 'listar':
        multiplicar.listarTabla(argv.base, argv.limite);
        break;
    case 'crear':
        // Crear archivo de multiplicación
        multiplicar.crearArchivo(argv.base, argv.limite)
            .then(archivo => {
                console.log('El archivo ha sido guardado!', colors.green(argv.base));
            })
            .catch(err => {
                console.log('Error:', err);
            })
        break;
    case 'cargar':
        // Crear archivo de multiplicación
        multiplicar.cargarDB();
        break;

    case 'json':
        let data = multiplicar.cargarDB();

        for (let tarea of data) {
            console.log('===== TABLA ====='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('================='.green);
        }
        break;

    default:
        console.log('Comando no reconocido');
        return false;
}

// let base = '5';

// console.log(process.argv);
// let argv = process.argv;
// let parametro = argv[2];
// base = parametro.split('=')[1];
// console.log(base);

// console.log(argv);