const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/data', (req, res) => {
    let salida = { nombre: 'Javier Molero', edad: '41', url: req.url };
    res.send(salida);
});

app.listen(8080, () => {
    console.log('Escuchando peticiones en el puerto 8080');
});