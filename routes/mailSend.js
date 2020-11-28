/**
 * Ruta: /api/mail
 */
const { Router } = require('express');
const {enviarCorreo} = require('../controllers/enviarCorreo');

const router = Router();

//Actualizar contraseña
router.post('/', [ ], enviarCorreo);



module.exports = router;