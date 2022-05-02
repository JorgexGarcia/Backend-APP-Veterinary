const {Schema, model} = require('mongoose');

const ProductoSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true
    }
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
ProductoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Producto', ProductoSchema);
