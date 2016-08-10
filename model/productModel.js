var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    Start:  {type: Number , required: true},
    Body:   {type: String , required: true},
    Author: {type: String , required: true}
});

var productSchema = new Schema({
    Nombre:  {type: String , required: true , unique: true},
    Precio:  {type: Number , required: true},
    Cantidad: Number,
    Like:     Number,
    Dislike:  Number,
    Imagen:  {type: String, required: true, unique: true},
    review: [reviewSchema]
});

var productsModel = mongoose.model('producto',productSchema);

module.exports = productsModel;