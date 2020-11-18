const { response } = require('express');
const cloudinary = require('cloudinary').v2;
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [medicos, total] = await Promise.all([
        Medico
        .find()
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img'),
        Medico.countDocuments()
    ]);

    /*const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')
    */

    res.json({
        ok: true,
        medicos,
        total
    });

}


const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
            .populate('usuario', 'nombre imgUrl')
            .populate('hospital', 'nombre imgUrl')
        
    
        res.json({
            ok: true,
            medico,
            
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({

        usuario: uid,
        ...req.body
    });


    try {

        const medicolDB = await medico.save();

        res.json({
            ok: true,
            medico: medicolDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }




}

const actualizarMedico = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const medico = await Medico.findById( id );

        if ( !medico ) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );


        res.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMedico = async (req, res = response) => {

    const id = req.params.id;

    try {

        const medicolDB = await Medico.findById(id);

        if (!medicolDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un médico con ese id'
            });
        }

        await cloudinary.uploader.destroy(medicolDB.public_id);
        await Medico.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'médico eliminado con exito'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {

    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}