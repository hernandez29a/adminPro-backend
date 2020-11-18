/**
 * Ruta: /api/auth
 */
const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/', [
        check('email', 'El correo es obligatorios').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty().isLength(6),
        validarCampos
    ],
    login
)


router.get('/renew', validarJWT, renewToken);


module.exports = router;