const { Schema, model } = require('mongoose');


const MedicoSchema = Schema({
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
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

//transformar el id
MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Medico', MedicoSchema);