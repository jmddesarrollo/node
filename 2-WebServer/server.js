const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/data', (req, res) => {
    let salida = { nombre: 'Javier Molero', edad: '41', url: req.url };
    res.send(salida);
});

app.listen(port, () => {
    console.log('Escuchando peticiones en el puerto ' + port);
});