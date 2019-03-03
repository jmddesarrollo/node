var jwt = require('jsonwebtoken');

// =====================================
// Verificar token - Middleware
// =====================================
var verificarToken = (req, res, next) => {

    var token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            console.log(err);
            if (err.name && err.name === 'TokenExpiredError') {
                return res.status(401).json({ status: 'error', mensaje: 'Tiempo de conexión expirado.', errors: err });
            } else {
                return res.status(401).json({ status: 'error', mensaje: 'Usuario no autentificado.', errors: err });
            }
        }

        req.usuario = decoded.usuario;
        next();
    });
}

// =====================================
// Verificar Administrador - Middleware
// =====================================
var verificarAdmin = function(req, res, next) {

    if (req.usuario.rol === "ROLE_ADMIN") {
        next();
        return true;
    } else {
        return res.status(401).json({ status: 'error', mensaje: 'Autorización invalida para la petición.' });
    }
}

// =====================================
// Verificar Administrador - Middleware
// =====================================
var verificarAdminOrEqualUsuario = function(req, res, next) {

    // En req.usuario tenemos datos del token traídos del middleware 'verificar token'
    if (req.usuario.rol === "ROLE_ADMIN" || req.usuario.id === req.params.id) {
        next();
        return true;
    } else {
        return res.status(401).json({ status: 'error', mensaje: 'Autorización invalida para la petición.' });
    }
}

module.exports = {
    verificarToken,
    verificarAdmin,
    verificarAdminOrEqualUsuario
}