const { express } = require('express');
const Usuario = require('../models/usuario');

const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode');

const resetPassword = async(req, res) => {

    //obtenemos el password
    let body = req.body;
    let token = body.codigo
    let password = body.password
    //debemos obtener el token
    //console.log(token);
 
 
    var decoded = jwt_decode(token);
    var email = decoded.email;

    //console.log(email);

 
    var usuario = new Usuario({
        password: bcrypt.hashSync(body.password, 10)
    });

    Usuario.findOne({ email }, (err, usuarioDB) => {
 
 
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
 
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales Incorrectas - email',
                errors: err
 
            });
        }
        usuarioDB.password = usuario.password;
        usuarioDB.save((err, usuarioGuardado) => {
 
 
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }
 
            usuarioGuardado.password = ':)';
 
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        })
 
    });
    

    /* res.json({
        ok: true,
        email,
        msg: 'dentro de recuperar contraseña'
    });
    */
    
   
}

const actualizarPassword = async (req, res) => {

    const uid = req.params.id;
    let body = req.body;
    let password_old = body.password_old
    let password_new = body.password_new

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //hay que desencriptar las contraseñas 
        //compararlas si son iguales 
        // se guarda la nueva en la bd
        
        // Encriptar contraseña
        //const salt = bcrypt.genSaltSync();
        //const old = bcrypt.hashSync(password_old, salt);
        //const nuevo = bcrypt.hashSync(password_new, salt);

        //comparar contraseñas
        const sonIguales = bcrypt.compareSync(password_old, usuarioDB.password);

        
        //console.log(usuarioDB.password);
        //console.log(password_old);
        //console.log(sonIguales);
        
        //verificar la contraseña vieja y si es diferente 
        //se actualiza

        if(sonIguales) {

            const salt = bcrypt.genSaltSync();
            const nuevo = bcrypt.hashSync(password_new, salt);

            usuarioDB.password = nuevo;
            usuarioDB.save((err, usuarioGuardado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msg: 'Error al actualizar contraseña',
                        errors: err
                    });
                }
     
                usuarioGuardado.password = ':)';
     
                res.status(200).json({
                    ok: true,
                    usuario: usuarioGuardado
                });
            });
        } else {
            //console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'contraseñas no coinciden'
            });
        }


        /*res.json({
            ok: true,
            msg: 'Actualizar contraseña',
            password_old,
            password_new,
            old,
            nuevo,
            
        });*/
        

        } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
        
    }

}



module.exports = {
    resetPassword,
    actualizarPassword
}