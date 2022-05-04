const {Schema, model} = require('mongoose');

const ProductSchema = Schema ({

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
    },
    active: {
        type: Boolean,
        default: true,
    },
    deleteDate: {
        type: Date
    },
    deleteUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deleteReason: {
        type: String
    }
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
ProductSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Product', ProductSchema);
