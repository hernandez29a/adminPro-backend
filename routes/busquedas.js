/**
 * Ruta: api/todo/:busqueda
 */
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo, getDocumentosCollecion } = require('../controllers/busquedas');


const router = Router();

//Busqueda total
router.get('/:busqueda', validarJWT, getTodo);

//busqueda especifica
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosCollecion);

module.exports = router;