const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            });
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        //Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd( usuarioDB.role)
            //msg: 'Hola mindo'
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }



}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    //Generar el nuevo TOKEN - JWT
    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);
    console.log(usuario);

    res.json({
        ok: true,
        token,
        menu: getMenuFrontEnd( usuario.role),
        usuario
    });


}

module.exports = {
    login,
    renewToken
}