const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {

    // Leer el Token
    const token = req.header('x-token');
    //console.log(token);

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        //console.log(uid); esto es para ver el id que se esta logeando

        req.uid = uid;

        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        })
    }



}

const validarADMIN_ROLE = async (req, res, next) => {

    const uid = req.uid;
    
    try {
        
        const usuarioDB = await Usuario.findById( uid);

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if( usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No posee privilegios para hacer eso'
            });
        }

        next();




    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {

    // obtener el id de la base de datos 
    const uid = req.uid;

    //obtener el id de la url
    const id = req.params.id;
    
    try {
        
        const usuarioDB = await Usuario.findById( uid);

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        // && operador logico de and

        if( usuarioDB.role === 'ADMIN_ROLE' || uid === id) {

            next();
            
        } else {
            
            return res.status(403).json({
                ok: false,
                msg: 'No posee privilegios para hacer eso'
            });
        }





    } catch (error) {
        console.log(error),
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}