const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('BD esta en linea');

    } catch (error) {

        console.log(error);
        throw new Error('Error al levantar la Base de datos');
    }

}

module.exports = {
    dbConnection
}