const mongoose = require('mongoose');

//Conexion a la Base de datos
/*mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos:\x1b[32m%s\x1b[0m ', 'En Línea');

})*/


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