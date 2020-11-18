/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar.campos');
const { getUsuarios, crearUsuarios, actualizarUsuarios, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');


const router = Router();

//cargar usuarios
router.get('/', 
            [validarJWT, validarADMIN_ROLE],
            getUsuarios);

//Crear usuario
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuarios
);

//actualizar el usuario
router.put('/:id', [
        validarJWT,
        validarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuarios
);

router.delete('/:id', 
                [validarJWT, validarADMIN_ROLE],
                borrarUsuario);


module.exports = router;