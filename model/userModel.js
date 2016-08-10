var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usherSchema = new Schema({
    Cedula: {
        type: String,
        required: true,
        unique: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Apellido: {
        type: String,
        required: true
    },
    Correo: {
        type: String,
        required: true
    }
});

var userModel = mongoose.model('usuario', usherSchema);

module.exports = userModel;