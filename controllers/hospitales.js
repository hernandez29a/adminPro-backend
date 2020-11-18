const { response } = require('express');
const cloudinary = require('cloudinary').v2;
const Hospital = require('../models/hospital');



const getHospitales = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [hospitales, total] = await Promise.all([
        Hospital
        .find()
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre imgUrl'),
        Hospital.countDocuments()
    ]);

    res.json({
        ok: true,
        hospitales,
        total
    });
}

const getTodosHospitales = async(req, res) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img')

    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async(req, res = response) => {


    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    //console.log(uid);

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const actualizarHospital = async(req, res = response) => {

    const id = req.params.id;
    
    //console.log(id);

    try {

        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }

        //Actualizaiones
        const { nombre, ...campos } = req.body;

        campos.nombre = nombre;

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, campos, { new: true });
        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const borrarHospital = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            });
        }

        await cloudinary.uploader.destroy(hospitalDB.public_id);
        await Hospital.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'hospital eliminado con exito'
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

    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,
    getTodosHospitales
}