const {Schema, model} = require('mongoose');

const ServiceSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
ServiceSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Service', ServiceSchema);
