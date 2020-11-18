/**
 * Ruta: /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital, getTodosHospitales } = require('../controllers/hospitales');


const router = Router();

//cargar hospitales paginados
router.get('/', validarJWT, getHospitales);

//cargar todos los  hospitales 
router.get('/todosHospitales', validarJWT, getTodosHospitales);

//Crear hospital
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHospital);

//actualizar el hospital
router.put('/:id', [
    validarJWT,
    check('id', 'El id del hospital debe ser valido').isMongoId(),
    validarCampos
], actualizarHospital);

//eliminar hospital
router.delete('/:id', validarJWT, borrarHospital);


module.exports = router;