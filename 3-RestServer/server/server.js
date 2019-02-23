require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



// Consultar usuario
app.get('/usuario', function(req, res) {
    res.json('get Usuario');
});

// Alta de usuario
app.post('/usuario', function(req, res) {
    let body = req.body;
    if (body.nombre === undefined) {
        return res.status(400).json({ respuesta: 'El nombre es obligatorio.' });
    }

    res.json({ body });
});

// Editar usuario
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;

    res.json({ id, action: 'put' });
});

// Eliminar usuario
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    res.json({ id, action: 'delete' });
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto 3000 para Express.');
})