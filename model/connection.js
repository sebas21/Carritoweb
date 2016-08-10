var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:1111@ds021999.mlab.com:21999/db_carrito', function(err) {
    if (err) {
        console.log('connection failed' + err);
    } else {
        console.log('¡connection ok!');
    }
});
module.exports = mongoose;