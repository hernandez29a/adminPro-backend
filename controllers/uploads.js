const path = require('path')
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const { actualizarImgCloudinay } = require("../helpers/actualizar-imagen");



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});




const fileUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, hospital o usuario'
        });
    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //Procesar la imagen
    const file = req.files.imagen;

    //console.log(file);

    const nombreCortado = file.name.split('.'); //separar por puntos el nombre del archivo
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extencion
    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    //console.log(extensionArchivo); aqui vemos la extencion del archivo para hacer la validacion

    if (!extencionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extencion Permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo}/${nombreArchivo}`;


    file.mv(path);



    //Mover archivo a la nuve
    const result = await cloudinary.uploader.upload(path, {
        transformation: [
            { width: 150, height: 150, gravity: "face", crop: "thumb" },
            { radius: 20 },
            { gravity: "south_east", x: 5, y: 5, width: 50 },
            { angle: 10 }
        ]
    });


    //console.log(result);
    // Actualizar DB
    actualizarImgCloudinay(tipo, id, result.public_id, result.url);
    //bloque para borrar la imagen de la nuve si esta esta repetida
    //borrarImagenNube(tipo,id);
    //Eliminar la imagen del uploads


    fs.unlinkSync(path);

    return res.json({
        ok: true,
        nombreArchivo: result.url,
        msg: 'Imagen subida y actualizada'

    });

}


const retornaImagen = (req, res = response) => {

    //const pathImg = path.join(__dirname, `../uploads/${ tipo}/${foto}`);
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);

    // imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    retornaImagen

}