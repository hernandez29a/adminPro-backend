const { Schema, model } = require('mongoose');


const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: 'http://localhost:3000/api/upload/imagen/no-imagen.jpg'
    },
    public_id: {
        type: String,
        default: 'no posee imagen'
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales' });

//transformar el id
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Hospital', HospitalSchema);