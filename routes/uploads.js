/**
 * Ruta: api/todo/:busqueda
 */
const { Router } = require('express');
const expressfileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressfileUpload());

//Subir imagen
router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:id', retornaImagen);


module.exports = router;