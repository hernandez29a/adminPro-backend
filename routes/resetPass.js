/**
 * Ruta: /api/mail
 */
const { Router } = require('express');
const {resetPassword, actualizarPassword} = require('../controllers/resetPassword');
const { validarJWT, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');


const router = Router();

//recuperar contraseña
router.put('/',validarJWT, resetPassword );

//cambiar contraseña
router.put('/actualizar/:id', [validarJWT, validarADMIN_ROLE_o_MismoUsuario], actualizarPassword );



module.exports = router;