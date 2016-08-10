var db = require('../model/Connection');
var Schema = db.Schema;
//creating new product schema 
var productSchema = new Schema({
    Nombre: {
        type: String,
        required: true,
        unique: true
    },
    Precio: {
        type: Number,
        required: true,
        min: 1
    },
    Cantidad: {
        type: Number,
        min: 1
    },
    Like: {
        type: Number,
        min: 1
    },
    Dislike: {
        type: Number,
        min:1
    },
    Imagen: {
        type: String,
        required: true,
        unique: true
    }
});

//get and export the collection 'productos' in DB
module.exports = db.model('producto', productSchema);