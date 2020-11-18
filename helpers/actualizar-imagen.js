const cloudinary = require('cloudinary').v2;

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const actualizarImgCloudinay = async(tipo, id, public_id, url) => {

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('no es un médico por id');
                return false;
            }

            /**
             * si el usuario posee una imagen en la esta se debe ubicar 
             * para luego ser borrada , en la bd solo debe haber una imagen por 
             * registro
             */

            if (medico.public_id) {
                await cloudinary.uploader.destroy(medico.public_id);
            }

            //cambiar las propiedades de la imagen subida
            cloudinary.image(public_id, { width: 150, height: 100, crop: "scale" });

            medico.imgUrl = url;
            medico.public_id = public_id;

            await medico.save();
            return true;

            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('no es un usuario por id');
                return false;
            }
            /**
             * si el usuario posee una imagen en la esta se debe ubicar 
             * para luego ser borrada , en la bd solo debe haber una imagen por 
             * registro
             */

            if (usuario.public_id) {
                await cloudinary.uploader.destroy(usuario.public_id);
            }

            usuario.imgUrl = url;
            usuario.public_id = public_id;
            await usuario.save();
            return true;


            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('no es un hospital por id');
                return false;
            }
            /**
             * si el usuario posee una imagen en la esta se debe ubicar 
             * para luego ser borrada , en la bd solo debe haber una imagen por 
             * registro
             */

            if (hospital.public_id) {
                await cloudinary.uploader.destroy(hospital.public_id);
            }

            hospital.imgUrl = url;
            hospital.public_id = public_id;
            await hospital.save();
            return true;

            break;

        default:
            break;
    }

}


module.exports = {
    actualizarImgCloudinay
}