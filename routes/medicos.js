/**
 * Ruta: /api/medicos
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicoById } = require('../controllers/medicos');


const router = Router();

//cargar medicos paginados
router.get('/', validarJWT ,getMedicos);

//Crear Medico
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital debe ser valido').isMongoId(),
    validarCampos
], crearMedico);

//actualizar el medico
router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

//eliminar medico
router.delete('/:id', validarJWT, borrarMedico);

//obtener un medico por el id
router.get('/:id', validarJWT, getMedicoById);


module.exports = router;